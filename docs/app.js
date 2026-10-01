const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const ROOT="/Multiverse/";
const RAW="https://raw.githubusercontent.com/Biswajit1999/Multiverse/main/docs/";

const DATASETS={
  TT:{
    title:"CMB temperature anisotropy power spectrum",
    url:"https://lambda.gsfc.nasa.gov/graphics/tt_spectrum/TT_data_2026feb_csv_format.dat",
    fallback:"https://lambda.gsfc.nasa.gov/graphics/tt_spectrum/tt_spectrum_2026feb_2048.png",
    caption:"CMB-only temperature bandpowers from ACT DR6, Planck, SPT and SPT-3G. The lower panel is a standardized visual residual to a smoothed Planck reference, not a likelihood residual.",
    ylabel:"DℓTT = ℓ(ℓ+1)CℓTT / 2π  [μK²]",
    xmin:2,xmax:5200,ymin:.1,ymax:12000,logY:true,parser:"csv"
  },
  TE:{
    title:"CMB temperature–E-mode cross spectrum",
    url:"https://lambda.gsfc.nasa.gov/graphics/te_spectrum/TE_data_2026feb_csv_format.dat",
    fallback:"https://lambda.gsfc.nasa.gov/graphics/te_spectrum/te_spectrum_2026feb_2048.png",
    caption:"Temperature–E-mode cross-bandpowers from ACT DR6, BICEP2/Keck, Planck, SPTpol, SPT-3G and WMAP where available in the LAMBDA plotting table.",
    ylabel:"DℓTE  [μK²]",
    xmin:2,xmax:8200,ymin:-220,ymax:220,logY:false,parser:"csv"
  },
  EE:{
    title:"CMB E-mode polarization power spectrum",
    url:"https://lambda.gsfc.nasa.gov/graphics/ee_spectrum/EE_data_2026feb_csv_format.dat",
    fallback:"https://lambda.gsfc.nasa.gov/graphics/ee_spectrum/ee_spectrum_2026feb_2048.png",
    caption:"E-mode polarization bandpowers from ACT DR6, BICEP2/Keck, Planck, POLARBEAR, SPTpol, SPT-3G and WMAP where available.",
    ylabel:"DℓEE  [μK²]",
    xmin:2,xmax:8200,ymin:-5,ymax:55,logY:false,parser:"csv"
  },
  LENSING:{
    title:"CMB gravitational-lensing potential power",
    url:"https://lambda.gsfc.nasa.gov/graphics/lensing_power/lensing_data_2019dec.dat",
    fallback:"https://lambda.gsfc.nasa.gov/graphics/lensing_power/lensing_power_2019dec_1024.png",
    caption:"Measurements of the CMB lensing-potential power spectrum from multiple experiments. Upper-limit bins are retained as flags where supplied by LAMBDA.",
    ylabel:"10⁷[L(L+1)]² Cᴸφφ / 2π",
    xmin:8,xmax:2200,ymin:-.55,ymax:2.05,logY:false,parser:"space"
  },
  BB:{
    title:"Observed CMB B-mode polarization measurements",
    url:"https://lambda.gsfc.nasa.gov/graphics/bb_upperlimits/bb_data_2021apr_csv_format.dat",
    fallback:"https://lambda.gsfc.nasa.gov/graphics/bb_upperlimits/bb_upperlimits_2021apr_2048.png",
    caption:"B-mode detections and upper limits in the public LAMBDA plotting table. B modes contain lensing and foreground contributions; this panel is not a direct primordial-tensor measurement.",
    ylabel:"DℓBB  [μK²]",
    xmin:20,xmax:2200,ymin:1e-4,ymax:10,logY:true,parser:"csv"
  }
};

const state={
  active:"TT",cache:new Map(),plotPoints:[],transform:null,three:null,
  pointer:{x:.5,y:.5},scroll:0
};

/* image reliability: project-absolute path first, raw GitHub fallback second */
for(const img of document.querySelectorAll(".research-image")){
  img.addEventListener("error",()=>{
    if(img.dataset.rawTried)return;
    img.dataset.rawTried="1";
    const name=img.src.split("/").pop();
    img.src=RAW+"assets/images/"+name;
  },{once:false});
}

/* progress + cursor glow */
const progress=document.getElementById("progress");
const cursor=document.querySelector(".cursor-orb");
let cx=innerWidth*.5,cy=innerHeight*.5,tx=cx,ty=cy;
addEventListener("pointermove",e=>{
  tx=e.clientX;ty=e.clientY;
  state.pointer.x=e.clientX/innerWidth;
  state.pointer.y=e.clientY/innerHeight;
},{passive:true});
function uiTick(){
  cx+=(tx-cx)*.09;cy+=(ty-cy)*.09;
  if(cursor&&!reduced)cursor.style.transform=`translate(${cx-160}px,${cy-160}px)`;
  if(progress){
    const d=document.documentElement;
    progress.style.width=(100*d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight))+"%";
    state.scroll=d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight);
  }
  requestAnimationFrame(uiTick);
}
requestAnimationFrame(uiTick);

/* spring-like reveal inspired by Motion/Framer timing */
const revealNodes=[...document.querySelectorAll(".reveal")];
if(!reduced&&"IntersectionObserver" in window){
  revealNodes.forEach(el=>{
    el.style.opacity="0";
    el.style.transform="translate3d(0,28px,0) scale(.985)";
    el.style.filter="blur(4px)";
  });
  const io=new IntersectionObserver((entries,observer)=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      const el=entry.target,delay=Number(el.dataset.delay||0);
      el.animate([
        {opacity:0,transform:"translate3d(0,28px,0) scale(.985)",filter:"blur(4px)"},
        {opacity:1,transform:"translate3d(0,-3px,0) scale(1.003)",filter:"blur(0)",offset:.72},
        {opacity:1,transform:"translate3d(0,0,0) scale(1)",filter:"blur(0)"}
      ],{duration:820,delay,easing:"cubic-bezier(.16,1,.3,1)",fill:"forwards"})
      .finished.finally(()=>{el.style.opacity="1";el.style.transform="none";el.style.filter="none"});
      observer.unobserve(el);
    }
  },{rootMargin:"0px 0px -7% 0px",threshold:.08});
  revealNodes.forEach(el=>io.observe(el));
}

/* restrained image parallax */
if(!reduced){
  const cards=[...document.querySelectorAll(".parallax-card")];
  let py=0;
  function parallaxTick(){
    const vh=innerHeight;
    for(const card of cards){
      const img=card.querySelector("img");if(!img)continue;
      const r=card.getBoundingClientRect();
      if(r.bottom<0||r.top>vh)continue;
      const depth=Number(card.dataset.depth||.035);
      const target=((r.top+r.height*.5)-vh*.5)*-depth;
      const prev=Number(img.dataset.parallaxY||0);
      const next=prev+(target-prev)*.08;
      img.dataset.parallaxY=next;
      img.style.translate=`0 ${next}px`;
      img.style.scale="1.035";
    }
    requestAnimationFrame(parallaxTick);
  }
  requestAnimationFrame(parallaxTick);
}

/* magnetic pills */
if(!reduced){
  for(const el of document.querySelectorAll(".magnetic")){
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*.12;
      const y=(e.clientY-r.top-r.height/2)*.12;
      el.style.transform=`translate3d(${x}px,${y}px,0)`;
    });
    el.addEventListener("pointerleave",()=>el.animate(
      [{transform:el.style.transform||"none"},{transform:"translate3d(0,0,0)"}],
      {duration:420,easing:"cubic-bezier(.16,1,.3,1)",fill:"forwards"}
    ));
  }
}

/* subtle 3D tilt */
if(!reduced){
  for(const card of document.querySelectorAll(".tilt-card")){
    card.addEventListener("pointermove",e=>{
      const r=card.getBoundingClientRect();
      const nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${-ny*4}deg) rotateY(${nx*5}deg) translateZ(0)`;
    });
    card.addEventListener("pointerleave",()=>{
      card.style.transition="transform .55s cubic-bezier(.16,1,.3,1)";
      card.style.transform="none";
      setTimeout(()=>card.style.transition="",560);
    });
  }
}

/* liquid WebGL field + hero bubble scene */
(async function initCosmos(){
  if(reduced)return;
  const flow=document.getElementById("liquidFlow");
  const hero=document.getElementById("heroScene");
  if(!flow&&!hero)return;
  try{
    const THREE=await import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js");
    state.three=THREE;

    if(flow){
      const renderer=new THREE.WebGLRenderer({canvas:flow,alpha:true,antialias:false,powerPreference:"high-performance"});
      const scene=new THREE.Scene();
      const camera=new THREE.Camera();
      const geo=new THREE.PlaneGeometry(2,2);
      const uniforms={
        uTime:{value:0},uScroll:{value:0},
        uPointer:{value:new THREE.Vector2(.5,.5)},
        uResolution:{value:new THREE.Vector2(innerWidth,innerHeight)}
      };
      const mat=new THREE.ShaderMaterial({
        transparent:true,depthWrite:false,uniforms,
        vertexShader:`
          varying vec2 vUv;
          void main(){vUv=uv;gl_Position=vec4(position,1.0);}
        `,
        fragmentShader:`
          precision highp float;
          varying vec2 vUv;
          uniform float uTime,uScroll;
          uniform vec2 uPointer,uResolution;
          float field(vec2 p){
            float a=sin(p.x*5.2+uTime*.36+sin(p.y*2.4));
            float b=sin(p.y*4.1-uTime*.27+cos(p.x*3.3));
            float c=sin((p.x+p.y)*3.5+uTime*.21);
            return (a+b+c)/3.0;
          }
          void main(){
            vec2 uv=vUv;
            vec2 p=uv*2.0-1.0;
            p.x*=uResolution.x/max(uResolution.y,1.0);
            vec2 m=(uPointer-.5)*.55;
            p+=m*.16;
            float f=field(p+vec2(uScroll*.8,-uScroll*.45));
            float f2=field(p*1.7+vec2(1.8,-1.2)-uTime*.04);
            float ribbon=smoothstep(.30,.98,.5+.5*sin((p.x*.85+p.y*.72+f*.7+f2*.25)*5.2));
            vec3 c1=vec3(.18,.31,.82);
            vec3 c2=vec3(.08,.55,.63);
            vec3 c3=vec3(.79,.54,.19);
            float mixv=.5+.5*f;
            vec3 col=mix(c1,c2,mixv);
            col=mix(col,c3,smoothstep(.55,1.0,ribbon)*.30);
            float alpha=(.035+.055*ribbon)*smoothstep(1.7,.15,length(p)*.55);
            gl_FragColor=vec4(col,alpha);
          }
        `
      });
      scene.add(new THREE.Mesh(geo,mat));
      function resizeFlow(){
        renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));
        renderer.setSize(innerWidth,innerHeight,false);
        uniforms.uResolution.value.set(innerWidth,innerHeight);
      }
      resizeFlow();addEventListener("resize",resizeFlow,{passive:true});
      const t0=performance.now();
      function flowTick(t){
        uniforms.uTime.value=(t-t0)/1000;
        uniforms.uScroll.value=state.scroll;
        uniforms.uPointer.value.set(state.pointer.x,state.pointer.y);
        renderer.render(scene,camera);
        requestAnimationFrame(flowTick);
      }
      requestAnimationFrame(flowTick);
    }

    if(hero){
      const host=hero.parentElement;
      const renderer=new THREE.WebGLRenderer({canvas:hero,alpha:true,antialias:true,powerPreference:"high-performance"});
      const scene=new THREE.Scene();
      const camera=new THREE.PerspectiveCamera(44,1,.1,50);camera.position.z=7;
      const group=new THREE.Group();scene.add(group);
      const sphereGeo=new THREE.SphereGeometry(1,40,28);
      const specs=[[-2.5,1.3,-1.3,.62],[1.7,1.5,-1.8,.8],[2.2,-1.4,-2,.95],[-1.2,-1.7,-2.5,.48],[.2,.1,-3,.38]];
      for(const [x,y,z,s] of specs){
        const material=new THREE.MeshPhysicalMaterial({
          color:0x6d86ff,transparent:true,opacity:.22,roughness:.08,metalness:0,
          transmission:.64,thickness:1.1,ior:1.18,clearcoat:1,clearcoatRoughness:.15
        });
        const mesh=new THREE.Mesh(sphereGeo,material);mesh.position.set(x,y,z);mesh.scale.setScalar(s);group.add(mesh);
      }
      const ring=new THREE.Mesh(
        new THREE.TorusGeometry(2.45,.018,10,120),
        new THREE.MeshBasicMaterial({color:0xe0b45a,transparent:true,opacity:.55})
      );
      ring.rotation.x=1.2;ring.rotation.z=.2;ring.position.z=-1.5;group.add(ring);
      scene.add(new THREE.PointLight(0x91a7ff,18,18));
      const warm=new THREE.PointLight(0xffc777,14,18);warm.position.set(-3,2,4);scene.add(warm);
      const pointsGeo=new THREE.BufferGeometry();
      const arr=new Float32Array(360*3);
      for(let i=0;i<360;i++){arr[i*3]=(Math.random()-.5)*9;arr[i*3+1]=(Math.random()-.5)*7;arr[i*3+2]=-Math.random()*7}
      pointsGeo.setAttribute("position",new THREE.BufferAttribute(arr,3));
      scene.add(new THREE.Points(pointsGeo,new THREE.PointsMaterial({color:0xffffff,size:.025,transparent:true,opacity:.6})));
      function resizeHero(){
        const r=host.getBoundingClientRect();
        renderer.setPixelRatio(Math.min(devicePixelRatio,1.4));
        renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();
      }
      resizeHero();addEventListener("resize",resizeHero,{passive:true});
      const t0=performance.now();
      function heroTick(t){
        const u=(t-t0)*.00016;
        group.rotation.y=u+(state.pointer.x-.5)*.12;
        group.rotation.x=(state.pointer.y-.5)*-.08;
        ring.rotation.z=.2+u*.7;
        renderer.render(scene,camera);requestAnimationFrame(heroTick);
      }
      requestAnimationFrame(heroTick);
    }
  }catch(err){console.warn("3D enhancement unavailable",err)}
})();

/* ---------- PAPER-STYLE DATA OBSERVATORY ---------- */
const COLORS={
  PLANCK:"#d62728",ACT:"#009e73",SPT:"#cc7a00",SPT3G:"#f0a000",WMAP:"#0072b2",
  BICEP:"#7cb342",POLARBEAR:"#25a9e0",ACTPOL:"#8e44ad",OTHER:"#4f5b67"
};
function expFamily(name=""){
  const n=name.toUpperCase();
  if(n.includes("PLANCK"))return"PLANCK";
  if(n.includes("SPT-3G")||n.includes("SPT3G"))return"SPT3G";
  if(n.includes("SPT"))return"SPT";
  if(n.includes("ACTPOL"))return"ACTPOL";
  if(n.includes("ACT"))return"ACT";
  if(n.includes("WMAP"))return"WMAP";
  if(n.includes("BICEP")||n.includes("KECK"))return"BICEP";
  if(n.includes("POLARBEAR"))return"POLARBEAR";
  return"OTHER";
}
function markerShape(ctx,x,y,r,family){
  ctx.beginPath();
  if(family==="PLANCK"||family==="ACT"){ctx.arc(x,y,r,0,Math.PI*2)}
  else if(family==="SPT"||family==="SPT3G"){ctx.rect(x-r,y-r,r*2,r*2)}
  else if(family==="WMAP"){ctx.moveTo(x,y-r-1);ctx.lineTo(x+r+1,y+r);ctx.lineTo(x-r-1,y+r);ctx.closePath()}
  else{ctx.moveTo(x,y-r-1);ctx.lineTo(x+r+1,y);ctx.lineTo(x,y+r+1);ctx.lineTo(x-r-1,y);ctx.closePath()}
}
function parseCSV(text){
  return text.split(/\r?\n/).map(l=>l.trim()).filter(l=>l&&!l.startsWith("#")&&!/Experiment/i.test(l)).map(l=>{
    const a=l.split(",").map(s=>s.trim());
    return{
      exp:a[0],lmin:Number(a[1]),ell:Number(a[2]),lmax:Number(a[3]),
      power:Number(a[4]),minus:Number(a[5]),plus:Number(a[6]),upper:Number(a[7])
    }
  }).filter(d=>Number.isFinite(d.ell)&&Number.isFinite(d.power));
}
function parseSpace(text){
  return text.split(/\r?\n/).map(l=>l.trim()).filter(l=>l&&!l.startsWith("#")&&!/Measurements|Experiment|Upper limits|They are|function corresponding/i.test(l)).map(l=>{
    const a=l.split(/\s+/);
    return{
      exp:a[0],lmin:Number(a[1]),ell:Number(a[2]),lmax:Number(a[3]),
      power:Number(a[4]),minus:Number(a[5]),plus:Number(a[5]),upper:Number(a[6])
    }
  }).filter(d=>Number.isFinite(d.ell)&&Number.isFinite(d.power));
}
function cleanSigma(d){return Math.max(1e-12,(Math.abs(d.minus||0)+Math.abs(d.plus||d.minus||0))/2)}
function smoothedReference(rows){
  let ref=rows.filter(d=>expFamily(d.exp)==="PLANCK"&&Number.isFinite(d.power)).sort((a,b)=>a.ell-b.ell);
  if(ref.length<8)ref=[...rows].filter(d=>Number.isFinite(d.power)).sort((a,b)=>a.ell-b.ell);
  if(ref.length<3)return()=>NaN;
  const xs=ref.map(d=>Math.log(Math.max(1,d.ell))), ys=ref.map(d=>d.power);
  const sy=ys.map((_,i)=>{
    let wsum=0,sum=0;
    for(let j=Math.max(0,i-2);j<=Math.min(ys.length-1,i+2);j++){
      const w=j===i?3:(Math.abs(j-i)===1?2:1);sum+=ys[j]*w;wsum+=w;
    }
    return sum/wsum;
  });
  return ell=>{
    const x=Math.log(Math.max(1,ell));
    if(x<=xs[0])return sy[0];
    if(x>=xs[xs.length-1])return sy[sy.length-1];
    let lo=0,hi=xs.length-1;
    while(hi-lo>1){const m=(lo+hi)>>1;if(xs[m]<x)lo=m;else hi=m}
    const t=(x-xs[lo])/(xs[hi]-xs[lo]||1);
    return sy[lo]*(1-t)+sy[hi]*t;
  };
}
function niceTicks(min,max,count=6){
  const raw=(max-min)/count;
  const p=Math.pow(10,Math.floor(Math.log10(Math.abs(raw)||1)));
  const n=raw/p;const step=(n<1.5?1:n<3?2:n<7?5:10)*p;
  const out=[];for(let v=Math.ceil(min/step)*step;v<=max+step*.2;v+=step)out.push(v);
  return out;
}
function axisText(ctx,text,x,y,align="center"){
  ctx.fillStyle="#111827";ctx.font="26px Georgia, serif";ctx.textAlign=align;ctx.fillText(text,x,y);
}
function drawPaperSpectrum(rows,type){
  const cfg=DATASETS[type];
  const c=document.getElementById("spectrumChart"),rCanvas=document.getElementById("residualChart");
  if(!c||!rCanvas)return;
  const ctx=c.getContext("2d"),W=c.width,H=c.height;
  const p={l:112,r:34,t:46,b:70};
  const lx=v=>Math.log10(Math.max(cfg.xmin,v));
  const X=x=>p.l+(lx(x)-lx(cfg.xmin))/(lx(cfg.xmax)-lx(cfg.xmin))*(W-p.l-p.r);
  const ly=v=>Math.log10(Math.max(cfg.ymin,v));
  const Y=cfg.logY
    ? y=>H-p.b-(ly(y)-ly(cfg.ymin))/(ly(cfg.ymax)-ly(cfg.ymin))*(H-p.t-p.b)
    : y=>H-p.b-(y-cfg.ymin)/(cfg.ymax-cfg.ymin)*(H-p.t-p.b);

  ctx.clearRect(0,0,W,H);ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);
  ctx.save();
  ctx.strokeStyle="#111827";ctx.lineWidth=2;
  ctx.strokeRect(p.l,p.t,W-p.l-p.r,H-p.t-p.b);

  const xTicks=type==="LENSING"?[10,30,100,300,1000,2000]:[2,10,30,100,300,1000,3000,type==="TT"?5000:8000];
  ctx.font="20px Georgia, serif";ctx.fillStyle="#111827";ctx.textAlign="center";
  for(const v of xTicks.filter(v=>v>=cfg.xmin&&v<=cfg.xmax)){
    const x=X(v);ctx.strokeStyle="#d5d8de";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,p.t);ctx.lineTo(x,H-p.b);ctx.stroke();
    ctx.strokeStyle="#111827";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,H-p.b);ctx.lineTo(x,H-p.b-10);ctx.stroke();
    ctx.fillText(String(v),x,H-p.b+31);
  }

  const yTicks=cfg.logY
    ? (type==="BB"?[.0001,.001,.01,.1,1,10]:[.1,1,10,100,1000,10000])
    : niceTicks(cfg.ymin,cfg.ymax,6);
  ctx.textAlign="right";
  for(const v of yTicks){
    if(v<cfg.ymin||v>cfg.ymax)continue;
    const y=Y(v);ctx.strokeStyle="#e0e3e7";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(W-p.r,y);ctx.stroke();
    ctx.strokeStyle="#111827";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(p.l+10,y);ctx.stroke();
    const label=Math.abs(v)>=1000?String(Math.round(v)):Math.abs(v)<.01?v.toExponential(0):String(Number(v.toFixed(2)));
    ctx.fillStyle="#111827";ctx.fillText(label,p.l-15,y+7);
  }

  axisText(ctx,"Multipole  ℓ",(p.l+W-p.r)/2,H-17);
  ctx.save();ctx.translate(31,(p.t+H-p.b)/2);ctx.rotate(-Math.PI/2);axisText(ctx,cfg.ylabel,0,0);ctx.restore();

  const ref=smoothedReference(rows);
  if(type!=="BB"){
    ctx.strokeStyle="#202733";ctx.lineWidth=2.2;ctx.globalAlpha=.72;ctx.beginPath();
    let started=false;
    const N=450;
    for(let i=0;i<=N;i++){
      const ell=cfg.xmin*Math.pow(cfg.xmax/cfg.xmin,i/N),val=ref(ell);
      if(!Number.isFinite(val)||(cfg.logY&&val<=0))continue;
      const x=X(ell),y=Y(val);if(!started){ctx.moveTo(x,y);started=true}else ctx.lineTo(x,y);
    }
    ctx.stroke();ctx.globalAlpha=1;
  }

  const plotted=[];
  const families=[...new Set(rows.map(d=>expFamily(d.exp)))];
  for(const family of families){
    const col=COLORS[family]||COLORS.OTHER;
    const data=rows.filter(d=>expFamily(d.exp)===family&&d.ell>=cfg.xmin&&d.ell<=cfg.xmax);
    for(const d of data){
      if(cfg.logY&&d.power<=0&&!Number.isFinite(d.upper))continue;
      const power=cfg.logY&&d.power<=0?d.upper:d.power;
      if(!Number.isFinite(power)||power<cfg.ymin||power>cfg.ymax)continue;
      const x=X(d.ell),y=Y(power),sigma=cleanSigma(d);
      ctx.strokeStyle=col;ctx.fillStyle=col;ctx.lineWidth=1.5;ctx.globalAlpha=.7;

      if(Number.isFinite(d.minus)&&Number.isFinite(d.plus)&&d.power>0){
        const low=Math.max(cfg.logY?cfg.ymin:d.power-d.minus,d.power-d.minus);
        const high=d.power+d.plus;
        if((!cfg.logY||low>0)&&Number.isFinite(high)){
          ctx.beginPath();ctx.moveTo(x,Y(low));ctx.lineTo(x,Y(high));ctx.stroke();
          ctx.beginPath();ctx.moveTo(x-4,Y(low));ctx.lineTo(x+4,Y(low));ctx.moveTo(x-4,Y(high));ctx.lineTo(x+4,Y(high));ctx.stroke();
        }
      }
      if(Number.isFinite(d.upper)&&d.upper>0&&(!d.power||d.power<=0)){
        const uy=Y(d.upper);ctx.beginPath();ctx.moveTo(x,uy-8);ctx.lineTo(x,uy+7);ctx.lineTo(x-4,uy+2);ctx.moveTo(x,uy+7);ctx.lineTo(x+4,uy+2);ctx.stroke();
      }
      ctx.globalAlpha=.95;markerShape(ctx,x,y,4.1,family);ctx.fill();
      plotted.push({x,y,d,family,color:col});
    }
  }
  ctx.restore();
  state.plotPoints=plotted;
  state.transform={canvas:c,X,Y,type,cfg};

  drawResidual(rows,type,ref);
  drawLegend(rows);
  updateMetrics(rows,type);
}
function drawResidual(rows,type,ref){
  const c=document.getElementById("residualChart");if(!c)return;
  const ctx=c.getContext("2d"),W=c.width,H=c.height;
  const p={l:112,r:34,t:24,b:55},cfg=DATASETS[type];
  ctx.clearRect(0,0,W,H);ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);
  if(type==="BB"){
    ctx.fillStyle="#5f6876";ctx.font="20px Georgia, serif";ctx.textAlign="center";
    ctx.fillText("Residual panel suppressed for B-mode upper-limit compilation",W/2,H/2);
    return;
  }
  const X=x=>p.l+(Math.log10(Math.max(cfg.xmin,x))-Math.log10(cfg.xmin))/(Math.log10(cfg.xmax)-Math.log10(cfg.xmin))*(W-p.l-p.r);
  const Y=y=>H-p.b-(y+5)/10*(H-p.t-p.b);
  ctx.fillStyle="rgba(53,88,216,.06)";ctx.fillRect(p.l,Y(2),W-p.l-p.r,Y(-2)-Y(2));
  ctx.strokeStyle="#111827";ctx.lineWidth=2;ctx.strokeRect(p.l,p.t,W-p.l-p.r,H-p.t-p.b);
  ctx.strokeStyle="#9aa2ae";ctx.setLineDash([7,6]);ctx.beginPath();ctx.moveTo(p.l,Y(0));ctx.lineTo(W-p.r,Y(0));ctx.stroke();ctx.setLineDash([]);
  ctx.font="17px Georgia, serif";ctx.fillStyle="#111827";ctx.textAlign="right";
  [-4,-2,0,2,4].forEach(v=>{const y=Y(v);ctx.fillText(String(v),p.l-14,y+6);ctx.strokeStyle="#e1e4e8";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(W-p.r,y);ctx.stroke()});
  const families=[...new Set(rows.map(d=>expFamily(d.exp)))];
  for(const family of families){
    const col=COLORS[family]||COLORS.OTHER;ctx.fillStyle=col;
    for(const d of rows.filter(d=>expFamily(d.exp)===family)){
      const sig=cleanSigma(d),rv=(d.power-ref(d.ell))/sig;
      if(!Number.isFinite(rv)||Math.abs(rv)>8||d.ell<cfg.xmin||d.ell>cfg.xmax)continue;
      markerShape(ctx,X(d.ell),Y(Math.max(-5,Math.min(5,rv))),3.4,family);ctx.fill();
    }
  }
  ctx.fillStyle="#111827";ctx.textAlign="center";ctx.font="18px Georgia, serif";ctx.fillText("Multipole  ℓ",W/2,H-14);
  ctx.save();ctx.translate(30,H/2+20);ctx.rotate(-Math.PI/2);ctx.fillText("(data − reference) / σ",0,0);ctx.restore();
}
function drawLegend(rows){
  const el=document.getElementById("spectrumLegend");if(!el)return;
  const seen=[];
  for(const d of rows){const fam=expFamily(d.exp);if(!seen.includes(fam))seen.push(fam)}
  el.innerHTML=seen.map(f=>`<span><i style="background:${COLORS[f]||COLORS.OTHER}"></i>${f==="SPT3G"?"SPT-3G":f}</span>`).join("")+
    '<span><i style="background:#202733;border-radius:0;height:2px;vertical-align:middle"></i>smoothed Planck reference</span>';
}
function updateMetrics(rows,type){
  const exps=new Set(rows.map(d=>d.exp));
  const ells=rows.map(d=>d.ell).filter(Number.isFinite);
  const $=id=>document.getElementById(id);
  if($("rowCount"))$("rowCount").textContent=rows.length.toLocaleString();
  if($("expCount"))$("expCount").textContent=exps.size;
  if($("ellRange"))$("ellRange").textContent=Math.round(Math.min(...ells))+"–"+Math.round(Math.max(...ells));
  if($("activeDataset"))$("activeDataset").textContent=type==="LENSING"?"LAMBDA 2019":"LAMBDA "+(type==="BB"?"2021":"Feb 2026");
}
async function loadSpectrum(type){
  state.active=type;
  const cfg=DATASETS[type];
  document.getElementById("spectrumTitle").textContent=cfg.title;
  document.getElementById("spectrumCaptionLead").textContent=type+":";
  document.getElementById("spectrumCaption").textContent=cfg.caption;
  document.querySelectorAll(".spectrum-tab").forEach(b=>b.classList.toggle("active",b.dataset.spectrum===type));
  const status=document.getElementById("dataStatus");
  const fallback=document.getElementById("officialSpectrumFallback");
  const plot=document.querySelector(".plot-wrap"),resid=document.querySelector(".residual-wrap");
  if(status)status.textContent="Loading "+type+" data from NASA/LAMBDA…";
  if(fallback){fallback.hidden=true;fallback.removeAttribute("src")}
  if(plot)plot.hidden=false;if(resid)resid.hidden=false;

  try{
    let rows=state.cache.get(type);
    if(!rows){
      const r=await fetch(cfg.url,{cache:"no-store",mode:"cors"});
      if(!r.ok)throw Error("HTTP "+r.status);
      const text=await r.text();
      rows=cfg.parser==="space"?parseSpace(text):parseCSV(text);
      if(rows.length<5)throw Error("Too few data rows");
      state.cache.set(type,rows);
    }
    drawPaperSpectrum(rows,type);
    if(status)status.textContent=`Live NASA/LAMBDA · ${rows.length} rows loaded · ${new Set(rows.map(d=>d.exp)).size} experiment labels`;
  }catch(err){
    console.warn("Spectrum data fetch failed",type,err);
    if(plot)plot.hidden=true;if(resid)resid.hidden=true;
    if(fallback){fallback.src=cfg.fallback;fallback.hidden=false}
    const legend=document.getElementById("spectrumLegend");if(legend)legend.innerHTML="";
    if(status)status.textContent="Live table blocked by browser/CORS — displaying the official NASA/LAMBDA published plot.";
    document.getElementById("rowCount").textContent="official plot";
    document.getElementById("expCount").textContent="—";
    document.getElementById("ellRange").textContent=cfg.xmin+"–"+cfg.xmax;
  }
}
document.querySelectorAll(".spectrum-tab").forEach(btn=>btn.addEventListener("click",()=>loadSpectrum(btn.dataset.spectrum)));
loadSpectrum("TT");

/* plot tooltip */
const plotCanvas=document.getElementById("spectrumChart");
const tooltip=document.getElementById("plotTooltip");
if(plotCanvas&&tooltip){
  plotCanvas.addEventListener("pointermove",e=>{
    if(!state.plotPoints.length){tooltip.hidden=true;return}
    const r=plotCanvas.getBoundingClientRect(),sx=plotCanvas.width/r.width,sy=plotCanvas.height/r.height;
    const mx=(e.clientX-r.left)*sx,my=(e.clientY-r.top)*sy;
    let best=null,bd=20*20*sx*sx;
    for(const p of state.plotPoints){const dx=p.x-mx,dy=p.y-my,d=dx*dx+dy*dy;if(d<bd){bd=d;best=p}}
    if(!best){tooltip.hidden=true;return}
    const d=best.d;
    tooltip.hidden=false;
    tooltip.innerHTML=`<b>${d.exp}</b><br>ℓ = ${d.ell}<br>Dℓ = ${d.power.toPrecision(5)}${Number.isFinite(d.minus)?` ± ${cleanSigma(d).toPrecision(3)}`:""}`;
    tooltip.style.left=Math.min(r.width-180,e.clientX-r.left+14)+"px";
    tooltip.style.top=Math.max(6,e.clientY-r.top-24)+"px";
  });
  plotCanvas.addEventListener("pointerleave",()=>tooltip.hidden=true);
}

/* ---------- n_s – r explorer, paper style ---------- */
const slider=document.getElementById("efolds");
function modelValues(N){return{qns:1-2/(N+.5),qr:8/(N+.5),sns:1-2/N,sr:12/(N*N)}}
function drawNR(N=60){
  const c=document.getElementById("nrChart");if(!c)return;
  const ctx=c.getContext("2d"),W=c.width,H=c.height,p={l:94,r:28,t:46,b:72};
  const xmin=.94,xmax=.99,ymin=0,ymax=.18;
  const X=x=>p.l+(x-xmin)/(xmax-xmin)*(W-p.l-p.r),Y=y=>H-p.b-(y-ymin)/(ymax-ymin)*(H-p.t-p.b);
  ctx.clearRect(0,0,W,H);ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);
  ctx.fillStyle="rgba(53,88,216,.08)";ctx.fillRect(X(.965),p.t,X(.9714)-X(.965),H-p.t-p.b);
  ctx.fillStyle="rgba(201,136,43,.07)";ctx.fillRect(p.l,Y(.034),W-p.l-p.r,Y(0)-Y(.034));
  ctx.strokeStyle="#111827";ctx.lineWidth=2;ctx.strokeRect(p.l,p.t,W-p.l-p.r,H-p.t-p.b);
  ctx.font="16px Georgia, serif";ctx.fillStyle="#111827";ctx.textAlign="center";
  for(let x=.94;x<=.9901;x+=.01){
    const px=X(x);ctx.strokeStyle="#e3e5e9";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(px,p.t);ctx.lineTo(px,H-p.b);ctx.stroke();
    ctx.fillStyle="#111827";ctx.fillText(x.toFixed(2),px,H-p.b+28);
  }
  ctx.textAlign="right";
  for(let y=0;y<=.1801;y+=.03){
    const py=Y(y);ctx.strokeStyle="#e3e5e9";ctx.beginPath();ctx.moveTo(p.l,py);ctx.lineTo(W-p.r,py);ctx.stroke();
    ctx.fillStyle="#111827";ctx.fillText(y.toFixed(2),p.l-14,py+5);
  }
  function curve(color,dash,fn,label){
    ctx.strokeStyle=color;ctx.lineWidth=3;ctx.setLineDash(dash);ctx.beginPath();
    for(let n=45;n<=70;n+=.25){const[ns,r]=fn(n);if(n===45)ctx.moveTo(X(ns),Y(r));else ctx.lineTo(X(ns),Y(r))}
    ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=color;ctx.textAlign="left";ctx.font="15px Georgia, serif";ctx.fillText(label,X(fn(68)[0])+8,Y(fn(68)[1])-4);
  }
  curve("#6b58c9",[],n=>[1-2/(n+.5),8/(n+.5)],"V ∝ φ²");
  curve("#0f7f86",[9,6],n=>[1-2/n,12/(n*n)],"Starobinsky");
  const v=modelValues(N);
  [[v.qns,v.qr,"#6b58c9"],[v.sns,v.sr,"#0f7f86"]].forEach(([ns,r,col])=>{
    ctx.fillStyle=col;ctx.strokeStyle="#fff";ctx.lineWidth=2;ctx.beginPath();ctx.arc(X(ns),Y(r),7,0,Math.PI*2);ctx.fill();ctx.stroke();
  });
  ctx.fillStyle="#111827";ctx.textAlign="left";ctx.font="600 19px Georgia, serif";ctx.fillText("Inflation model trajectories in nₛ–r space",p.l,p.t-16);
  ctx.font="15px Georgia, serif";ctx.textAlign="center";ctx.fillText("scalar spectral index  nₛ",W/2,H-18);
  ctx.save();ctx.translate(25,H/2+36);ctx.rotate(-Math.PI/2);ctx.fillText("tensor-to-scalar ratio  r",0,0);ctx.restore();
  ctx.fillStyle="#586273";ctx.font="12px system-ui";ctx.textAlign="left";
  ctx.fillText("blue band: nₛ benchmark · amber region: r < 0.034",p.l+8,p.t+20);
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
