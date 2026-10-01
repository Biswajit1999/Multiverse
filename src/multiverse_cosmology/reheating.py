"""Toy reheating dynamics after inflation in reduced Planck units M_pl=1."""
from __future__ import annotations
import numpy as np
from scipy.integrate import solve_ivp


def solve_reheating(rho_phi0=1.0, rho_r0=1e-10, gamma=0.25, t_end=25.0):
    """Integrate an averaged inflaton condensate decaying into radiation."""
    if rho_phi0 < 0 or rho_r0 < 0:
        raise ValueError("Initial energy densities must be non-negative.")
    if gamma < 0:
        raise ValueError("gamma must be non-negative.")
    if t_end <= 0:
        raise ValueError("t_end must be positive.")

    def rhs(t, y):
        rho_phi, rho_r, N = y
        rho_phi = max(float(rho_phi), 0.0)
        rho_r = max(float(rho_r), 0.0)
        H = np.sqrt((rho_phi + rho_r) / 3.0)
        return [
            -(3.0 * H + gamma) * rho_phi,
            -4.0 * H * rho_r + gamma * rho_phi,
            H,
        ]

    return solve_ivp(
        rhs,
        (0.0, t_end),
        [rho_phi0, rho_r0, 0.0],
        dense_output=True,
        rtol=1e-9,
        atol=1e-12,
    )
