import * as THREE from 'three';
import { createParticleWorld } from './ParticleWorld.js';
import { createCameraController, getSceneIndex } from './CameraTimeline.js';
import { buildWorld } from './WorldObjects.js';

// ─────────────────────────────────────────────
//  HARBOUR 3D ENGINE
//  Pure vanilla Three.js — attaches to a canvas element.
//  Returns { destroy, setScroll, onSceneChange }
// ─────────────────────────────────────────────

export function createHarbourEngine(canvas, onSceneChange) {
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  const isMobile = window.innerWidth < 768;

  // ── Renderer ─────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setSize(W, H, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setClearColor(0x010409, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // ── Scene & Camera ───────────────────────────
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
  camera.position.set(0, 0, 6);

  // ── Subsystems ───────────────────────────────
  const particles = createParticleWorld(scene, isMobile);
  const camCtrl   = createCameraController(camera);
  const world     = buildWorld(scene);

  // ── State ─────────────────────────────────────
  let scroll    = 0;
  let mouseNDC  = { x: 0, y: 0 };
  let clock     = new THREE.Clock();
  let lastScene = -1;
  let rafId     = null;
  let destroyed = false;

  // ── Resize handler ───────────────────────────
  function onResize() {
    if (destroyed) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', onResize, { passive: true });

  // ── Render loop ───────────────────────────────
  function render() {
    if (destroyed) return;
    rafId = requestAnimationFrame(render);

    const dt   = Math.min(clock.getDelta(), 0.05);
    const time = clock.getElapsedTime();

    camCtrl.update(scroll, mouseNDC, dt);
    particles.update(time, scroll, mouseNDC);
    world.update(time, scroll, mouseNDC);

    const si = getSceneIndex(scroll);
    if (si !== lastScene) {
      lastScene = si;
      onSceneChange?.(si);
    }

    renderer.render(scene, camera);
  }
  render();

  return {
    setScroll(v)   { scroll = Math.max(0, Math.min(1, v)); },
    setMouse(x, y) { mouseNDC.x = x; mouseNDC.y = y; },
    triggerShockwave(ndcX, ndcY) {
      particles.triggerShockwave(ndcX, ndcY);
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(rafId);
      renderer.dispose();
      window.removeEventListener('resize', onResize);
    }
  };
}

