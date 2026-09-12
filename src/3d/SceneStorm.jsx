import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ParticleStreamShader } from '../shaders/particleStream';

export default function SceneStorm({ progress, isMobile, active }) {
  const pointsRef = useRef();
  const count = isMobile ? 3000 : 7000;

  const { positions, randoms, speeds, offsets, streamIds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    const spd = new Float32Array(count);
    const off = new Float32Array(count * 3);
    const str = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const streamType = i % 10 < 7 ? 0 : i % 10 < 9 ? 1 : 2;
      str[i] = streamType;

      const angle = (i % 6) * (Math.PI / 3) + (Math.random() - 0.5) * 0.4;
      const radius = streamType === 2 ? 2.2 + Math.random() * 2.8 : 1.2 + Math.random() * 2.0;

      off[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.2;
      off[i * 3 + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.2;
      off[i * 3 + 2] = (Math.random() - 0.5) * 60.0;

      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;

      rand[i] = Math.random();
      spd[i] = streamType === 2 ? 1.2 + Math.random() * 0.6 : 0.8 + Math.random() * 0.4;
    }

    return {
      positions: pos,
      randoms: rand,
      speeds: spd,
      offsets: off,
      streamIds: str
    };
  }, [count]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uColorSafe: { value: new THREE.Color('#38bdf8') },
        uColorRisk: { value: new THREE.Color('#f43f5e') },
        uColorGold: { value: new THREE.Color('#fbbf24') },
        uTurbulence: { value: 1.0 },
        uFreeze: { value: 0.0 },
        uSize: { value: isMobile ? 2.5 : 3.8 }
      },
      vertexShader: ParticleStreamShader.vertexShader,
      fragmentShader: ParticleStreamShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, [isMobile]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    shaderMaterial.uniforms.uTime.value = time;
    shaderMaterial.uniforms.uProgress.value = progress;

    pointsRef.current.visible = active;
    if (!active) return;

    // Freeze particles when entering Scene 4 (progress 0.44 to 0.55)
    if (progress >= 0.44 && progress <= 0.55) {
      shaderMaterial.uniforms.uFreeze.value = 1.0;
    } else {
      shaderMaterial.uniforms.uFreeze.value = 0.0;
    }
  });

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aOffset" count={count} array={offsets} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={count} array={randoms} itemSize={1} />
        <bufferAttribute attach="attributes-aSpeed" count={count} array={speeds} itemSize={1} />
        <bufferAttribute attach="attributes-aStreamId" count={count} array={streamIds} itemSize={1} />
      </bufferGeometry>
    </points>
  );
}
