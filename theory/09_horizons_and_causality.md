# Horizons, conformal time, and causal structure

The distinction between the **observable universe** and the entire spacetime is central to this project. A cosmological horizon is not a material wall.

For an FLRW spacetime, conformal time is

$$
\eta(t)=\int^t \frac{dt'}{a(t')}
$$

or, using the scale factor as the integration variable,

$$
\eta(a)=\frac{1}{H_0}\int^a \frac{da'}{a'^2 E(a')},
\qquad E(a)=\frac{H(a)}{H_0}.
$$

The comoving particle horizon is

$$
\chi_p(t)=c\int_{t_i}^{t}\frac{dt'}{a(t')},
$$

while an event horizon, when it exists, is

$$
\chi_e(t)=c\int_t^{\infty}\frac{dt'}{a(t')}.
$$

Another useful diagnostic is the comoving Hubble radius

$$
(aH)^{-1}.
$$

In decelerating radiation- or matter-dominated expansion this scale grows. During accelerated inflation it decreases. Modes can therefore begin inside the Hubble scale and later exit it, which is the causal structure behind the standard inflationary perturbation calculation.

The Phase-4 horizon engine numerically evaluates these integrals for any supplied positive expansion history $E(a)$.
