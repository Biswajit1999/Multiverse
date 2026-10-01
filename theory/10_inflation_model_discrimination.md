# Inflation model discrimination in the $(n_s,r)$ plane

For a canonical single-field potential $V(\phi)$, first-order potential slow-roll parameters are

$$
\epsilon_V=\frac{M_{\rm Pl}^2}{2}\left(\frac{V_{,\phi}}{V}\right)^2,
\qquad
\eta_V=M_{\rm Pl}^2\frac{V_{,\phi\phi}}{V}.
$$

To first order,

$$
n_s\simeq 1-6\epsilon_V+2\eta_V,
\qquad
r\simeq16\epsilon_V.
$$

The remaining e-fold number is approximately

$$
N\simeq\frac{1}{M_{\rm Pl}^2}
\int_{\phi_{\rm end}}^{\phi_*}\frac{V}{V_{,\phi}}d\phi.
$$

This repository evaluates these equations numerically rather than hard-coding only asymptotic formulas.

Two transparent comparison models are included:

1. Quadratic potential $V=m^2\phi^2/2$.
2. Starobinsky-type Einstein-frame potential

$$
V(\phi)=V_0\left(1-e^{-\sqrt{2/3}\,\phi/M_{\rm Pl}}\right)^2.
$$

Planck 2018 reported $n_s=0.9649\pm0.0042$ (68% CL in the cited baseline analysis). The BICEP/Keck analysis through the 2018 observing season reported $r_{0.05}<0.036$ at 95% confidence. These are used here as documented benchmark constraints, not claimed to be a complete 2026 global likelihood.

The point of the $(n_s,r)$ plot is methodological: two mathematically viable inflationary potentials can occupy very different regions of observable parameter space, allowing data to reject specific models even when it cannot answer the broader philosophical question of whether a multiverse exists.
