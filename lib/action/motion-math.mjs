export const clamp = n => Math.max(0, Math.min(1, n));
export const smooth = n => { const t=clamp(n);return t*t*t*(10+t*(-15+t*6)); };
export const mix = (a,b,t) => a+(b-a)*t;
// 到位后从静止逐渐进入工作节拍，避免落地瞬间突然加速。
export const engagedTime = time => Math.max(0, time - .18 * (1 - Math.exp(-time / .18)));
// 躯干绕髋部中心先俯仰、再转身、最后画面内侧倾；z>0 朝向观众。
export function bodyPoint(point,pose={}) {
  let x=point[0],y=point[1]+52,z=point[2]||0,c=Math.cos(pose.pitch||0),s=Math.sin(pose.pitch||0);
  [y,z]=[y*c+z*s,z*c-y*s];c=Math.cos(pose.yaw||0);s=Math.sin(pose.yaw||0);[x,z]=[x*c+z*s,z*c-x*s];
  c=Math.cos(pose.torso||0);s=Math.sin(pose.torso||0);[x,y]=[x*c-y*s,x*s+y*c];
  return [x+(pose.hip||0),y-52+(pose.crouch||0),z];
}
// 两节骨在 3D 中求解，pole 决定弯曲平面；正交投影时朝向镜头的骨段自然缩短，多余长度不再挤成侧向外翻。
export function solveLimb(root,target,upper,fore,pole) {
  const d=[0,1,2].map(k=>(target[k]||0)-(root[k]||0)),raw=Math.hypot(...d),dir=raw<1e-4?[0,1,0]:d.map(v=>v/raw);
  const reach=Math.max(Math.abs(upper-fore)+.05,Math.min(upper+fore-.05,raw));
  const along=(upper*upper-fore*fore+reach*reach)/(2*reach),height=Math.sqrt(Math.max(0,upper*upper-along*along));
  const side=v=>{const dot=v[0]*dir[0]+v[1]*dir[1]+v[2]*dir[2],b=v.map((x,k)=>x-dir[k]*dot),n=Math.hypot(...b);return n>1e-6?b.map(x=>x/n):null};
  const bend=side(pole)||side(Math.abs(dir[2])<.9?[0,0,-1]:[1,0,0]);
  return {mid:[0,1,2].map(k=>(root[k]||0)+dir[k]*along+bend[k]*height),end:[0,1,2].map(k=>(root[k]||0)+dir[k]*reach)};
}
// 画面落点不变，只在可达范围内取深度，手仍然准确接触道具。
export function reachDepth(root,target,length) {
  const dx=target[0]-root[0],dy=target[1]-root[1],room=Math.sqrt(Math.max(0,(length-.5)**2-dx*dx-dy*dy));
  return [target[0],target[1],root[2]+Math.max(-room,Math.min(room,(target[2]??0)-root[2]))];
}
export function studyBeat(time) {
  const cycle=((time%2.8)+2.8)%2.8,write=smooth(cycle/.18)*(1-smooth((cycle-2.15)/.25));
  const stroke=Math.sin(time*Math.PI*10),advance=Math.sin(time*Math.PI/1.4);
  return {tip:[48+advance*3+stroke*6*write,-60+Math.cos(time*Math.PI*10)*.7*write],torso:.24+Math.sin(time*Math.PI/1.4)*.024,head:Math.sin(time*Math.PI/1.4-.4)*.012,flip:Math.sin(Math.PI*smooth((cycle-2.35)/.45))};
}
// 时间轴：蓄力 → 被丝拉出 → 带速度触地；入场多一段英雄落地定格，再起身进入工作。
export const HOP={aim:.24,air:.78,hold:0,land:.5},SPAWN={aim:.3,air:.8,hold:.35,land:.85};
export function travelProgress(time,spawn=false){
  const T=spawn?SPAWN:HOP,touch=T.aim+T.air,rise=touch+T.hold,total=rise+T.land;
  return {phase:time<T.aim?'aim':time<touch?'swing':time<rise?'impact':'settle',charge:clamp(time/T.aim),flight:clamp((time-T.aim)/T.air),impact:Math.max(0,time-touch),land:clamp((time-rise)/T.land),work:Math.max(0,time-rise),touch,total,done:time>=total};
}
// 起跳爆发、顶点放慢、下落再加速：两端速度都不为零，触地时仍带着冲量。
export const airEase=(s,k=.55)=>s+k*Math.sin(2*Math.PI*s)/(2*Math.PI);
export const airSpeed=(s,k=.55)=>1+k*Math.cos(2*Math.PI*s);
// 三次贝塞尔：前段朝锚点被拉起，末段从目标正上方落下，触地速度竖直向下。
export function swingPath(from,to,pivot,u,lift=40,drop=40){
  const x=[from.x,mix(from.x,pivot.x,.55),to.x,to.x],y=[from.y,Math.min(from.y,pivot.y)-lift,to.y-drop,to.y],v=1-u;
  const at=q=>v*v*v*q[0]+3*v*v*u*q[1]+3*v*u*u*q[2]+u*u*u*q[3],slope=q=>3*v*v*(q[1]-q[0])+6*v*u*(q[2]-q[1])+3*u*u*(q[3]-q[2]);
  return {x:at(x),y:at(y),dx:slope(x),dy:slope(y)};
}
// 触地后髋部带着下落速度继续下沉，再欠阻尼回弹：冲击来自速度，而不是先停住再蹲。
export function landingCrouch(t,v0,omega=20,zeta=.42){
  if(t<=0)return 0;const wd=omega*Math.sqrt(1-zeta*zeta),c=v0/wd*Math.exp(-zeta*omega*t)*Math.sin(wd*t);
  return Math.max(-9.1,Math.min(9.1,c));
}
