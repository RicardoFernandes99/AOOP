window.MODEL_STATS = {
  "generated_at": "2026-03-12T16:39:28.622399+00:00",
  "dataset": {
    "rows": 200,
    "columns": 17,
    "target_mean": 75.1668,
    "target_median": 75.475,
    "target_std": 14.2108,
    "class_balance": {
      "positive": 125,
      "negative": 75
    },
    "threshold": 70
  },
  "models": {
    "linear_regression": {
      "key": "linear_regression",
      "name": "Linear Regression",
      "task": "regression",
      "source": "teste/multiple-linear-regression-with-onehotencoding.ipynb",
      "artifact": "teste/artifacts/models/linear_regression.joblib",
      "split": {
        "test_size": 0.2,
        "random_state": 42,
        "train_rows": 160,
        "test_rows": 40,
        "shared_indices": true
      },
      "metrics": {
        "selected": {
          "train": {
            "mae": 10.0646,
            "mse": 144.2181,
            "rmse": 12.0091,
            "r2": 0.3157,
            "explained_variance": 0.3157,
            "median_absolute_error": 9.3212,
            "max_error": 30.4122
          },
          "test": {
            "mae": 11.3641,
            "mse": 226.3717,
            "rmse": 15.0457,
            "r2": -0.4399,
            "explained_variance": -0.3971,
            "median_absolute_error": 8.6756,
            "max_error": 38.4682
          }
        }
      },
      "plots": {
        "test_actual_vs_predicted": {
          "points": [
            {
              "actual": 73.33,
              "predicted": 67.2074
            },
            {
              "actual": 81.13,
              "predicted": 67.8612
            },
            {
              "actual": 52.22,
              "predicted": 71.5821
            },
            {
              "actual": 77.27,
              "predicted": 82.5039
            },
            {
              "actual": 89.59,
              "predicted": 88.8975
            },
            {
              "actual": 69.65,
              "predicted": 76.7475
            },
            {
              "actual": 66.05,
              "predicted": 67.3942
            },
            {
              "actual": 91.93,
              "predicted": 84.8044
            },
            {
              "actual": 58.86,
              "predicted": 73.3302
            },
            {
              "actual": 86.49,
              "predicted": 75.007
            },
            {
              "actual": 77.48,
              "predicted": 70.6306
            },
            {
              "actual": 99.99,
              "predicted": 91.7914
            },
            {
              "actual": 99.01,
              "predicted": 97.3598
            },
            {
              "actual": 55.79,
              "predicted": 59.1413
            },
            {
              "actual": 89.12,
              "predicted": 84.8831
            },
            {
              "actual": 61.75,
              "predicted": 89.8227
            },
            {
              "actual": 85.88,
              "predicted": 71.0568
            },
            {
              "actual": 91.77,
              "predicted": 62.9643
            },
            {
              "actual": 87.05,
              "predicted": 80.6175
            },
            {
              "actual": 70.21,
              "predicted": 72.693
            },
            {
              "actual": 75.86,
              "predicted": 71.7952
            },
            {
              "actual": 73.49,
              "predicted": 61.1646
            },
            {
              "actual": 65.66,
              "predicted": 103.4818
            },
            {
              "actual": 90.4,
              "predicted": 58.1565
            },
            {
              "actual": 79.82,
              "predicted": 70.9997
            },
            {
              "actual": 62.83,
              "predicted": 71.0181
            },
            {
              "actual": 91.45,
              "predicted": 76.9825
            },
            {
              "actual": 95.02,
              "predicted": 56.5518
            },
            {
              "actual": 68.95,
              "predicted": 71.2968
            },
            {
              "actual": 76.55,
              "predicted": 90.668
            },
            {
              "actual": 80.2,
              "predicted": 79.9322
            },
            {
              "actual": 73.71,
              "predicted": 64.4832
            },
            {
              "actual": 50.11,
              "predicted": 72.0658
            },
            {
              "actual": 79.93,
              "predicted": 64.4171
            },
            {
              "actual": 74.39,
              "predicted": 74.8026
            },
            {
              "actual": 79.51,
              "predicted": 68.2402
            },
            {
              "actual": 77.98,
              "predicted": 63.8372
            },
            {
              "actual": 58.37,
              "predicted": 67.0594
            },
            {
              "actual": 88.68,
              "predicted": 80.0183
            },
            {
              "actual": 75.11,
              "predicted": 75.5643
            }
          ],
          "min": 50.11,
          "max": 103.4818
        }
      }
    },
    "random_forest": {
      "key": "random_forest",
      "name": "Random Forest",
      "task": "regression",
      "source": "teste/randomforestregressor-with-pipeline.ipynb",
      "artifact": "teste/artifacts/models/random_forest.joblib",
      "split": {
        "test_size": 0.2,
        "random_state": 42,
        "train_rows": 160,
        "test_rows": 40,
        "shared_indices": true
      },
      "metrics": {
        "selected": {
          "train": {
            "mae": 4.8173,
            "mse": 31.2552,
            "rmse": 5.5906,
            "r2": 0.8517,
            "explained_variance": 0.8517,
            "median_absolute_error": 5.0767,
            "max_error": 12.3532
          },
          "test": {
            "mae": 10.9354,
            "mse": 165.7337,
            "rmse": 12.8738,
            "r2": -0.0542,
            "explained_variance": -0.0089,
            "median_absolute_error": 9.0484,
            "max_error": 23.2146
          }
        }
      },
      "plots": {
        "test_actual_vs_predicted": {
          "points": [
            {
              "actual": 73.33,
              "predicted": 70.9088
            },
            {
              "actual": 81.13,
              "predicted": 74.7356
            },
            {
              "actual": 52.22,
              "predicted": 67.8946
            },
            {
              "actual": 77.27,
              "predicted": 78.0239
            },
            {
              "actual": 89.59,
              "predicted": 81.4869
            },
            {
              "actual": 69.65,
              "predicted": 76.8918
            },
            {
              "actual": 66.05,
              "predicted": 70.4714
            },
            {
              "actual": 91.93,
              "predicted": 78.2343
            },
            {
              "actual": 58.86,
              "predicted": 73.6742
            },
            {
              "actual": 86.49,
              "predicted": 77.3995
            },
            {
              "actual": 77.48,
              "predicted": 75.2217
            },
            {
              "actual": 99.99,
              "predicted": 77.2311
            },
            {
              "actual": 99.01,
              "predicted": 82.0787
            },
            {
              "actual": 55.79,
              "predicted": 74.8201
            },
            {
              "actual": 89.12,
              "predicted": 72.8942
            },
            {
              "actual": 61.75,
              "predicted": 81.9834
            },
            {
              "actual": 85.88,
              "predicted": 68.4797
            },
            {
              "actual": 91.77,
              "predicted": 71.099
            },
            {
              "actual": 87.05,
              "predicted": 74.7053
            },
            {
              "actual": 70.21,
              "predicted": 74.9913
            },
            {
              "actual": 75.86,
              "predicted": 75.833
            },
            {
              "actual": 73.49,
              "predicted": 65.6139
            },
            {
              "actual": 65.66,
              "predicted": 80.8907
            },
            {
              "actual": 90.4,
              "predicted": 71.6531
            },
            {
              "actual": 79.82,
              "predicted": 71.9366
            },
            {
              "actual": 62.83,
              "predicted": 83.0984
            },
            {
              "actual": 91.45,
              "predicted": 73.9584
            },
            {
              "actual": 95.02,
              "predicted": 73.8781
            },
            {
              "actual": 68.95,
              "predicted": 74.6773
            },
            {
              "actual": 76.55,
              "predicted": 78.575
            },
            {
              "actual": 80.2,
              "predicted": 72.286
            },
            {
              "actual": 73.71,
              "predicted": 71.2582
            },
            {
              "actual": 50.11,
              "predicted": 73.3246
            },
            {
              "actual": 79.93,
              "predicted": 70.9236
            },
            {
              "actual": 74.39,
              "predicted": 70.039
            },
            {
              "actual": 79.51,
              "predicted": 70.5585
            },
            {
              "actual": 77.98,
              "predicted": 69.3996
            },
            {
              "actual": 58.37,
              "predicted": 68.2346
            },
            {
              "actual": 88.68,
              "predicted": 79.2935
            },
            {
              "actual": 75.11,
              "predicted": 77.1419
            }
          ],
          "min": 50.11,
          "max": 99.99
        }
      }
    },
    "decision_tree": {
      "key": "decision_tree",
      "name": "Decision Tree",
      "task": "regression",
      "source": "teste/90-accuracy-using-decision-tree-regressor.ipynb",
      "artifact": "teste/artifacts/models/decision_tree.joblib",
      "split": {
        "test_size": 0.2,
        "random_state": 42,
        "train_rows": 160,
        "test_rows": 40,
        "shared_indices": true
      },
      "metrics": {
        "selected": {
          "train": {
            "mae": 10.701,
            "mse": 161.68,
            "rmse": 12.7153,
            "r2": 0.2328,
            "explained_variance": 0.2328,
            "median_absolute_error": 9.8864,
            "max_error": 33.7667
          },
          "test": {
            "mae": 11.881,
            "mse": 198.8076,
            "rmse": 14.0999,
            "r2": -0.2627,
            "explained_variance": -0.171,
            "median_absolute_error": 10.0926,
            "max_error": 27.7667
          }
        },
        "baseline": {
          "train": {
            "mae": 10.264,
            "mse": 153.719,
            "rmse": 12.3983,
            "r2": 0.2706,
            "explained_variance": 0.2706,
            "median_absolute_error": 9.4914,
            "max_error": 29.1176
          },
          "test": {
            "mae": 12.7969,
            "mse": 226.335,
            "rmse": 15.0444,
            "r2": -0.4375,
            "explained_variance": -0.3779,
            "median_absolute_error": 11.863,
            "max_error": 32.5333
          }
        },
        "best_params": {
          "max_depth": 3,
          "min_samples_leaf": 4,
          "min_samples_split": 10
        }
      },
      "plots": {
        "test_actual_vs_predicted": {
          "points": [
            {
              "actual": 73.0,
              "predicted": 66.0
            },
            {
              "actual": 81.0,
              "predicted": 81.2273
            },
            {
              "actual": 52.0,
              "predicted": 63.2333
            },
            {
              "actual": 77.0,
              "predicted": 81.2273
            },
            {
              "actual": 89.0,
              "predicted": 74.4186
            },
            {
              "actual": 69.0,
              "predicted": 74.4186
            },
            {
              "actual": 66.0,
              "predicted": 74.4186
            },
            {
              "actual": 91.0,
              "predicted": 63.2333
            },
            {
              "actual": 58.0,
              "predicted": 81.2273
            },
            {
              "actual": 86.0,
              "predicted": 81.2273
            },
            {
              "actual": 77.0,
              "predicted": 81.2273
            },
            {
              "actual": 99.0,
              "predicted": 74.4186
            },
            {
              "actual": 99.0,
              "predicted": 81.2273
            },
            {
              "actual": 55.0,
              "predicted": 63.2333
            },
            {
              "actual": 89.0,
              "predicted": 63.2333
            },
            {
              "actual": 61.0,
              "predicted": 81.2273
            },
            {
              "actual": 85.0,
              "predicted": 63.2333
            },
            {
              "actual": 91.0,
              "predicted": 63.2333
            },
            {
              "actual": 87.0,
              "predicted": 81.2
            },
            {
              "actual": 70.0,
              "predicted": 66.0
            },
            {
              "actual": 75.0,
              "predicted": 79.8125
            },
            {
              "actual": 73.0,
              "predicted": 65.4
            },
            {
              "actual": 65.0,
              "predicted": 74.4186
            },
            {
              "actual": 90.0,
              "predicted": 66.0
            },
            {
              "actual": 79.0,
              "predicted": 81.2273
            },
            {
              "actual": 62.0,
              "predicted": 74.4186
            },
            {
              "actual": 91.0,
              "predicted": 74.4186
            },
            {
              "actual": 95.0,
              "predicted": 81.2273
            },
            {
              "actual": 68.0,
              "predicted": 81.2273
            },
            {
              "actual": 76.0,
              "predicted": 81.2273
            },
            {
              "actual": 80.0,
              "predicted": 63.2333
            },
            {
              "actual": 73.0,
              "predicted": 81.2
            },
            {
              "actual": 50.0,
              "predicted": 63.2333
            },
            {
              "actual": 79.0,
              "predicted": 81.2
            },
            {
              "actual": 74.0,
              "predicted": 63.2333
            },
            {
              "actual": 79.0,
              "predicted": 63.2333
            },
            {
              "actual": 77.0,
              "predicted": 66.0
            },
            {
              "actual": 58.0,
              "predicted": 63.2333
            },
            {
              "actual": 88.0,
              "predicted": 81.2273
            },
            {
              "actual": 75.0,
              "predicted": 66.0
            }
          ],
          "min": 50.0,
          "max": 99.0
        },
        "baseline_test_actual_vs_predicted": {
          "points": [
            {
              "actual": 73.0,
              "predicted": 69.8824
            },
            {
              "actual": 81.0,
              "predicted": 88.4667
            },
            {
              "actual": 52.0,
              "predicted": 69.5
            },
            {
              "actual": 77.0,
              "predicted": 88.4667
            },
            {
              "actual": 89.0,
              "predicted": 78.2593
            },
            {
              "actual": 69.0,
              "predicted": 78.2593
            },
            {
              "actual": 66.0,
              "predicted": 78.2593
            },
            {
              "actual": 91.0,
              "predicted": 58.4667
            },
            {
              "actual": 58.0,
              "predicted": 77.4828
            },
            {
              "actual": 86.0,
              "predicted": 77.4828
            },
            {
              "actual": 77.0,
              "predicted": 77.4828
            },
            {
              "actual": 99.0,
              "predicted": 78.2593
            },
            {
              "actual": 99.0,
              "predicted": 88.4667
            },
            {
              "actual": 55.0,
              "predicted": 73.1
            },
            {
              "actual": 89.0,
              "predicted": 69.5
            },
            {
              "actual": 61.0,
              "predicted": 77.4828
            },
            {
              "actual": 85.0,
              "predicted": 58.4667
            },
            {
              "actual": 91.0,
              "predicted": 69.5
            },
            {
              "actual": 87.0,
              "predicted": 69.5
            },
            {
              "actual": 70.0,
              "predicted": 69.8824
            },
            {
              "actual": 75.0,
              "predicted": 72.6364
            },
            {
              "actual": 73.0,
              "predicted": 80.5
            },
            {
              "actual": 65.0,
              "predicted": 67.9375
            },
            {
              "actual": 90.0,
              "predicted": 69.8824
            },
            {
              "actual": 79.0,
              "predicted": 88.4667
            },
            {
              "actual": 62.0,
              "predicted": 78.2593
            },
            {
              "actual": 91.0,
              "predicted": 67.9375
            },
            {
              "actual": 95.0,
              "predicted": 77.4828
            },
            {
              "actual": 68.0,
              "predicted": 88.4667
            },
            {
              "actual": 76.0,
              "predicted": 77.4828
            },
            {
              "actual": 80.0,
              "predicted": 58.4667
            },
            {
              "actual": 73.0,
              "predicted": 69.5
            },
            {
              "actual": 50.0,
              "predicted": 58.4667
            },
            {
              "actual": 79.0,
              "predicted": 69.5
            },
            {
              "actual": 74.0,
              "predicted": 58.4667
            },
            {
              "actual": 79.0,
              "predicted": 58.4667
            },
            {
              "actual": 77.0,
              "predicted": 69.8824
            },
            {
              "actual": 58.0,
              "predicted": 73.1
            },
            {
              "actual": 88.0,
              "predicted": 88.4667
            },
            {
              "actual": 75.0,
              "predicted": 69.8824
            }
          ],
          "min": 50.0,
          "max": 99.0
        }
      }
    },
    "logistic_regression": {
      "key": "logistic_regression",
      "name": "Logistic Regression",
      "task": "classification",
      "source": "teste/logistic-regression-classifier-tutorial.ipynb",
      "artifact": "teste/artifacts/models/logistic_regression.joblib",
      "split": {
        "test_size": 0.2,
        "random_state": 42,
        "train_rows": 160,
        "test_rows": 40,
        "shared_indices": true
      },
      "threshold": 70,
      "metrics": {
        "selected": {
          "c": 0.01,
          "train_accuracy": 0.6,
          "test_accuracy": 0.725,
          "train": {
            "accuracy": 0.6,
            "precision": 0.6,
            "recall": 1.0,
            "f1": 0.75,
            "roc_auc": 0.7441,
            "confusion_matrix": [
              [
                0,
                64
              ],
              [
                0,
                96
              ]
            ],
            "report": {
              "0": {
                "precision": 0.0,
                "recall": 0.0,
                "f1-score": 0.0,
                "support": 64.0
              },
              "1": {
                "precision": 0.6,
                "recall": 1.0,
                "f1-score": 0.75,
                "support": 96.0
              },
              "accuracy": 0.6,
              "macro avg": {
                "precision": 0.3,
                "recall": 0.5,
                "f1-score": 0.375,
                "support": 160.0
              },
              "weighted avg": {
                "precision": 0.36,
                "recall": 0.6,
                "f1-score": 0.45,
                "support": 160.0
              }
            }
          },
          "test": {
            "accuracy": 0.725,
            "precision": 0.725,
            "recall": 1.0,
            "f1": 0.8406,
            "roc_auc": 0.5893,
            "confusion_matrix": [
              [
                0,
                11
              ],
              [
                0,
                29
              ]
            ],
            "report": {
              "0": {
                "precision": 0.0,
                "recall": 0.0,
                "f1-score": 0.0,
                "support": 11.0
              },
              "1": {
                "precision": 0.725,
                "recall": 1.0,
                "f1-score": 0.8406,
                "support": 29.0
              },
              "accuracy": 0.725,
              "macro avg": {
                "precision": 0.3625,
                "recall": 0.5,
                "f1-score": 0.4203,
                "support": 40.0
              },
              "weighted avg": {
                "precision": 0.5256,
                "recall": 0.725,
                "f1-score": 0.6094,
                "support": 40.0
              }
            }
          }
        },
        "baseline": {
          "c": 1.0,
          "train_accuracy": 0.7625,
          "test_accuracy": 0.625,
          "train": {
            "accuracy": 0.7625,
            "precision": 0.7636,
            "recall": 0.875,
            "f1": 0.8155,
            "roc_auc": 0.8254,
            "confusion_matrix": [
              [
                38,
                26
              ],
              [
                12,
                84
              ]
            ],
            "report": {
              "0": {
                "precision": 0.76,
                "recall": 0.5938,
                "f1-score": 0.6667,
                "support": 64.0
              },
              "1": {
                "precision": 0.7636,
                "recall": 0.875,
                "f1-score": 0.8155,
                "support": 96.0
              },
              "accuracy": 0.7625,
              "macro avg": {
                "precision": 0.7618,
                "recall": 0.7344,
                "f1-score": 0.7411,
                "support": 160.0
              },
              "weighted avg": {
                "precision": 0.7622,
                "recall": 0.7625,
                "f1-score": 0.756,
                "support": 160.0
              }
            }
          },
          "test": {
            "accuracy": 0.625,
            "precision": 0.7333,
            "recall": 0.7586,
            "f1": 0.7458,
            "roc_auc": 0.605,
            "confusion_matrix": [
              [
                3,
                8
              ],
              [
                7,
                22
              ]
            ],
            "report": {
              "0": {
                "precision": 0.3,
                "recall": 0.2727,
                "f1-score": 0.2857,
                "support": 11.0
              },
              "1": {
                "precision": 0.7333,
                "recall": 0.7586,
                "f1-score": 0.7458,
                "support": 29.0
              },
              "accuracy": 0.625,
              "macro avg": {
                "precision": 0.5167,
                "recall": 0.5157,
                "f1-score": 0.5157,
                "support": 40.0
              },
              "weighted avg": {
                "precision": 0.6142,
                "recall": 0.625,
                "f1-score": 0.6192,
                "support": 40.0
              }
            }
          }
        },
        "variants": [
          {
            "c": 1.0,
            "train_accuracy": 0.7625,
            "test_accuracy": 0.625,
            "train": {
              "accuracy": 0.7625,
              "precision": 0.7636,
              "recall": 0.875,
              "f1": 0.8155,
              "roc_auc": 0.8254,
              "confusion_matrix": [
                [
                  38,
                  26
                ],
                [
                  12,
                  84
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.76,
                  "recall": 0.5938,
                  "f1-score": 0.6667,
                  "support": 64.0
                },
                "1": {
                  "precision": 0.7636,
                  "recall": 0.875,
                  "f1-score": 0.8155,
                  "support": 96.0
                },
                "accuracy": 0.7625,
                "macro avg": {
                  "precision": 0.7618,
                  "recall": 0.7344,
                  "f1-score": 0.7411,
                  "support": 160.0
                },
                "weighted avg": {
                  "precision": 0.7622,
                  "recall": 0.7625,
                  "f1-score": 0.756,
                  "support": 160.0
                }
              }
            },
            "test": {
              "accuracy": 0.625,
              "precision": 0.7333,
              "recall": 0.7586,
              "f1": 0.7458,
              "roc_auc": 0.605,
              "confusion_matrix": [
                [
                  3,
                  8
                ],
                [
                  7,
                  22
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.3,
                  "recall": 0.2727,
                  "f1-score": 0.2857,
                  "support": 11.0
                },
                "1": {
                  "precision": 0.7333,
                  "recall": 0.7586,
                  "f1-score": 0.7458,
                  "support": 29.0
                },
                "accuracy": 0.625,
                "macro avg": {
                  "precision": 0.5167,
                  "recall": 0.5157,
                  "f1-score": 0.5157,
                  "support": 40.0
                },
                "weighted avg": {
                  "precision": 0.6142,
                  "recall": 0.625,
                  "f1-score": 0.6192,
                  "support": 40.0
                }
              }
            }
          },
          {
            "c": 100.0,
            "train_accuracy": 0.725,
            "test_accuracy": 0.625,
            "train": {
              "accuracy": 0.725,
              "precision": 0.7453,
              "recall": 0.8229,
              "f1": 0.7822,
              "roc_auc": 0.8397,
              "confusion_matrix": [
                [
                  37,
                  27
                ],
                [
                  17,
                  79
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.6852,
                  "recall": 0.5781,
                  "f1-score": 0.6271,
                  "support": 64.0
                },
                "1": {
                  "precision": 0.7453,
                  "recall": 0.8229,
                  "f1-score": 0.7822,
                  "support": 96.0
                },
                "accuracy": 0.725,
                "macro avg": {
                  "precision": 0.7152,
                  "recall": 0.7005,
                  "f1-score": 0.7046,
                  "support": 160.0
                },
                "weighted avg": {
                  "precision": 0.7212,
                  "recall": 0.725,
                  "f1-score": 0.7202,
                  "support": 160.0
                }
              }
            },
            "test": {
              "accuracy": 0.625,
              "precision": 0.75,
              "recall": 0.7241,
              "f1": 0.7368,
              "roc_auc": 0.5987,
              "confusion_matrix": [
                [
                  4,
                  7
                ],
                [
                  8,
                  21
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.3333,
                  "recall": 0.3636,
                  "f1-score": 0.3478,
                  "support": 11.0
                },
                "1": {
                  "precision": 0.75,
                  "recall": 0.7241,
                  "f1-score": 0.7368,
                  "support": 29.0
                },
                "accuracy": 0.625,
                "macro avg": {
                  "precision": 0.5417,
                  "recall": 0.5439,
                  "f1-score": 0.5423,
                  "support": 40.0
                },
                "weighted avg": {
                  "precision": 0.6354,
                  "recall": 0.625,
                  "f1-score": 0.6299,
                  "support": 40.0
                }
              }
            }
          },
          {
            "c": 0.01,
            "train_accuracy": 0.6,
            "test_accuracy": 0.725,
            "train": {
              "accuracy": 0.6,
              "precision": 0.6,
              "recall": 1.0,
              "f1": 0.75,
              "roc_auc": 0.7441,
              "confusion_matrix": [
                [
                  0,
                  64
                ],
                [
                  0,
                  96
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.0,
                  "recall": 0.0,
                  "f1-score": 0.0,
                  "support": 64.0
                },
                "1": {
                  "precision": 0.6,
                  "recall": 1.0,
                  "f1-score": 0.75,
                  "support": 96.0
                },
                "accuracy": 0.6,
                "macro avg": {
                  "precision": 0.3,
                  "recall": 0.5,
                  "f1-score": 0.375,
                  "support": 160.0
                },
                "weighted avg": {
                  "precision": 0.36,
                  "recall": 0.6,
                  "f1-score": 0.45,
                  "support": 160.0
                }
              }
            },
            "test": {
              "accuracy": 0.725,
              "precision": 0.725,
              "recall": 1.0,
              "f1": 0.8406,
              "roc_auc": 0.5893,
              "confusion_matrix": [
                [
                  0,
                  11
                ],
                [
                  0,
                  29
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.0,
                  "recall": 0.0,
                  "f1-score": 0.0,
                  "support": 11.0
                },
                "1": {
                  "precision": 0.725,
                  "recall": 1.0,
                  "f1-score": 0.8406,
                  "support": 29.0
                },
                "accuracy": 0.725,
                "macro avg": {
                  "precision": 0.3625,
                  "recall": 0.5,
                  "f1-score": 0.4203,
                  "support": 40.0
                },
                "weighted avg": {
                  "precision": 0.5256,
                  "recall": 0.725,
                  "f1-score": 0.6094,
                  "support": 40.0
                }
              }
            }
          }
        ]
      },
      "plots": {
        "test_probability_vs_actual": {
          "points": [
            {
              "actual": 1,
              "predicted_probability": 0.5452
            },
            {
              "actual": 1,
              "predicted_probability": 0.574
            },
            {
              "actual": 0,
              "predicted_probability": 0.5598
            },
            {
              "actual": 1,
              "predicted_probability": 0.5931
            },
            {
              "actual": 1,
              "predicted_probability": 0.5848
            },
            {
              "actual": 0,
              "predicted_probability": 0.5615
            },
            {
              "actual": 0,
              "predicted_probability": 0.5197
            },
            {
              "actual": 1,
              "predicted_probability": 0.5874
            },
            {
              "actual": 0,
              "predicted_probability": 0.5461
            },
            {
              "actual": 1,
              "predicted_probability": 0.5751
            },
            {
              "actual": 1,
              "predicted_probability": 0.5365
            },
            {
              "actual": 1,
              "predicted_probability": 0.5842
            },
            {
              "actual": 1,
              "predicted_probability": 0.6019
            },
            {
              "actual": 0,
              "predicted_probability": 0.5374
            },
            {
              "actual": 1,
              "predicted_probability": 0.5899
            },
            {
              "actual": 0,
              "predicted_probability": 0.5803
            },
            {
              "actual": 1,
              "predicted_probability": 0.5664
            },
            {
              "actual": 1,
              "predicted_probability": 0.561
            },
            {
              "actual": 1,
              "predicted_probability": 0.5658
            },
            {
              "actual": 1,
              "predicted_probability": 0.5343
            },
            {
              "actual": 1,
              "predicted_probability": 0.5769
            },
            {
              "actual": 1,
              "predicted_probability": 0.5777
            },
            {
              "actual": 0,
              "predicted_probability": 0.6078
            },
            {
              "actual": 1,
              "predicted_probability": 0.5195
            },
            {
              "actual": 1,
              "predicted_probability": 0.5695
            },
            {
              "actual": 0,
              "predicted_probability": 0.5538
            },
            {
              "actual": 1,
              "predicted_probability": 0.5392
            },
            {
              "actual": 1,
              "predicted_probability": 0.5417
            },
            {
              "actual": 0,
              "predicted_probability": 0.5775
            },
            {
              "actual": 1,
              "predicted_probability": 0.5933
            },
            {
              "actual": 1,
              "predicted_probability": 0.5842
            },
            {
              "actual": 1,
              "predicted_probability": 0.5371
            },
            {
              "actual": 0,
              "predicted_probability": 0.5681
            },
            {
              "actual": 1,
              "predicted_probability": 0.5537
            },
            {
              "actual": 1,
              "predicted_probability": 0.5713
            },
            {
              "actual": 1,
              "predicted_probability": 0.5702
            },
            {
              "actual": 1,
              "predicted_probability": 0.5191
            },
            {
              "actual": 0,
              "predicted_probability": 0.5324
            },
            {
              "actual": 1,
              "predicted_probability": 0.5809
            },
            {
              "actual": 1,
              "predicted_probability": 0.5349
            }
          ],
          "min": 0.0,
          "max": 1.0
        }
      }
    }
  },
  "overview": {
    "best_regressor": "random_forest",
    "best_regressor_rmse": 12.8738,
    "best_classifier": "logistic_regression",
    "best_classifier_accuracy": 0.725
  }
};
