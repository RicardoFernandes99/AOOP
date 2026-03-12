from __future__ import annotations

from build_model_artifacts import build_bundle, write_bundle
from model_common import ARTIFACTS_DIR, MODELS_DIR, STATS_DIR, require_ml_dependencies


def main() -> None:
    require_ml_dependencies()
    bundle = build_bundle()
    write_bundle(bundle)

    print("Training complete.")
    print(f"Bundle directory: {ARTIFACTS_DIR}")
    print(f"Models directory: {MODELS_DIR}")
    print(f"Stats directory: {STATS_DIR}")


if __name__ == "__main__":
    main()
