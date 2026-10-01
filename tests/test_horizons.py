import numpy as np
from multiverse_cosmology.horizons import conformal_time, comoving_hubble_radius


def test_matter_dominated_conformal_time_increases():
    a = np.geomspace(1e-4, 1.0, 300)
    E = lambda x: x**(-1.5)
    eta = conformal_time(a, E)
    assert np.all(np.diff(eta) > 0)


def test_comoving_hubble_radius_matter_era_grows():
    a = np.geomspace(1e-3, 1.0, 100)
    E = lambda x: x**(-1.5)
    r = comoving_hubble_radius(a, E)
    assert r[-1] > r[0]
