import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export default function CameraRig() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const keys = useRef({ w: false, a: false, s: false, d: false });
  const { camera } = useThree();

  useEffect(() => {
    // Set initial camera look-at
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keys.current.w = true;
      if (k === 'a' || k === 'arrowleft') keys.current.a = true;
      if (k === 's' || k === 'arrowdown') keys.current.s = true;
      if (k === 'd' || k === 'arrowright') keys.current.d = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keys.current.w = false;
      if (k === 'a' || k === 'arrowleft') keys.current.a = false;
      if (k === 's' || k === 'arrowdown') keys.current.s = false;
      if (k === 'd' || k === 'arrowright') keys.current.d = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const k = keys.current;

    // A/D → orbit left/right by adjusting auto-rotate speed
    if (k.a) {
      controls.autoRotateSpeed = -4;
    } else if (k.d) {
      controls.autoRotateSpeed = 4;
    } else {
      controls.autoRotateSpeed = 0.5;
    }

    // W/S → zoom in/out
    if (k.w) {
      camera.position.lerp(
        camera.position.clone().normalize().multiplyScalar(
          Math.max(camera.position.length() - 0.08, 4)
        ),
        0.3
      );
    }
    if (k.s) {
      camera.position.lerp(
        camera.position.clone().normalize().multiplyScalar(
          Math.min(camera.position.length() + 0.08, 14)
        ),
        0.3
      );
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.05}
      autoRotate
      autoRotateSpeed={0.5}
      minDistance={4}
      maxDistance={14}
      maxPolarAngle={Math.PI * 0.72}
      minPolarAngle={Math.PI * 0.28}
    />
  );
}
