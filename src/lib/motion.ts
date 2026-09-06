import type { Transition, Variants } from "motion/react";

/**
 * One motion vocabulary for the whole site.
 *
 * Two easings and three springs, used everywhere. Consistency is what makes
 * a set of animations read as a single system rather than a pile of effects.
 */

/** Long, decisive deceleration — entrances and reveals. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
/** Symmetric — things that leave and come back, like overlays. */
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;

export const springSoft: Transition = { type: "spring", stiffness: 140, damping: 22, mass: 0.9 };
export const springSnappy: Transition = { type: "spring", stiffness: 380, damping: 32, mass: 0.6 };
export const springHeavy: Transition = { type: "spring", stiffness: 90, damping: 20, mass: 1.4 };

/** Default viewport config: fire once, slightly before the element is centred. */
export const viewportOnce = { once: true, margin: "0px 0px -18% 0px" } as const;

/** Line/word reveal from behind a mask. Parent supplies the stagger. */
export const maskRise: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number = 0) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.95, ease: easeOutExpo, delay: i * 0.055 },
  }),
};

export const fadeUp: Variants = {
  hidden: { y: 26, opacity: 0 },
  show: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOutExpo, delay: i * 0.07 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: easeOutExpo, delay: i * 0.06 },
  }),
};

export const stagger = (amount = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren } },
});

/** Draw an SVG path as it enters. */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.6, ease: easeOutExpo }, opacity: { duration: 0.2 } },
  },
};

/** Splits a sentence into words, keeping the trailing space for wrapping. */
export function toWords(text: string): string[] {
  return text.split(/(\s+)/).filter((chunk) => chunk.trim().length > 0);
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
