"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { Marker } from "@/components/primitives/Section";
import { Reveal, RevealText } from "@/components/primitives/Reveal";
import { ProjectVisual } from "./ProjectVisual";
import { Magnetic } from "@/components/primitives/Magnetic";
import { easeOutExpo } from "@/lib/motion";
import { useEnvironment } from "@/components/providers/Environment";

/**
 * The project's visual: a real screenshot where one exists, and the hand-drawn
 * schematic from `ProjectVisual` where it does not.
 *
 * A portrait app capture (`fit: "device"`) is centred at full height rather
 * than cropped into the 16:10 frame — cropping a phone UI to landscape throws
 * away the part that shows what the product is.
 */
function ProjectMedia({ project, active }: { project: Project; active: boolean }) {
  const shot = project.shot;

  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{
        borderColor: "var(--color-line)",
        boxShadow: `0 40px 120px -60px ${project.accent}`,
      }}
    >
      <div className="relative aspect-[16/10]">
        {!shot ? (
          <ProjectVisual visual={project.visual} accent={project.accent} play={active} />
        ) : shot.fit === "device" ? (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `radial-gradient(58% 68% at 50% 46%, ${project.accentSoft}, transparent 72%)`,
            }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="260px"
              className="h-[88%] w-auto rounded-[1.4rem] border border-line shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
            />
          </div>
        ) : (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 1279px) 92vw, 46vw"
            className="object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}

function StackRow({ stack, accent }: { stack: string[]; accent: string }) {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-2">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-paper-dim"
          style={{ borderColor: "var(--color-line)", backgroundColor: `${accent}0d` }}
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {project.live ? (
        <Magnetic>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="visit"
            className="group flex items-center gap-2 border-b border-line pb-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper transition-colors hover:border-sand hover:text-sand"
          >
            Visit live site
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </Magnetic>
      ) : (
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper-faint">
          Private client product — no public link
        </p>
      )}

      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="border-b border-line pb-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper-dim transition-colors hover:border-sand hover:text-sand"
        >
          Source ↗
        </a>
      ) : null}
    </div>
  );
}

function Panel({ project, active }: { project: Project; active: boolean }) {
  return (
    <article
      className="work-panel relative flex h-full w-screen shrink-0 items-center overflow-hidden"
      aria-label={`${project.name} — ${project.handle}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(58% 60% at 72% 40%, ${project.accentSoft}, transparent 72%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 bottom-[-3rem] select-none font-display text-[26rem] leading-none text-paper opacity-[0.03]"
      >
        {project.index}
      </span>

      <div className="shell relative grid w-full items-center gap-x-14 gap-y-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="max-w-[42rem]">
          <div className="flex items-center gap-4">
            <span className="label tabular-nums" style={{ color: project.accent }}>
              {project.index} / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
            <span className="label text-paper-faint">{project.year}</span>
          </div>

          <h3 className="display mt-5 text-[clamp(2.4rem,4.6vw,4.2rem)]">{project.name}</h3>
          <p className="mt-3 font-mono text-[0.78rem] uppercase tracking-[0.18em]" style={{ color: project.accent }}>
            {project.handle}
          </p>

          <p className="mt-7 font-display text-[clamp(1.3rem,2vw,1.85rem)] leading-[1.3] text-paper">
            {project.headline}
          </p>

          <p className="mt-5 max-w-[48ch] text-[0.95rem] leading-relaxed text-paper-dim">
            {project.problem}
          </p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-3">
            {project.challenges.map((c) => (
              <div key={c.title}>
                <dt className="border-t border-line pt-3 text-[0.85rem] leading-snug text-paper">
                  {c.title}
                </dt>
                <dd className="mt-2 text-[0.78rem] leading-relaxed text-paper-faint">{c.body}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-5">
            <StackRow stack={project.stack} accent={project.accent} />
            <Links project={project} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ProjectMedia project={project} active={active} />

          <div>
            <p className="label mb-3 text-paper-faint">Role · {project.role}</p>
            <ul className="flex flex-col gap-2">
              {project.outcome.map((o) => (
                <li key={o} className="flex gap-3 text-[0.85rem] leading-relaxed text-paper-dim">
                  <span aria-hidden="true" style={{ color: project.accent }}>
                    →
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            <p className="label mt-4 text-paper-faint">{project.context}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { allowPinning, ready } = useEnvironment();

  useEffect(() => {
    if (!ready || !allowPinning) return;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.round(self.progress * (projects.length - 1));
            setIndex((prev) => (prev === next ? prev : next));
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, pin);

    // Web fonts change panel widths; re-measure once they land.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [ready, allowPinning]);

  return (
    <section id="work" data-section="work" aria-labelledby="work-heading" className="relative">
      <h2 id="work-heading" className="sr-only">
        04 — Things I&apos;ve built
      </h2>

      <div className="shell pt-[clamp(6rem,14vh,11rem)]">
        <Marker index="04" tone="sand">
          Things I&apos;ve built
        </Marker>
        <RevealText
          text="Four products. Two of them you can open right now."
          as="h3"
          className="display mt-8 max-w-[20ch] text-[clamp(2.2rem,6vw,4.8rem)]"
        />
        <Reveal delay={1}>
          <p className="mt-6 max-w-[54ch] text-paper-dim">
            The other two are client products behind a login — so instead of a screenshot, here is
            a diagram of what each one actually does.
          </p>
        </Reveal>
      </div>

      {allowPinning ? (
        <div ref={pinRef} className="relative mt-[clamp(3rem,8vh,5rem)] h-[100svh] overflow-hidden">
          <div ref={trackRef} className="flex h-full will-change-transform">
            {projects.map((p, i) => (
              <Panel key={p.id} project={p} active={i <= index + 1} />
            ))}
          </div>

          {/* Horizontal progress — the visitor should always know where they are. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10">
            <div className="shell flex items-center gap-4">
              <span className="label tabular-nums text-paper-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-line">
                <motion.div
                  className="h-px origin-left"
                  style={{ backgroundColor: projects[index]?.accent ?? "var(--color-sand)" }}
                  animate={{ scaleX: (index + 1) / projects.length }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                />
              </div>
              <span className="label tabular-nums text-paper-faint">
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-[clamp(3rem,8vh,5rem)] flex flex-col">
          {projects.map((p) => (
            <div key={p.id} className="border-t border-line py-[clamp(3rem,8vh,5rem)]">
              <StackedPanel project={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/** Vertical rendering for touch, narrow viewports and reduced motion. */
function StackedPanel({ project }: { project: Project }) {
  return (
    <article className="shell relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: `radial-gradient(70% 40% at 50% 0%, ${project.accentSoft}, transparent 70%)` }}
      />
      <div className="flex items-center gap-4">
        <span className="label tabular-nums" style={{ color: project.accent }}>
          {project.index}
        </span>
        <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
        <span className="label text-paper-faint">{project.year}</span>
      </div>

      <h3 className="display mt-4 text-[clamp(2.2rem,9vw,3.4rem)]">{project.name}</h3>
      <p className="mt-2 font-mono text-[0.75rem] uppercase tracking-[0.18em]" style={{ color: project.accent }}>
        {project.handle}
      </p>

      <div className="mt-7">
        <ProjectMedia project={project} active />
      </div>

      <p className="mt-7 font-display text-[1.5rem] leading-tight">{project.headline}</p>
      <p className="mt-4 max-w-[52ch] text-[0.95rem] leading-relaxed text-paper-dim">{project.problem}</p>

      <dl className="mt-7 grid gap-5 sm:grid-cols-2">
        {project.challenges.map((c) => (
          <div key={c.title}>
            <dt className="border-t border-line pt-3 text-[0.9rem] text-paper">{c.title}</dt>
            <dd className="mt-2 text-[0.82rem] leading-relaxed text-paper-faint">{c.body}</dd>
          </div>
        ))}
      </dl>

      <p className="label mt-7 text-paper-faint">Role · {project.role}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {project.outcome.map((o) => (
          <li key={o} className="flex gap-3 text-[0.88rem] leading-relaxed text-paper-dim">
            <span aria-hidden="true" style={{ color: project.accent }}>
              →
            </span>
            <span>{o}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-col gap-5">
        <StackRow stack={project.stack} accent={project.accent} />
        <Links project={project} />
      </div>
    </article>
  );
}
