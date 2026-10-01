"""Compare first-order slow-roll model curves with baseline CMB constraints."""
from pathlib import Path
import sys
import numpy as np
import matplotlib.pyplot as plt
ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))
from multiverse_cosmology import potentials
from multiverse_cosmology.slowroll import model_curve

N = np.linspace(45, 65, 81)
_, ns_q, r_q = model_curve(N, potentials.quadratic, potentials.d_quadratic, potentials.dd_quadratic, (0.2,3.0), (1.42,30.0))
_, ns_s, r_s = model_curve(N, potentials.starobinsky, potentials.d_starobinsky, potentials.dd_starobinsky, (0.05,3.0), (1.0,10.0))

plt.figure(figsize=(8,5))
plt.axvspan(0.9649-0.0042, 0.9649+0.0042, alpha=0.15, label="Planck 2018 n_s (68% baseline)")
plt.axhspan(0, 0.036, alpha=0.10, label="BK18 r<0.036 (95%)")
plt.plot(ns_q, r_q, label="quadratic slow-roll, N=45–65")
plt.plot(ns_s, r_s, label="Starobinsky slow-roll, N=45–65")
plt.xlabel(r"scalar spectral index $n_s$")
plt.ylabel(r"tensor-to-scalar ratio $r$")
plt.ylim(0, max(0.18, r_q.max()*1.05)); plt.xlim(0.94,0.98)
plt.title("Inflation models in the (n_s, r) plane")
plt.legend(fontsize=8); plt.grid(alpha=0.2); plt.tight_layout(); plt.show()
