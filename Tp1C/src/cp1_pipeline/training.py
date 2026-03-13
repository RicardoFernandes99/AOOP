"""Training, evaluation, comparison, and MLflow logging."""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
import mlflow
import mlflow.sklearn
import pandas as pd
import seaborn as sns
from sklearn.metrics import ConfusionMatrixDisplay

from .config import CLASSIFICATION_TARGET, TARGET_COLUMN
from .models import (
    build_classification_model,
    build_regression_models,
    classification_metrics,
    extract_model_params,
    regression_metrics,
)


def _log_metric_dict(metrics: dict[str, float], prefix: str) -> None:
    for key, value in metrics.items():
        mlflow.log_metric(f"{prefix}_{key}", value)


def train_and_log_models(
    df: pd.DataFrame,
    splits: dict[str, pd.DataFrame | pd.Series],
    regression_preprocessor,
    classification_preprocessor,
    artifact_dir: str | Path,
    register_model: bool = False,
) -> dict[str, object]:
    artifact_path = Path(artifact_dir)
    artifact_path.mkdir(parents=True, exist_ok=True)

    x_train = splits["X_train"]
    x_test = splits["X_test"]
    y_reg_train = splits["y_reg_train"]
    y_reg_test = splits["y_reg_test"]
    y_clf_train = splits["y_clf_train"]
    y_clf_test = splits["y_clf_test"]

    regression_results: list[dict[str, float | str]] = []
    best_regression_name = None
    best_regression_metrics = None
    best_regression_model = None
    best_rmse = float("inf")

    for model_name, model in build_regression_models(regression_preprocessor).items():
        with mlflow.start_run(run_name=model_name, nested=True):
            mlflow.set_tag("stage", "training")
            mlflow.set_tag("task_type", "regression")
            mlflow.log_param("target_column", TARGET_COLUMN)
            mlflow.log_param("model_name", model_name)
            mlflow.log_params(extract_model_params(model))

            model.fit(x_train, y_reg_train)
            predictions = model.predict(x_test)
            metrics = regression_metrics(y_reg_test, predictions)
            _log_metric_dict(metrics, "test")

            predictions_path = artifact_path / f"{model_name}_predictions.csv"
            pd.DataFrame(
                {
                    "actual": y_reg_test,
                    "predicted": predictions,
                }
            ).to_csv(predictions_path, index=False)
            mlflow.log_artifact(str(predictions_path), artifact_path="predictions")

            model_info = mlflow.sklearn.log_model(
                sk_model=model,
                name=model_name,
                registered_model_name=model_name if register_model else None,
            )
            mlflow.set_tag("model_uri", model_info.model_uri)

            result_row = {"model_name": model_name, **metrics, "model_uri": model_info.model_uri}
            regression_results.append(result_row)

            if metrics["rmse"] < best_rmse:
                best_rmse = metrics["rmse"]
                best_regression_name = model_name
                best_regression_metrics = metrics
                best_regression_model = model

    classification_model_uri = None
    classification_result = {}
    with mlflow.start_run(run_name="logistic_regression", nested=True):
        model_name = "logistic_regression"
        model = build_classification_model(classification_preprocessor)

        mlflow.set_tag("stage", "training")
        mlflow.set_tag("task_type", "classification")
        mlflow.log_param("target_column", CLASSIFICATION_TARGET)
        mlflow.log_param("model_name", model_name)
        mlflow.log_params(extract_model_params(model))

        model.fit(x_train, y_clf_train)
        predictions = model.predict(x_test)
        probabilities = model.predict_proba(x_test)[:, 1]
        metrics = classification_metrics(y_clf_test, predictions, probabilities)
        _log_metric_dict(metrics, "test")

        confusion_path = artifact_path / "logistic_regression_confusion_matrix.png"
        ConfusionMatrixDisplay.from_predictions(y_clf_test, predictions)
        plt.tight_layout()
        plt.savefig(confusion_path, dpi=150)
        plt.close()
        mlflow.log_artifact(str(confusion_path), artifact_path="plots")

        predictions_path = artifact_path / "logistic_regression_predictions.csv"
        pd.DataFrame(
            {
                "actual": y_clf_test,
                "predicted": predictions,
                "probability": probabilities,
            }
        ).to_csv(predictions_path, index=False)
        mlflow.log_artifact(str(predictions_path), artifact_path="predictions")

        model_info = mlflow.sklearn.log_model(
            sk_model=model,
            name="logistic_regression",
            registered_model_name=model_name if register_model else None,
        )
        classification_model_uri = model_info.model_uri
        mlflow.set_tag("model_uri", model_info.model_uri)
        classification_result = {"model_name": model_name, **metrics, "model_uri": model_info.model_uri}

    regression_results_df = pd.DataFrame(regression_results).sort_values("rmse")
    regression_table_path = artifact_path / "regression_model_comparison.csv"
    regression_results_df.to_csv(regression_table_path, index=False)
    mlflow.log_artifact(str(regression_table_path), artifact_path="reports")

    classification_table_path = artifact_path / "classification_model_comparison.csv"
    pd.DataFrame([classification_result]).to_csv(classification_table_path, index=False)
    mlflow.log_artifact(str(classification_table_path), artifact_path="reports")

    comparison_plot_path = artifact_path / "regression_model_comparison.png"
    plt.figure(figsize=(8, 5))
    sns.barplot(data=regression_results_df, x="model_name", y="rmse", palette="Blues_d")
    plt.title("Regression Model Comparison by RMSE")
    plt.ylabel("RMSE")
    plt.xlabel("Model")
    plt.tight_layout()
    plt.savefig(comparison_plot_path, dpi=150)
    plt.close()
    mlflow.log_artifact(str(comparison_plot_path), artifact_path="plots")

    mlflow.log_metric("best_regression_rmse", best_regression_metrics["rmse"])
    mlflow.log_metric("best_regression_r2", best_regression_metrics["r2"])
    mlflow.set_tag("best_regression_model", best_regression_name)
    mlflow.set_tag("best_regression_model_uri", regression_results_df.iloc[0]["model_uri"])
    mlflow.set_tag("classification_model_uri", classification_model_uri)

    return {
        "best_regression_name": best_regression_name,
        "best_regression_metrics": best_regression_metrics,
        "best_regression_model": best_regression_model,
        "regression_results": regression_results_df,
        "classification_result": classification_result,
        "classification_model_uri": classification_model_uri,
    }
