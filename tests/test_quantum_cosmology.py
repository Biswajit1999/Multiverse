import numpy as np
from multiverse_cosmology.quantum_cosmology import turning_point,wkb_barrier_action,semiclassical_log_weights,solve_wdw

def test_turning_point(): assert np.isclose(turning_point(0.25),2.0)
def test_wkb_action_matches_analytic_result():
    lam=0.2; assert np.isclose(wkb_barrier_action(lam),1.0/(3.0*lam),rtol=1e-9)
def test_opposite_wkb_signs():
    w=semiclassical_log_weights(0.2); assert np.isclose(w["tunneling"],-w["no_boundary"])
def test_wdw_solver_returns_finite_wavefunction():
    a,psi=solve_wdw(0.2,n=500); assert len(a)==500 and np.all(np.isfinite(psi))
