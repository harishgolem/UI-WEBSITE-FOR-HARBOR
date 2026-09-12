import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ScannerLaserShader } from '../shaders/scannerLaser';

export default function SceneRiskScanner({ active, progress }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const laserRef = useRef();

  const laserMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScanProgress: { value: 0 },
        uColor: { value: new THREE.Color('#38bdf8') },
        uAlertColor: { value: new THREE.Color('#f43f5e') },
        uAlertLevel: { value: 0.5 }
      },
      vertexShader: ScannerLaserShader.vertexShader,
      fragmentShader: ScannerLaserShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    laserMaterial.uniforms.uTime.value = time;

    groupRef.current.visible = active;
    if (!active) return;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.3;
      ring1Ref.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.45;
      ring2Ref.current.rotation.y = Math.cos(time * 0.3) * 0.2;
    }
    if (laserRef.current) {
      laserRef.current.rotation.y = time * 0.8;
    }
  });

  // Calculate sequential signals during scene 3 (progress roughly 0.33 to 0.44)
  const normProgress = Math.max(0, Math.min(1, (progress - 0.33) / 0.11));
  const showSignal1 = normProgress > 0.15;
  const showSignal2 = normProgress > 0.45;
  const showSignal3 = normProgress > 0.75;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Precision Scanning Outer Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Fast Scanning Glass Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.04, 16, 80]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#0369a1"
          emissiveIntensity={1.0}
          roughness={0.1}
          transmission={0.8}
        />
      </mesh>

      {/* Sweeping Scan Cone */}
      <mesh ref={laserRef} material={laserMaterial}>
        <cylinderGeometry args={[0.1, 2.8, 3.8, 32, 1, true]} />
      </mesh>

      {/* Minimal Spatial 3D Signals Connected by Laser Lines */}
      {showSignal1 && (
        <group position={[-2.4, 1.2, 0]}>
          <mesh position={[1.2, -0.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.008, 0.008, 2.5, 8]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>
          <Html center distanceFactor={7} className="pointer-events-none">
            <div className="font-mono text-[11px] tracking-widest text-sky-300 uppercase whitespace-nowrap px-2.5 py-1 border-l border-sky-400 bg-black/40 backdrop-blur-sm">
              NEW RECIPIENT
            </div>
          </Html>
        </group>
      )}

      {showSignal2 && (
        <group position={[2.4, 1.0, 0]}>
          <mesh position={[-1.2, -0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.008, 0.008, 2.5, 8]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} />
          </mesh>
          <Html center distanceFactor={7} className="pointer-events-none">
            <div className="font-mono text-[11px] tracking-widest text-amber-300 uppercase whitespace-nowrap px-2.5 py-1 border-r border-amber-400 bg-black/40 backdrop-blur-sm">
              UNUSUAL AMOUNT
            </div>
          </Html>
        </group>
      )}

      {showSignal3 && (
        <group position={[0, -2.0, 0]}>
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 2.0, 8]} />
            <meshBasicMaterial color="#f43f5e" transparent opacity={0.6} />
          </mesh>
          <Html center distanceFactor={7} className="pointer-events-none">
            <div className="font-mono text-[11px] tracking-widest text-rose-300 uppercase whitespace-nowrap px-2.5 py-1 border-t border-rose-400 bg-black/40 backdrop-blur-sm">
              NO HISTORY
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
