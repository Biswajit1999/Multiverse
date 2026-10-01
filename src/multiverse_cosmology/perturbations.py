"""Baseline primordial perturbation utilities.

Includes first-order slow-roll spectra and a numerical de-Sitter
Mukhanov-Sasaki benchmark. The benchmark is a validation problem, not a
full arbitrary-background Boltzmann calculation.
"""
from __future__ import annotations
import numpy as np
from scipy.integrate import solve_ivp


def scalar_power(H, epsilon):
    """P_R = H^2/(8 pi^2 epsilon) in reduced Planck units."""
    if H <= 0 or epsilon <= 0:
        raise ValueError("H and epsilon must be positive")
    return H**2 / (8.0 * np.pi**2 * epsilon)


def tensor_power(H):
    if H <= 0:
        raise ValueError("H must be positive")
    return 2.0 * H**2 / np.pi**2


def tensor_to_scalar(epsilon):
    if epsilon < 0:
        raise ValueError("epsilon must be non-negative")
    return 16.0 * epsilon


def de_sitter_mode_analytic(k, eta):
    """Bunch-Davies solution for v''+(k^2-2/eta^2)v=0."""
    eta = np.asarray(eta, dtype=float)
    if k <= 0 or np.any(eta >= 0):
        raise ValueError("Require k>0 and eta<0")
    return np.exp(-1j * k * eta) * (1.0 - 1j / (k * eta)) / np.sqrt(2.0 * k)


def solve_de_sitter_mode(k=1.0, eta_i=-100.0, eta_f=-0.05, n=2000):
    """Numerically solve the de-Sitter Mukhanov-Sasaki benchmark."""
    if k <= 0 or not (eta_i < eta_f < 0):
        raise ValueError("Require k>0 and eta_i < eta_f < 0")
    v0 = complex(de_sitter_mode_analytic(k, eta_i))
    dv0 = np.exp(-1j*k*eta_i) / np.sqrt(2*k) * (
        -1j*k - 1.0/eta_i + 1j/(k*eta_i**2)
    )

    def rhs(eta, y):
        omega2 = k*k - 2.0/(eta*eta)
        return np.asarray([y[1], -omega2*y[0]], dtype=complex)

    grid = np.linspace(eta_i, eta_f, n)
    sol = solve_ivp(
        rhs, (eta_i, eta_f),
        np.asarray([v0, dv0], dtype=complex),
        t_eval=grid, rtol=1e-9, atol=1e-11, method="DOP853",
        max_step=min(0.05, 0.1 / k),
    )
    return sol.t, sol.y[0]
