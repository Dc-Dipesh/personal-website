"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { exploring } from "@/data/narrative";
import { Marker } from "@/components/primitives/Section";
import { Reveal, RevealText } from "@/components/primitives/Reveal";
import { easeOutExpo } from "@/lib/motion";
import { useEnvironment } from "@/components/providers/Environment";

const TICKS = 22;

const STATUS_TONE: Record<string, string> = {
  Shipping: "var(--color-sand)",
  Deepening: "var(--color-signal)",
  Exploring: "rgba(237,235,230,0.55)",
  Reading: "var(--color-paper-faint)",
};

/**
 * An instrument readout rather than a tag cloud: each interest gets a status
 * and a signal strength, so "exploring" and "shipping" are visibly different
 * claims. The sweep is the only decorative part.
 */
export function Exploring() {
  const [hover, setHover] = useState<string | null>(null);
  const { reducedMotion } = useEnvironment();

  return (
    <section
      id="next"
      data-section="next"
      aria-labelledby="next-heading"
      className="relative py-[clamp(6rem,14vh,11rem)]"
    >
      <h2 id="next-heading" className="sr-only">
        08 — What I&apos;m exploring
      </h2>

      <div className="shell">
        <Marker index="08" tone="signal">
          What I&apos;m exploring
        </Marker>
        <RevealText
          text="Where the next four years are pointed."
          as="h3"
          className="display mt-8 max-w-[18ch] text-[clamp(2.2rem,6vw,4.8rem)]"
        />
        <Reveal delay={1}>
          <p className="mt-6 max-w-[52ch] text-paper-dim">
            Honest signal strength. Two of these are in production today; the rest are somewhere
            between a side project and a stack of open tabs.
          </p>
        </Reveal>

        <div className="relative mt-[clamp(3rem,8vh,5rem)] overflow-hidden rounded-xl border border-line bg-ink-850/40">
          <div aria-hidden="true" className="absolute inset-0 blueprint opacity-40" />

          {!reducedMotion ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-sand/[0.06] to-transparent"
              animate={{ x: ["-10%", "1000%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
          ) : null}

          <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-line px-5 py-3 sm:px-7">
            <span className="label text-paper-faint">Topic</span>
            <span className="label text-paper-faint">Status · Signal</span>
          </div>

          <ul className="relative">
            {exploring.map((item, i) => {
              const filled = Math.round(item.intensity * TICKS);
              const tone = STATUS_TONE[item.status] ?? "var(--color-paper-dim)";
              const lit = hover === item.label;

              return (
                <motion.li
                  key={item.label}
                  onMouseEnter={() => setHover(item.label)}
                  onMouseLeave={() => setHover(null)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.6, ease: easeOutExpo, delay: i * 0.05 }}
                  className="grid grid-cols-1 items-baseline gap-x-6 gap-y-3 border-b border-line px-5 py-6 transition-colors duration-300 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-7"
                  style={{ backgroundColor: lit ? "rgba(237,235,230,0.02)" : "transparent" }}
                >
                  <div className="min-w-0">
                    <p
                      className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] leading-none transition-colors duration-300"
                      style={{ color: lit ? tone : "var(--color-paper)" }}
                    >
                      {item.label}
                    </p>
                    <p className="mt-3 max-w-[56ch] text-[0.88rem] leading-relaxed text-paper-dim">
                      {item.note}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 sm:justify-end">
                    <span
                      className="label whitespace-nowrap tabular-nums"
                      style={{ color: tone }}
                    >
                      {item.status}
                    </span>
                    <span
                      className="flex items-center gap-[3px]"
                      role="img"
                      aria-label={`Signal strength ${Math.round(item.intensity * 100)} percent`}
                    >
                      {Array.from({ length: TICKS }).map((_, t) => (
                        <motion.span
                          key={t}
                          className="block w-[2px] rounded-full"
                          style={{
                            height: 6 + (t % 3) * 3,
                            backgroundColor: t < filled ? tone : "rgba(237,235,230,0.12)",
                          }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.32,
                            ease: easeOutExpo,
                            delay: 0.15 + i * 0.05 + t * 0.012,
                          }}
                        />
                      ))}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
