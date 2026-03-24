from __future__ import annotations

import json
import pickle
from pathlib import Path

import pandas as pd
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    mean_absolute_error,
    mean_squared_error,
    precision_score,
    r2_score,
    recall_score,
)
from sklearn.model_selection import train_test_split


ROOT = Path(__file__).resolve().parent
MLRUNS_DIR = ROOT / "mlruns"
OUTPUT_PATH = ROOT / "artifacts" / "model_stats.js"
DEFAULT_TARGET_COLUMN = "indicador_kpi"
DEFAULT_THRESHOLD = 70.0
DEFAULT_RANDOM_STATE = 42
TEST_SIZE = 0.2


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8").strip()


def parse_meta_file(path: Path) -> dict[str, object]:
    data: dict[str, object] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line or ": " not in line:
            continue
        key, raw_value = line.split(": ", 1)
        value = raw_value.strip()
        if value.startswith("'") and value.endswith("'"):
            data[key] = value[1:-1]
        elif value.isdigit():
            data[key] = int(value)
        else:
            data[key] = value
    return data


def read_metric_value(path: Path) -> float:
    last_line = path.read_text(encoding="utf-8").strip().splitlines()[-1]
    _, value, _ = last_line.split()
    return float(value)


def load_pickled_model(path: Path):
    with path.open("rb") as file:
        return pickle.load(file)


def find_latest_parent_run() -> tuple[Path, Path]:
    parent_candidates: list[tuple[int, Path, Path]] = []
    for experiment_dir in MLRUNS_DIR.iterdir():
        if not experiment_dir.is_dir() or experiment_dir.name in {".trash", "models"}:
            continue
        for run_dir in experiment_dir.iterdir():
            if not run_dir.is_dir() or not (run_dir / "meta.yaml").exists():
                continue
            run_name_path = run_dir / "tags" / "mlflow.runName"
            parent_tag_path = run_dir / "tags" / "mlflow.parentRunId"
            if not run_name_path.exists() or parent_tag_path.exists():
                continue
            if read_text(run_name_path) != "full_pipeline":
                continue
            meta = parse_meta_file(run_dir / "meta.yaml")
            parent_candidates.append((int(meta["start_time"]), experiment_dir, run_dir))

    if not parent_candidates:
        raise FileNotFoundError("No MLflow parent run named 'full_pipeline' was found in mlruns.")

    _, experiment_dir, run_dir = max(parent_candidates, key=lambda item: item[0])
    return experiment_dir, run_dir


def find_child_runs(experiment_dir: Path, parent_run_id: str) -> dict[str, Path]:
    child_runs: dict[str, Path] = {}
    for run_dir in experiment_dir.iterdir():
        if not run_dir.is_dir() or not (run_dir / "meta.yaml").exists():
            continue
        parent_tag_path = run_dir / "tags" / "mlflow.parentRunId"
        run_name_path = run_dir / "tags" / "mlflow.runName"
        if not parent_tag_path.exists() or not run_name_path.exists():
            continue
        if read_text(parent_tag_path) != parent_run_id:
            continue
        child_runs[read_text(run_name_path)] = run_dir
    return child_runs


def find_model_pickle(experiment_dir: Path, run_dir: Path) -> Path:
    outputs_dir = run_dir / "outputs"
    if outputs_dir.exists():
        for output_dir in sorted(outputs_dir.iterdir()):
            model_path = experiment_dir / "models" / output_dir.name / "artifacts" / "model.pkl"
            if model_path.exists():
                return model_path

    for candidate in run_dir.rglob("model.pkl"):
        return candidate

    raise FileNotFoundError(f"No pickled model artifact found for run {run_dir.name}.")


def build_dataset_summary(parent_run_dir: Path) -> dict[str, int]:
    metrics_dir = parent_run_dir / "metrics"
    return {
        "rows": int(read_metric_value(metrics_dir / "row_count")),
        "columns": int(read_metric_value(metrics_dir / "column_count")),
    }


def load_processed_dataset(parent_run_dir: Path, target_column: str) -> tuple[pd.DataFrame, pd.Series]:
    processed_dataset_path = parent_run_dir / "artifacts" / "preprocessing" / "processed_dataset.csv"
    if not processed_dataset_path.exists():
        raise FileNotFoundError("Processed dataset artifact was not found in the latest MLflow parent run.")
    processed_df = pd.read_csv(processed_dataset_path)
    return processed_df.drop(columns=[target_column]), processed_df[target_column]


def regression_metrics(y_true, y_pred) -> dict[str, float]:
    mse = mean_squared_error(y_true, y_pred)
    return {
        "mae": float(mean_absolute_error(y_true, y_pred)),
        "mse": float(mse),
        "rmse": float(mse ** 0.5),
        "r2": float(r2_score(y_true, y_pred)),
    }


def classification_metrics(y_true, y_pred) -> dict[str, float]:
    return {
        "precision": float(precision_score(y_true, y_pred, zero_division=0)),
        "recall": float(recall_score(y_true, y_pred, zero_division=0)),
        "f1": float(f1_score(y_true, y_pred, zero_division=0)),
    }


def build_regression_model(model_key: str, model_name: str, model_path: Path, X, y, random_state: int) -> dict[str, object]:
    model = load_pickled_model(model_path)
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=TEST_SIZE,
        random_state=random_state,
    )

    train_predictions = model.predict(X_train)
    test_predictions = model.predict(X_test)

    all_values = list(y_test.tolist()) + list(test_predictions.tolist())
    plot_min = float(min(all_values))
    plot_max = float(max(all_values))

    return {
        "key": model_key,
        "name": model_name,
        "metrics": {
            "selected": {
                "train": regression_metrics(y_train, train_predictions),
                "test": regression_metrics(y_test, test_predictions),
            }
        },
        "plots": {
            "test_actual_vs_predicted": {
                "min": plot_min,
                "max": plot_max,
                "points": [
                    {"actual": float(actual), "predicted": float(predicted)}
                    for actual, predicted in zip(y_test.tolist(), test_predictions.tolist())
                ],
            }
        },
    }


def build_logistic_model(model_paths: list[Path], X, y_regression, threshold: float, random_state: int) -> dict[str, object]:
    target = (y_regression >= threshold).astype(int)
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        target,
        test_size=TEST_SIZE,
        random_state=random_state,
        stratify=target,
    )

    variants: list[dict[str, object]] = []
    for model_path in model_paths:
        model = load_pickled_model(model_path)
        train_predictions = model.predict(X_train)
        test_predictions = model.predict(X_test)
        c_value = float(getattr(model, "C", 1.0))

        variants.append(
            {
                "c": c_value,
                "train_accuracy": float(accuracy_score(y_train, train_predictions)),
                "test_accuracy": float(accuracy_score(y_test, test_predictions)),
                "train": classification_metrics(y_train, train_predictions),
                "test": {
                    **classification_metrics(y_test, test_predictions),
                    "confusion_matrix": confusion_matrix(y_test, test_predictions).astype(int).tolist(),
                },
            }
        )

    variants.sort(key=lambda item: (item["test_accuracy"], item["c"]), reverse=True)
    selected_variant = variants[0]

    return {
        "key": "logistic_regression",
        "name": "Logistic Regression",
        "metrics": {
            "selected": selected_variant,
            "variants": sorted(variants, key=lambda item: item["c"]),
        },
    }


def main() -> None:
    experiment_dir, parent_run_dir = find_latest_parent_run()
    parent_run_id = parent_run_dir.name
    child_runs = find_child_runs(experiment_dir, parent_run_id)

    target_column = DEFAULT_TARGET_COLUMN
    threshold = DEFAULT_THRESHOLD
    random_state = DEFAULT_RANDOM_STATE

    params_dir = parent_run_dir / "params"
    if (params_dir / "target_column").exists():
        target_column = read_text(params_dir / "target_column")
    if (params_dir / "classification_threshold").exists():
        threshold = float(read_text(params_dir / "classification_threshold"))

    X, y_regression = load_processed_dataset(parent_run_dir, target_column)

    model_runs = {
        "linear_regression": ("Linear Regression", child_runs.get("linear_regression")),
        "random_forest": ("Random Forest", child_runs.get("random_forest_regressor")),
        "decision_tree": ("Decision Tree", child_runs.get("decision_tree_regressor")),
    }

    missing_runs = [name for name, (_, run_dir) in model_runs.items() if run_dir is None]
    if child_runs.get("logistic_regression_classifier") is None:
        missing_runs.append("logistic_regression")
    if missing_runs:
        missing_display = ", ".join(sorted(missing_runs))
        raise FileNotFoundError(f"Missing MLflow model runs for: {missing_display}.")

    stats = {
        "dataset": build_dataset_summary(parent_run_dir),
        "models": {},
    }

    for model_key, (model_name, run_dir) in model_runs.items():
        assert run_dir is not None
        stats["models"][model_key] = build_regression_model(
            model_key=model_key,
            model_name=model_name,
            model_path=find_model_pickle(experiment_dir, run_dir),
            X=X,
            y=y_regression,
            random_state=random_state,
        )

    logistic_run_dirs = [
        run_dir
        for run_name, run_dir in child_runs.items()
        if run_name.startswith("logistic_regression_classifier")
    ]
    stats["models"]["logistic_regression"] = build_logistic_model(
        model_paths=[find_model_pickle(experiment_dir, run_dir) for run_dir in logistic_run_dirs],
        X=X,
        y_regression=y_regression,
        threshold=threshold,
        random_state=random_state,
    )

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        "window.MODEL_STATS = " + json.dumps(stats, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Dashboard bundle written to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
