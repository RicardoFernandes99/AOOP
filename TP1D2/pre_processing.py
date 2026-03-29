from __future__ import annotations

from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder


DEFAULT_OUTPUT_DIR = Path("artifacts")
DEFAULT_TARGET_COLUMN = "indicador_kpi"
ID_COLUMNS = ["id_registo"]
DATE_COLUMN = "data_registo"


def report_nulls(df: pd.DataFrame) -> pd.Series:
    null_counts = df.isnull().sum()
    print("Null values per column:")
    print(null_counts.to_string())
    return null_counts


def prepare_base_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    prepared = df.copy()

    if DATE_COLUMN in prepared.columns:
        parsed_dates = pd.to_datetime(prepared[DATE_COLUMN], errors="coerce")
        prepared["registo_ano"] = parsed_dates.dt.year
        prepared["registo_mes"] = parsed_dates.dt.month
        prepared["registo_dia"] = parsed_dates.dt.day
        prepared = prepared.drop(columns=[DATE_COLUMN])

    return prepared


def split_features_and_target(
    df: pd.DataFrame, target_column: str
) -> tuple[pd.DataFrame, pd.Series]:
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' was not found in the dataset.")

    feature_df = df.drop(columns=[target_column], errors="ignore")
    feature_df = feature_df.drop(columns=ID_COLUMNS, errors="ignore")
    target = df[target_column]
    return feature_df, target


def build_preprocessor(
    feature_df: pd.DataFrame,
) -> tuple[ColumnTransformer, list[str], list[str]]:
    categorical_columns = feature_df.select_dtypes(include=["object", "category"]).columns.tolist()
    numeric_columns = feature_df.select_dtypes(include=["number", "bool"]).columns.tolist()

    numeric_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", MinMaxScaler()),
        ]
    )

    categorical_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_pipeline, numeric_columns),
            ("cat", categorical_pipeline, categorical_columns),
        ],
        remainder="drop",
    )

    return preprocessor, numeric_columns, categorical_columns


def transform_dataset(
    df: pd.DataFrame, output_dir: Path = DEFAULT_OUTPUT_DIR, target_column: str = DEFAULT_TARGET_COLUMN
) -> tuple[pd.DataFrame, Path, Path]:
    report_nulls(df)
    prepared_df = prepare_base_dataframe(df)
    feature_df, target = split_features_and_target(prepared_df, target_column)
    preprocessor, numeric_columns, categorical_columns = build_preprocessor(feature_df)

    transformed_array = preprocessor.fit_transform(feature_df)

    feature_names = preprocessor.get_feature_names_out()
    processed_df = pd.DataFrame(transformed_array, columns=feature_names, index=df.index)
    processed_df[target_column] = target.values

    output_dir.mkdir(parents=True, exist_ok=True)
    processed_dataset_path = output_dir / "processed_dataset.csv"
    preprocessor_path = output_dir / "preprocessor.joblib"

    processed_df.to_csv(processed_dataset_path, index=False)
    joblib.dump(preprocessor, preprocessor_path)

    print(f"Numeric columns normalized: {numeric_columns}")
    print(f"Categorical columns encoded: {categorical_columns}")
    print(f"Processed dataset saved to: {processed_dataset_path}")
    print(f"Preprocessor saved to: {preprocessor_path}")

    return processed_df, processed_dataset_path, preprocessor_path
