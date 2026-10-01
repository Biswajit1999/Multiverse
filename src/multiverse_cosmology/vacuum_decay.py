"""False-vacuum decay and Coleman--De Luccia diagnostics.

The module separates quantities that are robustly computable in simple limits from
an experimental gravitational shooting integrator. Natural units c=hbar=1 are
used and M_pl denotes the reduced Planck mass.
"""
from __future__ import annotations
from dataclasses import dataclass
import numpy as np
from scipy.integrate import quad, solve_ivp

@dataclass(frozen=True)
class VacuumPoint:
    phi: float
    energy: float
    curvature: float

def tilted_double_well(phi, lam=1.0, v=1.0, tilt=0.05, offset=0.15):
    phi=np.asarray(phi,dtype=float)
    return 0.25*lam*(phi**2-v**2)**2 + tilt*(phi+v)/(2.0*v) + offset

def d_tilted_double_well(phi, lam=1.0, v=1.0, tilt=0.05, offset=0.15):
    phi=np.asarray(phi,dtype=float)
    return lam*phi*(phi**2-v**2)+tilt/(2.0*v)

def dd_tilted_double_well(phi, lam=1.0, v=1.0, tilt=0.05, offset=0.15):
    phi=np.asarray(phi,dtype=float)
    return lam*(3.0*phi**2-v**2)

def extrema_tilted_double_well(lam=1.0,v=1.0,tilt=0.05,offset=0.15):
    coeff=[lam,0.0,-lam*v**2,tilt/(2.0*v)]
    roots=np.roots(coeff)
    roots=np.sort(roots[np.isclose(roots.imag,0.0,atol=1e-10)].real)
    return [VacuumPoint(float(x),float(tilted_double_well(x,lam,v,tilt,offset)),
        float(dd_tilted_double_well(x,lam,v,tilt,offset))) for x in roots]

def identify_vacua(points):
    minima=[p for p in points if p.curvature>0]
    maxima=[p for p in points if p.curvature<0]
    if len(minima)<2 or not maxima:
        raise ValueError("Potential must contain two minima separated by a maximum.")
    minima=sorted(minima,key=lambda p:p.energy)
    barrier=max(maxima,key=lambda p:p.energy)
    return minima[0],barrier,minima[-1]

def wall_tension(V,phi_true,phi_false,V_true=None):
    if phi_true==phi_false:
        raise ValueError("The vacua must be distinct.")
    if V_true is None:
        V_true=float(V(phi_true))
    lo,hi=sorted((float(phi_true),float(phi_false)))
    val,_=quad(lambda x:np.sqrt(max(2.0*(float(V(x))-V_true),0.0)),lo,hi,limit=400)
    return float(val)

def flat_thin_wall_estimate(sigma,delta_v):
    if sigma<=0 or delta_v<=0:
        raise ValueError("sigma and delta_v must be positive.")
    radius=3.0*sigma/delta_v
    action=27.0*np.pi**2*sigma**4/(2.0*delta_v**3)
    return float(radius),float(action)

def hawking_moss_exponent(V_false,V_top,m_pl=1.0):
    if V_false<=0 or V_top<=V_false or m_pl<=0:
        raise ValueError("Require 0 < V_false < V_top and m_pl > 0.")
    return float(24.0*np.pi**2*m_pl**4*(1.0/V_false-1.0/V_top))

def fubini_profile(r,R=1.0,lam=1.0):
    if R<=0 or lam<=0:
        raise ValueError("R and lam must be positive.")
    r=np.asarray(r,dtype=float)
    return np.sqrt(8.0/lam)*R/(r**2+R**2)

def fubini_action(lam=1.0):
    if lam<=0:
        raise ValueError("lam must be positive.")
    return float(8.0*np.pi**2/(3.0*lam))

def cdl_rhs(xi,y,V,dV,m_pl=1.0):
    if m_pl<=0:
        raise ValueError("m_pl must be positive.")
    phi,p,rho,q=map(float,y)
    rho_safe=max(abs(rho),1e-14)
    return np.array([p,float(dV(phi))-3.0*q*p/rho_safe,q,
        -rho*(p**2+float(V(phi)))/(3.0*m_pl**2)])

def cdl_constraint(y,V,m_pl=1.0):
    phi,p,rho,q=map(float,y)
    return q**2-(1.0+rho**2*(0.5*p**2-float(V(phi)))/(3.0*m_pl**2))

def integrate_cdl_trajectory(phi0,V,dV,xi_max,m_pl=1.0,eps=1e-6,
                             rtol=1e-9,atol=1e-11,max_step=np.inf):
    if xi_max<=eps or eps<=0:
        raise ValueError("Require xi_max > eps > 0.")
    v0=float(V(phi0)); dv0=float(dV(phi0))
    phi_eps=float(phi0)+dv0*eps**2/8.0
    p_eps=dv0*eps/4.0
    rho_eps=eps-v0*eps**3/(18.0*m_pl**2)
    q_eps=1.0-v0*eps**2/(6.0*m_pl**2)
    return solve_ivp(lambda x,y:cdl_rhs(x,y,V,dV,m_pl=m_pl),(eps,xi_max),
        [phi_eps,p_eps,rho_eps,q_eps],rtol=rtol,atol=atol,dense_output=True,max_step=max_step)

def self_reproduction_ratio(phi,V,dV,m_pl=1.0):
    v=float(V(phi))
    if v<=0 or m_pl<=0:
        raise ValueError("Require V(phi)>0 and m_pl>0.")
    slope=abs(float(dV(phi)))
    if slope==0:
        return np.inf
    H=np.sqrt(v/(3.0*m_pl**2))
    return float(3.0*H**3/(2.0*np.pi*slope))
