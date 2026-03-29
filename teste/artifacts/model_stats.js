window.MODEL_STATS = {
  "generated_at": "2026-03-28T20:59:38.118729+00:00",
  "dataset": {
    "rows": 2000,
    "columns": 17,
    "target_mean": 76.1368,
    "target_median": 76.38,
    "target_std": 9.9644,
    "class_balance": {
      "positive": 1445,
      "negative": 555
    },
    "threshold": 70
  },
  "models": {
    "linear_regression": {
      "key": "linear_regression",
      "name": "Linear Regression",
      "task": "regression",
      "source": "teste/linear_regression.ipynb",
      "artifact": "teste/artifacts/models/linear_regression.joblib",
      "split": {
        "test_size": 0.2,
        "random_state": 42,
        "train_rows": 1600,
        "test_rows": 400,
        "shared_indices": true
      },
      "metrics": {
        "selected": {
          "train": {
            "mae": 2.3941,
            "mse": 21.9938,
            "rmse": 4.6898,
            "r2": 0.7796,
            "explained_variance": 0.7796,
            "median_absolute_error": 1.3354,
            "max_error": 32.0304
          },
          "test": {
            "mae": 2.6724,
            "mse": 30.4745,
            "rmse": 5.5204,
            "r2": 0.6857,
            "explained_variance": 0.6873,
            "median_absolute_error": 1.3821,
            "max_error": 35.8485
          }
        }
      },
      "plots": {
        "test_actual_vs_predicted": {
          "points": [
            {
              "actual": 76.79,
              "predicted": 78.8766
            },
            {
              "actual": 72.48,
              "predicted": 68.9849
            },
            {
              "actual": 76.94,
              "predicted": 76.7749
            },
            {
              "actual": 86.5,
              "predicted": 85.1096
            },
            {
              "actual": 75.92,
              "predicted": 74.488
            },
            {
              "actual": 72.2,
              "predicted": 71.9356
            },
            {
              "actual": 84.57,
              "predicted": 81.2266
            },
            {
              "actual": 71.18,
              "predicted": 73.7647
            },
            {
              "actual": 79.82,
              "predicted": 72.0023
            },
            {
              "actual": 85.38,
              "predicted": 89.8543
            },
            {
              "actual": 85.88,
              "predicted": 83.4709
            },
            {
              "actual": 80.94,
              "predicted": 82.6666
            },
            {
              "actual": 83.84,
              "predicted": 84.3743
            },
            {
              "actual": 88.13,
              "predicted": 86.8882
            },
            {
              "actual": 71.15,
              "predicted": 71.3829
            },
            {
              "actual": 90.61,
              "predicted": 88.6765
            },
            {
              "actual": 73.0,
              "predicted": 72.7837
            },
            {
              "actual": 89.59,
              "predicted": 78.779
            },
            {
              "actual": 65.15,
              "predicted": 64.3519
            },
            {
              "actual": 68.35,
              "predicted": 65.4084
            },
            {
              "actual": 71.75,
              "predicted": 73.6523
            },
            {
              "actual": 76.74,
              "predicted": 77.9291
            },
            {
              "actual": 87.35,
              "predicted": 86.841
            },
            {
              "actual": 70.08,
              "predicted": 70.9367
            },
            {
              "actual": 80.7,
              "predicted": 79.2117
            },
            {
              "actual": 92.59,
              "predicted": 70.5665
            },
            {
              "actual": 75.23,
              "predicted": 75.6944
            },
            {
              "actual": 78.51,
              "predicted": 79.1602
            },
            {
              "actual": 70.97,
              "predicted": 71.7517
            },
            {
              "actual": 69.84,
              "predicted": 85.7475
            },
            {
              "actual": 73.01,
              "predicted": 74.0874
            },
            {
              "actual": 75.2,
              "predicted": 76.9481
            },
            {
              "actual": 92.09,
              "predicted": 89.9084
            },
            {
              "actual": 77.75,
              "predicted": 76.5142
            },
            {
              "actual": 73.91,
              "predicted": 74.8763
            },
            {
              "actual": 72.59,
              "predicted": 74.9598
            },
            {
              "actual": 86.44,
              "predicted": 88.0219
            },
            {
              "actual": 64.3,
              "predicted": 63.4965
            },
            {
              "actual": 58.72,
              "predicted": 59.3863
            },
            {
              "actual": 71.8,
              "predicted": 74.7808
            },
            {
              "actual": 75.86,
              "predicted": 70.6244
            },
            {
              "actual": 68.76,
              "predicted": 65.9708
            },
            {
              "actual": 92.18,
              "predicted": 91.824
            },
            {
              "actual": 87.8,
              "predicted": 85.2584
            },
            {
              "actual": 60.68,
              "predicted": 63.7876
            },
            {
              "actual": 83.88,
              "predicted": 83.4951
            },
            {
              "actual": 83.29,
              "predicted": 81.4626
            },
            {
              "actual": 69.57,
              "predicted": 68.3505
            },
            {
              "actual": 87.49,
              "predicted": 69.3278
            },
            {
              "actual": 81.11,
              "predicted": 81.4683
            },
            {
              "actual": 85.79,
              "predicted": 84.3363
            },
            {
              "actual": 72.69,
              "predicted": 72.8006
            },
            {
              "actual": 64.43,
              "predicted": 66.6026
            },
            {
              "actual": 72.56,
              "predicted": 73.4979
            },
            {
              "actual": 75.13,
              "predicted": 74.9442
            },
            {
              "actual": 83.16,
              "predicted": 81.5762
            },
            {
              "actual": 70.62,
              "predicted": 72.8517
            },
            {
              "actual": 73.45,
              "predicted": 75.4305
            },
            {
              "actual": 89.9,
              "predicted": 87.6542
            },
            {
              "actual": 86.6,
              "predicted": 86.7115
            },
            {
              "actual": 67.36,
              "predicted": 65.6535
            },
            {
              "actual": 77.82,
              "predicted": 76.8306
            },
            {
              "actual": 62.44,
              "predicted": 63.1665
            },
            {
              "actual": 80.86,
              "predicted": 80.0827
            },
            {
              "actual": 73.15,
              "predicted": 73.4803
            },
            {
              "actual": 72.49,
              "predicted": 75.5249
            },
            {
              "actual": 80.62,
              "predicted": 81.401
            },
            {
              "actual": 84.98,
              "predicted": 84.4996
            },
            {
              "actual": 94.48,
              "predicted": 64.9286
            },
            {
              "actual": 83.29,
              "predicted": 82.6461
            },
            {
              "actual": 80.14,
              "predicted": 78.3944
            },
            {
              "actual": 75.13,
              "predicted": 74.5299
            },
            {
              "actual": 83.42,
              "predicted": 81.8452
            },
            {
              "actual": 72.55,
              "predicted": 74.4276
            },
            {
              "actual": 68.88,
              "predicted": 70.6927
            },
            {
              "actual": 62.9,
              "predicted": 61.0356
            },
            {
              "actual": 75.77,
              "predicted": 73.1823
            },
            {
              "actual": 78.39,
              "predicted": 77.8026
            },
            {
              "actual": 55.44,
              "predicted": 53.7334
            },
            {
              "actual": 87.78,
              "predicted": 90.3932
            },
            {
              "actual": 66.05,
              "predicted": 63.8352
            },
            {
              "actual": 77.64,
              "predicted": 75.8463
            },
            {
              "actual": 89.03,
              "predicted": 89.7121
            },
            {
              "actual": 57.6,
              "predicted": 60.0027
            },
            {
              "actual": 83.09,
              "predicted": 81.5583
            },
            {
              "actual": 79.33,
              "predicted": 79.3647
            },
            {
              "actual": 78.73,
              "predicted": 80.0435
            },
            {
              "actual": 66.43,
              "predicted": 69.2196
            },
            {
              "actual": 70.77,
              "predicted": 71.1239
            },
            {
              "actual": 61.33,
              "predicted": 61.7059
            },
            {
              "actual": 84.08,
              "predicted": 85.7379
            },
            {
              "actual": 71.9,
              "predicted": 71.6837
            },
            {
              "actual": 75.42,
              "predicted": 74.7366
            },
            {
              "actual": 74.29,
              "predicted": 75.3494
            },
            {
              "actual": 74.8,
              "predicted": 75.2285
            },
            {
              "actual": 74.25,
              "predicted": 72.9573
            },
            {
              "actual": 83.79,
              "predicted": 82.6736
            },
            {
              "actual": 82.35,
              "predicted": 81.2944
            },
            {
              "actual": 79.68,
              "predicted": 78.0577
            },
            {
              "actual": 50.11,
              "predicted": 55.2906
            },
            {
              "actual": 85.34,
              "predicted": 86.806
            },
            {
              "actual": 66.64,
              "predicted": 68.9559
            },
            {
              "actual": 79.87,
              "predicted": 78.5755
            },
            {
              "actual": 72.34,
              "predicted": 75.4678
            },
            {
              "actual": 91.36,
              "predicted": 91.793
            },
            {
              "actual": 69.76,
              "predicted": 69.4311
            },
            {
              "actual": 85.4,
              "predicted": 83.3602
            },
            {
              "actual": 83.66,
              "predicted": 81.4479
            },
            {
              "actual": 75.01,
              "predicted": 75.0907
            },
            {
              "actual": 87.87,
              "predicted": 90.9548
            },
            {
              "actual": 75.87,
              "predicted": 74.6482
            },
            {
              "actual": 64.82,
              "predicted": 66.692
            },
            {
              "actual": 63.97,
              "predicted": 64.6327
            },
            {
              "actual": 79.98,
              "predicted": 79.1278
            },
            {
              "actual": 76.44,
              "predicted": 74.495
            },
            {
              "actual": 75.88,
              "predicted": 78.196
            },
            {
              "actual": 77.48,
              "predicted": 77.7472
            },
            {
              "actual": 83.83,
              "predicted": 83.3647
            },
            {
              "actual": 84.46,
              "predicted": 82.3568
            },
            {
              "actual": 77.59,
              "predicted": 76.3774
            },
            {
              "actual": 88.32,
              "predicted": 88.2387
            },
            {
              "actual": 73.35,
              "predicted": 76.1587
            },
            {
              "actual": 72.71,
              "predicted": 75.1156
            },
            {
              "actual": 62.66,
              "predicted": 62.8144
            },
            {
              "actual": 79.95,
              "predicted": 79.018
            },
            {
              "actual": 72.64,
              "predicted": 74.1675
            },
            {
              "actual": 86.51,
              "predicted": 87.6881
            },
            {
              "actual": 90.52,
              "predicted": 87.9422
            },
            {
              "actual": 83.84,
              "predicted": 81.7377
            },
            {
              "actual": 71.29,
              "predicted": 73.2621
            },
            {
              "actual": 73.48,
              "predicted": 73.4891
            },
            {
              "actual": 88.67,
              "predicted": 87.9648
            },
            {
              "actual": 87.94,
              "predicted": 89.5853
            },
            {
              "actual": 69.92,
              "predicted": 68.4528
            },
            {
              "actual": 81.55,
              "predicted": 80.5734
            },
            {
              "actual": 87.85,
              "predicted": 88.9885
            },
            {
              "actual": 62.93,
              "predicted": 60.6223
            },
            {
              "actual": 81.81,
              "predicted": 79.9845
            },
            {
              "actual": 81.38,
              "predicted": 82.7604
            },
            {
              "actual": 80.23,
              "predicted": 79.0507
            },
            {
              "actual": 76.66,
              "predicted": 76.489
            },
            {
              "actual": 77.56,
              "predicted": 79.0199
            },
            {
              "actual": 66.84,
              "predicted": 64.3466
            },
            {
              "actual": 84.67,
              "predicted": 84.3541
            },
            {
              "actual": 68.33,
              "predicted": 67.8632
            },
            {
              "actual": 73.19,
              "predicted": 74.0647
            },
            {
              "actual": 70.49,
              "predicted": 71.441
            },
            {
              "actual": 62.73,
              "predicted": 64.9374
            },
            {
              "actual": 87.7,
              "predicted": 86.7932
            },
            {
              "actual": 52.24,
              "predicted": 88.0885
            },
            {
              "actual": 85.41,
              "predicted": 82.7029
            },
            {
              "actual": 90.74,
              "predicted": 91.6269
            },
            {
              "actual": 86.29,
              "predicted": 85.1149
            },
            {
              "actual": 82.12,
              "predicted": 82.1446
            },
            {
              "actual": 65.27,
              "predicted": 66.0553
            },
            {
              "actual": 77.98,
              "predicted": 71.0678
            },
            {
              "actual": 70.19,
              "predicted": 70.6868
            },
            {
              "actual": 62.72,
              "predicted": 63.9635
            },
            {
              "actual": 87.09,
              "predicted": 87.6823
            },
            {
              "actual": 78.01,
              "predicted": 77.533
            },
            {
              "actual": 63.4,
              "predicted": 62.7494
            },
            {
              "actual": 73.85,
              "predicted": 72.3734
            },
            {
              "actual": 87.97,
              "predicted": 69.6411
            },
            {
              "actual": 89.55,
              "predicted": 89.8669
            },
            {
              "actual": 72.67,
              "predicted": 72.8995
            },
            {
              "actual": 91.66,
              "predicted": 93.8757
            },
            {
              "actual": 79.33,
              "predicted": 81.4031
            },
            {
              "actual": 76.48,
              "predicted": 76.9309
            },
            {
              "actual": 66.26,
              "predicted": 65.036
            },
            {
              "actual": 81.85,
              "predicted": 81.2739
            },
            {
              "actual": 84.71,
              "predicted": 84.2425
            },
            {
              "actual": 81.52,
              "predicted": 81.4162
            },
            {
              "actual": 75.56,
              "predicted": 78.4117
            },
            {
              "actual": 76.01,
              "predicted": 77.551
            },
            {
              "actual": 79.95,
              "predicted": 82.2231
            },
            {
              "actual": 63.82,
              "predicted": 63.1266
            },
            {
              "actual": 68.58,
              "predicted": 65.6334
            },
            {
              "actual": 73.42,
              "predicted": 72.4366
            },
            {
              "actual": 77.05,
              "predicted": 78.4904
            },
            {
              "actual": 69.89,
              "predicted": 66.3224
            },
            {
              "actual": 61.2,
              "predicted": 61.7587
            },
            {
              "actual": 78.41,
              "predicted": 75.5118
            },
            {
              "actual": 89.68,
              "predicted": 88.8319
            },
            {
              "actual": 77.86,
              "predicted": 80.0222
            },
            {
              "actual": 58.4,
              "predicted": 58.5033
            },
            {
              "actual": 63.01,
              "predicted": 62.0378
            },
            {
              "actual": 63.45,
              "predicted": 65.2701
            },
            {
              "actual": 55.62,
              "predicted": 58.6736
            },
            {
              "actual": 64.73,
              "predicted": 69.2761
            },
            {
              "actual": 76.26,
              "predicted": 78.425
            },
            {
              "actual": 74.25,
              "predicted": 75.317
            },
            {
              "actual": 85.98,
              "predicted": 84.7754
            },
            {
              "actual": 71.26,
              "predicted": 72.2994
            },
            {
              "actual": 81.24,
              "predicted": 80.2275
            },
            {
              "actual": 83.73,
              "predicted": 68.6955
            },
            {
              "actual": 67.52,
              "predicted": 65.965
            },
            {
              "actual": 79.94,
              "predicted": 78.704
            },
            {
              "actual": 92.59,
              "predicted": 93.4978
            },
            {
              "actual": 77.79,
              "predicted": 76.4662
            },
            {
              "actual": 85.11,
              "predicted": 87.6855
            },
            {
              "actual": 76.61,
              "predicted": 79.2509
            },
            {
              "actual": 85.77,
              "predicted": 85.0736
            },
            {
              "actual": 85.45,
              "predicted": 78.5188
            },
            {
              "actual": 53.21,
              "predicted": 56.503
            },
            {
              "actual": 79.96,
              "predicted": 81.5365
            },
            {
              "actual": 65.38,
              "predicted": 63.6437
            },
            {
              "actual": 78.25,
              "predicted": 78.5512
            },
            {
              "actual": 62.27,
              "predicted": 63.4487
            },
            {
              "actual": 77.49,
              "predicted": 77.1577
            },
            {
              "actual": 91.67,
              "predicted": 66.4196
            },
            {
              "actual": 92.73,
              "predicted": 91.3368
            },
            {
              "actual": 83.13,
              "predicted": 73.9138
            },
            {
              "actual": 76.6,
              "predicted": 74.8095
            },
            {
              "actual": 65.02,
              "predicted": 85.64
            },
            {
              "actual": 86.1,
              "predicted": 85.3069
            },
            {
              "actual": 91.54,
              "predicted": 90.5575
            },
            {
              "actual": 83.71,
              "predicted": 83.2453
            },
            {
              "actual": 78.66,
              "predicted": 77.7676
            },
            {
              "actual": 87.78,
              "predicted": 88.4629
            },
            {
              "actual": 86.98,
              "predicted": 86.2887
            },
            {
              "actual": 89.76,
              "predicted": 85.9327
            },
            {
              "actual": 95.35,
              "predicted": 77.4108
            },
            {
              "actual": 82.38,
              "predicted": 83.2859
            },
            {
              "actual": 84.89,
              "predicted": 83.7693
            },
            {
              "actual": 86.16,
              "predicted": 86.3101
            },
            {
              "actual": 72.27,
              "predicted": 73.9862
            },
            {
              "actual": 75.38,
              "predicted": 74.628
            },
            {
              "actual": 70.19,
              "predicted": 77.4625
            },
            {
              "actual": 55.02,
              "predicted": 57.2925
            },
            {
              "actual": 72.5,
              "predicted": 73.7669
            },
            {
              "actual": 82.35,
              "predicted": 82.7974
            },
            {
              "actual": 90.64,
              "predicted": 89.3847
            },
            {
              "actual": 64.46,
              "predicted": 65.7489
            },
            {
              "actual": 88.02,
              "predicted": 86.0208
            },
            {
              "actual": 87.17,
              "predicted": 88.8574
            },
            {
              "actual": 80.28,
              "predicted": 79.5968
            },
            {
              "actual": 71.29,
              "predicted": 73.9752
            },
            {
              "actual": 86.13,
              "predicted": 85.6067
            },
            {
              "actual": 74.56,
              "predicted": 76.6654
            },
            {
              "actual": 78.49,
              "predicted": 78.4918
            },
            {
              "actual": 79.23,
              "predicted": 79.5431
            },
            {
              "actual": 73.23,
              "predicted": 73.7176
            },
            {
              "actual": 91.31,
              "predicted": 88.3151
            },
            {
              "actual": 89.6,
              "predicted": 89.5746
            },
            {
              "actual": 86.2,
              "predicted": 88.7219
            },
            {
              "actual": 69.65,
              "predicted": 79.5368
            },
            {
              "actual": 92.88,
              "predicted": 94.1678
            },
            {
              "actual": 72.23,
              "predicted": 70.3446
            },
            {
              "actual": 83.76,
              "predicted": 81.9443
            },
            {
              "actual": 62.88,
              "predicted": 61.6484
            },
            {
              "actual": 74.22,
              "predicted": 75.5103
            },
            {
              "actual": 74.07,
              "predicted": 71.9546
            },
            {
              "actual": 71.39,
              "predicted": 73.9209
            },
            {
              "actual": 80.18,
              "predicted": 80.747
            },
            {
              "actual": 70.38,
              "predicted": 68.9707
            },
            {
              "actual": 85.36,
              "predicted": 86.3113
            },
            {
              "actual": 84.36,
              "predicted": 84.1697
            },
            {
              "actual": 75.76,
              "predicted": 75.024
            },
            {
              "actual": 68.17,
              "predicted": 65.6341
            },
            {
              "actual": 65.01,
              "predicted": 68.9489
            },
            {
              "actual": 55.79,
              "predicted": 77.1608
            },
            {
              "actual": 68.87,
              "predicted": 68.2412
            },
            {
              "actual": 90.83,
              "predicted": 73.5353
            },
            {
              "actual": 75.44,
              "predicted": 72.4968
            },
            {
              "actual": 77.71,
              "predicted": 78.442
            },
            {
              "actual": 90.69,
              "predicted": 87.9848
            },
            {
              "actual": 81.22,
              "predicted": 81.7469
            },
            {
              "actual": 98.54,
              "predicted": 67.8287
            },
            {
              "actual": 77.76,
              "predicted": 81.6006
            },
            {
              "actual": 60.83,
              "predicted": 63.0352
            },
            {
              "actual": 63.17,
              "predicted": 64.0846
            },
            {
              "actual": 54.33,
              "predicted": 55.1133
            },
            {
              "actual": 80.11,
              "predicted": 79.6339
            },
            {
              "actual": 77.0,
              "predicted": 78.9466
            },
            {
              "actual": 65.8,
              "predicted": 65.4328
            },
            {
              "actual": 60.04,
              "predicted": 59.4243
            },
            {
              "actual": 91.19,
              "predicted": 89.1227
            },
            {
              "actual": 67.99,
              "predicted": 66.9203
            },
            {
              "actual": 93.95,
              "predicted": 92.0715
            },
            {
              "actual": 76.52,
              "predicted": 75.5667
            },
            {
              "actual": 62.85,
              "predicted": 62.722
            },
            {
              "actual": 81.38,
              "predicted": 79.4696
            },
            {
              "actual": 66.43,
              "predicted": 66.5296
            },
            {
              "actual": 62.64,
              "predicted": 59.8353
            },
            {
              "actual": 52.5,
              "predicted": 54.1002
            },
            {
              "actual": 93.58,
              "predicted": 73.786
            },
            {
              "actual": 73.28,
              "predicted": 74.6586
            },
            {
              "actual": 84.65,
              "predicted": 85.6738
            },
            {
              "actual": 82.32,
              "predicted": 75.3194
            },
            {
              "actual": 51.55,
              "predicted": 71.8495
            },
            {
              "actual": 79.93,
              "predicted": 80.5344
            },
            {
              "actual": 64.35,
              "predicted": 66.965
            },
            {
              "actual": 83.89,
              "predicted": 82.1379
            },
            {
              "actual": 57.91,
              "predicted": 57.1569
            },
            {
              "actual": 85.8,
              "predicted": 86.9492
            },
            {
              "actual": 67.64,
              "predicted": 66.8448
            },
            {
              "actual": 86.49,
              "predicted": 64.6597
            },
            {
              "actual": 63.33,
              "predicted": 64.4305
            },
            {
              "actual": 82.27,
              "predicted": 79.7071
            },
            {
              "actual": 73.42,
              "predicted": 72.636
            },
            {
              "actual": 78.56,
              "predicted": 77.0931
            },
            {
              "actual": 75.11,
              "predicted": 80.3893
            },
            {
              "actual": 71.1,
              "predicted": 71.0232
            },
            {
              "actual": 94.15,
              "predicted": 95.3829
            },
            {
              "actual": 72.84,
              "predicted": 75.3954
            },
            {
              "actual": 67.86,
              "predicted": 69.529
            },
            {
              "actual": 71.08,
              "predicted": 71.3168
            },
            {
              "actual": 55.96,
              "predicted": 57.6255
            },
            {
              "actual": 57.91,
              "predicted": 56.925
            },
            {
              "actual": 52.22,
              "predicted": 78.085
            },
            {
              "actual": 80.31,
              "predicted": 79.0664
            },
            {
              "actual": 63.91,
              "predicted": 66.4243
            },
            {
              "actual": 80.34,
              "predicted": 80.2572
            },
            {
              "actual": 85.05,
              "predicted": 86.8462
            },
            {
              "actual": 70.73,
              "predicted": 73.2425
            },
            {
              "actual": 63.38,
              "predicted": 63.8622
            },
            {
              "actual": 81.57,
              "predicted": 82.7213
            },
            {
              "actual": 81.9,
              "predicted": 81.7195
            },
            {
              "actual": 74.34,
              "predicted": 76.9244
            },
            {
              "actual": 81.9,
              "predicted": 81.0672
            },
            {
              "actual": 69.49,
              "predicted": 74.1243
            },
            {
              "actual": 77.74,
              "predicted": 79.8975
            },
            {
              "actual": 58.42,
              "predicted": 66.9485
            },
            {
              "actual": 73.01,
              "predicted": 73.6778
            },
            {
              "actual": 71.91,
              "predicted": 73.4417
            },
            {
              "actual": 94.77,
              "predicted": 94.3039
            },
            {
              "actual": 66.73,
              "predicted": 65.0162
            },
            {
              "actual": 65.13,
              "predicted": 63.7998
            },
            {
              "actual": 66.08,
              "predicted": 65.985
            },
            {
              "actual": 84.68,
              "predicted": 80.5779
            },
            {
              "actual": 67.17,
              "predicted": 67.0886
            },
            {
              "actual": 88.18,
              "predicted": 85.8317
            },
            {
              "actual": 73.37,
              "predicted": 76.5697
            },
            {
              "actual": 68.24,
              "predicted": 65.7238
            },
            {
              "actual": 77.62,
              "predicted": 77.1781
            },
            {
              "actual": 67.56,
              "predicted": 66.3391
            },
            {
              "actual": 76.32,
              "predicted": 76.5371
            },
            {
              "actual": 60.37,
              "predicted": 72.6511
            },
            {
              "actual": 65.09,
              "predicted": 63.7062
            },
            {
              "actual": 83.7,
              "predicted": 81.5877
            },
            {
              "actual": 81.1,
              "predicted": 76.2513
            },
            {
              "actual": 99.99,
              "predicted": 93.6441
            },
            {
              "actual": 68.2,
              "predicted": 70.4058
            },
            {
              "actual": 93.83,
              "predicted": 90.008
            },
            {
              "actual": 80.93,
              "predicted": 80.0492
            },
            {
              "actual": 77.09,
              "predicted": 76.8367
            },
            {
              "actual": 71.13,
              "predicted": 74.1132
            },
            {
              "actual": 70.48,
              "predicted": 70.8653
            },
            {
              "actual": 74.88,
              "predicted": 75.7377
            },
            {
              "actual": 73.04,
              "predicted": 74.8162
            },
            {
              "actual": 75.37,
              "predicted": 66.1505
            },
            {
              "actual": 83.36,
              "predicted": 84.316
            },
            {
              "actual": 80.31,
              "predicted": 81.101
            },
            {
              "actual": 53.95,
              "predicted": 57.2723
            },
            {
              "actual": 66.99,
              "predicted": 74.8234
            },
            {
              "actual": 82.55,
              "predicted": 81.98
            },
            {
              "actual": 83.69,
              "predicted": 80.1772
            },
            {
              "actual": 84.77,
              "predicted": 83.8116
            },
            {
              "actual": 78.01,
              "predicted": 78.453
            },
            {
              "actual": 86.79,
              "predicted": 83.743
            },
            {
              "actual": 70.43,
              "predicted": 72.0168
            },
            {
              "actual": 82.25,
              "predicted": 80.8351
            },
            {
              "actual": 83.29,
              "predicted": 82.5736
            },
            {
              "actual": 92.63,
              "predicted": 68.8436
            },
            {
              "actual": 79.61,
              "predicted": 79.3364
            },
            {
              "actual": 62.5,
              "predicted": 64.1178
            },
            {
              "actual": 62.7,
              "predicted": 63.8496
            },
            {
              "actual": 78.55,
              "predicted": 78.1394
            },
            {
              "actual": 89.51,
              "predicted": 87.5814
            },
            {
              "actual": 91.05,
              "predicted": 89.4374
            },
            {
              "actual": 69.81,
              "predicted": 68.5301
            },
            {
              "actual": 91.51,
              "predicted": 91.1504
            },
            {
              "actual": 95.02,
              "predicted": 68.9885
            },
            {
              "actual": 83.47,
              "predicted": 79.9273
            },
            {
              "actual": 60.97,
              "predicted": 59.4798
            },
            {
              "actual": 82.96,
              "predicted": 80.8871
            },
            {
              "actual": 81.58,
              "predicted": 78.8501
            },
            {
              "actual": 77.37,
              "predicted": 76.0464
            },
            {
              "actual": 59.28,
              "predicted": 57.7206
            },
            {
              "actual": 64.88,
              "predicted": 65.8628
            },
            {
              "actual": 69.68,
              "predicted": 69.4057
            },
            {
              "actual": 77.75,
              "predicted": 77.778
            },
            {
              "actual": 73.11,
              "predicted": 74.3567
            },
            {
              "actual": 61.25,
              "predicted": 61.1557
            },
            {
              "actual": 87.69,
              "predicted": 88.7407
            },
            {
              "actual": 70.94,
              "predicted": 72.3928
            },
            {
              "actual": 89.65,
              "predicted": 92.3332
            },
            {
              "actual": 64.28,
              "predicted": 65.3587
            },
            {
              "actual": 76.16,
              "predicted": 75.1527
            },
            {
              "actual": 77.79,
              "predicted": 79.1597
            },
            {
              "actual": 85.36,
              "predicted": 83.1579
            },
            {
              "actual": 68.63,
              "predicted": 67.8796
            },
            {
              "actual": 74.63,
              "predicted": 75.3562
            },
            {
              "actual": 75.45,
              "predicted": 77.7413
            },
            {
              "actual": 69.31,
              "predicted": 67.8495
            },
            {
              "actual": 79.53,
              "predicted": 78.1404
            },
            {
              "actual": 74.14,
              "predicted": 75.6824
            },
            {
              "actual": 65.34,
              "predicted": 67.9733
            },
            {
              "actual": 81.8,
              "predicted": 81.115
            },
            {
              "actual": 95.0,
              "predicted": 93.6687
            }
          ],
          "min": 50.11,
          "max": 99.99
        }
      }
    },
    "random_forest": {
      "key": "random_forest",
      "name": "Random Forest",
      "task": "regression",
      "source": "teste/random_forest.ipynb",
      "artifact": "teste/artifacts/models/random_forest.joblib",
      "split": {
        "test_size": 0.2,
        "random_state": 42,
        "train_rows": 1600,
        "test_rows": 400,
        "shared_indices": true
      },
      "metrics": {
        "selected": {
          "train": {
            "mae": 0.8352,
            "mse": 3.4548,
            "rmse": 1.8587,
            "r2": 0.9654,
            "explained_variance": 0.9654,
            "median_absolute_error": 0.3597,
            "max_error": 12.9239
          },
          "test": {
            "mae": 2.2478,
            "mse": 26.8717,
            "rmse": 5.1838,
            "r2": 0.7229,
            "explained_variance": 0.7236,
            "median_absolute_error": 0.9116,
            "max_error": 33.1392
          }
        }
      },
      "plots": {
        "test_actual_vs_predicted": {
          "points": [
            {
              "actual": 76.79,
              "predicted": 77.5186
            },
            {
              "actual": 72.48,
              "predicted": 69.7329
            },
            {
              "actual": 76.94,
              "predicted": 75.256
            },
            {
              "actual": 86.5,
              "predicted": 85.2082
            },
            {
              "actual": 75.92,
              "predicted": 75.7369
            },
            {
              "actual": 72.2,
              "predicted": 73.219
            },
            {
              "actual": 84.57,
              "predicted": 81.4009
            },
            {
              "actual": 71.18,
              "predicted": 71.2231
            },
            {
              "actual": 79.82,
              "predicted": 68.095
            },
            {
              "actual": 85.38,
              "predicted": 88.1157
            },
            {
              "actual": 85.88,
              "predicted": 76.2163
            },
            {
              "actual": 80.94,
              "predicted": 82.2598
            },
            {
              "actual": 83.84,
              "predicted": 83.4032
            },
            {
              "actual": 88.13,
              "predicted": 87.0117
            },
            {
              "actual": 71.15,
              "predicted": 70.5211
            },
            {
              "actual": 90.61,
              "predicted": 90.7533
            },
            {
              "actual": 73.0,
              "predicted": 72.0256
            },
            {
              "actual": 89.59,
              "predicted": 76.1016
            },
            {
              "actual": 65.15,
              "predicted": 64.993
            },
            {
              "actual": 68.35,
              "predicted": 68.3919
            },
            {
              "actual": 71.75,
              "predicted": 72.7717
            },
            {
              "actual": 76.74,
              "predicted": 75.2691
            },
            {
              "actual": 87.35,
              "predicted": 86.5611
            },
            {
              "actual": 70.08,
              "predicted": 69.0974
            },
            {
              "actual": 80.7,
              "predicted": 79.9146
            },
            {
              "actual": 92.59,
              "predicted": 79.9553
            },
            {
              "actual": 75.23,
              "predicted": 73.3111
            },
            {
              "actual": 78.51,
              "predicted": 77.5695
            },
            {
              "actual": 70.97,
              "predicted": 70.3261
            },
            {
              "actual": 69.84,
              "predicted": 78.4485
            },
            {
              "actual": 73.01,
              "predicted": 73.4208
            },
            {
              "actual": 75.2,
              "predicted": 76.364
            },
            {
              "actual": 92.09,
              "predicted": 90.1973
            },
            {
              "actual": 77.75,
              "predicted": 77.3897
            },
            {
              "actual": 73.91,
              "predicted": 73.8191
            },
            {
              "actual": 72.59,
              "predicted": 74.53
            },
            {
              "actual": 86.44,
              "predicted": 85.9203
            },
            {
              "actual": 64.3,
              "predicted": 62.7085
            },
            {
              "actual": 58.72,
              "predicted": 58.014
            },
            {
              "actual": 71.8,
              "predicted": 72.2651
            },
            {
              "actual": 75.86,
              "predicted": 72.0287
            },
            {
              "actual": 68.76,
              "predicted": 68.3209
            },
            {
              "actual": 92.18,
              "predicted": 92.497
            },
            {
              "actual": 87.8,
              "predicted": 87.303
            },
            {
              "actual": 60.68,
              "predicted": 63.1061
            },
            {
              "actual": 83.88,
              "predicted": 83.1615
            },
            {
              "actual": 83.29,
              "predicted": 83.189
            },
            {
              "actual": 69.57,
              "predicted": 69.7232
            },
            {
              "actual": 87.49,
              "predicted": 67.8202
            },
            {
              "actual": 81.11,
              "predicted": 80.7424
            },
            {
              "actual": 85.79,
              "predicted": 87.2734
            },
            {
              "actual": 72.69,
              "predicted": 73.4501
            },
            {
              "actual": 64.43,
              "predicted": 64.7844
            },
            {
              "actual": 72.56,
              "predicted": 72.4198
            },
            {
              "actual": 75.13,
              "predicted": 73.3758
            },
            {
              "actual": 83.16,
              "predicted": 82.3651
            },
            {
              "actual": 70.62,
              "predicted": 71.4278
            },
            {
              "actual": 73.45,
              "predicted": 74.1522
            },
            {
              "actual": 89.9,
              "predicted": 89.5607
            },
            {
              "actual": 86.6,
              "predicted": 87.088
            },
            {
              "actual": 67.36,
              "predicted": 66.636
            },
            {
              "actual": 77.82,
              "predicted": 76.0199
            },
            {
              "actual": 62.44,
              "predicted": 63.542
            },
            {
              "actual": 80.86,
              "predicted": 81.9838
            },
            {
              "actual": 73.15,
              "predicted": 72.58
            },
            {
              "actual": 72.49,
              "predicted": 74.1993
            },
            {
              "actual": 80.62,
              "predicted": 81.1793
            },
            {
              "actual": 84.98,
              "predicted": 85.1605
            },
            {
              "actual": 94.48,
              "predicted": 63.6882
            },
            {
              "actual": 83.29,
              "predicted": 83.8852
            },
            {
              "actual": 80.14,
              "predicted": 80.2822
            },
            {
              "actual": 75.13,
              "predicted": 73.9539
            },
            {
              "actual": 83.42,
              "predicted": 82.9792
            },
            {
              "actual": 72.55,
              "predicted": 72.1845
            },
            {
              "actual": 68.88,
              "predicted": 70.4015
            },
            {
              "actual": 62.9,
              "predicted": 62.8443
            },
            {
              "actual": 75.77,
              "predicted": 73.7784
            },
            {
              "actual": 78.39,
              "predicted": 77.8818
            },
            {
              "actual": 55.44,
              "predicted": 53.9116
            },
            {
              "actual": 87.78,
              "predicted": 87.994
            },
            {
              "actual": 66.05,
              "predicted": 72.5852
            },
            {
              "actual": 77.64,
              "predicted": 76.4486
            },
            {
              "actual": 89.03,
              "predicted": 90.8964
            },
            {
              "actual": 57.6,
              "predicted": 59.3617
            },
            {
              "actual": 83.09,
              "predicted": 83.125
            },
            {
              "actual": 79.33,
              "predicted": 80.7404
            },
            {
              "actual": 78.73,
              "predicted": 79.2422
            },
            {
              "actual": 66.43,
              "predicted": 68.9941
            },
            {
              "actual": 70.77,
              "predicted": 70.9855
            },
            {
              "actual": 61.33,
              "predicted": 60.7523
            },
            {
              "actual": 84.08,
              "predicted": 86.619
            },
            {
              "actual": 71.9,
              "predicted": 70.6324
            },
            {
              "actual": 75.42,
              "predicted": 74.3446
            },
            {
              "actual": 74.29,
              "predicted": 75.8712
            },
            {
              "actual": 74.8,
              "predicted": 75.7072
            },
            {
              "actual": 74.25,
              "predicted": 74.2433
            },
            {
              "actual": 83.79,
              "predicted": 83.6636
            },
            {
              "actual": 82.35,
              "predicted": 82.6428
            },
            {
              "actual": 79.68,
              "predicted": 78.1552
            },
            {
              "actual": 50.11,
              "predicted": 53.6835
            },
            {
              "actual": 85.34,
              "predicted": 86.2012
            },
            {
              "actual": 66.64,
              "predicted": 69.1427
            },
            {
              "actual": 79.87,
              "predicted": 80.5199
            },
            {
              "actual": 72.34,
              "predicted": 73.6553
            },
            {
              "actual": 91.36,
              "predicted": 92.0882
            },
            {
              "actual": 69.76,
              "predicted": 67.9016
            },
            {
              "actual": 85.4,
              "predicted": 85.3725
            },
            {
              "actual": 83.66,
              "predicted": 83.3182
            },
            {
              "actual": 75.01,
              "predicted": 76.2623
            },
            {
              "actual": 87.87,
              "predicted": 90.6199
            },
            {
              "actual": 75.87,
              "predicted": 73.9138
            },
            {
              "actual": 64.82,
              "predicted": 65.9427
            },
            {
              "actual": 63.97,
              "predicted": 63.0219
            },
            {
              "actual": 79.98,
              "predicted": 80.84
            },
            {
              "actual": 76.44,
              "predicted": 75.4899
            },
            {
              "actual": 75.88,
              "predicted": 76.775
            },
            {
              "actual": 77.48,
              "predicted": 78.4851
            },
            {
              "actual": 83.83,
              "predicted": 83.0215
            },
            {
              "actual": 84.46,
              "predicted": 82.2087
            },
            {
              "actual": 77.59,
              "predicted": 77.3203
            },
            {
              "actual": 88.32,
              "predicted": 89.905
            },
            {
              "actual": 73.35,
              "predicted": 75.1594
            },
            {
              "actual": 72.71,
              "predicted": 72.508
            },
            {
              "actual": 62.66,
              "predicted": 61.968
            },
            {
              "actual": 79.95,
              "predicted": 81.086
            },
            {
              "actual": 72.64,
              "predicted": 73.3674
            },
            {
              "actual": 86.51,
              "predicted": 86.8161
            },
            {
              "actual": 90.52,
              "predicted": 88.8548
            },
            {
              "actual": 83.84,
              "predicted": 83.3405
            },
            {
              "actual": 71.29,
              "predicted": 71.0934
            },
            {
              "actual": 73.48,
              "predicted": 73.3448
            },
            {
              "actual": 88.67,
              "predicted": 90.5322
            },
            {
              "actual": 87.94,
              "predicted": 87.9963
            },
            {
              "actual": 69.92,
              "predicted": 69.3188
            },
            {
              "actual": 81.55,
              "predicted": 81.9433
            },
            {
              "actual": 87.85,
              "predicted": 89.3316
            },
            {
              "actual": 62.93,
              "predicted": 62.7327
            },
            {
              "actual": 81.81,
              "predicted": 82.5043
            },
            {
              "actual": 81.38,
              "predicted": 81.8824
            },
            {
              "actual": 80.23,
              "predicted": 79.3797
            },
            {
              "actual": 76.66,
              "predicted": 77.5303
            },
            {
              "actual": 77.56,
              "predicted": 79.058
            },
            {
              "actual": 66.84,
              "predicted": 65.0898
            },
            {
              "actual": 84.67,
              "predicted": 84.5062
            },
            {
              "actual": 68.33,
              "predicted": 68.2387
            },
            {
              "actual": 73.19,
              "predicted": 71.8531
            },
            {
              "actual": 70.49,
              "predicted": 70.26
            },
            {
              "actual": 62.73,
              "predicted": 62.1266
            },
            {
              "actual": 87.7,
              "predicted": 87.501
            },
            {
              "actual": 52.24,
              "predicted": 78.1748
            },
            {
              "actual": 85.41,
              "predicted": 82.5545
            },
            {
              "actual": 90.74,
              "predicted": 91.9917
            },
            {
              "actual": 86.29,
              "predicted": 85.9725
            },
            {
              "actual": 82.12,
              "predicted": 82.5174
            },
            {
              "actual": 65.27,
              "predicted": 67.7599
            },
            {
              "actual": 77.98,
              "predicted": 71.5714
            },
            {
              "actual": 70.19,
              "predicted": 70.568
            },
            {
              "actual": 62.72,
              "predicted": 63.8244
            },
            {
              "actual": 87.09,
              "predicted": 88.4088
            },
            {
              "actual": 78.01,
              "predicted": 77.0772
            },
            {
              "actual": 63.4,
              "predicted": 60.3737
            },
            {
              "actual": 73.85,
              "predicted": 72.8925
            },
            {
              "actual": 87.97,
              "predicted": 72.349
            },
            {
              "actual": 89.55,
              "predicted": 89.5568
            },
            {
              "actual": 72.67,
              "predicted": 72.5984
            },
            {
              "actual": 91.66,
              "predicted": 90.6307
            },
            {
              "actual": 79.33,
              "predicted": 81.0522
            },
            {
              "actual": 76.48,
              "predicted": 74.8757
            },
            {
              "actual": 66.26,
              "predicted": 67.7541
            },
            {
              "actual": 81.85,
              "predicted": 81.0351
            },
            {
              "actual": 84.71,
              "predicted": 84.6315
            },
            {
              "actual": 81.52,
              "predicted": 81.863
            },
            {
              "actual": 75.56,
              "predicted": 76.7939
            },
            {
              "actual": 76.01,
              "predicted": 76.6587
            },
            {
              "actual": 79.95,
              "predicted": 82.1328
            },
            {
              "actual": 63.82,
              "predicted": 63.9322
            },
            {
              "actual": 68.58,
              "predicted": 68.3112
            },
            {
              "actual": 73.42,
              "predicted": 73.892
            },
            {
              "actual": 77.05,
              "predicted": 77.8458
            },
            {
              "actual": 69.89,
              "predicted": 68.6358
            },
            {
              "actual": 61.2,
              "predicted": 62.3558
            },
            {
              "actual": 78.41,
              "predicted": 77.159
            },
            {
              "actual": 89.68,
              "predicted": 88.516
            },
            {
              "actual": 77.86,
              "predicted": 78.5404
            },
            {
              "actual": 58.4,
              "predicted": 59.522
            },
            {
              "actual": 63.01,
              "predicted": 60.9157
            },
            {
              "actual": 63.45,
              "predicted": 64.1894
            },
            {
              "actual": 55.62,
              "predicted": 58.0239
            },
            {
              "actual": 64.73,
              "predicted": 66.9945
            },
            {
              "actual": 76.26,
              "predicted": 79.362
            },
            {
              "actual": 74.25,
              "predicted": 73.5533
            },
            {
              "actual": 85.98,
              "predicted": 87.8131
            },
            {
              "actual": 71.26,
              "predicted": 70.6717
            },
            {
              "actual": 81.24,
              "predicted": 81.5019
            },
            {
              "actual": 83.73,
              "predicted": 69.1467
            },
            {
              "actual": 67.52,
              "predicted": 66.8934
            },
            {
              "actual": 79.94,
              "predicted": 79.9622
            },
            {
              "actual": 92.59,
              "predicted": 92.8485
            },
            {
              "actual": 77.79,
              "predicted": 75.6889
            },
            {
              "actual": 85.11,
              "predicted": 87.8952
            },
            {
              "actual": 76.61,
              "predicted": 77.3843
            },
            {
              "actual": 85.77,
              "predicted": 86.3903
            },
            {
              "actual": 85.45,
              "predicted": 78.924
            },
            {
              "actual": 53.21,
              "predicted": 55.1712
            },
            {
              "actual": 79.96,
              "predicted": 80.7034
            },
            {
              "actual": 65.38,
              "predicted": 66.1183
            },
            {
              "actual": 78.25,
              "predicted": 79.0935
            },
            {
              "actual": 62.27,
              "predicted": 62.4044
            },
            {
              "actual": 77.49,
              "predicted": 77.7469
            },
            {
              "actual": 91.67,
              "predicted": 64.9187
            },
            {
              "actual": 92.73,
              "predicted": 91.3337
            },
            {
              "actual": 83.13,
              "predicted": 71.2644
            },
            {
              "actual": 76.6,
              "predicted": 74.0982
            },
            {
              "actual": 65.02,
              "predicted": 83.7964
            },
            {
              "actual": 86.1,
              "predicted": 85.6544
            },
            {
              "actual": 91.54,
              "predicted": 90.56
            },
            {
              "actual": 83.71,
              "predicted": 84.6378
            },
            {
              "actual": 78.66,
              "predicted": 78.6854
            },
            {
              "actual": 87.78,
              "predicted": 87.4266
            },
            {
              "actual": 86.98,
              "predicted": 85.9012
            },
            {
              "actual": 89.76,
              "predicted": 87.8792
            },
            {
              "actual": 95.35,
              "predicted": 74.1631
            },
            {
              "actual": 82.38,
              "predicted": 83.2759
            },
            {
              "actual": 84.89,
              "predicted": 84.281
            },
            {
              "actual": 86.16,
              "predicted": 87.1681
            },
            {
              "actual": 72.27,
              "predicted": 71.3785
            },
            {
              "actual": 75.38,
              "predicted": 76.231
            },
            {
              "actual": 70.19,
              "predicted": 72.1694
            },
            {
              "actual": 55.02,
              "predicted": 57.1188
            },
            {
              "actual": 72.5,
              "predicted": 73.7238
            },
            {
              "actual": 82.35,
              "predicted": 82.2401
            },
            {
              "actual": 90.64,
              "predicted": 89.4529
            },
            {
              "actual": 64.46,
              "predicted": 65.3985
            },
            {
              "actual": 88.02,
              "predicted": 87.8231
            },
            {
              "actual": 87.17,
              "predicted": 86.3388
            },
            {
              "actual": 80.28,
              "predicted": 79.8564
            },
            {
              "actual": 71.29,
              "predicted": 72.3101
            },
            {
              "actual": 86.13,
              "predicted": 85.7966
            },
            {
              "actual": 74.56,
              "predicted": 74.8615
            },
            {
              "actual": 78.49,
              "predicted": 79.6101
            },
            {
              "actual": 79.23,
              "predicted": 79.2135
            },
            {
              "actual": 73.23,
              "predicted": 74.6522
            },
            {
              "actual": 91.31,
              "predicted": 87.8778
            },
            {
              "actual": 89.6,
              "predicted": 89.481
            },
            {
              "actual": 86.2,
              "predicted": 88.4989
            },
            {
              "actual": 69.65,
              "predicted": 75.2283
            },
            {
              "actual": 92.88,
              "predicted": 91.992
            },
            {
              "actual": 72.23,
              "predicted": 68.8051
            },
            {
              "actual": 83.76,
              "predicted": 83.2309
            },
            {
              "actual": 62.88,
              "predicted": 61.7821
            },
            {
              "actual": 74.22,
              "predicted": 73.877
            },
            {
              "actual": 74.07,
              "predicted": 73.9593
            },
            {
              "actual": 71.39,
              "predicted": 72.186
            },
            {
              "actual": 80.18,
              "predicted": 79.1057
            },
            {
              "actual": 70.38,
              "predicted": 69.6496
            },
            {
              "actual": 85.36,
              "predicted": 86.0528
            },
            {
              "actual": 84.36,
              "predicted": 83.7754
            },
            {
              "actual": 75.76,
              "predicted": 75.5639
            },
            {
              "actual": 68.17,
              "predicted": 67.9449
            },
            {
              "actual": 65.01,
              "predicted": 67.19
            },
            {
              "actual": 55.79,
              "predicted": 76.4964
            },
            {
              "actual": 68.87,
              "predicted": 67.7692
            },
            {
              "actual": 90.83,
              "predicted": 74.8674
            },
            {
              "actual": 75.44,
              "predicted": 74.2447
            },
            {
              "actual": 77.71,
              "predicted": 79.7302
            },
            {
              "actual": 90.69,
              "predicted": 91.6309
            },
            {
              "actual": 81.22,
              "predicted": 81.4224
            },
            {
              "actual": 98.54,
              "predicted": 71.9085
            },
            {
              "actual": 77.76,
              "predicted": 79.8338
            },
            {
              "actual": 60.83,
              "predicted": 62.7775
            },
            {
              "actual": 63.17,
              "predicted": 66.5985
            },
            {
              "actual": 54.33,
              "predicted": 55.8808
            },
            {
              "actual": 80.11,
              "predicted": 79.7071
            },
            {
              "actual": 77.0,
              "predicted": 78.5133
            },
            {
              "actual": 65.8,
              "predicted": 64.6896
            },
            {
              "actual": 60.04,
              "predicted": 61.5085
            },
            {
              "actual": 91.19,
              "predicted": 91.9386
            },
            {
              "actual": 67.99,
              "predicted": 68.4047
            },
            {
              "actual": 93.95,
              "predicted": 91.1838
            },
            {
              "actual": 76.52,
              "predicted": 75.3296
            },
            {
              "actual": 62.85,
              "predicted": 61.5319
            },
            {
              "actual": 81.38,
              "predicted": 81.9176
            },
            {
              "actual": 66.43,
              "predicted": 66.1445
            },
            {
              "actual": 62.64,
              "predicted": 61.4498
            },
            {
              "actual": 52.5,
              "predicted": 54.2664
            },
            {
              "actual": 93.58,
              "predicted": 78.6354
            },
            {
              "actual": 73.28,
              "predicted": 73.4745
            },
            {
              "actual": 84.65,
              "predicted": 86.1449
            },
            {
              "actual": 82.32,
              "predicted": 77.2761
            },
            {
              "actual": 51.55,
              "predicted": 74.6035
            },
            {
              "actual": 79.93,
              "predicted": 79.8488
            },
            {
              "actual": 64.35,
              "predicted": 67.7722
            },
            {
              "actual": 83.89,
              "predicted": 83.1222
            },
            {
              "actual": 57.91,
              "predicted": 59.6937
            },
            {
              "actual": 85.8,
              "predicted": 87.0389
            },
            {
              "actual": 67.64,
              "predicted": 69.071
            },
            {
              "actual": 86.49,
              "predicted": 71.9295
            },
            {
              "actual": 63.33,
              "predicted": 62.3679
            },
            {
              "actual": 82.27,
              "predicted": 81.677
            },
            {
              "actual": 73.42,
              "predicted": 72.1549
            },
            {
              "actual": 78.56,
              "predicted": 77.471
            },
            {
              "actual": 75.11,
              "predicted": 80.003
            },
            {
              "actual": 71.1,
              "predicted": 70.2949
            },
            {
              "actual": 94.15,
              "predicted": 94.2516
            },
            {
              "actual": 72.84,
              "predicted": 73.1144
            },
            {
              "actual": 67.86,
              "predicted": 68.6267
            },
            {
              "actual": 71.08,
              "predicted": 70.8108
            },
            {
              "actual": 55.96,
              "predicted": 58.5436
            },
            {
              "actual": 57.91,
              "predicted": 59.0974
            },
            {
              "actual": 52.22,
              "predicted": 85.3592
            },
            {
              "actual": 80.31,
              "predicted": 80.4518
            },
            {
              "actual": 63.91,
              "predicted": 64.458
            },
            {
              "actual": 80.34,
              "predicted": 80.6437
            },
            {
              "actual": 85.05,
              "predicted": 85.8932
            },
            {
              "actual": 70.73,
              "predicted": 71.065
            },
            {
              "actual": 63.38,
              "predicted": 62.6674
            },
            {
              "actual": 81.57,
              "predicted": 82.1395
            },
            {
              "actual": 81.9,
              "predicted": 82.583
            },
            {
              "actual": 74.34,
              "predicted": 74.4412
            },
            {
              "actual": 81.9,
              "predicted": 80.4243
            },
            {
              "actual": 69.49,
              "predicted": 81.8321
            },
            {
              "actual": 77.74,
              "predicted": 79.5889
            },
            {
              "actual": 58.42,
              "predicted": 70.2018
            },
            {
              "actual": 73.01,
              "predicted": 73.626
            },
            {
              "actual": 71.91,
              "predicted": 71.4375
            },
            {
              "actual": 94.77,
              "predicted": 94.4324
            },
            {
              "actual": 66.73,
              "predicted": 66.2534
            },
            {
              "actual": 65.13,
              "predicted": 66.2691
            },
            {
              "actual": 66.08,
              "predicted": 68.2434
            },
            {
              "actual": 84.68,
              "predicted": 82.284
            },
            {
              "actual": 67.17,
              "predicted": 68.4358
            },
            {
              "actual": 88.18,
              "predicted": 89.3998
            },
            {
              "actual": 73.37,
              "predicted": 74.9403
            },
            {
              "actual": 68.24,
              "predicted": 67.9947
            },
            {
              "actual": 77.62,
              "predicted": 76.8784
            },
            {
              "actual": 67.56,
              "predicted": 67.4475
            },
            {
              "actual": 76.32,
              "predicted": 77.039
            },
            {
              "actual": 60.37,
              "predicted": 76.0239
            },
            {
              "actual": 65.09,
              "predicted": 64.1547
            },
            {
              "actual": 83.7,
              "predicted": 81.5604
            },
            {
              "actual": 81.1,
              "predicted": 78.8049
            },
            {
              "actual": 99.99,
              "predicted": 95.789
            },
            {
              "actual": 68.2,
              "predicted": 70.169
            },
            {
              "actual": 93.83,
              "predicted": 90.9679
            },
            {
              "actual": 80.93,
              "predicted": 82.1266
            },
            {
              "actual": 77.09,
              "predicted": 76.2369
            },
            {
              "actual": 71.13,
              "predicted": 72.0459
            },
            {
              "actual": 70.48,
              "predicted": 70.9781
            },
            {
              "actual": 74.88,
              "predicted": 73.2692
            },
            {
              "actual": 73.04,
              "predicted": 73.5287
            },
            {
              "actual": 75.37,
              "predicted": 67.8121
            },
            {
              "actual": 83.36,
              "predicted": 83.8193
            },
            {
              "actual": 80.31,
              "predicted": 81.4784
            },
            {
              "actual": 53.95,
              "predicted": 57.3884
            },
            {
              "actual": 66.99,
              "predicted": 78.1523
            },
            {
              "actual": 82.55,
              "predicted": 82.8446
            },
            {
              "actual": 83.69,
              "predicted": 81.4702
            },
            {
              "actual": 84.77,
              "predicted": 85.0581
            },
            {
              "actual": 78.01,
              "predicted": 77.1686
            },
            {
              "actual": 86.79,
              "predicted": 85.8049
            },
            {
              "actual": 70.43,
              "predicted": 70.1274
            },
            {
              "actual": 82.25,
              "predicted": 81.414
            },
            {
              "actual": 83.29,
              "predicted": 82.3105
            },
            {
              "actual": 92.63,
              "predicted": 75.0267
            },
            {
              "actual": 79.61,
              "predicted": 79.8563
            },
            {
              "actual": 62.5,
              "predicted": 62.6733
            },
            {
              "actual": 62.7,
              "predicted": 65.2999
            },
            {
              "actual": 78.55,
              "predicted": 77.6059
            },
            {
              "actual": 89.51,
              "predicted": 89.0652
            },
            {
              "actual": 91.05,
              "predicted": 89.8206
            },
            {
              "actual": 69.81,
              "predicted": 68.3105
            },
            {
              "actual": 91.51,
              "predicted": 91.8531
            },
            {
              "actual": 95.02,
              "predicted": 69.129
            },
            {
              "actual": 83.47,
              "predicted": 82.5696
            },
            {
              "actual": 60.97,
              "predicted": 61.6974
            },
            {
              "actual": 82.96,
              "predicted": 81.776
            },
            {
              "actual": 81.58,
              "predicted": 80.7899
            },
            {
              "actual": 77.37,
              "predicted": 76.0735
            },
            {
              "actual": 59.28,
              "predicted": 59.7752
            },
            {
              "actual": 64.88,
              "predicted": 67.2312
            },
            {
              "actual": 69.68,
              "predicted": 69.1961
            },
            {
              "actual": 77.75,
              "predicted": 77.0009
            },
            {
              "actual": 73.11,
              "predicted": 73.7026
            },
            {
              "actual": 61.25,
              "predicted": 60.6179
            },
            {
              "actual": 87.69,
              "predicted": 87.4956
            },
            {
              "actual": 70.94,
              "predicted": 70.217
            },
            {
              "actual": 89.65,
              "predicted": 90.7405
            },
            {
              "actual": 64.28,
              "predicted": 63.5064
            },
            {
              "actual": 76.16,
              "predicted": 75.6399
            },
            {
              "actual": 77.79,
              "predicted": 77.586
            },
            {
              "actual": 85.36,
              "predicted": 85.5223
            },
            {
              "actual": 68.63,
              "predicted": 68.3074
            },
            {
              "actual": 74.63,
              "predicted": 74.537
            },
            {
              "actual": 75.45,
              "predicted": 75.4909
            },
            {
              "actual": 69.31,
              "predicted": 69.4647
            },
            {
              "actual": 79.53,
              "predicted": 79.7265
            },
            {
              "actual": 74.14,
              "predicted": 74.181
            },
            {
              "actual": 65.34,
              "predicted": 68.1256
            },
            {
              "actual": 81.8,
              "predicted": 82.3161
            },
            {
              "actual": 95.0,
              "predicted": 94.7254
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
      "source": "teste/decision_tree.ipynb",
      "artifact": "teste/artifacts/models/decision_tree.joblib",
      "split": {
        "test_size": 0.2,
        "random_state": 42,
        "train_rows": 1600,
        "test_rows": 400,
        "shared_indices": true
      },
      "metrics": {
        "selected": {
          "train": {
            "mae": 2.1252,
            "mse": 17.0127,
            "rmse": 4.1246,
            "r2": 0.8292,
            "explained_variance": 0.8292,
            "median_absolute_error": 1.2225,
            "max_error": 29.5833
          },
          "test": {
            "mae": 2.5648,
            "mse": 26.9413,
            "rmse": 5.1905,
            "r2": 0.7214,
            "explained_variance": 0.722,
            "median_absolute_error": 1.4083,
            "max_error": 35.8
          }
        },
        "baseline": {
          "train": {
            "mae": 3.1106,
            "mse": 23.8625,
            "rmse": 4.8849,
            "r2": 0.7604,
            "explained_variance": 0.7604,
            "median_absolute_error": 2.0909,
            "max_error": 31.0338
          },
          "test": {
            "mae": 3.1425,
            "mse": 27.2848,
            "rmse": 5.2235,
            "r2": 0.7178,
            "explained_variance": 0.7179,
            "median_absolute_error": 2.0909,
            "max_error": 29.0905
          }
        },
        "best_params": {
          "max_depth": 10,
          "min_samples_leaf": 10,
          "min_samples_split": 2
        }
      },
      "plots": {
        "test_actual_vs_predicted": {
          "points": [
            {
              "actual": 76.0,
              "predicted": 74.8333
            },
            {
              "actual": 72.0,
              "predicted": 69.2
            },
            {
              "actual": 76.0,
              "predicted": 73.3846
            },
            {
              "actual": 86.0,
              "predicted": 84.8
            },
            {
              "actual": 75.0,
              "predicted": 74.5
            },
            {
              "actual": 72.0,
              "predicted": 73.1875
            },
            {
              "actual": 84.0,
              "predicted": 79.3529
            },
            {
              "actual": 71.0,
              "predicted": 69.0
            },
            {
              "actual": 79.0,
              "predicted": 79.9
            },
            {
              "actual": 85.0,
              "predicted": 87.3929
            },
            {
              "actual": 85.0,
              "predicted": 71.1
            },
            {
              "actual": 80.0,
              "predicted": 84.8
            },
            {
              "actual": 83.0,
              "predicted": 83.0
            },
            {
              "actual": 88.0,
              "predicted": 88.5714
            },
            {
              "actual": 71.0,
              "predicted": 68.1304
            },
            {
              "actual": 90.0,
              "predicted": 90.7273
            },
            {
              "actual": 73.0,
              "predicted": 71.4211
            },
            {
              "actual": 89.0,
              "predicted": 78.2857
            },
            {
              "actual": 65.0,
              "predicted": 64.0
            },
            {
              "actual": 68.0,
              "predicted": 68.0909
            },
            {
              "actual": 71.0,
              "predicted": 71.7188
            },
            {
              "actual": 76.0,
              "predicted": 74.5
            },
            {
              "actual": 87.0,
              "predicted": 87.1667
            },
            {
              "actual": 70.0,
              "predicted": 68.1304
            },
            {
              "actual": 80.0,
              "predicted": 79.25
            },
            {
              "actual": 92.0,
              "predicted": 74.6875
            },
            {
              "actual": 75.0,
              "predicted": 75.9
            },
            {
              "actual": 78.0,
              "predicted": 77.3571
            },
            {
              "actual": 70.0,
              "predicted": 71.4211
            },
            {
              "actual": 69.0,
              "predicted": 78.2857
            },
            {
              "actual": 73.0,
              "predicted": 73.4375
            },
            {
              "actual": 75.0,
              "predicted": 76.6154
            },
            {
              "actual": 92.0,
              "predicted": 90.7273
            },
            {
              "actual": 77.0,
              "predicted": 76.7
            },
            {
              "actual": 73.0,
              "predicted": 71.7895
            },
            {
              "actual": 72.0,
              "predicted": 73.1667
            },
            {
              "actual": 86.0,
              "predicted": 85.2
            },
            {
              "actual": 64.0,
              "predicted": 61.9091
            },
            {
              "actual": 58.0,
              "predicted": 57.7
            },
            {
              "actual": 71.0,
              "predicted": 71.4211
            },
            {
              "actual": 75.0,
              "predicted": 59.2
            },
            {
              "actual": 68.0,
              "predicted": 68.0909
            },
            {
              "actual": 92.0,
              "predicted": 93.6667
            },
            {
              "actual": 87.0,
              "predicted": 88.5714
            },
            {
              "actual": 60.0,
              "predicted": 61.9091
            },
            {
              "actual": 83.0,
              "predicted": 80.3333
            },
            {
              "actual": 83.0,
              "predicted": 82.3846
            },
            {
              "actual": 69.0,
              "predicted": 71.7188
            },
            {
              "actual": 87.0,
              "predicted": 79.9
            },
            {
              "actual": 81.0,
              "predicted": 77.7333
            },
            {
              "actual": 85.0,
              "predicted": 87.1667
            },
            {
              "actual": 72.0,
              "predicted": 72.6667
            },
            {
              "actual": 64.0,
              "predicted": 64.2308
            },
            {
              "actual": 72.0,
              "predicted": 72.0
            },
            {
              "actual": 75.0,
              "predicted": 71.7895
            },
            {
              "actual": 83.0,
              "predicted": 81.3
            },
            {
              "actual": 70.0,
              "predicted": 72.0
            },
            {
              "actual": 73.0,
              "predicted": 71.7895
            },
            {
              "actual": 89.0,
              "predicted": 87.3929
            },
            {
              "actual": 86.0,
              "predicted": 86.2727
            },
            {
              "actual": 67.0,
              "predicted": 65.3
            },
            {
              "actual": 77.0,
              "predicted": 76.5
            },
            {
              "actual": 62.0,
              "predicted": 61.9091
            },
            {
              "actual": 80.0,
              "predicted": 83.0625
            },
            {
              "actual": 73.0,
              "predicted": 73.1875
            },
            {
              "actual": 72.0,
              "predicted": 74.5
            },
            {
              "actual": 80.0,
              "predicted": 81.875
            },
            {
              "actual": 84.0,
              "predicted": 84.0
            },
            {
              "actual": 94.0,
              "predicted": 63.3
            },
            {
              "actual": 83.0,
              "predicted": 83.0
            },
            {
              "actual": 80.0,
              "predicted": 77.7333
            },
            {
              "actual": 75.0,
              "predicted": 71.7895
            },
            {
              "actual": 83.0,
              "predicted": 82.3846
            },
            {
              "actual": 72.0,
              "predicted": 70.3462
            },
            {
              "actual": 68.0,
              "predicted": 70.2
            },
            {
              "actual": 62.0,
              "predicted": 63.3
            },
            {
              "actual": 75.0,
              "predicted": 71.7188
            },
            {
              "actual": 78.0,
              "predicted": 76.7
            },
            {
              "actual": 55.0,
              "predicted": 53.5833
            },
            {
              "actual": 87.0,
              "predicted": 87.3929
            },
            {
              "actual": 66.0,
              "predicted": 71.1
            },
            {
              "actual": 77.0,
              "predicted": 76.4167
            },
            {
              "actual": 89.0,
              "predicted": 92.6
            },
            {
              "actual": 57.0,
              "predicted": 55.9091
            },
            {
              "actual": 83.0,
              "predicted": 82.6
            },
            {
              "actual": 79.0,
              "predicted": 80.6786
            },
            {
              "actual": 78.0,
              "predicted": 77.7333
            },
            {
              "actual": 66.0,
              "predicted": 70.2
            },
            {
              "actual": 70.0,
              "predicted": 70.3462
            },
            {
              "actual": 61.0,
              "predicted": 62.5833
            },
            {
              "actual": 84.0,
              "predicted": 84.8
            },
            {
              "actual": 71.0,
              "predicted": 70.2
            },
            {
              "actual": 75.0,
              "predicted": 73.1667
            },
            {
              "actual": 74.0,
              "predicted": 75.8571
            },
            {
              "actual": 74.0,
              "predicted": 74.5294
            },
            {
              "actual": 74.0,
              "predicted": 72.6667
            },
            {
              "actual": 83.0,
              "predicted": 83.0
            },
            {
              "actual": 82.0,
              "predicted": 84.3125
            },
            {
              "actual": 79.0,
              "predicted": 77.7333
            },
            {
              "actual": 50.0,
              "predicted": 53.5833
            },
            {
              "actual": 85.0,
              "predicted": 87.8
            },
            {
              "actual": 66.0,
              "predicted": 68.1304
            },
            {
              "actual": 79.0,
              "predicted": 81.3
            },
            {
              "actual": 72.0,
              "predicted": 73.1667
            },
            {
              "actual": 91.0,
              "predicted": 91.9333
            },
            {
              "actual": 69.0,
              "predicted": 68.0909
            },
            {
              "actual": 85.0,
              "predicted": 88.5714
            },
            {
              "actual": 83.0,
              "predicted": 83.0
            },
            {
              "actual": 75.0,
              "predicted": 75.7
            },
            {
              "actual": 87.0,
              "predicted": 90.25
            },
            {
              "actual": 75.0,
              "predicted": 73.1
            },
            {
              "actual": 64.0,
              "predicted": 64.4167
            },
            {
              "actual": 63.0,
              "predicted": 62.5833
            },
            {
              "actual": 79.0,
              "predicted": 81.875
            },
            {
              "actual": 76.0,
              "predicted": 74.9375
            },
            {
              "actual": 75.0,
              "predicted": 74.8333
            },
            {
              "actual": 77.0,
              "predicted": 78.0
            },
            {
              "actual": 83.0,
              "predicted": 80.6786
            },
            {
              "actual": 84.0,
              "predicted": 81.875
            },
            {
              "actual": 77.0,
              "predicted": 74.0
            },
            {
              "actual": 88.0,
              "predicted": 89.0833
            },
            {
              "actual": 73.0,
              "predicted": 74.5294
            },
            {
              "actual": 72.0,
              "predicted": 75.9
            },
            {
              "actual": 62.0,
              "predicted": 64.2308
            },
            {
              "actual": 79.0,
              "predicted": 81.4706
            },
            {
              "actual": 72.0,
              "predicted": 75.9
            },
            {
              "actual": 86.0,
              "predicted": 87.1667
            },
            {
              "actual": 90.0,
              "predicted": 87.3929
            },
            {
              "actual": 83.0,
              "predicted": 81.875
            },
            {
              "actual": 71.0,
              "predicted": 71.4211
            },
            {
              "actual": 73.0,
              "predicted": 71.7188
            },
            {
              "actual": 88.0,
              "predicted": 90.7273
            },
            {
              "actual": 87.0,
              "predicted": 90.3
            },
            {
              "actual": 69.0,
              "predicted": 68.0909
            },
            {
              "actual": 81.0,
              "predicted": 83.0
            },
            {
              "actual": 87.0,
              "predicted": 89.4
            },
            {
              "actual": 62.0,
              "predicted": 61.9091
            },
            {
              "actual": 81.0,
              "predicted": 81.0
            },
            {
              "actual": 81.0,
              "predicted": 81.875
            },
            {
              "actual": 80.0,
              "predicted": 80.4545
            },
            {
              "actual": 76.0,
              "predicted": 76.1333
            },
            {
              "actual": 77.0,
              "predicted": 79.3529
            },
            {
              "actual": 66.0,
              "predicted": 64.4167
            },
            {
              "actual": 84.0,
              "predicted": 83.0
            },
            {
              "actual": 68.0,
              "predicted": 68.0909
            },
            {
              "actual": 73.0,
              "predicted": 70.3462
            },
            {
              "actual": 70.0,
              "predicted": 65.6364
            },
            {
              "actual": 62.0,
              "predicted": 64.0
            },
            {
              "actual": 87.0,
              "predicted": 88.5714
            },
            {
              "actual": 52.0,
              "predicted": 72.7273
            },
            {
              "actual": 85.0,
              "predicted": 81.875
            },
            {
              "actual": 90.0,
              "predicted": 90.25
            },
            {
              "actual": 86.0,
              "predicted": 85.6
            },
            {
              "actual": 82.0,
              "predicted": 81.4706
            },
            {
              "actual": 65.0,
              "predicted": 68.0909
            },
            {
              "actual": 77.0,
              "predicted": 75.6364
            },
            {
              "actual": 70.0,
              "predicted": 68.1304
            },
            {
              "actual": 62.0,
              "predicted": 64.0
            },
            {
              "actual": 87.0,
              "predicted": 88.5714
            },
            {
              "actual": 78.0,
              "predicted": 74.8333
            },
            {
              "actual": 63.0,
              "predicted": 59.2727
            },
            {
              "actual": 73.0,
              "predicted": 71.7188
            },
            {
              "actual": 87.0,
              "predicted": 74.6875
            },
            {
              "actual": 89.0,
              "predicted": 89.4
            },
            {
              "actual": 72.0,
              "predicted": 71.7895
            },
            {
              "actual": 91.0,
              "predicted": 91.9333
            },
            {
              "actual": 79.0,
              "predicted": 83.0
            },
            {
              "actual": 76.0,
              "predicted": 73.4375
            },
            {
              "actual": 66.0,
              "predicted": 66.5357
            },
            {
              "actual": 81.0,
              "predicted": 81.3
            },
            {
              "actual": 84.0,
              "predicted": 83.0
            },
            {
              "actual": 81.0,
              "predicted": 78.75
            },
            {
              "actual": 75.0,
              "predicted": 76.4167
            },
            {
              "actual": 76.0,
              "predicted": 76.5
            },
            {
              "actual": 79.0,
              "predicted": 82.6
            },
            {
              "actual": 63.0,
              "predicted": 64.0
            },
            {
              "actual": 68.0,
              "predicted": 68.1304
            },
            {
              "actual": 73.0,
              "predicted": 71.7895
            },
            {
              "actual": 77.0,
              "predicted": 78.7273
            },
            {
              "actual": 69.0,
              "predicted": 67.7
            },
            {
              "actual": 61.0,
              "predicted": 61.9091
            },
            {
              "actual": 78.0,
              "predicted": 74.8333
            },
            {
              "actual": 89.0,
              "predicted": 87.3929
            },
            {
              "actual": 77.0,
              "predicted": 76.5
            },
            {
              "actual": 58.0,
              "predicted": 57.7
            },
            {
              "actual": 63.0,
              "predicted": 62.5833
            },
            {
              "actual": 63.0,
              "predicted": 64.2308
            },
            {
              "actual": 55.0,
              "predicted": 57.7
            },
            {
              "actual": 64.0,
              "predicted": 64.8824
            },
            {
              "actual": 76.0,
              "predicted": 78.7273
            },
            {
              "actual": 74.0,
              "predicted": 74.5294
            },
            {
              "actual": 85.0,
              "predicted": 88.5714
            },
            {
              "actual": 71.0,
              "predicted": 67.7
            },
            {
              "actual": 81.0,
              "predicted": 79.3529
            },
            {
              "actual": 83.0,
              "predicted": 80.5833
            },
            {
              "actual": 67.0,
              "predicted": 64.0
            },
            {
              "actual": 79.0,
              "predicted": 78.7273
            },
            {
              "actual": 92.0,
              "predicted": 92.6
            },
            {
              "actual": 77.0,
              "predicted": 75.8571
            },
            {
              "actual": 85.0,
              "predicted": 87.3929
            },
            {
              "actual": 76.0,
              "predicted": 76.6154
            },
            {
              "actual": 85.0,
              "predicted": 84.3125
            },
            {
              "actual": 85.0,
              "predicted": 63.0
            },
            {
              "actual": 53.0,
              "predicted": 53.5833
            },
            {
              "actual": 79.0,
              "predicted": 81.4706
            },
            {
              "actual": 65.0,
              "predicted": 68.1304
            },
            {
              "actual": 78.0,
              "predicted": 77.7333
            },
            {
              "actual": 62.0,
              "predicted": 60.9286
            },
            {
              "actual": 77.0,
              "predicted": 80.4545
            },
            {
              "actual": 91.0,
              "predicted": 59.2
            },
            {
              "actual": 92.0,
              "predicted": 90.7273
            },
            {
              "actual": 83.0,
              "predicted": 79.9
            },
            {
              "actual": 76.0,
              "predicted": 75.8571
            },
            {
              "actual": 65.0,
              "predicted": 81.875
            },
            {
              "actual": 86.0,
              "predicted": 86.2727
            },
            {
              "actual": 91.0,
              "predicted": 89.4
            },
            {
              "actual": 83.0,
              "predicted": 85.6842
            },
            {
              "actual": 78.0,
              "predicted": 76.1333
            },
            {
              "actual": 87.0,
              "predicted": 87.1667
            },
            {
              "actual": 86.0,
              "predicted": 83.0
            },
            {
              "actual": 89.0,
              "predicted": 87.3929
            },
            {
              "actual": 95.0,
              "predicted": 81.5455
            },
            {
              "actual": 82.0,
              "predicted": 82.6
            },
            {
              "actual": 84.0,
              "predicted": 84.0
            },
            {
              "actual": 86.0,
              "predicted": 87.3929
            },
            {
              "actual": 72.0,
              "predicted": 70.9
            },
            {
              "actual": 75.0,
              "predicted": 75.7
            },
            {
              "actual": 70.0,
              "predicted": 66.9
            },
            {
              "actual": 55.0,
              "predicted": 53.5833
            },
            {
              "actual": 72.0,
              "predicted": 73.4375
            },
            {
              "actual": 82.0,
              "predicted": 83.0
            },
            {
              "actual": 90.0,
              "predicted": 87.2
            },
            {
              "actual": 64.0,
              "predicted": 64.8824
            },
            {
              "actual": 88.0,
              "predicted": 87.3929
            },
            {
              "actual": 87.0,
              "predicted": 86.2727
            },
            {
              "actual": 80.0,
              "predicted": 78.75
            },
            {
              "actual": 71.0,
              "predicted": 71.7188
            },
            {
              "actual": 86.0,
              "predicted": 85.2
            },
            {
              "actual": 74.0,
              "predicted": 73.1667
            },
            {
              "actual": 78.0,
              "predicted": 79.25
            },
            {
              "actual": 79.0,
              "predicted": 81.4706
            },
            {
              "actual": 73.0,
              "predicted": 74.5294
            },
            {
              "actual": 91.0,
              "predicted": 88.5714
            },
            {
              "actual": 89.0,
              "predicted": 89.0833
            },
            {
              "actual": 86.0,
              "predicted": 87.3929
            },
            {
              "actual": 69.0,
              "predicted": 72.7273
            },
            {
              "actual": 92.0,
              "predicted": 91.9333
            },
            {
              "actual": 72.0,
              "predicted": 68.0909
            },
            {
              "actual": 83.0,
              "predicted": 82.3846
            },
            {
              "actual": 62.0,
              "predicted": 60.2143
            },
            {
              "actual": 74.0,
              "predicted": 71.7895
            },
            {
              "actual": 74.0,
              "predicted": 75.9
            },
            {
              "actual": 71.0,
              "predicted": 73.1
            },
            {
              "actual": 80.0,
              "predicted": 76.1333
            },
            {
              "actual": 70.0,
              "predicted": 69.2
            },
            {
              "actual": 85.0,
              "predicted": 86.0
            },
            {
              "actual": 84.0,
              "predicted": 83.0
            },
            {
              "actual": 75.0,
              "predicted": 70.3462
            },
            {
              "actual": 68.0,
              "predicted": 67.7
            },
            {
              "actual": 65.0,
              "predicted": 68.1304
            },
            {
              "actual": 55.0,
              "predicted": 72.6111
            },
            {
              "actual": 68.0,
              "predicted": 68.0909
            },
            {
              "actual": 90.0,
              "predicted": 76.5
            },
            {
              "actual": 75.0,
              "predicted": 73.1875
            },
            {
              "actual": 77.0,
              "predicted": 78.7273
            },
            {
              "actual": 90.0,
              "predicted": 89.4
            },
            {
              "actual": 81.0,
              "predicted": 80.6786
            },
            {
              "actual": 98.0,
              "predicted": 80.5833
            },
            {
              "actual": 77.0,
              "predicted": 79.6
            },
            {
              "actual": 60.0,
              "predicted": 61.9091
            },
            {
              "actual": 63.0,
              "predicted": 68.1304
            },
            {
              "actual": 54.0,
              "predicted": 55.9091
            },
            {
              "actual": 80.0,
              "predicted": 81.3
            },
            {
              "actual": 77.0,
              "predicted": 77.7333
            },
            {
              "actual": 65.0,
              "predicted": 64.8
            },
            {
              "actual": 60.0,
              "predicted": 61.9091
            },
            {
              "actual": 91.0,
              "predicted": 90.25
            },
            {
              "actual": 67.0,
              "predicted": 70.2
            },
            {
              "actual": 93.0,
              "predicted": 89.3636
            },
            {
              "actual": 76.0,
              "predicted": 75.6364
            },
            {
              "actual": 62.0,
              "predicted": 57.7
            },
            {
              "actual": 81.0,
              "predicted": 81.3
            },
            {
              "actual": 66.0,
              "predicted": 64.8824
            },
            {
              "actual": 62.0,
              "predicted": 60.9286
            },
            {
              "actual": 52.0,
              "predicted": 53.5833
            },
            {
              "actual": 93.0,
              "predicted": 72.6111
            },
            {
              "actual": 73.0,
              "predicted": 73.4375
            },
            {
              "actual": 84.0,
              "predicted": 85.6842
            },
            {
              "actual": 82.0,
              "predicted": 80.5833
            },
            {
              "actual": 51.0,
              "predicted": 74.9375
            },
            {
              "actual": 79.0,
              "predicted": 79.25
            },
            {
              "actual": 64.0,
              "predicted": 68.1304
            },
            {
              "actual": 83.0,
              "predicted": 83.0
            },
            {
              "actual": 57.0,
              "predicted": 59.6667
            },
            {
              "actual": 85.0,
              "predicted": 88.5714
            },
            {
              "actual": 67.0,
              "predicted": 68.0909
            },
            {
              "actual": 86.0,
              "predicted": 79.9
            },
            {
              "actual": 63.0,
              "predicted": 60.9286
            },
            {
              "actual": 82.0,
              "predicted": 81.4706
            },
            {
              "actual": 73.0,
              "predicted": 73.1667
            },
            {
              "actual": 78.0,
              "predicted": 76.7
            },
            {
              "actual": 75.0,
              "predicted": 82.3846
            },
            {
              "actual": 71.0,
              "predicted": 71.4211
            },
            {
              "actual": 94.0,
              "predicted": 92.6
            },
            {
              "actual": 72.0,
              "predicted": 73.4375
            },
            {
              "actual": 67.0,
              "predicted": 68.1304
            },
            {
              "actual": 71.0,
              "predicted": 70.3462
            },
            {
              "actual": 55.0,
              "predicted": 55.9091
            },
            {
              "actual": 57.0,
              "predicted": 55.9091
            },
            {
              "actual": 52.0,
              "predicted": 78.2857
            },
            {
              "actual": 80.0,
              "predicted": 81.2
            },
            {
              "actual": 63.0,
              "predicted": 63.75
            },
            {
              "actual": 80.0,
              "predicted": 80.4545
            },
            {
              "actual": 85.0,
              "predicted": 85.6
            },
            {
              "actual": 70.0,
              "predicted": 71.4211
            },
            {
              "actual": 63.0,
              "predicted": 62.5833
            },
            {
              "actual": 81.0,
              "predicted": 81.4706
            },
            {
              "actual": 81.0,
              "predicted": 81.875
            },
            {
              "actual": 74.0,
              "predicted": 74.5
            },
            {
              "actual": 81.0,
              "predicted": 81.4706
            },
            {
              "actual": 69.0,
              "predicted": 86.0
            },
            {
              "actual": 77.0,
              "predicted": 76.6154
            },
            {
              "actual": 58.0,
              "predicted": 55.9091
            },
            {
              "actual": 73.0,
              "predicted": 74.6667
            },
            {
              "actual": 71.0,
              "predicted": 70.9
            },
            {
              "actual": 94.0,
              "predicted": 95.5
            },
            {
              "actual": 66.0,
              "predicted": 64.4167
            },
            {
              "actual": 65.0,
              "predicted": 64.8824
            },
            {
              "actual": 66.0,
              "predicted": 68.1304
            },
            {
              "actual": 84.0,
              "predicted": 82.3846
            },
            {
              "actual": 67.0,
              "predicted": 65.6364
            },
            {
              "actual": 88.0,
              "predicted": 90.25
            },
            {
              "actual": 73.0,
              "predicted": 75.8571
            },
            {
              "actual": 68.0,
              "predicted": 68.1304
            },
            {
              "actual": 77.0,
              "predicted": 74.9375
            },
            {
              "actual": 67.0,
              "predicted": 68.1304
            },
            {
              "actual": 76.0,
              "predicted": 74.0
            },
            {
              "actual": 60.0,
              "predicted": 80.5833
            },
            {
              "actual": 65.0,
              "predicted": 61.9091
            },
            {
              "actual": 83.0,
              "predicted": 80.6786
            },
            {
              "actual": 81.0,
              "predicted": 77.7333
            },
            {
              "actual": 99.0,
              "predicted": 95.5
            },
            {
              "actual": 68.0,
              "predicted": 70.3462
            },
            {
              "actual": 93.0,
              "predicted": 91.9333
            },
            {
              "actual": 80.0,
              "predicted": 82.6
            },
            {
              "actual": 77.0,
              "predicted": 74.9375
            },
            {
              "actual": 71.0,
              "predicted": 70.3462
            },
            {
              "actual": 70.0,
              "predicted": 67.7
            },
            {
              "actual": 74.0,
              "predicted": 73.1875
            },
            {
              "actual": 73.0,
              "predicted": 71.7188
            },
            {
              "actual": 75.0,
              "predicted": 80.5833
            },
            {
              "actual": 83.0,
              "predicted": 83.0
            },
            {
              "actual": 80.0,
              "predicted": 83.0
            },
            {
              "actual": 53.0,
              "predicted": 55.9091
            },
            {
              "actual": 66.0,
              "predicted": 74.6875
            },
            {
              "actual": 82.0,
              "predicted": 81.3
            },
            {
              "actual": 83.0,
              "predicted": 80.6786
            },
            {
              "actual": 84.0,
              "predicted": 83.0
            },
            {
              "actual": 78.0,
              "predicted": 78.0
            },
            {
              "actual": 86.0,
              "predicted": 86.0
            },
            {
              "actual": 70.0,
              "predicted": 70.2
            },
            {
              "actual": 82.0,
              "predicted": 80.3333
            },
            {
              "actual": 83.0,
              "predicted": 81.6429
            },
            {
              "actual": 92.0,
              "predicted": 74.8333
            },
            {
              "actual": 79.0,
              "predicted": 81.0
            },
            {
              "actual": 62.0,
              "predicted": 63.75
            },
            {
              "actual": 62.0,
              "predicted": 64.0
            },
            {
              "actual": 78.0,
              "predicted": 76.6154
            },
            {
              "actual": 89.0,
              "predicted": 89.0833
            },
            {
              "actual": 91.0,
              "predicted": 90.25
            },
            {
              "actual": 69.0,
              "predicted": 68.1304
            },
            {
              "actual": 91.0,
              "predicted": 91.9333
            },
            {
              "actual": 95.0,
              "predicted": 59.2
            },
            {
              "actual": 83.0,
              "predicted": 81.3
            },
            {
              "actual": 60.0,
              "predicted": 59.6667
            },
            {
              "actual": 82.0,
              "predicted": 81.2
            },
            {
              "actual": 81.0,
              "predicted": 78.75
            },
            {
              "actual": 77.0,
              "predicted": 71.7188
            },
            {
              "actual": 59.0,
              "predicted": 55.9091
            },
            {
              "actual": 64.0,
              "predicted": 65.6364
            },
            {
              "actual": 69.0,
              "predicted": 68.1304
            },
            {
              "actual": 77.0,
              "predicted": 75.7
            },
            {
              "actual": 73.0,
              "predicted": 72.6667
            },
            {
              "actual": 61.0,
              "predicted": 62.5833
            },
            {
              "actual": 87.0,
              "predicted": 86.0
            },
            {
              "actual": 70.0,
              "predicted": 71.4211
            },
            {
              "actual": 89.0,
              "predicted": 90.3
            },
            {
              "actual": 64.0,
              "predicted": 63.3
            },
            {
              "actual": 76.0,
              "predicted": 74.0
            },
            {
              "actual": 77.0,
              "predicted": 76.1333
            },
            {
              "actual": 85.0,
              "predicted": 85.6
            },
            {
              "actual": 68.0,
              "predicted": 68.1304
            },
            {
              "actual": 74.0,
              "predicted": 76.4167
            },
            {
              "actual": 75.0,
              "predicted": 76.5
            },
            {
              "actual": 69.0,
              "predicted": 67.7
            },
            {
              "actual": 79.0,
              "predicted": 79.25
            },
            {
              "actual": 74.0,
              "predicted": 74.5294
            },
            {
              "actual": 65.0,
              "predicted": 66.5357
            },
            {
              "actual": 81.0,
              "predicted": 81.875
            },
            {
              "actual": 95.0,
              "predicted": 91.9333
            }
          ],
          "min": 50.0,
          "max": 99.0
        },
        "baseline_test_actual_vs_predicted": {
          "points": [
            {
              "actual": 76.0,
              "predicted": 80.7
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 76.0,
              "predicted": 72.6341
            },
            {
              "actual": 86.0,
              "predicted": 83.2523
            },
            {
              "actual": 75.0,
              "predicted": 72.6341
            },
            {
              "actual": 72.0,
              "predicted": 75.9091
            },
            {
              "actual": 84.0,
              "predicted": 80.7
            },
            {
              "actual": 71.0,
              "predicted": 67.9662
            },
            {
              "actual": 79.0,
              "predicted": 79.9
            },
            {
              "actual": 85.0,
              "predicted": 89.934
            },
            {
              "actual": 85.0,
              "predicted": 76.439
            },
            {
              "actual": 80.0,
              "predicted": 83.2523
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 88.0,
              "predicted": 89.934
            },
            {
              "actual": 71.0,
              "predicted": 64.9095
            },
            {
              "actual": 90.0,
              "predicted": 89.934
            },
            {
              "actual": 73.0,
              "predicted": 67.9662
            },
            {
              "actual": 89.0,
              "predicted": 78.2857
            },
            {
              "actual": 65.0,
              "predicted": 64.9095
            },
            {
              "actual": 68.0,
              "predicted": 67.9662
            },
            {
              "actual": 71.0,
              "predicted": 72.6341
            },
            {
              "actual": 76.0,
              "predicted": 72.6341
            },
            {
              "actual": 87.0,
              "predicted": 83.2523
            },
            {
              "actual": 70.0,
              "predicted": 64.9095
            },
            {
              "actual": 80.0,
              "predicted": 83.2523
            },
            {
              "actual": 92.0,
              "predicted": 74.6875
            },
            {
              "actual": 75.0,
              "predicted": 72.6341
            },
            {
              "actual": 78.0,
              "predicted": 76.439
            },
            {
              "actual": 70.0,
              "predicted": 67.9662
            },
            {
              "actual": 69.0,
              "predicted": 78.2857
            },
            {
              "actual": 73.0,
              "predicted": 75.9091
            },
            {
              "actual": 75.0,
              "predicted": 80.7
            },
            {
              "actual": 92.0,
              "predicted": 89.934
            },
            {
              "actual": 77.0,
              "predicted": 76.439
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 86.0,
              "predicted": 83.2523
            },
            {
              "actual": 64.0,
              "predicted": 64.9095
            },
            {
              "actual": 58.0,
              "predicted": 58.2892
            },
            {
              "actual": 71.0,
              "predicted": 67.9662
            },
            {
              "actual": 75.0,
              "predicted": 67.9662
            },
            {
              "actual": 68.0,
              "predicted": 67.9662
            },
            {
              "actual": 92.0,
              "predicted": 89.934
            },
            {
              "actual": 87.0,
              "predicted": 89.934
            },
            {
              "actual": 60.0,
              "predicted": 64.9095
            },
            {
              "actual": 83.0,
              "predicted": 80.7
            },
            {
              "actual": 83.0,
              "predicted": 80.7
            },
            {
              "actual": 69.0,
              "predicted": 72.6341
            },
            {
              "actual": 87.0,
              "predicted": 79.9
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 85.0,
              "predicted": 83.2523
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 64.0,
              "predicted": 64.9095
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 75.0,
              "predicted": 72.6341
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 70.0,
              "predicted": 72.6341
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 89.0,
              "predicted": 89.934
            },
            {
              "actual": 86.0,
              "predicted": 83.2523
            },
            {
              "actual": 67.0,
              "predicted": 67.9662
            },
            {
              "actual": 77.0,
              "predicted": 75.9091
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 80.0,
              "predicted": 83.2523
            },
            {
              "actual": 73.0,
              "predicted": 75.9091
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 80.0,
              "predicted": 80.7
            },
            {
              "actual": 84.0,
              "predicted": 83.2523
            },
            {
              "actual": 94.0,
              "predicted": 64.9095
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 80.0,
              "predicted": 80.7
            },
            {
              "actual": 75.0,
              "predicted": 72.6341
            },
            {
              "actual": 83.0,
              "predicted": 80.7
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 68.0,
              "predicted": 67.9662
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 75.0,
              "predicted": 72.6341
            },
            {
              "actual": 78.0,
              "predicted": 76.439
            },
            {
              "actual": 55.0,
              "predicted": 58.2892
            },
            {
              "actual": 87.0,
              "predicted": 89.934
            },
            {
              "actual": 66.0,
              "predicted": 76.439
            },
            {
              "actual": 77.0,
              "predicted": 72.6341
            },
            {
              "actual": 89.0,
              "predicted": 89.934
            },
            {
              "actual": 57.0,
              "predicted": 58.2892
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 79.0,
              "predicted": 83.2523
            },
            {
              "actual": 78.0,
              "predicted": 80.7
            },
            {
              "actual": 66.0,
              "predicted": 67.9662
            },
            {
              "actual": 70.0,
              "predicted": 72.6341
            },
            {
              "actual": 61.0,
              "predicted": 58.2892
            },
            {
              "actual": 84.0,
              "predicted": 83.2523
            },
            {
              "actual": 71.0,
              "predicted": 67.9662
            },
            {
              "actual": 75.0,
              "predicted": 72.6341
            },
            {
              "actual": 74.0,
              "predicted": 75.9091
            },
            {
              "actual": 74.0,
              "predicted": 72.6341
            },
            {
              "actual": 74.0,
              "predicted": 72.6341
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 82.0,
              "predicted": 80.7
            },
            {
              "actual": 79.0,
              "predicted": 80.7
            },
            {
              "actual": 50.0,
              "predicted": 58.2892
            },
            {
              "actual": 85.0,
              "predicted": 83.2523
            },
            {
              "actual": 66.0,
              "predicted": 64.9095
            },
            {
              "actual": 79.0,
              "predicted": 83.2523
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 91.0,
              "predicted": 89.934
            },
            {
              "actual": 69.0,
              "predicted": 67.9662
            },
            {
              "actual": 85.0,
              "predicted": 89.934
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 75.0,
              "predicted": 76.439
            },
            {
              "actual": 87.0,
              "predicted": 89.934
            },
            {
              "actual": 75.0,
              "predicted": 72.6341
            },
            {
              "actual": 64.0,
              "predicted": 64.9095
            },
            {
              "actual": 63.0,
              "predicted": 58.2892
            },
            {
              "actual": 79.0,
              "predicted": 80.7
            },
            {
              "actual": 76.0,
              "predicted": 76.439
            },
            {
              "actual": 75.0,
              "predicted": 80.7
            },
            {
              "actual": 77.0,
              "predicted": 75.9091
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 84.0,
              "predicted": 80.7
            },
            {
              "actual": 77.0,
              "predicted": 72.6341
            },
            {
              "actual": 88.0,
              "predicted": 89.934
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 79.0,
              "predicted": 80.7
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 86.0,
              "predicted": 83.2523
            },
            {
              "actual": 90.0,
              "predicted": 89.934
            },
            {
              "actual": 83.0,
              "predicted": 80.7
            },
            {
              "actual": 71.0,
              "predicted": 67.9662
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 88.0,
              "predicted": 89.934
            },
            {
              "actual": 87.0,
              "predicted": 89.934
            },
            {
              "actual": 69.0,
              "predicted": 67.9662
            },
            {
              "actual": 81.0,
              "predicted": 83.2523
            },
            {
              "actual": 87.0,
              "predicted": 89.934
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 80.0,
              "predicted": 76.439
            },
            {
              "actual": 76.0,
              "predicted": 75.9091
            },
            {
              "actual": 77.0,
              "predicted": 80.7
            },
            {
              "actual": 66.0,
              "predicted": 64.9095
            },
            {
              "actual": 84.0,
              "predicted": 83.2523
            },
            {
              "actual": 68.0,
              "predicted": 67.9662
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 70.0,
              "predicted": 64.9095
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 87.0,
              "predicted": 89.934
            },
            {
              "actual": 52.0,
              "predicted": 72.7273
            },
            {
              "actual": 85.0,
              "predicted": 80.7
            },
            {
              "actual": 90.0,
              "predicted": 89.934
            },
            {
              "actual": 86.0,
              "predicted": 83.2523
            },
            {
              "actual": 82.0,
              "predicted": 80.7
            },
            {
              "actual": 65.0,
              "predicted": 67.9662
            },
            {
              "actual": 77.0,
              "predicted": 72.6341
            },
            {
              "actual": 70.0,
              "predicted": 64.9095
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 87.0,
              "predicted": 89.934
            },
            {
              "actual": 78.0,
              "predicted": 80.7
            },
            {
              "actual": 63.0,
              "predicted": 58.2892
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 87.0,
              "predicted": 74.6875
            },
            {
              "actual": 89.0,
              "predicted": 89.934
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 91.0,
              "predicted": 89.934
            },
            {
              "actual": 79.0,
              "predicted": 83.2523
            },
            {
              "actual": 76.0,
              "predicted": 75.9091
            },
            {
              "actual": 66.0,
              "predicted": 67.9662
            },
            {
              "actual": 81.0,
              "predicted": 83.2523
            },
            {
              "actual": 84.0,
              "predicted": 83.2523
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 75.0,
              "predicted": 72.6341
            },
            {
              "actual": 76.0,
              "predicted": 75.9091
            },
            {
              "actual": 79.0,
              "predicted": 83.2523
            },
            {
              "actual": 63.0,
              "predicted": 64.9095
            },
            {
              "actual": 68.0,
              "predicted": 64.9095
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 77.0,
              "predicted": 76.439
            },
            {
              "actual": 69.0,
              "predicted": 72.6341
            },
            {
              "actual": 61.0,
              "predicted": 64.9095
            },
            {
              "actual": 78.0,
              "predicted": 80.7
            },
            {
              "actual": 89.0,
              "predicted": 89.934
            },
            {
              "actual": 77.0,
              "predicted": 75.9091
            },
            {
              "actual": 58.0,
              "predicted": 58.2892
            },
            {
              "actual": 63.0,
              "predicted": 58.2892
            },
            {
              "actual": 63.0,
              "predicted": 64.9095
            },
            {
              "actual": 55.0,
              "predicted": 58.2892
            },
            {
              "actual": 64.0,
              "predicted": 64.9095
            },
            {
              "actual": 76.0,
              "predicted": 76.439
            },
            {
              "actual": 74.0,
              "predicted": 72.6341
            },
            {
              "actual": 85.0,
              "predicted": 89.934
            },
            {
              "actual": 71.0,
              "predicted": 72.6341
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 83.0,
              "predicted": 80.5833
            },
            {
              "actual": 67.0,
              "predicted": 64.9095
            },
            {
              "actual": 79.0,
              "predicted": 76.439
            },
            {
              "actual": 92.0,
              "predicted": 89.934
            },
            {
              "actual": 77.0,
              "predicted": 75.9091
            },
            {
              "actual": 85.0,
              "predicted": 89.934
            },
            {
              "actual": 76.0,
              "predicted": 80.7
            },
            {
              "actual": 85.0,
              "predicted": 80.7
            },
            {
              "actual": 85.0,
              "predicted": 63.0
            },
            {
              "actual": 53.0,
              "predicted": 58.2892
            },
            {
              "actual": 79.0,
              "predicted": 80.7
            },
            {
              "actual": 65.0,
              "predicted": 64.9095
            },
            {
              "actual": 78.0,
              "predicted": 80.7
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 77.0,
              "predicted": 76.439
            },
            {
              "actual": 91.0,
              "predicted": 67.9662
            },
            {
              "actual": 92.0,
              "predicted": 89.934
            },
            {
              "actual": 83.0,
              "predicted": 79.9
            },
            {
              "actual": 76.0,
              "predicted": 75.9091
            },
            {
              "actual": 65.0,
              "predicted": 80.7
            },
            {
              "actual": 86.0,
              "predicted": 83.2523
            },
            {
              "actual": 91.0,
              "predicted": 89.934
            },
            {
              "actual": 83.0,
              "predicted": 89.934
            },
            {
              "actual": 78.0,
              "predicted": 75.9091
            },
            {
              "actual": 87.0,
              "predicted": 83.2523
            },
            {
              "actual": 86.0,
              "predicted": 83.2523
            },
            {
              "actual": 89.0,
              "predicted": 89.934
            },
            {
              "actual": 95.0,
              "predicted": 75.9091
            },
            {
              "actual": 82.0,
              "predicted": 83.2523
            },
            {
              "actual": 84.0,
              "predicted": 83.2523
            },
            {
              "actual": 86.0,
              "predicted": 89.934
            },
            {
              "actual": 72.0,
              "predicted": 72.6341
            },
            {
              "actual": 75.0,
              "predicted": 76.439
            },
            {
              "actual": 70.0,
              "predicted": 64.9095
            },
            {
              "actual": 55.0,
              "predicted": 58.2892
            },
            {
              "actual": 72.0,
              "predicted": 75.9091
            },
            {
              "actual": 82.0,
              "predicted": 83.2523
            },
            {
              "actual": 90.0,
              "predicted": 89.934
            },
            {
              "actual": 64.0,
              "predicted": 64.9095
            },
            {
              "actual": 88.0,
              "predicted": 89.934
            },
            {
              "actual": 87.0,
              "predicted": 83.2523
            },
            {
              "actual": 80.0,
              "predicted": 80.7
            },
            {
              "actual": 71.0,
              "predicted": 72.6341
            },
            {
              "actual": 86.0,
              "predicted": 83.2523
            },
            {
              "actual": 74.0,
              "predicted": 72.6341
            },
            {
              "actual": 78.0,
              "predicted": 83.2523
            },
            {
              "actual": 79.0,
              "predicted": 80.7
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 91.0,
              "predicted": 89.934
            },
            {
              "actual": 89.0,
              "predicted": 89.934
            },
            {
              "actual": 86.0,
              "predicted": 89.934
            },
            {
              "actual": 69.0,
              "predicted": 72.7273
            },
            {
              "actual": 92.0,
              "predicted": 89.934
            },
            {
              "actual": 72.0,
              "predicted": 67.9662
            },
            {
              "actual": 83.0,
              "predicted": 80.7
            },
            {
              "actual": 62.0,
              "predicted": 58.2892
            },
            {
              "actual": 74.0,
              "predicted": 72.6341
            },
            {
              "actual": 74.0,
              "predicted": 72.6341
            },
            {
              "actual": 71.0,
              "predicted": 72.6341
            },
            {
              "actual": 80.0,
              "predicted": 75.9091
            },
            {
              "actual": 70.0,
              "predicted": 72.6341
            },
            {
              "actual": 85.0,
              "predicted": 80.7
            },
            {
              "actual": 84.0,
              "predicted": 83.2523
            },
            {
              "actual": 75.0,
              "predicted": 72.6341
            },
            {
              "actual": 68.0,
              "predicted": 72.6341
            },
            {
              "actual": 65.0,
              "predicted": 64.9095
            },
            {
              "actual": 55.0,
              "predicted": 67.9662
            },
            {
              "actual": 68.0,
              "predicted": 67.9662
            },
            {
              "actual": 90.0,
              "predicted": 75.9091
            },
            {
              "actual": 75.0,
              "predicted": 75.9091
            },
            {
              "actual": 77.0,
              "predicted": 76.439
            },
            {
              "actual": 90.0,
              "predicted": 89.934
            },
            {
              "actual": 81.0,
              "predicted": 83.2523
            },
            {
              "actual": 98.0,
              "predicted": 80.5833
            },
            {
              "actual": 77.0,
              "predicted": 83.2523
            },
            {
              "actual": 60.0,
              "predicted": 64.9095
            },
            {
              "actual": 63.0,
              "predicted": 64.9095
            },
            {
              "actual": 54.0,
              "predicted": 58.2892
            },
            {
              "actual": 80.0,
              "predicted": 83.2523
            },
            {
              "actual": 77.0,
              "predicted": 80.7
            },
            {
              "actual": 65.0,
              "predicted": 67.9662
            },
            {
              "actual": 60.0,
              "predicted": 64.9095
            },
            {
              "actual": 91.0,
              "predicted": 89.934
            },
            {
              "actual": 67.0,
              "predicted": 67.9662
            },
            {
              "actual": 93.0,
              "predicted": 89.934
            },
            {
              "actual": 76.0,
              "predicted": 72.6341
            },
            {
              "actual": 62.0,
              "predicted": 58.2892
            },
            {
              "actual": 81.0,
              "predicted": 83.2523
            },
            {
              "actual": 66.0,
              "predicted": 64.9095
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 52.0,
              "predicted": 58.2892
            },
            {
              "actual": 93.0,
              "predicted": 67.9662
            },
            {
              "actual": 73.0,
              "predicted": 75.9091
            },
            {
              "actual": 84.0,
              "predicted": 89.934
            },
            {
              "actual": 82.0,
              "predicted": 80.5833
            },
            {
              "actual": 51.0,
              "predicted": 76.439
            },
            {
              "actual": 79.0,
              "predicted": 83.2523
            },
            {
              "actual": 64.0,
              "predicted": 64.9095
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 57.0,
              "predicted": 64.9095
            },
            {
              "actual": 85.0,
              "predicted": 89.934
            },
            {
              "actual": 67.0,
              "predicted": 67.9662
            },
            {
              "actual": 86.0,
              "predicted": 79.9
            },
            {
              "actual": 63.0,
              "predicted": 64.9095
            },
            {
              "actual": 82.0,
              "predicted": 80.7
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 78.0,
              "predicted": 76.439
            },
            {
              "actual": 75.0,
              "predicted": 80.7
            },
            {
              "actual": 71.0,
              "predicted": 67.9662
            },
            {
              "actual": 94.0,
              "predicted": 89.934
            },
            {
              "actual": 72.0,
              "predicted": 75.9091
            },
            {
              "actual": 67.0,
              "predicted": 64.9095
            },
            {
              "actual": 71.0,
              "predicted": 72.6341
            },
            {
              "actual": 55.0,
              "predicted": 58.2892
            },
            {
              "actual": 57.0,
              "predicted": 58.2892
            },
            {
              "actual": 52.0,
              "predicted": 78.2857
            },
            {
              "actual": 80.0,
              "predicted": 80.7
            },
            {
              "actual": 63.0,
              "predicted": 64.9095
            },
            {
              "actual": 80.0,
              "predicted": 76.439
            },
            {
              "actual": 85.0,
              "predicted": 83.2523
            },
            {
              "actual": 70.0,
              "predicted": 67.9662
            },
            {
              "actual": 63.0,
              "predicted": 58.2892
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 74.0,
              "predicted": 72.6341
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 69.0,
              "predicted": 80.7
            },
            {
              "actual": 77.0,
              "predicted": 80.7
            },
            {
              "actual": 58.0,
              "predicted": 58.2892
            },
            {
              "actual": 73.0,
              "predicted": 75.9091
            },
            {
              "actual": 71.0,
              "predicted": 72.6341
            },
            {
              "actual": 94.0,
              "predicted": 89.934
            },
            {
              "actual": 66.0,
              "predicted": 64.9095
            },
            {
              "actual": 65.0,
              "predicted": 64.9095
            },
            {
              "actual": 66.0,
              "predicted": 64.9095
            },
            {
              "actual": 84.0,
              "predicted": 80.7
            },
            {
              "actual": 67.0,
              "predicted": 64.9095
            },
            {
              "actual": 88.0,
              "predicted": 89.934
            },
            {
              "actual": 73.0,
              "predicted": 75.9091
            },
            {
              "actual": 68.0,
              "predicted": 64.9095
            },
            {
              "actual": 77.0,
              "predicted": 76.439
            },
            {
              "actual": 67.0,
              "predicted": 64.9095
            },
            {
              "actual": 76.0,
              "predicted": 72.6341
            },
            {
              "actual": 60.0,
              "predicted": 80.5833
            },
            {
              "actual": 65.0,
              "predicted": 64.9095
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 99.0,
              "predicted": 89.934
            },
            {
              "actual": 68.0,
              "predicted": 72.6341
            },
            {
              "actual": 93.0,
              "predicted": 89.934
            },
            {
              "actual": 80.0,
              "predicted": 83.2523
            },
            {
              "actual": 77.0,
              "predicted": 76.439
            },
            {
              "actual": 71.0,
              "predicted": 72.6341
            },
            {
              "actual": 70.0,
              "predicted": 72.6341
            },
            {
              "actual": 74.0,
              "predicted": 75.9091
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 75.0,
              "predicted": 80.5833
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 80.0,
              "predicted": 83.2523
            },
            {
              "actual": 53.0,
              "predicted": 58.2892
            },
            {
              "actual": 66.0,
              "predicted": 74.6875
            },
            {
              "actual": 82.0,
              "predicted": 83.2523
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 84.0,
              "predicted": 83.2523
            },
            {
              "actual": 78.0,
              "predicted": 75.9091
            },
            {
              "actual": 86.0,
              "predicted": 80.7
            },
            {
              "actual": 70.0,
              "predicted": 67.9662
            },
            {
              "actual": 82.0,
              "predicted": 80.7
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 92.0,
              "predicted": 80.7
            },
            {
              "actual": 79.0,
              "predicted": 80.7
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 62.0,
              "predicted": 64.9095
            },
            {
              "actual": 78.0,
              "predicted": 80.7
            },
            {
              "actual": 89.0,
              "predicted": 89.934
            },
            {
              "actual": 91.0,
              "predicted": 89.934
            },
            {
              "actual": 69.0,
              "predicted": 64.9095
            },
            {
              "actual": 91.0,
              "predicted": 89.934
            },
            {
              "actual": 95.0,
              "predicted": 67.9662
            },
            {
              "actual": 83.0,
              "predicted": 83.2523
            },
            {
              "actual": 60.0,
              "predicted": 64.9095
            },
            {
              "actual": 82.0,
              "predicted": 80.7
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 77.0,
              "predicted": 72.6341
            },
            {
              "actual": 59.0,
              "predicted": 58.2892
            },
            {
              "actual": 64.0,
              "predicted": 64.9095
            },
            {
              "actual": 69.0,
              "predicted": 64.9095
            },
            {
              "actual": 77.0,
              "predicted": 76.439
            },
            {
              "actual": 73.0,
              "predicted": 72.6341
            },
            {
              "actual": 61.0,
              "predicted": 58.2892
            },
            {
              "actual": 87.0,
              "predicted": 80.7
            },
            {
              "actual": 70.0,
              "predicted": 67.9662
            },
            {
              "actual": 89.0,
              "predicted": 89.934
            },
            {
              "actual": 64.0,
              "predicted": 64.9095
            },
            {
              "actual": 76.0,
              "predicted": 72.6341
            },
            {
              "actual": 77.0,
              "predicted": 75.9091
            },
            {
              "actual": 85.0,
              "predicted": 83.2523
            },
            {
              "actual": 68.0,
              "predicted": 64.9095
            },
            {
              "actual": 74.0,
              "predicted": 72.6341
            },
            {
              "actual": 75.0,
              "predicted": 75.9091
            },
            {
              "actual": 69.0,
              "predicted": 72.6341
            },
            {
              "actual": 79.0,
              "predicted": 83.2523
            },
            {
              "actual": 74.0,
              "predicted": 72.6341
            },
            {
              "actual": 65.0,
              "predicted": 67.9662
            },
            {
              "actual": 81.0,
              "predicted": 80.7
            },
            {
              "actual": 95.0,
              "predicted": 89.934
            }
          ],
          "min": 50.0,
          "max": 99.0
        }
      }
    },
    "neural_network": {
      "key": "neural_network",
      "name": "Artificial Neural Network",
      "task": "regression",
      "source": "teste/neural_network.ipynb",
      "artifact": "teste/artifacts/models/neural_network.joblib",
      "split": {
        "test_size": 0.2,
        "random_state": 42,
        "train_rows": 1600,
        "test_rows": 400,
        "shared_indices": true
      },
      "network": {
        "hidden_layer_sizes": [
          32,
          16
        ],
        "activation": "relu",
        "solver": "adam",
        "loss": 12.1009,
        "n_iter": 221
      },
      "metrics": {
        "selected": {
          "train": {
            "mae": 2.7252,
            "mse": 24.6509,
            "rmse": 4.965,
            "r2": 0.753,
            "explained_variance": 0.7531,
            "median_absolute_error": 1.6027,
            "max_error": 32.4962
          },
          "test": {
            "mae": 2.9411,
            "mse": 32.8576,
            "rmse": 5.7322,
            "r2": 0.6611,
            "explained_variance": 0.6619,
            "median_absolute_error": 1.702,
            "max_error": 36.2966
          }
        }
      },
      "plots": {
        "test_actual_vs_predicted": {
          "points": [
            {
              "actual": 76.79,
              "predicted": 76.8828
            },
            {
              "actual": 72.48,
              "predicted": 69.6696
            },
            {
              "actual": 76.94,
              "predicted": 75.991
            },
            {
              "actual": 86.5,
              "predicted": 85.5176
            },
            {
              "actual": 75.92,
              "predicted": 75.1729
            },
            {
              "actual": 72.2,
              "predicted": 73.6522
            },
            {
              "actual": 84.57,
              "predicted": 83.4513
            },
            {
              "actual": 71.18,
              "predicted": 72.6633
            },
            {
              "actual": 79.82,
              "predicted": 63.2945
            },
            {
              "actual": 85.38,
              "predicted": 89.4383
            },
            {
              "actual": 85.88,
              "predicted": 83.7897
            },
            {
              "actual": 80.94,
              "predicted": 78.891
            },
            {
              "actual": 83.84,
              "predicted": 84.1071
            },
            {
              "actual": 88.13,
              "predicted": 87.7271
            },
            {
              "actual": 71.15,
              "predicted": 74.1993
            },
            {
              "actual": 90.61,
              "predicted": 91.2059
            },
            {
              "actual": 73.0,
              "predicted": 73.5516
            },
            {
              "actual": 89.59,
              "predicted": 67.3498
            },
            {
              "actual": 65.15,
              "predicted": 65.9339
            },
            {
              "actual": 68.35,
              "predicted": 68.1151
            },
            {
              "actual": 71.75,
              "predicted": 74.2793
            },
            {
              "actual": 76.74,
              "predicted": 76.6735
            },
            {
              "actual": 87.35,
              "predicted": 86.4817
            },
            {
              "actual": 70.08,
              "predicted": 71.033
            },
            {
              "actual": 80.7,
              "predicted": 79.4171
            },
            {
              "actual": 92.59,
              "predicted": 70.4885
            },
            {
              "actual": 75.23,
              "predicted": 75.7529
            },
            {
              "actual": 78.51,
              "predicted": 80.1833
            },
            {
              "actual": 70.97,
              "predicted": 71.4664
            },
            {
              "actual": 69.84,
              "predicted": 75.6916
            },
            {
              "actual": 73.01,
              "predicted": 75.3159
            },
            {
              "actual": 75.2,
              "predicted": 75.7471
            },
            {
              "actual": 92.09,
              "predicted": 89.7563
            },
            {
              "actual": 77.75,
              "predicted": 76.833
            },
            {
              "actual": 73.91,
              "predicted": 76.5519
            },
            {
              "actual": 72.59,
              "predicted": 77.0071
            },
            {
              "actual": 86.44,
              "predicted": 91.1272
            },
            {
              "actual": 64.3,
              "predicted": 66.2655
            },
            {
              "actual": 58.72,
              "predicted": 58.6848
            },
            {
              "actual": 71.8,
              "predicted": 76.1691
            },
            {
              "actual": 75.86,
              "predicted": 73.0244
            },
            {
              "actual": 68.76,
              "predicted": 67.7994
            },
            {
              "actual": 92.18,
              "predicted": 91.3806
            },
            {
              "actual": 87.8,
              "predicted": 84.7356
            },
            {
              "actual": 60.68,
              "predicted": 64.9523
            },
            {
              "actual": 83.88,
              "predicted": 84.1962
            },
            {
              "actual": 83.29,
              "predicted": 83.1987
            },
            {
              "actual": 69.57,
              "predicted": 69.6633
            },
            {
              "actual": 87.49,
              "predicted": 62.4025
            },
            {
              "actual": 81.11,
              "predicted": 81.8935
            },
            {
              "actual": 85.79,
              "predicted": 87.056
            },
            {
              "actual": 72.69,
              "predicted": 69.8257
            },
            {
              "actual": 64.43,
              "predicted": 67.6784
            },
            {
              "actual": 72.56,
              "predicted": 75.2896
            },
            {
              "actual": 75.13,
              "predicted": 74.1655
            },
            {
              "actual": 83.16,
              "predicted": 79.8204
            },
            {
              "actual": 70.62,
              "predicted": 74.2158
            },
            {
              "actual": 73.45,
              "predicted": 75.5803
            },
            {
              "actual": 89.9,
              "predicted": 87.7309
            },
            {
              "actual": 86.6,
              "predicted": 87.7356
            },
            {
              "actual": 67.36,
              "predicted": 69.147
            },
            {
              "actual": 77.82,
              "predicted": 76.9528
            },
            {
              "actual": 62.44,
              "predicted": 65.0958
            },
            {
              "actual": 80.86,
              "predicted": 77.995
            },
            {
              "actual": 73.15,
              "predicted": 73.7562
            },
            {
              "actual": 72.49,
              "predicted": 74.2682
            },
            {
              "actual": 80.62,
              "predicted": 78.6207
            },
            {
              "actual": 84.98,
              "predicted": 82.2177
            },
            {
              "actual": 94.48,
              "predicted": 59.1395
            },
            {
              "actual": 83.29,
              "predicted": 82.4128
            },
            {
              "actual": 80.14,
              "predicted": 79.1458
            },
            {
              "actual": 75.13,
              "predicted": 76.6658
            },
            {
              "actual": 83.42,
              "predicted": 82.9862
            },
            {
              "actual": 72.55,
              "predicted": 72.9577
            },
            {
              "actual": 68.88,
              "predicted": 71.8797
            },
            {
              "actual": 62.9,
              "predicted": 60.997
            },
            {
              "actual": 75.77,
              "predicted": 73.9754
            },
            {
              "actual": 78.39,
              "predicted": 78.9163
            },
            {
              "actual": 55.44,
              "predicted": 55.2762
            },
            {
              "actual": 87.78,
              "predicted": 89.6355
            },
            {
              "actual": 66.05,
              "predicted": 61.4453
            },
            {
              "actual": 77.64,
              "predicted": 76.126
            },
            {
              "actual": 89.03,
              "predicted": 92.0031
            },
            {
              "actual": 57.6,
              "predicted": 62.0704
            },
            {
              "actual": 83.09,
              "predicted": 84.8436
            },
            {
              "actual": 79.33,
              "predicted": 80.5108
            },
            {
              "actual": 78.73,
              "predicted": 82.0206
            },
            {
              "actual": 66.43,
              "predicted": 71.9801
            },
            {
              "actual": 70.77,
              "predicted": 71.1185
            },
            {
              "actual": 61.33,
              "predicted": 63.7581
            },
            {
              "actual": 84.08,
              "predicted": 86.5036
            },
            {
              "actual": 71.9,
              "predicted": 72.4716
            },
            {
              "actual": 75.42,
              "predicted": 72.5269
            },
            {
              "actual": 74.29,
              "predicted": 77.3231
            },
            {
              "actual": 74.8,
              "predicted": 74.1738
            },
            {
              "actual": 74.25,
              "predicted": 74.1224
            },
            {
              "actual": 83.79,
              "predicted": 83.4265
            },
            {
              "actual": 82.35,
              "predicted": 82.1932
            },
            {
              "actual": 79.68,
              "predicted": 77.9072
            },
            {
              "actual": 50.11,
              "predicted": 56.3871
            },
            {
              "actual": 85.34,
              "predicted": 85.1937
            },
            {
              "actual": 66.64,
              "predicted": 68.4521
            },
            {
              "actual": 79.87,
              "predicted": 78.6559
            },
            {
              "actual": 72.34,
              "predicted": 74.6603
            },
            {
              "actual": 91.36,
              "predicted": 94.0944
            },
            {
              "actual": 69.76,
              "predicted": 68.763
            },
            {
              "actual": 85.4,
              "predicted": 81.0363
            },
            {
              "actual": 83.66,
              "predicted": 80.8861
            },
            {
              "actual": 75.01,
              "predicted": 74.3804
            },
            {
              "actual": 87.87,
              "predicted": 89.832
            },
            {
              "actual": 75.87,
              "predicted": 75.913
            },
            {
              "actual": 64.82,
              "predicted": 66.6608
            },
            {
              "actual": 63.97,
              "predicted": 68.1814
            },
            {
              "actual": 79.98,
              "predicted": 78.1056
            },
            {
              "actual": 76.44,
              "predicted": 74.5301
            },
            {
              "actual": 75.88,
              "predicted": 79.4795
            },
            {
              "actual": 77.48,
              "predicted": 79.6975
            },
            {
              "actual": 83.83,
              "predicted": 82.9007
            },
            {
              "actual": 84.46,
              "predicted": 80.4379
            },
            {
              "actual": 77.59,
              "predicted": 76.5027
            },
            {
              "actual": 88.32,
              "predicted": 89.8928
            },
            {
              "actual": 73.35,
              "predicted": 76.8101
            },
            {
              "actual": 72.71,
              "predicted": 73.1495
            },
            {
              "actual": 62.66,
              "predicted": 63.1489
            },
            {
              "actual": 79.95,
              "predicted": 80.7228
            },
            {
              "actual": 72.64,
              "predicted": 76.3605
            },
            {
              "actual": 86.51,
              "predicted": 89.8465
            },
            {
              "actual": 90.52,
              "predicted": 87.1688
            },
            {
              "actual": 83.84,
              "predicted": 81.0424
            },
            {
              "actual": 71.29,
              "predicted": 76.3106
            },
            {
              "actual": 73.48,
              "predicted": 73.9281
            },
            {
              "actual": 88.67,
              "predicted": 89.2815
            },
            {
              "actual": 87.94,
              "predicted": 89.7693
            },
            {
              "actual": 69.92,
              "predicted": 67.6923
            },
            {
              "actual": 81.55,
              "predicted": 80.7911
            },
            {
              "actual": 87.85,
              "predicted": 88.6584
            },
            {
              "actual": 62.93,
              "predicted": 63.4913
            },
            {
              "actual": 81.81,
              "predicted": 81.6537
            },
            {
              "actual": 81.38,
              "predicted": 81.6927
            },
            {
              "actual": 80.23,
              "predicted": 78.5243
            },
            {
              "actual": 76.66,
              "predicted": 78.9148
            },
            {
              "actual": 77.56,
              "predicted": 77.4789
            },
            {
              "actual": 66.84,
              "predicted": 61.4122
            },
            {
              "actual": 84.67,
              "predicted": 84.63
            },
            {
              "actual": 68.33,
              "predicted": 68.3351
            },
            {
              "actual": 73.19,
              "predicted": 74.5021
            },
            {
              "actual": 70.49,
              "predicted": 73.343
            },
            {
              "actual": 62.73,
              "predicted": 63.5871
            },
            {
              "actual": 87.7,
              "predicted": 86.2229
            },
            {
              "actual": 52.24,
              "predicted": 88.5366
            },
            {
              "actual": 85.41,
              "predicted": 81.2845
            },
            {
              "actual": 90.74,
              "predicted": 92.2472
            },
            {
              "actual": 86.29,
              "predicted": 84.1566
            },
            {
              "actual": 82.12,
              "predicted": 81.5016
            },
            {
              "actual": 65.27,
              "predicted": 66.1116
            },
            {
              "actual": 77.98,
              "predicted": 67.7925
            },
            {
              "actual": 70.19,
              "predicted": 70.5297
            },
            {
              "actual": 62.72,
              "predicted": 63.609
            },
            {
              "actual": 87.09,
              "predicted": 87.1344
            },
            {
              "actual": 78.01,
              "predicted": 77.5887
            },
            {
              "actual": 63.4,
              "predicted": 62.802
            },
            {
              "actual": 73.85,
              "predicted": 73.009
            },
            {
              "actual": 87.97,
              "predicted": 62.6011
            },
            {
              "actual": 89.55,
              "predicted": 90.0434
            },
            {
              "actual": 72.67,
              "predicted": 74.0302
            },
            {
              "actual": 91.66,
              "predicted": 91.9913
            },
            {
              "actual": 79.33,
              "predicted": 80.599
            },
            {
              "actual": 76.48,
              "predicted": 78.309
            },
            {
              "actual": 66.26,
              "predicted": 66.2264
            },
            {
              "actual": 81.85,
              "predicted": 80.4572
            },
            {
              "actual": 84.71,
              "predicted": 85.6235
            },
            {
              "actual": 81.52,
              "predicted": 79.4097
            },
            {
              "actual": 75.56,
              "predicted": 75.292
            },
            {
              "actual": 76.01,
              "predicted": 78.683
            },
            {
              "actual": 79.95,
              "predicted": 79.9949
            },
            {
              "actual": 63.82,
              "predicted": 63.5946
            },
            {
              "actual": 68.58,
              "predicted": 65.1504
            },
            {
              "actual": 73.42,
              "predicted": 72.3994
            },
            {
              "actual": 77.05,
              "predicted": 78.1088
            },
            {
              "actual": 69.89,
              "predicted": 69.4129
            },
            {
              "actual": 61.2,
              "predicted": 61.0665
            },
            {
              "actual": 78.41,
              "predicted": 79.1078
            },
            {
              "actual": 89.68,
              "predicted": 88.0072
            },
            {
              "actual": 77.86,
              "predicted": 82.0932
            },
            {
              "actual": 58.4,
              "predicted": 60.6107
            },
            {
              "actual": 63.01,
              "predicted": 62.8023
            },
            {
              "actual": 63.45,
              "predicted": 66.0733
            },
            {
              "actual": 55.62,
              "predicted": 60.6822
            },
            {
              "actual": 64.73,
              "predicted": 65.5858
            },
            {
              "actual": 76.26,
              "predicted": 78.4155
            },
            {
              "actual": 74.25,
              "predicted": 74.258
            },
            {
              "actual": 85.98,
              "predicted": 82.3413
            },
            {
              "actual": 71.26,
              "predicted": 73.2123
            },
            {
              "actual": 81.24,
              "predicted": 81.0733
            },
            {
              "actual": 83.73,
              "predicted": 70.693
            },
            {
              "actual": 67.52,
              "predicted": 66.2371
            },
            {
              "actual": 79.94,
              "predicted": 78.7265
            },
            {
              "actual": 92.59,
              "predicted": 93.7042
            },
            {
              "actual": 77.79,
              "predicted": 77.2128
            },
            {
              "actual": 85.11,
              "predicted": 89.0802
            },
            {
              "actual": 76.61,
              "predicted": 80.5636
            },
            {
              "actual": 85.77,
              "predicted": 86.0419
            },
            {
              "actual": 85.45,
              "predicted": 82.8096
            },
            {
              "actual": 53.21,
              "predicted": 59.9833
            },
            {
              "actual": 79.96,
              "predicted": 80.9413
            },
            {
              "actual": 65.38,
              "predicted": 63.4866
            },
            {
              "actual": 78.25,
              "predicted": 81.337
            },
            {
              "actual": 62.27,
              "predicted": 63.4431
            },
            {
              "actual": 77.49,
              "predicted": 76.7889
            },
            {
              "actual": 91.67,
              "predicted": 71.2085
            },
            {
              "actual": 92.73,
              "predicted": 92.7312
            },
            {
              "actual": 83.13,
              "predicted": 71.9252
            },
            {
              "actual": 76.6,
              "predicted": 74.1302
            },
            {
              "actual": 65.02,
              "predicted": 85.1037
            },
            {
              "actual": 86.1,
              "predicted": 87.6144
            },
            {
              "actual": 91.54,
              "predicted": 88.439
            },
            {
              "actual": 83.71,
              "predicted": 81.8614
            },
            {
              "actual": 78.66,
              "predicted": 76.3408
            },
            {
              "actual": 87.78,
              "predicted": 89.0584
            },
            {
              "actual": 86.98,
              "predicted": 87.9094
            },
            {
              "actual": 89.76,
              "predicted": 86.4094
            },
            {
              "actual": 95.35,
              "predicted": 78.6349
            },
            {
              "actual": 82.38,
              "predicted": 83.6821
            },
            {
              "actual": 84.89,
              "predicted": 82.7879
            },
            {
              "actual": 86.16,
              "predicted": 88.2679
            },
            {
              "actual": 72.27,
              "predicted": 74.9043
            },
            {
              "actual": 75.38,
              "predicted": 74.3389
            },
            {
              "actual": 70.19,
              "predicted": 63.6893
            },
            {
              "actual": 55.02,
              "predicted": 60.3154
            },
            {
              "actual": 72.5,
              "predicted": 76.0748
            },
            {
              "actual": 82.35,
              "predicted": 80.2507
            },
            {
              "actual": 90.64,
              "predicted": 88.366
            },
            {
              "actual": 64.46,
              "predicted": 64.1125
            },
            {
              "actual": 88.02,
              "predicted": 85.247
            },
            {
              "actual": 87.17,
              "predicted": 86.4281
            },
            {
              "actual": 80.28,
              "predicted": 76.8117
            },
            {
              "actual": 71.29,
              "predicted": 73.6076
            },
            {
              "actual": 86.13,
              "predicted": 85.8286
            },
            {
              "actual": 74.56,
              "predicted": 75.5677
            },
            {
              "actual": 78.49,
              "predicted": 78.3641
            },
            {
              "actual": 79.23,
              "predicted": 78.5665
            },
            {
              "actual": 73.23,
              "predicted": 74.2398
            },
            {
              "actual": 91.31,
              "predicted": 89.4401
            },
            {
              "actual": 89.6,
              "predicted": 89.1018
            },
            {
              "actual": 86.2,
              "predicted": 88.1289
            },
            {
              "actual": 69.65,
              "predicted": 74.4801
            },
            {
              "actual": 92.88,
              "predicted": 94.6759
            },
            {
              "actual": 72.23,
              "predicted": 69.3525
            },
            {
              "actual": 83.76,
              "predicted": 84.9568
            },
            {
              "actual": 62.88,
              "predicted": 62.8087
            },
            {
              "actual": 74.22,
              "predicted": 76.977
            },
            {
              "actual": 74.07,
              "predicted": 73.1062
            },
            {
              "actual": 71.39,
              "predicted": 75.2087
            },
            {
              "actual": 80.18,
              "predicted": 81.2165
            },
            {
              "actual": 70.38,
              "predicted": 67.4568
            },
            {
              "actual": 85.36,
              "predicted": 87.0907
            },
            {
              "actual": 84.36,
              "predicted": 83.0239
            },
            {
              "actual": 75.76,
              "predicted": 74.9911
            },
            {
              "actual": 68.17,
              "predicted": 65.1557
            },
            {
              "actual": 65.01,
              "predicted": 70.5708
            },
            {
              "actual": 55.79,
              "predicted": 80.2601
            },
            {
              "actual": 68.87,
              "predicted": 67.9097
            },
            {
              "actual": 90.83,
              "predicted": 77.3366
            },
            {
              "actual": 75.44,
              "predicted": 75.1303
            },
            {
              "actual": 77.71,
              "predicted": 78.2674
            },
            {
              "actual": 90.69,
              "predicted": 89.7834
            },
            {
              "actual": 81.22,
              "predicted": 80.8025
            },
            {
              "actual": 98.54,
              "predicted": 67.4096
            },
            {
              "actual": 77.76,
              "predicted": 82.9396
            },
            {
              "actual": 60.83,
              "predicted": 64.5122
            },
            {
              "actual": 63.17,
              "predicted": 63.6532
            },
            {
              "actual": 54.33,
              "predicted": 55.2767
            },
            {
              "actual": 80.11,
              "predicted": 78.0131
            },
            {
              "actual": 77.0,
              "predicted": 79.1468
            },
            {
              "actual": 65.8,
              "predicted": 66.0764
            },
            {
              "actual": 60.04,
              "predicted": 61.0674
            },
            {
              "actual": 91.19,
              "predicted": 91.3971
            },
            {
              "actual": 67.99,
              "predicted": 67.2249
            },
            {
              "actual": 93.95,
              "predicted": 92.3556
            },
            {
              "actual": 76.52,
              "predicted": 76.3759
            },
            {
              "actual": 62.85,
              "predicted": 62.9951
            },
            {
              "actual": 81.38,
              "predicted": 80.1868
            },
            {
              "actual": 66.43,
              "predicted": 66.0667
            },
            {
              "actual": 62.64,
              "predicted": 62.0045
            },
            {
              "actual": 52.5,
              "predicted": 57.9718
            },
            {
              "actual": 93.58,
              "predicted": 82.4721
            },
            {
              "actual": 73.28,
              "predicted": 76.7154
            },
            {
              "actual": 84.65,
              "predicted": 85.2945
            },
            {
              "actual": 82.32,
              "predicted": 83.5256
            },
            {
              "actual": 51.55,
              "predicted": 64.8663
            },
            {
              "actual": 79.93,
              "predicted": 80.4109
            },
            {
              "actual": 64.35,
              "predicted": 66.8323
            },
            {
              "actual": 83.89,
              "predicted": 83.2709
            },
            {
              "actual": 57.91,
              "predicted": 58.7942
            },
            {
              "actual": 85.8,
              "predicted": 85.4271
            },
            {
              "actual": 67.64,
              "predicted": 67.3781
            },
            {
              "actual": 86.49,
              "predicted": 62.8254
            },
            {
              "actual": 63.33,
              "predicted": 64.519
            },
            {
              "actual": 82.27,
              "predicted": 80.1055
            },
            {
              "actual": 73.42,
              "predicted": 72.2408
            },
            {
              "actual": 78.56,
              "predicted": 76.9431
            },
            {
              "actual": 75.11,
              "predicted": 78.124
            },
            {
              "actual": 71.1,
              "predicted": 71.4367
            },
            {
              "actual": 94.15,
              "predicted": 95.1741
            },
            {
              "actual": 72.84,
              "predicted": 77.8939
            },
            {
              "actual": 67.86,
              "predicted": 69.8533
            },
            {
              "actual": 71.08,
              "predicted": 70.6067
            },
            {
              "actual": 55.96,
              "predicted": 57.9106
            },
            {
              "actual": 57.91,
              "predicted": 59.9356
            },
            {
              "actual": 52.22,
              "predicted": 73.0037
            },
            {
              "actual": 80.31,
              "predicted": 80.5898
            },
            {
              "actual": 63.91,
              "predicted": 68.3873
            },
            {
              "actual": 80.34,
              "predicted": 81.5427
            },
            {
              "actual": 85.05,
              "predicted": 84.9199
            },
            {
              "actual": 70.73,
              "predicted": 73.2363
            },
            {
              "actual": 63.38,
              "predicted": 65.2785
            },
            {
              "actual": 81.57,
              "predicted": 83.4624
            },
            {
              "actual": 81.9,
              "predicted": 81.1365
            },
            {
              "actual": 74.34,
              "predicted": 76.4396
            },
            {
              "actual": 81.9,
              "predicted": 81.6308
            },
            {
              "actual": 69.49,
              "predicted": 70.9901
            },
            {
              "actual": 77.74,
              "predicted": 80.0062
            },
            {
              "actual": 58.42,
              "predicted": 77.0253
            },
            {
              "actual": 73.01,
              "predicted": 72.8018
            },
            {
              "actual": 71.91,
              "predicted": 76.3273
            },
            {
              "actual": 94.77,
              "predicted": 92.5637
            },
            {
              "actual": 66.73,
              "predicted": 66.3546
            },
            {
              "actual": 65.13,
              "predicted": 63.0572
            },
            {
              "actual": 66.08,
              "predicted": 65.6097
            },
            {
              "actual": 84.68,
              "predicted": 83.8958
            },
            {
              "actual": 67.17,
              "predicted": 64.3724
            },
            {
              "actual": 88.18,
              "predicted": 87.1256
            },
            {
              "actual": 73.37,
              "predicted": 77.2375
            },
            {
              "actual": 68.24,
              "predicted": 63.7481
            },
            {
              "actual": 77.62,
              "predicted": 76.5617
            },
            {
              "actual": 67.56,
              "predicted": 64.3421
            },
            {
              "actual": 76.32,
              "predicted": 79.5435
            },
            {
              "actual": 60.37,
              "predicted": 66.1613
            },
            {
              "actual": 65.09,
              "predicted": 69.0869
            },
            {
              "actual": 83.7,
              "predicted": 79.1678
            },
            {
              "actual": 81.1,
              "predicted": 77.8209
            },
            {
              "actual": 99.99,
              "predicted": 90.8188
            },
            {
              "actual": 68.2,
              "predicted": 69.1748
            },
            {
              "actual": 93.83,
              "predicted": 86.341
            },
            {
              "actual": 80.93,
              "predicted": 82.458
            },
            {
              "actual": 77.09,
              "predicted": 75.8364
            },
            {
              "actual": 71.13,
              "predicted": 72.6189
            },
            {
              "actual": 70.48,
              "predicted": 71.5014
            },
            {
              "actual": 74.88,
              "predicted": 76.885
            },
            {
              "actual": 73.04,
              "predicted": 75.7506
            },
            {
              "actual": 75.37,
              "predicted": 67.804
            },
            {
              "actual": 83.36,
              "predicted": 83.8605
            },
            {
              "actual": 80.31,
              "predicted": 80.7767
            },
            {
              "actual": 53.95,
              "predicted": 55.9505
            },
            {
              "actual": 66.99,
              "predicted": 64.2334
            },
            {
              "actual": 82.55,
              "predicted": 83.7082
            },
            {
              "actual": 83.69,
              "predicted": 80.2117
            },
            {
              "actual": 84.77,
              "predicted": 83.8611
            },
            {
              "actual": 78.01,
              "predicted": 81.207
            },
            {
              "actual": 86.79,
              "predicted": 85.6302
            },
            {
              "actual": 70.43,
              "predicted": 72.4155
            },
            {
              "actual": 82.25,
              "predicted": 80.4995
            },
            {
              "actual": 83.29,
              "predicted": 79.2595
            },
            {
              "actual": 92.63,
              "predicted": 65.5369
            },
            {
              "actual": 79.61,
              "predicted": 78.2058
            },
            {
              "actual": 62.5,
              "predicted": 65.8778
            },
            {
              "actual": 62.7,
              "predicted": 65.5886
            },
            {
              "actual": 78.55,
              "predicted": 77.9003
            },
            {
              "actual": 89.51,
              "predicted": 88.1452
            },
            {
              "actual": 91.05,
              "predicted": 88.2481
            },
            {
              "actual": 69.81,
              "predicted": 66.6542
            },
            {
              "actual": 91.51,
              "predicted": 92.8049
            },
            {
              "actual": 95.02,
              "predicted": 78.7933
            },
            {
              "actual": 83.47,
              "predicted": 82.2301
            },
            {
              "actual": 60.97,
              "predicted": 60.9423
            },
            {
              "actual": 82.96,
              "predicted": 82.3968
            },
            {
              "actual": 81.58,
              "predicted": 76.9216
            },
            {
              "actual": 77.37,
              "predicted": 77.0893
            },
            {
              "actual": 59.28,
              "predicted": 57.6745
            },
            {
              "actual": 64.88,
              "predicted": 66.4094
            },
            {
              "actual": 69.68,
              "predicted": 67.0837
            },
            {
              "actual": 77.75,
              "predicted": 76.1091
            },
            {
              "actual": 73.11,
              "predicted": 76.2126
            },
            {
              "actual": 61.25,
              "predicted": 61.9414
            },
            {
              "actual": 87.69,
              "predicted": 89.3359
            },
            {
              "actual": 70.94,
              "predicted": 73.3118
            },
            {
              "actual": 89.65,
              "predicted": 91.5345
            },
            {
              "actual": 64.28,
              "predicted": 66.2235
            },
            {
              "actual": 76.16,
              "predicted": 75.1378
            },
            {
              "actual": 77.79,
              "predicted": 75.6922
            },
            {
              "actual": 85.36,
              "predicted": 82.016
            },
            {
              "actual": 68.63,
              "predicted": 65.9057
            },
            {
              "actual": 74.63,
              "predicted": 74.1187
            },
            {
              "actual": 75.45,
              "predicted": 78.3882
            },
            {
              "actual": 69.31,
              "predicted": 66.4922
            },
            {
              "actual": 79.53,
              "predicted": 78.6384
            },
            {
              "actual": 74.14,
              "predicted": 75.8382
            },
            {
              "actual": 65.34,
              "predicted": 68.4477
            },
            {
              "actual": 81.8,
              "predicted": 79.9208
            },
            {
              "actual": 95.0,
              "predicted": 96.0939
            }
          ],
          "min": 50.11,
          "max": 99.99
        }
      }
    },
    "logistic_regression": {
      "key": "logistic_regression",
      "name": "Logistic Regression",
      "task": "classification",
      "source": "teste/logistic_regression.ipynb",
      "artifact": "teste/artifacts/models/logistic_regression.joblib",
      "split": {
        "test_size": 0.2,
        "random_state": 42,
        "train_rows": 1600,
        "test_rows": 400,
        "shared_indices": true
      },
      "threshold": 70,
      "metrics": {
        "selected": {
          "c": 100.0,
          "train_accuracy": 0.9563,
          "test_accuracy": 0.945,
          "train": {
            "accuracy": 0.9563,
            "precision": 0.9638,
            "recall": 0.9756,
            "f1": 0.9697,
            "roc_auc": 0.9841,
            "confusion_matrix": [
              [
                411,
                42
              ],
              [
                28,
                1119
              ]
            ],
            "report": {
              "0": {
                "precision": 0.9362,
                "recall": 0.9073,
                "f1-score": 0.9215,
                "support": 453.0
              },
              "1": {
                "precision": 0.9638,
                "recall": 0.9756,
                "f1-score": 0.9697,
                "support": 1147.0
              },
              "accuracy": 0.9563,
              "macro avg": {
                "precision": 0.95,
                "recall": 0.9414,
                "f1-score": 0.9456,
                "support": 1600.0
              },
              "weighted avg": {
                "precision": 0.956,
                "recall": 0.9563,
                "f1-score": 0.956,
                "support": 1600.0
              }
            }
          },
          "test": {
            "accuracy": 0.945,
            "precision": 0.9792,
            "recall": 0.9463,
            "f1": 0.9625,
            "roc_auc": 0.9602,
            "confusion_matrix": [
              [
                96,
                6
              ],
              [
                16,
                282
              ]
            ],
            "report": {
              "0": {
                "precision": 0.8571,
                "recall": 0.9412,
                "f1-score": 0.8972,
                "support": 102.0
              },
              "1": {
                "precision": 0.9792,
                "recall": 0.9463,
                "f1-score": 0.9625,
                "support": 298.0
              },
              "accuracy": 0.945,
              "macro avg": {
                "precision": 0.9182,
                "recall": 0.9437,
                "f1-score": 0.9298,
                "support": 400.0
              },
              "weighted avg": {
                "precision": 0.9481,
                "recall": 0.945,
                "f1-score": 0.9458,
                "support": 400.0
              }
            }
          }
        },
        "baseline": {
          "c": 1.0,
          "train_accuracy": 0.9525,
          "test_accuracy": 0.94,
          "train": {
            "accuracy": 0.9525,
            "precision": 0.9597,
            "recall": 0.9747,
            "f1": 0.9671,
            "roc_auc": 0.9839,
            "confusion_matrix": [
              [
                406,
                47
              ],
              [
                29,
                1118
              ]
            ],
            "report": {
              "0": {
                "precision": 0.9333,
                "recall": 0.8962,
                "f1-score": 0.9144,
                "support": 453.0
              },
              "1": {
                "precision": 0.9597,
                "recall": 0.9747,
                "f1-score": 0.9671,
                "support": 1147.0
              },
              "accuracy": 0.9525,
              "macro avg": {
                "precision": 0.9465,
                "recall": 0.9355,
                "f1-score": 0.9408,
                "support": 1600.0
              },
              "weighted avg": {
                "precision": 0.9522,
                "recall": 0.9525,
                "f1-score": 0.9522,
                "support": 1600.0
              }
            }
          },
          "test": {
            "accuracy": 0.94,
            "precision": 0.9757,
            "recall": 0.943,
            "f1": 0.959,
            "roc_auc": 0.9614,
            "confusion_matrix": [
              [
                95,
                7
              ],
              [
                17,
                281
              ]
            ],
            "report": {
              "0": {
                "precision": 0.8482,
                "recall": 0.9314,
                "f1-score": 0.8879,
                "support": 102.0
              },
              "1": {
                "precision": 0.9757,
                "recall": 0.943,
                "f1-score": 0.959,
                "support": 298.0
              },
              "accuracy": 0.94,
              "macro avg": {
                "precision": 0.912,
                "recall": 0.9372,
                "f1-score": 0.9234,
                "support": 400.0
              },
              "weighted avg": {
                "precision": 0.9432,
                "recall": 0.94,
                "f1-score": 0.9409,
                "support": 400.0
              }
            }
          },
          "artifacts": {
            "roc_curve": {
              "path": "teste/artifacts/plots/logistic_regression_c_1_0_roc_curve.png",
              "auc": 0.9614
            }
          }
        },
        "variants": [
          {
            "c": 1.0,
            "train_accuracy": 0.9525,
            "test_accuracy": 0.94,
            "train": {
              "accuracy": 0.9525,
              "precision": 0.9597,
              "recall": 0.9747,
              "f1": 0.9671,
              "roc_auc": 0.9839,
              "confusion_matrix": [
                [
                  406,
                  47
                ],
                [
                  29,
                  1118
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.9333,
                  "recall": 0.8962,
                  "f1-score": 0.9144,
                  "support": 453.0
                },
                "1": {
                  "precision": 0.9597,
                  "recall": 0.9747,
                  "f1-score": 0.9671,
                  "support": 1147.0
                },
                "accuracy": 0.9525,
                "macro avg": {
                  "precision": 0.9465,
                  "recall": 0.9355,
                  "f1-score": 0.9408,
                  "support": 1600.0
                },
                "weighted avg": {
                  "precision": 0.9522,
                  "recall": 0.9525,
                  "f1-score": 0.9522,
                  "support": 1600.0
                }
              }
            },
            "test": {
              "accuracy": 0.94,
              "precision": 0.9757,
              "recall": 0.943,
              "f1": 0.959,
              "roc_auc": 0.9614,
              "confusion_matrix": [
                [
                  95,
                  7
                ],
                [
                  17,
                  281
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.8482,
                  "recall": 0.9314,
                  "f1-score": 0.8879,
                  "support": 102.0
                },
                "1": {
                  "precision": 0.9757,
                  "recall": 0.943,
                  "f1-score": 0.959,
                  "support": 298.0
                },
                "accuracy": 0.94,
                "macro avg": {
                  "precision": 0.912,
                  "recall": 0.9372,
                  "f1-score": 0.9234,
                  "support": 400.0
                },
                "weighted avg": {
                  "precision": 0.9432,
                  "recall": 0.94,
                  "f1-score": 0.9409,
                  "support": 400.0
                }
              }
            },
            "artifacts": {
              "roc_curve": {
                "path": "teste/artifacts/plots/logistic_regression_c_1_0_roc_curve.png",
                "auc": 0.9614
              }
            }
          },
          {
            "c": 100.0,
            "train_accuracy": 0.9563,
            "test_accuracy": 0.945,
            "train": {
              "accuracy": 0.9563,
              "precision": 0.9638,
              "recall": 0.9756,
              "f1": 0.9697,
              "roc_auc": 0.9841,
              "confusion_matrix": [
                [
                  411,
                  42
                ],
                [
                  28,
                  1119
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.9362,
                  "recall": 0.9073,
                  "f1-score": 0.9215,
                  "support": 453.0
                },
                "1": {
                  "precision": 0.9638,
                  "recall": 0.9756,
                  "f1-score": 0.9697,
                  "support": 1147.0
                },
                "accuracy": 0.9563,
                "macro avg": {
                  "precision": 0.95,
                  "recall": 0.9414,
                  "f1-score": 0.9456,
                  "support": 1600.0
                },
                "weighted avg": {
                  "precision": 0.956,
                  "recall": 0.9563,
                  "f1-score": 0.956,
                  "support": 1600.0
                }
              }
            },
            "test": {
              "accuracy": 0.945,
              "precision": 0.9792,
              "recall": 0.9463,
              "f1": 0.9625,
              "roc_auc": 0.9602,
              "confusion_matrix": [
                [
                  96,
                  6
                ],
                [
                  16,
                  282
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.8571,
                  "recall": 0.9412,
                  "f1-score": 0.8972,
                  "support": 102.0
                },
                "1": {
                  "precision": 0.9792,
                  "recall": 0.9463,
                  "f1-score": 0.9625,
                  "support": 298.0
                },
                "accuracy": 0.945,
                "macro avg": {
                  "precision": 0.9182,
                  "recall": 0.9437,
                  "f1-score": 0.9298,
                  "support": 400.0
                },
                "weighted avg": {
                  "precision": 0.9481,
                  "recall": 0.945,
                  "f1-score": 0.9458,
                  "support": 400.0
                }
              }
            },
            "artifacts": {
              "roc_curve": {
                "path": "teste/artifacts/plots/logistic_regression_c_100_0_roc_curve.png",
                "auc": 0.9602
              }
            }
          },
          {
            "c": 0.01,
            "train_accuracy": 0.8669,
            "test_accuracy": 0.9,
            "train": {
              "accuracy": 0.8669,
              "precision": 0.8501,
              "recall": 0.9887,
              "f1": 0.9141,
              "roc_auc": 0.9753,
              "confusion_matrix": [
                [
                  253,
                  200
                ],
                [
                  13,
                  1134
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.9511,
                  "recall": 0.5585,
                  "f1-score": 0.7038,
                  "support": 453.0
                },
                "1": {
                  "precision": 0.8501,
                  "recall": 0.9887,
                  "f1-score": 0.9141,
                  "support": 1147.0
                },
                "accuracy": 0.8669,
                "macro avg": {
                  "precision": 0.9006,
                  "recall": 0.7736,
                  "f1-score": 0.809,
                  "support": 1600.0
                },
                "weighted avg": {
                  "precision": 0.8787,
                  "recall": 0.8669,
                  "f1-score": 0.8546,
                  "support": 1600.0
                }
              }
            },
            "test": {
              "accuracy": 0.9,
              "precision": 0.8933,
              "recall": 0.9832,
              "f1": 0.9361,
              "roc_auc": 0.9689,
              "confusion_matrix": [
                [
                  67,
                  35
                ],
                [
                  5,
                  293
                ]
              ],
              "report": {
                "0": {
                  "precision": 0.9306,
                  "recall": 0.6569,
                  "f1-score": 0.7701,
                  "support": 102.0
                },
                "1": {
                  "precision": 0.8933,
                  "recall": 0.9832,
                  "f1-score": 0.9361,
                  "support": 298.0
                },
                "accuracy": 0.9,
                "macro avg": {
                  "precision": 0.9119,
                  "recall": 0.82,
                  "f1-score": 0.8531,
                  "support": 400.0
                },
                "weighted avg": {
                  "precision": 0.9028,
                  "recall": 0.9,
                  "f1-score": 0.8938,
                  "support": 400.0
                }
              }
            },
            "artifacts": {
              "roc_curve": {
                "path": "teste/artifacts/plots/logistic_regression_c_0_01_roc_curve.png",
                "auc": 0.9689
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
              "predicted_probability": 0.998
            },
            {
              "actual": 1,
              "predicted_probability": 0.3772
            },
            {
              "actual": 1,
              "predicted_probability": 0.9817
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.8949
            },
            {
              "actual": 1,
              "predicted_probability": 0.6481
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 1,
              "predicted_probability": 0.9124
            },
            {
              "actual": 1,
              "predicted_probability": 0.1266
            },
            {
              "actual": 1,
              "predicted_probability": 0.9997
            },
            {
              "actual": 1,
              "predicted_probability": 0.9857
            },
            {
              "actual": 1,
              "predicted_probability": 0.9997
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9806
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9856
            },
            {
              "actual": 1,
              "predicted_probability": 0.8751
            },
            {
              "actual": 0,
              "predicted_probability": 0.0209
            },
            {
              "actual": 0,
              "predicted_probability": 0.0069
            },
            {
              "actual": 1,
              "predicted_probability": 0.9944
            },
            {
              "actual": 1,
              "predicted_probability": 0.9994
            },
            {
              "actual": 1,
              "predicted_probability": 0.9964
            },
            {
              "actual": 1,
              "predicted_probability": 0.8859
            },
            {
              "actual": 1,
              "predicted_probability": 0.999
            },
            {
              "actual": 1,
              "predicted_probability": 0.4052
            },
            {
              "actual": 1,
              "predicted_probability": 0.9863
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 1,
              "predicted_probability": 0.9803
            },
            {
              "actual": 0,
              "predicted_probability": 0.9997
            },
            {
              "actual": 1,
              "predicted_probability": 0.9976
            },
            {
              "actual": 1,
              "predicted_probability": 0.9977
            },
            {
              "actual": 1,
              "predicted_probability": 0.9992
            },
            {
              "actual": 1,
              "predicted_probability": 0.9492
            },
            {
              "actual": 1,
              "predicted_probability": 0.9926
            },
            {
              "actual": 1,
              "predicted_probability": 0.9957
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.0167
            },
            {
              "actual": 0,
              "predicted_probability": 0.0004
            },
            {
              "actual": 1,
              "predicted_probability": 0.9945
            },
            {
              "actual": 1,
              "predicted_probability": 0.0948
            },
            {
              "actual": 0,
              "predicted_probability": 0.0415
            },
            {
              "actual": 1,
              "predicted_probability": 0.9995
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.0071
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 1,
              "predicted_probability": 0.9972
            },
            {
              "actual": 0,
              "predicted_probability": 0.0492
            },
            {
              "actual": 1,
              "predicted_probability": 0.0033
            },
            {
              "actual": 1,
              "predicted_probability": 0.9995
            },
            {
              "actual": 1,
              "predicted_probability": 0.9801
            },
            {
              "actual": 1,
              "predicted_probability": 0.8182
            },
            {
              "actual": 0,
              "predicted_probability": 0.285
            },
            {
              "actual": 1,
              "predicted_probability": 0.9896
            },
            {
              "actual": 1,
              "predicted_probability": 0.9697
            },
            {
              "actual": 1,
              "predicted_probability": 0.9975
            },
            {
              "actual": 1,
              "predicted_probability": 0.9946
            },
            {
              "actual": 1,
              "predicted_probability": 0.9946
            },
            {
              "actual": 1,
              "predicted_probability": 0.9868
            },
            {
              "actual": 1,
              "predicted_probability": 0.9939
            },
            {
              "actual": 0,
              "predicted_probability": 0.0303
            },
            {
              "actual": 1,
              "predicted_probability": 0.9938
            },
            {
              "actual": 0,
              "predicted_probability": 0.0056
            },
            {
              "actual": 1,
              "predicted_probability": 0.9949
            },
            {
              "actual": 1,
              "predicted_probability": 0.8795
            },
            {
              "actual": 1,
              "predicted_probability": 0.9338
            },
            {
              "actual": 1,
              "predicted_probability": 0.9947
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 1,
              "predicted_probability": 0.1354
            },
            {
              "actual": 1,
              "predicted_probability": 0.9974
            },
            {
              "actual": 1,
              "predicted_probability": 0.9708
            },
            {
              "actual": 1,
              "predicted_probability": 0.94
            },
            {
              "actual": 1,
              "predicted_probability": 0.9988
            },
            {
              "actual": 1,
              "predicted_probability": 0.9895
            },
            {
              "actual": 0,
              "predicted_probability": 0.6421
            },
            {
              "actual": 0,
              "predicted_probability": 0.0011
            },
            {
              "actual": 1,
              "predicted_probability": 0.8726
            },
            {
              "actual": 1,
              "predicted_probability": 0.9876
            },
            {
              "actual": 0,
              "predicted_probability": 0.0001
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.0773
            },
            {
              "actual": 1,
              "predicted_probability": 0.9305
            },
            {
              "actual": 1,
              "predicted_probability": 0.9992
            },
            {
              "actual": 0,
              "predicted_probability": 0.0203
            },
            {
              "actual": 1,
              "predicted_probability": 0.9962
            },
            {
              "actual": 1,
              "predicted_probability": 0.9989
            },
            {
              "actual": 1,
              "predicted_probability": 0.9991
            },
            {
              "actual": 0,
              "predicted_probability": 0.1209
            },
            {
              "actual": 1,
              "predicted_probability": 0.6861
            },
            {
              "actual": 0,
              "predicted_probability": 0.0119
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.7804
            },
            {
              "actual": 1,
              "predicted_probability": 0.9834
            },
            {
              "actual": 1,
              "predicted_probability": 0.9839
            },
            {
              "actual": 1,
              "predicted_probability": 0.9942
            },
            {
              "actual": 1,
              "predicted_probability": 0.7877
            },
            {
              "actual": 1,
              "predicted_probability": 0.9983
            },
            {
              "actual": 1,
              "predicted_probability": 0.9987
            },
            {
              "actual": 1,
              "predicted_probability": 0.9982
            },
            {
              "actual": 0,
              "predicted_probability": 0.0001
            },
            {
              "actual": 1,
              "predicted_probability": 0.9903
            },
            {
              "actual": 0,
              "predicted_probability": 0.1031
            },
            {
              "actual": 1,
              "predicted_probability": 0.9931
            },
            {
              "actual": 1,
              "predicted_probability": 0.998
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.0744
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 1,
              "predicted_probability": 0.9996
            },
            {
              "actual": 1,
              "predicted_probability": 0.9617
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9597
            },
            {
              "actual": 0,
              "predicted_probability": 0.0572
            },
            {
              "actual": 0,
              "predicted_probability": 0.0289
            },
            {
              "actual": 1,
              "predicted_probability": 0.9823
            },
            {
              "actual": 1,
              "predicted_probability": 0.9366
            },
            {
              "actual": 1,
              "predicted_probability": 0.9979
            },
            {
              "actual": 1,
              "predicted_probability": 0.9459
            },
            {
              "actual": 1,
              "predicted_probability": 0.999
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 1,
              "predicted_probability": 0.9696
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.998
            },
            {
              "actual": 1,
              "predicted_probability": 0.9875
            },
            {
              "actual": 0,
              "predicted_probability": 0.0037
            },
            {
              "actual": 1,
              "predicted_probability": 0.9923
            },
            {
              "actual": 1,
              "predicted_probability": 0.992
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9901
            },
            {
              "actual": 1,
              "predicted_probability": 0.9912
            },
            {
              "actual": 1,
              "predicted_probability": 0.9747
            },
            {
              "actual": 1,
              "predicted_probability": 0.9251
            },
            {
              "actual": 1,
              "predicted_probability": 0.9971
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.029
            },
            {
              "actual": 1,
              "predicted_probability": 0.9994
            },
            {
              "actual": 1,
              "predicted_probability": 0.9994
            },
            {
              "actual": 0,
              "predicted_probability": 0.0009
            },
            {
              "actual": 1,
              "predicted_probability": 0.9922
            },
            {
              "actual": 1,
              "predicted_probability": 0.9988
            },
            {
              "actual": 1,
              "predicted_probability": 0.9984
            },
            {
              "actual": 1,
              "predicted_probability": 0.9327
            },
            {
              "actual": 1,
              "predicted_probability": 0.9994
            },
            {
              "actual": 0,
              "predicted_probability": 0.0058
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 0,
              "predicted_probability": 0.0223
            },
            {
              "actual": 1,
              "predicted_probability": 0.9972
            },
            {
              "actual": 1,
              "predicted_probability": 0.9447
            },
            {
              "actual": 0,
              "predicted_probability": 0.024
            },
            {
              "actual": 1,
              "predicted_probability": 0.9981
            },
            {
              "actual": 0,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9495
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9903
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 0,
              "predicted_probability": 0.0248
            },
            {
              "actual": 1,
              "predicted_probability": 0.5399
            },
            {
              "actual": 1,
              "predicted_probability": 0.9841
            },
            {
              "actual": 0,
              "predicted_probability": 0.0103
            },
            {
              "actual": 1,
              "predicted_probability": 0.9982
            },
            {
              "actual": 1,
              "predicted_probability": 0.9981
            },
            {
              "actual": 0,
              "predicted_probability": 0.0461
            },
            {
              "actual": 1,
              "predicted_probability": 0.9818
            },
            {
              "actual": 1,
              "predicted_probability": 0.0087
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.8582
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9995
            },
            {
              "actual": 1,
              "predicted_probability": 0.9976
            },
            {
              "actual": 0,
              "predicted_probability": 0.0299
            },
            {
              "actual": 1,
              "predicted_probability": 0.9966
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 1,
              "predicted_probability": 0.9931
            },
            {
              "actual": 1,
              "predicted_probability": 0.992
            },
            {
              "actual": 1,
              "predicted_probability": 0.9972
            },
            {
              "actual": 1,
              "predicted_probability": 0.9983
            },
            {
              "actual": 0,
              "predicted_probability": 0.0067
            },
            {
              "actual": 0,
              "predicted_probability": 0.0241
            },
            {
              "actual": 1,
              "predicted_probability": 0.7249
            },
            {
              "actual": 1,
              "predicted_probability": 0.9992
            },
            {
              "actual": 0,
              "predicted_probability": 0.0143
            },
            {
              "actual": 0,
              "predicted_probability": 0.0006
            },
            {
              "actual": 1,
              "predicted_probability": 0.9458
            },
            {
              "actual": 1,
              "predicted_probability": 0.9983
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 0,
              "predicted_probability": 0.001
            },
            {
              "actual": 0,
              "predicted_probability": 0.0063
            },
            {
              "actual": 0,
              "predicted_probability": 0.0731
            },
            {
              "actual": 0,
              "predicted_probability": 0.001
            },
            {
              "actual": 0,
              "predicted_probability": 0.3117
            },
            {
              "actual": 1,
              "predicted_probability": 0.9804
            },
            {
              "actual": 1,
              "predicted_probability": 0.9976
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 1,
              "predicted_probability": 0.986
            },
            {
              "actual": 1,
              "predicted_probability": 0.9942
            },
            {
              "actual": 1,
              "predicted_probability": 0.0591
            },
            {
              "actual": 0,
              "predicted_probability": 0.0077
            },
            {
              "actual": 1,
              "predicted_probability": 0.9804
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9908
            },
            {
              "actual": 1,
              "predicted_probability": 0.9972
            },
            {
              "actual": 1,
              "predicted_probability": 0.9989
            },
            {
              "actual": 1,
              "predicted_probability": 0.9882
            },
            {
              "actual": 1,
              "predicted_probability": 0.9869
            },
            {
              "actual": 0,
              "predicted_probability": 0.0011
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 0,
              "predicted_probability": 0.0162
            },
            {
              "actual": 1,
              "predicted_probability": 0.9988
            },
            {
              "actual": 0,
              "predicted_probability": 0.1068
            },
            {
              "actual": 1,
              "predicted_probability": 0.9798
            },
            {
              "actual": 1,
              "predicted_probability": 0.1071
            },
            {
              "actual": 1,
              "predicted_probability": 0.999
            },
            {
              "actual": 1,
              "predicted_probability": 0.9974
            },
            {
              "actual": 1,
              "predicted_probability": 0.9309
            },
            {
              "actual": 0,
              "predicted_probability": 0.9913
            },
            {
              "actual": 1,
              "predicted_probability": 0.9966
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9985
            },
            {
              "actual": 1,
              "predicted_probability": 0.9958
            },
            {
              "actual": 1,
              "predicted_probability": 0.9957
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 1,
              "predicted_probability": 0.9989
            },
            {
              "actual": 1,
              "predicted_probability": 0.9992
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 1,
              "predicted_probability": 0.9969
            },
            {
              "actual": 1,
              "predicted_probability": 0.9947
            },
            {
              "actual": 1,
              "predicted_probability": 0.8799
            },
            {
              "actual": 1,
              "predicted_probability": 0.0817
            },
            {
              "actual": 0,
              "predicted_probability": 0.0001
            },
            {
              "actual": 1,
              "predicted_probability": 0.9953
            },
            {
              "actual": 1,
              "predicted_probability": 0.9994
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.2383
            },
            {
              "actual": 1,
              "predicted_probability": 0.994
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9993
            },
            {
              "actual": 1,
              "predicted_probability": 0.9648
            },
            {
              "actual": 1,
              "predicted_probability": 0.9795
            },
            {
              "actual": 1,
              "predicted_probability": 0.9948
            },
            {
              "actual": 1,
              "predicted_probability": 0.9981
            },
            {
              "actual": 1,
              "predicted_probability": 0.9873
            },
            {
              "actual": 1,
              "predicted_probability": 0.905
            },
            {
              "actual": 1,
              "predicted_probability": 0.9977
            },
            {
              "actual": 1,
              "predicted_probability": 0.9938
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.98
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.6088
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 0,
              "predicted_probability": 0.0179
            },
            {
              "actual": 1,
              "predicted_probability": 0.9954
            },
            {
              "actual": 1,
              "predicted_probability": 0.7001
            },
            {
              "actual": 1,
              "predicted_probability": 0.9959
            },
            {
              "actual": 1,
              "predicted_probability": 0.9945
            },
            {
              "actual": 1,
              "predicted_probability": 0.4655
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 1,
              "predicted_probability": 0.9855
            },
            {
              "actual": 0,
              "predicted_probability": 0.0098
            },
            {
              "actual": 0,
              "predicted_probability": 0.4767
            },
            {
              "actual": 0,
              "predicted_probability": 0.3112
            },
            {
              "actual": 0,
              "predicted_probability": 0.0815
            },
            {
              "actual": 1,
              "predicted_probability": 0.9897
            },
            {
              "actual": 1,
              "predicted_probability": 0.6474
            },
            {
              "actual": 1,
              "predicted_probability": 0.9675
            },
            {
              "actual": 1,
              "predicted_probability": 0.9966
            },
            {
              "actual": 1,
              "predicted_probability": 0.9993
            },
            {
              "actual": 1,
              "predicted_probability": 0.0119
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 0,
              "predicted_probability": 0.0287
            },
            {
              "actual": 0,
              "predicted_probability": 0.0032
            },
            {
              "actual": 0,
              "predicted_probability": 0.0001
            },
            {
              "actual": 1,
              "predicted_probability": 0.9976
            },
            {
              "actual": 1,
              "predicted_probability": 0.9989
            },
            {
              "actual": 0,
              "predicted_probability": 0.221
            },
            {
              "actual": 0,
              "predicted_probability": 0.0005
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.0359
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 1,
              "predicted_probability": 0.9983
            },
            {
              "actual": 0,
              "predicted_probability": 0.0282
            },
            {
              "actual": 1,
              "predicted_probability": 0.988
            },
            {
              "actual": 0,
              "predicted_probability": 0.0683
            },
            {
              "actual": 0,
              "predicted_probability": 0.003
            },
            {
              "actual": 0,
              "predicted_probability": 0.0001
            },
            {
              "actual": 1,
              "predicted_probability": 0.7267
            },
            {
              "actual": 1,
              "predicted_probability": 0.9934
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9981
            },
            {
              "actual": 0,
              "predicted_probability": 0.0905
            },
            {
              "actual": 1,
              "predicted_probability": 0.9996
            },
            {
              "actual": 0,
              "predicted_probability": 0.0618
            },
            {
              "actual": 1,
              "predicted_probability": 0.9973
            },
            {
              "actual": 0,
              "predicted_probability": 0.0002
            },
            {
              "actual": 1,
              "predicted_probability": 0.9968
            },
            {
              "actual": 0,
              "predicted_probability": 0.0389
            },
            {
              "actual": 1,
              "predicted_probability": 0.017
            },
            {
              "actual": 0,
              "predicted_probability": 0.02
            },
            {
              "actual": 1,
              "predicted_probability": 0.9818
            },
            {
              "actual": 1,
              "predicted_probability": 0.8542
            },
            {
              "actual": 1,
              "predicted_probability": 0.9665
            },
            {
              "actual": 1,
              "predicted_probability": 0.998
            },
            {
              "actual": 1,
              "predicted_probability": 0.9884
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9921
            },
            {
              "actual": 0,
              "predicted_probability": 0.1904
            },
            {
              "actual": 1,
              "predicted_probability": 0.721
            },
            {
              "actual": 0,
              "predicted_probability": 0.0003
            },
            {
              "actual": 0,
              "predicted_probability": 0.0003
            },
            {
              "actual": 0,
              "predicted_probability": 0.7974
            },
            {
              "actual": 1,
              "predicted_probability": 0.9856
            },
            {
              "actual": 0,
              "predicted_probability": 0.3151
            },
            {
              "actual": 1,
              "predicted_probability": 0.9912
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9898
            },
            {
              "actual": 0,
              "predicted_probability": 0.0067
            },
            {
              "actual": 1,
              "predicted_probability": 0.9998
            },
            {
              "actual": 1,
              "predicted_probability": 0.996
            },
            {
              "actual": 1,
              "predicted_probability": 0.9978
            },
            {
              "actual": 1,
              "predicted_probability": 0.9983
            },
            {
              "actual": 0,
              "predicted_probability": 0.2165
            },
            {
              "actual": 1,
              "predicted_probability": 0.9984
            },
            {
              "actual": 0,
              "predicted_probability": 0.0379
            },
            {
              "actual": 1,
              "predicted_probability": 0.9409
            },
            {
              "actual": 1,
              "predicted_probability": 0.989
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.0082
            },
            {
              "actual": 0,
              "predicted_probability": 0.0191
            },
            {
              "actual": 0,
              "predicted_probability": 0.0337
            },
            {
              "actual": 1,
              "predicted_probability": 0.9975
            },
            {
              "actual": 0,
              "predicted_probability": 0.0047
            },
            {
              "actual": 1,
              "predicted_probability": 0.9777
            },
            {
              "actual": 1,
              "predicted_probability": 0.9936
            },
            {
              "actual": 0,
              "predicted_probability": 0.0247
            },
            {
              "actual": 1,
              "predicted_probability": 0.9971
            },
            {
              "actual": 0,
              "predicted_probability": 0.0177
            },
            {
              "actual": 1,
              "predicted_probability": 0.9717
            },
            {
              "actual": 0,
              "predicted_probability": 0.3128
            },
            {
              "actual": 0,
              "predicted_probability": 0.0084
            },
            {
              "actual": 1,
              "predicted_probability": 0.9997
            },
            {
              "actual": 1,
              "predicted_probability": 0.9331
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.1868
            },
            {
              "actual": 1,
              "predicted_probability": 0.9978
            },
            {
              "actual": 1,
              "predicted_probability": 0.9913
            },
            {
              "actual": 1,
              "predicted_probability": 0.995
            },
            {
              "actual": 1,
              "predicted_probability": 0.9916
            },
            {
              "actual": 1,
              "predicted_probability": 0.9385
            },
            {
              "actual": 1,
              "predicted_probability": 0.998
            },
            {
              "actual": 1,
              "predicted_probability": 0.9922
            },
            {
              "actual": 1,
              "predicted_probability": 0.0004
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 0,
              "predicted_probability": 0.0037
            },
            {
              "actual": 0,
              "predicted_probability": 0.0327
            },
            {
              "actual": 1,
              "predicted_probability": 0.9937
            },
            {
              "actual": 1,
              "predicted_probability": 0.9992
            },
            {
              "actual": 1,
              "predicted_probability": 0.9985
            },
            {
              "actual": 1,
              "predicted_probability": 0.9991
            },
            {
              "actual": 1,
              "predicted_probability": 0.9999
            },
            {
              "actual": 1,
              "predicted_probability": 0.8794
            },
            {
              "actual": 1,
              "predicted_probability": 0.9964
            },
            {
              "actual": 1,
              "predicted_probability": 0.9997
            },
            {
              "actual": 1,
              "predicted_probability": 0.3074
            },
            {
              "actual": 1,
              "predicted_probability": 0.9884
            },
            {
              "actual": 0,
              "predicted_probability": 0.0303
            },
            {
              "actual": 0,
              "predicted_probability": 0.0192
            },
            {
              "actual": 1,
              "predicted_probability": 0.9985
            },
            {
              "actual": 1,
              "predicted_probability": 0.9962
            },
            {
              "actual": 1,
              "predicted_probability": 0.9967
            },
            {
              "actual": 0,
              "predicted_probability": 0.1181
            },
            {
              "actual": 1,
              "predicted_probability": 0.9996
            },
            {
              "actual": 1,
              "predicted_probability": 0.3379
            },
            {
              "actual": 1,
              "predicted_probability": 0.9977
            },
            {
              "actual": 0,
              "predicted_probability": 0.0008
            },
            {
              "actual": 1,
              "predicted_probability": 0.9975
            },
            {
              "actual": 1,
              "predicted_probability": 0.9963
            },
            {
              "actual": 1,
              "predicted_probability": 0.9969
            },
            {
              "actual": 0,
              "predicted_probability": 0.0004
            },
            {
              "actual": 0,
              "predicted_probability": 0.1086
            },
            {
              "actual": 0,
              "predicted_probability": 0.2917
            },
            {
              "actual": 1,
              "predicted_probability": 0.9777
            },
            {
              "actual": 1,
              "predicted_probability": 0.9957
            },
            {
              "actual": 0,
              "predicted_probability": 0.0016
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 1,
              "predicted_probability": 0.9934
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            },
            {
              "actual": 0,
              "predicted_probability": 0.0854
            },
            {
              "actual": 1,
              "predicted_probability": 0.9109
            },
            {
              "actual": 1,
              "predicted_probability": 0.9979
            },
            {
              "actual": 1,
              "predicted_probability": 0.9175
            },
            {
              "actual": 0,
              "predicted_probability": 0.0487
            },
            {
              "actual": 1,
              "predicted_probability": 0.9723
            },
            {
              "actual": 1,
              "predicted_probability": 0.999
            },
            {
              "actual": 0,
              "predicted_probability": 0.0075
            },
            {
              "actual": 1,
              "predicted_probability": 0.9855
            },
            {
              "actual": 1,
              "predicted_probability": 0.9912
            },
            {
              "actual": 0,
              "predicted_probability": 0.0637
            },
            {
              "actual": 1,
              "predicted_probability": 0.9988
            },
            {
              "actual": 1,
              "predicted_probability": 1.0
            }
          ],
          "min": 0.0,
          "max": 1.0
        },
        "selected_roc_curve": {
          "path": "teste/artifacts/plots/logistic_regression_c_100_0_roc_curve.png",
          "auc": 0.9602
        }
      }
    }
  },
  "overview": {
    "best_regressor": "random_forest",
    "best_regressor_rmse": 5.1838,
    "best_classifier": "logistic_regression",
    "best_classifier_accuracy": 0.945
  }
};
