"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { sections } from "@/data/narrative";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useEnvironment } from "@/components/providers/Environment";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { easeOutExpo } from "@/lib/motion";

const navItems = sections.filter((s) => s.nav);
const allIds = sections.map((s) => s.id);

/** Local clock for Kathmandu — a small sign that a person lives behind this. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: profile.timeZone,
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <span className="tabular-nums">
      {time} <span className="text-paper-faint">KTM</span>
    </span>
  );
}

export function Nav({ visible }: { visible: boolean }) {
  const active = useActiveSection(allIds, "opening");
  const { compact } = useEnvironment();
  const { scrollTo } = useSmoothScroll();
  const [open, setOpen] = useState(false);
  const [railHover, setRailHover] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const activeIndex = useMemo(
    () => sections.find((s) => s.id === active)?.index ?? "00",
    [active],
  );

  const go = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      setOpen(false);
      scrollTo(`#${id}`, 0);
      // Keep the URL shareable without letting the browser jump the scroll.
      window.history.replaceState(null, "", `#${id}`);
    },
    [scrollTo],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Reading progress — the one element that is always on screen. */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-sand via-sand to-signal"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
      >
        <div className="shell flex items-center justify-between py-5">
          <a
            href="#opening"
            onClick={(e) => go(e, "opening")}
            className="label text-paper transition-colors hover:text-sand"
          >
            {profile.name}
          </a>

          <div className="label hidden items-center gap-6 text-paper-dim lg:flex">
            <LocalTime />
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="motion-only absolute inline-flex h-full w-full animate-ping rounded-full bg-sand opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sand" />
              </span>
              Open to work
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="label flex items-center gap-2 text-paper transition-colors hover:text-sand lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="tabular-nums">{activeIndex}</span>
            <span className="flex w-4 flex-col gap-[3px]" aria-hidden="true">
              <motion.span
                className="h-px w-full bg-current"
                animate={{ rotate: open ? 45 : 0, y: open ? 2 : 0 }}
              />
              <motion.span
                className="h-px w-full bg-current"
                animate={{ rotate: open ? -45 : 0, y: open ? -2 : 0 }}
              />
            </span>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </motion.header>

      {/* Desktop rail: numbers always, labels on hover or when active. */}
      {!compact ? (
        <motion.nav
          aria-label="Sections"
          className="fixed left-[clamp(0.9rem,1.6vw,1.6rem)] top-1/2 z-50 hidden -translate-y-1/2 lg:block"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -14 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
          onMouseEnter={() => setRailHover(true)}
          onMouseLeave={() => setRailHover(false)}
        >
          {/* Backdrop appears only while the labels do, so they stay readable
              over whatever section is behind the rail. */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-x-3 -inset-y-3 rounded-xl border border-line bg-ink-900/85 backdrop-blur-md"
            animate={{ opacity: railHover ? 1 : 0 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
          />
          <ul className="relative flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.id === active;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex items-center gap-3 py-1.5"
                  >
                    <span
                      className={`label tabular-nums transition-colors duration-300 ${
                        isActive ? "text-sand" : "text-paper-faint group-hover:text-paper-dim"
                      }`}
                    >
                      {item.index}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className={`h-px transition-colors duration-300 ${
                        isActive ? "bg-sand" : "bg-line-strong"
                      }`}
                      animate={{ width: isActive ? 22 : 10 }}
                      transition={{ duration: 0.5, ease: easeOutExpo }}
                    />
                    {/* Labels only on deliberate hover: at rest the rail is a
                        column of numbers, so it never sits over the content. */}
                    <motion.span
                      className={`label whitespace-nowrap transition-colors duration-300 ${
                        isActive ? "text-sand" : "text-paper-dim"
                      }`}
                      animate={{ opacity: railHover ? 1 : 0, x: railHover ? 0 : -6 }}
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                    >
                      {item.label}
                    </motion.span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      ) : null}

      {/* Mobile overlay */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Sections"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-900/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="shell flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: easeOutExpo }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    className="flex items-baseline gap-4 border-b border-line py-4"
                    aria-current={item.id === active ? "true" : undefined}
                  >
                    <span className="label tabular-nums text-sand">{item.index}</span>
                    <span className="display text-[2rem]">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
