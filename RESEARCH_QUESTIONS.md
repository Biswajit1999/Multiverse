# Research Questions and Findings

**Author: Biswajit Jana · Multiverse Cosmology Lab · 2026**

This file is the question-led map of the project. It is intentionally different from a roadmap: each item starts with a scientific question, states what was calculated, identifies the evidence used, and records what can and cannot presently be concluded.

## Q1 — What does the Big Bang actually describe?

**Finding:** the observationally successful hot-Big-Bang model describes an early hot, dense, expanding state and its subsequent thermal evolution. It does not by itself prove that all spacetime began at a single classical instant.

The background is governed by

$$
H^2=\frac{8\pi G}{3}\rho-\frac{kc^2}{a^2}+\frac{\Lambda c^2}{3},
$$

together with

$$
\dot\rho+3H\left(\rho+\frac{p}{c^2}\right)=0.
$$

**Code:** `src/multiverse_cosmology/friedmann.py`  
**Notebook:** `code/notebooks/01_friedmann_scale_factor.ipynb`

---

## Q2 — Can a pre-hot-Big-Bang state generate the hot universe rather than merely assume it?

**Finding:** yes, in a concrete inflation-plus-reheating model. The scalar field drives accelerated expansion and its energy is then transferred into radiation:

$$
\ddot\phi+3H\dot\phi+V_{,\phi}=0,
$$

$$
\dot\rho_\phi+3H(1+w_\phi)\rho_\phi=-\Gamma_\phi\rho_\phi,
$$

$$
\dot\rho_R+4H\rho_R=\Gamma_\phi\rho_\phi.
$$

When $\rho_R$ becomes dominant, the calculation has entered the hot radiation-dominated regime.

**Code:** `inflation.py`, `reheating.py`  
**Notebook:** `02_scalar_field_inflation.ipynb`

**Interpretation:** this gives a physical route *into* the hot Big Bang. It does not explain why the inflating state existed in the first place.

---

## Q3 — If several origin models are mathematically possible, can present data distinguish them?

**Finding:** yes for specific implementations.

For first-order single-field slow roll,

$$
n_s\simeq1-6\epsilon_V+2\eta_V,
\qquad
r\simeq16\epsilon_V.
$$

At $N=60$ the repository obtains:

| Model | $n_s$ | $r$ | Current compressed diagnostic |
|---|---:|---:|---|
| Quadratic $V\propto\phi^2$ | 0.96694 | 0.13223 | tensor amplitude above the current bound |
| Starobinsky-type plateau | 0.96783 | 0.002964 | low-$r$ region remains viable |

The website also plots released NASA/LAMBDA TT-spectrum measurements from Planck 2018 and ACT DR6.

**Code:** `slowroll.py`, `perturbations.py`, `constraints.py`  
**Notebooks:** `04_inflation_model_sweep.ipynb`, `05_mukhanov_sasaki.ipynb`, `08_constraints_2026.ipynb`

---

## Q4 — Why is the project's one-word working answer “Inflation”?

**Working conclusion:** **Inflation** — more precisely **inflation followed by reheating**.

This is the project's leading mechanism because it passes a four-step chain that the other implemented origin classes do not yet match as completely:

1. it supplies explicit pre-hot-Big-Bang dynamics;
2. reheating produces a hot radiation bath;
3. quantum fluctuations become calculable primordial perturbations;
4. those perturbations map into observables that can be confronted with the CMB.

This is a **working scientific conclusion**, not a proof that inflation is the unique history of nature.

---

## Q5 — Does inflation automatically imply a multiverse?

**Finding:** no.

Some inflationary potentials can enter a stochastic self-reproduction regime. A useful local diagnostic is

$$
\mathcal R_{\rm EI}
=\frac{\delta\phi_q}{\delta\phi_{\rm cl}}
\simeq
\frac{3H^3}{2\pi|V_{,\phi}|}.
$$

When this ratio exceeds unity, quantum fluctuations can dominate the classical drift locally. In some models that leads to eternal inflation and separated reheating regions.

**But:** eternal inflation is model dependent; a probability measure over an infinite inflating spacetime is unresolved; and no other pocket universe has been directly observed.

---

## Q6 — Where would “other universes” be?

The phrase must be defined before it can be located.

- Regions beyond our present particle horizon can exist in ordinary FLRW cosmology; they are not automatically separate universes.
- Pocket universes in eternal-inflation models are causally separated reheating regions embedded in a larger inflating spacetime.
- Different branches of a quantum state are a different concept again.

There is currently no astronomical coordinate that points to a confirmed external universe.

The project therefore replaces “where is the multiverse?” with the calculable question: **what spacetime and field dynamics would generate causally disconnected regions, and what observable relic could such dynamics leave in our region?**

---

## Q7 — Could the universe have bounced or cycled instead?

**Finding:** mathematically, yes in specified effective models.

The repository implements the effective bounce equation

$$
H^2=\frac{8\pi G}{3}\rho\left(1-\frac{\rho}{\rho_c}\right),
$$

which reaches $H=0$ at $\rho=\rho_c$ and avoids the classical $a=0$ evolution in that effective description.

**Open problem:** a successful background bounce is not enough. A full model must also provide stable perturbations, a physically justified high-density theory, and observational predictions competitive with inflation.

---

## Q8 — Could “before” be a quantum boundary rather than an earlier classical time?

**Finding:** this is a legitimate model class but not an empirically selected answer.

The Wheeler–DeWitt minisuperspace experiment solves

$$
\left[-\frac{d^2}{da^2}+U(a)\right]\Psi(a)=0.
$$

The code reproduces an analytic WKB barrier integral in its controlled toy model. No-boundary and tunnelling proposals correspond to different boundary prescriptions, but the project does not turn their semiclassical weights into measured probabilities.

---

## Q9 — What would change the working conclusion?

The conclusion should move if a competing origin model does one of the following better:

- produces a stable hot universe from explicit prior dynamics;
- predicts the measured primordial spectrum with fewer unsupported assumptions;
- makes a distinctive signal that is detected;
- or inflationary predictions fail future precision tests.

This is why the repository stores failure conditions alongside equations.

---

# Author's current synthesis

> **One word: Inflation.**
>
> **One sentence:** Inflation followed by reheating is the strongest testable bridge found in this project between a pre-hot-Big-Bang state and the hot, structured universe measured today.
>
> **One unresolved frontier:** what selected the inflating state — and whether its global completion contains other universes — remains open.
