import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SingularitySeed from './SingularitySeed';
import SceneStorm from './SceneStorm';
import ScenePayment from './ScenePayment';
import SceneRiskScanner from './SceneRiskScanner';
import ScenePauseMoment from './ScenePauseMoment';
import SceneHarbourStructure from './SceneHarbourStructure';
import SceneVoiceWaveform from './SceneVoiceWaveform';
import SceneProtectionBarrier from './SceneProtectionBarrier';
import SceneTrustedContact from './SceneTrustedContact';
import SceneFinalConvergence from './SceneFinalConvergence';

export default function Experience({ progress, sceneIndex, mousePos, isMobile }) {
  const cameraGroupRef = useRef();

  useFrame((state) => {
    if (!cameraGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Controlled smooth cinematic camera trajectory
    const targetZ = THREE.MathUtils.lerp(5.2, 3.8, progress);
    const targetY = Math.sin(progress * Math.PI * 2) * 0.2;
    const targetX = Math.cos(progress * Math.PI * 2) * 0.15;

    cameraGroupRef.current.position.x = THREE.MathUtils.lerp(
      cameraGroupRef.current.position.x,
      targetX + mousePos.x * 0.25,
      0.04
    );
    cameraGroupRef.current.position.y = THREE.MathUtils.lerp(
      cameraGroupRef.current.position.y,
      targetY + mousePos.y * 0.25,
      0.04
    );
    cameraGroupRef.current.position.z = THREE.MathUtils.lerp(
      cameraGroupRef.current.position.z,
      targetZ,
      0.04
    );
  });

  return (
    <>
      {/* Cinematic Studio Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 8, 6]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-6, -4, -2]} intensity={1.8} color="#0284c7" />
      <pointLight position={[4, -6, 2]} intensity={1.0} color="#fbbf24" />
      <pointLight position={[0, 6, 0]} intensity={1.5} color="#38bdf8" />

      {/* Deep Atmospheric Void Fog */}
      <color attach="background" args={['#020408']} />
      <fog attach="fog" args={['#020408', 5, 35]} />

      <group ref={cameraGroupRef}>
        <SingularitySeed progress={progress} mousePos={mousePos} active={sceneIndex === 0} />
        <SceneStorm progress={progress} isMobile={isMobile} active={sceneIndex >= 1 && sceneIndex <= 8} />
        <ScenePayment progress={progress} mousePos={mousePos} active={sceneIndex === 2} />
        <SceneRiskScanner active={sceneIndex === 3} progress={progress} />
        <ScenePauseMoment active={sceneIndex === 4} />
        <SceneHarbourStructure active={sceneIndex === 5} />
        <SceneVoiceWaveform active={sceneIndex === 6} />
        <SceneProtectionBarrier active={sceneIndex === 7} />
        <SceneTrustedContact active={sceneIndex === 7} />
        <SceneFinalConvergence active={sceneIndex === 8} mousePos={mousePos} />
      </group>
    </>
  );
}
