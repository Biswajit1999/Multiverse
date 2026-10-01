from multiverse_cosmology.reheating import solve_reheating


def test_radiation_is_produced():
    sol = solve_reheating(rho_phi0=1.0, rho_r0=1e-10, gamma=0.4, t_end=5.0)
    assert sol.success
    assert sol.y[1, -1] > sol.y[1, 0]


def test_expansion_accumulates():
    sol = solve_reheating(t_end=2.0)
    assert sol.y[2, -1] > 0.0
