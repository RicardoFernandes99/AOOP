from __future__ import annotations

from pathlib import Path

from model_common import (
    CATEGORICAL_COLUMNS,
    MODELS_DIR,
    load_dataset,
    regression_plot_block,
    regression_metric_block,
    require_ml_dependencies,
    save_stats_file,
    shared_split_payload,
    split_frame_with_shared_indices,
)


def train_random_forest_model() -> dict:
    require_ml_dependencies()

    import joblib  # type: ignore
    from sklearn.compose import ColumnTransformer  # type: ignore
    from sklearn.ensemble import RandomForestRegressor  # type: ignore
    from sklearn.pipeline import Pipeline  # type: ignore
    from sklearn.preprocessing import OneHotEncoder  # type: ignore

    data = load_dataset()
    train_df, test_df = split_frame_with_shared_indices(data)
    x_train = train_df.drop(columns=["indicador_kpi", "data_registo"])
    y_train = train_df["indicador_kpi"]
    x_test = test_df.drop(columns=["indicador_kpi", "data_registo"])
    y_test = test_df["indicador_kpi"]

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "encode_categories",
                OneHotEncoder(handle_unknown="ignore"),
                CATEGORICAL_COLUMNS,
            )
        ],
        remainder="passthrough",
    )

    model = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("regressor", RandomForestRegressor(n_estimators=100, random_state=42)),
        ]
    )
    model.fit(x_train, y_train)
    train_pred = model.predict(x_train)
    y_pred = model.predict(x_test)

    payload = {
        "key": "random_forest",
        "name": "Random Forest",
        "task": "regression",
        "source": "teste/random_forest.ipynb",
        "artifact": "teste/artifacts/models/random_forest.joblib",
        "split": shared_split_payload(len(train_df), len(test_df)),
        "metrics": {
            "selected": {
                "train": regression_metric_block(y_train, train_pred),
                "test": regression_metric_block(y_test, y_pred),
            },
        },
        "plots": {
            "test_actual_vs_predicted": regression_plot_block(y_test, y_pred),
        },
    }

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODELS_DIR / "random_forest.joblib")
    save_stats_file("random_forest", payload)
    return payload


if __name__ == "__main__":
    result = train_random_forest_model()
    print(f"Saved {result['name']} to {Path(result['artifact'])}")
