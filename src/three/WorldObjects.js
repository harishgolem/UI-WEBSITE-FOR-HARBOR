import * as THREE from 'three';

// ─────────────────────────────────────────────
//  CURSOR-REACTIVE 3D WORLDS & OBJECTS
//  Every scene features magnetic cursor tracking,
//  dynamic specular highlights, and real-time physical animations.
// ─────────────────────────────────────────────

function lerp(a, b, t) { return a + (b - a) * t; }

// ── Singularity Seed (Scene 0) ──────────────
function buildSingularity(scene) {
  const group = new THREE.Group();

  // Liquid glass core
  const geo = new THREE.IcosahedronGeometry(0.95, 5);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    emissive: 0x0369a1,
    emissiveIntensity: 0.8,
    roughness: 0.04,
    metalness: 0.2,
    transmission: 0.92,
    ior: 1.5,
    thickness: 1.4,
  });
  const core = new THREE.Mesh(geo, mat);
  group.add(core);

  // Orbiting rings
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.65, 0.022, 16, 90),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 1.4, metalness: 0.9 })
  );
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.0, 0.015, 16, 90),
    new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706, emissiveIntensity: 0.9, metalness: 0.8 })
  );
  group.add(ring1, ring2);

  // Inner pulsing glow core
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.72, 28, 28),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending })
  );
  group.add(glow);

  scene.add(group);

  return {
    group,
    update(time, scroll, mouseNDC) {
      const v = Math.max(0, 1 - scroll * 11);
      group.visible = v > 0.01;
      if (!group.visible) return;

      // Magnetic tilt towards cursor
      group.rotation.x = time * 0.15 + (mouseNDC.y * 0.4);
      group.rotation.y = time * 0.25 + (mouseNDC.x * 0.5);

      ring1.rotation.x = time * 0.6 + mouseNDC.y * 0.3;
      ring1.rotation.z = time * 0.4;
      ring2.rotation.y = -time * 0.45;
      ring2.rotation.z = time * 0.35 + mouseNDC.x * 0.3;

      const pulse = 1.0 + Math.sin(time * 3.5) * 0.06;
      core.scale.setScalar(pulse);

      // Full size (1.0) at scroll 0, gracefully dissolves as user scrolls into the storm
      const s = Math.max(0.001, (1.0 - scroll * 8.0)) * pulse;
      group.scale.setScalar(s);
    }
  };
}

// ── Transaction Core (Scenes 2–3) ──────────
function buildTransaction(scene) {
  const group = new THREE.Group();

  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.05, 0),
    new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.0,
      roughness: 0.03,
      metalness: 0.95,
      transmission: 0.88,
      ior: 1.6,
      thickness: 1.3,
    })
  );
  group.add(core);

  // Geometric wire cage
  const cage = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.42, 0),
    new THREE.MeshBasicMaterial({ color: 0x7dd3fc, wireframe: true, transparent: true, opacity: 0.45 })
  );
  group.add(cage);

  // Golden gyro orbit rings
  const r1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.1, 0.02, 16, 90),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 1.1 })
  );
  const r2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.016, 16, 90),
    new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706, emissiveIntensity: 0.85 })
  );
  group.add(r1, r2);

  scene.add(group);

  return {
    group,
    update(time, scroll, mouseNDC) {
      const show = scroll > 0.09 && scroll < 0.56;
      group.visible = show;
      if (!show) return;

      // Anomaly vibration during risk phase
      const instability = scroll > 0.26 ? Math.sin(time * 16.0) * 0.06 : 0;
      group.position.x = instability + (mouseNDC.x * 0.35);
      group.position.y = (instability * 0.6) + (mouseNDC.y * 0.35);

      core.rotation.y = time * 0.4 + mouseNDC.x * 0.6;
      core.rotation.x = Math.sin(time * 0.5) * 0.15 - mouseNDC.y * 0.5;
      cage.rotation.y = -time * 0.25;
      r1.rotation.x = time * 0.5 + mouseNDC.y * 0.4;
      r1.rotation.y = time * 0.3;
      r2.rotation.z = time * 0.45;
      r2.rotation.x = -time * 0.25 + mouseNDC.x * 0.4;
    }
  };
}

// ── Risk Scanner (Scene 3) ──────────────────
function buildRiskScanner(scene) {
  const group = new THREE.Group();

  const bigRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.3, 0.04, 16, 100),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.4, roughness: 0.1, metalness: 0.9 })
  );
  group.add(bigRing);

  const crimsonRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.65, 0.055, 16, 90),
    new THREE.MeshPhysicalMaterial({ color: 0xf43f5e, emissive: 0xe11d48, emissiveIntensity: 1.5, roughness: 0.08, transmission: 0.65 })
  );
  group.add(crimsonRing);

  // Laser targeting cone
  const laserMat = new THREE.MeshBasicMaterial({
    color: 0xf43f5e, transparent: true, opacity: 0.24, side: THREE.DoubleSide, blending: THREE.AdditiveBlending
  });
  const laser = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 3.2, 4.5, 32, 1, true), laserMat);
  laser.rotation.x = Math.PI / 2;
  group.add(laser);

  scene.add(group);

  return {
    group,
    update(time, scroll, mouseNDC) {
      const show = scroll > 0.21 && scroll < 0.47;
      group.visible = show;
      if (!show) return;

      // Laser actively tracks the mouse cursor!
      const targetAngleX = -mouseNDC.y * 0.6;
      const targetAngleY = mouseNDC.x * 0.7;

      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetAngleX, 0.08);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetAngleY, 0.08);

      bigRing.rotation.z = time * 0.4;
      crimsonRing.rotation.z = -time * 0.75;
      laser.rotation.z = time * 1.6;

      // Pulse opacity with alarm rhythm
      laserMat.opacity = 0.18 + Math.sin(time * 8.0) * 0.12;
    }
  };
}

// ── Protective Bubble (Scene 4) ─────────────
function buildProtectiveBubble(scene) {
  const group = new THREE.Group();

  const bubble = new THREE.Mesh(
    new THREE.SphereGeometry(2.4, 64, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.03,
      metalness: 0.15,
      transmission: 0.94,
      ior: 1.45,
      thickness: 1.3,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide,
    })
  );
  group.add(bubble);

  const equator1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.65, 0.016, 16, 100),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x7dd3fc, emissiveIntensity: 1.2 })
  );
  const equator2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, 0.01, 16, 100),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.9 })
  );
  group.add(equator1, equator2);

  scene.add(group);

  return {
    group,
    update(time, scroll, mouseNDC) {
      const show = scroll > 0.35 && scroll < 0.56;
      group.visible = show;
      if (!show) return;

      // Refract and deform slightly toward cursor
      group.position.x = mouseNDC.x * 0.45;
      group.position.y = mouseNDC.y * 0.35;

      bubble.rotation.y = time * 0.12;
      bubble.rotation.x = Math.sin(time * 0.3) * 0.1;
      equator1.rotation.z = time * 0.22;
      equator2.rotation.y = -time * 0.18;
    }
  };
}

// ── Harbour Architecture (Scene 5–9) ────────
function buildHarbour(scene) {
  const group = new THREE.Group();

  const matOuter = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7, emissive: 0x0369a1, emissiveIntensity: 0.5,
    roughness: 0.06, metalness: 0.85, transmission: 0.88, thickness: 1.4, transparent: true, opacity: 0.88
  });
  const matMid = new THREE.MeshStandardMaterial({
    color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 1.1, roughness: 0.18, metalness: 0.9
  });
  const matInner = new THREE.MeshStandardMaterial({
    color: 0xffffff, emissive: 0x7dd3fc, emissiveIntensity: 1.3
  });

  const r1 = new THREE.Mesh(new THREE.TorusGeometry(4.7, 0.16, 32, 100), matOuter);
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.09, 24, 80), matMid);
  const r3 = new THREE.Mesh(new THREE.TorusGeometry(2.95, 0.035, 16, 70), matInner);
  group.add(r1, r2, r3);

  // Protective vault ribs
  const ribMat = new THREE.MeshPhysicalMaterial({ color: 0x0f172a, emissive: 0x38bdf8, emissiveIntensity: 0.4, metalness: 0.9, transmission: 0.6 });
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.1, 1.9, 16), ribMat);
    rib.position.set(Math.cos(a) * 4.0, Math.sin(a) * 4.0, 0);
    rib.rotation.z = a + Math.PI / 2;
    group.add(rib);
  }

  // Volumetric inner aura
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(3.1, 48, 48),
    new THREE.MeshStandardMaterial({ color: 0x0369a1, emissive: 0x0284c7, emissiveIntensity: 0.28, transparent: true, opacity: 0.15, side: THREE.BackSide })
  );
  group.add(aura);

  scene.add(group);
  group.visible = false;

  return {
    group,
    update(time, scroll, mouseNDC) {
      const show = scroll > 0.42;
      group.visible = show;
      if (!show) return;

      // Majestic gyro rotation + cursor banking
      group.rotation.x = Math.sin(time * 0.1) * 0.08 - (mouseNDC.y * 0.25);
      group.rotation.y = (mouseNDC.x * 0.35);

      r1.rotation.z = time * 0.12;
      r2.rotation.z = -time * 0.18;
      r3.rotation.y = time * 0.15;
    }
  };
}

// ── Voice Waveform (Scene 6) ─────────────────
function buildVoiceWaveform(scene) {
  const COUNT = 160;
  const pts = [];
  for (let i = 0; i < COUNT; i++) {
    pts.push(new THREE.Vector3((i / COUNT - 0.5) * 7.0, 0, 0));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.95 });
  const line = new THREE.Line(geo, mat);
  scene.add(line);

  return {
    line,
    update(time, scroll, mouseNDC) {
      const show = scroll > 0.60 && scroll < 0.77;
      line.visible = show;
      if (!show) return;

      const pos = line.geometry.attributes.position.array;
      // Mouse proximity amplifies the voice waveform!
      const mouseAmp = 1.0 + Math.abs(mouseNDC.x) * 1.5;

      for (let i = 0; i < COUNT; i++) {
        const x = (i / COUNT - 0.5) * 7.0;
        const env = Math.sin((i / COUNT) * Math.PI);
        pos[i * 3 + 1] = Math.sin(x * 2.8 + time * 6.0) * Math.cos(x * 2.0 - time * 4.0) * 0.85 * env * mouseAmp;
        pos[i * 3 + 2] = Math.cos(x * 3.2 + time * 3.0) * 0.3 * env;
      }
      line.geometry.attributes.position.needsUpdate = true;
    }
  };
}

// ── Protection Barrier (Scene 7) ─────────────
function buildBarrier(scene) {
  const group = new THREE.Group();
  const r1 = new THREE.Mesh(new THREE.RingGeometry(2.2, 2.34, 64), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75, side: THREE.DoubleSide }));
  const r2 = new THREE.Mesh(new THREE.RingGeometry(2.9, 3.02, 64), new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
  const fill = new THREE.Mesh(new THREE.CircleGeometry(2.15, 48), new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.1, side: THREE.DoubleSide }));
  group.add(r1, r2, fill);
  scene.add(group);
  group.visible = false;

  return {
    group,
    update(time, scroll, mouseNDC) {
      const show = scroll > 0.70 && scroll < 0.83;
      group.visible = show;
      if (!show) return;

      group.position.x = mouseNDC.x * 0.3;
      group.position.y = mouseNDC.y * 0.25;

      r1.rotation.z = time * 0.15;
      r2.rotation.z = -time * 0.22;
    }
  };
}

// ── Trusted Contact Nodes (Scene 8) ──────────
function buildTrustedNodes(scene) {
  const group = new THREE.Group();

  const matA = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.2, roughness: 0.08 });
  const matB = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706, emissiveIntensity: 1.0, roughness: 0.08 });

  const nA = new THREE.Group();
  nA.add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), matA));
  nA.add(new THREE.Mesh(new THREE.RingGeometry(0.65, 0.72, 32), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6, side: THREE.DoubleSide })));
  nA.position.x = -2.5;

  const nB = new THREE.Group();
  nB.add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), matB));
  nB.add(new THREE.Mesh(new THREE.RingGeometry(0.65, 0.72, 32), new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6, side: THREE.DoubleSide })));
  nB.position.x = 2.5;

  const tetherMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.8 });
  const tether = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 5.0, 16), tetherMat);
  tether.rotation.z = Math.PI / 2;

  group.add(nA, nB, tether);
  scene.add(group);
  group.visible = false;

  return {
    group,
    update(time, scroll, mouseNDC) {
      const show = scroll > 0.76 && scroll < 0.92;
      group.visible = show;
      if (!show) return;

      group.rotation.y = time * 0.15 + (mouseNDC.x * 0.4);
      group.rotation.x = mouseNDC.y * 0.3;

      nA.children[0].rotation.y = time * 0.5;
      nB.children[0].rotation.y = -time * 0.5;
      tether.material.opacity = 0.45 + Math.sin(time * 8.0) * 0.35;
    }
  };
}

// ── Final Convergence Symbol (Scene 9) ───────
function buildFinalSymbol(scene) {
  const group = new THREE.Group();

  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.9, 0.13, 24, 80),
    new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.2, roughness: 0.06, metalness: 0.92, transmission: 0.75 })
  );
  const diamond = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.3, 0),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0x38bdf8, emissiveIntensity: 0.95, roughness: 0.03, metalness: 0.3, transmission: 0.9, ior: 1.55, thickness: 1.4 })
  );
  const goldRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.0, 0.025, 16, 70),
    new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706, emissiveIntensity: 0.8, roughness: 0.15, metalness: 0.85 })
  );
  const halo = new THREE.Mesh(
    new THREE.CircleGeometry(3.8, 48),
    new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.15, side: THREE.DoubleSide })
  );

  group.add(outerRing, diamond, goldRing, halo);
  scene.add(group);
  group.visible = false;

  return {
    group,
    update(time, scroll, mouseNDC) {
      const show = scroll > 0.87;
      group.visible = show;
      if (!show) return;

      group.rotation.x = -mouseNDC.y * 0.35;
      group.rotation.y = mouseNDC.x * 0.45;

      outerRing.rotation.z = time * 0.25;
      goldRing.rotation.y = -time * 0.35;
      diamond.rotation.y = time * 0.4;
      diamond.rotation.x = Math.sin(time * 0.3) * 0.2;
    }
  };
}

// ── Interactive Dynamic Cursor Lighting ────────
function buildLighting(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  
  const key = new THREE.DirectionalLight(0xffffff, 1.8);
  key.position.set(6, 8, 6);
  scene.add(key);

  const fill = new THREE.PointLight(0x0284c7, 2.2, 35);
  fill.position.set(-6, -4, -2);
  scene.add(fill);

  const accent = new THREE.PointLight(0xfbbf24, 1.2, 28);
  accent.position.set(4, -6, 2);
  scene.add(accent);

  // DYNAMIC CURSOR LIGHT: Glides with the cursor in 3D world space!
  const cursorLight = new THREE.PointLight(0x38bdf8, 3.0, 18);
  cursorLight.position.set(0, 0, 3.5);
  scene.add(cursorLight);

  return { fill, accent, cursorLight };
}

// ── Atmospheric Reactive Nebula Plane ──────────
function buildAtmosphere(scene) {
  const bgMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime:   { value: 0 },
      uScroll: { value: 0 },
      uMouse:  { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uScroll;
      uniform vec2  uMouse;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv - 0.5;
        float dist = length(uv);
        
        // Deep cyber colors
        vec3 deep = vec3(0.005, 0.02, 0.06);
        vec3 cyan = vec3(0.015, 0.08, 0.16);
        vec3 violet = vec3(0.06, 0.015, 0.14);
        
        float mask = 1.0 - smoothstep(0.0, 0.65, dist);
        vec3 col = mix(deep, mix(cyan, violet, sin(uScroll * 3.14159) * 0.5 + 0.5), mask * 0.5);
        
        // Interactive cursor spotlight in background
        vec2 m = uMouse * 0.35;
        float mouseDist = length(uv - m);
        float mouseSpot = 1.0 - smoothstep(0.0, 0.45, mouseDist);
        col += vec3(0.02, 0.12, 0.28) * mouseSpot * 0.85;

        // Subtle temporal pulse
        float pulse = (sin(uTime * 0.8) * 0.5 + 0.5) * 0.07;
        col += vec3(0.01, 0.05, 0.12) * mask * pulse;
        
        gl_FragColor = vec4(col, mask * 0.6 + mouseSpot * 0.3);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
  });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), bgMat);
  plane.position.z = -10;
  scene.add(plane);

  return {
    material: bgMat,
    update(time, scroll, mouseNDC) {
      bgMat.uniforms.uTime.value = time;
      bgMat.uniforms.uScroll.value = scroll;
      bgMat.uniforms.uMouse.value.set(mouseNDC.x, mouseNDC.y);
    }
  };
}

// ─────────────────────────────────────────────
//  MASTER WORLD BUILDER
// ─────────────────────────────────────────────
export function buildWorld(scene) {
  const lights   = buildLighting(scene);
  const atmos    = buildAtmosphere(scene);
  const seed     = buildSingularity(scene);
  const txn      = buildTransaction(scene);
  const scanner  = buildRiskScanner(scene);
  const bubble   = buildProtectiveBubble(scene);
  const harbour  = buildHarbour(scene);
  const waveform = buildVoiceWaveform(scene);
  const barrier  = buildBarrier(scene);
  const nodes    = buildTrustedNodes(scene);
  const symbol   = buildFinalSymbol(scene);

  return {
    update(time, scroll, mouseNDC) {
      // Move dynamic cursor light
      lights.cursorLight.position.set(mouseNDC.x * 6.0, mouseNDC.y * 4.5, 3.2);

      atmos.update(time, scroll, mouseNDC);
      seed.update(time, scroll, mouseNDC);
      txn.update(time, scroll, mouseNDC);
      scanner.update(time, scroll, mouseNDC);
      bubble.update(time, scroll, mouseNDC);
      harbour.update(time, scroll, mouseNDC);
      waveform.update(time, scroll, mouseNDC);
      barrier.update(time, scroll, mouseNDC);
      nodes.update(time, scroll, mouseNDC);
      symbol.update(time, scroll, mouseNDC);
    }
  };
}

