"""Compressed observational benchmarks for inflation-model diagnostics.

These objects are transparent summaries, not replacements for full likelihoods.
"""
from __future__ import annotations
from dataclasses import dataclass
import numpy as np

@dataclass(frozen=True)
class InflationConstraint:
    name:str
    ns_mean:float
    ns_sigma:float
    r95_upper:float
    pivot_mpc_inv:float=0.05
    note:str=""

PLANCK2018_BK18=InflationConstraint(
    "Planck 2018 + BICEP/Keck 2018 benchmark",0.9649,0.0042,0.036,
    note="n_s from Planck 2018; r bound from BK18-era joint analyses.")
CMB_END_2025=InflationConstraint(
    "Planck+SPT+ACT+BICEP/Keck, end-of-2025 synthesis",0.9682,0.0032,0.034,
    note="Published 2026 synthesis of then-latest CMB data.")
CMB_DESI_END_2025=InflationConstraint(
    "CMB end-of-2025 + DESI BAO",0.9728,0.0029,0.034,
    note="The cited analysis reports negligible DESI impact on r but an upward n_s shift.")

def ns_zscore(ns,constraint=CMB_END_2025):
    return float((ns-constraint.ns_mean)/constraint.ns_sigma)

def passes_compressed_benchmark(ns,r,constraint=CMB_END_2025,ns_sigma_cut=2.0):
    if r<0:
        raise ValueError("r must be non-negative")
    return bool(abs(ns_zscore(ns,constraint))<=ns_sigma_cut and r<constraint.r95_upper)

def alpha_attractor_leading_order(N,alpha=1.0):
    if N<=0 or alpha<=0:
        raise ValueError("N and alpha must be positive")
    return float(1.0-2.0/N),float(12.0*alpha/N**2)

def scan_alpha_attractor(N_values,alpha_values,constraint=CMB_END_2025):
    rows=[]
    for N in np.asarray(N_values,dtype=float):
        for alpha in np.asarray(alpha_values,dtype=float):
            ns,r=alpha_attractor_leading_order(N,alpha)
            rows.append({"N":float(N),"alpha":float(alpha),"ns":ns,"r":r,
                "ns_z":ns_zscore(ns,constraint),
                "passes":passes_compressed_benchmark(ns,r,constraint)})
    return rows
