import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneVoiceWaveform({ active }) {
  const groupRef = useRef();
  const lineRef = useRef();
  const lineCount = 140;

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < lineCount; i++) {
      const x = (i / lineCount - 0.5) * 6.5;
      pts.push(new THREE.Vector3(x, 0, 0));
    }
    return pts;
  }, [lineCount]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.visible = active;
    if (!active) return;

    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array;
      for (let i = 0; i < lineCount; i++) {
        const x = (i / lineCount - 0.5) * 6.5;
        const envelope = Math.sin((i / lineCount) * Math.PI);
        const wave = Math.sin(x * 2.5 + time * 5.0) * Math.cos(x * 1.8 - time * 3.5) * 0.7;
        positions[i * 3 + 1] = wave * envelope;
        positions[i * 3 + 2] = Math.cos(x * 3.0 + time * 2.5) * 0.2 * envelope;
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#38bdf8" linewidth={2} transparent opacity={0.85} />
      </line>
    </group>
  );
}
