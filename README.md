# Multiverse Cosmology Lab

**Author: Biswajit Jana**

An open research-and-education project exploring what modern cosmology can — and cannot — say about cosmic origins, inflation, multiverse scenarios, and the question: **what, if anything, preceded the hot Big Bang?**

> **Scientific status:** The hot Big Bang, cosmic expansion, the CMB, primordial nucleosynthesis, and large-scale structure are strongly supported by observation. Inflation is a major early-universe framework with successful predictions but an unknown underlying microphysics. Eternal inflation and multiverse scenarios arise in some models but are not empirically established.

## Core questions

- What does the Big Bang model actually describe?
- Does spacetime necessarily begin at the hot Big Bang?
- How do Friedmann-Lemaître-Robertson-Walker (FLRW) cosmologies evolve?
- How can scalar-field inflation produce accelerated expansion?
- Under what assumptions can inflation become eternal?
- What do "bubble universes" mean mathematically?
- What observations could distinguish competing early-universe models?
- Where does physics end and speculation begin?

## Repository map

```text
Multiverse/
├── README.md
├── LICENSE
├── requirements.txt
├── CITATION.cff
├── theory/
│   ├── 01_big_bang_and_horizons.md
│   ├── 02_flrw_and_friedmann.md
│   ├── 03_inflation_and_eternal_inflation.md
│   ├── 04_multiverse_frameworks.md
│   └── 05_scientific_status.md
├── code/
│   ├── notebooks/
│   │   ├── 01_friedmann_scale_factor.ipynb
│   │   └── 02_scalar_field_inflation.ipynb
│   └── src/
│       ├── friedmann.py
│       └── inflation.py
├── images/
│   └── PROMPTS.md
├── tests/
│   ├── test_friedmann.py
│   └── test_inflation.py
└── references/
    └── references.bib
```

## First simulations

### 1. FLRW / Friedmann evolution

[
H^2(a)=H_0^2left(Omega_r a^{-4}+Omega_m a^{-3}+Omega_k a^{-2}+Omega_Lambdaight),
]

with

[
dot a = aH(a).
]

### 2. Scalar-field inflation

[
ddotphi+3Hdotphi+V_{,phi}=0,
]

[
H^2=rac{1}{3M_{m Pl}^2}left(rac{1}{2}dotphi^2+V(phi)ight).
]

The starter implementation uses a quadratic toy potential for pedagogy. It is **not** presented as the preferred observational model.

## Scientific framing

Some inflationary potentials can enter an **eternal-inflation** regime in which quantum fluctuations prevent inflation from ending everywhere at once. Reheating can then occur in separated regions, sometimes described as pocket or bubble universes. This is a theoretical consequence of particular models — not direct observational evidence of other universes.

Likewise, asking "what came before the Big Bang?" is model-dependent. The hot Big Bang describes an early hot, dense phase and subsequent expansion; it does not by itself establish an absolute beginning of all spacetime.

## Reproducibility

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
pytest
jupyter lab
```

## Authorship

This project is authored and curated by **Biswajit Jana**. Scientific claims, citations, equations, simulations, and conclusions should be independently checked before publication.
