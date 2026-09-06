"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useEnvironment } from "@/components/providers/Environment";

type CursorState = { active: boolean; label: string | null; pressed: boolean };

/**
 * Two-part cursor: a precise dot that tracks 1:1 and a lagging ring that
 * reacts to what is under it. Fine pointers only — touch devices and anyone
 * who asked for reduced motion keep the system cursor.
 */
export function Cursor() {
  const { ready, coarsePointer, reducedMotion } = useEnvironment();
  const enabled = ready && !coarsePointer && !reducedMotion;

  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>({ active: false, label: null, pressed: false });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 200, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 200, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.dataset.cursor = "on";

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select, summary",
      );
      setState((s) => ({
        ...s,
        active: Boolean(el),
        label: el?.dataset.cursor && el.dataset.cursor !== "true" ? el.dataset.cursor : null,
      }));
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setState((s) => ({ ...s, pressed: true }));
    const onUp = () => setState((s) => ({ ...s, pressed: false }));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      delete document.documentElement.dataset.cursor;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const scale = state.pressed ? 0.8 : state.label ? 2.6 : state.active ? 1.85 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      <motion.div
        className="absolute -ml-[17px] -mt-[17px] flex h-[34px] w-[34px] items-center justify-center rounded-full border will-change-transform"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale,
          opacity: visible ? 1 : 0,
          borderColor: state.active ? "rgba(200,168,118,0.9)" : "rgba(237,235,230,0.35)",
          backgroundColor: state.active ? "rgba(200,168,118,0.10)" : "rgba(237,235,230,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.5 }}
      >
        <AnimatePresence>
          {state.label ? (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[4.6px] uppercase tracking-[0.16em] text-sand"
            >
              {state.label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-paper will-change-transform"
        style={{ x, y }}
        animate={{ opacity: visible && !state.label ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
