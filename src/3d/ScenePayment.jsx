import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function ScenePayment({ progress, mousePos, active }) {
  const groupRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.visible = active;
    if (!active) return;

    // Smooth subtle mouse interaction
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mousePos.x * 0.3, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mousePos.y * 0.3, 0.05);

    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.4;
      ringRef1.current.rotation.y = time * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = time * 0.35;
      ringRef2.current.rotation.x = -time * 0.25;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.25;
      coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Holographic Crystalline Core */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.8}
            roughness={0.05}
            metalness={0.9}
            transmission={0.85}
            ior={1.5}
            thickness={1.2}
          />
        </mesh>

        {/* Outer Fine Glass Orbit Ring */}
        <mesh ref={ringRef1}>
          <torusGeometry args={[2.0, 0.02, 16, 80]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.0}
            roughness={0.1}
          />
        </mesh>

        {/* Inner Gold Accented Gyro Ring */}
        <mesh ref={ringRef2}>
          <torusGeometry args={[2.3, 0.015, 16, 80]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d97706"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}
