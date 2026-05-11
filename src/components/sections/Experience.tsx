'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, TrendingUp, ExternalLink } from 'lucide-react'
import { experiences } from '@/data/experience'
import SectionWrapper, { SectionHeading } from '@/components/ui/SectionWrapper'

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading number="01" title="Work Experience" />

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent"
          aria-hidden="true"
        />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className="absolute left-0 md:left-4 top-6 w-8 h-8 rounded-full glass border border-accent/40 flex items-center justify-center shadow-lg shadow-accent/10"
                aria-hidden="true"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              </motion.div>

              {/* Card */}
              <motion.div
                className="glass glass-hover rounded-2xl p-6 md:p-8 cursor-default"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-text-light text-xl font-bold mb-1">{exp.role}</h3>
                    <p className="text-accent font-mono text-sm font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-text-secondary text-xs font-mono">
                      <Calendar size={12} className="text-accent/60" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                      <MapPin size={12} className="text-accent/60" />
                      {exp.location} · {exp.type}
                    </div>
                  </div>
                </div>

                {/* Metric badge */}
                {exp.metric && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                    className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-5"
                  >
                    <TrendingUp size={13} className="text-accent" />
                    <span className="text-accent font-mono text-sm font-semibold">{exp.metric}</span>
                  </motion.div>
                )}

                {/* Achievements */}
                <ul className="space-y-2.5" role="list">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.06 }}
                      className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                    >
                      <span className="text-accent mt-1.5 flex-shrink-0 text-xs">▹</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative pl-12 md:pl-20 mt-12"
        >
          <div
            className="absolute left-0 md:left-4 top-6 w-8 h-8 rounded-full glass border border-accent/30 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
          </div>

          <div className="glass rounded-2xl p-6 md:p-8 border border-navy-lighter">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h3 className="text-text-light text-lg font-bold mb-1">
                  Bachelor&apos;s Degree — Computer Systems Engineering
                </h3>
                <p className="text-accent font-mono text-sm">University of Sunderland</p>
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary text-xs font-mono flex-shrink-0">
                <Calendar size={12} className="text-accent/60" />
                Sep 2019 – Jan 2023
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
