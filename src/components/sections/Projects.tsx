"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import AnimatedTag from "@/components/ui/AnimatedTag";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";

const INITIAL_COUNT = 3;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      key={project.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative glass rounded-2xl overflow-hidden border border-navy-lighter hover:border-accent/30 transition-all duration-300"
      whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(100,255,218,0.08)" }}
      aria-label={project.title}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={project.image}
          alt={`Screenshot for ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/60 to-transparent" />

        {/* Hover action buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub for ${project.title}`}
              className="glass rounded-full p-3 text-text-light hover:text-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GithubIcon className="w-4.5 h-4.5" />
            </motion.a>
          )}
          <motion.a
            href={project.link}
            target={project.link !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={`Live demo for ${project.title}`}
            className="glass rounded-full p-3 text-text-light hover:text-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink size={18} />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-text-light font-bold text-lg leading-snug group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="text-text-secondary group-hover:text-accent transition-colors shrink-0 mt-1"
          />
        </div>
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <AnimatedTag key={tag} label={tag} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-accent-muted group-hover:w-full transition-all duration-500" />
    </motion.article>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState(false);

  const initial = projects.slice(0, INITIAL_COUNT);
  const extra = projects.slice(INITIAL_COUNT);

  return (
    <SectionWrapper id="projects">
      <SectionHeading number="02" title="Featured Projects" />

      <p className="text-text-secondary text-base leading-relaxed mb-10 max-w-2xl">
        A glimpse of what I&apos;ve shipped — from e-commerce platforms and
        trekking sites to Web3 wallets and encrypted cloud systems. These
        represent a{" "}
        <span className="text-accent font-mono">small selection </span> of
        projects I&apos;ve worked on across Nepal, the UAE, Australia, and the
        UK.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First row — always visible */}
        {initial.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}

        {/* Extra rows — animated in/out */}
        <AnimatePresence>
          {expanded &&
            extra.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </AnimatePresence>
      </div>

      {/* View More / Show Less */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10"
      >
        <motion.button
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-2 font-mono text-sm text-accent border border-accent rounded px-6 py-3 hover:bg-accent/10 transition-all duration-200 group"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              Show Less
              <ChevronUp
                size={15}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </>
          ) : (
            <>
              View More Projects
              <ChevronDown
                size={15}
                className="transition-transform group-hover:translate-y-0.5"
              />
              <span className="ml-1 text-accent/50 text-xs">
                +{extra.length}
              </span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* More projects note */}
    </SectionWrapper>
  );
}
