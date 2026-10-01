import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@13.5.0/+esm";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduced) {
  inView(".reveal", ({ target }) => {
    animate(target, { opacity: [0,1], y: [24,0] }, { duration: .7, easing: [0.22,1,0.36,1] });
  }, { margin: "-8% 0px -8% 0px" });
  inView(".model-grid", () => {
    animate(".model-card", { opacity: [0,1], y: [18,0] }, { delay: stagger(.08), duration: .55 });
  });
} else {
  document.querySelectorAll(".reveal").forEach(el => { el.style.opacity=1; el.style.transform="none"; });
}

addEventListener("scroll", () => {
  const doc = document.documentElement;
  const p = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
  document.getElementById("progress").style.width = (p*100).toFixed(2) + "%";
}, { passive:true });

const slider = document.getElementById("efolds");
const nValue = document.getElementById("nValue");
function modelValues(N){
  return {
    qns: 1 - 2/(N+.5),
    qr: 8/(N+.5),
    sns: 1 - 2/N,
    sr: 12/(N*N)
  };
}
function updateLab(){
  const N=Number(slider.value), v=modelValues(N);
  nValue.textContent=N;
  document.getElementById("qNs").textContent="nₛ ≈ "+v.qns.toFixed(5);
  document.getElementById("qR").textContent="r ≈ "+v.qr.toFixed(5);
  document.getElementById("sNs").textContent="nₛ ≈ "+v.sns.toFixed(5);
  document.getElementById("sR").textContent="r ≈ "+v.sr.toFixed(5);
  drawNR(N);
}
slider.addEventListener("input",updateLab);

function drawNR(N=60){
  const c=document.getElementById("nrChart"),ctx=c.getContext("2d");
  const W=c.width,H=c.height,p={l:75,r:28,t:34,b:62};
  const xmin=.94,xmax=.99,ymin=0,ymax=.18;
  const X=x=>p.l+(x-xmin)/(xmax-xmin)*(W-p.l-p.r);
  const Y=y=>H-p.b-(y-ymin)/(ymax-ymin)*(H-p.t-p.b);
  ctx.clearRect(0,0,W,H);ctx.fillStyle="#081523";ctx.fillRect(0,0,W,H);
  ctx.fillStyle="rgba(120,199,255,.10)";ctx.fillRect(X(.9682-.0032),p.t,X(.9682+.0032)-X(.9682-.0032),H-p.t-p.b);
  ctx.fillStyle="rgba(243,201,107,.10)";ctx.fillRect(p.l,Y(.034),W-p.l-p.r,Y(0)-Y(.034));
  ctx.strokeStyle="rgba(220,233,248,.22)";ctx.lineWidth=1;
  for(let x=.94;x<=.9901;x+=.01){ctx.beginPath();ctx.moveTo(X(x),p.t);ctx.lineTo(X(x),H-p.b);ctx.stroke();ctx.fillStyle="#9db0c8";ctx.font="16px Inter";ctx.fillText(x.toFixed(2),X(x)-15,H-p.b+28)}
  for(let y=0;y<=.1801;y+=.03){ctx.beginPath();ctx.moveTo(p.l,Y(y));ctx.lineTo(W-p.r,Y(y));ctx.stroke();ctx.fillStyle="#9db0c8";ctx.fillText(y.toFixed(2),20,Y(y)+5)}
  function curve(color,dash,fn){ctx.strokeStyle=color;ctx.lineWidth=4;ctx.setLineDash(dash);ctx.beginPath();for(let n=45;n<=70;n+=.25){const [ns,r]=fn(n);if(n===45)ctx.moveTo(X(ns),Y(r));else ctx.lineTo(X(ns),Y(r));}ctx.stroke();ctx.setLineDash([])}
  curve("#a98bff",[],n=>[1-2/(n+.5),8/(n+.5)]);
  curve("#69e4ef",[10,7],n=>[1-2/n,12/(n*n)]);
  const v=modelValues(N);
  [[v.qns,v.qr,"#a98bff"],[v.sns,v.sr,"#69e4ef"]].forEach(([ns,r,color])=>{ctx.fillStyle=color;ctx.beginPath();ctx.arc(X(ns),Y(r),8,0,Math.PI*2);ctx.fill()});
  ctx.fillStyle="#eff5ff";ctx.font="700 18px Inter";ctx.fillText("Inflation models in nₛ–r space",p.l,p.t-10);
  ctx.font="14px Inter";ctx.fillStyle="#9db0c8";ctx.fillText("nₛ",W/2,H-16);ctx.save();ctx.translate(18,H/2);ctx.rotate(-Math.PI/2);ctx.fillText("r",0,0);ctx.restore();
}
updateLab();

function parseTT(text){
  return text.split(/\r?\n/).filter(l=>l && !l.trim().startsWith("#")).map(l=>{
    const a=l.split(",").map(s=>s.trim());
    return {exp:a[0],ell:Number(a[2]),power:Number(a[4]),minus:Number(a[5]),plus:Number(a[6])};
  }).filter(d=>Number.isFinite(d.ell)&&Number.isFinite(d.power));
}
function drawCMB(rows){
  const c=document.getElementById("cmbChart"),ctx=c.getContext("2d");
  const W=c.width,H=c.height,p={l:82,r:30,t:34,b:66};const xmin=2,xmax=5000,ymin=0,ymax=6200;
  const X=x=>p.l+(Math.log10(x)-Math.log10(xmin))/(Math.log10(xmax)-Math.log10(xmin))*(W-p.l-p.r);
  const Y=y=>H-p.b-(y-ymin)/(ymax-ymin)*(H-p.t-p.b);
  ctx.clearRect(0,0,W,H);ctx.fillStyle="#081523";ctx.fillRect(0,0,W,H);
  ctx.strokeStyle="rgba(220,233,248,.16)";ctx.lineWidth=1;
  [2,10,100,1000,5000].forEach(x=>{ctx.beginPath();ctx.moveTo(X(x),p.t);ctx.lineTo(X(x),H-p.b);ctx.stroke();ctx.fillStyle="#9db0c8";ctx.font="15px Inter";ctx.fillText(String(x),X(x)-12,H-p.b+28)});
  [0,1000,2000,3000,4000,5000,6000].forEach(y=>{ctx.beginPath();ctx.moveTo(p.l,Y(y));ctx.lineTo(W-p.r,Y(y));ctx.stroke();ctx.fillStyle="#9db0c8";ctx.fillText(String(y),24,Y(y)+5)});
  const subsets=[
    {name:"Planck",re:/Planck_2018/,color:"#f3c96b"},
    {name:"ACT",re:/ACT_DR6_2025/,color:"#69e4ef"}
  ];
  subsets.forEach(s=>rows.filter(d=>s.re.test(d.exp)).forEach(d=>{
    const x=X(d.ell),y=Y(d.power),lo=Y(d.power-d.minus),hi=Y(d.power+d.plus);
    ctx.strokeStyle=s.color;ctx.globalAlpha=.55;ctx.beginPath();ctx.moveTo(x,lo);ctx.lineTo(x,hi);ctx.stroke();
    ctx.globalAlpha=.88;ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(x,y,d.exp.includes("unbinn")?2.1:3.2,0,Math.PI*2);ctx.fill();
  }));
  ctx.globalAlpha=1;ctx.fillStyle="#eff5ff";ctx.font="700 18px Inter";ctx.fillText("CMB TT angular power spectrum — public measurements",p.l,p.t-10);
  ctx.fillStyle="#9db0c8";ctx.font="14px Inter";ctx.fillText("multipole ℓ (log scale)",W/2,H-16);ctx.save();ctx.translate(18,H/2);ctx.rotate(-Math.PI/2);ctx.fillText("ℓ(ℓ+1)Cℓ / 2π  [μK²]",0,0);ctx.restore();
}
async function loadCMB(){
  const status=document.getElementById("dataStatus");
  const urls=["data/TT_data_2026feb_csv_format.dat","https://lambda.gsfc.nasa.gov/graphics/tt_spectrum/TT_data_2026feb_csv_format.dat"];
  for(const u of urls){
    try{
      const r=await fetch(u,{cache:"no-store"});if(!r.ok)throw new Error(r.status);
      const rows=parseTT(await r.text());if(rows.length<20)throw new Error("too few rows");
      drawCMB(rows);status.textContent="Loaded "+rows.length+" released bandpower rows · NASA/LAMBDA";return;
    }catch(e){}
  }
  status.textContent="Public CMB data could not be loaded in this browser; deployment data source is NASA/LAMBDA.";
}
loadCMB();
