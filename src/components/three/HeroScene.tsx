"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Core } from "./Core";
import { Field } from "./Field";

/**
 * Watches the real frame budget and drops render resolution when the GPU
 * cannot keep up — visitors get a stable frame rate rather than a sharp,
 * stuttering one. Sampled in blocks so one slow frame changes nothing.
 */
function AdaptiveResolution({ onChange }: { onChange: (dpr: number) => void }) {
  const samples = useRef<number[]>([]);

  useFrame((_, delta) => {
    const s = samples.current;
    s.push(delta);
    if (s.length < 90) return;

    const average = s.reduce((total, d) => total + d, 0) / s.length;
    s.length = 0;

    if (average > 1 / 45) onChange(1);
    else if (average < 1 / 56) onChange(Math.min(2, window.devicePixelRatio));
  });

  return null;
}

export default function HeroScene({
  progressRef,
  active = true,
  particleCount = 1200,
  compact = false,
}: {
  progressRef: React.RefObject<number>;
  active?: boolean;
  particleCount?: number;
  /** Narrow viewports centre the object; wide ones park it beside the name. */
  compact?: boolean;
}) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.1], fov: 42 }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <AdaptiveResolution onChange={setDpr} />
      <Field count={particleCount} progress={progressRef} />
      <Core
        progress={progressRef}
        // Narrow viewports lift the object clear of the headline instead of
        // sitting it behind the type.
        offset={compact ? [0, 0.55] : [1.15, 0.22]}
        baseScale={compact ? 0.5 : 0.86}
      />
    </Canvas>
  );
}
