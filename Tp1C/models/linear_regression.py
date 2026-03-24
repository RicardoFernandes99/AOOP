from __future__ import annotations

from sklearn.linear_model import LinearRegression


def train_linear_regression(X_train, y_train, **model_params) -> LinearRegression:
    model = LinearRegression(**model_params)
    model.fit(X_train, y_train)
    return model
