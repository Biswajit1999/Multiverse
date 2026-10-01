"""First-order slow-roll inflation diagnostics in reduced Planck units M_pl=1."""
from __future__ import annotations
import numpy as np
from scipy.integrate import quad
from scipy.optimize import brentq


def epsilon_v(phi, V, dV):
    v = float(V(phi))
    if v <= 0:
        raise ValueError("V(phi) must be positive")
    return 0.5 * (float(dV(phi)) / v) ** 2


def eta_v(phi, V, ddV):
    v = float(V(phi))
    if v <= 0:
        raise ValueError("V(phi) must be positive")
    return float(ddV(phi)) / v


def ns_r(phi, V, dV, ddV):
    eps = epsilon_v(phi, V, dV)
    eta = eta_v(phi, V, ddV)
    return 1.0 - 6.0 * eps + 2.0 * eta, 16.0 * eps


def phi_end(V, dV, bracket):
    """Solve epsilon_V(phi_end)=1 on a supplied bracket."""
    a, b = bracket
    return brentq(lambda x: epsilon_v(x, V, dV) - 1.0, a, b)


def efolds(phi_start, phi_end_value, V, dV):
    """Slow-roll N = integral_{phi_end}^{phi_start} V/V' dphi."""
    if phi_start <= phi_end_value:
        return 0.0
    val, _ = quad(lambda x: float(V(x)) / float(dV(x)), phi_end_value, phi_start, limit=300)
    return val


def phi_at_efolds(N, phi_end_value, V, dV, bracket):
    if N <= 0:
        raise ValueError("N must be positive")
    a, b = bracket
    return brentq(lambda x: efolds(x, phi_end_value, V, dV) - N, a, b)


def model_curve(N_values, V, dV, ddV, end_bracket, phi_bracket):
    """Return arrays of phi_N, n_s, r for requested e-folds."""
    end = phi_end(V, dV, end_bracket)
    phis, ns_vals, r_vals = [], [], []
    for N in np.asarray(N_values, dtype=float):
        phi = phi_at_efolds(N, end, V, dV, phi_bracket)
        ns, r = ns_r(phi, V, dV, ddV)
        phis.append(phi)
        ns_vals.append(ns)
        r_vals.append(r)
    return np.asarray(phis), np.asarray(ns_vals), np.asarray(r_vals)
