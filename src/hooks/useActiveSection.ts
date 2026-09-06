"use client";

import { useEffect, useState } from "react";

/**
 * Reports which `[data-section]` currently owns the reading line (40% down the
 * viewport). A plain rAF-throttled scroll read beats IntersectionObserver here
 * because sections differ wildly in height and several can intersect at once.
 */
export function useActiveSection(ids: readonly string[], fallback: string) {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = fallback;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          current = id;
          break;
        }
        if (rect.top > line) break;
        current = id;
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, fallback]);

  return active;
}
