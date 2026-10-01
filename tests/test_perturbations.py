import numpy as np
from multiverse_cosmology.perturbations import (
    scalar_power, tensor_power, tensor_to_scalar,
    solve_de_sitter_mode, de_sitter_mode_analytic,
)


def test_tensor_scalar_ratio_identity():
    eps = 0.004
    H = 1e-5
    assert np.isclose(tensor_power(H)/scalar_power(H, eps), tensor_to_scalar(eps))


def test_numerical_de_sitter_mode_matches_analytic():
    eta, v = solve_de_sitter_mode(k=1.0, eta_i=-80.0, eta_f=-0.2, n=700)
    va = de_sitter_mode_analytic(1.0, eta[-1])
    assert np.isclose(abs(v[-1]), abs(va), rtol=2e-3)
