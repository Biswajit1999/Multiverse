# Model Status Matrix

| Model class | Core mechanism | Main equations implemented | Observable bridge | Current status in this repository |
|---|---|---|---|---|
| Hot Big Bang / FLRW | Expansion of homogeneous isotropic spacetime | Friedmann + continuity equations | distances, horizons, thermal history | Baseline reference |
| Slow-roll inflation | Scalar-field accelerated expansion | Klein–Gordon + Friedmann + slow-roll hierarchy | $n_s$, $r$, $N$ | Implemented and parameter-scanned |
| Reheating | Inflaton energy transferred to radiation | coupled $\rho_\phi$/$\rho_R$ equations | radiation domination, $T_{\rm reh}$ scaling | Implemented phenomenologically |
| False-vacuum decay | Quantum tunnelling between vacua | CDL Euclidean scalar–gravity equations; thin-wall/HM limits | nucleation exponent, possible collision signatures | Equations + diagnostics implemented; generic bounce shooting remains model-dependent |
| Eternal inflation | Expansion outpaces local end of inflation | stochastic quantum/classical field-step ratio | indirect/model-specific only | Diagnostic criterion implemented; no probability measure asserted |
| Effective LQC bounce | high-density modified Friedmann dynamics | $H^2\propto\rho(1-\rho/\rho_c)$ | possible primordial-spectrum modifications | Background toy model implemented |
| Cyclic / ekpyrotic | contraction and transition to expansion | equation-of-state and scale-factor models | spectrum/non-Gaussianity/GW signatures | Theory layer; full perturbation model not yet unique |
| Wheeler–DeWitt minisuperspace | quantum Hamiltonian constraint | $[-\partial_a^2+U(a)]\Psi=0$ | boundary-state weights, semiclassical histories | Numerical toy solver + WKB benchmark |
| No-boundary / tunnelling proposals | alternative wave-function boundary prescriptions | semiclassical WKB diagnostics | indirect; interpretation dependent | Compared conceptually, not treated as probabilities |
| Bubble-collision phenomenology | collisions of nucleated regions | not yet a full collision spacetime solver | CMB/curvature signatures | Literature-mapped future extension |

## Scientific rule

A mathematically allowed solution is not labelled evidence. Every model is separated into assumptions, equations, initial/boundary conditions, numerical implementation, observables, failure conditions, and empirical status.
