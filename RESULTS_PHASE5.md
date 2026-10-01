# Phase 5 Results

**Author: Biswajit Jana**

Phase 5 turns the repository from a collection of background models into a framework that begins to connect early-universe dynamics with observables.

## 1. Horizon engine

The new horizon module evaluates

$$
\eta(a)=\frac{1}{H_0}\int \frac{da}{a^2E(a)},
$$

$$
\chi_p(a)=c\int_{t_i}^{t}\frac{dt'}{a(t')},
$$

$$
\chi_e(a)=c\int_t^\infty\frac{dt'}{a(t')},
$$

and the comoving Hubble radius

$$
R_H^{\rm comoving}=(aH)^{-1}.
$$

This replaces the informal room-with-walls analogy with explicit causal integrals. The observable universe is bounded by causal history, not by a material edge.

![Horizon engine](assets/figures/phase4_horizon_engine.svg)

## 2. Inflationary parameter sweep

The slow-roll engine solves the end of inflation from

$$
\epsilon_V(\phi_{\rm end})=1,
$$

then solves

$$
N=\int_{\phi_{\rm end}}^{\phi_*}\frac{V}{V_{,\phi}}\,d\phi
$$

for each requested e-fold number.

At **N = 60**, the current first-order calculations give:

| Model | $\phi_{\rm end}/M_{\rm Pl}$ | $\phi_*/M_{\rm Pl}$ | $n_s$ | $r$ |
|---|---:|---:|---:|---:|
| Quadratic $V\propto\phi^2$ | 1.4142 | 15.5563 | 0.96694 | 0.13223 |
| Starobinsky-type plateau | 0.9402 | 5.4532 | 0.96783 | 0.002964 |

These numbers illustrate a central point: two models can produce a similar scalar tilt while predicting very different tensor amplitudes.

Using the documented benchmark bound $r_{0.05}<0.036$, the simple quadratic model's first-order $N\approx60$ prediction lies above that limit, whereas the Starobinsky-type prediction lies below it. This is a model-level comparison, not a statement that inflation itself has been proved or disproved.

![Phase 5 n_s-r comparison](assets/figures/phase5_ns_r_models.svg)

## 3. Primordial perturbation benchmark

The Phase-5 perturbation module numerically integrates

$$
v_k''+\left(k^2-\frac{2}{\eta^2}\right)v_k=0
$$

for the exact de-Sitter benchmark. The analytic Bunch-Davies solution is

$$
v_k(\eta)=\frac{e^{-ik\eta}}{\sqrt{2k}}\left(1-\frac{i}{k\eta}\right).
$$

For the benchmark run with $k=1$, $\eta_i=-80$ and $\eta_f=-0.2$, the numerical and analytic late-time amplitudes agree to a relative difference of approximately

$$
5.1\times10^{-11}.
$$

That validates the numerical mode-equation implementation for this benchmark. It does not yet validate an arbitrary inflationary potential; the next step is to feed a numerically evolved background into $z''/z$.

![Mukhanov-Sasaki benchmark](assets/figures/phase5_mukhanov_sasaki.svg)

## 4. What Phase 5 can and cannot claim

Phase 5 can now compute causal horizons from an expansion history, solve slow-roll end conditions and e-fold integrals, map concrete inflationary potentials into $(n_s,r)$, compare those predictions with documented observational benchmark bands, and numerically solve a primordial-mode benchmark against a known analytic solution.

Phase 5 cannot yet solve the full Coleman-De Luccia gravitational bounce for an arbitrary landscape potential, define a unique probability measure for eternal inflation, solve a physically complete Wheeler-DeWitt cosmology, run a full multi-experiment CMB/LSS likelihood analysis, or establish that a multiverse exists. Those tasks belong to later phases.