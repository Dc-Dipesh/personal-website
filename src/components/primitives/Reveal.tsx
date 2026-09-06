"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { easeOutExpo, fadeUp, viewportOnce } from "@/lib/motion";
import { useEnvironment } from "@/components/providers/Environment";

/**
 * Word-by-word reveal from behind a mask.
 *
 * The mask is a real overflow:hidden box per word, so descenders and italics
 * are never clipped mid-animation the way a background-clip trick would.
 */
export function RevealText({
  text,
  as = "p",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const { reducedMotion } = useEnvironment();
  const words = text.split(" ");
  // A bare ElementType collapses its props to `never`; pin it to HTML props.
  const Tag = as as ElementType<React.HTMLAttributes<HTMLElement>>;

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: 0.9, ease: easeOutExpo } },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={once ? viewportOnce : { margin: "0px 0px -18% 0px" }}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="mask-line inline-block align-bottom">
            <motion.span className={`inline-block ${wordClassName ?? ""}`} variants={word}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  span: motion.span,
} as const;

/** Generic entrance for blocks: fade + short rise, or nothing at all. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  amount,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "span";
  amount?: number;
}) {
  const { reducedMotion } = useEnvironment();
  const Component = MOTION_TAGS[as];

  if (reducedMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, amount: amount ?? 0.15 }}
    >
      {children}
    </Component>
  );
}
