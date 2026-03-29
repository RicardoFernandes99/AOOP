from __future__ import annotations

from sklearn.tree import DecisionTreeRegressor


def train_decision_tree_regressor(X_train, y_train, **model_params) -> DecisionTreeRegressor:
    model = DecisionTreeRegressor(**model_params)
    model.fit(X_train, y_train)
    return model
