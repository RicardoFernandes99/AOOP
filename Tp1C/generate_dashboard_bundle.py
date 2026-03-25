from __future__ import annotations

import json
import pickle
from datetime import datetime, timezone
from math import exp, factorial
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from pre_processing import DATE_COLUMN, prepare_base_dataframe, split_features_and_target

try:
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
except ModuleNotFoundError as exc:
    raise SystemExit(
        "scikit-learn is required to regenerate the dashboard bundle. "
        "Install the project dependencies in the active Python environment and rerun "
        "'python generate_dashboard_bundle.py'."
    ) from exc


ROOT = Path(__file__).resolve().parent
MLRUNS_DIR = ROOT / "mlruns"
ARTIFACTS_DIR = ROOT / "artifacts"
MODEL_STATS_PATH = ARTIFACTS_DIR / "model_stats.js"
EDA_BUNDLE_PATH = ARTIFACTS_DIR / "eda_bundle.js"
EDA_SCATTER_BUNDLE_PATH = ARTIFACTS_DIR / "eda_scatter_bundle.js"
DEFAULT_TARGET_COLUMN = "indicador_kpi"
DEFAULT_THRESHOLD = 70.0
DEFAULT_RANDOM_STATE = 42
TEST_SIZE = 0.2
PREDICTION_NUMERIC_BOUNDS: dict[str, tuple[float | None, float | None]] = {
    "indicador_si": (0.0, 100.0),
    "taxa_resolucao": (0.0, 100.0),
    "tempo_resposta": (0.0, None),
    "satisfacao_cidadao": (0.0, 5.0),
    "volume_interacoes": (0.0, None),
    "taxa_abandono": (0.0, 100.0),
    "erros_tecnicos": (0.0, None),
}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8").strip()


def coerce_scalar(value: str) -> object:
    lowered = value.lower()
    if lowered == "true":
        return True
    if lowered == "false":
        return False

    try:
        if "." not in value and "e" not in lowered:
            return int(value)
        return float(value)
    except ValueError:
        return value


def parse_meta_file(path: Path) -> dict[str, object]:
    data: dict[str, object] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line or ": " not in line:
            continue
        key, raw_value = line.split(": ", 1)
        value = raw_value.strip()
        if value.startswith("'") and value.endswith("'"):
            value = value[1:-1]
        data[key] = coerce_scalar(value)
    return data


def read_metric_value(path: Path) -> float:
    last_line = path.read_text(encoding="utf-8").strip().splitlines()[-1]
    _, value, _ = last_line.split()
    return float(value)


def load_pickled_model(path: Path):
    with path.open("rb") as file:
        return pickle.load(file)


def load_joblib_artifact(path: Path):
    return joblib.load(path)


def relative_path(path: Path | None) -> str | None:
    if path is None:
        return None
    return path.resolve().relative_to(ROOT.resolve()).as_posix()


def read_params_directory(params_dir: Path) -> dict[str, object]:
    if not params_dir.exists():
        return {}

    params: dict[str, object] = {}
    for param_file in sorted(params_dir.iterdir()):
        if param_file.is_file():
            params[param_file.name] = coerce_scalar(read_text(param_file))
    return params


def load_table_preview(path: Path, limit: int | None = None) -> dict[str, object] | None:
    if not path.exists():
        return None

    dataframe = pd.read_csv(path)
    preview = dataframe if limit is None else dataframe.head(limit)
    return {
        "path": relative_path(path),
        "columns": [str(column) for column in dataframe.columns],
        "rows": json.loads(preview.to_json(orient="records")),
        "total_rows": int(len(dataframe)),
    }


def load_table_records(path: Path) -> list[dict[str, object]]:
    if not path.exists():
        return []
    dataframe = pd.read_csv(path)
    return json.loads(dataframe.to_json(orient="records"))


def write_window_payload(path: Path, variable_name: str, payload: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        f"window.{variable_name} = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )


def normalize_dataset_path(raw_path: str) -> Path:
    path = Path(raw_path)
    if not path.is_absolute():
        path = ROOT / path
    return path.resolve()


def load_source_dataset(parent_run_dir: Path, target_column: str) -> pd.DataFrame:
    params_dir = parent_run_dir / "params"
    dataset_path_param = params_dir / "dataset_path"
    if dataset_path_param.exists():
        dataset_path = normalize_dataset_path(read_text(dataset_path_param))
        if dataset_path.exists():
            return pd.read_csv(dataset_path)

    processed_dataset_path = parent_run_dir / "artifacts" / "preprocessing" / "processed_dataset.csv"
    if processed_dataset_path.exists():
        return pd.read_csv(processed_dataset_path)

    raise FileNotFoundError("No source dataset could be loaded from the latest MLflow parent run.")


def get_numeric_columns(dataframe: pd.DataFrame) -> list[str]:
    numeric_columns = dataframe.select_dtypes(include=np.number).columns.tolist()
    if "id_registo" in numeric_columns:
        numeric_columns.remove("id_registo")
    return numeric_columns


def poisson_probability(lambda_value: float, k: int) -> float:
    if lambda_value < 0:
        return 0.0
    return exp(-lambda_value) * (lambda_value ** k) / factorial(k)


def build_eda_payload(parent_run_dir: Path, source_df: pd.DataFrame, target_column: str) -> tuple[dict[str, object], list[dict[str, object]]]:
    eda_dir = parent_run_dir / "artifacts" / "eda"
    numeric_columns = get_numeric_columns(source_df)
    if not numeric_columns:
        raise ValueError("The source dataset has no numeric columns for the frontend EDA bundle.")

    if target_column not in numeric_columns:
        target_column = numeric_columns[-1]

    numeric_df = source_df[numeric_columns].apply(pd.to_numeric, errors="coerce")
    numeric_df = numeric_df.fillna(numeric_df.mean(numeric_only=True))
    sample_preview = {
        "columns": [str(column) for column in source_df.columns.tolist()],
        "rows": json.loads(source_df.head(6).to_json(orient="records", date_format="iso")),
        "total_rows": int(len(source_df)),
    }

    numeric_summary = load_table_records(eda_dir / "tables" / "numeric_summary.csv")
    normality = load_table_records(eda_dir / "tables" / "shapiro_summary.csv")
    for row in normality:
        if "is_normal_at_0_05" in row:
            row["is_normal"] = row.pop("is_normal_at_0_05")

    missing = [
        {"column": str(column), "count": int(count)}
        for column, count in source_df.isna().sum().items()
    ]

    transparency: list[dict[str, object]] = []
    if "transparencia" in source_df.columns:
        transparency_counts = source_df["transparencia"].fillna("Missing").value_counts()
        preferred_order = [
            label
            for label in ["Não", "Nao", "NÃ£o", "Sim", "Missing"]
            if label in transparency_counts.index
        ]
        remaining_labels = [label for label in transparency_counts.index if label not in preferred_order]
        transparency = [
            {"label": str(label), "count": int(transparency_counts[label])}
            for label in [*preferred_order, *sorted(remaining_labels)]
        ]

    poisson_payload = {"lambda": 0.0, "k": [0], "expected": [0.0], "observed": [0.0]}
    if "erros_tecnicos" in numeric_df.columns:
        error_series = numeric_df["erros_tecnicos"].dropna().round().astype(int)
        if not error_series.empty:
            lambda_value = float(error_series.mean())
            max_k = int(error_series.max())
            k_values = list(range(max_k + 1))
            observed_counts = error_series.value_counts().sort_index()
            poisson_payload = {
                "lambda": lambda_value,
                "k": k_values,
                "expected": [float(poisson_probability(lambda_value, k)) for k in k_values],
                "observed": [float(observed_counts.get(k, 0) / len(error_series)) for k in k_values],
            }

    target_counts, target_bins = np.histogram(numeric_df[target_column], bins=12)
    histograms: dict[str, dict[str, list[float] | list[int]]] = {}
    for column in numeric_columns:
        counts, bins = np.histogram(numeric_df[column], bins=10)
        histograms[column] = {
            "bins": [float(value) for value in bins[1:]],
            "counts": [int(value) for value in counts],
        }

    correlation_df = numeric_df[numeric_columns].corr().round(3)
    correlation_pairs = (
        correlation_df.where(np.triu(np.ones(correlation_df.shape), k=1).astype(bool))
        .stack()
        .reset_index()
    )
    correlation_pairs.columns = ["feature_1", "feature_2", "correlation"]
    top_pairs = [
        {
            "feature_1": str(row["feature_1"]),
            "feature_2": str(row["feature_2"]),
            "correlation": float(row["correlation"]),
        }
        for _, row in correlation_pairs.reindex(
            correlation_pairs["correlation"].abs().sort_values(ascending=False).index
        ).head(8).iterrows()
    ]

    eda_payload = {
        "target": target_column,
        "numeric_columns": numeric_columns,
        "kpis": {
            "rows": int(len(source_df)),
            "mean_kpi": float(numeric_df[target_column].mean()),
            "mean_satisfacao": float(numeric_df["satisfacao_cidadao"].mean()) if "satisfacao_cidadao" in numeric_df.columns else None,
            "mean_resolucao": float(numeric_df["taxa_resolucao"].mean()) if "taxa_resolucao" in numeric_df.columns else None,
            "mean_tempo_resposta": float(numeric_df["tempo_resposta"].mean()) if "tempo_resposta" in numeric_df.columns else None,
            "mean_taxa_abandono": float(numeric_df["taxa_abandono"].mean()) if "taxa_abandono" in numeric_df.columns else None,
        },
        "sample_preview": sample_preview,
        "numeric_summary": numeric_summary,
        "normality": normality,
        "missing": missing,
        "transparency": transparency,
        "poisson": poisson_payload,
        "target_distribution": {
            "bins": [float(value) for value in target_bins[1:]],
            "counts": [int(value) for value in target_counts],
        },
        "histograms": histograms,
        "correlation": {
            "labels": [str(column) for column in correlation_df.columns.tolist()],
            "matrix": [[float(value) for value in row] for row in correlation_df.values.tolist()],
            "top_pairs": top_pairs,
        },
    }

    scatter_payload = json.loads(numeric_df[numeric_columns].to_json(orient="records"))
    return eda_payload, scatter_payload


def build_image_asset(path: Path, *, key: str, title: str, caption: str, group: str) -> dict[str, str] | None:
    if not path.exists():
        return None
    return {
        "key": key,
        "title": title,
        "caption": caption,
        "group": group,
        "path": relative_path(path),
    }


def first_matching_file(directory: Path, pattern: str) -> Path | None:
    if not directory.exists():
        return None
    matches = sorted(directory.glob(pattern))
    return matches[0] if matches else None


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


def build_tree_payload(model) -> dict[str, object] | None:
    if not hasattr(model, "tree_"):
        return None

    tree = model.tree_
    feature_names = list(getattr(model, "feature_names_in_", []))

    def feature_name(index: int) -> str:
        if index < 0:
            return "leaf"
        if feature_names and index < len(feature_names):
            return str(feature_names[index])
        return f"feature_{index}"

    def walk(node_id: int, depth: int) -> dict[str, object]:
        is_leaf = tree.children_left[node_id] == tree.children_right[node_id]
        payload = {
            "node_id": int(node_id),
            "depth": int(depth),
            "samples": int(tree.n_node_samples[node_id]),
            "value": float(tree.value[node_id][0][0]),
            "impurity": float(tree.impurity[node_id]),
            "is_leaf": bool(is_leaf),
        }
        if is_leaf:
            payload["label"] = "leaf"
            return payload

        payload.update(
            {
                "label": feature_name(int(tree.feature[node_id])),
                "threshold": float(tree.threshold[node_id]),
                "left": walk(int(tree.children_left[node_id]), depth + 1),
                "right": walk(int(tree.children_right[node_id]), depth + 1),
            }
        )
        return payload

    return {
        "max_depth": int(tree.max_depth),
        "node_count": int(tree.node_count),
        "n_leaves": int(tree.n_leaves),
        "export_depth": int(tree.max_depth),
        "root": walk(0, 0),
    }


def build_tree_inference_payload(model) -> dict[str, object] | None:
    if not hasattr(model, "tree_"):
        return None

    tree = model.tree_
    return {
        "children_left": [int(value) for value in tree.children_left.tolist()],
        "children_right": [int(value) for value in tree.children_right.tolist()],
        "feature": [int(value) for value in tree.feature.tolist()],
        "threshold": [float(value) for value in tree.threshold.tolist()],
        "value": [float(node[0][0]) for node in tree.value.tolist()],
    }


def select_options(series: pd.Series) -> tuple[list[str], str | None]:
    cleaned = series.dropna().astype(str).str.strip()
    cleaned = cleaned[cleaned != ""]
    if cleaned.empty:
        return [], None
    counts = cleaned.value_counts()
    options = counts.index.tolist()
    return [str(value) for value in options], str(options[0])


def build_prediction_fields(source_df: pd.DataFrame, target_column: str) -> list[dict[str, object]]:
    fields: list[dict[str, object]] = []
    for column in source_df.columns:
        if column in {"id_registo", target_column}:
            continue

        series = source_df[column]
        if column == DATE_COLUMN:
            options, default = select_options(series)
            fields.append(
                {
                    "name": str(column),
                    "type": "date",
                    "label": str(column),
                    "default": default,
                }
            )
            continue

        if pd.api.types.is_numeric_dtype(series) or pd.api.types.is_bool_dtype(series):
            numeric_series = pd.to_numeric(series, errors="coerce").dropna()
            default = float(numeric_series.median()) if not numeric_series.empty else 0.0
            is_integer = not numeric_series.empty and bool((numeric_series % 1 == 0).all())
            step = 1 if is_integer else 0.01
            if is_integer:
                default_value: int | float = int(round(default))
            else:
                default_value = round(default, 2)
            dataset_min = float(numeric_series.min()) if not numeric_series.empty else None
            dataset_max = float(numeric_series.max()) if not numeric_series.empty else None
            min_value, max_value = PREDICTION_NUMERIC_BOUNDS.get(str(column), (dataset_min, dataset_max))
            fields.append(
                {
                    "name": str(column),
                    "type": "number",
                    "label": str(column),
                    "default": default_value,
                    "step": step,
                    "min": min_value,
                    "max": max_value,
                }
            )
            continue

        options, default = select_options(series)
        fields.append(
            {
                "name": str(column),
                "type": "select",
                "label": str(column),
                "options": options,
                "default": default,
            }
        )
    return fields


def build_preprocessor_payload(parent_run_dir: Path, source_df: pd.DataFrame, target_column: str) -> dict[str, object]:
    preprocessor_path = parent_run_dir / "artifacts" / "preprocessing" / "preprocessor.joblib"
    if not preprocessor_path.exists():
        raise FileNotFoundError("Preprocessor artifact was not found in the latest MLflow parent run.")

    preprocessor = load_joblib_artifact(preprocessor_path)
    prepared_df = prepare_base_dataframe(source_df)
    feature_df, _ = split_features_and_target(prepared_df, target_column)

    numeric_columns = list(preprocessor.transformers_[0][2])
    categorical_columns = list(preprocessor.transformers_[1][2])

    numeric_pipeline = preprocessor.named_transformers_["num"]
    categorical_pipeline = preprocessor.named_transformers_["cat"]

    numeric_imputer = numeric_pipeline.named_steps["imputer"]
    scaler = numeric_pipeline.named_steps["scaler"]
    categorical_imputer = categorical_pipeline.named_steps["imputer"]
    encoder = categorical_pipeline.named_steps["encoder"]

    feature_names = [str(name) for name in preprocessor.get_feature_names_out().tolist()]
    feature_indexes = {name: index for index, name in enumerate(feature_names)}

    numeric_payload: list[dict[str, object]] = []
    for column, fill_value, scale, min_value in zip(
        numeric_columns,
        numeric_imputer.statistics_.tolist(),
        scaler.scale_.tolist(),
        scaler.min_.tolist(),
    ):
        input_name = str(column)
        source = "numeric"
        part = None
        if column.startswith("registo_") and DATE_COLUMN in source_df.columns:
            input_name = DATE_COLUMN
            source = "date"
            part = column.replace("registo_", "")
        output_name = f"num__{column}"
        numeric_payload.append(
            {
                "raw_name": str(column),
                "input_name": input_name,
                "source": source,
                "part": part,
                "index": int(feature_indexes[output_name]),
                "fill_value": float(fill_value),
                "scale": float(scale),
                "min": float(min_value),
            }
        )

    categorical_payload: list[dict[str, object]] = []
    for column, fill_value, categories in zip(
        categorical_columns,
        categorical_imputer.statistics_.tolist(),
        encoder.categories_,
    ):
        options = []
        for category in categories.tolist():
            output_name = f"cat__{column}_{category}"
            options.append(
                {
                    "value": str(category),
                    "index": int(feature_indexes[output_name]),
                }
            )
        categorical_payload.append(
            {
                "raw_name": str(column),
                "input_name": str(column),
                "fill_value": str(fill_value),
                "options": options,
            }
        )

    return {
        "raw_fields": build_prediction_fields(source_df, target_column),
        "feature_count": int(len(feature_names)),
        "feature_names": feature_names,
        "numeric": numeric_payload,
        "categorical": categorical_payload,
        "date_field": DATE_COLUMN if DATE_COLUMN in source_df.columns else None,
    }


def build_prediction_model_payload(
    model_key: str,
    model_name: str,
    model,
    *,
    threshold: float,
) -> dict[str, object]:
    if model_key == "linear_regression":
        return {
            "key": model_key,
            "name": model_name,
            "task": "regression",
            "kind": "linear_regression",
            "intercept": float(model.intercept_),
            "coefficients": [float(value) for value in model.coef_.tolist()],
        }

    if model_key == "decision_tree":
        return {
            "key": model_key,
            "name": model_name,
            "task": "regression",
            "kind": "decision_tree",
            "tree": build_tree_inference_payload(model),
        }

    if model_key == "random_forest":
        return {
            "key": model_key,
            "name": model_name,
            "task": "regression",
            "kind": "random_forest",
            "trees": [build_tree_inference_payload(estimator) for estimator in model.estimators_],
        }

    if model_key == "logistic_regression":
        return {
            "key": model_key,
            "name": model_name,
            "task": "classification",
            "kind": "logistic_regression",
            "intercept": [float(value) for value in model.intercept_.tolist()],
            "coefficients": [[float(weight) for weight in row] for row in model.coef_.tolist()],
            "classes": [int(value) for value in model.classes_.tolist()],
            "threshold": 0.5,
            "labels": {
                "0": f"< {threshold:g}",
                "1": f">= {threshold:g}",
            },
        }

    raise ValueError(f"Unsupported prediction model key: {model_key}")


def build_prediction_payload(
    parent_run_dir: Path,
    source_df: pd.DataFrame,
    target_column: str,
    threshold: float,
    *,
    regression_models: dict[str, tuple[str, Path, Path]],
    logistic_model: tuple[Path, Path],
) -> dict[str, object]:
    transform_payload = build_preprocessor_payload(parent_run_dir, source_df, target_column)
    models_payload: dict[str, dict[str, object]] = {}

    for model_key, (model_name, _run_dir, model_path) in regression_models.items():
        models_payload[model_key] = build_prediction_model_payload(
            model_key,
            model_name,
            load_pickled_model(model_path),
            threshold=threshold,
        )

    logistic_run_dir, logistic_model_path = logistic_model
    models_payload["logistic_regression"] = build_prediction_model_payload(
        "logistic_regression",
        "Logistic Regression",
        load_pickled_model(logistic_model_path),
        threshold=threshold,
    )
    models_payload["logistic_regression"]["selected_run_id"] = logistic_run_dir.name

    return {
        "target_column": target_column,
        "classification_threshold": float(threshold),
        "transform": transform_payload,
        "models": models_payload,
    }


def build_dataset_artifacts(parent_run_dir: Path) -> dict[str, object]:
    eda_dir = parent_run_dir / "artifacts" / "eda"
    preprocessing_dir = parent_run_dir / "artifacts" / "preprocessing"
    image_specs = [
        ("correlation_heatmap", "Correlation Heatmap", "Correlation profile across the processed numeric features.", "eda", eda_dir / "correlation_heatmap.png"),
        ("target_distribution", "Target Distribution", "Distribution of the KPI target from the MLflow EDA stage.", "eda", eda_dir / "target_distribution.png"),
        ("missing_values", "Missing Values", "Missing-value overview captured during the EDA run.", "eda", eda_dir / "missing_values.png"),
        ("transparency_proportion", "Transparency Proportion", "Category balance for the transparency variable.", "eda", eda_dir / "transparency_proportion.png"),
        ("kpi_histogram", "KPI Histogram", "Histogram of the target feature used across the models.", "distribution", eda_dir / "histograms" / "indicador_kpi.png"),
        ("resolution_vs_target", "Resolution vs KPI", "Scatter relation between resolution rate and the KPI target.", "scatter", eda_dir / "scatter_vs_target" / "taxa_resolucao.png"),
    ]

    images = [
        asset
        for asset in (
            build_image_asset(path, key=key, title=title, caption=caption, group=group)
            for key, title, caption, group, path in image_specs
        )
        if asset is not None
    ]

    numeric_summary = load_table_preview(eda_dir / "tables" / "numeric_summary.csv", limit=8)
    shapiro_summary = load_table_preview(eda_dir / "tables" / "shapiro_summary.csv", limit=8)

    return {
        "processed_dataset": {"path": relative_path(preprocessing_dir / "processed_dataset.csv")},
        "images": images,
        "tables": {
            "numeric_summary": numeric_summary,
            "shapiro_summary": shapiro_summary,
        },
    }


def build_run_metadata(run_dir: Path) -> dict[str, object]:
    run_name_path = run_dir / "tags" / "mlflow.runName"
    return {
        "id": run_dir.name,
        "name": read_text(run_name_path) if run_name_path.exists() else run_dir.name,
        "params": read_params_directory(run_dir / "params"),
    }


def build_regression_model(
    model_key: str,
    model_name: str,
    run_dir: Path,
    model_path: Path,
    X,
    y,
    random_state: int,
) -> dict[str, object]:
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
        "run": build_run_metadata(run_dir),
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
        "artifacts": {
            "diagnostic_plot": relative_path(
                first_matching_file(run_dir / "artifacts" / "metrics", "*.png")
            )
        },
        "tree": build_tree_payload(model),
    }


def build_logistic_model(
    run_items: list[tuple[Path, Path]],
    X,
    y_regression,
    threshold: float,
    random_state: int,
) -> dict[str, object]:
    target = (y_regression >= threshold).astype(int)
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        target,
        test_size=TEST_SIZE,
        random_state=random_state,
        stratify=target,
    )

    variants: list[dict[str, object]] = []
    for run_dir, model_path in run_items:
        model = load_pickled_model(model_path)
        train_predictions = model.predict(X_train)
        test_predictions = model.predict(X_test)
        c_value = float(getattr(model, "C", 1.0))

        metrics_dir = run_dir / "artifacts" / "metrics"
        classification_report_path = first_matching_file(metrics_dir, "*classification_report*.csv")
        confusion_matrix_path = first_matching_file(metrics_dir, "*confusion_matrix*.png")

        variants.append(
            {
                "c": c_value,
                "run": build_run_metadata(run_dir),
                "train_accuracy": float(accuracy_score(y_train, train_predictions)),
                "test_accuracy": float(accuracy_score(y_test, test_predictions)),
                "train": classification_metrics(y_train, train_predictions),
                "test": {
                    **classification_metrics(y_test, test_predictions),
                    "confusion_matrix": confusion_matrix(y_test, test_predictions).astype(int).tolist(),
                },
                "artifacts": {
                    "confusion_matrix_image": relative_path(confusion_matrix_path),
                    "classification_report": load_table_preview(classification_report_path, limit=10)
                    if classification_report_path is not None
                    else None,
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
        target_column = str(read_text(params_dir / "target_column"))
    if (params_dir / "classification_threshold").exists():
        threshold = float(read_text(params_dir / "classification_threshold"))

    X, y_regression = load_processed_dataset(parent_run_dir, target_column)

    model_runs = {
        "linear_regression": ("Linear Regression", child_runs.get("linear_regression")),
        "random_forest": ("Random Forest", child_runs.get("random_forest_regressor")),
        "decision_tree": ("Decision Tree", child_runs.get("decision_tree_regressor")),
    }

    missing_runs = [name for name, (_, run_dir) in model_runs.items() if run_dir is None]
    logistic_run_items = [
        (run_dir, find_model_pickle(experiment_dir, run_dir))
        for run_name, run_dir in child_runs.items()
        if run_name.startswith("logistic_regression_classifier")
    ]
    if not logistic_run_items:
        missing_runs.append("logistic_regression")
    if missing_runs:
        missing_display = ", ".join(sorted(missing_runs))
        raise FileNotFoundError(f"Missing MLflow model runs for: {missing_display}.")

    stats = {
        "meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "experiment_id": experiment_dir.name,
            "parent_run_id": parent_run_id,
            "target_column": target_column,
            "classification_threshold": float(threshold),
            "random_state": int(random_state),
            "test_size": float(TEST_SIZE),
        },
        "dataset": {
            **build_dataset_summary(parent_run_dir),
            "artifacts": build_dataset_artifacts(parent_run_dir),
        },
        "models": {},
    }

    regression_prediction_models: dict[str, tuple[str, Path, Path]] = {}

    for model_key, (model_name, run_dir) in model_runs.items():
        assert run_dir is not None
        model_path = find_model_pickle(experiment_dir, run_dir)
        stats["models"][model_key] = build_regression_model(
            model_key=model_key,
            model_name=model_name,
            run_dir=run_dir,
            model_path=model_path,
            X=X,
            y=y_regression,
            random_state=random_state,
        )
        regression_prediction_models[model_key] = (model_name, run_dir, model_path)

    stats["models"]["logistic_regression"] = build_logistic_model(
        run_items=logistic_run_items,
        X=X,
        y_regression=y_regression,
        threshold=threshold,
        random_state=random_state,
    )

    source_df = load_source_dataset(parent_run_dir, target_column)
    eda_payload, scatter_payload = build_eda_payload(parent_run_dir, source_df, target_column)
    selected_logistic_run_id = str(stats["models"]["logistic_regression"]["metrics"]["selected"]["run"]["id"])
    selected_logistic_model = next(
        (run_dir, model_path)
        for run_dir, model_path in logistic_run_items
        if run_dir.name == selected_logistic_run_id
    )
    stats["predictions"] = build_prediction_payload(
        parent_run_dir,
        source_df,
        target_column,
        threshold,
        regression_models=regression_prediction_models,
        logistic_model=selected_logistic_model,
    )

    write_window_payload(MODEL_STATS_PATH, "MODEL_STATS", stats)
    write_window_payload(EDA_BUNDLE_PATH, "EDA_DATA", eda_payload)
    write_window_payload(EDA_SCATTER_BUNDLE_PATH, "EDA_SCATTER_DATA", scatter_payload)
    print(f"Dashboard bundles written to {ARTIFACTS_DIR}")


if __name__ == "__main__":
    main()
