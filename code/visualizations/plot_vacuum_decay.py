from pathlib import Path
import sys
import numpy as np
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"src"))
from multiverse_cosmology.vacuum_decay import tilted_double_well,extrema_tilted_double_well,identify_vacua
phi=np.linspace(-1.6,1.6,1200)
V=tilted_double_well(phi)
true,top,false=identify_vacua(extrema_tilted_double_well())
plt.figure(figsize=(8,5)); plt.plot(phi,V,label="tilted double-well")
plt.scatter([true.phi,top.phi,false.phi],[true.energy,top.energy,false.energy])
plt.xlabel(r"$\phi$"); plt.ylabel(r"$V(\phi)$"); plt.title("Vacuum-decay toy potential")
plt.grid(alpha=.2); plt.tight_layout(); plt.show()
