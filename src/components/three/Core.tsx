"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, Color, Group } from "three";
import { SIMPLEX_3D } from "./noise.glsl";

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;

varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

${SIMPLEX_3D}

// The surface is a sphere pushed along its own normal by two octaves of noise.
vec3 displace(vec3 p) {
  vec3 dir = normalize(p);
  float a = snoise(p * uFreq + vec3(0.0, uTime * 0.14, 0.0));
  float b = snoise(p * uFreq * 2.35 - vec3(uTime * 0.09));
  float amount = a * 0.68 + b * 0.32;
  return p + dir * amount * uAmp;
}

// Any vector that is not parallel to v — enough to build a tangent frame.
vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
}

void main() {
  vec3 n = normalize(normal);
  vec3 tangent = orthogonal(n);
  vec3 bitangent = normalize(cross(n, tangent));
  float eps = 0.028;

  vec3 p0 = displace(position);
  vec3 pt = displace(position + tangent * eps);
  vec3 pb = displace(position + bitangent * eps);

  vDisp = length(p0) - length(position);
  vNormal = normalize(normalMatrix * normalize(cross(pt - p0, pb - p0)));

  vec4 mv = modelViewMatrix * vec4(p0, 1.0);
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uRim;
uniform vec3 uInner;
uniform float uOpacity;
uniform float uRimPower;

varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);

  // Fresnel rim: the object reads as glass-thin at the silhouette, solid ink
  // in the middle, which is what gives it weight without any lights.
  float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), uRimPower);
  float key = clamp(dot(N, normalize(vec3(0.55, 0.85, 0.6))), 0.0, 1.0);

  vec3 color = uBase;
  color += uRim * fresnel * 1.15;
  color += uInner * pow(key, 3.0) * 0.30;
  color += uRim * smoothstep(0.06, 0.38, vDisp) * 0.14;

  gl_FragColor = vec4(color, uOpacity);
}
`;

export type CoreProps = {
  /** 0..1 progress through the hero, written by the section that owns it. */
  progress: React.RefObject<number>;
  /** World-space offset, so the object can sit beside the headline. */
  offset?: [number, number];
  baseScale?: number;
};

/**
 * The hero object: a noise-displaced icosahedron with a slightly larger
 * wireframe shell around it. Two meshes, one shared set of uniforms.
 */
export function Core({ progress, offset = [0, 0], baseScale = 1 }: CoreProps) {
  const group = useRef<Group>(null);
  const shell = useRef<Group>(null);
  // Raw pointer from the window (the canvas itself is pointer-events:none),
  // damped toward `pointer` a frame at a time.
  const rawPointer = useRef({ x: 0, y: 0 });
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      rawPointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      rawPointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.24 },
      uFreq: { value: 1.15 },
      uBase: { value: new Color("#0d0d12") },
      uRim: { value: new Color("#c8a876") },
      uInner: { value: new Color("#6e7bff") },
      uOpacity: { value: 1 },
      uRimPower: { value: 2.6 },
    }),
    [],
  );

  const wireUniforms = useMemo(
    () => ({
      uTime: uniforms.uTime,
      uAmp: uniforms.uAmp,
      uFreq: uniforms.uFreq,
      uBase: { value: new Color("#000000") },
      uRim: { value: new Color("#c8a876") },
      uInner: { value: new Color("#6e7bff") },
      uOpacity: { value: 0.22 },
      uRimPower: { value: 1.4 },
    }),
    [uniforms],
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30);
    uniforms.uTime.value += dt;

    const p = pointer.current;
    p.x += (rawPointer.current.x - p.x) * dt * 3.5;
    p.y += (rawPointer.current.y - p.y) * dt * 3.5;

    const scroll = progress.current ?? 0;

    // Amplitude breathes with the pointer distance from centre, and settles
    // as the visitor scrolls the hero away.
    const reach = Math.min(1, Math.hypot(p.x, p.y));
    const target = 0.2 + reach * 0.16 - scroll * 0.1;
    uniforms.uAmp.value += (target - uniforms.uAmp.value) * dt * 3;

    if (group.current) {
      const ry = p.x * 0.55 + uniforms.uTime.value * 0.06;
      const rx = -p.y * 0.4;
      group.current.rotation.y += (ry - group.current.rotation.y) * dt * 2.2;
      group.current.rotation.x += (rx - group.current.rotation.x) * dt * 2.2;
      group.current.position.x = offset[0];
      group.current.position.y =
        offset[1] - scroll * 1.2 + Math.sin(uniforms.uTime.value * 0.5) * 0.04;
      group.current.scale.setScalar(baseScale * (1 - scroll * 0.22));
    }

    if (shell.current) {
      shell.current.rotation.y -= dt * 0.05;
      shell.current.rotation.z += dt * 0.02;
    }
  });

  return (
    <group ref={group}>
      {/* Wireframe only — the solid body is gone, so the object reads as
          structure rather than mass. `uniforms` still drives the shared time
          and amplitude that the shell's displacement rides on. */}
      <group ref={shell}>
        <mesh scale={1.045}>
          <icosahedronGeometry args={[1.32, 9]} />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={wireUniforms}
            wireframe
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}
