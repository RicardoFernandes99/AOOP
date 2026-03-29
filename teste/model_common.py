from __future__ import annotations

import json
from pathlib import Path
from typing import Any


ROOT_DIR = Path(__file__).resolve().parents[1]
DATASET_PATH = ROOT_DIR / "Dataset-iGov.csv"
ARTIFACTS_DIR = ROOT_DIR / "teste" / "artifacts"
MODELS_DIR = ARTIFACTS_DIR / "models"
PLOTS_DIR = ARTIFACTS_DIR / "plots"
STATS_DIR = ARTIFACTS_DIR / "stats"

CATEGORICAL_COLUMNS = [
    "unidade_organizacional",
    "tipo_servico",
    "canal_utilizado",
    "transparencia",
    "feedback_cidadao",
    "segmentacao_utilizador",
    "area_tematica",
]

SPLIT_TEST_SIZE = 0.2
SPLIT_RANDOM_STATE = 42


def ensure_dirs() -> None:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    PLOTS_DIR.mkdir(parents=True, exist_ok=True)
    STATS_DIR.mkdir(parents=True, exist_ok=True)


def require_ml_dependencies() -> None:
    missing: list[str] = []
    for module_name in ("pandas", "sklearn", "joblib", "matplotlib"):
        try:
            __import__(module_name)
        except ImportError:
            missing.append(module_name)
    if missing:
        names = ", ".join(missing)
        raise SystemExit(
            f"Missing Python dependencies: {names}. "
            "Install the training dependencies before running this script."
        )


def round_float(value: Any, digits: int = 4) -> Any:
    if isinstance(value, float):
        return round(value, digits)
    return value


def to_serializable(value: Any) -> Any:
    if isinstance(value, dict):
        return {str(key): to_serializable(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [to_serializable(item) for item in value]
    try:
        import numpy as np  # type: ignore

        if isinstance(value, np.generic):
            return value.item()
        if isinstance(value, np.ndarray):
            return value.tolist()
    except Exception:
        pass
    if isinstance(value, float):
        return round_float(value)
    return value


def save_stats_file(name: str, payload: dict[str, Any]) -> Path:
    ensure_dirs()
    path = STATS_DIR / f"{name}.json"
    path.write_text(json.dumps(to_serializable(payload), indent=2), encoding="utf-8")
    return path


def load_dataset():
    require_ml_dependencies()

    import pandas as pd  # type: ignore

    return pd.read_csv(DATASET_PATH)


def get_shared_split_indices(df):
    require_ml_dependencies()

    from sklearn.model_selection import train_test_split  # type: ignore

    train_index, test_index = train_test_split(
        df.index.to_list(),
        test_size=SPLIT_TEST_SIZE,
        random_state=SPLIT_RANDOM_STATE,
        shuffle=True,
    )
    return train_index, test_index


def split_frame_with_shared_indices(df):
    train_index, test_index = get_shared_split_indices(df)
    train_df = df.loc[train_index].copy()
    test_df = df.loc[test_index].copy()
    return train_df, test_df


def shared_split_payload(train_count: int, test_count: int) -> dict[str, Any]:
    return {
        "test_size": SPLIT_TEST_SIZE,
        "random_state": SPLIT_RANDOM_STATE,
        "train_rows": train_count,
        "test_rows": test_count,
        "shared_indices": True,
    }


def regression_metric_block(y_true, y_pred):
    from sklearn.metrics import (  # type: ignore
        explained_variance_score,
        max_error,
        mean_absolute_error,
        mean_squared_error,
        median_absolute_error,
        r2_score,
    )

    mse = mean_squared_error(y_true, y_pred)
    return {
        "mae": mean_absolute_error(y_true, y_pred),
        "mse": mse,
        "rmse": mse**0.5,
        "r2": r2_score(y_true, y_pred),
        "explained_variance": explained_variance_score(y_true, y_pred),
        "median_absolute_error": median_absolute_error(y_true, y_pred),
        "max_error": max_error(y_true, y_pred),
    }


def classification_metric_block(y_true, y_pred, y_prob):
    from sklearn.metrics import (  # type: ignore
        accuracy_score,
        classification_report,
        confusion_matrix,
        f1_score,
        precision_score,
        recall_score,
        roc_auc_score,
    )

    return {
        "accuracy": accuracy_score(y_true, y_pred),
        "precision": precision_score(y_true, y_pred, zero_division=0),
        "recall": recall_score(y_true, y_pred, zero_division=0),
        "f1": f1_score(y_true, y_pred, zero_division=0),
        "roc_auc": roc_auc_score(y_true, y_prob),
        "confusion_matrix": confusion_matrix(y_true, y_pred).tolist(),
        "report": classification_report(
            y_true, y_pred, output_dict=True, zero_division=0
        ),
    }


def regression_plot_block(y_true, y_pred) -> dict[str, Any]:
    points = [
        {"actual": float(actual), "predicted": float(predicted)}
        for actual, predicted in zip(y_true.tolist(), y_pred.tolist())
    ]
    values = [point["actual"] for point in points] + [point["predicted"] for point in points]
    return {
        "points": points,
        "min": float(min(values)),
        "max": float(max(values)),
    }


def classification_plot_block(y_true, y_prob) -> dict[str, Any]:
    points = [
        {"actual": int(actual), "predicted_probability": float(probability)}
        for actual, probability in zip(y_true.tolist(), y_prob.tolist())
    ]
    return {
        "points": points,
        "min": 0.0,
        "max": 1.0,
    }
