"""Helpers for consistent MLflow setup and artifact logging."""

from __future__ import annotations

from pathlib import Path

import mlflow
import pandas as pd

from .config import DEFAULT_EXPERIMENT_NAME, DEFAULT_TRACKING_URI


def setup_mlflow(tracking_uri: str = DEFAULT_TRACKING_URI, experiment_name: str = DEFAULT_EXPERIMENT_NAME) -> None:
    mlflow.set_tracking_uri(tracking_uri)
    mlflow.set_experiment(experiment_name)


def log_dataframe_artifact(df: pd.DataFrame, output_path: str | Path, artifact_path: str) -> Path:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(path, index=False)
    mlflow.log_artifact(str(path), artifact_path=artifact_path)
    return path
