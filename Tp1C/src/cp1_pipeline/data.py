"""Dataset loading and high-level inspection helpers."""

from __future__ import annotations

from pathlib import Path

import pandas as pd

from .config import CLASSIFICATION_TARGET, CLASSIFICATION_THRESHOLD, DATE_COLUMN


def load_dataset(data_path: str | Path) -> pd.DataFrame:
    """Load the CP1 dataset from a CSV file."""
    path = Path(data_path)
    if not path.exists():
        raise FileNotFoundError(f"Dataset not found: {path}")
    return pd.read_csv(path)


def prepare_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """Apply the minimal shared cleanup used across the notebooks."""
    prepared = df.copy()
    prepared = prepared.drop_duplicates().reset_index(drop=True)

    if DATE_COLUMN in prepared.columns:
        prepared[DATE_COLUMN] = pd.to_datetime(prepared[DATE_COLUMN], errors="coerce")

    prepared[CLASSIFICATION_TARGET] = (
        prepared["indicador_kpi"] >= CLASSIFICATION_THRESHOLD
    ).astype(int)
    return prepared


def build_data_summary(df: pd.DataFrame) -> pd.DataFrame:
    """Return a compact table with schema and missing-value information."""
    summary = pd.DataFrame(
        {
            "dtype": df.dtypes.astype(str),
            "missing": df.isna().sum(),
            "missing_pct": (df.isna().mean() * 100).round(2),
            "unique": df.nunique(dropna=False),
        }
    )
    return summary.sort_index()
