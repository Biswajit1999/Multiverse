"""Toy homogeneous scalar-field inflation model in reduced Planck units M_pl=1."""
from __future__ import annotations
import numpy as np
from scipy.integrate import solve_ivp


def potential(phi: float, m: float = 1e-5) -> float:
    """Quadratic pedagogical potential V(phi)=m^2 phi^2/2."""
    return 0.5 * m**2 * phi**2


def dpotential(phi: float, m: float = 1e-5) -> float:
    """Derivative dV/dphi for the quadratic pedagogical potential."""
    return m**2 * phi


def solve_inflation(phi0=15.0, phidot0=0.0, a0=1.0, m=1e-5, t_end=2e7):
    """Integrate phi, phidot, and log(a) for a quadratic toy potential."""
    if a0 <= 0:
        raise ValueError("Initial scale factor a0 must be positive.")
    if m < 0:
        raise ValueError("Mass parameter m must be non-negative.")

    def rhs(t, y):
        phi, phidot, loga = y
        rho = 0.5 * phidot**2 + potential(phi, m)
        H = np.sqrt(max(rho, 0.0) / 3.0)
        return [phidot, -3.0 * H * phidot - dpotential(phi, m), H]

    return solve_ivp(rhs, (0.0, t_end), [phi0, phidot0, np.log(a0)], rtol=1e-8, atol=1e-10)
