precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uSeed;

const float MAX_DIST = 50.0;
const float HIT_THRESHOLD = 0.003;
const int MAX_STEPS = 100;
const float PI = 3.14159265;

// ── Noise ──────────────────────────────────────────────

float hash(vec3 p) {
  p = fract(p * vec3(443.897, 441.423, 437.195));
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

float noise3D(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
        mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
        mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z
  );
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  vec3 shift = vec3(100.0);
  for (int i = 0; i < 3; i++) {
    v += a * noise3D(p);
    p = p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

// ── SDF Primitives ─────────────────────────────────────

float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

// ── Scene ──────────────────────────────────────────────

float map(vec3 pos) {
  float t = uTime * 0.5;

  // Per-blob random phase offsets derived from seed
  float s1 = fract(sin(uSeed * 12.9898) * 43758.5) * 6.28;
  float s2 = fract(sin(uSeed * 78.233) * 43758.5) * 6.28;
  float s3 = fract(sin(uSeed * 45.164) * 43758.5) * 6.28;
  float s4 = fract(sin(uSeed * 93.989) * 43758.5) * 6.28;
  float s5 = fract(sin(uSeed * 27.617) * 43758.5) * 6.28;
  float s6 = fract(sin(uSeed * 61.342) * 43758.5) * 6.28;
  float s7 = fract(sin(uSeed * 54.478) * 43758.5) * 6.28;

  // Surface noise displacement
  float noiseDisp = fbm(pos * 3.0 + t * 0.3) * 0.07;

  // 7 orbiting blobs -- each with independent random phase
  vec3 p1 = vec3(sin(t * 0.7 + s1) * 2.2, cos(t * 0.5 + s1 * 1.3) * 1.3, sin(t * 0.3 + s1 * 0.7) * 0.6);
  vec3 p2 = vec3(cos(t * 0.6 + s2) * 1.8, sin(t * 0.9 + s2 * 1.1) * 1.5, cos(t * 0.4 + s2 * 0.8) * 0.5);
  vec3 p3 = vec3(sin(t * 0.4 + s3) * 2.0, cos(t * 0.8 + s3 * 1.2) * 1.0, sin(t * 0.7 + s3 * 0.9) * 0.5);
  vec3 p4 = vec3(cos(t * 0.5 + s4) * 1.5, sin(t * 0.3 + s4 * 1.4) * 1.8, cos(t * 0.6 + s4 * 0.6) * 0.4);
  vec3 p5 = vec3(sin(t * 0.9 + s5) * 1.3, cos(t * 0.6 + s5 * 1.0) * 0.8, sin(t * 0.5 + s5 * 1.1) * 0.7);
  vec3 p6 = vec3(cos(t * 0.3 + s6) * 2.4, sin(t * 0.7 + s6 * 0.9) * 0.6, cos(t * 0.9 + s6 * 1.3) * 0.5);
  vec3 p7 = vec3(sin(t * 0.8 + s7) * 1.0, cos(t * 0.4 + s7 * 1.2) * 2.0, sin(t * 0.6 + s7 * 0.8) * 0.4);

  // Mouse blob -- starts off-screen until user moves mouse
  vec3 mousePos = vec3(uMouse.x * 2.2, uMouse.y * 1.4, 0.3);
  vec3 mSat1 = mousePos + vec3(sin(t * 2.0) * 0.45, cos(t * 2.0) * 0.45, 0.0);
  vec3 mSat2 = mousePos + vec3(cos(t * 1.8 + PI) * 0.4, sin(t * 1.8 + PI) * 0.4, 0.15);

  float k = 0.5;
  float d = sdSphere(pos - p1, 0.95) + noiseDisp;
  d = smin(d, sdSphere(pos - p2, 0.8) + noiseDisp, k);
  d = smin(d, sdSphere(pos - p3, 0.75) + noiseDisp, k);
  d = smin(d, sdSphere(pos - p4, 0.65) + noiseDisp, k);
  d = smin(d, sdSphere(pos - p5, 0.6) + noiseDisp, k);
  d = smin(d, sdSphere(pos - p6, 0.85) + noiseDisp, k);
  d = smin(d, sdSphere(pos - p7, 0.55) + noiseDisp, k);

  // Mouse blobs
  d = smin(d, sdSphere(pos - mousePos, 0.9) + noiseDisp, k);
  d = smin(d, sdSphere(pos - mSat1, 0.35) + noiseDisp, k);
  d = smin(d, sdSphere(pos - mSat2, 0.3) + noiseDisp, k);

  return d;
}

vec3 calcNormal(vec3 p) {
  float eps = 0.0001;
  vec2 h = vec2(eps, 0.0);
  return normalize(vec3(
    map(p + h.xyy) - map(p - h.xyy),
    map(p + h.yxy) - map(p - h.yxy),
    map(p + h.yyx) - map(p - h.yyx)
  ));
}

// ── Soft AO approximation ──────────────────────────────

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 5; i++) {
    float h = 0.01 + 0.12 * float(i) / 4.0;
    float d = map(p + h * n);
    occ += (h - d) * sca;
    sca *= 0.95;
  }
  return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

// ── Iridescence / thin-film interference ───────────────

vec3 iridescence(float cosTheta, float thickness) {
  // Attempt thin-film: path difference creates interference colors
  float delta = thickness * cosTheta;
  vec3 color;
  color.r = cos(delta * 12.0) * 0.5 + 0.5;
  color.g = cos(delta * 12.0 + 2.1) * 0.5 + 0.5;
  color.b = cos(delta * 12.0 + 4.2) * 0.5 + 0.5;
  return color;
}

// ── Fake environment reflection ────────────────────────

vec3 envMap(vec3 rd) {
  float t = uTime * 0.15;
  // Subtle moving gradient as fake environment
  float n = fbm(rd * 2.0 + t);
  vec3 warm = vec3(0.12, 0.06, 0.02);
  vec3 cool = vec3(0.02, 0.06, 0.14);
  vec3 mid = vec3(0.04, 0.02, 0.08);
  vec3 env = mix(warm, cool, rd.y * 0.5 + 0.5);
  env = mix(env, mid, n * 0.6);
  return env * 0.6;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  vec3 rayOrigin = vec3(0.0, 0.0, -4.0);
  vec3 rayDir = normalize(vec3(p, 1.0));

  // Raymarching
  float t = 0.0;
  float d;
  vec3 hitPos;

  for (int i = 0; i < MAX_STEPS; i++) {
    hitPos = rayOrigin + rayDir * t;
    d = map(hitPos);
    t += d * 0.7;
    if (d < HIT_THRESHOLD || t > MAX_DIST) break;
  }

  vec3 color = vec3(0.0);

  if (d < HIT_THRESHOLD) {
    vec3 normal = calcNormal(hitPos);
    vec3 viewDir = -rayDir;
    float ao = calcAO(hitPos, normal);

    // ── Multi-light setup ──

    // Key light (warm, from top-right)
    vec3 keyDir = normalize(vec3(1.0, 1.2, 0.8));
    vec3 keyColor = vec3(1.0, 0.95, 0.85);
    float keyDiff = max(0.0, dot(keyDir, normal));
    vec3 keyRefl = reflect(-keyDir, normal);
    float keySpec = pow(max(0.0, dot(keyRefl, viewDir)), 64.0);

    // Fill light (cool, from left)
    vec3 fillDir = normalize(vec3(-0.8, 0.3, 0.5));
    vec3 fillColor = vec3(0.6, 0.7, 1.0);
    float fillDiff = max(0.0, dot(fillDir, normal));

    // Rim light (from behind)
    vec3 rimDir = normalize(vec3(0.0, 0.0, 1.0));
    float rim = pow(1.0 - max(0.0, dot(viewDir, normal)), 3.0);

    // ── Fresnel ──
    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 3.0);

    // ── Environment reflection ──
    vec3 reflDir = reflect(rayDir, normal);
    vec3 envColor = envMap(reflDir);

    // ── Iridescence ──
    float cosTheta = dot(viewDir, normal);
    float thickness = 1.0 + fbm(hitPos * 4.0 + uTime * 0.2) * 0.5;
    vec3 iri = iridescence(cosTheta, thickness);

    // ── Compose lighting ──

    // Base material (dark, slightly blue)
    vec3 baseColor = vec3(0.02, 0.025, 0.04);

    // Diffuse
    vec3 diffuse = baseColor * (keyDiff * keyColor * 0.6 + fillDiff * fillColor * 0.3);

    // Specular (key light)
    vec3 specular = keySpec * keyColor * 1.2;

    // Hemisphere ambient
    vec3 skyAmb = vec3(0.04, 0.06, 0.12);
    vec3 gndAmb = vec3(0.06, 0.03, 0.02);
    vec3 ambient = mix(gndAmb, skyAmb, normal.y * 0.5 + 0.5) * 0.15;

    // Combine
    color = ambient + diffuse;
    color += specular * fresnel;
    color += rim * vec3(0.08, 0.12, 0.25) * 0.8;           // Rim glow
    color += envColor * fresnel * 0.7;                       // Environment reflection
    color += iri * fresnel * 0.12;                            // Subtle iridescence
    color *= ao;                                              // Ambient occlusion

    // Subsurface scattering approximation
    float sss = max(0.0, dot(viewDir, -normal)) * 0.15;
    color += vec3(0.05, 0.02, 0.08) * sss;
  }

  // ── Post-processing ──

  // Reinhard tone mapping
  color = color / (color + vec3(1.0));

  // Slight contrast boost
  color = smoothstep(vec3(0.0), vec3(1.0), color);

  // Gamma correction
  color = pow(color, vec3(0.4545));

  // Subtle vignette
  float vig = 1.0 - dot(uv - 0.5, uv - 0.5) * 0.8;
  color *= vig;

  gl_FragColor = vec4(color, 1.0);
}
