# Multiverse Cosmology Lab

**Author: Biswajit Jana**

A research-driven computational project asking a precise question:

> **What physical mechanisms could generate the hot Big Bang state, what do their equations predict, and can observations distinguish them?**

This repository does **not** assume that a multiverse exists. It treats eternal inflation, false-vacuum bubbles, quantum-cosmology boundary conditions, bounces and cyclic histories as competing model classes whose assumptions and consequences can be calculated.

## Current research status — Phase 5 / 10

The project has moved beyond the initial cosmology scaffold. It now contains background dynamics, reheating and bounce models, causal-horizon calculations, inflationary parameter sweeps, first-order primordial observables and a numerical Mukhanov-Sasaki benchmark.

The key Phase-5 question is no longer simply *"could this model exist?"* but:

> **What does this model predict, and can those predictions survive observation?**

See [ROADMAP.md](ROADMAP.md) and [RESULTS_PHASE5.md](RESULTS_PHASE5.md).

## Central physical problem

The hot Big Bang describes an early hot, dense, expanding state. It does not by itself supply a unique physical explanation for why that state existed.

Inflation followed by reheating supplies one concrete transition mechanism:

$$
\dot\rho_\phi+3H(1+w_\phi)\rho_\phi=-\Gamma_\phi\rho_\phi,
$$

$$
\dot\rho_R+4H\rho_R=\Gamma_\phi\rho_\phi,
$$

$$
H^2=\frac{\rho_\phi+\rho_R}{3M_{\rm Pl}^2}.
$$

When radiation dominates, the usual hot Big Bang thermal history begins. This can explain how an earlier vacuum-dominated state becomes hot; it does not yet explain why the earlier state existed.

Read the full argument in [REPORT.md](REPORT.md) and [theory/06_why_hot_big_bang.md](theory/06_why_hot_big_bang.md).

## Scientific model map

![Cosmic origin model map](assets/figures/cosmic_origin_model_map.svg)

The diagram separates several model classes capable of extending the standard hot-Big-Bang history: inflation/reheating, false-vacuum bubble nucleation, bounce/cyclic cosmology and quantum-boundary proposals. They do not have the same assumptions or empirical status.

## Phase 4 — causal structure

For an FLRW history,

$$
\eta(a)=\frac{1}{H_0}\int^a\frac{da'}{a'^2E(a')},
$$

$$
\chi_p(t)=c\int_{t_i}^{t}\frac{dt'}{a(t')},
\qquad
\chi_e(t)=c\int_t^\infty\frac{dt'}{a(t')},
$$

and the comoving Hubble radius is

$$
(aH)^{-1}.
$$

These quantities make the phrase "outside our universe" more precise: the observable boundary is a causal horizon, not a material wall.

![Horizon engine](assets/figures/phase4_horizon_engine.svg)

Implementation: [src/multiverse_cosmology/horizons.py](src/multiverse_cosmology/horizons.py)  
Notebook: [code/notebooks/03_horizon_structure.ipynb](code/notebooks/03_horizon_structure.ipynb)

## Phase 5 — inflation model discrimination

For a canonical single-field potential,

$$
\epsilon_V=
\frac{M_{\rm Pl}^2}{2}
\left(\frac{V_{,\phi}}{V}\right)^2,
\qquad
\eta_V=
M_{\rm Pl}^2\frac{V_{,\phi\phi}}{V},
$$

with first-order predictions

$$
n_s\simeq1-6\epsilon_V+2\eta_V,
\qquad
r\simeq16\epsilon_V.
$$

The e-fold number is computed from

$$
N\simeq
\frac{1}{M_{\rm Pl}^2}
\int_{\phi_{\rm end}}^{\phi_*}
\frac{V}{V_{,\phi}}\,d\phi.
$$

At $N=60$, the current calculation gives:

| Model | $n_s$ | $r$ |
|---|---:|---:|
| Quadratic $V\propto\phi^2$ | 0.96694 | 0.13223 |
| Starobinsky-type plateau | 0.96783 | 0.002964 |

The two models have similar scalar tilt but very different tensor predictions. Against the documented BICEP/Keck benchmark $r_{0.05}<0.036$, the simple quadratic prediction at $N\simeq60$ lies above the limit, while the Starobinsky-type prediction lies below it.

![Inflation model map](assets/figures/phase5_ns_r_models.svg)

Implementation: [src/multiverse_cosmology/slowroll.py](src/multiverse_cosmology/slowroll.py) and [src/multiverse_cosmology/potentials.py](src/multiverse_cosmology/potentials.py)  
Notebook: [code/notebooks/04_inflation_model_sweep.ipynb](code/notebooks/04_inflation_model_sweep.ipynb)

## Phase 5 — primordial perturbations

Scalar perturbations satisfy the Mukhanov-Sasaki equation

$$
v_k''+\left(k^2-\frac{z''}{z}\right)v_k=0,
\qquad
z=a\frac{\dot\phi}{H}.
$$

The present numerical benchmark uses the exact de-Sitter form

$$
v_k''+\left(k^2-\frac{2}{\eta^2}\right)v_k=0,
$$

whose Bunch-Davies solution is

$$
v_k(\eta)=
\frac{e^{-ik\eta}}{\sqrt{2k}}
\left(1-\frac{i}{k\eta}\right).
$$

For the current $k=1$ validation run, the numerical and analytic late-time amplitudes agree at roughly $5.1\times10^{-11}$ relative difference. This validates the benchmark integrator, not a complete arbitrary-background perturbation calculation.

![Mukhanov-Sasaki benchmark](assets/figures/phase5_mukhanov_sasaki.svg)

Implementation: [src/multiverse_cosmology/perturbations.py](src/multiverse_cosmology/perturbations.py)  
Notebook: [code/notebooks/05_mukhanov_sasaki.ipynb](code/notebooks/05_mukhanov_sasaki.ipynb)

## Other origin mechanisms under investigation

### False-vacuum decay

$$
\frac{\Gamma}{V}\sim A\exp\left(-\frac{B}{\hbar}\right),
$$

where the Euclidean bounce action controls the semiclassical nucleation rate. A full Coleman-De Luccia numerical solver is the Phase-6 target.

### Effective bounce example

$$
H^2=
\frac{8\pi G}{3}\rho
\left(1-\frac{\rho}{\rho_c}\right).
$$

![Bounce comparison](assets/figures/bounce_vs_singularity.svg)

### Quantum cosmology

A canonical quantum-cosmology treatment leads schematically to the Wheeler-DeWitt constraint

$$
\hat{\mathcal H}\Psi[h_{ij},\phi]=0.
$$

The repository treats no-boundary and tunneling proposals as alternative boundary prescriptions to be investigated, not established descriptions of the origin of the universe.

## What "before the Big Bang" can mean

The phrase may refer to an earlier classical phase, inflation before reheating, contraction before a bounce, an inflating false vacuum outside a bubble, a quantum boundary rather than earlier classical time, or no classical "before" at all in a particular proposal.

See:

- [theory/06_why_hot_big_bang.md](theory/06_why_hot_big_bang.md)
- [theory/07_singularity_and_past_boundary.md](theory/07_singularity_and_past_boundary.md)
- [theory/09_horizons_and_causality.md](theory/09_horizons_and_causality.md)
- [theory/10_inflation_model_discrimination.md](theory/10_inflation_model_discrimination.md)
- [theory/11_primordial_perturbations.md](theory/11_primordial_perturbations.md)

## Repository structure

~~~text
Multiverse/
├── README.md
├── REPORT.md
├── RESULTS_PHASE5.md
├── ROADMAP.md
├── theory/
│   ├── 01_big_bang_and_horizons.md
│   ├── ...
│   ├── 09_horizons_and_causality.md
│   ├── 10_inflation_model_discrimination.md
│   └── 11_primordial_perturbations.md
├── src/multiverse_cosmology/
│   ├── friedmann.py
│   ├── inflation.py
│   ├── reheating.py
│   ├── bounce.py
│   ├── horizons.py
│   ├── potentials.py
│   ├── slowroll.py
│   └── perturbations.py
├── code/
│   ├── notebooks/
│   │   ├── 01_friedmann_scale_factor.ipynb
│   │   ├── 02_scalar_field_inflation.ipynb
│   │   ├── 03_horizon_structure.ipynb
│   │   ├── 04_inflation_model_sweep.ipynb
│   │   └── 05_mukhanov_sasaki.ipynb
│   └── visualizations/
├── assets/figures/
├── tests/
└── references/references.bib
~~~

## Reproduce the calculations

~~~bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
pytest
jupyter lab
~~~

The new Phase-4/5 numerical modules were locally validated with seven focused tests, including analytic slow-roll checks and numerical/analytic agreement for the de-Sitter mode equation.

## Scientific standard used here

A model is not promoted merely because its equations admit an interesting solution. Each theory is expected to state:

1. assumptions;
2. governing equations;
3. initial/boundary conditions;
4. numerical implementation;
5. predicted observables;
6. known degeneracies;
7. failure conditions;
8. current empirical status.

The project therefore aims to turn the broad question "what happened before the Big Bang?" into a sequence of falsifiable or at least quantitatively constrained sub-problems.

## Primary literature

The bibliography includes Guth, Starobinsky, Coleman-De Luccia, Linde, Hartle-Hawking, Vilenkin, Mukhanov, Sasaki, Hawking-Penrose, Borde-Guth-Vilenkin, Steinhardt-Turok, Ashtekar-Singh, Planck and BICEP/Keck.

See [references/references.bib](references/references.bib).

## Authorship

**Biswajit Jana, 2026.**

The purpose of this repository is to make the reasoning reproducible: equations, assumptions, numerical experiments, citations, tests and failure modes are kept together rather than presenting speculative cosmology as settled fact.
