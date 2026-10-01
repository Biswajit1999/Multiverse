import pytest
from multiverse_cosmology.inflation import potential, solve_inflation


def test_potential_nonnegative():
    assert potential(2.0) >= 0


def test_expansion_occurs():
    sol = solve_inflation(phi0=10.0, t_end=1e4)
    assert sol.success
    assert sol.y[2, -1] > sol.y[2, 0]


def test_bad_scale_factor_rejected():
    with pytest.raises(ValueError):
        solve_inflation(a0=0.0, t_end=1.0)
