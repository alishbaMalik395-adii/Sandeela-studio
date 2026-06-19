import { useEffect, useState, useRef } from "react";
import "./Preloader.css";

const SANDEELA = "SANDEELA".split("");
const STUDIO   = "STUDIO".split("");

const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
  duration: `${5 + Math.random() * 5}s`,
  size: `${1 + Math.random() * 2.5}px`,
  drift: `${-40 + Math.random() * 80}px`,
}));

const STARS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  top: `${5 + Math.random() * 85}%`,
  delay: `${i * 0.8}s`,
  dur: `${2 + Math.random() * 2}s`,
}));

// ── TIMING (ms) ──────────────────────────
const T_LIGHT   = 80;     // "LIGHT" appears with a bit of ease
const T_CAMERA  = 360;    // "CAMERA" follows at a smoother pace
const T_ACTION  = 760;    // "ACTION" appears after a more dramatic build
const T_SHUTTER = 1240;   // shutter click + flash after a longer action pause
const T_LETTERS = 1380;   // SANDEELA letters start dropping after flash
const STEP      = 80;     // gap between each letter
const T_DIVIDER = T_LETTERS + SANDEELA.length * STEP + 100;
const T_STUDIO  = T_DIVIDER + 120;
const T_TAGLINE = T_STUDIO  + STUDIO.length * 70 + 150;
const T_PROG    = T_TAGLINE + 180;

export default function Preloader() {
  const [phase,    setPhase]    = useState(0); // 0=dark 1=light 2=camera 3=action 4=flash 5=letters
  const [flash,    setFlash]    = useState(false);
  const [shutter,  setShutter]  = useState(false);
  const [showDiv,  setShowDiv]  = useState(false);
  const [showStudio,setShowStudio]=useState(false);
  const [showTag,  setShowTag]  = useState(false);
  const [showProg, setShowProg] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lensLit,  setLensLit]  = useState(false);
  const [letters,  setLetters]  = useState(false);
  const [studio,   setStudio]   = useState(false);
  const actx = useRef(null);

  const ctx = () => {
    if (!actx.current) actx.current = new (window.AudioContext || window.webkitAudioContext)();
    return actx.current;
  };

  const tone = (freq, dur, vol=0.15, type="sine", delay=0, attack=0.01) => {
    try {
      const c = ctx(); const t = c.currentTime + delay;
      const o = c.createOscillator(); const g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.start(t); o.stop(t + dur + 0.01);
    } catch(e){}
  };

  // "khaufnak" dramatic sound — LIGHT CAMERA ACTION
  const playDramatic = () => {
    try {
      const c = ctx();
      // deep rumble
      tone(40,  2.0, 0.3,  "sawtooth", 0,    0.05);
      tone(55,  1.8, 0.2,  "sine",     0.1,  0.05);
      // rising whoosh
      const o = c.createOscillator(); const g = c.createGain();
      const filt = c.createBiquadFilter();
      filt.type = "bandpass"; filt.frequency.value = 800; filt.Q.value = 2;
      o.connect(filt); filt.connect(g); g.connect(c.destination);
      o.type = "sawtooth";
      const t = c.currentTime;
      o.frequency.setValueAtTime(80, t);
      o.frequency.exponentialRampToValueAtTime(1200, t + 1.8);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.12, t + 0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.0);
      o.start(t); o.stop(t + 2.1);
    } catch(e){}
  };

  const playWord = (n) => {
    // each word hit — cinematic boom
    const hits = [
      [120, 0.25, 0.35, "sawtooth"],
      [90,  0.3,  0.3,  "sawtooth"],
      [60,  0.4,  0.4,  "sawtooth"],
    ];
    hits.forEach(([f,d,v,t], i) => tone(f, d, v, t, i * 0.02));
    // high metallic sting
    tone(n === 3 ? 1200 : 800, 0.15, 0.18, "square", 0.01);
  };

  // ACTION — biggest hit
  const playAction = () => {
    tone(50,  0.5, 0.4, "sawtooth", 0);
    tone(80,  0.4, 0.3, "sawtooth", 0.02);
    tone(1400,0.12,0.2, "square",   0.03);
    tone(700, 0.3, 0.15,"sine",     0.05);
    // reverb tail
    tone(50, 1.5, 0.12, "sine", 0.1, 0.2);
  };

  const playCapture = () => {
    try {
      tone(2400, 0.03, 0.35, "square",  0);
      tone(1100, 0.05, 0.18, "triangle",0.01);
      tone(130,  0.08, 0.18, "sine",    0.02);
    } catch (e) {}
  };

  // camera shutter
  const playShutter = () => {
    playCapture();
    tone(300, 0.04, 0.35, "square",   0);
    tone(150, 0.06, 0.25, "sawtooth", 0.01);
    tone(80,  0.08, 0.20, "sawtooth", 0.02);
    // flash pop
    tone(1800, 0.04, 0.15, "sine",    0.05);
    tone(900,  0.08, 0.10, "sine",    0.06);
  };

  const playLetter = (i) => {
    const scale = [523,587,659,698,784,880,988,1047];
    tone(scale[i % scale.length], 0.09, 0.08, "sine");
    tone(scale[i % scale.length] * 1.5, 0.05, 0.04, "sine", 0.02);
  };

  const playChime = () => {
    [[784,0],[988,0.12],[1175,0.24],[1568,0.36]].forEach(([f,d]) => tone(f, 0.5, 0.12, "sine", d));
  };

  useEffect(() => {
    // try to resume audio immediately and also on first interaction
    try { ctx().resume(); } catch(e){}
    const unlock = () => { try { ctx().resume(); } catch(e){} };
    window.addEventListener("click", unlock, {once:true});
    window.addEventListener("touchstart", unlock, {once:true});
    window.addEventListener("pointerdown", unlock, {once:true});
    window.addEventListener("keydown", unlock, {once:true});

    // ambient hum starts
    setTimeout(() => {
      tone(35, 8, 0.06, "sine");
      tone(50, 8, 0.03, "sawtooth");
    }, 100);

    // LIGHT
    setTimeout(() => { setPhase(1); playWord(1); }, T_LIGHT);
    // CAMERA
    setTimeout(() => { setPhase(2); playWord(2); }, T_CAMERA);
    // ACTION
    setTimeout(() => { setPhase(3); playAction(); playDramatic(); }, T_ACTION);

    // SHUTTER CLICK + FLASH
    setTimeout(() => {
      setPhase(4);
      setShutter(true); setLensLit(true);
      playShutter();
      setFlash(true);
      setTimeout(() => setFlash(false), 80);
      setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 60);
      }, 120);
    }, T_SHUTTER);

    // LETTERS DROP
    setTimeout(() => {
      setPhase(5); setLetters(true);
      SANDEELA.forEach((_, i) => setTimeout(() => playLetter(i), i * STEP));
    }, T_LETTERS);

    // DIVIDER
    setTimeout(() => setShowDiv(true), T_DIVIDER);

    // STUDIO
    setTimeout(() => {
      setStudio(true);
      STUDIO.forEach((_, i) => setTimeout(() => tone(440 + i*60, 0.07, 0.06, "sine"), i * 110));
    }, T_STUDIO);

    // CHIME
    setTimeout(playChime, T_STUDIO + STUDIO.length * 110 + 100);

    // TAGLINE
    setTimeout(() => setShowTag(true), T_TAGLINE);

    // PROGRESS
    setTimeout(() => {
      setShowProg(true);
      const iv = setInterval(() => {
        setProgress(p => { if(p>=100){clearInterval(iv);return 100;} return p+1.2; });
      }, 24);
    }, T_PROG);

    return () => {};
  }, []);

  return (
    <div className={`pl-root ${phase >= 4 ? "pl-phase-studio" : ""} ${flash ? "pl-flash" : ""}`}>

      {/* Flash overlay */}
      <div className={`pl-flash-layer ${flash ? "pl-flash-on" : ""}`} />

      {/* Background */}
      <div className="pl-scanlines" />
      <div className="pl-grid" />
      <div className="pl-orb pl-orb1" />
      <div className="pl-orb pl-orb2" />
      <div className="pl-orb pl-orb3" />

      {/* Rings */}
      <div className="pl-ring pl-r1" />
      <div className="pl-ring pl-r2" />
      <div className="pl-ring pl-r3" />
      <div className="pl-ring pl-r4" />

      {/* Particles + stars — after shutter */}
      {phase >= 4 && PARTICLES.map(p => (
        <div key={p.id} className="pl-pt" style={{
          left:p.left, animationDelay:p.delay,
          animationDuration:p.duration,
          width:p.size, height:p.size, '--d':p.drift
        }}/>
      ))}
      {phase >= 4 && STARS.map(s => (
        <div key={s.id} className="pl-star" style={{top:s.top, animationDelay:s.delay, animationDuration:s.dur}}/>
      ))}

      {/* Sweeps */}
      {phase >= 4 && <>
        <div className="pl-sweep pl-sw1"/>
        <div className="pl-sweep pl-sw2"/>
        <div className="pl-hline pl-hl1"/>
        <div className="pl-hline pl-hl2"/>
      </>}

      {/* ── CENTER ── */}
      <div className="pl-center">

        {/* LIGHT / CAMERA / ACTION — phases 1,2,3 */}
        <div className={`pl-lca-wrap ${phase >= 5 ? "pl-lca-exit" : ""}`}>
          <div className={`pl-lca-word pl-word-light ${phase >= 1 ? "pl-word-in" : ""}`}>
            <span>L</span><span>I</span><span>G</span><span>H</span><span>T</span>
          </div>
          <div className={`pl-lca-word pl-word-camera ${phase >= 2 ? "pl-word-in" : ""}`}>
            <span>C</span><span>A</span><span>M</span><span>E</span><span>R</span><span>A</span>
          </div>
          <div className={`pl-lca-word pl-word-action ${phase >= 3 ? "pl-word-in" : ""} ${phase >= 3 ? "pl-action-shake" : ""}`}>
            <span>A</span><span>C</span><span>T</span><span>I</span><span>O</span><span>N</span>
            {phase >= 3 && <div className="pl-action-burst">
              {Array.from({length:16}).map((_,i)=>(
                <div key={i} className="pl-burst-ray" style={{"--a":`${i*22.5}deg`}}/>
              ))}
            </div>}
          </div>
        </div>

        {/* Camera after LCA */}
        {phase >= 4 && (
          <div className="pl-cam-wrap">
            <div className={`pl-cam-glow ${shutter ? "pl-cam-glow-on" : ""}`}/>
            <div className={`pl-cam-glow pl-cam-glow2 ${shutter ? "pl-cam-glow-on" : ""}`}/>
            <div className={`pl-aperture ${shutter ? "pl-ap-open" : ""}`}>
              {[0,1,2,3,4,5,6,7].map(i=>(
                <div key={i} className="pl-blade" style={{"--r":`${i*45}deg`}}/>
              ))}
            </div>
            <div className="pl-lens">
              <div className="pl-lr pl-lr1"/><div className="pl-lr pl-lr2"/><div className="pl-lr pl-lr3"/>
              <div className={`pl-lcore ${lensLit ? "pl-lcore-lit" : ""}`}>
                <div className="pl-lflare"/>
              </div>
            </div>
            <div className="pl-orbit pl-ob1"><div className="pl-odot"/></div>
            <div className="pl-orbit pl-ob2"><div className="pl-odot pl-odot-sm"/></div>
          </div>
        )}

        {/* SANDEELA */}
        {phase >= 4 && (
          <div className="pl-name-main">
            {SANDEELA.map((l, i) => (
              <span key={i} className={`pl-letter ${letters ? "pl-letter-drop" : ""}`}
                style={{animationDelay: letters ? `${i * STEP}ms` : "0s"}}>
                {l}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        {phase >= 4 && (
          <div className={`pl-divider ${showDiv ? "pl-div-in" : ""}`}>
            <div className="pl-div-line"/>
            <span className="pl-div-gem">◆</span>
            <span className="pl-div-star">✦</span>
            <span className="pl-div-gem">◆</span>
            <div className="pl-div-line"/>
          </div>
        )}

        {/* STUDIO */}
        {phase >= 4 && (
          <div className="pl-name-sub">
            {STUDIO.map((l, i) => (
              <span key={i} className={`pl-sletter ${studio ? "pl-sletter-drop" : ""}`}
                style={{animationDelay: studio ? `${i * 110}ms` : "0s"}}>
                {l}
              </span>
            ))}
          </div>
        )}

        {/* Tagline */}
        {phase >= 4 && (
          <p className={`pl-tagline ${showTag ? "pl-tg-in" : ""}`}>
            <em>Where Light Meets Art</em>
          </p>
        )}

        {/* Progress */}
        {phase >= 4 && (
          <div className={`pl-prog ${showProg ? "pl-prog-in" : ""}`}>
            <div className="pl-prog-row">
              <span className="pl-prog-lbl">LOADING</span>
              <span className="pl-prog-pct">{Math.min(Math.round(progress),100)}%</span>
            </div>
            <div className="pl-prog-track">
              <div className="pl-prog-fill" style={{width:`${Math.min(progress,100)}%`}}>
                <div className="pl-prog-head"/>
              </div>
              {Array.from({length:10}).map((_,i)=><div key={i} className="pl-seg"/>)}
            </div>
          </div>
        )}
      </div>

      {/* Corners */}
      {["tl","tr","bl","br"].map(c=>(
        <div key={c} className={`pl-corner pl-c-${c}`}>
          <div className="pl-ch"/><div className="pl-cv"/><div className="pl-cd"/>
        </div>
      ))}
      <div className="pl-edge-t"/><div className="pl-edge-b"/>
    </div>
  );
}