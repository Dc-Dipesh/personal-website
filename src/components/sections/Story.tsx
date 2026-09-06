"use client";

import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { openingBeats } from "@/data/narrative";
import { Marker } from "@/components/primitives/Section";
import { RevealText } from "@/components/primitives/Reveal";
import { useEnvironment } from "@/components/providers/Environment";
import { easeOutExpo } from "@/lib/motion";

type Beat = (typeof openingBeats)[number];

/**
 * Scroll-linked style values become native scroll animations, whose keyframe
 * offsets must sit inside 0…1, never step backwards, and never collapse onto
 * each other — two stops at the same offset produce a degenerate keyframe list
 * and the browser then ramps the value across the whole timeline instead of
 * the intended window. Hence the enforced gap rather than a hairline one.
 */
const MIN_GAP = 0.004;

function ordered(values: number[]): number[] {
  let previous = -1;
  return values.map((value) => {
    const clamped = Math.min(1, Math.max(0, value));
    const next = clamped > previous + MIN_GAP ? clamped : Math.min(1, previous + MIN_GAP);
    previous = next;
    return next;
  });
}

/**
 * The window and the values a beat travels through.
 *
 * The first beat cannot fade in on the scrub: its window would open at
 * progress 0, which is the instant the panel pins, so any fade there reads as
 * a pop. It is held visible and given a real entrance instead (see `entered`).
 * The last beat holds rather than fading out, so the closing line is still on
 * screen when the panel unpins. Both therefore need three stops, not four —
 * padding them out to four is exactly what creates the degenerate keyframes.
 */
function beatTrack(index: number, total: number) {
  const span = 1 / total;
  const start = index * span;

  const enter = start - span * 0.35;
  const settle = start + span * 0.2;
  const hold = start + span * 0.75;
  const leave = start + span * 1.1;

  // Every track spans the whole 0…1 timeline with flat tails rather than
  // relying on out-of-range clamping: a scroll-linked value handed to WAAPI
  // does not reliably hold its last keyframe past the end of its window, and
  // a beat that quietly fades back in ruins the crossfade.
  if (index === 0) {
    return {
      stops: ordered([0, hold, leave, 1]),
      opacity: [1, 1, 0, 0],
      y: [0, 0, -64, -64],
      scale: [1, 1, 0.97, 0.97],
    };
  }

  if (index === total - 1) {
    return {
      stops: ordered([0, enter, settle, 1]),
      opacity: [0, 0, 1, 1],
      y: [64, 64, 0, 0],
      scale: [0.97, 0.97, 1, 1],
    };
  }

  return {
    stops: ordered([0, enter, settle, hold, leave, 1]),
    opacity: [0, 0, 1, 1, 0, 0],
    y: [64, 64, 0, 0, -64, -64],
    scale: [0.97, 0.97, 1, 1, 0.97, 0.97],
  };
}

/**
 * One sentence at a time. Each beat owns a slice of the scroll and cross-fades
 * in place, so the visitor reads rather than skims — the text is the animation.
 *
 * Only opacity, translate and scale are animated: a filter on a full-screen
 * block would repaint on every scroll frame.
 */
function Beat({
  beat,
  index,
  total,
  progress,
  entered,
}: {
  beat: Beat;
  index: number;
  total: number;
  progress: MotionValue<number>;
  /** True once the pinned panel has scrolled into view — drives beat one. */
  entered: boolean;
}) {
  const track = beatTrack(index, total);

  const opacity = useTransform(progress, track.stops, track.opacity);
  const y = useTransform(progress, track.stops, track.y);
  const scale = useTransform(progress, track.stops, track.scale);

  const isFirst = index === 0;
  const rise = { y: entered ? "0%" : "108%" };

  return (
    <motion.div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
      style={{ opacity, y, scale }}
      aria-hidden="true"
    >
      <div className="shell">
        <motion.p
          className="label mb-6 text-sand tabular-nums"
          initial={isFirst ? { opacity: 0 } : false}
          animate={isFirst ? { opacity: entered ? 1 : 0 } : undefined}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.1 }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.p>

        <p className="display max-w-[22ch] text-[clamp(2rem,6.2vw,5.2rem)]">
          {isFirst ? (
            <span className="mask-line">
              <motion.span
                className="block"
                initial={{ y: "108%" }}
                animate={rise}
                transition={{ duration: 1, ease: easeOutExpo, delay: 0.15 }}
              >
                {beat.kicker}
              </motion.span>
            </span>
          ) : (
            beat.kicker
          )}
        </p>

        <motion.p
          className="mt-8 max-w-[46ch] text-[clamp(1rem,1.5vw,1.35rem)] leading-relaxed text-paper-dim"
          initial={isFirst ? { opacity: 0, y: 18 } : false}
          animate={isFirst ? { opacity: entered ? 1 : 0, y: entered ? 0 : 18 } : undefined}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.35 }}
        >
          {beat.body}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useEnvironment();
  const total = openingBeats.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Fires while the panel is still travelling up the viewport, before the
  // scrub owns anything — that is the window the first beat animates in.
  const entered = useInView(panelRef, { once: true, amount: 0.6 });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reducedMotion) {
    return (
      <section
        id="story"
        data-section="story"
        aria-labelledby="story-heading"
        className="shell py-32"
      >
        <h2 id="story-heading" className="sr-only">
          01 — The beginning: how I started
        </h2>
        <Marker index="01" tone="sand" className="mb-16">
          The beginning
        </Marker>
        <ol className="flex flex-col gap-24">
          {openingBeats.map((beat) => (
            <li key={beat.id}>
              <RevealText
                text={beat.kicker}
                as="p"
                className="display max-w-[22ch] text-[clamp(2rem,6vw,4.5rem)]"
              />
              <p className="mt-6 max-w-[46ch] text-paper-dim">{beat.body}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section id="story" data-section="story" aria-labelledby="story-heading">
      <h2 id="story-heading" className="sr-only">
        01 — The beginning: how I started
      </h2>

      {/* The full text, always in the DOM for search engines and screen readers. */}
      <div className="sr-only">
        {openingBeats.map((beat) => (
          <p key={beat.id}>
            {beat.kicker} {beat.body}
          </p>
        ))}
      </div>

      <div ref={ref} style={{ height: `${total * 85}vh` }} className="relative">
        <div ref={panelRef} className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.55] blueprint"
          />

          <div className="shell absolute inset-x-0 top-[clamp(5rem,12vh,8rem)] z-10">
            <Marker index="01" tone="sand">
              The beginning
            </Marker>
          </div>

          {openingBeats.map((beat, i) => (
            <Beat
              key={beat.id}
              beat={beat}
              index={i}
              total={total}
              progress={scrollYProgress}
              entered={entered}
            />
          ))}

          <div className="absolute inset-x-0 bottom-[clamp(3rem,8vh,5rem)]">
            <div className="shell">
              <div className="h-px w-full max-w-md bg-line">
                <motion.div
                  className="h-px origin-left bg-sand"
                  style={{ scaleX: railScale }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
