"""Generate a compact deterministic benchmark summary for the v1.0 release."""
from __future__ import annotations
import json
from pathlib import Path
from multiverse_cosmology import potentials
from multiverse_cosmology.slowroll import phi_end,phi_at_efolds,ns_r
from multiverse_cosmology.vacuum_decay import extrema_tilted_double_well,identify_vacua,tilted_double_well,wall_tension,flat_thin_wall_estimate,hawking_moss_exponent
from multiverse_cosmology.quantum_cosmology import wkb_barrier_action
from multiverse_cosmology.constraints import CMB_END_2025,CMB_DESI_END_2025,ns_zscore

def model_row(name,V,dV,ddV,end_bracket,phi_bracket,N=60.0):
    pe=phi_end(V,dV,end_bracket); pstar=phi_at_efolds(N,pe,V,dV,phi_bracket)
    ns,r=ns_r(pstar,V,dV,ddV)
    return {"model":name,"N":N,"phi_end":pe,"phi_star":pstar,"ns":ns,"r":r,
            "z_cmb_2025":ns_zscore(ns,CMB_END_2025),
            "z_cmb_desi_2025":ns_zscore(ns,CMB_DESI_END_2025)}

def main():
    rows=[
        model_row("quadratic",potentials.quadratic,potentials.d_quadratic,potentials.dd_quadratic,(.2,3),(1.42,30)),
        model_row("starobinsky",potentials.starobinsky,potentials.d_starobinsky,potentials.dd_starobinsky,(.05,3),(1,10))]
    true,top,false=identify_vacua(extrema_tilted_double_well())
    V=lambda x:tilted_double_well(x)
    sigma=wall_tension(V,true.phi,false.phi,true.energy)
    radius,bflat=flat_thin_wall_estimate(sigma,false.energy-true.energy)
    payload={"release":"1.0.0","inflation":rows,
      "vacuum_decay_toy":{"phi_true":true.phi,"phi_top":top.phi,"phi_false":false.phi,
        "V_true":true.energy,"V_top":top.energy,"V_false":false.energy,
        "sigma_estimate":sigma,"flat_thin_wall_radius":radius,"flat_thin_wall_B":bflat,
        "hawking_moss_B":hawking_moss_exponent(false.energy,top.energy)},
      "quantum_cosmology_toy":{"lambda_eff":0.2,"wkb_barrier_action":wkb_barrier_action(0.2)},
      "notes":["Compressed observational constraints are diagnostics, not full likelihoods.",
      "Vacuum-decay values are for the repository toy potential, not Standard Model vacuum decay.",
      "The Wheeler-DeWitt result is a minisuperspace toy calculation."]}
    out=Path(__file__).resolve().parents[1]/"results"/"benchmark_results.json"
    out.parent.mkdir(parents=True,exist_ok=True); out.write_text(json.dumps(payload,indent=2)+"\n")
    print(out)

if __name__=="__main__": main()
