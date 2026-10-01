import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@13.5.0/+esm";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduced){
  inView(".reveal",({target})=>animate(target,{opacity:[0,1],y:[28,0]},{duration:.72,easing:[.22,1,.36,1]}),{margin:"-8% 0px -8% 0px"});
  inView(".question-ledger",()=>animate(".question-ledger article",{opacity:[0,1],y:[18,0]},{delay:stagger(.08),duration:.5}));
}
else document.querySelectorAll(".reveal").forEach(el=>{el.style.opacity=1;el.style.transform="none"});

addEventListener("scroll",()=>{const d=document.documentElement;document.getElementById("progress").style.width=(100*d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight))+"%"},{passive:true});

// --- 3D inflation landscape --------------------------------------------------
const heroCanvas=document.getElementById("universe3d");
const renderer=new THREE.WebGLRenderer({canvas:heroCanvas,alpha:true,antialias:true,powerPreference:"high-performance"});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,100);camera.position.set(0,0,8.6);
const group=new THREE.Group();scene.add(group);
const bubbleGeo=new THREE.SphereGeometry(1,48,32);
const bubbleMat=new THREE.MeshPhysicalMaterial({color:0x5d78df,transparent:true,opacity:.18,roughness:.08,metalness:.05,transmission:.82,thickness:.8,ior:1.2,side:THREE.DoubleSide});
const bubbles=[];
const specs=[[2.5,.6,-1.5,1.6],[1.1,2,-2.7,.85],[3.8,2.1,-4,.65],[4.6,-1.8,-4.3,.9],[.3,-1.9,-3.4,.58],[5.4,.2,-5,.45],[2.6,-2.6,-5.5,.42]];
for(const [x,y,z,s] of specs){const m=new THREE.Mesh(bubbleGeo,bubbleMat.clone());m.position.set(x,y,z);m.scale.setScalar(s);group.add(m);bubbles.push(m);const core=new THREE.Mesh(new THREE.SphereGeometry(.08,16,12),new THREE.MeshBasicMaterial({color:0xf4c66a}));core.position.copy(m.position);core.scale.setScalar(Math.max(.5,s));group.add(core)}
const starsGeo=new THREE.BufferGeometry(),starN=1100,pos=new Float32Array(starN*3);
for(let i=0;i<starN;i++){pos[i*3]=(Math.random()-.5)*18;pos[i*3+1]=(Math.random()-.5)*11;pos[i*3+2]=-Math.random()*10+1}starsGeo.setAttribute("position",new THREE.BufferAttribute(pos,3));
const stars=new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xcad9ff,size:.018,transparent:true,opacity:.8}));scene.add(stars);
const rim=new THREE.PointLight(0x7e89ff,14,18);rim.position.set(4,3,3);scene.add(rim);const warm=new THREE.PointLight(0xffc467,9,12);warm.position.set(2,-1,3);scene.add(warm);
let mouseX=0,mouseY=0;addEventListener("pointermove",e=>{mouseX=(e.clientX/innerWidth-.5);mouseY=(e.clientY/innerHeight-.5)});
let t0=performance.now();function render3d(t){const tt=(t-t0)*.00022;group.rotation.y=tt*.35+mouseX*.12;group.rotation.x=mouseY*.08;stars.rotation.y=-tt*.08;bubbles.forEach((b,i)=>{b.position.y+=Math.sin(tt*2+i)*.0007});renderer.render(scene,camera);if(!reduced)requestAnimationFrame(render3d)}renderer.render(scene,camera);if(!reduced)requestAnimationFrame(render3d);
addEventListener("resize",()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()});

// --- Liquid causal flow field -----------------------------------------------
const flow=document.getElementById("flowCanvas"),fx=flow.getContext("2d");let particles=[];
function resizeFlow(){flow.width=Math.floor(innerWidth*Math.min(devicePixelRatio,1.5));flow.height=Math.floor(flow.parentElement.clientHeight*Math.min(devicePixelRatio,1.5));particles=Array.from({length:260},()=>({x:Math.random()*flow.width,y:Math.random()*flow.height,life:Math.random()*160+60,h:190+Math.random()*60}))}
function flowAngle(x,y,time){return Math.sin(x*.003+time)*1.25+Math.cos(y*.004-time*.7)*1.1+Math.sin((x+y)*.0017)*.65}
function drawFlow(ts){fx.fillStyle="rgba(4,16,30,.055)";fx.fillRect(0,0,flow.width,flow.height);for(const p of particles){const a=flowAngle(p.x,p.y,ts*.00035);const px=p.x,py=p.y;p.x+=Math.cos(a)*1.25;p.y+=Math.sin(a)*1.25;p.life--;fx.beginPath();fx.moveTo(px,py);fx.lineTo(p.x,p.y);fx.strokeStyle="hsla("+p.h+",78%,68%,.23)";fx.lineWidth=1.15;fx.stroke();if(p.life<0||p.x<0||p.x>flow.width||p.y<0||p.y>flow.height){p.x=Math.random()*flow.width;p.y=Math.random()*flow.height;p.life=Math.random()*160+80}}if(!reduced)requestAnimationFrame(drawFlow)}
resizeFlow();fx.fillStyle="#04101e";fx.fillRect(0,0,flow.width,flow.height);if(!reduced)requestAnimationFrame(drawFlow);addEventListener("resize",resizeFlow);

// --- Inflation lab -----------------------------------------------------------
const slider=document.getElementById("efolds"),nValue=document.getElementById("nValue");
function modelValues(N){return{qns:1-2/(N+.5),qr:8/(N+.5),sns:1-2/N,sr:12/(N*N)}}
function updateLab(){const N=Number(slider.value),v=modelValues(N);nValue.textContent=N;document.getElementById("qNs").textContent="nₛ ≈ "+v.qns.toFixed(5);document.getElementById("qR").textContent="r ≈ "+v.qr.toFixed(5);document.getElementById("sNs").textContent="nₛ ≈ "+v.sns.toFixed(5);document.getElementById("sR").textContent="r ≈ "+v.sr.toFixed(5);drawNR(N)}
slider.addEventListener("input",updateLab);
function drawNR(N=60){const c=document.getElementById("nrChart"),ctx=c.getContext("2d"),W=c.width,H=c.height,p={l:75,r:28,t:38,b:62},xmin=.94,xmax=.99,ymin=0,ymax=.18;const X=x=>p.l+(x-xmin)/(xmax-xmin)*(W-p.l-p.r),Y=y=>H-p.b-(y-ymin)/(ymax-ymin)*(H-p.t-p.b);ctx.clearRect(0,0,W,H);ctx.fillStyle="#071523";ctx.fillRect(0,0,W,H);ctx.fillStyle="rgba(117,226,240,.10)";ctx.fillRect(X(.9682-.0032),p.t,X(.9682+.0032)-X(.9682-.0032),H-p.t-p.b);ctx.fillStyle="rgba(240,199,107,.09)";ctx.fillRect(p.l,Y(.034),W-p.l-p.r,Y(0)-Y(.034));ctx.strokeStyle="rgba(220,233,248,.18)";for(let x=.94;x<=.9901;x+=.01){ctx.beginPath();ctx.moveTo(X(x),p.t);ctx.lineTo(X(x),H-p.b);ctx.stroke();ctx.fillStyle="#91a5bd";ctx.font="14px sans-serif";ctx.fillText(x.toFixed(2),X(x)-14,H-p.b+25)}for(let y=0;y<=.1801;y+=.03){ctx.beginPath();ctx.moveTo(p.l,Y(y));ctx.lineTo(W-p.r,Y(y));ctx.stroke();ctx.fillText(y.toFixed(2),20,Y(y)+4)}function curve(color,dash,fn){ctx.strokeStyle=color;ctx.lineWidth=3.5;ctx.setLineDash(dash);ctx.beginPath();for(let n=45;n<=70;n+=.25){const[ns,r]=fn(n);if(n===45)ctx.moveTo(X(ns),Y(r));else ctx.lineTo(X(ns),Y(r))}ctx.stroke();ctx.setLineDash([])}curve("#a78bfa",[],n=>[1-2/(n+.5),8/(n+.5)]);curve("#75e2f0",[9,6],n=>[1-2/n,12/(n*n)]);const v=modelValues(N);[[v.qns,v.qr,"#a78bfa"],[v.sns,v.sr,"#75e2f0"]].forEach(([ns,r,col])=>{ctx.fillStyle=col;ctx.beginPath();ctx.arc(X(ns),Y(r),7,0,Math.PI*2);ctx.fill()});ctx.fillStyle="#eef4ff";ctx.font="700 17px sans-serif";ctx.fillText("Model predictions in nₛ–r space",p.l,p.t-12);ctx.fillStyle="#91a5bd";ctx.font="13px sans-serif";ctx.fillText("nₛ",W/2,H-15);ctx.save();ctx.translate(18,H/2);ctx.rotate(-Math.PI/2);ctx.fillText("r",0,0);ctx.restore()}updateLab();

// --- NASA LAMBDA TT spectrum ------------------------------------------------
function parseTT(text){return text.split(/\r?\n/).filter(l=>l&&!l.trim().startsWith("#")).map(l=>{const a=l.split(",").map(s=>s.trim());return{exp:a[0],ell:Number(a[2]),power:Number(a[4]),minus:Number(a[5]),plus:Number(a[6])}}).filter(d=>Number.isFinite(d.ell)&&Number.isFinite(d.power))}
function drawCMB(rows){const c=document.getElementById("cmbChart"),ctx=c.getContext("2d"),W=c.width,H=c.height,p={l:82,r:30,t:38,b:66},xmin=2,xmax=5000,ymin=0,ymax=6200;const X=x=>p.l+(Math.log10(x)-Math.log10(xmin))/(Math.log10(xmax)-Math.log10(xmin))*(W-p.l-p.r),Y=y=>H-p.b-(y-ymin)/(ymax-ymin)*(H-p.t-p.b);ctx.clearRect(0,0,W,H);ctx.fillStyle="#071523";ctx.fillRect(0,0,W,H);ctx.strokeStyle="rgba(220,233,248,.14)";[2,10,100,1000,5000].forEach(x=>{ctx.beginPath();ctx.moveTo(X(x),p.t);ctx.lineTo(X(x),H-p.b);ctx.stroke();ctx.fillStyle="#91a5bd";ctx.font="14px sans-serif";ctx.fillText(String(x),X(x)-10,H-p.b+26)});[0,1000,2000,3000,4000,5000,6000].forEach(y=>{ctx.beginPath();ctx.moveTo(p.l,Y(y));ctx.lineTo(W-p.r,Y(y));ctx.stroke();ctx.fillText(String(y),24,Y(y)+4)});[{re:/Planck_2018/,color:"#f0c76b"},{re:/ACT_DR6_2025/,color:"#75e2f0"}].forEach(s=>rows.filter(d=>s.re.test(d.exp)).forEach(d=>{const x=X(d.ell),y=Y(d.power),lo=Y(d.power-d.minus),hi=Y(d.power+d.plus);ctx.strokeStyle=s.color;ctx.globalAlpha=.4;ctx.beginPath();ctx.moveTo(x,lo);ctx.lineTo(x,hi);ctx.stroke();ctx.globalAlpha=.86;ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(x,y,d.exp.includes("unbinn")?2:3,0,Math.PI*2);ctx.fill()}));ctx.globalAlpha=1;ctx.fillStyle="#eef4ff";ctx.font="700 17px sans-serif";ctx.fillText("CMB TT angular power spectrum — released measurements",p.l,p.t-12);ctx.fillStyle="#91a5bd";ctx.font="13px sans-serif";ctx.fillText("multipole ℓ (log scale)",W/2,H-16);ctx.save();ctx.translate(18,H/2);ctx.rotate(-Math.PI/2);ctx.fillText("ℓ(ℓ+1)Cℓ / 2π [μK²]",0,0);ctx.restore()}
async function loadCMB(){const s=document.getElementById("dataStatus"),urls=["data/TT_data_2026feb_csv_format.dat","https://lambda.gsfc.nasa.gov/graphics/tt_spectrum/TT_data_2026feb_csv_format.dat"];for(const u of urls){try{const r=await fetch(u,{cache:"no-store"});if(!r.ok)throw Error(r.status);const rows=parseTT(await r.text());if(rows.length<20)throw Error("too few rows");drawCMB(rows);s.textContent="Loaded "+rows.length+" released bandpower rows · NASA/LAMBDA";return}catch(e){}}s.textContent="CMB table could not be loaded in this browser. Source: NASA/LAMBDA."}loadCMB();
