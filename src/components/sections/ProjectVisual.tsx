"use client";

import { motion } from "motion/react";
import type { ProjectVisual as VisualKey } from "@/data/projects";
import { easeOutExpo } from "@/lib/motion";
import { useEnvironment } from "@/components/providers/Environment";

/**
 * Hand-drawn schematics, one per project.
 *
 * There are no screenshots for the private products and no stock imagery
 * anywhere, so each project gets a diagram of the thing it actually does.
 * They are plain SVG: no images to load, and they scale to any panel size.
 */

const VB = "0 0 640 400";

function Frame({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <svg viewBox={VB} className="h-full w-full" role="img" aria-label={label}>
      <rect
        x="0.5"
        y="0.5"
        width="639"
        height="399"
        rx="10"
        fill="#0b0b0e"
        stroke="rgba(237,235,230,0.10)"
      />
      <line x1="0" y1="38" x2="640" y2="38" stroke="rgba(237,235,230,0.08)" />
      <circle cx="22" cy="19" r="3.5" fill="rgba(237,235,230,0.16)" />
      <circle cx="36" cy="19" r="3.5" fill="rgba(237,235,230,0.12)" />
      <circle cx="50" cy="19" r="3.5" fill="rgba(237,235,230,0.09)" />
      <rect x="70" y="11" width="150" height="16" rx="8" fill="rgba(237,235,230,0.05)" />
      <circle cx="614" cy="19" r="4" fill={accent} opacity="0.7" />
      {children}
    </svg>
  );
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: easeOutExpo, delay: 0.2 + i * 0.09 },
  }),
};

const pop = {
  hidden: { opacity: 0, scale: 0.7 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20, delay: 0.25 + i * 0.055 },
  }),
};

const slide = {
  hidden: { opacity: 0, x: -14 },
  show: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo, delay: 0.2 + i * 0.06 },
  }),
};

/** Two chain clusters feeding one signing step. */
function WalletVisual({ accent }: { accent: string }) {
  const ring = (cx: number, cy: number, r: number, n: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
    });

  const dot = ring(180, 150, 52, 6);
  const ada = ring(430, 150, 52, 5);

  return (
    <Frame label="Diagram: a wallet reading two chains and signing one transaction" accent={accent}>
      {[
        { pts: dot, label: "POLKADOT", cx: 180 },
        { pts: ada, label: "CARDANO", cx: 430 },
      ].map((cluster, ci) => (
        <g key={cluster.label}>
          {cluster.pts.map((p, i) => (
            <motion.line
              key={`l-${i}`}
              x1={cluster.cx}
              y1={150}
              x2={p.x}
              y2={p.y}
              stroke={accent}
              strokeOpacity={0.35}
              strokeWidth={1}
              variants={draw}
              custom={ci * 3 + i * 0.4}
            />
          ))}
          {cluster.pts.map((p, i) => (
            <motion.circle
              key={`c-${i}`}
              cx={p.x}
              cy={p.y}
              r={5}
              fill="#0b0b0e"
              stroke={accent}
              strokeWidth={1.2}
              variants={pop}
              custom={ci * 4 + i}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          ))}
          <motion.circle
            cx={cluster.cx}
            cy={150}
            r={13}
            fill={accent}
            fillOpacity={0.16}
            stroke={accent}
            variants={pop}
            custom={ci}
            style={{ transformOrigin: `${cluster.cx}px 150px` }}
          />
          <motion.text
            x={cluster.cx}
            y={228}
            textAnchor="middle"
            fill="rgba(237,235,230,0.5)"
            fontSize="9"
            letterSpacing="2.4"
            fontFamily="var(--font-mono)"
            variants={slide}
            custom={ci * 2}
          >
            {cluster.label}
          </motion.text>
        </g>
      ))}

      {/* One signing surface for both ecosystems. */}
      <motion.rect
        x="120"
        y="278"
        width="400"
        height="66"
        rx="8"
        fill="rgba(237,235,230,0.03)"
        stroke="rgba(237,235,230,0.14)"
        variants={slide}
        custom={4}
      />
      <motion.text
        x="140"
        y="304"
        fill="rgba(237,235,230,0.65)"
        fontSize="10"
        letterSpacing="2"
        fontFamily="var(--font-mono)"
        variants={slide}
        custom={5}
      >
        REVIEW → SIGN
      </motion.text>
      <motion.rect
        x="140"
        y="316"
        width="300"
        height="4"
        rx="2"
        fill={accent}
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: { scaleX: 1, opacity: 1, transition: { duration: 1.2, ease: easeOutExpo, delay: 0.9 } },
        }}
        style={{ transformOrigin: "140px 318px" }}
      />
      <motion.path
        d="M 462 312 l 9 10 l 18 -20"
        fill="none"
        stroke={accent}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={9}
      />
    </Frame>
  );
}

/** Plaintext turning to ciphertext as it crosses the upload boundary. */
function VaultVisual({ accent }: { accent: string }) {
  const rows = [0, 1, 2, 3];
  return (
    <Frame label="Diagram: files encrypted in the browser before upload" accent={accent}>
      <motion.text
        x="42"
        y="78"
        fill="rgba(237,235,230,0.45)"
        fontSize="9"
        letterSpacing="2.4"
        fontFamily="var(--font-mono)"
        variants={slide}
      >
        BROWSER
      </motion.text>
      <motion.text
        x="470"
        y="78"
        fill="rgba(237,235,230,0.45)"
        fontSize="9"
        letterSpacing="2.4"
        fontFamily="var(--font-mono)"
        variants={slide}
        custom={1}
      >
        SERVER
      </motion.text>

      {/* The encryption boundary. Nothing readable crosses it. */}
      <motion.line
        x1="320"
        y1="60"
        x2="320"
        y2="360"
        stroke={accent}
        strokeOpacity={0.5}
        strokeDasharray="4 5"
        variants={draw}
        custom={1}
      />

      {rows.map((r) => {
        const y = 108 + r * 58;
        return (
          <g key={r}>
            <motion.rect
              x="42"
              y={y}
              width="230"
              height="40"
              rx="6"
              fill="rgba(237,235,230,0.035)"
              stroke="rgba(237,235,230,0.10)"
              variants={slide}
              custom={r}
            />
            {[0, 1].map((k) => (
              <motion.rect
                key={k}
                x={58}
                y={y + 13 + k * 11}
                width={k === 0 ? 150 : 108}
                height="5"
                rx="2.5"
                fill="rgba(237,235,230,0.28)"
                variants={slide}
                custom={r + k * 0.4}
              />
            ))}

            <motion.rect
              x="368"
              y={y}
              width="230"
              height="40"
              rx="6"
              fill="rgba(237,235,230,0.02)"
              stroke="rgba(237,235,230,0.08)"
              variants={slide}
              custom={r + 2}
            />
            {Array.from({ length: 12 }).map((_, k) => (
              <motion.rect
                key={k}
                x={384 + k * 17}
                y={y + 14}
                width="11"
                height="12"
                rx="2"
                fill={accent}
                fillOpacity={0.22 + ((r * 7 + k * 5) % 4) * 0.12}
                variants={pop}
                custom={r * 3 + k * 0.5}
                style={{ transformOrigin: `${390 + k * 17}px ${y + 20}px` }}
              />
            ))}

            <motion.path
              d={`M 276 ${y + 20} L 364 ${y + 20}`}
              stroke="rgba(237,235,230,0.25)"
              strokeWidth={1}
              variants={draw}
              custom={r + 3}
            />
          </g>
        );
      })}

      {/* SRP: a proof crosses, the password never does. */}
      <motion.circle
        cx="320"
        cy="368"
        r="12"
        fill="#0b0b0e"
        stroke={accent}
        strokeWidth={1.4}
        variants={pop}
        custom={8}
        style={{ transformOrigin: "320px 368px" }}
      />
      <motion.path
        d="M 316 368 v -5 a 4 4 0 0 1 8 0 v 5"
        fill="none"
        stroke={accent}
        strokeWidth={1.4}
        variants={draw}
        custom={8}
      />
    </Frame>
  );
}

/** Contours, an ascending route, day markers. */
function RidgeVisual({ accent }: { accent: string }) {
  const ridges = [
    { d: "M 0 330 C 90 300 130 250 200 262 C 268 274 300 214 372 226 C 450 239 508 190 640 214", o: 0.9 },
    { d: "M 0 356 C 110 336 160 292 236 302 C 316 313 356 262 430 272 C 520 284 560 246 640 256", o: 0.55 },
    { d: "M 0 380 C 120 368 190 336 274 344 C 360 352 404 314 486 322 C 566 330 596 302 640 306", o: 0.3 },
  ];

  const stops = [
    { x: 92, y: 322, d: "01" },
    { x: 236, y: 268, d: "04" },
    { x: 392, y: 232, d: "08" },
    { x: 540, y: 206, d: "12" },
  ];

  return (
    <Frame label="Diagram: a trek itinerary plotted across a ridge line" accent={accent}>
      {ridges.map((r, i) => (
        <motion.path
          key={i}
          d={r.d}
          fill="none"
          stroke={accent}
          strokeOpacity={r.o}
          strokeWidth={1.2}
          variants={draw}
          custom={i}
        />
      ))}

      <motion.path
        d="M 60 344 C 150 332 190 292 262 278 C 344 262 400 240 470 224 C 528 211 568 198 596 190"
        fill="none"
        stroke="rgba(237,235,230,0.75)"
        strokeWidth={1.6}
        strokeDasharray="5 6"
        variants={draw}
        custom={3}
      />

      {stops.map((s, i) => (
        <g key={s.d}>
          <motion.circle
            cx={s.x}
            cy={s.y}
            r={5.5}
            fill="#0b0b0e"
            stroke="rgba(237,235,230,0.85)"
            strokeWidth={1.4}
            variants={pop}
            custom={i + 4}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          />
          <motion.text
            x={s.x}
            y={s.y - 14}
            textAnchor="middle"
            fill="rgba(237,235,230,0.55)"
            fontSize="9"
            letterSpacing="1.6"
            fontFamily="var(--font-mono)"
            variants={slide}
            custom={i + 4}
          >
            DAY {s.d}
          </motion.text>
        </g>
      ))}

      <motion.g variants={slide} custom={2}>
        <rect x="42" y="66" width="176" height="54" rx="6" fill="rgba(237,235,230,0.03)" stroke="rgba(237,235,230,0.10)" />
        <text x="58" y="88" fill="rgba(237,235,230,0.6)" fontSize="9" letterSpacing="2.2" fontFamily="var(--font-mono)">
          SEARCH ROUTES
        </text>
        <rect x="58" y="98" width="94" height="5" rx="2.5" fill={accent} fillOpacity="0.55" />
      </motion.g>

      <motion.text
        x="596"
        y="176"
        textAnchor="end"
        fill={accent}
        fontSize="10"
        letterSpacing="2.4"
        fontFamily="var(--font-mono)"
        variants={slide}
        custom={7}
      >
        SUMMIT
      </motion.text>
    </Frame>
  );
}

/** Filters, a product grid, and the load-time delta. */
function StorefrontVisual({ accent }: { accent: string }) {
  const cards = [0, 1, 2, 3, 4, 5];
  return (
    <Frame label="Diagram: filtered product grid and the load-time improvement" accent={accent}>
      <motion.text
        x="42"
        y="74"
        fill="rgba(237,235,230,0.45)"
        fontSize="9"
        letterSpacing="2.4"
        fontFamily="var(--font-mono)"
        variants={slide}
      >
        FILTERS
      </motion.text>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.g key={i} variants={slide} custom={i}>
          <rect x="42" y={92 + i * 26} width="12" height="12" rx="3" fill="none" stroke="rgba(237,235,230,0.25)" />
          {i < 2 ? <rect x="45" y={95 + i * 26} width="6" height="6" rx="1.5" fill={accent} /> : null}
          <rect
            x="64"
            y={96 + i * 26}
            width={i % 2 ? 66 : 84}
            height="5"
            rx="2.5"
            fill="rgba(237,235,230,0.2)"
          />
        </motion.g>
      ))}

      {cards.map((i) => {
        const x = 190 + (i % 3) * 150;
        const y = 80 + Math.floor(i / 3) * 130;
        return (
          <motion.g key={i} variants={pop} custom={i} style={{ transformOrigin: `${x + 62}px ${y + 55}px` }}>
            <rect x={x} y={y} width="124" height="110" rx="7" fill="rgba(237,235,230,0.03)" stroke="rgba(237,235,230,0.10)" />
            <rect x={x + 14} y={y + 16} width="96" height="52" rx="4" fill={accent} fillOpacity={0.10 + (i % 3) * 0.05} />
            <rect x={x + 14} y={y + 78} width="70" height="5" rx="2.5" fill="rgba(237,235,230,0.24)" />
            <rect x={x + 14} y={y + 89} width="40" height="5" rx="2.5" fill="rgba(237,235,230,0.14)" />
          </motion.g>
        );
      })}

      <motion.text
        x="190"
        y="346"
        fill="rgba(237,235,230,0.45)"
        fontSize="9"
        letterSpacing="2.4"
        fontFamily="var(--font-mono)"
        variants={slide}
        custom={6}
      >
        LOAD TIME
      </motion.text>
      <motion.rect
        x="190"
        y="356"
        width="330"
        height="6"
        rx="3"
        fill="rgba(237,235,230,0.12)"
        variants={slide}
        custom={6}
      />
      <motion.rect
        x="190"
        y="356"
        width="231"
        height="6"
        rx="3"
        fill={accent}
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 1.1, ease: easeOutExpo, delay: 0.75 } },
        }}
        style={{ transformOrigin: "190px 359px" }}
      />
      <motion.text
        x="534"
        y="363"
        fill={accent}
        fontSize="11"
        letterSpacing="1.6"
        fontFamily="var(--font-mono)"
        variants={slide}
        custom={8}
      >
        −30%
      </motion.text>
    </Frame>
  );
}

const VISUALS: Record<VisualKey, (props: { accent: string }) => React.ReactElement> = {
  wallet: WalletVisual,
  vault: VaultVisual,
  ridge: RidgeVisual,
  storefront: StorefrontVisual,
};

export function ProjectVisual({
  visual,
  accent,
  play = true,
}: {
  visual: VisualKey;
  accent: string;
  play?: boolean;
}) {
  const { reducedMotion } = useEnvironment();
  const Visual = VISUALS[visual];

  return (
    <motion.div
      className="h-full w-full"
      initial="hidden"
      animate={reducedMotion || play ? "show" : "hidden"}
      variants={{ hidden: {}, show: {} }}
    >
      <Visual accent={accent} />
    </motion.div>
  );
}
