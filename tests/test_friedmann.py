from code.src.friedmann import E, solve_scale_factor


def test_E_positive():
    assert E(1.0) > 0


def test_scale_factor_grows():
    sol = solve_scale_factor(t_span=(1e-6, 0.1), a0=1e-3)
    assert sol.y[0, -1] > sol.y[0, 0]
