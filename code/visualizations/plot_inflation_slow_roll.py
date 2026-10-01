"""Visualize slow-roll parameters for the quadratic pedagogical potential."""
import numpy as np
import matplotlib.pyplot as plt

phi = np.linspace(2.05, 20.0, 1000)
epsilon_v = 2.0 / phi**2
eta_v = 2.0 / phi**2

plt.figure(figsize=(8, 5))
plt.semilogy(phi, epsilon_v, label=r"$\epsilon_V=2/\phi^2$")
plt.semilogy(phi, eta_v, label=r"$|\eta_V|=2/\phi^2$")
plt.axhline(1.0, linestyle="--", label="slow-roll boundary")
plt.xlabel(r"inflaton field $\phi/M_{\rm Pl}$")
plt.ylabel("slow-roll parameter")
plt.title("Quadratic toy inflation: slow-roll regime")
plt.legend()
plt.grid(alpha=0.2)
plt.tight_layout()
plt.show()
