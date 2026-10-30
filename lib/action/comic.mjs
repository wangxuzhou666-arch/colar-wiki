import {clamp,mix,smooth,SPAWN} from './motion-math.mjs';

// 台词与彩蛋拟声字按场景顺序（Study, Finance, ByteDance, Kitchen, Life）；文案归 Colar，改这里即可。
// *词* = 重读（粗斜体）。以 ! 结尾的句子画爆炸气泡；要单句改判就写成 {text:'…',burst:false}。
export const LINES=['NOTTINGHAM → PENN. NEXT *CHAPTER*!','MARKETS *NEVER* SLEEP.','SHIP IT. THEN *MEASURE* IT.','ORDER *UP*!','SAY *CHEESE*!'];
export const SHOUTS=['EUREKA!','KA-CHING!','SHIPPED!','SIZZLE!','CLICK!'];
// 入场的 WHAM 定格字消失后才开口，两块大字不抢同一处视线。
export const bubbleDelay=spawn=>spawn?SPAWN.land*.4:0;
export const BUBBLE={pop:.1,settle:.15,hold:3,gone:3.4,cut:.15};
// 落地后 .3→1.12 过冲再回到 1，停到 3s 后淡出；减弱动效不缩放、到点直接消失；被彩蛋打断时淡出（减弱动效下立即消失）。
export function bubbleLook(age,rm=false,cut=null){
  if(age<0||age>=BUBBLE.gone)return null;
  if(cut!==null&&age>=cut&&(rm||age-cut>=BUBBLE.cut))return null;
  const scale=rm?1:age<BUBBLE.pop?mix(.3,1.12,1-(1-age/BUBBLE.pop)**2):mix(1.12,1,smooth((age-BUBBLE.pop)/(BUBBLE.settle-BUBBLE.pop)));
  let alpha=rm?1:1-smooth((age-BUBBLE.hold)/(BUBBLE.gone-BUBBLE.hold));
  if(cut!==null&&age>=cut)alpha*=1-clamp((age-cut)/BUBBLE.cut);
  return alpha>1e-6?{scale,alpha}:null;
}
export const plain=s=>s.replaceAll('*','');
export const runs=line=>line.split('*').map((t,i)=>({t,em:i%2===1})).filter(r=>r.t);
export const runWidth=(line,measure)=>runs(line).reduce((w,r)=>w+measure(r.t,r.em),0);
export const lineOf=e=>{const text=typeof e==='string'?e:e.text;return{text,burst:e.burst??/!$/.test(plain(text))}};
// 跨空格的 *A B* 拆成 *A* *B*：换行只在空格处断，这样每行的标记仍成对。
const closeWords=text=>text.split('*').map((s,i)=>i%2?s.split(' ').map(w=>w&&`*${w}*`).join(' '):s).join('');
// 最多两行：放得下就一行；否则优先在句号/感叹号处断（两半都不超宽时），再退而求最长行最短的断点。measure 收到带标记的行，自行按分段字体量宽。
export function wrapLines(text,measure,maxW){
  const words=closeWords(text).split(' '),all=words.join(' ');if(words.length<2||measure(all)<=maxW)return [all];
  let best=null;
  for(let k=1;k<words.length;k++){const lines=[words.slice(0,k).join(' '),words.slice(k).join(' ')],w=Math.max(...lines.map(measure)),score=w-(/[.!?]\*?$/.test(words[k-1])&&w<=maxW?1e6:0);if(!best||score<best.score)best={lines,score}}
  return best.lines;
}
// 把半宽 hw、半高 hh 的盒子中心夹进边界 b={l,t,r,b}；边界放不下时居中。
export const fitInside=(x,y,hw,hh,b)=>({x:b.r-b.l<2*hw?(b.l+b.r)/2:Math.max(b.l+hw,Math.min(b.r-hw,x)),y:b.b-b.t<2*hh?(b.t+b.b)/2:Math.max(b.t+hh,Math.min(b.b-hh,y))});
// 贴字椭圆：给了每行宽度 rows 就按各行大写字角点反推最小 rx，短行不必把椭圆撑宽。
export function hug(text,s){
  if(!text.rows)return{rx:text.w/2+20*s,ry:text.h/2+13*s};
  const n=text.rows.length,lh=text.h/n,ry=text.h/2+9*s;let rx=0;
  text.rows.forEach((w,j)=>{const dy=(Math.abs(j-(n-1)/2)*lh+lh*.33)/ry;rx=Math.max(rx,w/2/Math.sqrt(Math.max(.2,1-dy*dy)))});
  return{rx:rx+7*s,ry};
}
// 气泡在头顶偏左（避开右侧道具），整体夹在格内；尾巴朝脸心，尾尖停在头外不压脸。phi 是尾根在椭圆参数方程里的角度。spike 是爆炸气泡尖角的外扩量，计入外椭圆。
export function bubbleLayout(head,text,box,s,spike=0){
  const h=hug(text,s),rx=h.rx+spike,ry=h.ry+spike,c=fitInside(head.x-rx*.45,head.top-ry-6*s,rx,ry,box);
  const dx=head.x-c.x,dy=head.y-c.y,d=Math.hypot(dx,dy)||1,theta=Math.atan2(dy,dx),edge=1/Math.hypot(Math.cos(theta)/rx,Math.sin(theta)/ry),reach=Math.max(edge+10*s,d-head.r-4*s);
  return {x:c.x,y:c.y,rx,ry,phi:Math.atan2(rx*Math.sin(theta),ry*Math.cos(theta)),tip:{x:c.x+dx/d*reach,y:c.y+dy/d*reach}};
}
// 弹出以尾尖为原点缩放：过冲时允许的最大倍数，保证 1.12 那一帧也不越出格框（静止位置不必为此让位）。
export function popLimit(L,box){
  const k=(room,reach)=>reach>1e-6?room/reach:Infinity;
  return Math.max(1,Math.min(k(L.tip.x-box.l,L.tip.x-L.x+L.rx),k(L.tip.y-box.t,L.tip.y-L.y+L.ry),k(box.r-L.tip.x,L.x+L.rx-L.tip.x),k(box.b-L.tip.y,L.y+L.ry-L.tip.y)));
}

// 固定种子（mulberry32）：同一场景每帧得到同一圈抖动，气泡轮廓不会逐帧闪。
export function seeded(seed){return()=>{seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
// 手绘椭圆：18 点半径做两组低频正弦抖动（不超过 ±3.6%），再用闭合 Catmull-Rom 连成曲线。
export function blobPoints(x,y,rx,ry,rnd,n=18){const p1=rnd()*6.3,p2=rnd()*6.3;return Array.from({length:n},(_,k)=>{const a=k/n*2*Math.PI,s=1+.022*Math.sin(2*a+p1)+.014*Math.sin(3*a+p2);return[x+Math.cos(a)*rx*s,y+Math.sin(a)*ry*s]})}
export function smoothClosed(path,p){const n=p.length;path.moveTo(...p[0]);for(let i=0;i<n;i++){const a=p[(i-1+n)%n],b=p[i],c=p[(i+1)%n],e=p[(i+2)%n];path.bezierCurveTo(b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6,c[0]-(e[0]-b[0])/6,c[1]-(e[1]-b[1])/6,c[0],c[1])}path.closePath();return path}
// 爆炸气泡：谷点落在内椭圆（字在里面），尖角外伸 spike 的 60–100%，所以整体不出外椭圆 (rx+spike, ry+spike)。
export function burstPoints(x,y,rx,ry,spike,rnd,n=13){return Array.from({length:2*n},(_,k)=>{const a=(k+(rnd()-.5)*.45)/(2*n)*2*Math.PI-Math.PI/2,L=k%2?0:spike*(.6+.4*rnd());return[x+Math.cos(a)*(rx+L),y+Math.sin(a)*(ry+L)]})}
// 楔形尾巴：根部埋进椭圆 86% 处（被白底盖住、无接缝），两条同向弯的二次曲线收尖到 tip；bend=0 即直边（爆炸气泡用）。
export function tailCurve(L,rx,ry,bend=.18){const on=a=>[L.x+Math.cos(a)*rx*.86,L.y+Math.sin(a)*ry*.86],b1=on(L.phi-.2),b2=on(L.phi+.2),dx=L.tip.x-(b1[0]+b2[0])/2,dy=L.tip.y-(b1[1]+b2[1])/2,mid=(b,f)=>[mix(b[0],L.tip.x,f)-dy*bend,mix(b[1],L.tip.y,f)+dx*bend];return{b1,b2,c1:mid(b1,.5),c2:mid(b2,.55)}}
// 爆炸气泡出现后抖 .2s、振幅平方衰减到 0 再定住；减弱动效下不抖。
export const SHAKE=.2;
export function burstShake(age,rm=false,s=1){if(rm||age<0||age>=SHAKE)return{dx:0,dy:0,rot:0};const a=(1-age/SHAKE)**2;return{dx:2.6*s*a*Math.sin(age*113),dy:2*s*a*Math.cos(age*89),rot:.05*a*Math.sin(age*71)}}

// 翻页角度（度）：翻走时起步慢、越来越快，过 -90°（侧对观众、背面隐藏）后的后程不可见；翻回是它的倒放，落页时减速。
export const TURN={ms:720,perspective:2400,steps:24};
export function turnAngle(u,out=true){if(!out)return turnAngle(1-u,true);u=clamp(u);if(u<.7){const p=u/.7;return -90*p*p*(3-p)/2}return -90-90*(u-.7)/.3}
// 页面绕左缘转 θ 后，自由边在透视下投影到的横坐标（朝观众翻起的一侧会被放大）。
export const edgeX=(deg,w,P=TURN.perspective)=>{const a=deg*Math.PI/180;return w*Math.cos(a)*P/(P+w*Math.sin(a))};
// 逐帧关键帧数据：页面角度、卷页阴影位置与浓度（立起到 45° 最浓）、页面背光网点浓度（越接近侧立越暗）。
export function turnFrames(out,w,n=TURN.steps){
  return Array.from({length:n+1},(_,k)=>{const deg=turnAngle(k/n,out),seen=deg>-90;return {deg,edge:seen?Math.max(0,edgeX(deg,w)):0,curl:seen?.6*Math.sin(-2*deg*Math.PI/180):0,shade:seen?.45*(-deg/90):0}});
}
