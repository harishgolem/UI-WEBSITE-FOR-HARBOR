import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LiquidGlassShader } from '../shaders/liquidGlass';

export default function SingularitySeed({ progress, mousePos, active }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const particlesRef = useRef();

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#38bdf8') },
        uColorB: { value: new THREE.Color('#0369a1') },
        uColorC: { value: new THREE.Color('#fbbf24') },
        uFresnelPower: { value: 2.2 },
        uDistortion: { value: 0.3 },
        uOpacity: { value: 0.9 },
        uMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: LiquidGlassShader.vertexShader,
      fragmentShader: LiquidGlassShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }, []);

  const particleCount = 180;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 0.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    shaderMaterial.uniforms.uTime.value = time;
    shaderMaterial.uniforms.uMouse.value.set(mousePos.x, mousePos.y);

    meshRef.current.visible = active;
    if (!active) return;

    meshRef.current.rotation.x = time * 0.15 + mousePos.y * 0.15;
    meshRef.current.rotation.y = time * 0.25 + mousePos.x * 0.15;

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.4 * (1 + Math.sin(time * 2.5) * 0.05));
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Singularity Liquid Seed */}
      <mesh ref={meshRef} material={shaderMaterial}>
        <icosahedronGeometry args={[0.85, 32]} />
      </mesh>

      {/* Volumetric Core Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ambient Void Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#7dd3fc"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
