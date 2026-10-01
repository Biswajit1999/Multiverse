# Reproducibility

## Environment

Python 3.10+ is supported.

~~~bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
python -m pip install --upgrade pip
pip install -e ".[dev]"
pytest -q
python scripts/run_phase10.py
jupyter lab
~~~

## Numerical benchmarks

The test suite includes analytic or limiting checks for FLRW expansion, effective-bounce critical density, slow-roll end conditions, Starobinsky low-$r$ behaviour, de-Sitter Mukhanov–Sasaki modes, the Fubini–Lipatov bounce action, de-Sitter CDL geometry and gravitational constraint, the Wheeler–DeWitt WKB barrier action, and compressed inflation-constraint logic.

## Scope

The code reproduces the calculations defined in this repository. It does not reproduce full Planck, ACT, SPT, BICEP/Keck or DESI likelihood pipelines. Current observational numbers are stored as versioned compressed benchmarks in `data/constraints_2026.json`.

`python scripts/run_phase10.py` writes the deterministic release summary `results/benchmark_results.json`.
