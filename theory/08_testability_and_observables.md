# Testability: how could origin models be distinguished?

A cosmological origin model is most useful when it maps into quantities that can be measured.

## Scalar perturbations

$$
\mathcal P_{\mathcal R}(k)
\approx
\frac{H_*^2}{8\pi^2M_{\rm Pl}^2\epsilon_*}.
$$

The spectral index is

$$
n_s-1=\frac{d\ln\mathcal P_{\mathcal R}}{d\ln k}.
$$

Planck 2018 found $n_s=0.9649\pm0.0042$ in the cited baseline analysis.

## Tensor perturbations

$$
\mathcal P_T(k)\approx
\frac{2H_*^2}{\pi^2M_{\rm Pl}^2},
\qquad
r=\frac{\mathcal P_T}{\mathcal P_{\mathcal R}}.
$$

In canonical slow roll,

$$
r\approx16\epsilon_*.
$$

BICEP/Keck data through the 2018 observing season constrained $r_{0.05}<0.036$ at 95% confidence.

## Other observables

- primordial non-Gaussianity;
- running/features in the scalar spectrum;
- spatial curvature;
- cosmic topology;
- stochastic gravitational-wave spectra;
- relics from phase transitions;
- bubble-collision signatures proposed in some eternal-inflation models;
- model-specific bounce/cyclic features.

## Falsifiability rule used in this repository

Each implemented scenario should contain a table with four columns:

| Model | Required assumptions | Computable observables | Failure condition |
|---|---|---|---|
| Slow-roll inflation | scalar field + potential + GR | $n_s,r,N$ | insufficient e-folds or excluded spectrum |
| Reheating | inflaton coupling/decay rate | $T_{\rm reh}$, radiation domination | fails to thermalize before required epoch |
| False-vacuum bubble | metastable potential + bounce solution | nucleation action/rate | no admissible bounce or incompatible history |
| Effective bounce | modified Friedmann dynamics | $a_{\min}$, spectra if specified | instability or excluded signatures |
| Cyclic/ekpyrotic | contracting smoothing phase + transition | spectral/NG/GW predictions | transition inconsistency or excluded spectra |

The broad word "multiverse" is not itself falsified by the failure of one implementation. Specific models can be.
