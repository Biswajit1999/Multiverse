"""Minisuperspace Wheeler--DeWitt toy models.

These functions are deliberately labelled as minisuperspace models. They are not a
complete quantum theory of gravity.
"""
from __future__ import annotations
import numpy as np
from scipy.integrate import quad, solve_ivp

def wdw_potential(a,lambda_eff=0.1):
    if lambda_eff<=0:
        raise ValueError("lambda_eff must be positive")
    a=np.asarray(a,dtype=float)
    return a**2-lambda_eff*a**4

def turning_point(lambda_eff=0.1):
    if lambda_eff<=0:
        raise ValueError("lambda_eff must be positive")
    return float(1.0/np.sqrt(lambda_eff))

def wkb_barrier_action(lambda_eff=0.1):
    at=turning_point(lambda_eff)
    val,_=quad(lambda a:np.sqrt(max(float(wdw_potential(a,lambda_eff)),0.0)),0.0,at,limit=300)
    return float(val)

def semiclassical_log_weights(lambda_eff=0.1):
    I=wkb_barrier_action(lambda_eff)
    return {"tunneling":-2.0*I,"no_boundary":+2.0*I}

def solve_wdw(lambda_eff=0.1,a_max=None,psi0=1.0,dpsi0=0.0,n=2000):
    if lambda_eff<=0:
        raise ValueError("lambda_eff must be positive")
    if a_max is None:
        a_max=2.0*turning_point(lambda_eff)
    if a_max<=0 or n<10:
        raise ValueError("a_max must be positive and n>=10")
    a0=1e-6
    grid=np.linspace(a0,a_max,n)
    def rhs(a,y):
        return [y[1],float(wdw_potential(a,lambda_eff))*y[0]]
    sol=solve_ivp(rhs,(a0,a_max),[psi0,dpsi0],t_eval=grid,rtol=1e-9,atol=1e-11,method="DOP853")
    return sol.t,sol.y[0]
