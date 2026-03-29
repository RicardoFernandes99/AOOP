from __future__ import annotations

from pathlib import Path

from model_common import (
    MODELS_DIR,
    regression_plot_block,
    load_dataset,
    regression_metric_block,
    require_ml_dependencies,
    save_stats_file,
    shared_split_payload,
    split_frame_with_shared_indices,
)


def train_decision_tree_model() -> dict:
    require_ml_dependencies()

    import joblib  # type: ignore
    import pandas as pd  # type: ignore
    from sklearn.model_selection import GridSearchCV  # type: ignore
    from sklearn.tree import DecisionTreeRegressor  # type: ignore

    df = load_dataset()
    train_df, test_df = split_frame_with_shared_indices(df)

    train_df = train_df.drop("data_registo", axis=1)
    test_df = test_df.drop("data_registo", axis=1)

    categorical_columns = train_df.select_dtypes(include=["object"]).columns
    train_encoded = pd.get_dummies(
        train_df, columns=categorical_columns, drop_first=False
    ).astype(int)
    test_encoded = pd.get_dummies(
        test_df, columns=categorical_columns, drop_first=False
    ).astype(int)
    test_encoded = test_encoded.reindex(columns=train_encoded.columns, fill_value=0)

    x_train = train_encoded.drop("indicador_kpi", axis=1)
    y_train = train_encoded["indicador_kpi"]
    x_test = test_encoded.drop("indicador_kpi", axis=1)
    y_test = test_encoded["indicador_kpi"]

    base_model = DecisionTreeRegressor(
        max_depth=4,
        min_samples_leaf=10,
        random_state=42,
    )
    base_model.fit(x_train, y_train)
    base_train_pred = base_model.predict(x_train)
    base_pred = base_model.predict(x_test)

    grid_search = GridSearchCV(
        estimator=DecisionTreeRegressor(random_state=42),
        param_grid={
            "max_depth": [1, 2, 3, 4, 5, 7, 10],
            "min_samples_split": [2, 4, 5, 6, 10],
            "min_samples_leaf": [1, 2, 3, 4, 10],
        },
        cv=5,
    )
    grid_search.fit(x_train, y_train)
    tuned_model = grid_search.best_estimator_
    tuned_train_pred = tuned_model.predict(x_train)
    tuned_pred = tuned_model.predict(x_test)

    payload = {
        "key": "decision_tree",
        "name": "Decision Tree",
        "task": "regression",
        "source": "teste/decision_tree.ipynb",
        "artifact": "teste/artifacts/models/decision_tree.joblib",
        "split": shared_split_payload(len(train_df), len(test_df)),
        "metrics": {
            "selected": {
                "train": regression_metric_block(y_train, tuned_train_pred),
                "test": regression_metric_block(y_test, tuned_pred),
            },
            "baseline": {
                "train": regression_metric_block(y_train, base_train_pred),
                "test": regression_metric_block(y_test, base_pred),
            },
            "best_params": grid_search.best_params_,
        },
        "plots": {
            "test_actual_vs_predicted": regression_plot_block(y_test, tuned_pred),
            "baseline_test_actual_vs_predicted": regression_plot_block(y_test, base_pred),
        },
    }

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(tuned_model, MODELS_DIR / "decision_tree.joblib")
    save_stats_file("decision_tree", payload)
    return payload


if __name__ == "__main__":
    result = train_decision_tree_model()
    print(f"Saved {result['name']} to {Path(result['artifact'])}")
