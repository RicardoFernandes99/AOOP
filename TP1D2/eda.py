from __future__ import annotations

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from matplotlib.figure import Figure
from scipy.stats import poisson, shapiro


ID_COLUMN = "id_registo"
TARGET_COLUMN = "indicador_kpi"
TRANSPARENCY_COLUMN = "transparencia"
ERRORS_COLUMN = "erros_tecnicos"


def get_numeric_columns(df: pd.DataFrame, exclude_id: bool = True) -> list[str]:
    numeric_columns = df.select_dtypes(include=np.number).columns.tolist()
    if exclude_id and ID_COLUMN in numeric_columns:
        numeric_columns.remove(ID_COLUMN)
    return numeric_columns


def build_numeric_summary(df: pd.DataFrame) -> pd.DataFrame:
    numeric_df = df[get_numeric_columns(df)]
    summary = pd.DataFrame(
        {
            "n": numeric_df.count(),
            "min": numeric_df.min(),
            "max": numeric_df.max(),
            "moda": numeric_df.mode().iloc[0],
            "mediana": numeric_df.median(),
            "media": numeric_df.mean(),
            "q1_25": numeric_df.quantile(0.25),
            "q3_75": numeric_df.quantile(0.75),
            "desvio_padrao": numeric_df.std(),
        }
    )
    return summary


def build_shapiro_summary(df: pd.DataFrame) -> pd.DataFrame:
    normality_rows: list[dict[str, float | str]] = []
    for column in get_numeric_columns(df):
        series = df[column].dropna()
        _, p_value = shapiro(series)
        normality_rows.append(
            {
                "column": column,
                "p_value": p_value,
                "is_normal_at_0_05": p_value > 0.05,
            }
        )
    return pd.DataFrame(normality_rows)


def plot_missing_values(df: pd.DataFrame) -> Figure:
    missing_counts = df.isnull().sum().sort_values(ascending=False)

    fig, ax = plt.subplots(figsize=(12, 5))
    ax.bar(missing_counts.index, missing_counts.values, color="steelblue", alpha=0.85)
    ax.set_title("Missing Values by Column")
    ax.set_xlabel("Columns")
    ax.set_ylabel("Null count")
    ax.tick_params(axis="x", rotation=45)
    ax.grid(axis="y", alpha=0.3)
    fig.tight_layout()
    return fig


def plot_target_distribution(df: pd.DataFrame, target_column: str = TARGET_COLUMN) -> Figure:
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.hist(df[target_column].dropna(), bins=20, color="skyblue", edgecolor="black", alpha=0.8)
    ax.set_title(f"Distribution of {target_column}")
    ax.set_xlabel(target_column)
    ax.set_ylabel("Frequency")
    ax.grid(axis="y", alpha=0.3)
    fig.tight_layout()
    return fig


def plot_transparency_proportion(df: pd.DataFrame) -> Figure:
    transparency_map = {"Sim": 1, "Não": 0}
    transparency_bin = df[TRANSPARENCY_COLUMN].map(transparency_map).dropna()
    proportions = transparency_bin.value_counts(normalize=True).sort_index()

    fig, ax = plt.subplots(figsize=(6, 4))
    ax.bar(proportions.index, proportions.values, color="skyblue", alpha=0.8, tick_label=["Não", "Sim"])
    ax.set_title("Transparency Proportion")
    ax.set_xlabel(TRANSPARENCY_COLUMN)
    ax.set_ylabel("Proportion")
    ax.set_ylim(0, 1)
    ax.grid(axis="y", alpha=0.3)
    fig.tight_layout()
    return fig


def plot_erros_tecnicos_poisson(df: pd.DataFrame) -> Figure:
    errors = df[ERRORS_COLUMN].dropna()
    lambda_value = errors.mean()
    k_values = np.arange(0, int(errors.max()) + 1)
    poisson_pmf = poisson.pmf(k_values, lambda_value)

    fig, ax = plt.subplots(figsize=(8, 4))
    ax.bar(k_values, poisson_pmf, alpha=0.7, color="skyblue", label="Expected Poisson")
    ax.hist(errors, bins=np.arange(0, int(errors.max()) + 2), density=True, alpha=0.5, color="orange", label="Observed")
    ax.set_title("Poisson vs Observed Distribution for erros_tecnicos")
    ax.set_xlabel("Number of errors")
    ax.set_ylabel("Probability")
    ax.legend()
    ax.grid(axis="y", alpha=0.3)
    fig.tight_layout()
    return fig


def build_numeric_histogram_figures(df: pd.DataFrame) -> dict[str, Figure]:
    figures: dict[str, Figure] = {}
    for column in get_numeric_columns(df):
        fig, ax = plt.subplots(figsize=(8, 4))
        ax.hist(df[column].dropna(), bins=20, color="skyblue", edgecolor="black", alpha=0.8)
        ax.set_title(f"Histogram of {column}")
        ax.set_xlabel(column)
        ax.set_ylabel("Frequency")
        ax.grid(axis="y", alpha=0.3)
        fig.tight_layout()
        figures[column] = fig
    return figures


def plot_correlation_heatmap(df: pd.DataFrame) -> Figure:
    numeric_df = df[get_numeric_columns(df)]
    correlation_matrix = numeric_df.corr()

    fig, ax = plt.subplots(figsize=(12, 8))
    sns.heatmap(correlation_matrix, annot=True, fmt=".2f", cmap="coolwarm", cbar=True, ax=ax)
    ax.set_title("Numeric Correlation Heatmap")
    fig.tight_layout()
    return fig


def build_scatter_vs_target_figures(
    df: pd.DataFrame, target_column: str = TARGET_COLUMN
) -> dict[str, Figure]:
    figures: dict[str, Figure] = {}
    for column in get_numeric_columns(df):
        if column == target_column:
            continue

        fig, ax = plt.subplots(figsize=(6, 4))
        ax.scatter(df[column], df[target_column], alpha=0.6, edgecolors="k")
        ax.set_title(f"{column} vs {target_column}")
        ax.set_xlabel(column)
        ax.set_ylabel(target_column)
        ax.grid(alpha=0.3)
        fig.tight_layout()
        figures[column] = fig
    return figures


def build_categorical_count_figures(df: pd.DataFrame, max_categories: int = 10) -> dict[str, Figure]:
    figures: dict[str, Figure] = {}
    categorical_columns = df.select_dtypes(include=["object", "category"]).columns.tolist()

    for column in categorical_columns:
        counts = df[column].fillna("Missing").value_counts().head(max_categories)
        fig, ax = plt.subplots(figsize=(10, 4))
        ax.bar(counts.index.astype(str), counts.values, color="teal", alpha=0.8)
        ax.set_title(f"Top Categories for {column}")
        ax.set_xlabel(column)
        ax.set_ylabel("Count")
        ax.tick_params(axis="x", rotation=45)
        ax.grid(axis="y", alpha=0.3)
        fig.tight_layout()
        figures[column] = fig

    return figures
