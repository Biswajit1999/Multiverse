from code.src.inflation import potential, solve_inflation


def test_potential_nonnegative():
    assert potential(2.0) >= 0


def test_expansion_occurs():
    sol = solve_inflation(phi0=10.0, t_end=1e4)
    assert sol.y[2, -1] > sol.y[2, 0]
