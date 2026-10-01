"""Effective LQC-inspired bounce relations for controlled toy-model comparisons."""
from __future__ import annotations
import numpy as np


def effective_h2(rho, rho_c=1.0):
    """H^2=(rho/3)(1-rho/rho_c) in units 8*pi*G=1."""
    rho = np.asarray(rho, dtype=float)
    if rho_c <= 0:
        raise ValueError("rho_c must be positive.")
    if np.any(rho < 0):
        raise ValueError("rho must be non-negative.")
    return (rho / 3.0) * (1.0 - rho / rho_c)


def constant_w_bounce_scale_factor(t, w=1.0, rho_c=1.0, a_b=1.0):
    """Constant-w analytic effective-bounce scale factor in units 8*pi*G=1."""
    if w <= -1:
        raise ValueError("w must be greater than -1.")
    if rho_c <= 0 or a_b <= 0:
        raise ValueError("rho_c and a_b must be positive.")
    t = np.asarray(t, dtype=float)
    alpha = 0.75 * rho_c * (1.0 + w) ** 2
    return a_b * (1.0 + alpha * t**2) ** (1.0 / (3.0 * (1.0 + w)))
