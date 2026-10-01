from multiverse_cosmology.constraints import CMB_END_2025,CMB_DESI_END_2025,ns_zscore,passes_compressed_benchmark,alpha_attractor_leading_order

def test_constraint_shift_is_upward_with_desi(): assert CMB_DESI_END_2025.ns_mean>CMB_END_2025.ns_mean
def test_alpha_attractor_formula():
    ns,r=alpha_attractor_leading_order(60,alpha=1); assert 0.966<ns<0.967 and 0.003<r<0.004
def test_compressed_benchmark_logic():
    assert passes_compressed_benchmark(0.9682,0.01,CMB_END_2025)
    assert not passes_compressed_benchmark(0.9682,0.1,CMB_END_2025)
    assert abs(ns_zscore(0.9682,CMB_END_2025))<1e-12
