import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

// ─── GLSL Simplex noise (Ashima Arts) ─────────────────────────────
const noiseGLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}
`;

// ─── Vertex shader ────────────────────────────────────────────────
const vertexShader = /* glsl */ `
${noiseGLSL}

uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;

varying float v_displacement;
varying vec3 v_normal;
varying vec3 v_position;

void main() {
  vec3 pos = position;
  vec3 norm = normal;

  // Base noise displacement along normals
  float noiseVal = fbm(pos * 0.8 + u_time * 0.15);

  // Second layer — larger, slower undulation
  float bigWave = snoise(pos * 0.3 + u_time * 0.08) * 0.5;

  // Mouse influence — displace more where mouse points
  // Map mouse from [-1,1] screen to a direction on the sphere
  vec3 mouseDir = normalize(vec3(u_mouse.x, u_mouse.y, 0.5));
  float mouseDot = dot(norm, mouseDir);
  float mouseEffect = smoothstep(0.3, 1.0, mouseDot) * u_intensity * 0.6;

  float totalDisplacement = (noiseVal * 0.35 + bigWave * 0.15 + mouseEffect) * u_intensity;

  pos += norm * totalDisplacement;

  v_displacement = totalDisplacement;
  v_normal = normalize(normalMatrix * norm);
  v_position = (modelViewMatrix * vec4(pos, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// ─── Fragment shader ──────────────────────────────────────────────
const fragmentShader = /* glsl */ `
varying float v_displacement;
varying vec3 v_normal;
varying vec3 v_position;

void main() {
  // Lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 viewDir = normalize(-v_position);
  vec3 halfDir = normalize(lightDir + viewDir);

  // Diffuse
  float diff = max(dot(v_normal, lightDir), 0.0) * 0.6;

  // Specular
  float spec = pow(max(dot(v_normal, halfDir), 0.0), 32.0) * 0.4;

  // Fresnel edge glow
  float fresnel = pow(1.0 - max(dot(v_normal, viewDir), 0.0), 3.0);

  // Map displacement to brightness
  float dispBright = smoothstep(-0.2, 0.5, v_displacement) * 0.3;

  // Combine
  float brightness = 0.08 + diff + spec + fresnel * 0.4 + dispBright;

  // Slight cool tint on edges
  vec3 color = mix(
    vec3(brightness),
    vec3(brightness * 0.9, brightness * 0.92, brightness),
    fresnel
  );

  gl_FragColor = vec4(color, 1.0);
}
`;

// ─── Component ────────────────────────────────────────────────────

export default function ParticleField() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_intensity: { value: 1.0 },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value = state.clock.elapsedTime;
    mat.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);

    // Gentle slow rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2.2, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </>
  );
}
