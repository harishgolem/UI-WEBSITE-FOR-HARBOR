import * as THREE from 'three';

export const ScannerLaserShader = {
  uniforms: {
    uTime: { value: 0 },
    uScanProgress: { value: 0 },
    uColor: { value: new THREE.Color('#38bdf8') },
    uAlertColor: { value: new THREE.Color('#f43f5e') },
    uAlertLevel: { value: 0.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uScanProgress;
    uniform vec3 uColor;
    uniform vec3 uAlertColor;
    uniform float uAlertLevel;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // Cylindrical or plane sweeping laser bar
      float sweep = sin(vUv.y * 20.0 - uTime * 6.0) * 0.5 + 0.5;
      float scanLine = smoothstep(0.48, 0.52, sin(vUv.y * 30.0 - uTime * 4.0));
      
      // Radial ring pulse
      float ring = smoothstep(0.05, 0.0, abs(fract(vUv.x * 4.0 - uTime * 0.5) - 0.5));
      
      vec3 finalCol = mix(uColor, uAlertColor, uAlertLevel);
      float alpha = (sweep * 0.3 + scanLine * 0.5 + ring * 0.4) * (1.0 - abs(vUv.y - 0.5) * 1.5);
      
      gl_FragColor = vec4(finalCol, clamp(alpha, 0.0, 0.85));
    }
  `
};

export const BarrierShader = {
  uniforms: {
    uTime: { value: 0 },
    uOpenProgress: { value: 0 }, // 0 = closed/protecting, 1 = opened/safe
    uColorShield: { value: new THREE.Color('#38bdf8') },
    uColorWarning: { value: new THREE.Color('#f59e0b') },
    uIsSafe: { value: 1.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    uniform float uTime;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec3 pos = position;
      
      // Hexagonal honeycomb ripple
      pos.z += sin(pos.x * 4.0 + uTime * 2.0) * 0.05 * cos(pos.y * 4.0 + uTime * 2.0);
      
      vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uOpenProgress;
    uniform vec3 uColorShield;
    uniform vec3 uColorWarning;
    uniform float uIsSafe;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      // Hexagonal grid computation in fragment
      vec2 p = vUv * 16.0;
      vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p);
      float line = min(grid.x, grid.y);
      float hexPattern = 1.0 - min(line, 1.0);

      // Pulse waves across the barrier
      float wave = sin(length(vUv - vec2(0.5)) * 18.0 - uTime * 3.0) * 0.5 + 0.5;

      vec3 col = mix(uColorWarning, uColorShield, uIsSafe);
      float alpha = (hexPattern * 0.35 + wave * 0.25) * (1.0 - uOpenProgress * 0.9);

      gl_FragColor = vec4(col, alpha);
    }
  `
};
