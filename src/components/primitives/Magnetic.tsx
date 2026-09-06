"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useRef, type ReactNode } from "react";
import { useEnvironment } from "@/components/providers/Environment";

/**
 * Pulls its child toward the pointer while the pointer is inside the element's
 * padded hit area, then springs back on leave.
 *
 * `strength` is the fraction of the offset the wrapper travels; the inner
 * layer travels further, which reads as depth rather than as a slide.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
  radius = 1.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { coarsePointer, reducedMotion } = useEnvironment();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.6 });
  const innerX = useTransform(sx, (v) => v * 0.45);
  const innerY = useTransform(sy, (v) => v * 0.45);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const reach = (Math.max(rect.width, rect.height) / 2) * radius;
      const distance = Math.hypot(dx, dy);
      const falloff = Math.max(0, 1 - distance / (reach * 2));
      x.set(dx * strength * falloff);
      y.set(dy * strength * falloff);
    },
    [radius, strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (coarsePointer || reducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <motion.span className="inline-block" style={{ x: innerX, y: innerY }}>
        {children}
      </motion.span>
    </motion.span>
  );
}
