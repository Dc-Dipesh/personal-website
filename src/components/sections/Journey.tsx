"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import { milestones } from "@/data/experience";
import { Marker } from "@/components/primitives/Section";
import { RevealText } from "@/components/primitives/Reveal";
import { easeOutExpo } from "@/lib/motion";
import { useEnvironment } from "@/components/providers/Environment";

/**
 * Normalised positions — the SVG and the HTML cards read from the same array.
 *
 * The route stays inside the middle band so the cards that hang above and below
 * each node still land inside the block.
 */
const NODES = [
  { x: 0.11, y: 0.65 },
  { x: 0.305, y: 0.545 },
  { x: 0.5, y: 0.47 },
  { x: 0.695, y: 0.35 },
  { x: 0.89, y: 0.26 },
] as const;

const VB = { w: 1000, h: 400 };

/**
 * Catmull-Rom through the nodes, converted to cubic beziers.
 * Guarantees the drawn route passes exactly through every milestone dot.
 */
function smoothPath(points: readonly { x: number; y: number }[]) {
  const p = points.map((n) => ({ x: n.x * VB.w, y: n.y * VB.h }));
  let d = `M ${p[0].x.toFixed(2)},${p[0].y.toFixed(2)}`;

  for (let i = 0; i < p.length - 1; i += 1) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;

    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };

    d += ` C ${c1.x.toFixed(2)},${c1.y.toFixed(2)} ${c2.x.toFixed(2)},${c2.y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useEnvironment();
  const d = useMemo(() => smoothPath(NODES), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const glow = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section
      id="journey"
      data-section="journey"
      aria-labelledby="journey-heading"
      className="relative py-[clamp(6rem,14vh,11rem)]"
    >
      <div className="shell">
        <Marker index="02" tone="sand">
          My evolution
        </Marker>
        <RevealText
          text="Nobody arrives fully formed."
          as="h3"
          className="display mt-8 max-w-[16ch] text-[clamp(2.2rem,6vw,4.8rem)]"
        />
        <p className="mt-6 max-w-[52ch] text-paper-dim">
          Five stages, four years, three companies and one degree — in the order they actually
          happened.
        </p>
      </div>

      <h2 id="journey-heading" className="sr-only">
        02 — My evolution as a developer
      </h2>

      <div ref={ref} className="shell mt-[clamp(3rem,8vh,6rem)]">
        {/* Wide route on desktop — the milestones climb left to right. */}
        <div className="relative hidden h-[clamp(26rem,36vw,36rem)] lg:block">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="route" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#6b6862" />
                <stop offset="55%" stopColor="#c8a876" />
                <stop offset="100%" stopColor="#6e7bff" />
              </linearGradient>
            </defs>

            {/* Ghost of the whole route, so the destination is visible from the start. */}
            <path
              d={d}
              fill="none"
              stroke="currentColor"
              className="text-line"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              strokeDasharray="4 6"
            />

            <motion.path
              d={d}
              fill="none"
              stroke="url(#route)"
              strokeWidth={1.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reducedMotion ? 1 : draw }}
            />

            {/* A packet running the finished route. */}
            {!reducedMotion ? (
              <motion.path
                d={d}
                fill="none"
                stroke="#edebe6"
                strokeWidth={2.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                strokeDasharray="0.012 0.988"
                style={{ opacity: glow }}
                animate={{ strokeDashoffset: [0, -1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />
            ) : null}

          </svg>

          {/* Nodes live in HTML, not in the SVG: the viewBox is stretched to the
              block's aspect ratio, which would turn circles into ellipses. */}
          {NODES.map((n, i) => (
            <div
              key={`node-${i}`}
              className="absolute -ml-[7px] -mt-[7px]"
              style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
            >
              <motion.span
                className="block h-3.5 w-3.5 rounded-full border bg-ink-900"
                style={{ borderColor: i === NODES.length - 1 ? "#6e7bff" : "#c8a876" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.25 + i * 0.16 }}
              />
            </div>
          ))}

          {milestones.map((m, i) => {
            const node = NODES[i];
            const above = i % 2 === 1;
            return (
              // Outer box owns the layout transform; the inner one owns motion,
              // so the two never overwrite each other's `transform`.
              <div
                key={m.key}
                className="absolute w-[12rem]"
                style={{
                  left: `${node.x * 100}%`,
                  top: `${node.y * 100}%`,
                  transform: `translate(-50%, ${above ? "calc(-100% - 2.5rem)" : "2.5rem"})`,
                }}
              >
                <motion.article
                  initial={{ opacity: 0, y: above ? 18 : -18, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                  transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.35 + i * 0.16 }}
                >
                  <p className="label text-sand tabular-nums">{m.year}</p>
                  <h4 className="display mt-2 text-[1.9rem]">{m.label}</h4>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-paper-dim">{m.caption}</p>
                </motion.article>
              </div>
            );
          })}
        </div>

        {/* Compact: the same route, turned on its side. */}
        <ol className="relative lg:hidden">
          <div aria-hidden="true" className="absolute bottom-4 left-[7px] top-2 w-px bg-line" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[7px] top-2 w-px origin-top bg-gradient-to-b from-sand to-signal"
            style={{ bottom: "1rem", scaleY: reducedMotion ? 1 : draw }}
          />
          {milestones.map((m, i) => (
            <motion.li
              key={m.key}
              className="relative flex gap-6 pb-12 pl-0"
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: i * 0.06 }}
            >
              <span
                aria-hidden="true"
                className="relative z-10 mt-2 h-[15px] w-[15px] shrink-0 rounded-full border border-sand bg-ink-900"
              />
              <div>
                <p className="label text-sand tabular-nums">{m.year}</p>
                <h4 className="display mt-1 text-[1.75rem]">{m.label}</h4>
                <p className="mt-2 max-w-[38ch] text-[0.9rem] leading-relaxed text-paper-dim">
                  {m.caption}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
