# Wheeler–DeWitt minisuperspace and quantum boundary proposals

Canonical quantum gravity formally imposes the Hamiltonian constraint

$$
\hat{\mathcal H}\Psi=0.
$$

In minisuperspace, infinitely many gravitational degrees of freedom are reduced to a small set such as the scale factor $a$ and one or more homogeneous matter fields. A schematic closed de-Sitter model can be written

$$
\left[-\frac{d^2}{da^2}+U(a)\right]\Psi(a)=0,
$$

with a dimensionless toy potential

$$
U(a)=a^2-\lambda a^4.
$$

The classical turning point is

$$
a_t=\lambda^{-1/2}.
$$

The WKB barrier integral is

$$
I=\int_0^{a_t}\sqrt{U(a)}\,da=\frac{1}{3\lambda}.
$$

The Hartle–Hawking no-boundary and Vilenkin tunnelling proposals impose different boundary prescriptions and can carry opposite semiclassical exponential weights in simple conventions. The repository reports **log weights**, not normalized probabilities, because a probability interpretation requires additional choices of inner product, contour, factor ordering and measure.

The numerical code integrates the toy Wheeler–DeWitt equation and reproduces the analytic WKB barrier action. This is a controlled minisuperspace experiment, not a complete quantization of general relativity.

## Why this matters for the Big Bang question

Quantum cosmology changes the question from "what classical event occurred before the Big Bang?" to "what boundary condition or quantum state assigns amplitudes to classical cosmological histories?" In such models the word *before* can cease to have the ordinary classical-time meaning.
