# Multiverse Cosmology Lab

**Author: Biswajit Jana**

An open research-and-education project exploring what modern cosmology can — and cannot — say about cosmic origins, inflation, multiverse scenarios, and the question: **what, if anything, preceded the hot Big Bang?**

> **Scientific status:** The hot Big Bang, cosmic expansion, the CMB, primordial nucleosynthesis, and large-scale structure are strongly supported by observation. Inflation is a major early-universe framework with successful predictions but unknown underlying microphysics. Eternal inflation and multiverse scenarios arise in some models but are not empirically established.

## Core questions

- What does the Big Bang model actually describe?
- Does spacetime necessarily begin at the hot Big Bang?
- How do FLRW cosmologies evolve?
- How can scalar-field inflation produce accelerated expansion?
- Under what assumptions can inflation become eternal?
- What do "bubble universes" mean mathematically?
- What observations could distinguish competing early-universe models?
- Where does physics end and speculation begin?

## Repository map

~~~text
Multiverse/
├── README.md
├── LICENSE
├── CITATION.cff
├── pyproject.toml
├── requirements.txt
├── theory/
│   ├── 01_big_bang_and_horizons.md
│   ├── 02_flrw_and_friedmann.md
│   ├── 03_inflation_and_eternal_inflation.md
│   ├── 04_multiverse_frameworks.md
│   └── 05_scientific_status.md
├── code/
│   └── notebooks/
│       ├── 01_friedmann_scale_factor.ipynb
│       └── 02_scalar_field_inflation.ipynb
├── src/
│   └── multiverse_cosmology/
│       ├── __init__.py
│       ├── friedmann.py
│       └── inflation.py
├── images/
│   └── PROMPTS.md
├── tests/
│   ├── test_friedmann.py
│   └── test_inflation.py
└── references/
    └── references.bib
~~~

## First simulations

### 1. FLRW / Friedmann evolution

$$
H^2(a)=H_0^2\left(\Omega_r a^{-4}+\Omega_m a^{-3}+\Omega_k a^{-2}+\Omega_\Lambda\right)
$$

with

$$
\dot a = aH(a)
$$

The notebook numerically integrates the background scale-factor evolution and visualizes $a(t)$.

### 2. Scalar-field inflation

For a homogeneous canonical inflaton $\phi$,

$$
\ddot\phi+3H\dot\phi+V_{,\phi}=0
$$

$$
H^2=\frac{1}{3M_{\rm Pl}^2}\left(\frac{1}{2}\dot\phi^2+V(\phi)\right)
$$

The starter implementation uses a quadratic toy potential for pedagogy. It is **not** presented as the preferred observational model.

## What this project currently finds

Some inflationary potentials can enter an **eternal-inflation** regime in which quantum fluctuations prevent inflation from ending everywhere at once. Reheating can then occur in separated regions, often described as pocket or bubble universes. That is a theoretical consequence of particular models — not direct observational evidence of other universes.

The question **"what came before the Big Bang?"** remains open and model-dependent. The hot Big Bang describes an early hot, dense phase and the subsequent expansion; it does not by itself establish an absolute beginning of all spacetime. Proposed extensions include inflationary, bouncing, cyclic, quantum-cosmological, and no-boundary scenarios, none of which is currently established as the unique pre-Big-Bang history.

## Scientific-status labels

Theory pages distinguish:

- **Established observation**
- **Standard-model inference**
- **Supported but model-dependent**
- **Speculative / active research**
- **Illustrative visualization only**

## Reproducibility

~~~bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
pytest
jupyter lab
~~~

The numerical package uses a conventional src/ layout so that it does not shadow Python standard-library modules. The starter validation suite currently contains six basic tests covering expansion behavior, potential positivity, solver success, and invalid inputs.

## Visual language

AI-generated art in this project is used only as **conceptual illustration**. Any multiverse image should carry the caption:

> Conceptual illustration — not observational evidence.

See [images/PROMPTS.md](images/PROMPTS.md) for the initial visual briefs.

## Authorship and research practice

This project is authored and curated by **Biswajit Jana**. Computational and AI tools may assist literature discovery, coding, editing, and conceptual visualization, but the repository does not treat tool output as scientific authority. References, equations, simulations, and conclusions should be checked against primary literature before publication.
