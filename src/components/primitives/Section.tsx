import type { ReactNode } from "react";

/**
 * Small mono eyebrow that opens every section.
 * Optionally prefixed with the section number so the rail and the page agree.
 */
export function Marker({
  children,
  index,
  tone = "dim",
  className,
}: {
  children: ReactNode;
  index?: string;
  tone?: "dim" | "sand" | "signal";
  className?: string;
}) {
  const color =
    tone === "sand" ? "text-sand" : tone === "signal" ? "text-signal" : "text-paper-faint";
  return (
    <p className={`label flex items-center gap-3 ${color} ${className ?? ""}`}>
      {index ? (
        <span className="text-paper-faint tabular-nums" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
