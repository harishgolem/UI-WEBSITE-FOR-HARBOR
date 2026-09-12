import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneProtectionBarrier({ active }) {
  const groupRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.visible = active;
    if (!active) return;

    if (ring1.current) ring1.current.rotation.z = time * 0.15;
    if (ring2.current) ring2.current.rotation.z = -time * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Gentle Concentric Safety Barrier Rings */}
      <mesh ref={ring1}>
        <ringGeometry args={[2.2, 2.3, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2}>
        <ringGeometry args={[2.8, 2.88, 64]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <circleGeometry args={[2.1, 48]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
