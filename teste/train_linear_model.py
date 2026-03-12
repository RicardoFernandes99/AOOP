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


def train_linear_model() -> dict:
    require_ml_dependencies()

    import joblib  # type: ignore
    from sklearn.compose import ColumnTransformer  # type: ignore
    from sklearn.linear_model import LinearRegression  # type: ignore
    from sklearn.preprocessing import OneHotEncoder  # type: ignore

    df = load_dataset()
    train_df, test_df = split_frame_with_shared_indices(df)
    x_train_raw = train_df.drop(["indicador_kpi", "data_registo"], axis=1)
    y_train = train_df["indicador_kpi"]
    x_test_raw = test_df.drop(["indicador_kpi", "data_registo"], axis=1)
    y_test = test_df["indicador_kpi"]

    encoder = ColumnTransformer(
        transformers=[
            ("encoder", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL_COLUMNS)
        ],
        remainder="passthrough",
    )
    x_train = encoder.fit_transform(x_train_raw)
    x_test = encoder.transform(x_test_raw)

    model = LinearRegression()
    model.fit(x_train, y_train)
    train_pred = model.predict(x_train)
    y_pred = model.predict(x_test)

    payload = {
        "key": "linear_regression",
        "name": "Linear Regression",
        "task": "regression",
        "source": "teste/multiple-linear-regression-with-onehotencoding.ipynb",
        "artifact": "teste/artifacts/models/linear_regression.joblib",
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
    joblib.dump(
        {"preprocessor": encoder, "model": model},
        MODELS_DIR / "linear_regression.joblib",
    )
    save_stats_file("linear_regression", payload)
    return payload


if __name__ == "__main__":
    result = train_linear_model()
    print(f"Saved {result['name']} to {Path(result['artifact'])}")
