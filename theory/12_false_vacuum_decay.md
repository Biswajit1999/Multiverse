# False-vacuum decay, Coleman–De Luccia tunnelling, and eternal inflation

A cosmological multiverse is not implied by the Friedmann equations alone. One concrete route appears when a scalar field has a metastable false vacuum and the false-vacuum spacetime expands while lower-energy regions nucleate locally.

For an $O(4)$-symmetric Euclidean geometry

$$
ds_E^2=d\xi^2+\rho^2(\xi)d\Omega_3^2,
$$

the coupled scalar–gravity equations are

$$
\phi''+3\frac{\rho'}{\rho}\phi'=V_{,\phi},
$$

$$
\rho''=-\frac{\rho}{3M_{\rm Pl}^2}\left(\phi'^2+V\right),
$$

with the constraint

$$
\rho'^2=1+\frac{\rho^2}{3M_{\rm Pl}^2}\left(\frac12\phi'^2-V\right).
$$

Regular compact instantons satisfy $\rho=0$ at the poles and $\phi'=0$ there. A nontrivial solution can define a Coleman–De Luccia (CDL) bounce. The semiclassical decay rate has the schematic form

$$
\frac{\Gamma}{\mathcal V}\sim A e^{-B/\hbar},
\qquad
B=S_E[\text{bounce}]-S_E[\text{false vacuum}].
$$

In the flat-space thin-wall limit,

$$
R=\frac{3\sigma}{\Delta V},
\qquad
B=\frac{27\pi^2\sigma^4}{2\Delta V^3}.
$$

For sufficiently homogeneous transitions over a de-Sitter barrier, the Hawking–Moss exponent is

$$
B_{\rm HM}=24\pi^2M_{\rm Pl}^4\left(\frac{1}{V_f}-\frac{1}{V_{\rm top}}\right).
$$

The repository implements the Euclidean field equations, the gravitational constraint, thin-wall estimates, the Hawking–Moss exponent, and analytic Fubini–Lipatov benchmarks. The general CDL shooting problem is retained as an explicit numerical research problem because existence and negative-mode structure depend on the potential.

## Eternal-inflation criterion

For slow roll, the quantum fluctuation acquired in one Hubble time is approximately

$$
\delta\phi_q\simeq\frac{H}{2\pi},
$$

while the classical drift is

$$
\delta\phi_{\rm cl}\simeq\frac{|V_{,\phi}|}{3H^2}.
$$

A local heuristic self-reproduction condition is

$$
\frac{\delta\phi_q}{\delta\phi_{\rm cl}}
=\frac{3H^3}{2\pi|V_{,\phi}|}>1.
$$

This criterion describes stochastic field dynamics in a specified inflationary model. It is not direct observational evidence for other universes.

## References

- Coleman & De Luccia (1980), *Gravitational effects on and of vacuum decay*.
- Hawking & Moss (1982), *Supercooled phase transitions in the very early universe*.
- Linde (1986), *Eternally existing self-reproducing chaotic inflationary universe*.
