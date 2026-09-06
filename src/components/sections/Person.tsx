"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { personal } from "@/data/narrative";
import { profile } from "@/data/profile";
import { Marker } from "@/components/primitives/Section";
import { Reveal, RevealText } from "@/components/primitives/Reveal";
import { useEnvironment } from "@/components/providers/Environment";

/**
 * Portrait slot.
 *
 * No photo has been supplied, so this renders an identity plate instead of a
 * placeholder box: same frame, same field labels, no broken image. Drop a file
 * at `public/portrait.jpg` and set `profile.portrait` to swap it for the photo.
 */
function PortraitPanel() {
  const { reducedMotion } = useEnvironment();

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-ink-850">
      {profile.portrait ? (
        <Image
          src={profile.portrait}
          alt={`${profile.name}, ${profile.title}`}
          fill
          sizes="(max-width: 1024px) 90vw, 34vw"
          className="object-cover"
          priority={false}
        />
      ) : (
        <>
          <div aria-hidden="true" className="absolute inset-0 blueprint opacity-70" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 55% at 50% 30%, rgba(200,168,118,0.16), transparent 70%)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-display text-[min(38vw,17rem)] leading-none text-paper opacity-[0.10]"
          >
            {profile.initials}
          </span>

          {!reducedMotion ? (
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-sand/10 to-transparent"
              animate={{ y: ["-10%", "420%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
        </>
      )}

      {/* Field labels sit on top of either version. */}
      <div className="absolute inset-x-0 bottom-0 border-t border-line bg-ink-900/70 p-5 backdrop-blur-sm">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
          {personal.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="label text-paper-faint">{fact.label}</dt>
              <dd className="mt-1 text-[0.85rem] leading-snug text-paper">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function Person() {
  const ref = useRef<HTMLElement>(null);
  const { reducedMotion } = useEnvironment();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={ref}
      id="about"
      data-section="about"
      aria-labelledby="about-heading"
      className="relative py-[clamp(6rem,14vh,11rem)]"
    >
      <h2 id="about-heading" className="sr-only">
        07 — About Dipesh Chaulagain
      </h2>

      <div className="shell">
        <Marker index="07" tone="sand">
          The developer behind the screen
        </Marker>

        <div className="mt-[clamp(2.5rem,7vh,4.5rem)] grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <motion.div style={reducedMotion ? undefined : { y }} className="lg:sticky lg:top-32">
            <PortraitPanel />
          </motion.div>

          <div>
            <RevealText
              text={personal.greeting}
              as="h3"
              className="display text-[clamp(2.2rem,5.5vw,4.4rem)]"
            />

            <div className="mt-8 flex max-w-[58ch] flex-col gap-6">
              {personal.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.6}>
                  <p className="text-[clamp(0.98rem,1.25vw,1.1rem)] leading-relaxed text-paper-dim">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={3} className="mt-10 border-t border-line pt-6">
              <p className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] leading-snug text-paper">
                {profile.tagline}
              </p>
              <p className="label mt-4 text-paper-faint">
                {profile.name} · {profile.title}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
