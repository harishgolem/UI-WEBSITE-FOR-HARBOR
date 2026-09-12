import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneTrustedContact({ active }) {
  const groupRef = useRef();
  const node1 = useRef();
  const node2 = useRef();
  const tether = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.visible = active;
    if (!active) return;

    if (node1.current) node1.current.rotation.y = time * 0.4;
    if (node2.current) node2.current.rotation.y = -time * 0.4;
    if (tether.current) {
      tether.current.material.opacity = 0.4 + Math.sin(time * 6.0) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Node 1: User / Customer Node */}
      <group ref={node1} position={[-2.2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1.0}
            roughness={0.1}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[0.6, 0.65, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Node 2: Trusted Contact Node */}
      <group ref={node2} position={[2.2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d97706"
            emissiveIntensity={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[0.6, 0.65, 32]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Travelling Laser Link */}
      <mesh ref={tether} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 4.4, 16]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
