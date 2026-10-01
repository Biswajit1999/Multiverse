"""Validate the numerical de-Sitter Mukhanov-Sasaki mode solution."""
from pathlib import Path
import sys
import numpy as np
import matplotlib.pyplot as plt
ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))
from multiverse_cosmology.perturbations import solve_de_sitter_mode, de_sitter_mode_analytic

eta, v = solve_de_sitter_mode(k=1.0, eta_i=-80.0, eta_f=-0.08, n=1600)
va = de_sitter_mode_analytic(1.0, eta)
plt.figure(figsize=(8,5))
plt.loglog(-eta, np.abs(v), label="numerical |v_k|")
plt.loglog(-eta, np.abs(va), "--", label="analytic de-Sitter benchmark")
plt.gca().invert_xaxis()
plt.xlabel(r"-$\eta$ for k=1")
plt.ylabel(r"$|v_k|$")
plt.title("Mukhanov-Sasaki benchmark: sub-horizon to freeze-out")
plt.legend(); plt.grid(alpha=0.2); plt.tight_layout(); plt.show()
