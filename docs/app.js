const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;

// Progressive reveal inspired by editorial Motion/Framer patterns.
// Content is visible by default, so a JS/CDN failure never blanks the article.
const revealNodes=[...document.querySelectorAll(".reveal")];
if(!reduced && "IntersectionObserver" in window){
  for(const el of revealNodes){el.style.opacity="0";el.style.transform="translateY(18px)"}
  const io=new IntersectionObserver((entries,observer)=>{
    for(const entry of entries){
      if(!entry.isIntersecting) continue;
      const el=entry.target,delay=Number(el.dataset.delay||0);
      el.animate(
        [{opacity:0,transform:"translateY(18px)"},{opacity:1,transform:"translateY(0)"}],
        {duration:650,delay,easing:"cubic-bezier(.22,1,.36,1)",fill:"forwards"}
      ).finished.finally(()=>{el.style.opacity="1";el.style.transform="none"});
      observer.unobserve(el);
    }
  },{rootMargin:"0px 0px -8% 0px",threshold:.08});
  revealNodes.forEach(el=>io.observe(el));
}

// Scroll progress.
const progress=document.getElementById("progress");
addEventListener("scroll",()=>{
  if(!progress)return;
  const d=document.documentElement;
  progress.style.width=(100*d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight))+"%";
},{passive:true});

// Optional 3D overlay: a light-mode bubble field over the static GPT-generated hero.
// It is progressive enhancement only.
(async function initHero3D(){
  const canvas=document.getElementById("hero3d");
  if(!canvas||reduced)return;
  try{
    const THREE=await import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js");
    const box=canvas.parentElement;
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});
    function size(){
      const r=box.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(devicePixelRatio,1.35));
      renderer.setSize(r.width,r.height,false);
      camera.aspect=r.width/r.height;camera.updateProjectionMatrix();
    }
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(45,1,.1,50);camera.position.z=8;
    const group=new THREE.Group();scene.add(group);
    const geom=new THREE.SphereGeometry(1,34,24);
    const positions=[[-2.4,1.5,-2,.8],[1.8,1.7,-1,.95],[2.6,-1.5,-2.5,1.25],[-.7,-1.8,-2.7,.68],[.4,.2,-3,.5]];
    for(const [x,y,z,s] of positions){
      const mat=new THREE.MeshPhysicalMaterial({color:0x5d70d6,transparent:true,opacity:.17,roughness:.12,transmission:.72,thickness:.7,ior:1.25});
      const m=new THREE.Mesh(geom,mat);m.position.set(x,y,z);m.scale.setScalar(s);group.add(m);
    }
    const light=new THREE.PointLight(0xf0c76b,12,18);light.position.set(-2,2,3);scene.add(light);
    const blue=new THREE.PointLight(0x6a7eed,10,18);blue.position.set(3,-1,4);scene.add(blue);
    let mx=0,my=0;addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
    size();addEventListener("resize",size,{passive:true});
    const t0=performance.now();
    function tick(t){const u=(t-t0)*.00018;group.rotation.y=u+mx*.08;group.rotation.x=my*.05;renderer.render(scene,camera);requestAnimationFrame(tick)}
    requestAnimationFrame(tick);
  }catch(err){console.warn("3D enhancement unavailable",err)}
})();

// Inflation lab.
const slider=document.getElementById("efolds");
function modelValues(N){return{qns:1-2/(N+.5),qr:8/(N+.5),sns:1-2/N,sr:12/(N*N)}}
function drawNR(N=60){
  const c=document.getElementById("nrChart");if(!c)return;
  const ctx=c.getContext("2d"),W=c.width,H=c.height,p={l:76,r:28,t:40,b:64},xmin=.94,xmax=.99,ymin=0,ymax=.18;
  const X=x=>p.l+(x-xmin)/(xmax-xmin)*(W-p.l-p.r),Y=y=>H-p.b-(y-ymin)/(ymax-ymin)*(H-p.t-p.b);
  ctx.clearRect(0,0,W,H);ctx.fillStyle="#ffffff";ctx.fillRect(0,0,W,H);
  ctx.fillStyle="rgba(49,87,213,.10)";ctx.fillRect(X(.965),p.t,X(.9714)-X(.965),H-p.t-p.b);
  ctx.fillStyle="rgba(215,138,32,.10)";ctx.fillRect(p.l,Y(.034),W-p.l-p.r,Y(0)-Y(.034));
  ctx.strokeStyle="#e1e4ea";ctx.lineWidth=1;
  for(let x=.94;x<=.9901;x+=.01){ctx.beginPath();ctx.moveTo(X(x),p.t);ctx.lineTo(X(x),H-p.b);ctx.stroke();ctx.fillStyle="#667085";ctx.font="14px system-ui";ctx.fillText(x.toFixed(2),X(x)-14,H-p.b+27)}
  for(let y=0;y<=.1801;y+=.03){ctx.beginPath();ctx.moveTo(p.l,Y(y));ctx.lineTo(W-p.r,Y(y));ctx.stroke();ctx.fillStyle="#667085";ctx.fillText(y.toFixed(2),20,Y(y)+4)}
  function curve(color,dash,fn){ctx.strokeStyle=color;ctx.lineWidth=3.5;ctx.setLineDash(dash);ctx.beginPath();for(let n=45;n<=70;n+=.25){const[ns,r]=fn(n);if(n===45)ctx.moveTo(X(ns),Y(r));else ctx.lineTo(X(ns),Y(r))}ctx.stroke();ctx.setLineDash([])}
  curve("#6b58c9",[],n=>[1-2/(n+.5),8/(n+.5)]);
  curve("#1a8ca4",[9,6],n=>[1-2/n,12/(n*n)]);
  const v=modelValues(N);
  [[v.qns,v.qr,"#6b58c9"],[v.sns,v.sr,"#1a8ca4"]].forEach(([ns,r,col])=>{ctx.fillStyle=col;ctx.beginPath();ctx.arc(X(ns),Y(r),7,0,Math.PI*2);ctx.fill()});
  ctx.fillStyle="#121826";ctx.font="700 17px system-ui";ctx.fillText("Inflation models in nₛ–r space",p.l,p.t-13);
  ctx.fillStyle="#667085";ctx.font="13px system-ui";ctx.fillText("scalar spectral index nₛ",W/2-62,H-16);
  ctx.save();ctx.translate(18,H/2+42);ctx.rotate(-Math.PI/2);ctx.fillText("tensor-to-scalar ratio r",0,0);ctx.restore();
}
function updateLab(){
  if(!slider)return;
  const N=Number(slider.value),v=modelValues(N);
  document.getElementById("nValue").textContent=N;
  document.getElementById("qNs").textContent="nₛ ≈ "+v.qns.toFixed(5);
  document.getElementById("qR").textContent="r ≈ "+v.qr.toFixed(5);
  document.getElementById("sNs").textContent="nₛ ≈ "+v.sns.toFixed(5);
  document.getElementById("sR").textContent="r ≈ "+v.sr.toFixed(5);
  drawNR(N);
}
if(slider){slider.addEventListener("input",updateLab);updateLab()}

// Embedded fallback: representative points copied from the public NASA/LAMBDA
// February 2026 TT plotting table. This prevents a blank chart when fetch/CORS fails.
const FALLBACK_TT=[
["ACT_DR6_2025",600.5,2310.3625,54.7405],["ACT_DR6_2025",700.5,1907.7731,39.2940],["ACT_DR6_2025",800.5,2511.6203,31.8314],
["ACT_DR6_2025",900.5,1902.7352,23.0496],["ACT_DR6_2025",1000.5,1083.7715,11.6272],["ACT_DR6_2025",1100.5,1222.6066,12.2407],
["ACT_DR6_2025",1200.5,1047.9708,10.2278],["ACT_DR6_2025",1300.5,730.2718,7.0143],["ACT_DR6_2025",1400.5,805.0143,7.3318],
["ACT_DR6_2025",1500.5,698.5496,6.1901],["ACT_DR6_2025",1600.5,428.5696,3.9379],["ACT_DR6_2025",1700.5,394.9919,3.5274],
["ACT_DR6_2025",1800.5,359.0994,3.1722],["ACT_DR6_2025",1900.5,260.2883,2.3499],["ACT_DR6_2025",2000.5,231.7347,2.1273],
["ACT_DR6_2025",2175.5,161.4175,1.1167],["ACT_DR6_2025",2375.5,110.6719,.8293],["ACT_DR6_2025",2625.5,64.6387,.4529],
["ACT_DR6_2025",3025.5,27.5058,.3496],["ACT_DR6_2025",3725.5,7.3801,.2502],["ACT_DR6_2025",4525.5,2.6216,.3333],
["Planck_2018_binned",47.7,1479.3356,50.7655],["Planck_2018_binned",76.5,2034.9684,54.7102],["Planck_2018_binned",105.9,2955.3940,64.9766],
["Planck_2018_binned",135.6,3869.5139,76.9144],["Planck_2018_binned",165.4,4889.4648,86.5856],["Planck_2018_binned",195.3,5464.1094,90.5533],
["Planck_2018_binned",225.2,5793.4395,87.1349],["Planck_2018_binned",255.1,5372.8838,76.9384],["Planck_2018_binned",285.0,4627.6777,62.5199],
["Planck_2018_binned",315.0,3604.2385,47.1589],["Planck_2018_binned",344.9,2631.2002,33.8762],["Planck_2018_binned",374.9,2033.0594,24.8191],
["Planck_2018_binned",404.9,1753.3625,20.7109],["Planck_2018_binned",434.8,1787.5790,20.6714],["Planck_2018_binned",464.8,2162.0464,22.7524],
["Planck_2018_binned",494.8,2422.0847,24.9726],["Planck_2018_binned",524.8,2573.4805,25.9184],["Planck_2018_binned",554.8,2546.2976,25.0511],
["Planck_2018_binned",584.8,2360.6453,22.7209],["Planck_2018_binned",614.7,2095.4351,19.8505],["Planck_2018_binned",644.7,1884.6770,17.5025],
["Planck_2018_binned",674.7,1813.1628,16.4306],["Planck_2018_binned",704.7,1883.1940,16.7991],["Planck_2018_binned",734.7,2097.1306,18.1645],
["Planck_2018_binned",764.7,2318.7358,19.7364],["Planck_2018_binned",794.7,2464.5813,20.7062],["Planck_2018_binned",824.7,2521.9126,20.5198],
["Planck_2018_binned",854.7,2394.1208,19.0381],["Planck_2018_binned",884.7,2083.3386,16.5790],["Planck_2018_binned",914.7,1740.7284,13.7375],
["Planck_2018_binned",944.7,1418.6735,11.1420],["Planck_2018_binned",974.7,1172.9542,9.2865],["Planck_2018_binned",1004.6,1062.4047,8.3799],
["Planck_2018_binned",1064.6,1132.3519,8.6858],["Planck_2018_binned",1124.6,1231.8722,9.2605],["Planck_2018_binned",1184.6,1117.9266,8.3317],
["Planck_2018_binned",1244.6,864.3979,6.6432],["Planck_2018_binned",1304.6,732.3397,5.6867],["Planck_2018_binned",1364.6,774.9258,5.9409],
["Planck_2018_binned",1424.6,809.0571,6.2563],["Planck_2018_binned",1484.6,728.9436,5.7454],["Planck_2018_binned",1544.6,551.2861,4.7239],
["Planck_2018_binned",1604.6,419.5413,4.0444],["Planck_2018_binned",1664.6,391.6578,4.0342],["Planck_2018_binned",1724.6,397.7358,4.3167],
["Planck_2018_binned",1784.6,375.3911,4.4573],["Planck_2018_binned",1844.6,307.5393,4.4575],["Planck_2018_binned",1904.6,249.8469,4.5965],
["Planck_2018_binned",1964.6,231.9131,5.0287]
].map(([exp,ell,power,sigma])=>({exp,ell,power,minus:sigma,plus:sigma}));

function parseTT(text){
  return text.split(/\r?\n/).filter(l=>l&&!l.trim().startsWith("#")&&!l.includes("Experiment")).map(l=>{
    const a=l.split(",").map(s=>s.trim());
    return{exp:a[0],ell:Number(a[2]),power:Number(a[4]),minus:Number(a[5]),plus:Number(a[6])}
  }).filter(d=>Number.isFinite(d.ell)&&Number.isFinite(d.power));
}
function drawCMB(rows){
  const c=document.getElementById("cmbChart");if(!c)return;
  const ctx=c.getContext("2d"),W=c.width,H=c.height,p={l:84,r:30,t:42,b:70},xmin=30,xmax=5000,ymin=0,ymax=6200;
  const X=x=>p.l+(Math.log10(x)-Math.log10(xmin))/(Math.log10(xmax)-Math.log10(xmin))*(W-p.l-p.r),Y=y=>H-p.b-(y-ymin)/(ymax-ymin)*(H-p.t-p.b);
  ctx.clearRect(0,0,W,H);ctx.fillStyle="#ffffff";ctx.fillRect(0,0,W,H);
  ctx.strokeStyle="#e1e4ea";ctx.lineWidth=1;
  [30,100,300,1000,3000,5000].forEach(x=>{ctx.beginPath();ctx.moveTo(X(x),p.t);ctx.lineTo(X(x),H-p.b);ctx.stroke();ctx.fillStyle="#667085";ctx.font="14px system-ui";ctx.fillText(String(x),X(x)-12,H-p.b+28)});
  [0,1000,2000,3000,4000,5000,6000].forEach(y=>{ctx.beginPath();ctx.moveTo(p.l,Y(y));ctx.lineTo(W-p.r,Y(y));ctx.stroke();ctx.fillStyle="#667085";ctx.fillText(String(y),25,Y(y)+4)});
  const sets=[{re:/Planck_2018/,color:"#d78a20",radius:4},{re:/ACT_DR6_2025/,color:"#1a8ca4",radius:4}];
  for(const s of sets){
    const data=rows.filter(d=>s.re.test(d.exp));
    ctx.strokeStyle=s.color;ctx.lineWidth=1.4;ctx.globalAlpha=.32;ctx.beginPath();
    data.forEach((d,i)=>{if(i===0)ctx.moveTo(X(d.ell),Y(d.power));else ctx.lineTo(X(d.ell),Y(d.power))});ctx.stroke();
    for(const d of data){
      const x=X(d.ell),y=Y(d.power),lo=Y(d.power-d.minus),hi=Y(d.power+d.plus);
      ctx.strokeStyle=s.color;ctx.globalAlpha=.45;ctx.beginPath();ctx.moveTo(x,lo);ctx.lineTo(x,hi);ctx.stroke();
      ctx.globalAlpha=.95;ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(x,y,s.radius,0,Math.PI*2);ctx.fill();
    }
  }
  ctx.globalAlpha=1;ctx.fillStyle="#121826";ctx.font="700 17px system-ui";ctx.fillText("CMB TT angular power spectrum — released measurements",p.l,p.t-14);
  ctx.fillStyle="#667085";ctx.font="13px system-ui";ctx.fillText("multipole ℓ (log scale)",W/2-45,H-17);
  ctx.save();ctx.translate(20,H/2+58);ctx.rotate(-Math.PI/2);ctx.fillText("ℓ(ℓ+1)Cℓ / 2π [μK²]",0,0);ctx.restore();
}
async function loadCMB(){
  const status=document.getElementById("dataStatus");
  const urls=["data/TT_data_2026feb_csv_format.dat","/Multiverse/data/TT_data_2026feb_csv_format.dat","https://lambda.gsfc.nasa.gov/graphics/tt_spectrum/TT_data_2026feb_csv_format.dat"];
  for(const u of urls){
    try{
      const r=await fetch(u,{cache:"no-store"});if(!r.ok)throw Error(r.status);
      const rows=parseTT(await r.text());if(rows.length<20)throw Error("too few rows");
      drawCMB(rows);
      if(status)status.textContent="Loaded "+rows.length+" released rows · NASA/LAMBDA";
      return;
    }catch(e){}
  }
  drawCMB(FALLBACK_TT);
  if(status)status.textContent="Embedded NASA/LAMBDA fallback · "+FALLBACK_TT.length+" representative released points";
}
loadCMB();
