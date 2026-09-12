import * as THREE from 'three';

// ─────────────────────────────────────────────
//  EXPANDED SCROLL-DRIVEN CAMERA TIMELINE
//  Ultra-smooth multi-axis camera flight through 10 worlds.
// ─────────────────────────────────────────────

const KEYFRAMES = [
  // Scene 0 — Void / Singularity Origin
  { pos: [0, 0, 6.2],       look: [0, 0, 0],     fov: 54, roll: 0 },
  // Scene 1 — Digital Storm (high-speed dive into the particle tunnel)
  { pos: [0, 0.1, 3.2],     look: [0, 0, -12],   fov: 68, roll: 0.04 },
  // Scene 2 — Transaction Crystal (offset orbit, macro focus)
  { pos: [1.4, 0.45, 4.0],  look: [0, 0.05, 0],  fov: 46, roll: -0.03 },
  // Scene 3 — Risk Scanner (dramatic low-angle sweep)
  { pos: [-2.2, 0.65, 4.2], look: [0.1, 0, 0],   fov: 48, roll: 0.05 },
  // Scene 4 — Zero-G Pause (dead center, extreme tension macro)
  { pos: [0, 0, 2.9],       look: [0, 0, 0],     fov: 40, roll: 0 },
  // Scene 5 — Harbour Architecture (grand pull-back reveal)
  { pos: [0, 1.35, 8.4],    look: [0, 0.1, 0],   fov: 58, roll: -0.02 },
  // Scene 6 — Voice Waveform (elevated oblique perspective)
  { pos: [0.95, 0.7, 5.2],  look: [0, 0, 0],     fov: 50, roll: 0.03 },
  // Scene 7 — Protection Barrier (symmetrical frontal defense wall)
  { pos: [0, 0, 5.6],       look: [0, 0, 0],     fov: 48, roll: 0 },
  // Scene 8 — Trusted Nodes (wide stereoscopic observation)
  { pos: [0, 0.1, 6.8],     look: [0, 0, 0],     fov: 54, roll: -0.02 },
  // Scene 9 — Final Convergence (monumental wide shot)
  { pos: [0, 0.15, 9.4],    look: [0, 0, 0],     fov: 44, roll: 0 },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerp3(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

// Smooth cubic ease for seamless camera transitions
function cubicEase(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getInterpolatedState(scroll) {
  const n = KEYFRAMES.length - 1;
  const clamped = Math.max(0, Math.min(1, scroll));
  const raw = clamped * n;
  const idx = Math.floor(raw);
  const localT = raw - idx;

  const kA = KEYFRAMES[Math.min(idx, n)];
  const kB = KEYFRAMES[Math.min(idx + 1, n)];
  const t = cubicEase(localT);

  return {
    pos: lerp3(kA.pos, kB.pos, t),
    look: lerp3(kA.look, kB.look, t),
    fov: lerp(kA.fov, kB.fov, t),
    roll: lerp(kA.roll, kB.roll, t),
  };
}

export function createCameraController(camera) {
  let _pos = { x: 0, y: 0, z: 6.2 };
  let _look = { x: 0, y: 0, z: 0 };
  let _fov = 54;
  let _roll = 0;
  let _mouseParallax = { x: 0, y: 0, z: 0 };

  return {
    update(scroll, mouseNDC, deltaTime) {
      const target = getInterpolatedState(scroll);

      // Silky smooth dampening for cinematic feel
      const factor = Math.min(1, deltaTime * 3.2);
      _pos.x  += (target.pos[0]  - _pos.x)  * factor;
      _pos.y  += (target.pos[1]  - _pos.y)  * factor;
      _pos.z  += (target.pos[2]  - _pos.z)  * factor;
      _look.x += (target.look[0] - _look.x) * factor;
      _look.y += (target.look[1] - _look.y) * factor;
      _look.z += (target.look[2] - _look.z) * factor;
      _fov    += (target.fov     - _fov)    * factor;
      _roll   += (target.roll    - _roll)   * factor;

      // Mouse parallax with dynamic banking
      const mouseSpeed = 0.08;
      _mouseParallax.x += (mouseNDC.x * 0.55 - _mouseParallax.x) * mouseSpeed;
      _mouseParallax.y += (mouseNDC.y * 0.42 - _mouseParallax.y) * mouseSpeed;

      camera.position.set(
        _pos.x + _mouseParallax.x,
        _pos.y + _mouseParallax.y,
        _pos.z
      );

      camera.lookAt(_look.x, _look.y, _look.z);

      // Apply subtle roll bank based on mouse and trajectory
      camera.rotation.z = _roll + (-mouseNDC.x * 0.025);

      camera.fov = _fov;
      camera.updateProjectionMatrix();
    }
  };
}

export function getSceneIndex(scroll) {
  const n = KEYFRAMES.length - 1;
  const raw = scroll * n;
  const idx = Math.floor(raw);
  const local = raw - idx;
  return local > 0.55 ? Math.min(idx + 1, n) : idx;
}

