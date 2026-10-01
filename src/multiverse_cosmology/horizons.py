"""Horizon and conformal-time utilities for FLRW backgrounds.

All distances are returned in H0^{-1} units when the supplied expansion
function is dimensionless E(a)=H(a)/H0 and c=1.
"""
from __future__ import annotations
import numpy as np
from scipy.integrate import cumulative_trapezoid, quad


def _validate_a(a):
    arr = np.asarray(a, dtype=float)
    if arr.ndim != 1 or arr.size < 2:
        raise ValueError("a must be a one-dimensional grid with at least two points")
    if np.any(arr <= 0) or np.any(np.diff(arr) <= 0):
        raise ValueError("a must be strictly increasing and positive")
    return arr


def conformal_time(a, E):
    """Return eta(a)-eta(a[0]) = integral da/(a^2 E(a))."""
    a = _validate_a(a)
    e = np.asarray([E(x) for x in a], dtype=float)
    if np.any(e <= 0):
        raise ValueError("E(a) must be positive on the integration grid")
    integrand = 1.0 / (a**2 * e)
    return cumulative_trapezoid(integrand, a, initial=0.0)


def particle_horizon(a, E):
    """Comoving particle horizon from the first grid point."""
    return conformal_time(a, E)


def event_horizon(a, E, a_future=1e4):
    """Comoving event horizon integral from a to a_future.

    Finite a_future is an explicit numerical cutoff. It should be increased
    until convergence for an accelerating background.
    """
    a = _validate_a(a)
    if a_future <= a[-1]:
        raise ValueError("a_future must exceed the largest scale factor")
    out = []
    for ai in a:
        val, _ = quad(lambda x: 1.0 / (x * x * E(x)), ai, a_future, limit=300)
        out.append(val)
    return np.asarray(out)


def comoving_hubble_radius(a, E):
    """Return (aH)^{-1} in H0^{-1} units."""
    a = np.asarray(a, dtype=float)
    if np.any(a <= 0):
        raise ValueError("a must be positive")
    e = np.asarray([E(x) for x in a], dtype=float)
    return 1.0 / (a * e)
