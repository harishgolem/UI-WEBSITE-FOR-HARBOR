import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ScenePauseMoment({ active }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const haloRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.visible = active;
    if (!active) return;

    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.1;
    }
    if (haloRef.current) {
      haloRef.current.rotation.z = time * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Iridescent Protective Bubble */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.5}
          roughness={0.05}
          metalness={0.1}
          transmission={0.92}
          ior={1.4}
          thickness={1.0}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Floating Equator Ring */}
      <mesh ref={haloRef}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#7dd3fc"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
