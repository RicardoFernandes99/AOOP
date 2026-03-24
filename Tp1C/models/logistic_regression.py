from __future__ import annotations

import pandas as pd
from sklearn.linear_model import LogisticRegression


DEFAULT_THRESHOLD = 70.0


def build_binary_target(target: pd.Series, threshold: float = DEFAULT_THRESHOLD) -> pd.Series:
    return (target >= threshold).astype(int)


def train_logistic_regression_classifier(
    X_train,
    y_train,
    **model_params,
) -> LogisticRegression:
    model = LogisticRegression(**model_params)
    model.fit(X_train, y_train)
    return model
