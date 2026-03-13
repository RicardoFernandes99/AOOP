"""Project-wide configuration constants."""

from pathlib import Path

TARGET_COLUMN = "indicador_kpi"
DATE_COLUMN = "data_registo"
ID_COLUMN = "id_registo"
CLASSIFICATION_TARGET = "kpi_class"
CLASSIFICATION_THRESHOLD = 70

CATEGORICAL_COLUMNS = [
    "unidade_organizacional",
    "tipo_servico",
    "canal_utilizado",
    "transparencia",
    "feedback_cidadao",
    "segmentacao_utilizador",
    "area_tematica",
]

DEFAULT_ARTIFACT_DIR = Path("artifacts")
DEFAULT_TRACKING_URI = "file:./mlruns"
DEFAULT_EXPERIMENT_NAME = "cp1-mlflow-pipeline"
