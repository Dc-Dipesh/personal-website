"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEnvironment } from "./Environment";

type ScrollApi = {
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const noop: ScrollApi = {
  scrollTo: (target) => {
    if (typeof window === "undefined") return;
    if (typeof target === "number") window.scrollTo({ top: target });
    else if (typeof target === "string") document.querySelector(target)?.scrollIntoView();
    else target.scrollIntoView();
  },
  stop: () => {},
  start: () => {},
};

const ScrollContext = createContext<ScrollApi>(noop);

/**
 * Lenis drives the page, and GSAP's ticker drives Lenis — one animation loop
 * for smooth scroll and every ScrollTrigger, so they can never disagree about
 * the current scroll position.
 *
 * Reduced motion opts out entirely: native scrolling, no rAF loop.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { ready, reducedMotion } = useEnvironment();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [ready, reducedMotion]);

  const scrollTo = useCallback((target: string | number | HTMLElement, offset = 0) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.4 });
      return;
    }
    noop.scrollTo(target, offset);
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return (
    <ScrollContext.Provider value={{ scrollTo, stop, start }}>{children}</ScrollContext.Provider>
  );
}

export const useSmoothScroll = () => useContext(ScrollContext);
