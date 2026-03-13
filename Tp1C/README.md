# CP1 MLflow Pipeline

This project refactors the provided notebooks into a simple end-to-end MLflow workflow for CP1 points A, B, and C.

## What it does

- Loads the `Dataset-iGov` CSV from a local path.
- Runs EDA and saves summary tables and plots as artifacts.
- Preprocesses the data with duplicate removal, date handling, imputation, and one-hot encoding.
- Trains the required models:
  - `LinearRegression`
  - `DecisionTreeRegressor`
  - `RandomForestRegressor`
  - `LogisticRegression` on `kpi_class = indicador_kpi >= 70`
- Logs parameters, metrics, processed datasets, comparison tables, plots, and trained models to MLflow.

## Install

```bash
pip install -r requirements.txt
```

## Run the pipeline

```bash
python main.py
```

You can also run it through MLflow Projects:

```bash
mlflow run . -e main -P data=Dataset-iGov.csv
```

If you want to use a different dataset path, you can still override it:

```bash
python main.py --data path/to/Dataset-iGov.csv
```

## Start the MLflow UI

```bash
mlflow ui --backend-store-uri ./mlruns
```

Then open `http://127.0.0.1:5000`.

## Notes

- The regression models predict `indicador_kpi`.
- The logistic model predicts the binary class `kpi_class`.
- The pipeline selects the best regression model by lowest RMSE and logs that summary for easy reporting.
