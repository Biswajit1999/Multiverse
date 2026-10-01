"""Plot the toy transfer from inflaton energy to radiation."""
from pathlib import Path
import sys
import numpy as np
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))
from multiverse_cosmology.reheating import solve_reheating

sol = solve_reheating(rho_phi0=1.0, rho_r0=1e-10, gamma=0.35, t_end=20.0)
t = np.linspace(sol.t[0], sol.t[-1], 1200)
rho_phi, rho_r, _ = sol.sol(t)

plt.figure(figsize=(8, 5))
plt.semilogy(t, np.maximum(rho_phi, 1e-14), label="inflaton energy density")
plt.semilogy(t, np.maximum(rho_r, 1e-14), label="radiation energy density")
plt.xlabel("dimensionless time")
plt.ylabel("energy density [reduced Planck units]")
plt.title("Toy reheating: inflaton energy to radiation")
plt.legend()
plt.grid(alpha=0.2)
plt.tight_layout()
plt.show()
