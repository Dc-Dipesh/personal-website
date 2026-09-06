"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { profile, socials } from "@/data/profile";
import { Marker } from "@/components/primitives/Section";
import { Reveal, RevealText } from "@/components/primitives/Reveal";
import { Magnetic } from "@/components/primitives/Magnetic";
import { easeOutExpo } from "@/lib/motion";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (insecure context, denied permission) — the mailto
      // link beside this button still works, so fail quietly.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={copy}
      className="label relative flex items-center gap-2 text-paper-faint transition-colors hover:text-sand"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "idle"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
        >
          {copied ? "Copied to clipboard" : "Copy address"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Contact() {
  const { scrollTo } = useSmoothScroll();
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "0px 0px -12% 0px" });
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      data-section="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[clamp(6rem,14vh,11rem)]"
    >
      <h2 id="contact-heading" className="sr-only">
        09 — Contact and links
      </h2>

      {/* The object from the opening, sunk below the horizon. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70vh]"
        style={{
          background:
            "radial-gradient(58% 70% at 50% 118%, rgba(200,168,118,0.20), rgba(110,123,255,0.08) 45%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[28vh] -z-10 hairline"
      />

      <div className="shell">
        <Marker index="09" tone="sand">
          The end of the scroll
        </Marker>
        <RevealText
          text="You've reached the end."
          as="p"
          className="display mt-8 text-[clamp(2rem,5.5vw,4.4rem)]"
        />
        <RevealText
          text="But this could be the beginning of something else."
          as="p"
          className="display mt-2 max-w-[20ch] text-[clamp(2rem,5.5vw,4.4rem)] text-paper-faint"
          delay={0.25}
        />
      </div>

      <div ref={ctaRef} className="shell my-[clamp(3rem,10vh,7rem)]">
        <Magnetic strength={0.14} radius={1.1}>
          <a
            href={`mailto:${profile.email}?subject=Frontend%20role%20—%20let%27s%20talk`}
            data-cursor="write"
            className="group block"
          >
            <span className="display block text-[clamp(3rem,8vw,7.5rem)] leading-[0.95]">
              <span className="mask-line">
                {/* Driven by an explicit `useInView` on the wrapper rather than
                    `whileInView` — these spans sit inside Magnetic's own motion
                    tree, where the nested viewport observer does not fire. */}
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={ctaInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 1, ease: easeOutExpo }}
                >
                  Let&apos;s build
                </motion.span>
              </span>
              <span className="mask-line">
                <motion.span
                  className="flex items-baseline gap-[0.15em]"
                  initial={{ y: "110%" }}
                  animate={ctaInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 1, ease: easeOutExpo, delay: 0.08 }}
                >
                  <span className="text-sand">something</span>
                  <span
                    aria-hidden="true"
                    className="inline-block text-[0.5em] transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-1"
                  >
                    ↗
                  </span>
                </motion.span>
              </span>
            </span>

            <span className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-mono text-[clamp(0.85rem,1.4vw,1rem)] tracking-tight text-paper-dim transition-colors group-hover:text-paper">
                {profile.email}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-0 bg-sand transition-all duration-700 group-hover:w-24"
              />
            </span>
          </a>
        </Magnetic>

        <div className="mt-4">
          <CopyEmail />
        </div>
      </div>

      <div className="shell">
        <Reveal>
          <p className="label mb-5 text-paper-faint">Elsewhere</p>
        </Reveal>
        <ul className="grid gap-px border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {socials.map((social, i) => (
            <motion.li
              key={social.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: i * 0.06 }}
              className="border-b border-line lg:border-b-0"
            >
              <a
                href={social.href}
                target={social.href.startsWith("http") || social.href.endsWith(".pdf") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="group flex h-full flex-col gap-2 py-6 pr-6 transition-colors"
              >
                <span className="label text-paper-faint transition-colors group-hover:text-sand">
                  {social.label}
                </span>
                <span className="flex items-start gap-2 text-[0.98rem] leading-snug text-paper">
                  <span className="min-w-0 break-words">{social.value}</span>
                  <span
                    aria-hidden="true"
                    className="translate-y-px text-paper-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-sand"
                  >
                    ↗
                  </span>
                </span>
                <span className="text-[0.82rem] text-paper-faint">{social.hint}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <footer className="shell mt-[clamp(3rem,8vh,5rem)] border-t border-line py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label text-paper-dim">
              {profile.name} — {profile.title}
            </p>
            <p className="label mt-2 text-paper-faint">
              {profile.location} · {profile.availability}
            </p>
            <p className="label mt-2 text-paper-faint">
              <a href={profile.phoneHref} className="transition-colors hover:text-sand">
                {profile.phone}
              </a>
              <span aria-hidden="true"> · </span>
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-sand">
                {profile.email}
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <p className="label text-paper-faint">
              Next.js · TypeScript · Tailwind · Three.js · GSAP
            </p>
            <div className="flex items-center gap-6">
              <p className="label text-paper-faint">© {year}</p>
              <button
                type="button"
                onClick={() => scrollTo(0)}
                className="label text-paper-dim transition-colors hover:text-sand"
              >
                Back to the top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
