from pathlib import Path
import sys
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"src"))
from multiverse_cosmology.quantum_cosmology import wdw_potential,turning_point,solve_wdw
lam=.2
a,psi=solve_wdw(lam,n=1500)
plt.figure(figsize=(8,5)); plt.plot(a,wdw_potential(a,lam),label="U(a)")
plt.axvline(turning_point(lam),ls="--",label="turning point")
plt.xlabel("scale factor a"); plt.ylabel("U(a)"); plt.title("Closed de-Sitter minisuperspace potential")
plt.legend(); plt.grid(alpha=.2); plt.tight_layout(); plt.show()
