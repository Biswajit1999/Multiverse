import numpy as np
from multiverse_cosmology import potentials
from multiverse_cosmology.slowroll import phi_end, phi_at_efolds, ns_r


def test_quadratic_phi_end_is_sqrt2():
    pe = phi_end(potentials.quadratic, potentials.d_quadratic, (0.2, 3.0))
    assert np.isclose(pe, np.sqrt(2.0), rtol=1e-6)


def test_quadratic_ns_r_at_60_efolds():
    pe = phi_end(potentials.quadratic, potentials.d_quadratic, (0.2, 3.0))
    phi = phi_at_efolds(60.0, pe, potentials.quadratic, potentials.d_quadratic, (pe*1.001, 30.0))
    ns, r = ns_r(phi, potentials.quadratic, potentials.d_quadratic, potentials.dd_quadratic)
    assert 0.96 < ns < 0.97
    assert 0.12 < r < 0.14


def test_starobinsky_has_small_r_at_60_efolds():
    pe = phi_end(potentials.starobinsky, potentials.d_starobinsky, (0.05, 3.0))
    phi = phi_at_efolds(60.0, pe, potentials.starobinsky, potentials.d_starobinsky, (pe*1.001, 10.0))
    ns, r = ns_r(phi, potentials.starobinsky, potentials.d_starobinsky, potentials.dd_starobinsky)
    assert 0.96 < ns < 0.98
    assert r < 0.01
