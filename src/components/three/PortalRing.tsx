import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface PortalRingProps {
  position: [number, number, number];
  label: string;
  onActivate: () => void;
  index: number;
}

export default function PortalRing({
  position,
  label,
  onActivate,
  index,
}: PortalRingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const emissiveTarget = useRef(1.5);

  useFrame((state) => {
    if (!groupRef.current || !ringRef.current) return;
    const t = state.clock.elapsedTime;

    // Floating bob
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.6 + index * 1.5) * 0.15;

    // Spin the ring
    ringRef.current.rotation.x = t * 0.4 + index;
    ringRef.current.rotation.z = t * 0.2;

    // Hover glow
    const target = hovered ? 5.0 : 1.5;
    emissiveTarget.current += (target - emissiveTarget.current) * 0.1;
    const mat = ringRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = emissiveTarget.current;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.4, 0.05, 16, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={hovered ? 0.15 : 0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -0.72, 0]}
        fontSize={0.2}
        color={hovered ? '#ffffff' : '#888888'}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {hovered && (
        <Text
          position={[0, -0.97, 0]}
          fontSize={0.11}
          color="#555555"
          anchorX="center"
          anchorY="middle"
        >
          click to enter
        </Text>
      )}
    </group>
  );
}
