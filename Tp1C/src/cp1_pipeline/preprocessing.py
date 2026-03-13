"""Feature preparation and split helpers."""

from __future__ import annotations

from pathlib import Path

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from .config import (
    CATEGORICAL_COLUMNS,
    CLASSIFICATION_TARGET,
    DATE_COLUMN,
    TARGET_COLUMN,
)


def get_feature_columns(df: pd.DataFrame) -> list[str]:
    excluded = {TARGET_COLUMN, CLASSIFICATION_TARGET}
    if DATE_COLUMN in df.columns:
        excluded.add(DATE_COLUMN)
    return [column for column in df.columns if column not in excluded]


def split_targets(
    df: pd.DataFrame,
    test_size: float,
    random_state: int,
) -> dict[str, pd.DataFrame | pd.Series]:
    feature_columns = get_feature_columns(df)
    x = df[feature_columns].copy()
    y_reg = df[TARGET_COLUMN].copy()
    y_clf = df[CLASSIFICATION_TARGET].copy()

    train_idx, test_idx = train_test_split(
        df.index,
        test_size=test_size,
        random_state=random_state,
        stratify=y_clf,
    )

    x_train = x.loc[train_idx].reset_index(drop=True)
    x_test = x.loc[test_idx].reset_index(drop=True)
    y_reg_train = y_reg.loc[train_idx].reset_index(drop=True)
    y_reg_test = y_reg.loc[test_idx].reset_index(drop=True)
    y_clf_train = y_clf.loc[train_idx].reset_index(drop=True)
    y_clf_test = y_clf.loc[test_idx].reset_index(drop=True)

    return {
        "X_train": x_train,
        "X_test": x_test,
        "y_reg_train": y_reg_train,
        "y_reg_test": y_reg_test,
        "y_clf_train": y_clf_train,
        "y_clf_test": y_clf_test,
    }


def build_preprocessor(df: pd.DataFrame, scale_numeric: bool = False) -> ColumnTransformer:
    feature_columns = get_feature_columns(df)
    categorical_columns = [column for column in CATEGORICAL_COLUMNS if column in feature_columns]
    numeric_columns = [column for column in feature_columns if column not in categorical_columns]

    categorical_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore")),
        ]
    )

    numeric_steps: list[tuple[str, object]] = [
        ("imputer", SimpleImputer(strategy="median")),
    ]
    if scale_numeric:
        numeric_steps.append(("scaler", StandardScaler()))
    numeric_pipeline = Pipeline(steps=numeric_steps)

    return ColumnTransformer(
        transformers=[
            ("categorical", categorical_pipeline, categorical_columns),
            ("numeric", numeric_pipeline, numeric_columns),
        ],
        remainder="drop",
    )


def save_processed_splits(
    splits: dict[str, pd.DataFrame | pd.Series],
    output_dir: str | Path,
) -> dict[str, Path]:
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    saved_paths: dict[str, Path] = {}
    for name, value in splits.items():
        file_path = output_path / f"{name}.csv"
        if isinstance(value, pd.Series):
            value.to_frame(name=value.name or name).to_csv(file_path, index=False)
        else:
            value.to_csv(file_path, index=False)
        saved_paths[name] = file_path
    return saved_paths
