"""Compare a classical singular reference with an effective nonsingular bounce."""
from pathlib import Path
import sys
import numpy as np
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))
from multiverse_cosmology.bounce import constant_w_bounce_scale_factor

t = np.linspace(-4.0, 4.0, 1200)
a_bounce = constant_w_bounce_scale_factor(t, w=1.0, rho_c=1.0, a_b=1.0)
a_singular = np.maximum(np.abs(t), 1e-4) ** (1.0 / 3.0)

plt.figure(figsize=(8, 5))
plt.plot(t, a_bounce, label="effective nonsingular bounce")
plt.plot(t, a_singular, "--", label="classical stiff-fluid reference")
plt.xlabel("dimensionless time")
plt.ylabel("normalized scale factor a(t)")
plt.title("Singular reference vs effective bounce")
plt.legend()
plt.grid(alpha=0.2)
plt.tight_layout()
plt.show()
