"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { skillGroups, type Skill, type SkillGroup } from "@/data/skills";
import { Marker } from "@/components/primitives/Section";
import { RevealText } from "@/components/primitives/Reveal";
import { easeOutExpo } from "@/lib/motion";
import { useEnvironment } from "@/components/providers/Environment";

type Active = { group: SkillGroup; skill: Skill } | null;

/**
 * A chip that leans toward the pointer. The rotation is a spring on two motion
 * values, so it never snaps back — it settles.
 */
function Chip({
  skill,
  tone,
  dimmed,
  isActive,
  onActivate,
  onClear,
  index,
}: {
  skill: Skill;
  tone: "sand" | "signal";
  dimmed: boolean;
  isActive: boolean;
  onActivate: () => void;
  onClear: () => void;
  index: number;
}) {
  const { reducedMotion, coarsePointer } = useEnvironment();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 260, damping: 18, mass: 0.5 });
  const rotateY = useSpring(ry, { stiffness: 260, damping: 18, mass: 0.5 });
  const lift = useTransform([rotateX, rotateY], ([a, b]: number[]) => Math.hypot(a, b) * 0.9);

  const accent = tone === "signal" ? "var(--color-signal)" : "var(--color-sand)";

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (reducedMotion || coarsePointer) return;
      const r = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - r.left) / r.width - 0.5;
      const py = (event.clientY - r.top) / r.height - 0.5;
      ry.set(px * 22);
      rx.set(-py * 20);
    },
    [coarsePointer, reducedMotion, rx, ry],
  );

  const settle = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, ease: easeOutExpo, delay: index * 0.03 }}
      style={{ perspective: 700 }}
    >
      <motion.button
        type="button"
        onPointerMove={onMove}
        // Hover only drives selection where hover exists; on touch the tap does.
        onPointerEnter={coarsePointer ? undefined : onActivate}
        onPointerLeave={
          coarsePointer
            ? undefined
            : () => {
                settle();
                onClear();
              }
        }
        onFocus={onActivate}
        onBlur={() => {
          settle();
          onClear();
        }}
        onClick={onActivate}
        aria-describedby="tool-readout"
        className="group relative flex w-full items-center gap-2.5 rounded-md border px-3.5 py-2.5 text-left transition-colors duration-300"
        style={{
          rotateX,
          rotateY,
          y: reducedMotion ? 0 : lift,
          transformStyle: "preserve-3d",
          borderColor: isActive ? accent : "var(--color-line)",
          backgroundColor: isActive ? "rgba(237,235,230,0.045)" : "transparent",
          opacity: dimmed ? 0.4 : 1,
        }}
      >
        <span
          aria-hidden="true"
          className="h-1 w-1 shrink-0 rounded-full transition-colors duration-300"
          style={{ backgroundColor: skill.weight === "core" ? accent : "var(--color-paper-faint)" }}
        />
        <span className="text-[0.9rem] leading-none tracking-tight">{skill.name}</span>
      </motion.button>
    </motion.li>
  );
}

export function Tools() {
  const [active, setActive] = useState<Active>(null);
  const { compact } = useEnvironment();

  const readout = useMemo(() => {
    if (active) {
      return {
        key: active.skill.name,
        eyebrow: `${active.group.title} · ${active.skill.weight === "core" ? "Core" : "Working"}`,
        title: active.skill.name,
        body: active.skill.note,
        tone: active.group.tone,
      };
    }
    return {
      key: "idle",
      eyebrow: "Readout",
      title: "How I actually use them.",
      body:
        "Hover or focus any tool to see where it turned up in the work — which project, which problem, which outcome. A filled dot means it is core to how I build; a hollow one means supporting.",
      tone: "sand" as const,
    };
  }, [active]);

  return (
    <section
      id="tools"
      data-section="tools"
      aria-labelledby="tools-heading"
      className="relative py-[clamp(6rem,14vh,11rem)]"
    >
      <h2 id="tools-heading" className="sr-only">
        03 — The tools I work with
      </h2>

      <div className="shell">
        <Marker index="03" tone="sand">
          The tools I speak
        </Marker>
        <RevealText
          text="A stack is a vocabulary, not a trophy shelf."
          as="h3"
          className="display mt-8 max-w-[18ch] text-[clamp(2.2rem,6vw,4.8rem)]"
        />

        <div className="mt-[clamp(3rem,8vh,5rem)] grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex flex-col gap-14">
            {skillGroups.map((group) => (
              <div key={group.id}>
                <div className="flex items-baseline gap-4 border-b border-line pb-3">
                  <span className="label tabular-nums text-paper-faint">{group.index}</span>
                  <h4 className="font-display text-[1.6rem] leading-none">{group.title}</h4>
                </div>
                <p className="mt-3 max-w-[54ch] text-[0.9rem] text-paper-faint">{group.premise}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <Chip
                      key={skill.name}
                      skill={skill}
                      index={i}
                      tone={group.tone}
                      isActive={active?.skill.name === skill.name}
                      dimmed={Boolean(active) && active?.group.id === group.id && active?.skill.name !== skill.name}
                      onActivate={() => setActive({ group, skill })}
                      onClear={() => setActive(null)}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Desktop readout: parks itself beside the clusters and follows along. */}
          <aside className="hidden lg:block">
            <div
              id="tool-readout"
              aria-live="polite"
              className="sticky top-[28vh] rounded-lg border border-line bg-ink-850/60 p-6 backdrop-blur-sm"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={readout.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: easeOutExpo }}
                >
                  <p
                    className="label"
                    style={{
                      color: readout.tone === "signal" ? "var(--color-signal)" : "var(--color-sand)",
                    }}
                  >
                    {readout.eyebrow}
                  </p>
                  <p className="mt-4 font-display text-[1.7rem] leading-tight">{readout.title}</p>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-paper-dim">{readout.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </div>

      {/* Touch: the readout arrives as a sheet only once something is selected. */}
      {compact ? (
        <AnimatePresence>
          {active ? (
            <motion.div
              key="sheet"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              exit={{ y: "110%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed inset-x-3 bottom-3 z-40 rounded-lg border border-line bg-ink-850/95 p-5 backdrop-blur-xl lg:hidden"
            >
              <div className="flex items-start justify-between gap-4">
                <p
                  className="label"
                  style={{
                    color: active.group.tone === "signal" ? "var(--color-signal)" : "var(--color-sand)",
                  }}
                >
                  {active.skill.name}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="label text-paper-faint"
                >
                  Close
                </button>
              </div>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-paper-dim">{active.skill.note}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </section>
  );
}
