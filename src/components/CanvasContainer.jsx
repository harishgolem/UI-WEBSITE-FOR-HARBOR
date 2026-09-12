import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from '../3d/Experience';

export default function CanvasContainer({ progress, sceneIndex, mousePos, isMobile }) {
  return (
    <div className="fixed inset-0 z-10 w-full h-full pointer-events-none">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{
          position: [0, 0, 5.2],
          fov: isMobile ? 55 : 45,
          near: 0.1,
          far: 60
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <Experience
            progress={progress}
            sceneIndex={sceneIndex}
            mousePos={mousePos}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
