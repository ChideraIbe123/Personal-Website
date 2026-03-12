import { Canvas } from '@react-three/fiber';
import LiquidScene from './LiquidScene';

export default function LiquidCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: '#000000' }}
      >
        <LiquidScene />
      </Canvas>
    </div>
  );
}
