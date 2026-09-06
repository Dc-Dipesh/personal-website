"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, Group } from "three";

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uProgress;
uniform float uPixelRatio;

attribute float aScale;
attribute float aSeed;

varying float vAlpha;

void main() {
  vec3 p = position;
  float t = uTime * 0.09 + aSeed * 6.2831853;

  // Each point traces its own small orbit; the whole field drifts upward as
  // the hero scrolls away, so the scene reads as depth rather than a backdrop.
  p.x += sin(t) * 0.14;
  p.y += cos(t * 0.83) * 0.14 - uProgress * 1.8;
  p.z += sin(t * 0.61) * 0.14;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  // Perspective sizing in device pixels: three does not scale gl_PointSize by
  // the renderer's pixel ratio, so it is applied here.
  gl_PointSize = uSize * aScale * uPixelRatio * (2.2 / max(0.001, -mv.z));
  vAlpha = aScale * (1.0 - uProgress * 0.75);
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uColor, smoothstep(0.5, 0.04, d) * vAlpha * 0.85);
}
`;

/** Small deterministic PRNG (mulberry32). */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A thin spherical shell of drifting points around the core. */
export function Field({
  count = 1200,
  progress,
}: {
  count?: number;
  progress: React.RefObject<number>;
}) {
  const group = useRef<Group>(null);

  const { positions, scales, seeds } = useMemo(() => {
    // Seeded, not Math.random: the field is identical on every render and on
    // every machine, which keeps this a pure computation.
    const rand = mulberry32(0x5eed_1234);

    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      // Even distribution on a sphere, then pushed out to a random radius.
      const u = rand() * 2 - 1;
      const theta = rand() * Math.PI * 2;
      const r = 2.0 + Math.pow(rand(), 0.7) * 3.6;
      const s = Math.sqrt(1 - u * u);

      positions[i * 3] = Math.cos(theta) * s * r;
      positions[i * 3 + 1] = Math.sin(theta) * s * r * 0.72;
      positions[i * 3 + 2] = u * r;

      scales[i] = 0.25 + rand() * 0.85;
      seeds[i] = rand();
    }

    return { positions, scales, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 9 },
      uProgress: { value: 0 },
      uPixelRatio: { value: 1 },
      uColor: { value: new Color("#d8d2c4") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    uniforms.uTime.value += dt;
    uniforms.uProgress.value = progress.current ?? 0;
    uniforms.uPixelRatio.value = state.viewport.dpr;
    if (group.current) group.current.rotation.y += dt * 0.018;
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}
