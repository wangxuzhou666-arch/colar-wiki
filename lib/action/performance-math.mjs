import {clamp, smooth} from './motion-math.mjs';

// 先沉腕蓄力，再提锅；食材比锅晚起、晚落。
export function kitchenMotion(time) {
  const phase = (time % 3.6) / 3.6;
  const preparation = Math.sin(Math.PI * smooth(clamp((phase - .20) / .16)));
  const arc = smooth(clamp((phase - .36) / .44));
  const toss = Math.sin(Math.PI * arc);
  const lift = toss * 24 - preparation * 4;
  const tilt = -.23 * toss + preparation * .055;
  const c = Math.cos(tilt), s = Math.sin(tilt);
  const grip = [222 - 51 * c + 10 * s, 148 - lift - 51 * s - 10 * c - 4];
  const hand = [190 + Math.sin(time * 3) * 3, 114 - lift * .65 - toss * 7];
  const tip = [222 + Math.sin(time * 3) * 11, 143 - lift - toss * 18];
  return {p:phase, a:arc, toss, lift, tilt, preparation, grip, hand, tip};
}

// 有阻尼的二阶跟随，用于披风对身体运动的滞后和回摆。
export function springStep(state, target, dt) {
  let value=state.value, velocity=state.velocity;
  const steps=Math.max(1,Math.ceil(dt/.012)), h=Math.min(.06,dt)/steps;
  for(let i=0;i<steps;i++){
    velocity+=((target-value)*72-velocity*12)*h;
    value+=velocity*h;
  }
  return {value,velocity};
}

export function banknoteAt(index, time, count=44) {
  const spread=((index*.61803398875)%1)*2-1;
  const p=((time+index*4.8/count)%4.8)/4.8;
  return {
    x:57+(106+spread*168)*p+Math.sin(p*8+index)*p*14,
    y:145-232*p+Math.sin(p*Math.PI)*23,
    angle:Math.sin(p*9+index)*.48+spread*.4,
    scale:.55+p*.6,
    fold:.76+Math.sin(time*4+index)*.2,
    alpha:clamp(smooth(clamp(time/.6))*smooth(clamp(p/.05))*(1-smooth(clamp((p-.83)/.17)))),
  };
}
