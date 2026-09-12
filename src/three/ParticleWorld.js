import * as THREE from 'three';

// ─────────────────────────────────────────────
//  ADVANCED INTERACTIVE GPU PARTICLE WORLD
//  Dynamic multi-layer particle system with cursor vortex,
//  shockwaves, velocity warp, and scene-specific quantum physics.
// ─────────────────────────────────────────────

const VERT = `
uniform float uTime;
uniform float uScroll;     // 0 → 1
uniform vec2  uMouse;      // NDC [-1, 1]
uniform vec3  uShockwave;  // (x, y, radius)
attribute float aRandom;
attribute float aSpeed;
attribute vec3  aBase;
attribute float aStream;   // 0=stream, 1=high-value, 2=risk, 3=ambient dust
varying float vBrightness;
varying float vStream;
varying float vAlpha;
varying float vDistToMouse;

//── Simplex noise ───────────────────────────
vec3 mod289(vec3 x){return x-floor(x/289.)*289.;}
vec4 mod289(vec4 x){return x-floor(x/289.)*289.;}
vec4 permute(vec4 x){return mod289((34.*x+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.7928-0.8537*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g,l.zxy);
  vec3 i2=max(g,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-.5;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))
    +i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  vec3 ns=.142857*C.wyz-C.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vStream = aStream;
  float t = uTime * aSpeed * 0.22 + aRandom * 40.0;

  // Warp speed during Scene 1 (Digital Storm, scroll 0.08 -> 0.22)
  float stormSpeed = smoothstep(0.06, 0.14, uScroll) * (1.0 - smoothstep(0.20, 0.28, uScroll));
  float zSpeed = 16.0 + stormSpeed * 42.0;

  // Base stream flow along Z
  vec3 pos = aBase;
  float zWrap = mod(pos.z - t * zSpeed, 100.0) - 50.0;
  pos.z = zWrap;

  // Turbulence increases during digital storm and risk scan
  float turbScale = 0.8 + sin(uScroll * 3.14159) * 2.8 + stormSpeed * 2.5;
  float nx = snoise(vec3(pos.x * 0.25, pos.y * 0.25, t * 0.35));
  float ny = snoise(vec3(pos.y * 0.25 + 12.0, pos.z * 0.18, t * 0.3));
  pos.x += nx * turbScale * (aStream > 1.5 ? 2.2 : 1.0);
  pos.y += ny * turbScale * (aStream > 1.5 ? 2.2 : 1.0);

  // Dynamic Cursor Vortex & Magnetic Interaction
  vec2 mouseWorld = uMouse * vec2(8.5, 6.0);
  vec2 toMouse = pos.xy - mouseWorld;
  float dist = length(toMouse) + 0.001;
  vDistToMouse = dist;

  // Proximity envelope (within 4.5 world units)
  float mouseProximity = smoothstep(4.5, 0.2, dist);
  
  // Radial repulsion
  vec2 dir = normalize(toMouse);
  pos.xy += dir * mouseProximity * 2.4;

  // Tangential vortex swirl around cursor
  vec2 tangent = vec2(-dir.y, dir.x);
  float swirlDir = (aRandom > 0.5 ? 1.0 : -1.0);
  pos.xy += tangent * mouseProximity * (1.8 + sin(uTime * 3.0 + aRandom * 6.28) * 0.7) * swirlDir;

  // Shockwave ring deflection
  if (uShockwave.z > 0.0) {
    float waveDist = length(pos.xy - uShockwave.xy);
    float waveRing = 1.0 - smoothstep(0.0, 1.2, abs(waveDist - uShockwave.z));
    pos.xy += normalize(pos.xy - uShockwave.xy + 0.001) * waveRing * 2.5;
  }

  // Freeze effect during Scene 4 (Pause moment, scroll ~0.44 - 0.54)
  float freeze = smoothstep(0.42, 0.47, uScroll) * (1.0 - smoothstep(0.53, 0.58, uScroll));
  pos.xy = mix(pos.xy, aBase.xy * 0.8, freeze * 0.85);
  pos.z  = mix(pos.z,  aBase.z,  freeze * 0.85);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float depth = -mvPos.z;
  
  // Point sizing with velocity stretch during storm
  float baseSize = mix(2.5, 6.5, aRandom);
  if (aStream > 2.5) baseSize = mix(1.2, 3.0, aRandom); // ambient stardust
  
  gl_PointSize = baseSize * (180.0 / max(depth, 0.6)) * (1.0 + stormSpeed * 0.6 + mouseProximity * 0.8);
  gl_PointSize = clamp(gl_PointSize, 0.8, 12.0);

  // Alpha fade at boundaries + brightness boost near cursor
  vAlpha = smoothstep(50.0, 25.0, abs(pos.z))
         * smoothstep(0.0, 5.0, abs(pos.z))
         * mix(0.85, 1.3, freeze);

  vBrightness = 0.75 + freeze * 0.6 + mouseProximity * 0.8;
}
`;

const FRAG = `
varying float vStream;
varying float vBrightness;
varying float vAlpha;
varying float vDistToMouse;
uniform float uScroll;

void main(){
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if(r > 0.5) discard;
  
  // Smooth circular glow falloff
  float soft = pow(1.0 - r * 2.0, 2.0);

  vec3 col;
  if(vStream > 2.5) {
    // Ambient Stardust: deep cold sapphire to silver
    col = mix(vec3(0.35, 0.65, 0.95), vec3(0.8, 0.9, 1.0), soft);
  } else if(vStream > 1.5) {
    // Risk Stream: fiery coral & electric amber
    col = mix(vec3(0.98, 0.22, 0.38), vec3(1.0, 0.55, 0.1), soft);
  } else if(vStream > 0.5) {
    // High-Value Stream: electric cyan to golden sunlight
    col = mix(vec3(0.22, 0.85, 1.0), vec3(0.98, 0.82, 0.2), 0.45);
  } else {
    // Normal Transaction: pure Harbour cyan
    col = mix(vec3(0.18, 0.74, 0.98), vec3(0.6, 0.95, 1.0), soft * 0.5);
  }

  // Energize color when cursor gets very close
  if(vDistToMouse < 2.5) {
    col = mix(col, vec3(1.0, 1.0, 1.0), (1.0 - vDistToMouse / 2.5) * 0.45);
  }

  gl_FragColor = vec4(col * vBrightness, soft * vAlpha * 0.94);
}
`;

export function createParticleWorld(scene, isMobile) {
  const COUNT = isMobile ? 5500 : 14000;
  const geo = new THREE.BufferGeometry();

  const pos    = new Float32Array(COUNT * 3);
  const base   = new Float32Array(COUNT * 3);
  const rand   = new Float32Array(COUNT);
  const speed  = new Float32Array(COUNT);
  const stream = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    // Streams: 0=cyan regular, 1=gold value, 2=rose risk, 3=ambient stardust
    let s = 0;
    const r = Math.random();
    if (r < 0.45) s = 0;
    else if (r < 0.65) s = 1;
    else if (r < 0.80) s = 2;
    else s = 3;

    stream[i] = s;

    let radius, angle;
    if (s === 3) {
      // Ambient stardust spreads wider
      radius = 4.0 + Math.random() * 8.0;
      angle = Math.random() * Math.PI * 2;
    } else if (s === 2) {
      // Risk streams weave erratically
      radius = 2.0 + Math.random() * 4.0;
      angle = (i % 6) * (Math.PI / 3) + (Math.random() - 0.5) * 1.2;
    } else {
      radius = 1.0 + Math.random() * 3.5;
      angle = (i % 8) * (Math.PI / 4) + (Math.random() - 0.5) * 0.8;
    }

    base[i * 3]     = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.2;
    base[i * 3 + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.2;
    base[i * 3 + 2] = (Math.random() - 0.5) * 100.0;

    pos[i * 3]     = base[i * 3];
    pos[i * 3 + 1] = base[i * 3 + 1];
    pos[i * 3 + 2] = base[i * 3 + 2];

    rand[i]  = Math.random();
    speed[i] = s === 2 ? 1.5 + Math.random() * 1.0 : (s === 3 ? 0.4 + Math.random() * 0.4 : 0.8 + Math.random() * 0.6);
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aBase',    new THREE.BufferAttribute(base, 3));
  geo.setAttribute('aRandom',  new THREE.BufferAttribute(rand, 1));
  geo.setAttribute('aSpeed',   new THREE.BufferAttribute(speed, 1));
  geo.setAttribute('aStream',  new THREE.BufferAttribute(stream, 1));

  let shockwave = { x: 0, y: 0, radius: -1 };

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime:      { value: 0 },
      uScroll:    { value: 0 },
      uMouse:     { value: new THREE.Vector2(0, 0) },
      uShockwave: { value: new THREE.Vector3(0, 0, -1) },
    },
    vertexShader:   VERT,
    fragmentShader: FRAG,
    transparent:    true,
    depthWrite:     false,
    blending:       THREE.AdditiveBlending,
  });

  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  return {
    points: pts,
    material: mat,
    triggerShockwave(ndcX, ndcY) {
      shockwave.x = ndcX * 8.0;
      shockwave.y = ndcY * 5.5;
      shockwave.radius = 0.1;
    },
    update(time, scroll, mouseNDC) {
      mat.uniforms.uTime.value   = time;
      mat.uniforms.uScroll.value = scroll;
      mat.uniforms.uMouse.value.set(mouseNDC.x, mouseNDC.y);

      // Expand shockwave if active
      if (shockwave.radius >= 0) {
        shockwave.radius += 0.35;
        if (shockwave.radius > 18.0) {
          shockwave.radius = -1;
        }
        mat.uniforms.uShockwave.value.set(shockwave.x, shockwave.y, shockwave.radius);
      }
    }
  };
}

