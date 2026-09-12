import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneHarbourStructure({ active }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.visible = active;
    if (!active) return;

    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.1;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.15;
    if (ring3Ref.current) ring3Ref.current.rotation.y = time * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Grand Glass Canopy */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[4.5, 0.15, 32, 100]} />
        <meshPhysicalMaterial
          color="#0284c7"
          emissive="#0369a1"
          emissiveIntensity={0.4}
          roughness={0.08}
          metalness={0.8}
          transmission={0.85}
          thickness={1.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Floating Concentric Sanctuary Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.6, 0.08, 24, 80]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Pure White Gyro Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.8, 0.03, 16, 70]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#7dd3fc"
          emissiveIntensity={1.0}
        />
      </mesh>

      {/* Protective Radial Ribs */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * Math.PI) / 3;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 3.8, Math.sin(angle) * 3.8, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <cylinderGeometry args={[0.03, 0.08, 1.6, 16]} />
            <meshPhysicalMaterial
              color="#0f172a"
              emissive="#38bdf8"
              emissiveIntensity={0.3}
              metalness={0.9}
              transmission={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}
