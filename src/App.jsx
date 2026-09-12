import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createHarbourEngine } from './three/HarbourEngine.js';
import soundEngine from './audio/SoundEngine.js';
import HarbourPortal from './components/HarbourPortal.jsx';
import './index.css';

// ─────────────────────────────────────────────
//  ANIMATED NUMBER COUNTER HOOK
// ─────────────────────────────────────────────
function useAnimatedCounter(targetValue, duration = 1200, isCurrency = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime = performance.now();
    let raf;

    function step(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(targetValue * ease));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [targetValue, duration]);

  if (!isCurrency) return value.toLocaleString();
  return `£${value.toLocaleString()}`;
}

// ─────────────────────────────────────────────
//  SCENE 1: DIGITAL STORM COUNTER & SPEEDOMETER
// ─────────────────────────────────────────────
function StormStats() {
  const [ms, setMs] = useState(0);

  useEffect(() => {
    let start = performance.now();
    let raf;
    function tick(now) {
      const elapsed = Math.min(19.0, ((now - start) / 1000) * 8.5);
      setMs(elapsed);
      if (elapsed < 19.0) {
        raf = requestAnimationFrame(tick);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="telemetry-bar fade-up delay-3">
      <div className="telemetry-item">
        <span className="telemetry-label">BURST VELOCITY</span>
        <span className="telemetry-value text-cyan">631.5 GBP/S</span>
      </div>
      <div className="telemetry-divider" />
      <div className="telemetry-item">
        <span className="telemetry-label">TRANSACTION WINDOW</span>
        <span className="telemetry-value text-amber">{ms.toFixed(2)}s / 19.00s</span>
      </div>
      <div className="telemetry-divider" />
      <div className="telemetry-item">
        <span className="telemetry-label">NETWORK HOP</span>
        <span className="telemetry-value text-cyan">34 NODES</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SCENE 2: TRANSACTION CORE
// ─────────────────────────────────────────────
function TransactionStats() {
  const amount = useAnimatedCounter(12400, 1100, true);

  return (
    <div className="txn-display-card fade-up delay-2">
      <div className="txn-badge">AUTHENTICATED LEDGER TRANSACTION</div>
      <div className="amount-display">{amount}</div>
      <div className="txn-route">
        <div className="route-node">
          <span className="node-dot source" />
          <span>CURRENT ACCOUNT</span>
        </div>
        <div className="route-line">
          <div className="route-packet" />
        </div>
        <div className="route-node">
          <span className="node-dot dest" />
          <span>HSBC ●●●● 7721</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SCENE 3: RISK SCANNER HUD
// ─────────────────────────────────────────────
function RiskScannerHUD() {
  const [riskPercent, setRiskPercent] = useState(12);

  useEffect(() => {
    let start = performance.now();
    let raf;
    function tick(now) {
      const p = Math.min(1, (now - start) / 1000);
      const v = Math.floor(12 + p * (99.4 - 12));
      setRiskPercent(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="risk-hud-box fade-up delay-3">
      <div className="risk-header">
        <span className="risk-alarm-beacon" />
        <span className="risk-title">NEURAL ANOMALY DETECTOR // LEVEL 4 HIGH THREAT</span>
        <span className="risk-badge">FLAG 0x89E</span>
      </div>
      <div className="risk-meter-track">
        <div className="risk-meter-fill" style={{ width: `${riskPercent}%` }} />
      </div>
      <div className="risk-meta">
        <span>DEVICE FINGERPRINT: MISMATCH</span>
        <span className="risk-score-text">{riskPercent}% CONFIDENCE</span>
        <span>VELOCITY ANOMALY: +420%</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SCENE 6: VOICE FREQUENCY ANALYZER
// ─────────────────────────────────────────────
function VoiceVisualizerHUD() {
  return (
    <div className="voice-hud fade-up delay-3">
      <div className="voice-spectrum">
        {[42, 68, 95, 80, 55, 90, 100, 75, 45, 85, 92, 60, 48, 78, 96, 64, 52, 88].map((h, i) => (
          <div
            key={i}
            className="spectrum-bar"
            style={{
              height: `${h}%`,
              animationDelay: `${(i * 0.05).toFixed(2)}s`
            }}
          />
        ))}
      </div>
      <div className="voice-status">
        <span className="voice-dot" />
        <span>ACOUSTIC BIOMETRICS // CONFIRMED IDENTITY MATCH 99.8%</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SCENE TYPOGRAPHY DATA
// ─────────────────────────────────────────────
const SCENES = [
  {
    id: 0,
    label: 'Origin',
    content: (
      <div className="scene-align-center">
        <div className="cyber-pill fade-up delay-1">
          <span className="cyber-dot" /> HARBOUR DEFENSE PROTOCOL ACTIVE
        </div>
        <h1 className="hero-text fade-up delay-2" style={{ marginTop: 16 }}>
          Money<br /><span className="text-grad">Moves Faster</span>
        </h1>
        <p className="hero-sub fade-up delay-3" style={{ marginTop: 16 }}>
          In a world of millisecond fraud, milliseconds decide everything.
        </p>
      </div>
    ),
    showScrollHint: true,
  },
  {
    id: 1,
    label: 'Digital Storm',
    content: (
      <div className="scene-align-center">
        <p className="scene-label fade-up delay-1">01 — DIGITAL STORM</p>
        <h1 className="hero-text fade-up delay-2">
          £12,000<br /><span className="text-cyan">in 19 seconds.</span>
        </h1>
        <p className="hero-sub fade-up delay-3" style={{ marginTop: 12 }}>
          The moment your phone lights up with an urgent transfer request
        </p>
        <StormStats />
      </div>
    ),
  },
  {
    id: 2,
    label: 'Transaction',
    content: (
      <div className="scene-align-center">
        <p className="scene-label fade-up delay-1">02 — THE TRANSFER</p>
        <TransactionStats />
        <p className="hero-sub fade-up delay-3" style={{ marginTop: 20 }}>
          Direct to unauthorized beneficiary in seconds
        </p>
      </div>
    ),
  },
  {
    id: 3,
    label: 'Risk Scanner',
    content: (
      <div className="scene-align-center">
        <p className="safety-label fade-up delay-1">⚠ FRAUD SIGNAL DETECTED</p>
        <h1 className="hero-text text-danger fade-up delay-2" style={{ fontSize: 'clamp(40px,7.5vw,98px)' }}>
          Something<br />Doesn't Add Up.
        </h1>
        <p className="hero-sub fade-up delay-2" style={{ marginTop: 14 }}>
          Scanning 200+ behavioural, biometric, and network signals
        </p>
        <RiskScannerHUD />
      </div>
    ),
  },
  {
    id: 4,
    label: 'Pause',
    content: (
      <div className="scene-align-center">
        <div className="pause-word-wrap fade-up delay-1">
          <div className="pause-word">WAIT.</div>
          <div className="pause-echo">WAIT.</div>
        </div>
        <p className="hero-sub fade-up delay-2" style={{ marginTop: 24, fontSize: 'clamp(14px,1.8vw,20px)', opacity: 0.9 }}>
          Zero-gravity transaction quarantine engaged.
        </p>
        <div className="quarantine-pill fade-up delay-3">
          <span className="pulse-amber-dot" /> ESCROW SHIELD LOCKED · FUNDS UNTOUCHED
        </div>
      </div>
    ),
  },
  {
    id: 5,
    label: 'Harbour Holds',
    content: (
      <div className="scene-align-center">
        <p className="scene-label fade-up delay-1">05 — PROTECTION LAYER</p>
        <h1 className="hero-text fade-up delay-2">
          Harbour<br /><span className="text-grad">Holds.</span>
        </h1>
        <p className="hero-sub fade-up delay-3" style={{ marginTop: 16 }}>
          No pressure. No rushed decisions. Your money is secured.
        </p>
        <div className="defense-grid fade-up delay-4">
          <div className="defense-card">
            <span className="defense-val">0.00ms</span>
            <span className="defense-lbl">INTERCEPT LATENCY</span>
          </div>
          <div className="defense-card">
            <span className="defense-val">100%</span>
            <span className="defense-lbl">ASSET INTEGRITY</span>
          </div>
          <div className="defense-card">
            <span className="defense-val">AI ESCROW</span>
            <span className="defense-lbl">SHIELD STATUS</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    label: 'Voice Verify',
    content: (
      <div className="scene-align-center">
        <p className="scene-label fade-up delay-1">06 — VOICE BIOMETRIC VERIFICATION</p>
        <h1 className="hero-text fade-up delay-2" style={{ fontSize: 'clamp(42px,7vw,92px)' }}>
          Is this really you?
        </h1>
        <p className="hero-sub fade-up delay-3" style={{ marginTop: 14, color: '#a3e635' }}>
          Real-time spoken challenge: "Authorize Harbour transfer"
        </p>
        <VoiceVisualizerHUD />
      </div>
    ),
  },
  {
    id: 7,
    label: 'Barrier',
    content: (
      <div className="scene-align-center">
        <p className="scene-label fade-up delay-1">07 — FORCEFIELD BARRIER</p>
        <h1 className="hero-text fade-up delay-2" style={{ fontSize: 'clamp(46px,8vw,108px)' }}>
          Nothing<br /><span className="text-cyan">Gets Through.</span>
        </h1>
        <p className="hero-sub fade-up delay-3" style={{ marginTop: 16 }}>
          Social engineering, spoofed IDs, and urgency tactics neutralized.
        </p>
        <div className="barrier-stats fade-up delay-4">
          <span className="barrier-tag">AES-256 GCM</span>
          <span className="barrier-tag">QUANTUM RESISTANT</span>
          <span className="barrier-tag">NON-CUSTODIAL SAFETY</span>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    label: 'Trusted Circle',
    content: (
      <div className="scene-align-center">
        <p className="scene-label fade-up delay-1">08 — CRYPTOGRAPHIC CIRCLE OF TRUST</p>
        <h1 className="hero-text fade-up delay-2" style={{ fontSize: 'clamp(42px,7vw,92px)' }}>
          You Know<br /><span className="text-amber">Who This Is.</span>
        </h1>
        <p className="hero-sub fade-up delay-3" style={{ marginTop: 16 }}>
          Peer-verified recipients authenticated through mutual biometric trust.
        </p>
        <div className="contact-verification-card fade-up delay-4">
          <div className="contact-avatar">SJ</div>
          <div className="contact-info">
            <span className="contact-name">Sarah Jenkins (Verified Family)</span>
            <span className="contact-status">● VERIFIED TRUSTED RECIPIENT</span>
          </div>
          <div className="contact-badge">SAFE</div>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    label: 'Final',
    content: null,
  },
];

// ─────────────────────────────────────────────
//  SCENE TYPOGRAPHY COMPONENT
// ─────────────────────────────────────────────
function SceneUI({ sceneIndex, onEnter }) {
  const [displayed, setDisplayed] = useState(sceneIndex);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (sceneIndex !== displayed) {
      setDisplayed(sceneIndex);
      setKey(k => k + 1);
    }
  }, [sceneIndex, displayed]);

  if (displayed === 9) {
    return (
      <div className="scene-ui">
        <div className="scene-content" id="scene-card-inner">
          <div className="cyber-pill fade-up delay-1">
            <span className="cyber-dot" /> NEXT GENERATION FINANCIAL IMMUNITY
          </div>
          <h1 className="hero-text fade-up delay-2" style={{ fontSize: 'clamp(64px,11vw,150px)', marginTop: 12 }}>
            HARBOUR
          </h1>
          <div className="final-tagline fade-up delay-3" style={{ marginBottom: 36 }}>
            Fraud stops here. Confidence starts now.
          </div>
          <div className="features-strip fade-up delay-3">
            <div className="feature-pill">🛡️ Autonomous Escrow</div>
            <div className="feature-pill">🎙️ Acoustic Voice ID</div>
            <div className="feature-pill">⚡ 0ms Intercept Guard</div>
          </div>
          <div key={key} className="confirm-bar fade-up delay-4" style={{ marginTop: 36 }}>
            <button className="btn-primary" onClick={onEnter} data-hover>
              Enter Harbour Experience
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scene = SCENES[displayed];
  if (!scene?.content) return null;

  return (
    <div key={key} className="scene-ui">
      <div className="scene-content" id="scene-card-inner">
        {scene.content}
      </div>
      {scene.showScrollHint && (
        <div id="scroll-hint">
          <div className="scroll-mouse-icon">
            <div className="scroll-mouse-wheel" />
          </div>
          <span className="scroll-label">Scroll to Explore</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  ADVANCED INTERACTIVE MULTI-RING CURSOR
// ─────────────────────────────────────────────
function Cursor({ mousePos }) {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const haloRef = useRef(null);

  const ringPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const haloPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    let raf;
    function animate() {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      haloPos.current.x += (mousePos.current.x - haloPos.current.x) * 0.08;
      haloPos.current.y += (mousePos.current.y - haloPos.current.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%,-50%)`;
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `translate(${haloPos.current.x}px, ${haloPos.current.y}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(animate);
    }
    animate();

    const addHover = () => document.body.classList.add('cursor-hover');
    const rmHover  = () => document.body.classList.remove('cursor-hover');
    document.querySelectorAll('button, a, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', rmHover);
    });

    return () => cancelAnimationFrame(raf);
  }, [mousePos]);

  return (
    <>
      <div id="cursor-halo" ref={haloRef} />
      <div id="cursor-ring" ref={ringRef}>
        <span className="crosshair-x" />
        <span className="crosshair-y" />
      </div>
      <div id="cursor-dot"  ref={dotRef} />
    </>
  );
}

// ─────────────────────────────────────────────
//  NAVIGATION & CYBER TELEMETRY BAR
// ─────────────────────────────────────────────
function Navigation({ sceneIndex, totalScenes, scrollProgress, onDotClick, isMuted, onToggleMute }) {
  const currentSceneName = SCENES[sceneIndex]?.label || 'Harbour';

  return (
    <div id="top-nav">
      {/* Brand */}
      <div className="nav-brand">
        <div className="nav-dot" />
        <span className="nav-title">HARBOUR</span>
        <span className="nav-tag">SECURITY LAB</span>
      </div>

      {/* Center scroll progress indicator */}
      <div className="nav-center-telemetry">
        <span className="telemetry-phase">PHASE {String(sceneIndex).padStart(2, '0')} // {currentSceneName.toUpperCase()}</span>
        <div className="telemetry-bar-mini">
          <div className="telemetry-bar-mini-fill" style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }} />
        </div>
        <span className="telemetry-pct">{Math.round(scrollProgress * 100)}%</span>
      </div>

      {/* Right actions */}
      <div className="nav-right">
        {/* Audio Toggle */}
        <button
          className={`btn-glass audio-btn ${!isMuted ? 'active' : ''}`}
          onClick={onToggleMute}
          title={isMuted ? 'Enable Spatial Audio' : 'Mute Audio'}
          data-hover
        >
          <span className="audio-icon">
            <span className="audio-wave wave-1" />
            <span className="audio-wave wave-2" />
            <span className="audio-wave wave-3" />
          </span>
          <span className="audio-text">{isMuted ? 'SOUND OFF' : 'AUDIO ACTIVE'}</span>
        </button>

        <button
          className="btn-glass"
          onClick={() => onDotClick(totalScenes - 1)}
          data-hover
        >
          Skip to End
        </button>
      </div>

      {/* Right-side interactive progress rail */}
      <div id="progress-dots">
        {Array.from({ length: totalScenes }).map((_, i) => (
          <button
            key={i}
            className={`prog-dot${sceneIndex === i ? ' active' : ''}`}
            onClick={() => onDotClick(i)}
            aria-label={`Jump to ${SCENES[i]?.label || `Scene ${i + 1}`}`}
            data-hover
          >
            <span className="prog-tooltip">{SCENES[i]?.label || `Scene ${i + 1}`}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  LOADING SCREEN OVERLAY
// ─────────────────────────────────────────────
function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += 1.2 + Math.random() * 2.2;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setFading(true);
          onFinishRef.current?.();
        }, 300);
      } else {
        setProgress(Math.min(p, 99));
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#010409',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div className="loading-logo">HARBOUR</div>
      <div className="loading-bar-wrap">
        <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loading-meta">
        INITIALIZING NEURAL TRANSACTION SHIELD // {Math.round(progress)}%
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN APPLICATION
// ─────────────────────────────────────────────
export default function App() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const coordRef  = useRef(null);
  const spotlightRef = useRef(null);

  const [loaded,         setLoaded]         = useState(false);
  const [loadingDone,    setLoadingDone]    = useState(false);
  const [sceneIndex,     setSceneIndex]     = useState(0);
  const [entered,        setEntered]        = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted,        setIsMuted]        = useState(true);

  // Mouse coordinate refs for zero-lag 120fps tracking
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouseNDC = useRef({ x: 0, y: 0 });

  // Smooth scroll interpolation
  const targetScroll  = useRef(0);
  const currentScroll = useRef(0);

  const TOTAL = 10;

  // ── Audio Toggle ─────────────────────────────
  const handleToggleMute = useCallback(() => {
    const active = soundEngine.toggleMute();
    setIsMuted(!active);
  }, []);

  // ── Engine Boot: INITIALIZE IMMEDIATELY ON MOUNT ──
  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = createHarbourEngine(canvasRef.current, (si) => {
      setSceneIndex(si);
      soundEngine.onSceneChange(si);
    });
    engineRef.current = engine;

    return () => {
      engine.destroy();
    };
  }, []);

  // ── Butter-Smooth Inertial Scroll Loop ────────
  useEffect(() => {
    let raf;
    let lastProgress = 0;

    function updateScroll() {
      const delta = targetScroll.current - currentScroll.current;
      currentScroll.current += delta * 0.09;

      if (Math.abs(delta) > 0.0001) {
        engineRef.current?.setScroll(currentScroll.current);
        const rounded = Math.round(currentScroll.current * 100);
        if (rounded !== lastProgress) {
          lastProgress = rounded;
          setScrollProgress(currentScroll.current);
        }
      }

      raf = requestAnimationFrame(updateScroll);
    }
    raf = requestAnimationFrame(updateScroll);

    const onScroll = () => {
      const track = document.getElementById('scroll-track');
      if (!track) return;
      const total = track.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      targetScroll.current = Math.max(0, Math.min(1, scrolled / total));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── High Performance Mouse & Shockwave Loop ───
  useEffect(() => {
    let raf;

    function updateMouseUI() {
      const ndcX = mouseNDC.current.x;
      const ndcY = mouseNDC.current.y;

      // Update coordinate readout directly in DOM without React re-render
      if (coordRef.current) {
        const xStr = ndcX >= 0 ? `+${ndcX.toFixed(3)}` : ndcX.toFixed(3);
        const yStr = ndcY >= 0 ? `+${ndcY.toFixed(3)}` : ndcY.toFixed(3);
        coordRef.current.textContent = `X:${xStr} Y:${yStr}`;
      }

      // Update cursor spotlight position
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
      }

      // 3D perspective tilt on the active card
      const card = document.getElementById('scene-card-inner');
      if (card) {
        const rotX = (-ndcY * 7).toFixed(2);
        const rotY = (ndcX * 9).toFixed(2);
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
      }

      raf = requestAnimationFrame(updateMouseUI);
    }
    raf = requestAnimationFrame(updateMouseUI);

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = (e.clientY / window.innerHeight) * 2 - 1;

      mouseNDC.current.x = ndcX;
      mouseNDC.current.y = ndcY;

      engineRef.current?.setMouse(ndcX, -ndcY);
    };

    const onClick = (e) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = (e.clientY / window.innerHeight) * 2 - 1;
      engineRef.current?.triggerShockwave(ndcX, -ndcY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Dot Nav Jump ─────────────────────────────
  const handleDotClick = useCallback((i) => {
    const track = document.getElementById('scroll-track');
    if (!track) return;
    const max = track.scrollHeight - window.innerHeight;
    const target = (i / (TOTAL - 1)) * max;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Interactive multi-tier cursor */}
      <Cursor mousePos={mousePos} />

      {/* Atmospheric ambient cursor spotlight */}
      <div id="cursor-spotlight" ref={spotlightRef} />

      {/* Cyber Grid overlay */}
      <div id="cyber-grid" />

      {/* Film grain texture */}
      <div id="grain" />

      {/* Loading Screen Overlay */}
      {!loadingDone && (
        <LoadingScreen
          onFinish={() => {
            setLoaded(true);
            setTimeout(() => setLoadingDone(true), 750);
          }}
        />
      )}

      {/* Massive 1800vh Scroll Track */}
      <div id="scroll-track" />

      {/* Fixed 3D WebGL Canvas — always active and rendering */}
      <div id="canvas-root">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* Interactive Fixed UI Overlay */}
      <div id="ui-root" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Navigation
          sceneIndex={sceneIndex}
          totalScenes={TOTAL}
          scrollProgress={scrollProgress}
          onDotClick={handleDotClick}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        <SceneUI
          sceneIndex={sceneIndex}
          onEnter={() => setEntered(true)}
        />

        {/* Bottom HUD: Coordinates & Status */}
        <div id="bottom-hud">
          <div className="hud-coords">
            <span className="hud-coord-label">TARGET LOC:</span>
            <span className="hud-coord-val" ref={coordRef}>X:+0.000 Y:+0.000</span>
          </div>
          <div className="hud-encryption">
            <span className="hud-dot-active" />
            <span>ACTIVE MONITORING · ESCROW SECURED</span>
          </div>
        </div>
      </div>

      {/* Modal / Main App Entrance after "Enter Harbour" */}
      {entered && (
        <HarbourPortal
          onClose={() => setEntered(false)}
          onJumpToStage={(stageIndex) => {
            setEntered(false);
            handleDotClick(stageIndex);
          }}
        />
      )}
    </>
  );
}
