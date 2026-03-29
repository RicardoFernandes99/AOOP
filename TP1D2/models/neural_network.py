from __future__ import annotations

from sklearn.neural_network import MLPRegressor


def train_neural_network_regressor(X_train, y_train, **model_params) -> MLPRegressor:
    model = MLPRegressor(**model_params)
    model.fit(X_train, y_train)
    return model
