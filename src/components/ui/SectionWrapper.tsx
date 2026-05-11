'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`relative py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="font-mono text-accent text-sm">{number}.</span>
      <h2 className="text-2xl md:text-3xl font-bold text-text-light">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-navy-lighter to-transparent ml-4" />
    </div>
  )
}
