import { useRef, useMemo, useCallback, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/liquid.vert.glsl?raw';
import fragmentShader from './shaders/liquid.frag.glsl?raw';

export default function LiquidScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const mouse = useRef(new THREE.Vector2(-10, -10));

  const onPointerMove = useCallback((e: PointerEvent) => {
    mouse.current.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [onPointerMove]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(-10, -10) },
      uSeed: { value: Math.random() * 100.0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(({ clock, size: frameSize }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uResolution.value.set(
      frameSize.width * (window.devicePixelRatio || 1),
      frameSize.height * (window.devicePixelRatio || 1)
    );
    uniforms.uMouse.value.lerp(mouse.current, 0.08);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <rawShaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
