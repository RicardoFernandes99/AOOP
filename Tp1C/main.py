"""Main entrypoint for the end-to-end CP1 MLflow pipeline."""

from __future__ import annotations

import argparse
from pathlib import Path

import mlflow
import pandas as pd

from src.cp1_pipeline.config import DEFAULT_ARTIFACT_DIR
from src.cp1_pipeline.data import load_dataset, prepare_dataset
from src.cp1_pipeline.eda import run_eda
from src.cp1_pipeline.mlflow_utils import setup_mlflow
from src.cp1_pipeline.preprocessing import (
    build_preprocessor,
    save_processed_splits,
    split_targets,
)
from src.cp1_pipeline.training import train_and_log_models


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the CP1 MLflow pipeline.")
    parser.add_argument(
        "--data",
        default="Dataset-iGov.csv",
        help="Path to the dataset CSV file. Defaults to Dataset-iGov.csv in the project root.",
    )
    parser.add_argument("--experiment-name", default="cp1-mlflow-pipeline")
    parser.add_argument("--tracking-uri", default="file:./mlruns")
    parser.add_argument("--artifact-dir", default=str(DEFAULT_ARTIFACT_DIR))
    parser.add_argument("--test-size", type=float, default=0.2)
    parser.add_argument("--random-state", type=int, default=42)
    parser.add_argument(
        "--register-model",
        action="store_true",
        help="Register models in the MLflow Model Registry when available.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    setup_mlflow(args.tracking_uri, args.experiment_name)

    artifact_dir = Path(args.artifact_dir)
    eda_dir = artifact_dir / "eda"
    processed_dir = artifact_dir / "processed"
    reports_dir = artifact_dir / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)

    with mlflow.start_run(run_name="cp1_full_pipeline"):
        mlflow.set_tag("workflow", "end_to_end")
        mlflow.log_params(
            {
                "data_path": args.data,
                "test_size": args.test_size,
                "random_state": args.random_state,
            }
        )

        raw_df = load_dataset(args.data)
        prepared_df = prepare_dataset(raw_df)
        mlflow.log_metric("row_count", int(len(prepared_df)))
        mlflow.log_metric("column_count", int(prepared_df.shape[1]))

        eda_artifacts = run_eda(prepared_df, eda_dir)
        for path in eda_artifacts.values():
            if path.exists():
                mlflow.log_artifact(str(path), artifact_path="eda")

        splits = split_targets(
            prepared_df,
            test_size=args.test_size,
            random_state=args.random_state,
        )
        processed_paths = save_processed_splits(splits, processed_dir)
        for path in processed_paths.values():
            mlflow.log_artifact(str(path), artifact_path="processed")

        regression_preprocessor = build_preprocessor(prepared_df, scale_numeric=False)
        classification_preprocessor = build_preprocessor(prepared_df, scale_numeric=True)

        training_result = train_and_log_models(
            df=prepared_df,
            splits=splits,
            regression_preprocessor=regression_preprocessor,
            classification_preprocessor=classification_preprocessor,
            artifact_dir=reports_dir,
            register_model=args.register_model,
        )

        best_summary = pd.DataFrame(
            [
                {
                    "best_regression_model": training_result["best_regression_name"],
                    **training_result["best_regression_metrics"],
                    "classification_model": training_result["classification_result"]["model_name"],
                    "classification_accuracy": training_result["classification_result"]["accuracy"],
                    "classification_f1": training_result["classification_result"]["f1"],
                }
            ]
        )
        best_summary_path = reports_dir / "best_model_summary.csv"
        best_summary.to_csv(best_summary_path, index=False)
        mlflow.log_artifact(str(best_summary_path), artifact_path="reports")


if __name__ == "__main__":
    main()
