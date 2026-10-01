"""Minimal FLRW background integrator for pedagogical cosmology simulations."""
from __future__ import annotations
import numpy as np
from scipy.integrate import solve_ivp


def E(a: float, omega_r=9e-5, omega_m=0.315, omega_k=0.0, omega_l=0.68491) -> float:
    """Dimensionless H(a)/H0 for radiation + matter + curvature + Lambda."""
    return float(np.sqrt(omega_r/a**4 + omega_m/a**3 + omega_k/a**2 + omega_l))


def solve_scale_factor(t_span=(1e-6, 3.0), a0=1e-4, **params):
    """Integrate da/dtau = a E(a), where tau = H0 t."""
    def rhs(tau, y):
        a = max(float(y[0]), 1e-12)
        return [a * E(a, **params)]

    return solve_ivp(rhs, t_span, [a0], dense_output=True, rtol=1e-9, atol=1e-11)
