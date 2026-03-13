"""Exploratory analysis outputs logged as MLflow artifacts."""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

from .config import DATE_COLUMN, ID_COLUMN, TARGET_COLUMN
from .data import build_data_summary


def run_eda(df: pd.DataFrame, output_dir: str | Path) -> dict[str, Path]:
    """Generate compact EDA tables and plots for later reporting."""
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    summary_path = output_path / "dataset_summary.csv"
    describe_path = output_path / "numeric_describe.csv"
    categorical_path = output_path / "categorical_counts.csv"
    missing_plot_path = output_path / "missing_values.png"
    corr_plot_path = output_path / "correlation_heatmap.png"
    target_hist_path = output_path / "target_histogram.png"
    target_boxplot_path = output_path / "target_boxplot.png"

    build_data_summary(df).to_csv(summary_path)

    numeric_df = df.select_dtypes(include="number")
    if not numeric_df.empty:
        numeric_df.describe().T.to_csv(describe_path)
    else:
        pd.DataFrame().to_csv(describe_path)

    categorical_df = df.select_dtypes(include=["object", "category"]).copy()
    if DATE_COLUMN in df.columns:
        categorical_df[DATE_COLUMN] = df[DATE_COLUMN].astype(str)

    categorical_rows = []
    for column in categorical_df.columns:
        counts = categorical_df[column].value_counts(dropna=False).head(15)
        for category, count in counts.items():
            categorical_rows.append({"column": column, "category": category, "count": count})
    pd.DataFrame(categorical_rows).to_csv(categorical_path, index=False)

    missing = df.isna().sum().sort_values(ascending=False)
    plt.figure(figsize=(10, 5))
    missing.plot(kind="bar", color="steelblue")
    plt.title("Missing Values by Column")
    plt.ylabel("Count")
    plt.tight_layout()
    plt.savefig(missing_plot_path, dpi=150)
    plt.close()

    if TARGET_COLUMN in numeric_df.columns:
        plt.figure(figsize=(8, 5))
        sns.histplot(df[TARGET_COLUMN], kde=True, bins=20, color="teal")
        plt.title(f"Distribution of {TARGET_COLUMN}")
        plt.tight_layout()
        plt.savefig(target_hist_path, dpi=150)
        plt.close()

        plt.figure(figsize=(6, 4))
        sns.boxplot(y=df[TARGET_COLUMN], color="orange")
        plt.title(f"Boxplot of {TARGET_COLUMN}")
        plt.tight_layout()
        plt.savefig(target_boxplot_path, dpi=150)
        plt.close()

    corr_candidates = numeric_df.drop(columns=[ID_COLUMN], errors="ignore")
    if not corr_candidates.empty:
        plt.figure(figsize=(10, 8))
        sns.heatmap(corr_candidates.corr(), annot=True, fmt=".2f", cmap="coolwarm")
        plt.title("Correlation Heatmap")
        plt.tight_layout()
        plt.savefig(corr_plot_path, dpi=150)
        plt.close()

    return {
        "summary_csv": summary_path,
        "numeric_describe_csv": describe_path,
        "categorical_counts_csv": categorical_path,
        "missing_plot": missing_plot_path,
        "correlation_plot": corr_plot_path,
        "target_histogram": target_hist_path,
        "target_boxplot": target_boxplot_path,
    }
