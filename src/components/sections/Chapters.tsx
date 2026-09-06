"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { chapters } from "@/data/experience";
import { profile } from "@/data/profile";
import { Marker } from "@/components/primitives/Section";
import { Reveal, RevealText } from "@/components/primitives/Reveal";
import { easeOutExpo } from "@/lib/motion";
import { useEnvironment } from "@/components/providers/Environment";

const TONE = {
  sand: "var(--color-sand)",
  signal: "var(--color-signal)",
  neutral: "var(--color-paper-faint)",
} as const;

export function Chapters() {
  // The current role opens by default — it is what a recruiter came for.
  const [open, setOpen] = useState<string | null>(chapters[chapters.length - 1].id);
  const { reducedMotion } = useEnvironment();

  return (
    <section
      id="chapters"
      data-section="chapters"
      aria-labelledby="chapters-heading"
      className="relative py-[clamp(6rem,14vh,11rem)]"
    >
      <h2 id="chapters-heading" className="sr-only">
        06 — Selected experience
      </h2>

      <div className="shell">
        <Marker index="06" tone="sand">
          Selected experience
        </Marker>
        <RevealText
          text="Read it as chapters, not as a resume."
          as="h3"
          className="display mt-8 max-w-[18ch] text-[clamp(2.2rem,6vw,4.8rem)]"
        />
        <Reveal delay={1}>
          <p className="mt-6 max-w-[52ch] text-paper-dim">
            Same dates and titles as the PDF — with room to say what each one actually involved.
          </p>
        </Reveal>

        <div className="mt-[clamp(3rem,8vh,5rem)]">
          {chapters.map((chapter) => {
            const isOpen = open === chapter.id;
            const accent = TONE[chapter.tone];
            return (
              <article key={chapter.id} className="relative border-t border-line last:border-b">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : chapter.id)}
                    aria-expanded={isOpen}
                    aria-controls={`chapter-${chapter.id}`}
                    className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-5 gap-y-2 py-7 text-left sm:gap-x-8"
                  >
                    <span className="label pt-2 tabular-nums" style={{ color: accent }}>
                      {chapter.chapter}
                    </span>

                    <span className="min-w-0">
                      <span className="display block text-[clamp(1.5rem,3.6vw,2.6rem)] transition-colors duration-300 group-hover:text-sand">
                        {chapter.title}
                      </span>
                      <span className="mt-2 block text-[0.92rem] text-paper-dim">
                        {chapter.role}
                        <span className="text-paper-faint"> · </span>
                        {chapter.org}
                      </span>
                      <span className="label mt-2 block text-paper-faint sm:hidden">
                        {chapter.period}
                      </span>
                    </span>

                    <span className="flex items-center gap-5 pt-2">
                      <span className="label hidden whitespace-nowrap text-paper-faint sm:block">
                        {chapter.period}
                      </span>
                      <motion.span
                        aria-hidden="true"
                        className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
                        style={{ borderColor: isOpen ? accent : "var(--color-line-strong)" }}
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ duration: 0.4, ease: easeOutExpo }}
                      >
                        <span className="absolute h-px w-2.5 bg-current" style={{ color: accent }} />
                        <span className="absolute h-2.5 w-px bg-current" style={{ color: accent }} />
                      </motion.span>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`chapter-${chapter.id}`}
                      key="body"
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-x-8 gap-y-6 pb-10 sm:grid-cols-[auto_minmax(0,1fr)] sm:pl-0">
                        <div className="label hidden w-[3ch] sm:block" aria-hidden="true" />
                        <div className="max-w-[70ch]">
                          <p className="label mb-6" style={{ color: accent }}>
                            {chapter.place}
                          </p>
                          <p className="mb-6 font-display text-[clamp(1.15rem,1.8vw,1.5rem)] leading-snug text-paper">
                            {chapter.precis}
                          </p>
                          <ul className="flex flex-col gap-3">
                            {chapter.points.map((point, i) => (
                              <motion.li
                                key={point}
                                initial={reducedMotion ? false : { opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.08 + i * 0.06 }}
                                className="flex gap-4 text-[0.92rem] leading-relaxed text-paper-dim"
                              >
                                <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0" style={{ backgroundColor: accent }} />
                                <span>{point}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center gap-2 border-b border-line pb-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper transition-colors hover:border-sand hover:text-sand"
          >
            Download the one-page CV
            <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <p className="label text-paper-faint">
            {profile.education.degree} · {profile.education.school}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
