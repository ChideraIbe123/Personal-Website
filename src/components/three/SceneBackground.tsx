import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import CameraRig from './CameraRig';
import PortalRing from './PortalRing';

interface SceneBackgroundProps {
  interactive?: boolean;
  onNavigate?: (path: string) => void;
}

const portals = [
  { label: 'Projects', path: '/projects', position: [4.2, 0.5, 1.5] as [number, number, number] },
  { label: 'Experience', path: '/experience', position: [-3.8, -0.3, 2.5] as [number, number, number] },
  { label: 'Publications', path: '/publications', position: [-1.5, 3.5, -1] as [number, number, number] },
  { label: 'About', path: '/about', position: [2.5, -2.5, -3] as [number, number, number] },
];

export default function SceneBackground({
  interactive = false,
  onNavigate,
}: SceneBackgroundProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 1.5, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        style={{ background: '#000000' }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <ParticleField />
          {interactive && (
            <>
              <CameraRig />
              {portals.map((p, i) => (
                <PortalRing
                  key={p.path}
                  position={p.position}
                  label={p.label}
                  index={i}
                  onActivate={() => onNavigate?.(p.path)}
                />
              ))}
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
