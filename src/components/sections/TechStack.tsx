"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/techStack";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  web3: "Web3 & Blockchain",
  tools: "Tools & Workflow",
  testing: "Testing & Performance",
};

const categoryOrder = ["frontend", "web3", "tools", "testing"] as const;

export default function TechStack() {
  const grouped = categoryOrder.reduce(
    (acc, cat) => {
      acc[cat] = techStack.filter((t) => t.category === cat);
      return acc;
    },
    {} as Record<string, typeof techStack>,
  );

  return (
    <SectionWrapper id="stack">
      <SectionHeading number="03" title="Tech Stack" />

      {/* Central orbit visualization */}
      {/* <div className="flex justify-center mb-16" aria-hidden="true">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full glass border border-accent/40 flex items-center justify-center shadow-lg shadow-accent/20"
            >
              <span className="font-mono text-accent text-sm font-bold text-center leading-tight">
                {"<DC/>"}
              </span>
            </motion.div>
          </div>

          <OrbitRing
            items={techStack
              .filter((t) => t.category === "frontend")
              .slice(0, 4)}
            radius={85}
            duration={25}
            direction={1}
          />

          <OrbitRing
            items={techStack.filter((t) => t.category === "web3")}
            radius={130}
            duration={35}
            direction={-1}
          />
          
          <OrbitRing
            items={techStack.filter((t) => t.category === "tools").slice(0, 4)}
            radius={175}
            duration={50}
            direction={1}
            className="hidden md:block"
          />
        </div>
      </div> */}

      {/* Category grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryOrder.map((cat, catIndex) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
            className="glass rounded-2xl p-5 border border-navy-lighter hover:border-accent/20 transition-colors duration-300"
          >
            <h3 className="font-mono text-accent text-xs mb-4 uppercase tracking-widest">
              {categoryLabels[cat]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {grouped[cat].map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1.5 glass rounded-lg px-3 py-1.5 text-sm text-text-secondary hover:text-text-light transition-colors cursor-default"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: tech.color,
                      boxShadow: `0 0 6px ${tech.color}60`,
                    }}
                  />
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ------------------------------------------------------------------ */
/* Orbit ring sub-component                                             */
/* ------------------------------------------------------------------ */

interface OrbitRingProps {
  items: { name: string; initials: string; color: string }[];
  radius: number;
  duration: number;
  direction: 1 | -1;
  className?: string;
}

function OrbitRing({
  items,
  radius,
  duration,
  direction,
  className = "",
}: OrbitRingProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Visible ring */}
      <div
        className="absolute rounded-full border border-dashed border-accent/10"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      {/* Orbiting items */}
      {items.map((item, i) => {
        const angle = (360 / items.length) * i;
        return (
          <motion.div
            key={item.name}
            className="absolute"
            style={{
              width: radius * 2,
              height: radius * 2,
              top: "50%",
              left: "50%",
              marginTop: -radius,
              marginLeft: -radius,
            }}
            animate={{ rotate: direction * 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: `rotate(${angle}deg) translateY(-${radius}px) translateX(-50%)`,
              }}
              animate={{ rotate: direction * -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                whileHover={{ scale: 1.3 }}
                className="w-10 h-10 rounded-full glass border flex items-center justify-center shadow-lg cursor-default group"
                style={{
                  borderColor: `${item.color}40`,
                  boxShadow: `0 0 12px ${item.color}20`,
                }}
                title={item.name}
              >
                <span
                  className="font-mono text-[9px] font-bold leading-none"
                  style={{ color: item.color }}
                >
                  {item.initials}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
