"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { layers } from "@/data/narrative";
import { Marker } from "@/components/primitives/Section";
import { Reveal, RevealText } from "@/components/primitives/Reveal";
import { Schematic } from "./Schematic";
import { easeOutExpo } from "@/lib/motion";

export function Craft() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const current = layers[active];

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    setActive((prev) => {
      const last = layers.length - 1;
      const next =
        event.key === "ArrowDown"
          ? prev === last
            ? 0
            : prev + 1
          : event.key === "ArrowUp"
            ? prev === 0
              ? last
              : prev - 1
            : event.key === "Home"
              ? 0
              : last;
      tabsRef.current[next]?.focus();
      return next;
    });
  }, []);

  return (
    <section
      id="craft"
      data-section="craft"
      aria-labelledby="craft-heading"
      className="relative py-[clamp(6rem,14vh,11rem)]"
    >
      <h2 id="craft-heading" className="sr-only">
        05 — Behind the interface: how I think
      </h2>

      <div className="shell">
        <Marker index="05" tone="signal">
          Behind the interface
        </Marker>
        <RevealText
          text="The interface is only the surface."
          as="h3"
          className="display mt-8 max-w-[16ch] text-[clamp(2.2rem,6vw,4.8rem)]"
        />
        <Reveal delay={1}>
          <p className="mt-6 max-w-[54ch] text-paper-dim">
            Nine decisions that sit under the visual layer. Pick one — the diagram is the
            explanation, and the line underneath it says where I made it.
          </p>
        </Reveal>

        <div className="mt-[clamp(3rem,8vh,5rem)] grid gap-x-14 gap-y-10 lg:grid-cols-[17rem_minmax(0,1fr)]">
          {/* A scrolling strip below lg so the diagram stays next to its
              controls instead of nine rows away from them. */}
          <div
            role="tablist"
            aria-label="Engineering concerns"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-[var(--shell-x)] flex gap-2 overflow-x-auto px-[var(--shell-x)] pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {layers.map((layer, i) => {
              const selected = i === active;
              return (
                <button
                  key={layer.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`craft-tab-${layer.id}`}
                  aria-selected={selected}
                  aria-controls="craft-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`group relative flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2 text-left transition-colors duration-300 lg:gap-4 lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-3 ${
                    selected ? "border-signal bg-signal/10" : "border-line"
                  }`}
                >
                  <span
                    className={`label tabular-nums transition-colors duration-300 ${
                      selected ? "text-signal" : "text-paper-faint"
                    }`}
                  >
                    {layer.index}
                  </span>
                  <span
                    className={`text-[0.9rem] transition-colors duration-300 lg:text-[0.95rem] ${
                      selected ? "text-paper" : "text-paper-dim group-hover:text-paper"
                    }`}
                  >
                    {layer.title}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    className="ml-auto hidden h-px bg-signal lg:block"
                    animate={{ width: selected ? 24 : 0, opacity: selected ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                  />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id="craft-panel"
            aria-labelledby={`craft-tab-${current.id}`}
            tabIndex={0}
            className="min-w-0"
          >
            <div className="overflow-hidden rounded-xl border border-line bg-ink-850/50">
              <div className="aspect-[520/320] w-full">
                <AnimatePresence mode="wait">
                  <Schematic key={current.id} kind={current.id} title={current.title} />
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                className="mt-8"
              >
                <p className="font-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.25]">
                  {current.claim}
                </p>
                <p className="mt-5 max-w-[58ch] text-[0.95rem] leading-relaxed text-paper-dim">
                  {current.detail}
                </p>
                <p className="mt-6 flex gap-3 border-t border-line pt-4 font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.1em] text-paper-faint">
                  <span aria-hidden="true" className="text-signal">
                    ↳
                  </span>
                  <span>{current.evidence}</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
