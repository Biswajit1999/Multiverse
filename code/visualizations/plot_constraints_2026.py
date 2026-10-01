from pathlib import Path
import sys
import numpy as np
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"src"))
from multiverse_cosmology.constraints import CMB_END_2025,CMB_DESI_END_2025
from multiverse_cosmology import potentials
from multiverse_cosmology.slowroll import model_curve
N=np.linspace(45,65,100)
_,nq,rq=model_curve(N,potentials.quadratic,potentials.d_quadratic,potentials.dd_quadratic,(.2,3),(1.42,30))
_,ns,rs=model_curve(N,potentials.starobinsky,potentials.d_starobinsky,potentials.dd_starobinsky,(.05,3),(1,10))
plt.figure(figsize=(8,5))
plt.axvspan(CMB_END_2025.ns_mean-CMB_END_2025.ns_sigma,CMB_END_2025.ns_mean+CMB_END_2025.ns_sigma,alpha=.12,label="CMB end-2025")
plt.axvspan(CMB_DESI_END_2025.ns_mean-CMB_DESI_END_2025.ns_sigma,CMB_DESI_END_2025.ns_mean+CMB_DESI_END_2025.ns_sigma,alpha=.12,label="CMB+DESI")
plt.axhspan(0,CMB_END_2025.r95_upper,alpha=.08,label="r<0.034")
plt.plot(nq,rq,label="quadratic"); plt.plot(ns,rs,label="Starobinsky")
plt.xlabel("$n_s$"); plt.ylabel("$r$"); plt.xlim(.94,.985); plt.ylim(0,.18)
plt.title("Inflation models against 2026 compressed benchmarks"); plt.legend(fontsize=8); plt.grid(alpha=.2); plt.tight_layout(); plt.show()
