import {clamp,smooth,mix,engagedTime,studyBeat,bodyPoint,solveLimb,reachDepth,travelProgress,airEase,airSpeed,swingPath,landingCrouch,HOP,SPAWN} from './motion-math.mjs';
import {kitchenMotion} from './performance-math.mjs';

export const ARM=[36,33],LEG=[28,27];
const HIPS=[['l',-12,[-.2,0,1]],['r',13,[.2,0,1]]];
// 站立时髋到脚接近腿长，膝盖只朝镜头微屈；休息位手肘朝后，不向两侧张开。
const rest=()=>({lh:[-34,-48,6],rh:[35,-47,6],lf:[-19,0,0],rf:[23,0,0],lpole:[-.3,.3,-1],rpole:[.3,.3,-1],lean:0,torso:0,pitch:0,yaw:0,head:0,crouch:0,hip:0});
const kitchenPoint=(point,z)=>[(point[0]-132)/.92,(point[1]-216)/.92,z];

export function solveLegs(p){
  for(const [side,x,pole] of HIPS){
    const hip=[x+(p.hip||0),-52+(p.crouch||0),0],foot=p[side+'f'],leg=solveLimb(hip,[foot[0],foot[1],foot[2]??0],...LEG,pole);
    p[side+'p']=hip;p[side+'k']=leg.mid;p[side+'f']=leg.end;
  }
  return p;
}
export function solvePose(p){
  for(const side of ['l','r']){
    const sign=side==='l'?-1:1,hand=p[side+'h'],target=[hand[0],hand[1],hand[2]??6];
    // 手举过肩时锁骨上提，肩点随之上移外移。
    const lift=clamp((bodyPoint([23*sign,-104,0],p)[1]-target[1]-8)/45),shoulder=bodyPoint([sign*(23+lift*3),-104-lift*5,0],p);
    const arm=solveLimb(shoulder,reachDepth(shoulder,target,ARM[0]+ARM[1]),...ARM,p[side+'pole']||[sign*.3,.3,-1]);
    p[side+'s']=shoulder;p[side+'e']=arm.mid;p[side+'h']=arm.end;p[side+'lift']=lift;
  }
  return solveLegs(p);
}
export function bodyPose(i,clock,work){
  clock=engagedTime(clock);const p=rest();if(!work)return solvePose(p);
  const s=Math.sin(clock*7),slow=Math.sin(clock*2);
  // 前倾是朝书桌（也就是朝观众）的俯仰，不是画面内侧歪。
  if(i===0){const beat=studyBeat(clock);Object.assign(p,{pitch:.3+(beat.torso-.24)*1.5,torso:.04+beat.flip*.03,head:.1+beat.head*3-beat.flip*.06,crouch:3,lh:[11+beat.flip*17,-61-beat.flip*25,22+beat.flip*6],rh:[beat.tip[0]-5,beat.tip[1]-6,22],lpole:[-.35,.6,-.7],rpole:[.5,.55,-.65],lf:[-17,0,6],rf:[24,0,2]})}
  if(i===1)Object.assign(p,{pitch:.2,torso:.02+slow*.01,head:.07+slow*.03,crouch:2,lh:[14,-61+s*1.5,20],rh:[42,-62-s*1.5,20],lpole:[-.35,.6,-.7],rpole:[.45,.6,-.65],lf:[-16,0,4],rf:[23,0,0]});
  // 躯干比手晚 0.15 秒跟随抬手，髋部反向微移保持重心。
  if(i===2){const wave=t=>(1-Math.cos(t/3*Math.PI*2))/2,rise=wave(clock),body=wave(Math.max(0,clock-.15));Object.assign(p,{pitch:.16-body*.06,torso:.02+body*.06,hip:-body*2,head:.04+body*.08,crouch:2,lh:[12+Math.sin(clock*5)*2,-61+Math.sin(clock*9)*1.5,20],rh:[48+rise*10,-68-rise*29,14],lpole:[-.35,.6,-.7],rpole:[.5,.3,-.8],lf:[-17,0,4],rf:[23,0,0]})}
  // 身体滞后手腕约 0.08 秒：先沉胯蓄力，锅起时躯干后仰随动。
  if(i===3){const beat=kitchenMotion(clock),lag=kitchenMotion(Math.max(0,clock-.08));Object.assign(p,{pitch:.14+lag.preparation*.06-lag.toss*.05,torso:.05-lag.toss*.1+lag.preparation*.03,crouch:lag.preparation*4+lag.toss*3,hip:lag.toss*2,head:.05-lag.toss*.1,lh:kitchenPoint(beat.grip,18),rh:kitchenPoint(beat.hand,18),lpole:[-.15,.7,-.7],rpole:[.45,.5,-.75],lf:[-18,0,2],rf:[24,0,0]})}
  if(i===4){const hold=smooth(clamp((clock%4.4)/.65))*(1-smooth(clamp(((clock%4.4)-2.1)/.9)));Object.assign(p,{head:slow*.03,crouch:hold*2,lh:[-8,-60-hold*49,10+hold*16],rh:[16,-60-hold*49,10+hold*16],lpole:[-.3,.9,-.3],rpole:[.3,.9,-.3],lf:[-21,0,0],rf:[25,0,0]})}
  return solvePose(p);
}
// 逐级带动：髋部先动，躯干、肩、手、头依次滞后，最后同时到位。
const DELAY={torso:.06,pitch:.06,yaw:.06,lpole:.12,rpole:.12,lh:.18,rh:.18,head:.22};
export function blendPose(a,b,p){
  const o={};
  for(const k of Object.keys(b)){
    if(!(k in a)){o[k]=b[k];continue}
    const d=DELAY[k]||0,t=d?smooth((p-d)/(1-d)):p;
    o[k]=Array.isArray(b[k])?b[k].map((v,j)=>mix(a[k][j]??v,v,t)):mix(a[k],b[k],t);
  }
  return solvePose(o);
}

// 角色局部坐标与页面坐标互换，与 actor 的变换顺序一致：绕身体中心摆向（spin），再绕脚底 lean，最后缩放平移到落脚点。
const CENTER=-70,turn=(v,a)=>[v[0]*Math.cos(a)-v[1]*Math.sin(a),v[0]*Math.sin(a)+v[1]*Math.cos(a)];
export function toWorld(pos,pose,pt){const v=turn([pt[0],pt[1]-CENTER],pose.spin||0),q=turn([v[0],v[1]+CENTER],(pose.lean||0)*.012);return{x:pos.x+q[0]*pos.s,y:pos.y+q[1]*pos.s}}
export function toLocal(pos,pose,pt){const v=turn([(pt.x-pos.x)/pos.s,(pt.y-pos.y)/pos.s],-(pose.lean||0)*.012),q=turn([v[0],v[1]-CENTER],-(pose.spin||0));return [q[0],q[1]+CENTER]}
// 抓丝的手放在"肩→锚点"连线上；锁骨上提会移动肩点，所以按新肩点再解一次。
export function aimArm(p,side,anchor,w=1){
  const start=p[side+'h'];
  for(let k=0;k<2;k++){const sh=p[side+'s'],dx=anchor[0]-sh[0],dy=anchor[1]-sh[1],n=Math.hypot(dx,dy)||1,r=Math.min(ARM[0]+ARM[1]-3,n),aim=[sh[0]+dx/n*r,sh[1]+dy/n*r,sh[2]];
    p[side+'h']=start.map((v,j)=>mix(v,aim[j],w));p[side+'pole']=[side==='l'?-.3:.3,.4,-1];solvePose(p)}
  return p;
}
// 惯性让腿拖在速度后方、空手反向后甩；入场冲刺时双腿并拢伸直，和抓丝手臂连成一条动作线。
export function flyPose(vel,spawn=false){
  const p=rest(),back=[-vel[0],-vel[1]],toward=(m,len,base=[0,1])=>{const x=mix(base[0],back[0],m),y=mix(base[1],back[1],m),n=Math.hypot(x,y)||1;return[x/n*len,y/n*len]};
  const trail=toward(.7,LEG[0]+LEG[1]-2),tuck=toward(spawn?.7:.45,spawn?LEG[0]+LEG[1]-5:31),arm=toward(spawn?.85:.5,62,[-.8,.35]);
  Object.assign(p,{crouch:-2,pitch:-.06,torso:-vel[0]*.06,head:Math.max(-.17,Math.min(.17,vel[0]*.14)),rf:[13+trail[0],-52+trail[1],-4],lf:[(spawn?-6:-12)+tuck[0],-52+tuck[1],spawn?-6:18],lh:[-23+arm[0],-104+arm[1],-6],lpole:[-.3,.4,-.9]});
  return solvePose(p);
}
// 三点式英雄落地：后膝跪地、前膝朝镜头抬起，一拳撑地，另一臂斜向上后扬；躯干压低并朝拳头一侧倾，从扬起的手到撑地的拳连成一条对角动作线。
export function heroLanding(){
  const p=rest();
  Object.assign(p,{crouch:26,pitch:.62,torso:.13,head:-.1,hip:-4,lf:[-24,0,-30],rf:[22,0,20],lh:[-58,-118,-22],lpole:[-.4,.6,-.7],rh:[22,-3,40],rpole:[.4,-.2,-.9]});
  return solvePose(p);
}
const readyToLand=()=>{const p=rest();Object.assign(p,{crouch:-1,lh:[-52,-84,0],lpole:[-.3,.4,-.9]});return solvePose(p)};
function chargeState(m,a){
  const base=m.sourcePose,pos={...m.from},hold=smooth(a/.65);
  // 先下压蓄力并停住一拍，再出手射丝；脚保持踩实。
  const p=blendPose(base,{...base,crouch:(base.crouch||0)+(m.spawn?14:10),pitch:(base.pitch||0)*.3,torso:-.05,head:-.06,hip:(base.hip||0)-2,lh:[-24,-74,10],lpole:[-.4,.5,-.8]},hold);
  p.spin=0;aimArm(p,'r',toLocal(pos,p,m.pivot),smooth(a/.55));
  return {phase:'aim',pos,pose:p,index:m.source,flight:a*.45,entry:1-hold,silk:[smooth(clamp((a-.3)/.55)),12*(1-a)],vel:{x:0,y:0}};
}
function airState(m,u){
  const T=m.spawn?SPAWN:HOP,e=airEase(u),path=swingPath(m.from,m.to,m.pivot,e,m.spawn?110:40,m.spawn?62:40),grow=m.spawn?1+.42*Math.sin(Math.PI*clamp(u/.85)):1;
  const pos={x:path.x,y:path.y,s:mix(m.from.s,m.to.s,e)*grow},rate=airSpeed(u)/T.air,vel={x:path.dx*rate,y:path.dy*rate};
  // 身体像挂在丝上的摆锤，朝"重心→锚点"摆向；起跳后摆开，落地前回正。
  const lim=m.spawn?1.85:1.1,raw=Math.atan2(m.pivot.x-pos.x,pos.y-70*pos.s-m.pivot.y),spin=Math.max(-lim,Math.min(lim,raw))*smooth(u/.16)*(1-smooth((u-.62)/.32));
  const lv=turn([vel.x,vel.y],-spin),n=Math.hypot(...lv)||1,fly=flyPose([lv[0]/n,lv[1]/n],m.spawn),end=m.spawn?readyToLand():bodyPose(m.target,0,true);
  const p=blendPose(blendPose(chargeState(m,1).pose,fly,smooth(u/.22)),end,smooth((u-.66)/.34));p.spin=spin;
  // 下落段先收腿（膝盖朝镜头上提、脚贴近髋），临触地 2-3 帧再伸腿迎地，经过桌面高度时读作"在下落"而不是"站着"。
  const tuck=smooth((u-.58)/.16)*(1-smooth((u-.93)/.07));
  if(tuck>0){for(const [side,x] of [['l',-15],['r',17]])p[side+'f']=p[side+'f'].map((v,j)=>mix(v,[x,-52+p.crouch+27,16][j],tuck));solveLegs(p)}
  aimArm(p,'r',toLocal(pos,p,m.pivot));
  return {phase:'swing',pos,pose:p,index:m.source,flight:Math.sin(Math.PI*u),entry:0,silk:[1,Math.sin(Math.PI*u)*8],vel};
}
// 一次切换或入场的完整编排：输入出发点、目标、锚点与时间，输出页面位置、姿态、服装与特效时刻。
export function travelPose(m,time){
  const tr=travelProgress(time,m.spawn);
  if(tr.phase==='aim')return chargeState(m,tr.charge);
  if(tr.phase==='swing')return airState(m,tr.flight);
  const td=airState(m,1),t=tr.impact,pos={...m.to},still={x:0,y:0};
  if(m.spawn){
    // 触地 0.14 秒内压进三点姿态（起始斜率不为零，接住下落速度），随后定格。
    if(tr.phase==='impact'){const p=blendPose(td.pose,heroLanding(),1-(1-clamp(t/.14))**2);p.spin=0;return {phase:'impact',pos,pose:p,index:m.target,flight:0,entry:0,silk:t<.2?[1-t/.2,t*200]:null,impact:t,vel:still}}
    const r=smooth(tr.land),p=blendPose(heroLanding(),bodyPose(m.target,tr.work,true),r);p.spin=0;
    return {phase:'settle',pos,pose:p,index:m.target,flight:0,entry:r,silk:null,impact:t,vel:still};
  }
  const b=smooth(t/.3),p=blendPose(td.pose,bodyPose(m.target,tr.work,true),b),v0=Math.min(330,td.vel.y/td.pos.s);
  p.spin=0;p.crouch+=landingCrouch(t,v0);solvePose(p);
  return {phase:'settle',pos,pose:p,index:m.target,flight:0,entry:b,silk:t<HOP.land*.5?[1-t/(HOP.land*.5),t*140]:null,impact:t,vel:still};
}
