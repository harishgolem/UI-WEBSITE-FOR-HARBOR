import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function SceneFinalConvergence({ active, mousePos }) {
  const groupRef = useRef();
  const outerTorusRef = useRef();
  const innerDiamondRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.visible = active;
    if (!active) return;

    if (outerTorusRef.current) {
      outerTorusRef.current.rotation.z = time * 0.2;
      outerTorusRef.current.rotation.y = Math.sin(time * 0.15) * 0.1;
    }
    if (innerDiamondRef.current) {
      innerDiamondRef.current.rotation.y = -time * 0.3;
      innerDiamondRef.current.rotation.x = time * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
        {/* Monolithic Outer Glass Ring */}
        <mesh ref={outerTorusRef}>
          <torusGeometry args={[2.8, 0.12, 24, 80]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1.0}
            roughness={0.08}
            metalness={0.9}
            transmission={0.7}
            thickness={1.0}
          />
        </mesh>

        {/* Central Floating Diamond */}
        <mesh ref={innerDiamondRef}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial
            color="#ffffff"
            emissive="#38bdf8"
            emissiveIntensity={0.8}
            roughness={0.05}
            metalness={0.4}
            transmission={0.85}
            ior={1.5}
            thickness={1.2}
          />
        </mesh>

        {/* Subtle Gold Accented Anchor Ring */}
        <mesh>
          <torusGeometry args={[1.9, 0.02, 16, 60]} />
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
