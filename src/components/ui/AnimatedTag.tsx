'use client'

interface AnimatedTagProps {
  label: string
  index?: number
}

export default function AnimatedTag({ label }: AnimatedTagProps) {
  return (
    <span className="inline-block font-mono text-xs text-accent bg-accent/10 border border-accent/20 rounded px-2 py-0.5 transition-all duration-200 hover:bg-accent/20 hover:border-accent/40">
      {label}
    </span>
  )
}
