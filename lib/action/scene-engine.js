import {kitchenMotion,springStep,banknoteAt} from './performance-math.mjs';
import {smooth,travelProgress,engagedTime,bodyPoint,HOP,SPAWN} from './motion-math.mjs';
import {bodyPose,travelPose,toWorld} from './pose.mjs';
import {createSound,travelCues,cuesBetween} from './sound.mjs';
import {LINES,SHOUTS,TURN,bubbleDelay,bubbleLook,wrapLines,fitInside,bubbleLayout,popLimit,turnFrames,lineOf,runs,runWidth,seeded,blobPoints,smoothClosed,burstPoints,tailCurve,burstShake} from './comic.mjs';

export function mountScene(root){
const controller=new AbortController(), signal=controller.signal;
let disposed=false;
const listen=(target,type,fn)=>target.addEventListener(type,fn,{signal});
const q=s=>root.querySelector(s),cardsEl=q('.ch-cards'),cards=[...root.querySelectorAll('.ch-card')],canvases=cards.map(x=>x.querySelector('canvas')),fx=q('.ch-flight'),g=fx.getContext('2d'),photo=q('.ch-photo'),rm=matchMedia('(prefers-reduced-motion:reduce)');
const head=new Image(),names=['Study mode','Finance','ByteDance · Product Manager','Kitchen Survivor','Off the clock'],actions=['writing away','working the keyboard','exploring ideas','cooking up a storm','capturing a moment'];
const clamp=n=>Math.max(0,Math.min(1,n)),mix=(a,b,t)=>a+(b-a)*t,ease=t=>t*t*(3-2*t),ink='#292b33',navy='#19365f',gold='#f2bd4d',red='#d13b49';
let stage=-1,mode='fun',started=false,loaded=false,t=0,localTime=0,last=0,raf,motion=null,queued=null,hoverTimer,autoTimer,landing=0,position={x:0,y:0},metrics=[],photoChange=null,celebration=null,transformed=false;
const opts={speed:1,ambient:true};
const travelPhotos=['northern-lights','golden-gate','coastal-waterfall'].map(name=>{const image=new Image();image.src='/action/assets/travel/'+name+'.jpg';return image});
const audio=createSound(),soundBtn=q('[data-sound]'),EGG=['ding','chaching','blip','sizzle','shutter'];
let frameDt=0,cloth={side:{value:0,velocity:0},lift:{value:0,velocity:0},prev:null};
// 气泡与彩蛋字各自用帧 dt 计时：减弱动效下 t/localTime 不走，但它们仍要按时消失。
let talk=null,shout=null,turn=null,lettered=false;const inkTone=getComputedStyle(root).getPropertyValue('--ink').trim()||ink;
const LETTER='"Shantell Sans", "Comic Neue", sans-serif',lettering=()=>{lettered=true};Promise.all(['500','italic 800'].map(w=>document.fonts?.load(`${w} 13px "Shantell Sans"`))).then(lettering,lettering);
photo.classList.remove('is-transforming');photo.dataset.transformed='false';photo.setAttribute('aria-pressed','false');
function box(ctx,x,y,w,h,fill,stroke=ink,r=0){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.4;ctx.stroke()}}
function line(ctx,pts,col=ink,width=1.5){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.strokeStyle=col;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
function poly(ctx,pts,fill,stroke=ink){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.5;ctx.stroke()}}
function oval(ctx,x,y,rx,ry,fill,stroke=null){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,7);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.3;ctx.stroke()}}
function txt(ctx,s,x,y,size=11,color=ink,font='Arial'){ctx.fillStyle=color;ctx.font=`${size}px ${font}`;ctx.fillText(s,x,y)}
function rect(el){let a=el.getBoundingClientRect(),b=root.getBoundingClientRect();return{x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height}}
function resize(){if(mode!=='fun'||turn)return;let d=Math.min(devicePixelRatio||1,2);fx.width=Math.ceil(root.clientWidth*d);fx.height=Math.ceil(root.scrollHeight*d);fx.style.width=root.clientWidth+'px';fx.style.height=root.scrollHeight+'px';g.setTransform(d,0,0,d,0,0);metrics=canvases.map((el,i)=>{let r=rect(el),s=Math.min(r.w/330,1);el.width=Math.ceil(r.w*d);el.height=Math.ceil(r.h*d);if(i===2){const logo=cards[i].querySelector('.cs-tiktok');if(logo){logo.style.left=((r.w-330*s)/2+31*s)+'px';logo.style.top=31*s+'px';logo.style.width=35*s+'px';logo.style.height=35*s+'px'}}const cs=getComputedStyle(cards[i]),px=n=>parseFloat(cs.getPropertyValue(n))||0;return{...r,s,ox:(r.w-330*s)/2,ctx:el.getContext('2d'),d,pad:{l:11+px('--sl'),r:11+px('--sr'),t:11+px('--st'),b:11}}});if(!motion)position=anchor(stage);else{motion.from=anchor(motion.spawn?-1:stage);motion.to=anchor(motion.target);motion.pivot=pivot(motion)}}
function anchor(i){if(i<0){let r=rect(photo);return{x:r.x+r.w*.54,y:r.y+r.h*.87,s:.95}}const m=metrics[i];return{x:m.x+m.ox+[148,155,146,132,148][i]*m.s,y:m.y+216*m.s,s:m.s*.92}}
function pivot(m){const r=rect(cards[m.target]);return{x:r.x+r.w-18,y:r.y+18}}
function label(){cards.forEach((c,i)=>c.setAttribute('aria-pressed',String(i===stage)));root.dataset.stage=stage;q('.ch-status').textContent=names[stage]?names[stage]+', '+actions[stage]:'Here comes my alter ego'}
function save(){try{localStorage.setItem('colar-next-motion-v1',JSON.stringify({mode,stage}))}catch{}}
function steam(ctx,x,y,time,alpha=.4){ctx.save();ctx.globalAlpha=alpha;for(let j=0;j<3;j++){let p=(time*.22+j/3)%1,xx=x+(j-1)*12+Math.sin(p*7+j)*4;line(ctx,[[xx,y-p*38],[xx+5,y-p*38-7],[xx+1,y-p*38-15]],'#fff8dc',2.4)}ctx.restore()}
function photoPrint(ctx,x,y,rot=0,a=1,index=0,scale=1){
 const img=travelPhotos[index%travelPhotos.length],portrait=index%3===0,w=portrait?30:42,h=portrait?40:28;
 ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(scale,scale);
 box(ctx,-w/2-4,-h/2-4,w+8,h+14,'#fff4d6');
 if(img.complete&&img.naturalWidth)ctx.drawImage(img,-w/2,-h/2,w,h);
 else box(ctx,-w/2,-h/2,w,h,'#9eb9b2',null);
 line(ctx,[[-w/2,h/2+6],[-w/2+12,h/2+6]],'#a89b7d',.5);
 ctx.restore();
}

const kitchenBeat=kitchenMotion;
function drawWok(ctx,b,on){
 ctx.save();ctx.translate(222,148-b.lift);ctx.rotate(b.tilt);
 line(ctx,[[-26,-2],[-54,-10]],'#342e29',7);line(ctx,[[-29,-3],[-54,-10]],'#d8a86b',3);
 const metal=ctx.createLinearGradient(0,-6,0,15);metal.addColorStop(0,'#71877b');metal.addColorStop(.4,'#293f43');metal.addColorStop(1,'#13292f');
 ctx.beginPath();ctx.moveTo(-36,-5);ctx.bezierCurveTo(-27,22,27,22,37,-5);ctx.closePath();ctx.fillStyle=metal;ctx.fill();ctx.strokeStyle='#e1ab64';ctx.lineWidth=1.8;ctx.stroke();oval(ctx,0,-5,36,8,'#3e5648','#e3b366');
 line(ctx,[[-25,5],[-15,11],[6,13]],'#829586',1.2);
 for(let j=0;j<8;j++){const a=clamp((b.a-j*.025)/.8),height=on?Math.sin(Math.PI*a)*(42+j%3*10):0;ctx.save();ctx.translate(-22+j*6+Math.sin(a*5+j)*3,-7-height);ctx.rotate(a*4+j);box(ctx,-3,-2,6,4,['#edaa62','#a9bc72','#cc5d45'][j%3],null,1);ctx.restore()}
 ctx.restore();
}
function cashFountain(ctx,time){
 for(let j=0;j<44;j++){const n=banknoteAt(j,time);if(n.alpha<.01)continue;ctx.save();ctx.globalAlpha=n.alpha;ctx.translate(n.x,n.y);ctx.rotate(n.angle);ctx.scale(n.scale,n.scale*n.fold);
 const green=ctx.createLinearGradient(-19,-10,19,10);green.addColorStop(0,'#c0f6a7');green.addColorStop(.5,'#64c77c');green.addColorStop(1,'#24845b');
 ctx.beginPath();ctx.moveTo(-21,-9);ctx.quadraticCurveTo(0,-13,21,-8);ctx.lineTo(21,9);ctx.quadraticCurveTo(0,5,-21,10);ctx.closePath();ctx.fillStyle=green;ctx.fill();ctx.strokeStyle='#1f654a';ctx.lineWidth=1;ctx.stroke();
 box(ctx,-17,-6,34,12,'#b3eeb038','#d8f5bb',1);oval(ctx,0,0,6,7,'#338a5f','#d7f2b4');txt(ctx,'$',-3,4,10,'#eaffc7');line(ctx,[[-13,-2],[-9,-2]],'#2a8754',1);line(ctx,[[9,3],[14,3]],'#2a8754',1);ctx.restore();
 }
 // 出钞口压住纸张根部，像真的从机器中吐出来。
 box(ctx,33,146,43,5,'#acb7a0',ink,1);oval(ctx,73,155,2,2,'#aaff8a');
}
function kitchenCounter(ctx){poly(ctx,[[35,166],[305,166],[296,222],[45,222]],'#24504e');poly(ctx,[[35,166],[305,166],[315,174],[24,174]],'#d89a59');line(ctx,[[27,174],[312,174]],'#f8d798',2);box(ctx,50,181,111,31,'#316360','#142f33',3);box(ctx,172,181,110,31,'#316360','#142f33',3);line(ctx,[[96,188],[121,188]],'#d2ad6b',2);line(ctx,[[212,188],[238,188]],'#d2ad6b',2);for(let j=0;j<6;j++)line(ctx,[[49+j*40,217],[72+j*40,217]],'#7eab8a55',.8)}
function kitchenScene(ctx,on,clock,lt,m){const b=kitchenBeat(on?lt:0);box(ctx,-m.ox/m.s,0,m.w/m.s,237/m.s,'#203c3e',null);let glow=ctx.createRadialGradient(210,108,8,210,108,170);glow.addColorStop(0,'#dbb76055');glow.addColorStop(1,'#dbb76000');box(ctx,-30,0,390,236,glow,null);
// A night-market counter: hard ink silhouettes, warm light, restrained halftone.
for(let x=0;x<330;x+=9)for(let y=45;y<170;y+=9)if((x+y)%3===0)oval(ctx,x,y,.7,.7,'#91a88b25');poly(ctx,[[0,0],[330,0],[330,31],[0,42]],'#db6d4c');for(let j=0;j<9;j++)poly(ctx,[[j*42,0],[j*42+17,0],[j*42+8,37-j],[j*42-8,38-j]],'#f4d4a3',null);line(ctx,[[0,42],[330,31]],'#152c33',3);
line(ctx,[[193,32],[193,48]],'#e2b478',2);poly(ctx,[[178,47],[207,47],[215,59],[170,59]],'#e7b463');poly(ctx,[[177,61],[208,61],[290,169],[105,169]],'#fbe0a813',null);oval(ctx,192,60,12,2,'#fff0be');
ctx.save();ctx.translate(34,88);ctx.rotate(-.08);box(ctx,-15,-29,65,58,'#182f33','#c58c59',2);txt(ctx,'HOT!',-5,-8,17,'#f4ca82','Impact');line(ctx,[[-5,1],[36,1]],'#e3b778',1);txt(ctx,'EAT WELL',-6,18,11,'#e9d9aa');ctx.restore();
for(let j=0;j<3;j++){line(ctx,[[261+j*19,47],[261+j*19,77]],'#d8b889',1.6);oval(ctx,261+j*19,83,5,8,'#839d8f','#152e32')}
box(ctx,50,138,23,25,'#d18c5d',ink,4);for(let j=0;j<5;j++)line(ctx,[[61,139],[51+j*5,113-Math.sin(j)*7]],'#8daf69',3);oval(ctx,86,158,11,7,'#b95240',ink);oval(ctx,103,159,9,6,'#d8ac5f',ink);
// The wrist, wok and airborne ingredients share this one toss phase.
kitchenCounter(ctx);oval(ctx,224,161,37,5,'#132d32');for(let j=0;j<6;j++){let h=on?11+Math.sin(clock*11+j)*4+b.toss*20:7+Math.sin(clock*3+j)*2;poly(ctx,[[196+j*10,162],[202+j*10,162-h],[208+j*10,162]],j%2?'#f5be54':'#de7047',null)}
drawWok(ctx,b,on);
ctx.save();ctx.strokeStyle='#f5e6bd';ctx.lineWidth=2;for(let j=0;j<3;j++){let p=(clock*.24+j/3)%1;ctx.globalAlpha=(1-p)*.33;ctx.beginPath();ctx.moveTo(209+j*13,133-b.lift-p*35);ctx.bezierCurveTo(197+j*13,124-b.lift-p*35,226+j*13,118-b.lift-p*35,214+j*13,106-b.lift-p*35);ctx.stroke()}ctx.restore();
if(on&&b.toss>.25){ctx.save();ctx.globalAlpha=b.toss*.6;line(ctx,[[266,116-b.lift],[275,109-b.lift]],'#e9c27c',1.2);line(ctx,[[269,125-b.lift],[282,122-b.lift]],'#e9c27c',1.2);ctx.restore()}}

// 工作站向左朝向人物；观众看到屏幕背板与侧缘，底座接触桌面。
function drawWorkstation(ctx,kind){
 if(kind==='finance'){
  oval(ctx,250,167,28,2,'#243a4540');
  poly(ctx,[[247,134],[258,137],[256,162],[269,166],[234,166],[247,160]],'#526970');
  line(ctx,[[234,167],[269,167]],'#263c47',2);
  poly(ctx,[[219,66],[291,83],[289,147],[219,132]],'#3d5360');
  poly(ctx,[[209,70],[219,66],[219,132],[209,137]],'#172d39');
  line(ctx,[[211,75],[211,131]],'#a8d8bd',2);
  poly(ctx,[[225,74],[284,88],[282,139],[225,126]],'#4d6470',null);
  oval(ctx,254,105,9,10,'#617987');
  for(let j=0;j<5;j++)line(ctx,[[239+j*7,119+j*1.5],[239+j*7,126+j*1.5]],'#2c424f',1.4);
  ctx.beginPath();ctx.moveTo(245,141);ctx.bezierCurveTo(228,147,242,162,210,164);ctx.strokeStyle='#344a50';ctx.lineWidth=1.3;ctx.stroke();
 }else{
  oval(ctx,191,167,43,2,'#3b353538');
  // 键盘朝人物展开，屏幕铰链在远侧，避免正面屏幕对着访客。
  poly(ctx,[[158,157],[202,155],[231,167],[145,167]],'#bbc7bf');
  for(let j=0;j<3;j++)line(ctx,[[157-j*2,159+j*2],[191+j*4,158+j*2]],'#677b78',1);
  poly(ctx,[[206,113],[247,126],[231,164],[193,155]],'#344c59');
  poly(ctx,[[209,119],[241,129],[228,157],[199,151]],'#54717d',null);
  line(ctx,[[205,114],[192,153]],'#a6d7c4',2);
  oval(ctx,220,139,5,6,'#cfdbcf');
  line(ctx,[[193,156],[230,165]],'#263b48',2);
  line(ctx,[[146,168],[230,168]],'#3b515b',1.5);
 }
}

// Five continuously running environments; only the occupied one performs its main action.
function scene(i){let m=metrics[i];if(!m)return;let ctx=m.ctx;ctx.setTransform(m.d,0,0,m.d,0,0);ctx.clearRect(0,0,m.w,m.h);ctx.save();ctx.translate(m.ox,0);ctx.scale(m.s,m.s);let on=stage===i&&!motion,clock=rm.matches||!opts.ambient?0:t,lt=rm.matches?0:engagedTime(localTime);const backgrounds=['#d6e4e6','#bacabf','#e6baa3','#f3dfaa','#d4d4dc'];box(ctx,-m.ox/m.s,0,m.w/m.s,237/m.s,backgrounds[i],null);
// Floor perspective and small ink details give each card a shared comic set.
poly(ctx,[[-30,205],[360,205],[390,270],[-50,270]],i===4?'#b2c3b1':'#b7aa8b',null);line(ctx,[[-30,205],[360,205]],'#595b5155');for(let k=0;k<6;k++)line(ctx,[[k*65,205],[k*70-8,260]],'#5d5a4322',.8);
if(i<3){box(ctx,114,112,48,56,'#56696a',ink,7);box(ctx,115,165,50,8,'#455b61',ink,3);line(ctx,[[140,173],[140,211]],ink,4);line(ctx,[[120,216],[140,209],[163,216]],ink,3)}
if(i===0){box(ctx,19,26,75,90,'#fbf0d0');box(ctx,25,32,63,78,'#93b8c4');line(ctx,[[55,32],[55,111]],'#e9e1c7',3);line(ctx,[[25,69],[88,69]],'#e9e1c7',3);oval(ctx,74,47,8,8,'#f7d67b');line(ctx,[[30,105],[43,93],[49,103],[62,91],[83,104]],'#688f8e',2);box(ctx,205,27,100,61,'#31545c');txt(ctx,'NOTTINGHAM',213,46,10,'#e6e1bd');txt(ctx,'→ PENN',218,63,13,'#e6e1bd');txt(ctx,'∑  x²  /  y',216,80,11,'#a7b9b3');box(ctx,25,131,55,9,'#815f4c');for(let j=0;j<5;j++)box(ctx,28+j*9,102-j%2*8,7,29+j%2*8,['#8b4650','#536a74','#e1b450'][j%3]);box(ctx,91,165,150,11,'#bd8456');line(ctx,[[103,176],[99,216]],ink,5);line(ctx,[[230,176],[234,216]],ink,5);poly(ctx,[[148,155],[189,151],[205,165],[157,167]],'#fff8e3');for(let j=0;j<3;j++)line(ctx,[[157,158+j*3],[183,156+j*3]],'#77867d',.8);if(on){let turn=(lt%2.8)/2.8;if(turn>.80){ctx.save();ctx.translate(173,156);ctx.rotate(-Math.sin((turn-.8)/.2*Math.PI)*1.2);box(ctx,0,-18,29,19,'#fff6dd',ink,1);line(ctx,[[5,-11],[24,-11]],'#596c78',.7);ctx.restore()}for(let j=0;j<1;j++){let p=clamp(((lt%2.8)-2.35)/.45);ctx.save();ctx.globalAlpha=Math.sin(p*Math.PI)*.65;ctx.translate(95-p*47,142-p*72);ctx.rotate(-.2-p*.6);box(ctx,-10,-13,20,27,'#fcf1d4',ink,1);for(let k=0;k<3;k++)line(ctx,[[-6,-6+k*5],[6,-6+k*5]],'#748b8a',.7);ctx.restore()}for(let j=0;j<5;j++)line(ctx,[[159,155+j*2],[163+((lt*30+j*13)%26),155+j*2]],'#42616b',.65);}box(ctx,222,146,14,19,'#a94c48',ink,3);steam(ctx,229,144,clock,.25);}
if(i===1){box(ctx,80,168,220,10,'#987756');line(ctx,[[92,177],[90,220]],ink,5);line(ctx,[[286,177],[290,220]],ink,5);poly(ctx,[[147,156],[194,156],[208,166],[141,166]],'#c0c4b8');for(let j=0;j<3;j++)line(ctx,[[151,158+j*2],[192,158+j*2]],'#6b7873',.7);drawWorkstation(ctx,'finance');box(ctx,27,135,55,34,'#d9d9c5',ink,4);box(ctx,35,142,39,7,'#354951',null);oval(ctx,73,155,2,2,'#81b986');if(on)cashFountain(ctx,lt);}
if(i===2){box(ctx,211,22,96,105,'#f7ecd3');for(let j=0;j<4;j++){box(ctx,220+j%2*40,40+Math.floor(j/2)*37,30,25,['#d8ab74','#91afb0','#b8ba86','#cd9486'][j],null);line(ctx,[[225+j%2*40,49+Math.floor(j/2)*37],[241+j%2*40,49+Math.floor(j/2)*37]],'#544c4966',1)}box(ctx,22,24,53,53,'#263540',ink,8);box(ctx,82,167,214,10,'#ae7753');line(ctx,[[94,177],[91,219]],ink,5);line(ctx,[[284,177],[289,219]],ink,5);drawWorkstation(ctx,'product');if(on){for(let j=0;j<6;j++){let p=(lt*.32+j/6)%1,x=111+Math.sin(p*Math.PI)*70+j*14,y=104-p*87;ctx.save();ctx.globalAlpha=Math.sin(p*Math.PI)*.95;ctx.translate(x,y);ctx.rotate(Math.sin(p*4+j)*.13);let sz=12+Math.sin(p*Math.PI)*3;box(ctx,-sz,-sz,sz*2,sz*2,['#f6d577','#f3d4b0','#b1d0c5','#e99b80'][j%4],ink,5);if(j%4===0){oval(ctx,0,-2,5,6,'#fff2b0',ink);line(ctx,[[-3,6],[3,6]],ink,1.3)}else if(j%4===1){poly(ctx,[[-4,-6],[6,0],[-4,6]],'#775a4d',null)}else if(j%4===2){line(ctx,[[-6,0],[-1,5],[7,-5]],'#456c5c',2)}else{txt(ctx,'?',-4,6,17)}ctx.restore()}let q=(lt%3)/3;if(q>.7){ctx.save();ctx.globalAlpha=Math.sin((q-.7)/.3*Math.PI);txt(ctx,'✓',267,103,20,'#557f62');ctx.restore()}}}

if(i===3)kitchenScene(ctx,on,clock,lt,m);
if(i===4){
 // 真实旅行照片作为场景中的相纸；人物仍处于中央表演区。
 box(ctx,-30,0,390,237,'#b9c7bd',null);
 for(let x=0;x<330;x+=10)for(let y=0;y<205;y+=10)oval(ctx,x,y,.6,.6,'#6b877d25');
 poly(ctx,[[-20,185],[65,146],[121,182],[178,154],[253,185],[350,150],[350,237],[-20,237]],'#91aaa0',null);
 line(ctx,[[16,21],[310,28]],'#535d58',1.2);
 photoPrint(ctx,49,92,-.075+Math.sin(clock*.5)*.012,1,0,2.15);
 photoPrint(ctx,260,61,.065+Math.sin(clock*.5+1)*.015,1,1,2);
 photoPrint(ctx,263,158,-.07+Math.sin(clock*.5+2)*.012,1,2,2);
 for(const [x,y] of [[49,42],[260,25],[263,122]]){ctx.save();ctx.translate(x,y);ctx.rotate(-.12);box(ctx,-10,-4,20,7,'#e5d6abbb',null);ctx.restore()}
 box(ctx,25,190,53,31,'#af8660',ink,4);box(ctx,34,183,35,10,'#ccaa7c',ink,4);
 if(on){let p=(lt%4.4)/4.4;if(p>.25){let a=clamp((p-.25)/.6),x=mix(170,251,ease(a)),y=mix(110,105,ease(a))-Math.sin(Math.PI*a)*35;photoPrint(ctx,x,y,mix(-.2,.08,a),1-clamp((a-.85)/.15),Math.floor(lt/4.4)%3,1.15)}}
}

if(on&&!rm.matches)drawActionAccents(ctx,i,lt);drawSceneSurprise(ctx,i);ctx.restore()}
// Articulated limbs keep one face and one continuous body through flying and working.
// 上臂与前臂、大腿与小腿同一套分段画法：近端鼓起、末端收窄，深度较近的一段压住关节，形成硬折叠。
function palm(ctx,point,angle=0){
 const k=1+(point[2]||0)*.006;ctx.save();ctx.translate(point[0],point[1]);ctx.rotate(angle);ctx.scale(k,k);
 const skin=ctx.createLinearGradient(0,-5,0,5);skin.addColorStop(0,'#f5d5ac');skin.addColorStop(.55,'#dba67f');skin.addColorStop(1,'#a36c58');
 box(ctx,-5,-5,5,10,'#dab362',ink,2);
 ctx.beginPath();ctx.moveTo(-1,-3);ctx.quadraticCurveTo(4,-7,8,-3);ctx.quadraticCurveTo(11,0,7,4);ctx.lineTo(1,4);ctx.quadraticCurveTo(-3,1,-1,-3);ctx.fillStyle=skin;ctx.fill();ctx.strokeStyle=ink;ctx.lineWidth=1;ctx.stroke();
 line(ctx,[[3,-1],[7,0]],'#98654f',.7);line(ctx,[[2,2],[6,3]],'#98654f',.7);ctx.restore();
}
function segment(ctx,from,to,start,end,color,bulge=.64){
 const dx=to[0]-from[0],dy=to[1]-from[1],n=Math.hypot(dx,dy);
 if(n<1.5){oval(ctx,from[0],from[1],start*.48,start*.48,color,ink);return}
 const ux=dx/n,uy=dy/n,nx=-uy,ny=ux,shade=ctx.createLinearGradient(from[0]-nx*start/2,from[1]-ny*start/2,from[0]+nx*start/2,from[1]+ny*start/2);shade.addColorStop(0,'#142b40');shade.addColorStop(.28,color);shade.addColorStop(.57,color);shade.addColorStop(.76,'#78969c');shade.addColorStop(1,color);
 ctx.beginPath();ctx.moveTo(from[0]+nx*start*.44,from[1]+ny*start*.44);ctx.bezierCurveTo(from[0]+dx*.3+nx*start*bulge,from[1]+dy*.3+ny*start*bulge,to[0]+nx*end*.55,to[1]+ny*end*.55,to[0]+nx*end*.4,to[1]+ny*end*.4);
 ctx.quadraticCurveTo(to[0]+ux*end*.5,to[1]+uy*end*.5,to[0]-nx*end*.4,to[1]-ny*end*.4);ctx.bezierCurveTo(to[0]-nx*end*.6,to[1]-ny*end*.6,from[0]+dx*.3-nx*start*bulge*.9,from[1]+dy*.3-ny*start*bulge*.9,from[0]-nx*start*.44,from[1]-ny*start*.44);
 ctx.quadraticCurveTo(from[0]-ux*start*.5,from[1]-uy*start*.5,from[0]+nx*start*.44,from[1]+ny*start*.44);ctx.closePath();ctx.fillStyle=shade;ctx.fill();ctx.strokeStyle=ink;ctx.lineWidth=1.4;ctx.stroke();
}
function limb(ctx,a,b,c,color,width=13,hand=true,grip=null,arm=false,cap=null){
 const k=q=>1+(q[2]||0)*.005,upper=()=>{segment(ctx,a,b,(arm?width*1.22:width+3)*k(a),width*.82*k(b),color,arm?.74:.64);if(cap)cap()},lower=()=>segment(ctx,b,c,width*.9*k(b),width*.56*k(c),color,arm?.7:.64);
 ctx.save();if((a[2]||0)>(c[2]||0)+2){lower();upper()}else{upper();lower()}
 const angle=Math.atan2(c[1]-b[1],c[0]-b[0]);ctx.save();ctx.translate(b[0],b[1]);ctx.rotate(angle);line(ctx,[[0,-width*.3],[2,0],[0,width*.26]],'#142c3d88',1);ctx.restore();
 if(hand)palm(ctx,c,grip??angle);ctx.restore();
}
// 肩甲跟随锁骨上提，并随上臂方向小幅转动。
const PADS={l:[[-29,-109],[-18,-117],[-12,-108],[-26,-101]],r:[[16,-116],[30,-106],[26,-98],[15,-107]]};
function pad(ctx,p,side){
 const sign=side==='l'?-1:1,lift=p[side+'lift']||0,s=p[side+'s'],e=p[side+'e'],d=Math.atan2(e[1]-s[1],e[0]-s[0])-Math.PI/2,turn=Math.max(-.4,Math.min(.4,Math.atan2(Math.sin(d),Math.cos(d))*.25)),c=Math.cos(turn),n=Math.sin(turn);
 poly(ctx,PADS[side].map(q=>{const w=bodyPoint([q[0]+sign*lift*3,q[1]-lift*5,0],p),x=w[0]-s[0],y=w[1]-s[1];return [s[0]+x*c-y*n,s[1]+x*n+y*c]}),gold);
}
// 与 bodyPoint 一致的躯干平面：俯仰压缩高度、转身压缩宽度，最后画面内侧倾。
function torsoSpace(ctx,p){const cp=Math.cos(p.pitch||0),sp=Math.sin(p.pitch||0),cy=Math.cos(p.yaw||0),sy=Math.sin(p.yaw||0);ctx.translate(p.hip||0,-52+p.crouch);ctx.rotate(p.torso||0);ctx.transform(cy,0,-sp*sy,cp,0,0);ctx.translate(0,52)}
function boot(ctx,foot,front){const k=1+(foot[2]||0)*.005;ctx.save();ctx.translate(foot[0],foot[1]);ctx.scale(k,k);const fill=ctx.createLinearGradient(0,-13,0,5);fill.addColorStop(0,front?'#e65456':'#b74950');fill.addColorStop(.5,'#913449');fill.addColorStop(1,'#482a3d');poly(ctx,[[-7,-13],[6,-12],[7,-4],[13,-1],[14,4],[-8,4]],fill);line(ctx,[[-7,4],[13,4]],'#182b36',2.5);line(ctx,[[-5,-9],[5,-8]],gold,2);line(ctx,[[2,-3],[7,0]],'#ffad85',1.2);ctx.restore()}
function actor(ctx,pos,i,p,flight=0,entry=1){ctx.save();ctx.translate(pos.x,pos.y);ctx.scale(pos.s,pos.s);ctx.rotate(p.lean*.012);const spin=p.spin||0;if(spin){ctx.translate(0,-70);ctx.rotate(spin);ctx.translate(0,70)}let col=[navy,'#344652','#8c3f4a','#324e52','#466a67'][Math.max(0,i)];let side=0,lag=0;
if(ctx===g&&!rm.matches){if(cloth.prev&&frameDt>0){const wx=(pos.x-cloth.prev.x)/frameDt,wy=(pos.y-cloth.prev.y)/frameDt,vx=wx*Math.cos(spin)+wy*Math.sin(spin),vy=wy*Math.cos(spin)-wx*Math.sin(spin);cloth.side=springStep(cloth.side,Math.max(-32,Math.min(32,-vx*.025)),frameDt);cloth.lift=springStep(cloth.lift,Math.max(-24,Math.min(32,-vy*.02)),frameDt)}cloth.prev={x:pos.x,y:pos.y};side=cloth.side.value;lag=cloth.lift.value}
const wave=rm.matches?0:Math.sin(t*2.3)*3,tail=-60-flight*23+side,hem=-40+wave+lag;
ctx.save();torsoSpace(ctx,p);
const cape=ctx.createLinearGradient(tail,-70,7,-85);cape.addColorStop(0,'#6d2038');cape.addColorStop(.28,'#d8384c');cape.addColorStop(.5,'#f46a62');cape.addColorStop(.67,'#a82440');cape.addColorStop(1,'#6d2638');
ctx.beginPath();ctx.moveTo(-18,-115);ctx.bezierCurveTo(-47,-113,tail-26,-81+lag,tail-8,hem);ctx.quadraticCurveTo(tail+2,hem-11,tail+14,hem+3);ctx.quadraticCurveTo(tail+22,hem-5,tail+31,hem+8);ctx.bezierCurveTo(-21,-51,13,-94,18,-115);ctx.closePath();ctx.fillStyle=cape;ctx.fill();ctx.strokeStyle=ink;ctx.lineWidth=2;ctx.stroke();
ctx.beginPath();ctx.moveTo(-17,-111);ctx.bezierCurveTo(tail+6,-90,tail-6,-62+lag,tail+14,hem+1);ctx.strokeStyle='#ffb08a';ctx.lineWidth=1.3;ctx.stroke();ctx.beginPath();ctx.moveTo(-7,-111);ctx.bezierCurveTo(-25,-80,tail+24,-67+lag,tail+31,hem+7);ctx.strokeStyle='#6f213a';ctx.lineWidth=2;ctx.stroke();ctx.restore();
// 脚在膝盖后方（跪地）时靴子先画，被腿压住，跪地的膝盖才露得出来。
const footBack=s=>(p[s+'f'][2]||0)<(p[s+'k'][2]||0)-8;for(const s of ['l','r'])if(footBack(s))boot(ctx,p[s+'f'],s==='r');
limb(ctx,p.lp||[-12,-52+p.crouch,0],p.lk,p.lf,'#234466',17,false);limb(ctx,p.rp||[13,-52+p.crouch,0],p.rk,p.rf,navy,18,false);for(const s of ['l','r'])if(!footBack(s))boot(ctx,p[s+'f'],s==='r');
const cooking=i===3&&entry>.99&&flight<.12&&(!motion||root.dataset.phase==='settle'),kb=kitchenBeat(engagedTime(localTime));
// 伸到躯干后方的手臂先画，被身体遮住。
const behind=side=>(p[side+'e'][2]+p[side+'h'][2])/2<-8,arm=side=>limb(ctx,p[side+'s'],p[side+'e'],p[side+'h'],col,14,!cooking,side==='r'&&i===0?.85:null,true,()=>pad(ctx,p,side));
for(const side of ['l','r'])if(behind(side))arm(side);
ctx.save();torsoSpace(ctx,p);
const suit=ctx.createLinearGradient(-29,-90,30,-80);suit.addColorStop(0,'#122a3a');suit.addColorStop(.25,col);suit.addColorStop(.55,'#597c89');suit.addColorStop(.72,col);suit.addColorStop(1,'#192b3e');
poly(ctx,[[-29,-108],[-14,-118],[15,-118],[30,-105],[19,-57],[0,-47],[-19,-57]],suit);
poly(ctx,[[-27,-104],[-17,-90],[-16,-61],[-23,-78]],'#0c263b66',null);poly(ctx,[[10,-104],[23,-99],[18,-86],[5,-88]],'#dce6d31f',null);
poly(ctx,[[-21,-105],[-12,-110],[0,-88],[12,-110],[22,-105],[15,-96],[0,-78],[-15,-96]],i===1?'#ddd9c9':gold);box(ctx,-19,-63,38,6,gold,ink,1);box(ctx,-5,-64,10,8,'#f8da81',ink,1);line(ctx,[[0,-87],[0,-65]],'#182c3e',2);for(let j=0;j<3;j++)line(ctx,[[-15,-85+j*6],[-6,-81+j*6]],'#ffffff20',1);
// 原创 C 徽记、肩甲和红色立领建立个人英雄轮廓。
poly(ctx,[[-17,-116],[-21,-128],[-7,-115]],'#dc3b4c');
poly(ctx,[[15,-116],[20,-127],[8,-114]],'#dc3b4c');
if(i!==3){poly(ctx,[[0,-103],[14,-90],[0,-76],[-14,-90]],gold);poly(ctx,[[0,-99],[10,-90],[0,-80],[-10,-90]],red,null);ctx.save();ctx.font='900 15px Arial';ctx.fillStyle='#fff1bf';ctx.fillText('C',-5,-85);ctx.restore()}

if(i===3){poly(ctx,[[-13,-102],[13,-102],[22,-53],[-22,-53]],'#eee0ba');line(ctx,[[-13,-102],[-15,-113]],'#e4d2a5',3);line(ctx,[[13,-102],[16,-113]],'#e4d2a5',3);box(ctx,-9,-77,18,12,'#c4aa73',null,3)}
ctx.restore();drawFace(ctx,i,p);
if(!behind('l'))arm('l');
if(cooking){ctx.save();ctx.scale(1/.92,1/.92);ctx.translate(-132,-216);drawWok(ctx,kb,true);ctx.restore();palm(ctx,p.lh,.1+kb.tilt);}
if(!behind('r'))arm('r');
if(cooking){const tip=[(kb.tip[0]-132)/.92,(kb.tip[1]-216)/.92];line(ctx,[p.rh,tip],'#3c3029',4);line(ctx,[p.rh,tip],'#c69b64',2);ctx.save();ctx.translate(...tip);ctx.rotate(Math.atan2(tip[1]-p.rh[1],tip[0]-p.rh[0]));oval(ctx,0,0,8,4,'#d8b672',ink);line(ctx,[[-3,-2],[3,-2]],'#f9deb0',1);ctx.restore();palm(ctx,p.rh,Math.atan2(tip[1]-p.rh[1],tip[0]-p.rh[0]));}

if(entry>.1&&flight<.2){if(i===0){ctx.save();for(let j=3;j>0;j--){ctx.globalAlpha=.09*(4-j);line(ctx,[[p.rh[0]-3-j*3,p.rh[1]-13+j],[p.rh[0]+4-j*3,p.rh[1]+4]],'#4a6470',1.4)}ctx.globalAlpha=1;line(ctx,[[p.rh[0]-4,p.rh[1]-14],[p.rh[0]+5,p.rh[1]+6]],'#334d65',2.4);line(ctx,[[p.rh[0]+3,p.rh[1]+3],[p.rh[0]+5,p.rh[1]+6]],'#c7a86e',1.5);ctx.restore()}if(i===4){let cy=(p.lh[1]+p.rh[1])/2;box(ctx,-12,cy-8,34,21,'#30444b',ink,3);box(ctx,-7,cy-12,13,6,'#30444b',ink,2);oval(ctx,6,cy+2,8,8,'#afc4bb',ink);oval(ctx,6,cy+2,4,4,'#47646b');if(!rm.matches&&localTime%4.4>.95&&localTime%4.4<1.08){ctx.save();ctx.globalAlpha=.6;oval(ctx,6,cy+2,19,19,'#fff7d3');ctx.restore()}}}
ctx.restore()}
function drawFace(ctx,i,p){
  const neck=bodyPoint([0,-113,0],p),k=1+neck[2]*.003;
  ctx.save();ctx.translate(neck[0],neck[1]);ctx.rotate((p.torso||0)*.5+Math.max(-.17,Math.min(.17,p.head||0)));ctx.scale(k,k);
  if(head.naturalWidth)ctx.drawImage(head,-28,-51,56,62);
  if(i===0){poly(ctx,[[-31,-40],[0,-53],[30,-40],[0,-31]],navy);line(ctx,[[25,-40],[28,-21]],gold,2)}
  if(i===2){ctx.beginPath();ctx.arc(0,-6,23,0,Math.PI);ctx.strokeStyle=gold;ctx.lineWidth=3;ctx.stroke();box(ctx,-25,-10,8,13,navy,ink,3);box(ctx,17,-10,8,13,navy,ink,3)}
  if(i===3){box(ctx,-23,-48,46,12,'#f8edd1',ink,3);oval(ctx,-15,-52,12,10,'#f8edd1',ink);oval(ctx,0,-56,15,12,'#f8edd1',ink);oval(ctx,16,-51,11,10,'#f8edd1',ink);box(ctx,-22,-49,44,11,'#f8edd1',null,2)}
  ctx.restore();
}
function drawPhotoPortrait(){
  const canvas=q('.ch-photo-avatar'),ctx=canvas.getContext('2d');
  ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,204,228);
  const pose=bodyPose(-1,0,false);actor(ctx,{x:102,y:217,s:1.12},-1,pose,0,0);
}
function startTransformation(){
  if(!loaded||photoChange||mode!=='fun')return;
  clearTimeout(hoverTimer);clearTimeout(autoTimer);queued=null;
  // 照片翻面只触发一次连续表演，不叠加多次出场。
  if(motion){audio.stopAll();stage=motion.target;motion=null;localTime=0;label()}
  photoChange={time:0,target:Math.max(0,stage)};
  photo.classList.add('is-transforming');root.dataset.phase='transform';
  q('.ch-status').textContent='Suit up. Let’s go.';
  if(rm.matches){photoChange.time=2;transformPhoto(0)}
}
function transformPhoto(dt){
  const effect=photoChange;effect.time+=dt;
  if(effect.time<.24&&started){g.save();g.globalAlpha=1-smooth(effect.time/.24);working();g.restore()}
  if(effect.time>=.24&&!effect.turned){effect.turned=true;audio.play('swish');transformed=!transformed;photo.dataset.transformed=String(transformed);photo.setAttribute('aria-pressed',String(transformed));drawPhotoPortrait()}
  if(effect.time>=.86){
    const target=queued??effect.target;photoChange=null;queued=null;
    photo.classList.remove('is-transforming');stage=-1;localTime=0;
    begin(target,true);
  }
}
function drawSceneSurprise(ctx,i){
  if(!celebration||celebration.stage!==i)return;
  const p=clamp((t-celebration.start)/1.7);if(p>=1)return;
  ctx.save();ctx.globalAlpha=Math.sin(p*Math.PI);
  if(i===3){
    ctx.translate(226,114-p*32);ctx.scale(.8+p*.25,.8+p*.25);
    ctx.beginPath();ctx.moveTo(0,7);ctx.bezierCurveTo(-24,-7,-8,-20,0,-9);ctx.bezierCurveTo(8,-20,24,-7,0,7);ctx.fillStyle='#eab99a';ctx.fill();
  }else if(i===4){photoPrint(ctx,177+p*35,106-p*25,-.15,1,Math.floor(localTime/4.4)%3,1.15);txt(ctx,'c·w',165+p*35,121-p*25,8,'#584b41')}
  else {const x=i===0?181:i===1?61:253,y=113-p*34;for(let j=0;j<6;j++){let a=j*Math.PI/3,r=10+p*14;line(ctx,[[x+Math.cos(a)*r,y+Math.sin(a)*r],[x+Math.cos(a)*(r+7),y+Math.sin(a)*(r+7)]],gold,2)}txt(ctx,i===1?'$':i===0?'✓':'★',x-7,y+6,20,'#aa6339')}
  ctx.restore();
}
function burst(ctx,x,y,r,fill){
  const points=[];for(let j=0;j<16;j++){const a=j*Math.PI/8,d=j%2?r*.58:r;points.push([x+Math.cos(a)*d,y+Math.sin(a)*d])}poly(ctx,points,fill);
}
function drawActionAccents(ctx,i,time){
 if(i!==4)return;const phase=(time%4.4)/4.4;
 if(phase>.22&&phase<.48){ctx.save();ctx.globalAlpha=Math.sin((phase-.22)/.26*Math.PI)*.7;line(ctx,[[112,63],[101,51]],'#fff4c5',2);line(ctx,[[180,61],[191,49]],'#fff4c5',2);ctx.restore()}
}
function foreground(i,amount=1){if(amount<=0||i<0||i>3)return;const m=metrics[i];g.save();g.globalAlpha=amount;g.translate(m.x+m.ox,m.y);g.scale(m.s,m.s);if(i===3){kitchenCounter(g)}else{let x=i===0?91:80,w=i===0?150:220;box(g,x,168,w,9,i===0?'#bd8456':i===1?'#987756':'#ae7753');line(g,[[x+12,177],[x+8,219]],ink,5);line(g,[[x+w-12,177],[x+w-8,219]],ink,5)}g.restore()}
function handWorld(pos,pose){return toWorld(pos,pose,pose.rh)}
// 拟声字：Bangers 黄字、粗墨边、红色错位投影；弹出时略微过冲，结束前淡出。
function sfx(text,x,y,size,age,life,rot=-.12,star=null){if(age<0||age>=life)return;const k=rm.matches?1:age<.12?mix(.4,1.16,age/.12):age<.2?mix(1.16,1,(age-.12)/.08):1;g.save();g.globalAlpha=1-smooth((age-life+.2)/.2);g.translate(x,y);g.rotate(rot);g.scale(k,k);if(star)burst(g,0,0,size*1.25,star);g.font=`${size}px Bangers, Impact, sans-serif`;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.fillStyle=red;g.fillText(text,size*.07,size*.08);g.strokeStyle=ink;g.lineWidth=size*.15;g.strokeText(text,0,0);g.fillStyle='#ffd84d';g.fillText(text,0,0);g.restore()}
// 速度线沿速度反方向拖在身后，速度越快越长。
function speedLines(pos,vel,big){const v=Math.hypot(vel.x,vel.y);if(v<160)return;const ux=vel.x/v,uy=vel.y/v,cx=pos.x,cy=pos.y-70*pos.s,len=(big?100:50)*pos.s*Math.min(1.5,v/700);g.save();g.lineCap='round';for(let j=0;j<(big?8:4);j++){const o=((j*.618)%1-.5)*(big?130:80)*pos.s,back=(42+j%3*16)*pos.s,x=cx-uy*o-ux*back,y=cy+ux*o-uy*back;g.globalAlpha=big?.55:.32;line(g,[[x,y],[x-ux*len,y-uy*len]],ink,big?1.8:1.3)}g.restore()}
// 触地冲击圈；入场版更大，并向两侧踢起带墨线的尘土。
function impactRing(pos,t,big){const life=big?.45:.3;if(t>=life)return;const p=t/life,s=pos.s,r=(big?26:16)+p*(big?120:56);g.save();g.globalAlpha=(1-p)*(big?.9:.7);g.beginPath();g.ellipse(pos.x,pos.y,r*s,r*s*.2,0,0,7);g.strokeStyle='#fff6da';g.lineWidth=(big?5:3)*(1-p)+1;g.stroke();g.strokeStyle=ink;g.lineWidth=1;g.stroke();if(big)for(let j=0;j<8;j++){const d=j<4?-1:1,a=(j%4)/4;g.globalAlpha=(1-p)*.8;oval(g,pos.x+d*(24+p*(70+a*40))*s,pos.y-(Math.sin(Math.PI*p)*(14+a*16)+4)*s,(6+a*5+p*8)*s,(4+a*3+p*5)*s,'#efe3c6',ink)}g.restore()}
// 触地闪白遮住服装切换的那一帧。
function flash(pos,t,big){const life=big?.13:.09;if(t>=life)return;g.save();g.globalAlpha=1-t/life;burst(g,pos.x,pos.y-95*pos.s,(big?82:56)*pos.s*(1+t*2),'#fffbe8');g.restore()}
// 震屏只平移卡片区与人物画布，不触发重排。
function shake(t){const a=t<.32?4*(1-t/.32)**2:0,v=a>.05?`translate(${(a*Math.sin(t*97)).toFixed(2)}px,${(a*.7*Math.cos(t*71)).toFixed(2)}px)`:'';cardsEl.style.transform=v;fx.style.transform=v}
function calm(){cardsEl.style.transform='';fx.style.transform='';photo.style.transform=''}
function shards(from,p){for(let j=0;j<7;j++){let a=j*2.4,r=20+p*160;g.save();g.translate(from.x+Math.cos(a)*r,from.y-75+Math.sin(a)*r);g.rotate(a+p*3);g.globalAlpha=1-p/.3;poly(g,[[-4,-4],[6,-2],[1,6]],'#eee2bb');g.restore()}}
function silk(a,b,p=1,slack=0){g.save();g.beginPath();g.moveTo(a.x,a.y);let ex=mix(a.x,b.x,p),ey=mix(a.y,b.y,p);g.quadraticCurveTo((a.x+ex)/2,(a.y+ey)/2+slack,ex,ey);g.strokeStyle='#333d4480';g.lineWidth=3;g.stroke();g.strokeStyle='#fff6da';g.lineWidth=1.4;g.stroke();g.restore()}
function working(){const dest=anchor(stage),p=bodyPose(stage,localTime,!rm.matches);position=dest;actor(g,dest,stage,p);foreground(stage);speech();yell()}
// 对白气泡：手绘椭圆（感叹句用爆炸气泡）+ 弯楔形尾巴指向脸心，从尾尖处弹出；位置取该格静止工作姿势的头部，不随身体晃动。
const HAT=[55,51,51,70,51],inner=m=>({l:m.x+m.pad.l,t:m.y+m.pad.t,r:m.x+m.w-m.pad.r,b:m.y+m.h-m.pad.b}),layer=document.createElement('canvas'),lg=layer.getContext('2d');
function speech(){if(!talk||!lettered)return;const i=talk.stage,m=metrics[i],look=bubbleLook(talk.age,rm.matches,talk.cut);if(!m||!look)return;
 const pos=anchor(i),pose=bodyPose(i,0,true),neck=toWorld(pos,pose,bodyPoint([0,-113,0],pose)),fs=Math.max(10,12.4*m.s),lh=fs*1.15,spec=lineOf(LINES[i]),s=m.s;
 const font=em=>`${em?'italic 800':'500'} ${fs}px ${LETTER}`,mw=(t,em)=>{g.font=font(em);return g.measureText(t).width},lw=line=>runWidth(line,mw);
 const lines=wrapLines(spec.text,lw,150*s),pad=spec.burst?8*s:0,rows=lines.map(line=>lw(line)+pad),cap=(g.font=font(false),g.measureText('H').actualBoundingBoxAscent);
 const sp=spec.burst?13*s:0,box=inner(m),L=bubbleLayout({x:neck.x,y:neck.y-20*pos.s,r:30*pos.s,top:neck.y-HAT[i]*pos.s},{w:Math.max(...rows),h:lines.length*lh,rows},box,s,sp),k=Math.min(look.scale,popLimit(L,box));
 const rnd=seeded(101+i*7919),rx=L.rx-sp,ry=L.ry-sp,body=new Path2D(),tail=new Path2D(),T=tailCurve(L,rx,ry,spec.burst?0:.18),sh=spec.burst?burstShake(talk.age,rm.matches,s):{dx:0,dy:0,rot:0};
 if(spec.burst)burstPoints(L.x,L.y,rx,ry,sp,rnd).forEach((p,j)=>j?body.lineTo(...p):body.moveTo(...p));else smoothClosed(body,blobPoints(L.x,L.y,rx,ry,rnd));
 body.closePath();tail.moveTo(...T.b1);tail.quadraticCurveTo(...T.c1,L.tip.x,L.tip.y);tail.quadraticCurveTo(...T.c2,...T.b2);tail.closePath();
 // 粗细：先铺向右下偏移的墨块，再描边，最后白底盖住内侧描边与尾根接缝。
 const paint=c=>{c.translate(L.tip.x,L.tip.y);c.scale(k,k);c.translate(-L.tip.x,-L.tip.y);c.translate(L.x+sh.dx,L.y+sh.dy);c.rotate(sh.rot);c.translate(-L.x,-L.y);
  c.save();c.translate(1.3*s,1.7*s);c.fillStyle=inkTone;c.fill(body);c.fill(tail);c.restore();
  c.strokeStyle=inkTone;c.lineWidth=3*s;c.lineJoin=spec.burst?'miter':'round';c.miterLimit=10;c.stroke(body);c.stroke(tail);c.fillStyle='#ffffff';c.fill(body);c.fill(tail);
  c.fillStyle=inkTone;c.textAlign='left';c.textBaseline='alphabetic';lines.forEach((line,j)=>{let x=L.x-(rows[j]-pad)/2;const y=L.y+(j-(lines.length-1)/2)*lh+cap/2;for(const r of runs(line)){c.font=font(r.em);c.fillText(r.t,x,y);x+=mw(r.t,r.em)}})};
 g.save();if(look.alpha>=1){paint(g);g.restore();return}
 // 三层叠画在半透明下会透出底层墨块发灰：淡出时先在离屏层画满，再整体降透明度贴回。
 const d=g.getTransform().a,e=10*s,x0=Math.min(L.x-L.rx,L.tip.x),x1=Math.max(L.x+L.rx,L.tip.x),y0=Math.min(L.y-L.ry,L.tip.y),y1=Math.max(L.y+L.ry,L.tip.y);
 const bx=L.tip.x+(x0-L.tip.x)*k-e,by=L.tip.y+(y0-L.tip.y)*k-e,w=Math.ceil(((x1-x0)*k+2*e)*d),h=Math.ceil(((y1-y0)*k+2*e)*d);
 if(layer.width<w)layer.width=w;if(layer.height<h)layer.height=h;lg.setTransform(1,0,0,1,0,0);lg.clearRect(0,0,w,h);lg.setTransform(d,0,0,d,-bx*d,-by*d);paint(lg);
 g.setTransform(1,0,0,1,0,0);g.globalAlpha*=look.alpha;g.drawImage(layer,0,0,w,h,bx*d,by*d,w,h);g.restore()}
// 点已选格的彩蛋拟声字：复用 sfx/burst，放在格内右上，星爆与字整块夹在内框里。
function yell(){if(!shout)return;const m=metrics[shout.stage],life=rm.matches?.9:1;if(shout.age>=life){shout=null;return}if(!m)return;
 const size=40*m.s,word=SHOUTS[shout.stage];g.save();g.font=`${size}px Bangers, Impact, sans-serif`;const hw=Math.max(size*1.25,g.measureText(word).width/2+size*.12);g.restore();
 const c=fitInside(m.x+m.w*.62,m.y+m.h*.3,hw,size*1.25,inner(m));sfx(word,c.x,c.y,size,shout.age,life,-.12,gold)}
function begin(i,spawn=false,user=true){if(mode!=='fun'||turn)return;if(!loaded){queued=i;return}if(photoChange){queued=i;return}clearTimeout(autoTimer);if(motion&&!spawn){queued=i===motion.target?null:i;return}if(i===stage&&!spawn)return;started=true;const from=anchor(spawn?-1:stage),to=anchor(i),m={target:i,source:stage,from,to,spawn,user,time:0,cues:travelCues(spawn),heard:-1,sourcePose:bodyPose(stage,localTime,true)};m.pivot=pivot(m);motion=m;queued=null;talk=shout=null;root.dataset.phase='aim';if(rm.matches)finish()}
function finish(){if(!motion)return;let m=motion;if(rm.matches&&!(m.cues||[]).some(c=>(c.name==='thud'||c.name==='wham')&&c.at<=m.heard))audio.play('thud');stage=m.target;localTime=rm.matches?0:travelProgress(m.time,m.spawn).work;motion=null;position=anchor(stage);calm();label();talk??={stage,age:rm.matches?0:localTime-bubbleDelay(m.spawn)};root.dataset.phase='working';if(m.user)save();if(queued!==null){let n=queued;queued=null;if(n!==stage)begin(n)}}
function cue(c,m){if(c.name!=='whoosh')audio.play(c.name,{light:!m.spawn});else if(!rm.matches)audio.play('whoosh',{dur:c.dur,from:m.time-c.at,light:!m.spawn})}
function frame(dt){frameDt=dt;if(talk)talk.age+=dt;if(shout)shout.age+=dt;g.clearRect(0,0,root.clientWidth,root.scrollHeight);canvases.forEach((_,i)=>scene(i));if(photoChange){transformPhoto(dt);return}if(!started||!loaded)return;if(!motion){working();return}
let m=motion;m.time+=dt*opts.speed;for(const c of cuesBetween(m.cues,m.heard,m.time))cue(c,m);m.heard=m.time;const tr=travelProgress(m.time,m.spawn);if(tr.done){finish();working();return}
const st=travelPose(m,m.time),pos=st.pos,big=m.spawn,hit=st.impact!==undefined;root.dataset.phase=st.phase;if(st.phase==='settle')localTime=tr.work;
if(st.phase==='swing')speedLines(pos,st.vel,big);
actor(g,pos,st.index,st.pose,st.flight,st.entry);
if(st.phase==='aim')foreground(m.source,1-smooth(tr.charge));
if(st.phase==='settle'){foreground(m.target,ease(big?tr.land:tr.impact/HOP.land));talk??={stage:m.target,age:tr.work-bubbleDelay(big)};speech()}
if(st.silk)silk(handWorld(pos,st.pose),m.pivot,...st.silk);
if(hit){impactRing(pos,st.impact,big);flash(pos,st.impact,big)}
if(big){
  // 入场专属：照片抖动与碎纸、射丝拟声、触地震屏与 WHAM；普通切换不放这些。
  photo.style.transform=m.time<SPAWN.aim+SPAWN.air*.3?`rotate(${7+Math.sin(m.time*40)*3}deg)`:'';
  if(st.phase==='swing'&&tr.flight<.3)shards(m.from,tr.flight);
  m.thwip??=handWorld(m.from,travelPose(m,SPAWN.aim-1e-4).pose);sfx('THWIP!',m.thwip.x-6*m.from.s,m.thwip.y-30*m.from.s,26*m.from.s,m.time-SPAWN.aim*.35,.62,-.18);
  if(hit){shake(st.impact);sfx('WHAM!',m.to.x+74*m.to.s,m.to.y-158*m.to.s,50*m.to.s,st.impact,SPAWN.hold+SPAWN.land*.4,-.1,gold)}
}}
function setMode(next,user=true){if(user&&next===mode)return;if(turn)endTurn();const flip=user&&next!==mode&&!rm.matches;audio.stopAll();photoChange=null;calm();photo.classList.remove('is-transforming');clearTimeout(hoverTimer);clearTimeout(autoTimer);queued=null;talk=shout=null;if(motion){stage=motion.target;motion=null;localTime=0;label()}mode=next;root.dataset.mode=mode;if(mode==='fun'&&user)audio.unlock();root.querySelectorAll('[data-mode-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.modeChoice===mode)));photo.style.transform='';if(flip)turnPage();else settle();if(user)save()}
// 翻页结束（或不翻页）后才收起旧页、量布局：旋转中的页面会让 getBoundingClientRect 读出错位的 metrics。
function settle(){q('.cd-fun').hidden=mode!=='fun';q('.cs-wiki').hidden=mode!=='serious';if(mode!=='fun'){audio.suspend();return}resize();if(!started&&loaded){if(rm.matches){stage=0;started=true;label();frame(0)}else begin(0,true,false)}else frame(0)}
// 翻页：旧页钉在原处叠在上面，绕左侧书脊翻走；回 FUN 时百科页钉在下面、FUN 页从书脊翻回盖住它。卷页网点阴影跟着自由边走。
function turnPage(){const fun=q('.cd-fun'),wiki=q('.cs-wiki'),out=mode!=='fun',top=root.getBoundingClientRect().top;if(top<0)scrollBy(0,top);
 const pin=out?fun:wiki,b=rect(pin);Object.assign(pin.style,{position:'absolute',top:b.y+'px',left:b.x+'px',width:b.w+'px',margin:'0'});if(out)wiki.hidden=false;else{pin.classList.add('pg-under');fun.hidden=false}
 root.dataset.turning='';fun.classList.add('pg-leaf');const leaf=out?b:rect(fun),keys=turnFrames(out,leaf.w),curl=document.createElement('div'),opt={duration:TURN.ms,fill:'both'};
 curl.className='pg-curl';Object.assign(curl.style,{top:leaf.y+'px',left:leaf.x+'px',height:leaf.h+'px'});root.append(curl);
 turn={pin,curl,anims:[fun.animate(keys.map(k=>({transform:`perspective(${TURN.perspective}px) rotateY(${k.deg}deg)`})),opt),fun.animate(keys.map(k=>({opacity:k.shade})),{...opt,pseudoElement:'::after'}),curl.animate(keys.map(k=>({transform:`translateX(${k.edge}px)`,opacity:k.curl})),opt)]};
 turn.anims[0].onfinish=()=>endTurn();Promise.resolve(audio.unlock()).then(()=>{if(!disposed)audio.play('swish')})}
function endTurn(quiet=false){if(!turn)return;const {pin,curl,anims}=turn;turn=null;anims.forEach(a=>a.cancel());curl.remove();pin.classList.remove('pg-under');for(const k of ['position','top','left','width','margin'])pin.style[k]='';q('.cd-fun').classList.remove('pg-leaf');delete root.dataset.turning;if(!quiet)settle()}
function restore(){try{const value=localStorage.getItem('colar-next-motion-v1');if(!value)return;const s=JSON.parse(value);if(Number.isInteger(s.stage)&&s.stage>=0&&s.stage<5){stage=s.stage;started=true;label()}setMode(s.mode==='serious'?'serious':'fun',false)}catch{}}
cards.forEach((el,i)=>{listen(el,'pointerenter',e=>{if(e.pointerType==='touch'||rm.matches)return;clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>begin(i,!started),180)});listen(el,'pointerleave',()=>{clearTimeout(hoverTimer);if(queued===i)queued=null});listen(el,'focus',()=>{clearTimeout(hoverTimer);if(!rm.matches)hoverTimer=setTimeout(()=>begin(i,!started),180)});listen(el,'blur',()=>clearTimeout(hoverTimer));listen(el,'click',()=>{if(i===stage&&!motion&&!photoChange){if(shout&&shout.age<.4)return;celebration={stage:i,start:t};shout={stage:i,age:0};if(talk)talk.cut??=talk.age;audio.play(EGG[i]);q('.ch-status').textContent=['Lightbulb moment','Cash flow','Idea saved','Chef’s special','Click. Keep this moment.'][i];}else begin(i,!started)})});listen(photo,'click',startTransformation);['pointerdown','keydown','click'].forEach(type=>listen(document,type,()=>{if(mode==='fun')audio.unlock()}));if(soundBtn){soundBtn.setAttribute('aria-pressed',String(audio.enabled));listen(soundBtn,'click',()=>{audio.setEnabled(!audio.enabled);soundBtn.setAttribute('aria-pressed',String(audio.enabled))})}root.querySelectorAll('[data-mode-choice]').forEach(b=>listen(b,'click',()=>setMode(b.dataset.modeChoice)));
const ro=new ResizeObserver(()=>{if(!disposed){resize();frame(0)}});ro.observe(root);resize();restore();
const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&loaded&&!started&&mode==='fun'){if(rm.matches){stage=0;started=true;label();frame(0)}else autoTimer=setTimeout(()=>{if(!disposed&&!started&&mode==='fun')begin(0,true,false)},700);io.disconnect()}},{threshold:.1});
head.onload=()=>{if(disposed)return;loaded=true;root.dataset.asset='ready';drawPhotoPortrait();if(queued!==null){let n=queued;queued=null;begin(n,true)}else if(!started)io.observe(photo);frame(0)};
travelPhotos.forEach(image=>{image.onload=()=>{if(!disposed)frame(0)}});
head.onerror=()=>{if(!disposed)root.dataset.asset='error'};head.src='/action/assets/colar-front-head.png';
function tick(now){if(disposed)return;let dt=Math.min(.045,(now-last)/1000||0);last=now;if(mode==='fun'&&!document.hidden){if(!rm.matches){t+=dt;if(!motion&&!photoChange)localTime+=dt}frame(dt)}raf=requestAnimationFrame(tick)}last=performance.now();raf=requestAnimationFrame(tick);
listen(rm,'change',()=>{if(rm.matches){clearTimeout(autoTimer);clearTimeout(hoverTimer);if(photoChange){photoChange.time=2;transformPhoto(0)}if(motion)finish();if(!started){stage=0;started=true;label()}}frame(0)});listen(document,'visibilitychange',()=>{last=performance.now();if(document.hidden)audio.suspend();else if(mode==='fun')audio.wake()});
return ()=>{disposed=true;endTurn(true);audio.close();calm();controller.abort();cancelAnimationFrame(raf);clearTimeout(hoverTimer);clearTimeout(autoTimer);ro.disconnect();io.disconnect();head.onload=null;head.onerror=null;travelPhotos.forEach(image=>{image.onload=null;image.onerror=null});};
}
