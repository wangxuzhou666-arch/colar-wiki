import {HOP,SPAWN,airSpeed,clamp} from './motion-math.mjs';

// 音效挂在动作时间轴上：射丝对齐 THWIP 字与出丝时刻，触地 = 换装帧，入场多一个定格和弦。
export function travelCues(spawn=false){
  const T=spawn?SPAWN:HOP,touch=T.aim+T.air,cues=[{name:'thwip',at:T.aim*(spawn?.35:.3)},{name:'whoosh',at:T.aim,dur:T.air},{name:spawn?'wham':'thud',at:touch}];
  if(spawn)cues.push({name:'stab',at:touch+.06});
  return cues.sort((a,b)=>a.at-b.at);
}
// 半开区间 (prev, now]：时间单调推进，跳帧与 dt=0 的重绘都恰好触发一次。
export const cuesBetween=(cues,prev,now)=>cues.filter(c=>c.at>prev&&c.at<=now);
// 呼啸强弱跟随飞行速度；from 用于晚到一帧时从中途接上，而不是整段推迟。
export function whooshCurve(dur,steps=64,from=0){
  const gain=new Float32Array(steps),freq=new Float32Array(steps);
  for(let i=0;i<steps;i++){const u=mix01(from/dur,1,i/(steps-1)),s=airSpeed(u)/1.55;gain[i]=clamp(u/.12)*clamp((1-u)/.18)*s;freq[i]=500+1600*s}
  return {gain,freq};
}
const mix01=(a,b,t)=>a+(b-a)*t;

const NOISE=new WeakMap();let grain=0;
function noise(ctx){let b=NOISE.get(ctx);if(!b){b=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);const d=b.getChannelData(0);let s=7;for(let i=0;i<d.length;i++){s=s*16807%2147483647;d[i]=s/1073741823.5-1}NOISE.set(ctx,b)}return b}
function amp(ctx,out,t,peak,attack,release,hold=0){const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+attack);if(hold)g.gain.setValueAtTime(peak,t+attack+hold);g.gain.exponentialRampToValueAtTime(.0001,t+attack+hold+release);g.connect(out);return g}
function tone(ctx,to,type,f0,f1,t,dur,detune=0){const o=ctx.createOscillator();o.type=type;o.frequency.setValueAtTime(f0,t);if(f1!==f0)o.frequency.exponentialRampToValueAtTime(f1,t+dur);o.detune.value=detune;o.connect(to);o.start(t);o.stop(t+dur+.02);return o}
function hiss(ctx,to,t,dur,type,f0,f1=f0,q=1){const s=ctx.createBufferSource(),f=ctx.createBiquadFilter();s.buffer=noise(ctx);s.loop=true;f.type=type;f.Q.value=q;f.frequency.setValueAtTime(f0,t);if(f1!==f0)f.frequency.exponentialRampToValueAtTime(f1,t+dur);s.connect(f);f.connect(to);s.start(t,(grain++*.137)%.8);s.stop(t+dur+.02);return f}
function drive(ctx,out,k=2.5){const w=ctx.createWaveShaper(),c=new Float32Array(1024);for(let i=0;i<1024;i++){const x=i/511.5-1;c[i]=Math.tanh(k*x)/Math.tanh(k)}w.curve=c;w.connect(out);return w}

// 每个音色：(context, 输出节点, 起始时间, 选项) → 结束时间；在线播放与离线渲染共用。
export const voices={
  swish(ctx,out,t){hiss(ctx,amp(ctx,out,t,1.5,.03,.2),t,.25,'bandpass',600,4000,1.2);return t+.25},
  thwip(ctx,out,t,o={}){const k=o.light?.5:1;hiss(ctx,amp(ctx,out,t,.55*k,.002,.04),t,.05,'highpass',3000);const z=amp(ctx,out,t,.45*k,.003,.13);tone(ctx,z,'triangle',2400,300,t,.13);tone(ctx,amp(ctx,out,t,.12*k,.003,.1),'square',1800,240,t,.11);return t+.16},
  whoosh(ctx,out,t,o={}){const dur=Math.max(.05,(o.dur||.8)-(o.from||0)),c=whooshCurve(o.dur||.8,64,o.from||0),g=ctx.createGain(),k=(o.light?.45:1)*.7;
    g.gain.value=0;g.gain.setValueCurveAtTime(c.gain.map(v=>v*k),t,dur);g.connect(out);const f=hiss(ctx,g,t,dur,'bandpass',c.freq[0],c.freq[0],1.2);f.frequency.cancelScheduledValues(t);f.frequency.setValueCurveAtTime(c.freq,t,dur);return t+dur},
  wham(ctx,out,t){const d=drive(ctx,amp(ctx,out,t,.8,.001,.6,.05));tone(ctx,amp(ctx,d,t,.9,.004,.5),'sine',120,40,t,.45);hiss(ctx,amp(ctx,d,t,.7,.002,.28),t,.3,'lowpass',2000,300);hiss(ctx,amp(ctx,out,t,.4,.001,.05),t,.06,'highpass',1500);return t+.62},
  thud(ctx,out,t){tone(ctx,amp(ctx,out,t,.6,.003,.22),'sine',90,45,t,.22);hiss(ctx,amp(ctx,out,t,.25,.002,.08),t,.1,'lowpass',600);return t+.26},
  // 降 B 大三和弦的短促铜管：锯齿波过低通，滤波器先张后收，音量克制。
  stab(ctx,out,t){const f=ctx.createBiquadFilter();f.type='lowpass';f.Q.value=.7;f.frequency.setValueAtTime(700,t);f.frequency.linearRampToValueAtTime(2400,t+.04);f.frequency.exponentialRampToValueAtTime(1000,t+.3);f.connect(amp(ctx,out,t,.32,.012,.22,.08));
    [233.08,293.66,349.23,466.16].forEach((hz,i)=>{const g=ctx.createGain();g.gain.value=.25;g.connect(f);tone(ctx,g,'sawtooth',hz,hz,t,.34,i%2?6:-6)});return t+.34},
  ding(ctx,out,t){tone(ctx,amp(ctx,out,t,.35,.002,.7),'sine',1318.5,1318.5,t,.72);tone(ctx,amp(ctx,out,t+.09,.3,.002,.8),'sine',1975.5,1975.5,t+.09,.82);return t+.92},
  chaching(ctx,out,t){hiss(ctx,amp(ctx,out,t,.4,.001,.03),t,.04,'bandpass',3500,3500,4);hiss(ctx,amp(ctx,out,t+.07,.36,.001,.04),t+.07,.05,'bandpass',4200,4200,4);tone(ctx,amp(ctx,out,t+.12,.24,.002,.6),'sine',2093,2093,t+.12,.62);tone(ctx,amp(ctx,out,t+.12,.18,.002,.55),'sine',2637,2637,t+.12,.57);return t+.75},
  blip(ctx,out,t){const f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=3000;f.connect(out);tone(ctx,amp(ctx,f,t,.25,.003,.05),'square',660,660,t,.06);tone(ctx,amp(ctx,f,t+.07,.25,.003,.07),'square',990,990,t+.07,.08);return t+.17},
  sizzle(ctx,out,t){const g=ctx.createGain(),n=48,c=new Float32Array(n);let s=11;for(let i=0;i<n;i++){s=s*16807%2147483647;c[i]=(s/2147483647>.55?.2:.045)*clamp((n-1-i)/(n*.4))}g.gain.value=0;g.gain.setValueCurveAtTime(c,t,.55);g.connect(out);hiss(ctx,g,t,.55,'highpass',4000);return t+.6},
  shutter(ctx,out,t){hiss(ctx,amp(ctx,out,t,1.5,.001,.025),t,.03,'bandpass',2500,2500,3);hiss(ctx,amp(ctx,out,t+.09,1.2,.001,.03),t+.09,.035,'bandpass',1800,1800,3);tone(ctx,amp(ctx,out,t,.6,.002,.03),'sine',180,180,t,.04);return t+.15},
};
// 主链路：音色 → 主音量 → 压缩器（防削波）→ 输出。离线渲染复用同一链路以测真实峰值。
export function masterChain(ctx){const comp=ctx.createDynamicsCompressor(),master=ctx.createGain();comp.threshold.value=-12;comp.knee.value=6;comp.ratio.value=6;comp.attack.value=.003;comp.release.value=.2;master.gain.value=.35;master.connect(comp);comp.connect(ctx.destination);return master}

// 浏览器要求用户手势后才能出声：首个手势里才建 context，之前的 cue 直接丢弃，不排队补播。unlock 返回 resume 的 promise，让翻页 swish 等 context 真正恢复后再播。
export function createSound(key='colar-next-motion-sound'){
  let ctx=null,master=null,enabled=true,live=true;const buses=new Set();
  try{enabled=localStorage.getItem(key)!=='0'}catch{}
  const api={
    get enabled(){return enabled},
    unlock(){if(!enabled||!live)return;if(!ctx){const AC=globalThis.AudioContext||globalThis.webkitAudioContext;if(!AC)return;ctx=new AC();master=masterChain(ctx)}if(ctx.state!=='closed')return ctx.resume().catch(()=>{})},
    wake(){if(ctx&&enabled&&live&&ctx.state!=='closed')ctx.resume().catch(()=>{})},
    play(name,o={}){if(!enabled||!live||!ctx||ctx.state!=='running'||!voices[name])return;const bus=ctx.createGain();bus.connect(master);buses.add(bus);const end=voices[name](ctx,bus,ctx.currentTime+.005,o);setTimeout(()=>{bus.disconnect();buses.delete(bus)},(end-ctx.currentTime)*1000+250)},
    stopAll(){buses.forEach(b=>b.disconnect());buses.clear()},
    suspend(){api.stopAll();if(ctx&&ctx.state!=='closed')ctx.suspend().catch(()=>{})},
    setEnabled(on){enabled=on;try{localStorage.setItem(key,on?'1':'0')}catch{}if(on)api.unlock();else api.suspend()},
    close(){live=false;api.stopAll();if(ctx){ctx.close().catch(()=>{});ctx=null}},
  };
  return api;
}
