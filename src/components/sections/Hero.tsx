"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Shield, Zap, Globe } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const typewriterWords = [
  "React Developer.",
  "Next.js Engineer.",
  "TypeScript Expert.",
  "Web3 Builder.",
  "E2EE Architect.",
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < word.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    setDisplayed(word.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

function GridBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* Radial fade from center */}
      <div
        className="absolute inset-0 bg-radial-gradient"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, #0A192F 100%)",
        }}
      />
      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl opacity-10"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-10"
      />
    </div>
  );
}

// Deterministic particle positions — seeded to avoid SSR/client mismatch
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const t = (i * 137.508) % 100; // golden-angle spread
  return {
    id: i,
    x: (t * 1.618 + i * 5.3) % 100,
    y: (t * 0.618 + i * 7.1) % 100,
    size: 1.5 + (i % 3) * 0.8,
    duration: 12 + (i % 5) * 3,
    delay: (i % 6) * 0.8,
  };
});

function FloatingParticles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.2,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const socialLinks = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/dipesh-chaulagain",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/in/dipesh-chaulagain-4143641a4",
  },
  { icon: Mail, label: "Email", href: "mailto:dipesh@nuvoladigital.io" },
];

const highlights = [
  { icon: Zap, label: "4+ Years Experience" },
  { icon: Globe, label: "React · Next.js · TypeScript" },
  { icon: Shield, label: "Web3 & E2EE Specialist" },
];

export default function Hero() {
  const typed = useTypewriter(typewriterWords);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 overflow-hidden"
      aria-label="Introduction"
    >
      <GridBackground />
      <FloatingParticles />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div>
          {/* Pre-heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-accent text-sm mb-4"
          >
            Hi, my name is
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-light leading-tight mb-2"
          >
            Dipesh
            <br />
            Chaulagain
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-text-secondary mb-6 h-10"
            aria-live="polite"
            aria-label={`Currently: ${typed}`}
          >
            <span className="font-mono text-accent">{typed}</span>
            <span className="animate-pulse text-accent">|</span>
          </motion.div>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-xl md:text-2xl font-semibold text-text-light mb-4 max-w-lg leading-snug"
          >
            Building Secure, Scalable
            <span className="text-accent"> Web3 </span>
            &amp;
            <span className="text-accent"> Frontend </span>
            Solutions.
          </motion.p>

          {/* Sub description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="text-text-secondary text-base max-w-lg mb-8 leading-relaxed"
          >
            Frontend Developer with 4 years crafting pixel-perfect interfaces,
            Web3 dApps, and End-to-End Encrypted cloud systems across Nepal and
            the UAE.
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-text-secondary"
              >
                <Icon size={14} className="text-accent shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-accent text-navy font-semibold px-6 py-3 rounded-lg hover:bg-accent-muted transition-all duration-200 shadow-lg shadow-accent/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(100,255,218,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 border border-accent text-accent font-semibold px-6 py-3 rounded-lg hover:bg-accent/10 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-5"
          >
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={label}
                className="text-text-secondary hover:text-accent transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right — profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="hidden lg:flex justify-center items-center"
        >
          <div className="relative">
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto w-72 h-72 rounded-full border border-dashed border-accent/20"
              style={{
                top: "-16px",
                left: "-16px",
                width: "calc(100% + 32px)",
                height: "calc(100% + 32px)",
              }}
            />
            {/* Profile image placeholder */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64 rounded-2xl glass overflow-hidden border border-accent/20 shadow-2xl shadow-accent/10"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <span className="font-mono text-2xl font-bold text-accent">
                    DC
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-text-light font-semibold">
                    Dipesh Chaulagain
                  </p>
                  <p className="text-accent font-mono text-xs mt-1">
                    Frontend Developer
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  {["React", "Web3", "E2EE"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono bg-accent/10 text-accent border border-accent/20 rounded px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/5 rounded-tr-full" />
            </motion.div>

            {/* Floating stat badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -top-6 -right-8 glass rounded-xl px-4 py-2 text-sm border border-accent/20"
            >
              <span className="text-accent font-mono font-bold text-base">
                4
              </span>
              <span className="text-text-secondary ml-1 text-xs">yrs exp</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-4 -left-10 glass rounded-xl px-4 py-2 text-sm border border-accent/20"
            >
              <span className="text-accent font-mono font-bold text-base">
                30%
              </span>
              <span className="text-text-secondary ml-1 text-xs">
                faster loads
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={18} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
