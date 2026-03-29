from __future__ import annotations

import json
from datetime import datetime, timezone

from model_common import ARTIFACTS_DIR, DATASET_PATH, to_serializable
from train_decision_tree_model import train_decision_tree_model
from train_linear_model import train_linear_model
from train_logistic_model import train_logistic_model
from train_neural_network_model import train_neural_network_model
from train_random_forest_model import train_random_forest_model


def build_dataset_summary():
    import pandas as pd  # type: ignore

    df = pd.read_csv(DATASET_PATH)
    class_series = (df["indicador_kpi"] >= 70).astype(int)
    return {
        "rows": int(len(df)),
        "columns": int(len(df.columns)),
        "target_mean": float(df["indicador_kpi"].mean()),
        "target_median": float(df["indicador_kpi"].median()),
        "target_std": float(df["indicador_kpi"].std()),
        "class_balance": {
            "positive": int(class_series.sum()),
            "negative": int((1 - class_series).sum()),
        },
        "threshold": 70,
    }


def build_bundle() -> dict:
    linear = train_linear_model()
    forest = train_random_forest_model()
    tree = train_decision_tree_model()
    neural_network = train_neural_network_model()
    logistic = train_logistic_model()
    regressors = {
        "linear_regression": linear,
        "random_forest": forest,
        "decision_tree": tree,
        "neural_network": neural_network,
    }
    best_regressor_key, best_regressor_payload = min(
        regressors.items(),
        key=lambda item: item[1]["metrics"]["selected"]["test"]["rmse"],
    )

    bundle = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "dataset": build_dataset_summary(),
        "models": {
            "linear_regression": linear,
            "random_forest": forest,
            "decision_tree": tree,
            "neural_network": neural_network,
            "logistic_regression": logistic,
        },
        "overview": {
            "best_regressor": best_regressor_key,
            "best_regressor_rmse": best_regressor_payload["metrics"]["selected"]["test"]["rmse"],
            "best_classifier": "logistic_regression",
            "best_classifier_accuracy": logistic["metrics"]["selected"]["test_accuracy"],
        },
    }
    return bundle


def write_bundle(bundle: dict) -> None:
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)

    json_path = ARTIFACTS_DIR / "model_stats.json"
    js_path = ARTIFACTS_DIR / "model_stats.js"

    serializable = to_serializable(bundle)
    json_text = json.dumps(serializable, indent=2)
    json_path.write_text(json_text, encoding="utf-8")
    js_path.write_text(f"window.MODEL_STATS = {json_text};\n", encoding="utf-8")


if __name__ == "__main__":
    write_bundle(build_bundle())
    print(f"Wrote bundle to {ARTIFACTS_DIR}")
