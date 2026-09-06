"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import { easeInOutQuint, easeOutExpo } from "@/lib/motion";
import { useEnvironment } from "@/components/providers/Environment";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { profile } from "@/data/profile";

const COLUMNS = 6;
const KEY = "dc-intro-seen";

/**
 * A short count-in, then the panel drops away in columns.
 *
 * Skipped entirely for reduced motion and for anyone who has already seen it
 * this session — an intro is only an intro the first time.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const { ready, reducedMotion } = useEnvironment();
  const { stop, start } = useSmoothScroll();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!ready) return;

    const seen = typeof sessionStorage !== "undefined" && sessionStorage.getItem(KEY) === "1";
    if (reducedMotion || seen) {
      // Deliberate extra commit: whether to show an intro at all depends on
      // sessionStorage and a media query, neither of which exists on the
      // server. One synchronous re-render here beats a flash of the panel.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
      onDone();
      return;
    }

    stop();
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.4, 0, 0.1, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        sessionStorage.setItem(KEY, "1");
        window.setTimeout(() => {
          setOpen(false);
          document.body.style.overflow = "";
          start();
          onDone();
        }, 260);
      },
    });

    return () => {
      controls.stop();
      document.body.style.overflow = "";
      start();
    };
  }, [ready, reducedMotion, onDone, stop, start]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[80] flex items-end"
          exit={{ transition: { duration: 0.1 } }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex">
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-ink-900"
                initial={{ y: "0%" }}
                exit={{
                  y: "-101%",
                  transition: {
                    duration: 0.85,
                    ease: easeInOutQuint,
                    delay: i * 0.055,
                  },
                }}
              />
            ))}
          </div>

          <motion.div
            className="shell relative z-10 flex w-full items-end justify-between pb-[clamp(2rem,6vh,4rem)]"
            exit={{ opacity: 0, y: -30, transition: { duration: 0.45, ease: easeOutExpo } }}
          >
            <div>
              <p className="label text-paper-faint">{profile.name}</p>
              <p className="label mt-2 text-sand">{profile.role}</p>
            </div>
            <p className="display text-[clamp(3rem,12vw,9rem)] tabular-nums text-paper/90">
              {String(count).padStart(3, "0")}
            </p>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 z-10 h-px bg-sand"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0.2, ease: "linear" }}
            exit={{ opacity: 0 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
