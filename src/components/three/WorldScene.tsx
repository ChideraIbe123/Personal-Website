import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// ─── Zone definitions ─────────────────────────────────────────────
export const ZONES: Record<string, { pos: THREE.Vector3; label: string }> = {
  projects: { pos: new THREE.Vector3(12, 0, 0), label: 'Projects' },
  experience: { pos: new THREE.Vector3(-12, 0, 0), label: 'Experience' },
  publications: { pos: new THREE.Vector3(0, 0, -12), label: 'Publications' },
  about: { pos: new THREE.Vector3(0, 0, 12), label: 'About' },
};

const ZONE_THRESHOLD = 5;
const PLAYER_SPEED = 14;
const WORLD_BOUND = 20;
const PLAYER_SCALE = 0.22;
const PLAYER_RADIUS = 0.15;

// ─── City Environment ─────────────────────────────────────────────
function CityEnvironment({ cityRef }: { cityRef: React.RefObject<THREE.Group | null> }) {
  const { scene: cityScene } = useGLTF('/models/city.glb');
  const { scene: courtScene } = useGLTF('/models/basketball-court.glb');

  return (
    <group ref={cityRef}>
      <primitive
        object={cityScene}
        scale={[0.018, 0.018, 0.018]}
        position={[0, -0.5, 0]}
      />
      <primitive
        object={courtScene}
        scale={[1.5, 1.5, 1.5]}
        position={[8, -0.5, -8]}
      />
    </group>
  );
}

// ─── Character Player ─────────────────────────────────────────────
function CharacterPlayer({ playerRef, velRef }: {
  playerRef: React.RefObject<THREE.Group | null>;
  velRef: React.RefObject<THREE.Vector3>;
}) {
  const { scene, animations } = useGLTF('/models/character.glb');
  const groupRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, groupRef);
  const currentAction = useRef<string>('Idle');

  useEffect(() => {
    if (actions['Idle']) {
      actions['Idle'].reset().play();
    }
  }, [actions]);

  useFrame(() => {
    if (!velRef.current || !actions) return;
    const speed = Math.sqrt(velRef.current.x ** 2 + velRef.current.z ** 2);

    let target = 'Idle';
    if (speed > 1.2) target = 'Run';
    else if (speed > 0.2) target = 'Walk';

    if (target !== currentAction.current) {
      const prev = actions[currentAction.current];
      const next = actions[target];
      if (prev && next) {
        next.reset().fadeIn(0.3).play();
        prev.fadeOut(0.3);
      }
      currentAction.current = target;
    }

    // Face movement direction
    if (groupRef.current && speed > 0.2) {
      const angle = Math.atan2(velRef.current.x, velRef.current.z);
      let diff = angle - groupRef.current.rotation.y;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      groupRef.current.rotation.y += diff * 0.12;
    }
  });

  return (
    <group ref={playerRef} position={[0, 0, 4]}>
      <group ref={groupRef} scale={[PLAYER_SCALE, PLAYER_SCALE, PLAYER_SCALE]}>
        <primitive object={scene} />
      </group>
      <pointLight intensity={1.5} distance={8} color="#ffffff" position={[0, 2, 0]} />
    </group>
  );
}

// ─── Zone marker ──────────────────────────────────────────────────
function ZoneMarker({ position, label, active }: { position: THREE.Vector3; label: string; active: boolean }) {
  const orbRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orbRef.current) {
      orbRef.current.position.y = 4 + Math.sin(t * 1.2) * 0.3;
      orbRef.current.rotation.y = t * 1.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.set(Math.PI / 2, t * 0.5, 0);
      ringRef.current.scale.setScalar(active ? 1.3 + Math.sin(t * 2) * 0.1 : 1);
    }
  });

  return (
    <group position={[position.x, 0, position.z]}>
      {/* Ground ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[2.5, 3, 48]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={active ? 0.35 : 0.12} depthWrite={false} />
      </mesh>

      {/* Pillar */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 4, 6]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={active ? 3 : 1} />
      </mesh>

      {/* Floating diamond */}
      <mesh ref={orbRef} position={[0, 4, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={active ? 5 : 2} />
      </mesh>

      {/* Orbit ring */}
      <mesh ref={ringRef} position={[0, 4, 0]}>
        <torusGeometry args={[0.5, 0.02, 12, 48]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={active ? 3 : 1} transparent opacity={0.7} />
      </mesh>

      {/* Light beam */}
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[0.1, 0.5, 10, 8, 1, true]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={active ? 0.08 : 0.02} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <Text position={[0, 5.8, 0]} fontSize={0.5} color={active ? '#FFD700' : '#888888'} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000000">
        {label}
      </Text>

      {/* Zone point light */}
      <pointLight intensity={active ? 2 : 0.5} distance={8} color="#FFD700" position={[0, 3, 0]} />
    </group>
  );
}

// ─── World logic ──────────────────────────────────────────────────
interface WorldProps {
  onZoneChange: (zone: string | null) => void;
  teleportRef: React.RefObject<string | null>;
}

function World({ onZoneChange, teleportRef }: WorldProps) {
  const { camera } = useThree();
  const playerRef = useRef<THREE.Group>(null);
  const cityRef = useRef<THREE.Group>(null);
  const playerPos = useRef(new THREE.Vector3(0, 0, 4));
  const playerVel = useRef(new THREE.Vector3());
  const prevZone = useRef<string | null>(null);
  const keys = useRef({ w: false, a: false, s: false, d: false });
  const touchDir = useRef(new THREE.Vector2());
  const touchActive = useRef(false);
  const cameraTarget = useRef(new THREE.Vector3());
  const cameraLook = useRef(new THREE.Vector3());
  const cameraAngle = useRef(0); // horizontal orbit angle
  const cameraPitch = useRef(0.4); // vertical pitch (radians, 0 = level, positive = above)
  const cameraDistance = useRef(4);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const raycaster = useRef(new THREE.Raycaster());
  const rayDir = useRef(new THREE.Vector3());
  const rayOrigin = useRef(new THREE.Vector3());
  const downDir = useRef(new THREE.Vector3(0, -1, 0));
  const groundY = useRef(-1.2);

  // Mouse orbit camera
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-ui]')) return;
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      cameraAngle.current -= dx * 0.005;
      cameraPitch.current = Math.max(0.1, Math.min(1.2, cameraPitch.current + dy * 0.005));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDragging.current = false; };
    const onWheel = (e: WheelEvent) => {
      cameraDistance.current = Math.max(2, Math.min(10, cameraDistance.current + e.deltaY * 0.005));
    };
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('mousedown', onMouseDown);
      canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      if (canvas) {
        canvas.removeEventListener('mousedown', onMouseDown);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Keyboard
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keys.current.w = true;
      if (k === 'a' || k === 'arrowleft') keys.current.a = true;
      if (k === 's' || k === 'arrowdown') keys.current.s = true;
      if (k === 'd' || k === 'arrowright') keys.current.d = true;
    };
    const onUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keys.current.w = false;
      if (k === 'a' || k === 'arrowleft') keys.current.a = false;
      if (k === 's' || k === 'arrowdown') keys.current.s = false;
      if (k === 'd' || k === 'arrowright') keys.current.d = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  // Touch
  useEffect(() => {
    let startX = 0, startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('[data-ui]')) return;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
      touchActive.current = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!touchActive.current) return;
      touchDir.current.set(
        Math.max(-1, Math.min(1, (e.touches[0].clientX - startX) / 80)),
        Math.max(-1, Math.min(1, (e.touches[0].clientY - startY) / 80))
      );
    };
    const onTouchEnd = () => { touchActive.current = false; touchDir.current.set(0, 0); };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useFrame((_, delta) => {
    if (!playerRef.current) return;
    const dt = Math.min(delta, 0.05);
    const k = keys.current;

    // Teleport
    if (teleportRef.current) {
      const zone = ZONES[teleportRef.current];
      if (zone) {
        const offset = zone.pos.clone().normalize().multiplyScalar(-3);
        playerPos.current.set(zone.pos.x + offset.x, 0, zone.pos.z + offset.z);
        playerVel.current.set(0, 0, 0);
      }
      (teleportRef as React.MutableRefObject<string | null>).current = null;
    }

    // Input
    let dx = 0, dz = 0;
    if (k.w) dz -= 1;
    if (k.s) dz += 1;
    if (k.a) dx -= 1;
    if (k.d) dx += 1;
    if (touchActive.current) { dx += touchDir.current.x; dz += touchDir.current.y; }

    const len = Math.sqrt(dx * dx + dz * dz);
    if (len > 0.01) {
      dx /= len; dz /= len;
      playerVel.current.x += dx * PLAYER_SPEED * dt * 3;
      playerVel.current.z += dz * PLAYER_SPEED * dt * 3;
    }
    playerVel.current.x *= 0.88;
    playerVel.current.z *= 0.88;

    // Collision check via raycasting
    const moveX = playerVel.current.x * dt;
    const moveZ = playerVel.current.z * dt;

    if (cityRef.current && (Math.abs(moveX) > 0.001 || Math.abs(moveZ) > 0.001)) {
      // Test X movement
      rayOrigin.current.set(playerPos.current.x, groundY.current + 0.15, playerPos.current.z);
      rayDir.current.set(Math.sign(moveX), 0, 0);
      raycaster.current.set(rayOrigin.current, rayDir.current);
      raycaster.current.far = Math.abs(moveX) + PLAYER_RADIUS;
      const hitsX = raycaster.current.intersectObject(cityRef.current, true);
      if (hitsX.length === 0 || hitsX[0].distance > PLAYER_RADIUS + Math.abs(moveX)) {
        playerPos.current.x += moveX;
      } else {
        playerVel.current.x = 0;
      }

      // Test Z movement
      rayOrigin.current.set(playerPos.current.x, groundY.current + 0.15, playerPos.current.z);
      rayDir.current.set(0, 0, Math.sign(moveZ));
      raycaster.current.set(rayOrigin.current, rayDir.current);
      raycaster.current.far = Math.abs(moveZ) + PLAYER_RADIUS;
      const hitsZ = raycaster.current.intersectObject(cityRef.current, true);
      if (hitsZ.length === 0 || hitsZ[0].distance > PLAYER_RADIUS + Math.abs(moveZ)) {
        playerPos.current.z += moveZ;
      } else {
        playerVel.current.z = 0;
      }
    } else {
      playerPos.current.x += moveX;
      playerPos.current.z += moveZ;
    }

    // Circular world boundary
    const distFromCenter = Math.sqrt(playerPos.current.x ** 2 + playerPos.current.z ** 2);
    if (distFromCenter > WORLD_BOUND) {
      const s = WORLD_BOUND / distFromCenter;
      playerPos.current.x *= s;
      playerPos.current.z *= s;
      playerVel.current.multiplyScalar(0.5);
    }

    // Find ground with downward raycast
    if (cityRef.current) {
      rayOrigin.current.set(playerPos.current.x, 10, playerPos.current.z);
      raycaster.current.set(rayOrigin.current, downDir.current);
      raycaster.current.far = 50;
      const groundHits = raycaster.current.intersectObject(cityRef.current, true);
      if (groundHits.length > 0) {
        groundY.current = groundHits[0].point.y;
      }
    }
    playerPos.current.y = groundY.current;
    playerRef.current.position.copy(playerPos.current);

    // Camera — orbit around player
    const dist = cameraDistance.current;
    const pitch = cameraPitch.current;
    const angle = cameraAngle.current;
    cameraTarget.current.set(
      playerPos.current.x + Math.sin(angle) * Math.cos(pitch) * dist,
      playerPos.current.y + Math.sin(pitch) * dist,
      playerPos.current.z + Math.cos(angle) * Math.cos(pitch) * dist
    );
    cameraLook.current.set(
      playerPos.current.x,
      playerPos.current.y + 0.3,
      playerPos.current.z
    );
    camera.position.lerp(cameraTarget.current, 0.08);
    camera.lookAt(cameraLook.current);

    // Zone detection
    let nearestZone: string | null = null;
    let nearestDist = Infinity;
    for (const [name, zone] of Object.entries(ZONES)) {
      const d = Math.sqrt(
        (playerPos.current.x - zone.pos.x) ** 2 +
        (playerPos.current.z - zone.pos.z) ** 2
      );
      if (d < ZONE_THRESHOLD && d < nearestDist) {
        nearestZone = name; nearestDist = d;
      }
    }
    if (nearestZone !== prevZone.current) {
      prevZone.current = nearestZone;
      onZoneChange(nearestZone);
    }
  });

  return (
    <>
      {/* City environment */}
      <CityEnvironment cityRef={cityRef} />

      {/* Zone markers */}
      {Object.entries(ZONES).map(([name, zone]) => (
        <ZoneMarker key={name} position={zone.pos} label={zone.label} active={prevZone.current === name} />
      ))}

      {/* Player */}
      <CharacterPlayer playerRef={playerRef} velRef={playerVel} />

      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
      <directionalLight position={[-8, 15, -8]} intensity={0.5} />
      <hemisphereLight args={['#87ceeb', '#44aa44', 0.6]} />
    </>
  );
}

// ─── Canvas wrapper ───────────────────────────────────────────────
interface WorldSceneProps {
  onZoneChange: (zone: string | null) => void;
  teleportRef: React.RefObject<string | null>;
}

export default function WorldScene({ onZoneChange, teleportRef }: WorldSceneProps) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 6, 14], fov: 50, near: 0.1, far: 500 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#87ceeb']} />
        <fogExp2 attach="fog" args={['#87ceeb', 0.008]} />
        <Suspense fallback={null}>
          <World onZoneChange={onZoneChange} teleportRef={teleportRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/city.glb');
useGLTF.preload('/models/character.glb');
useGLTF.preload('/models/basketball-court.glb');
