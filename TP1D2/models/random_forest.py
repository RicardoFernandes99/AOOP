from __future__ import annotations

from sklearn.ensemble import RandomForestRegressor


def train_random_forest_regressor(X_train, y_train, **model_params) -> RandomForestRegressor:
    model = RandomForestRegressor(**model_params)
    model.fit(X_train, y_train)
    return model
