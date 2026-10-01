import numpy as np
from multiverse_cosmology.vacuum_decay import (
    extrema_tilted_double_well,identify_vacua,flat_thin_wall_estimate,
    hawking_moss_exponent,fubini_action,integrate_cdl_trajectory,cdl_constraint)

def test_tilted_potential_has_true_barrier_false_structure():
    true,barrier,false=identify_vacua(extrema_tilted_double_well())
    assert true.energy<false.energy<barrier.energy
    assert true.phi<barrier.phi<false.phi

def test_flat_thin_wall_action_positive():
    r,b=flat_thin_wall_estimate(0.4,0.05); assert r>0 and b>0

def test_hawking_moss_exponent_positive():
    assert hawking_moss_exponent(0.1,0.2)>0

def test_fubini_action_known_result():
    assert np.isclose(fubini_action(2.0),4*np.pi**2/3)

def test_constant_de_sitter_cdl_geometry_and_constraint():
    V0=0.12; V=lambda phi:V0; dV=lambda phi:0.0
    H=np.sqrt(V0/3.0); xi_end=0.9*np.pi/H
    sol=integrate_cdl_trajectory(0.0,V,dV,xi_end,max_step=0.02)
    rho_exact=np.sin(H*sol.t)/H
    assert np.max(np.abs(sol.y[2]-rho_exact))<2e-6
    residual=np.max(np.abs([cdl_constraint(sol.y[:,i],V) for i in range(sol.y.shape[1])]))
    assert residual<2e-7
