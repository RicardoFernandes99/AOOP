from __future__ import annotations

from pathlib import Path

from model_common import (
    CATEGORICAL_COLUMNS,
    MODELS_DIR,
    load_dataset,
    regression_metric_block,
    regression_plot_block,
    require_ml_dependencies,
    save_stats_file,
    shared_split_payload,
    split_frame_with_shared_indices,
)


def train_neural_network_model() -> dict:
    require_ml_dependencies()

    import joblib  # type: ignore
    from sklearn.compose import ColumnTransformer  # type: ignore
    from sklearn.neural_network import MLPRegressor  # type: ignore
    from sklearn.pipeline import Pipeline  # type: ignore
    from sklearn.preprocessing import MinMaxScaler, OneHotEncoder  # type: ignore

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
                OneHotEncoder(handle_unknown="ignore", sparse_output=False),
                CATEGORICAL_COLUMNS,
            )
        ],
        remainder="passthrough",
    )

    model = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("scaler", MinMaxScaler()),
            (
                "regressor",
                MLPRegressor(
                    hidden_layer_sizes=(32, 16),
                    activation="relu",
                    solver="adam",
                    early_stopping=True,
                    max_iter=1000,
                    random_state=42,
                ),
            ),
        ]
    )
    model.fit(x_train, y_train)
    train_pred = model.predict(x_train)
    y_pred = model.predict(x_test)

    regressor = model.named_steps["regressor"]
    payload = {
        "key": "neural_network",
        "name": "Artificial Neural Network",
        "task": "regression",
        "source": "teste/neural_network.ipynb",
        "artifact": "teste/artifacts/models/neural_network.joblib",
        "split": shared_split_payload(len(train_df), len(test_df)),
        "network": {
            "hidden_layer_sizes": list(regressor.hidden_layer_sizes)
            if isinstance(regressor.hidden_layer_sizes, tuple)
            else [int(regressor.hidden_layer_sizes)],
            "activation": regressor.activation,
            "solver": regressor.solver,
            "loss": float(regressor.loss_),
            "n_iter": int(regressor.n_iter_),
        },
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
    joblib.dump(model, MODELS_DIR / "neural_network.joblib")
    save_stats_file("neural_network", payload)
    return payload


if __name__ == "__main__":
    result = train_neural_network_model()
    print(f"Saved {result['name']} to {Path(result['artifact'])}")
