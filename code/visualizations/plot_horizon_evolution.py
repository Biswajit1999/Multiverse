"""Plot particle horizon and comoving Hubble radius in a Lambda-CDM background."""
from pathlib import Path
import sys
import numpy as np
import matplotlib.pyplot as plt
ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))
from multiverse_cosmology.friedmann import E
from multiverse_cosmology.horizons import particle_horizon, comoving_hubble_radius

a = np.geomspace(1e-8, 10.0, 1800)
eta = particle_horizon(a, E)
rh = comoving_hubble_radius(a, E)
plt.figure(figsize=(8,5))
plt.loglog(a, np.maximum(eta, 1e-12), label="comoving particle horizon")
plt.loglog(a, rh, label="comoving Hubble radius (aH)^-1")
plt.xlabel("scale factor a")
plt.ylabel("distance [H0^-1]")
plt.title("Causal scales in a baseline FLRW cosmology")
plt.legend(); plt.grid(alpha=0.2); plt.tight_layout(); plt.show()
