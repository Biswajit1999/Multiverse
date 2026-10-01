"""Inflationary potentials used for controlled model comparisons."""
from __future__ import annotations
import numpy as np

SQRT_2_OVER_3 = np.sqrt(2.0 / 3.0)


def quadratic(phi, m=1.0):
    return 0.5 * m**2 * np.asarray(phi) ** 2


def d_quadratic(phi, m=1.0):
    return m**2 * np.asarray(phi)


def dd_quadratic(phi, m=1.0):
    return m**2 * np.ones_like(np.asarray(phi, dtype=float))


def starobinsky(phi, v0=1.0):
    phi = np.asarray(phi, dtype=float)
    q = np.exp(-SQRT_2_OVER_3 * phi)
    return v0 * (1.0 - q) ** 2


def d_starobinsky(phi, v0=1.0):
    phi = np.asarray(phi, dtype=float)
    q = np.exp(-SQRT_2_OVER_3 * phi)
    return 2.0 * v0 * SQRT_2_OVER_3 * q * (1.0 - q)


def dd_starobinsky(phi, v0=1.0):
    phi = np.asarray(phi, dtype=float)
    q = np.exp(-SQRT_2_OVER_3 * phi)
    return 2.0 * v0 * (2.0 / 3.0) * (-q + 2.0 * q**2)
