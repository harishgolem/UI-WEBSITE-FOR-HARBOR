import * as THREE from 'three';

export const ParticleStreamShader = {
  uniforms: {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uColorSafe: { value: new THREE.Color('#38bdf8') }, // Cyan
    uColorRisk: { value: new THREE.Color('#f43f5e') }, // Rose / Amber risk
    uColorGold: { value: new THREE.Color('#fbbf24') }, // Subtle Gold
    uTurbulence: { value: 1.0 },
    uFreeze: { value: 0.0 }, // 0 = moving, 1 = frozen
    uSize: { value: 3.5 }
  },
  vertexShader: `
    uniform float uTime;
    uniform float uProgress;
    uniform float uTurbulence;
    uniform float uFreeze;
    uniform float uSize;

    attribute float aRandom;
    attribute float aSpeed;
    attribute vec3 aOffset;
    attribute float aStreamId;

    varying vec3 vColor;
    varying float vAlpha;
    varying float vStreamId;

    void main() {
      vStreamId = aStreamId;
      
      float t = (uTime * aSpeed * 0.3 * (1.0 - uFreeze * 0.95)) + aRandom * 10.0;
      
      // Multi-lane bezier-like stream flow along Z axis with spiral curl
      vec3 pos = position + aOffset;
      
      // Flow along Z
      float zOffset = mod(pos.z - t * 12.0, 80.0) - 40.0;
      pos.z = zOffset;

      // Turbulence based on stream ID
      float wave = sin(pos.z * 0.1 + t + aRandom * 6.28) * (1.5 * uTurbulence);
      float waveCos = cos(pos.z * 0.08 + t * 0.8 + aRandom * 3.14) * (1.2 * uTurbulence);
      
      pos.x += wave;
      pos.y += waveCos;

      // Suspicious node clustering if streamId == 2 (Risk stream)
      if (aStreamId > 1.5) {
        float attract = sin(uTime * 1.5 + aRandom * 4.0) * 1.5;
        pos.x += attract * (1.0 - uFreeze);
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Size attenuation
      float dist = -mvPosition.z;
      gl_PointSize = (uSize + aRandom * 3.0) * (200.0 / max(dist, 1.0));
      
      // Fade out at far boundaries
      vAlpha = smoothstep(40.0, 20.0, abs(pos.z)) * smoothstep(0.0, 5.0, abs(pos.z));
    }
  `,
  fragmentShader: `
    uniform vec3 uColorSafe;
    uniform vec3 uColorRisk;
    uniform vec3 uColorGold;
    uniform float uFreeze;
    varying float vAlpha;
    varying float vStreamId;

    void main() {
      // Circular soft particle disc
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      float strength = pow(1.0 - dist * 2.0, 2.0);

      // Color selection per stream
      vec3 col = uColorSafe;
      if (vStreamId > 1.5) {
        col = mix(uColorSafe, uColorRisk, 0.85);
      } else if (vStreamId > 0.5 && vStreamId <= 1.5) {
        col = mix(uColorSafe, uColorGold, 0.4);
      }

      // If frozen in Scene 4, turn crystalline cyan/white
      if (uFreeze > 0.5) {
        col = mix(col, vec3(0.9, 0.98, 1.0), uFreeze * 0.6);
      }

      gl_FragColor = vec4(col, strength * vAlpha * 0.9);
    }
  `
};
