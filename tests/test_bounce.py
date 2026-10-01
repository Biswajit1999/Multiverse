import numpy as np
from multiverse_cosmology.bounce import constant_w_bounce_scale_factor, effective_h2


def test_h2_vanishes_at_critical_density():
    assert np.isclose(effective_h2(1.0, rho_c=1.0), 0.0)


def test_scale_factor_has_minimum_at_bounce():
    t = np.array([-1.0, 0.0, 1.0])
    a = constant_w_bounce_scale_factor(t, w=1.0)
    assert a[1] < a[0]
    assert a[1] < a[2]
