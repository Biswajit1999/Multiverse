# Observational status in 2026

The most useful observational connection for this project is currently the primordial spectrum rather than a direct observation of another universe.

A 2026 synthesis using Planck, the South Pole Telescope, Atacama Cosmology Telescope, and BICEP/Keck data reports

$$
n_s=0.9682\pm0.0032,
\qquad
r<0.034\quad(95\%\;\text{CL}),
$$

for the cited CMB combination. Adding DESI BAO changes the reported scalar tilt to

$$
n_s=0.9728\pm0.0029,
$$

while having negligible effect on the tensor bound in that analysis. The upward shift in $n_s$ is associated with mild differences between CMB and DESI fits and should not be treated as a settled discovery of new inflationary physics.

The repository keeps both CMB-only and CMB+DESI compressed benchmarks rather than hiding this dataset dependence.

## Consequences for simple inflationary models

At first slow-roll order and $N=60$:

- quadratic $V\propto\phi^2$ gives $n_s\simeq0.9669$ and $r\simeq0.132$, which is far above the quoted tensor upper bound;
- a Starobinsky-type plateau gives $n_s\simeq0.9678$ and $r\simeq0.0030$, consistent with the tensor bound but affected by the upward $n_s$ shift when DESI BAO is included;
- leading-order $\alpha$-attractor predictions provide a flexible family for exploring the $n_s$ shift.

These are compressed diagnostic comparisons, not substitutes for full likelihood evaluation with nuisance parameters and covariance.

## Sources

- Planck Collaboration (2020), *Planck 2018 results. X. Constraints on inflation*.
- Balkenhol et al. (2026), *Inflation at the End of 2025: Constraints on r and n_s Using the Latest CMB and BAO Data*.
- ACT Collaboration DR6 extended-model analyses.
- 2026 *Physical Review D* analysis of primordial-spectrum constraints using CMB and DESI DR2.
