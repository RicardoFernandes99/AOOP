from __future__ import annotations

from pathlib import Path

from model_common import (
    classification_metric_block,
    classification_plot_block,
    MODELS_DIR,
    load_dataset,
    require_ml_dependencies,
    save_stats_file,
    shared_split_payload,
    split_frame_with_shared_indices,
)


def train_logistic_model() -> dict:
    require_ml_dependencies()

    import joblib  # type: ignore
    import pandas as pd  # type: ignore
    from sklearn.linear_model import LogisticRegression  # type: ignore
    from sklearn.metrics import accuracy_score
    from sklearn.preprocessing import MinMaxScaler  # type: ignore

    df = load_dataset()
    train_df, test_df = split_frame_with_shared_indices(df)

    train_df = train_df.drop("data_registo", axis=1)
    test_df = test_df.drop("data_registo", axis=1)
    train_df["kpi_class"] = (train_df["indicador_kpi"] >= 70).astype(int)
    test_df["kpi_class"] = (test_df["indicador_kpi"] >= 70).astype(int)

    x_train = pd.get_dummies(train_df.drop(["indicador_kpi", "kpi_class"], axis=1))
    x_test = pd.get_dummies(test_df.drop(["indicador_kpi", "kpi_class"], axis=1))
    x_test = x_test.reindex(columns=x_train.columns, fill_value=0)
    y_train = train_df["kpi_class"]
    y_test = test_df["kpi_class"]

    scaler = MinMaxScaler()
    x_train_scaled = scaler.fit_transform(x_train)
    x_test_scaled = scaler.transform(x_test)

    variants = []
    best_variant = None
    best_score = -1.0

    for c_value in (1.0, 100.0, 0.01):
        model = LogisticRegression(solver="liblinear", random_state=0, C=c_value)
        model.fit(x_train_scaled, y_train)

        train_pred = model.predict(x_train_scaled)
        test_pred = model.predict(x_test_scaled)
        train_prob = model.predict_proba(x_train_scaled)[:, 1]
        test_prob = model.predict_proba(x_test_scaled)[:, 1]
        train_accuracy = accuracy_score(y_train, train_pred)
        test_accuracy = accuracy_score(y_test, test_pred)

        variant = {
            "c": c_value,
            "train_accuracy": train_accuracy,
            "test_accuracy": test_accuracy,
            "train": classification_metric_block(y_train, train_pred, train_prob),
            "test": classification_metric_block(y_test, test_pred, test_prob),
        }
        variants.append(variant)

        if test_accuracy > best_score:
            best_score = test_accuracy
            best_variant = {
                **variant,
                "model": model,
            }

    payload = {
        "key": "logistic_regression",
        "name": "Logistic Regression",
        "task": "classification",
        "source": "teste/logistic-regression-classifier-tutorial.ipynb",
        "artifact": "teste/artifacts/models/logistic_regression.joblib",
        "split": shared_split_payload(len(train_df), len(test_df)),
        "threshold": 70,
        "metrics": {
            "selected": {
                "c": best_variant["c"],
                "train_accuracy": best_variant["train_accuracy"],
                "test_accuracy": best_variant["test_accuracy"],
                "train": best_variant["train"],
                "test": best_variant["test"],
            },
            "baseline": next(variant for variant in variants if variant["c"] == 1.0),
            "variants": variants,
        },
        "plots": {},
    }

    best_test_prob = best_variant["model"].predict_proba(x_test_scaled)[:, 1]
    payload["plots"]["test_probability_vs_actual"] = classification_plot_block(
        y_test, best_test_prob
    )

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(
        {
            "scaler": scaler,
            "model": best_variant["model"],
            "columns": x_train.columns.tolist(),
        },
        MODELS_DIR / "logistic_regression.joblib",
    )
    save_stats_file("logistic_regression", payload)
    return payload


if __name__ == "__main__":
    result = train_logistic_model()
    print(f"Saved {result['name']} to {Path(result['artifact'])}")
