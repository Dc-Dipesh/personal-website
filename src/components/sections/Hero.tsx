"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo } from "@/lib/motion";
import { profile } from "@/data/profile";
import { useEnvironment } from "@/components/providers/Environment";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

/** WebGL never reaches the server and never blocks first paint. */
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const NAME_LINES = [profile.firstName.toUpperCase(), profile.lastName.toUpperCase()];

function Letters({ text, delay = 0, play }: { text: string; delay?: number; play: boolean }) {
  return (
    <span className="mask-line">
      <span className="flex">
        {text.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block"
            initial={{ y: "115%" }}
            animate={play ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 1.1, ease: easeOutExpo, delay: delay + i * 0.035 }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [sceneActive, setSceneActive] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const { allowWebGL, compact, reducedMotion } = useEnvironment();
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    // Stop rendering the scene once it is off screen — no frames, no battery.
    const shouldRun = v < 0.98;
    setSceneActive((prev) => (prev === shouldRun ? prev : shouldRun));
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // The WebGL bundle is the heaviest thing on the page. Hold it back until the
  // browser is idle so the type, not the shader, owns first paint.
  useEffect(() => {
    if (!allowWebGL) return;

    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(() => setSceneReady(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(handle);
    }

    const timer = window.setTimeout(() => setSceneReady(true), 450);
    return () => window.clearTimeout(timer);
  }, [allowWebGL]);

  return (
    <section
      ref={ref}
      id="opening"
      data-section="opening"
      aria-labelledby="opening-heading"
      className="relative grid min-h-[100svh] grid-rows-[auto_1fr_auto] overflow-hidden pb-8 pt-24"
    >
      {/* Depth: a warm pool of light behind the object, a cold one below it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 62% 42%, rgba(200,168,118,0.16), transparent 70%), radial-gradient(45% 40% at 25% 78%, rgba(110,123,255,0.12), transparent 72%)",
        }}
      />

      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Always painted: the silhouette the scene fades in over, and the
            only visual on devices that never get WebGL. */}
        <div className="absolute left-1/2 top-[42%] h-[min(62vw,32rem)] w-[min(62vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_38%_32%,rgba(200,168,118,0.30),rgba(110,123,255,0.14)_45%,transparent_70%)] blur-2xl lg:left-[68%]" />

        {allowWebGL && sceneReady ? (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo }}
          >
            <HeroScene
              progressRef={progressRef}
              active={sceneActive}
              particleCount={compact ? 500 : 1200}
              compact={compact}
            />
          </motion.div>
        ) : null}
      </div>

      <div className="shell flex items-start justify-between">
        <motion.p
          className="label text-paper-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {profile.title}
        </motion.p>
        <motion.p
          className="label hidden text-right text-paper-faint sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {profile.location}
          <br />
          <span className="text-paper-dim">UTC+05:45 · Remote</span>
        </motion.p>
      </div>

      <motion.div
        className="shell relative self-end pb-[clamp(1rem,5vh,4rem)]"
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <h1 id="opening-heading" className="display text-[clamp(3.2rem,13.5vw,12.5rem)]">
          <span className="sr-only">
            {profile.name} — {profile.role}. {profile.tagline}
          </span>
          <span aria-hidden="true" className="block">
            {NAME_LINES.map((line, i) => (
              <span key={line} className="block">
                <Letters text={line} delay={0.1 + i * 0.12} play={started} />
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-xl font-display text-[clamp(1.35rem,2.6vw,2.1rem)] leading-[1.25] text-paper"
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: easeOutExpo, delay: 0.75 }}
        >
          Building experiences,{" "}
          <span className="italic text-paper-dim">not just interfaces.</span>
        </motion.p>
      </motion.div>

      <div className="shell flex items-end justify-between gap-6">
        <motion.a
          href="#story"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#story", 0);
          }}
          className="group label flex items-center gap-3 text-paper-dim transition-colors hover:text-sand"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Scroll to explore
          <span className="relative block h-8 w-px overflow-hidden bg-line-strong" aria-hidden="true">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-sand"
              animate={{ y: [-12, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span aria-hidden="true">↓</span>
        </motion.a>

        <motion.p
          className="label hidden max-w-[16rem] text-right leading-relaxed text-paper-faint sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {profile.yearsOfExperience} years · React, Next.js, TypeScript
          <br />
          Web2 &amp; Web3
        </motion.p>
      </div>
    </section>
  );
}
