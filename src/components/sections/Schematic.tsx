"use client";

import { motion } from "motion/react";
import type { Schematic as SchematicKey } from "@/data/narrative";
import { easeOutExpo } from "@/lib/motion";

/**
 * Nine small engineering diagrams, drawn from one vocabulary: boxes, wires,
 * packets and captions. They replay whenever the selection changes, which is
 * what makes the concept legible rather than decorative.
 */

const SAND = "#c8a876";
const SIGNAL = "#6e7bff";
const INK = "#0b0b0e";
const EDGE = "rgba(237,235,230,0.14)";
const FILL = "rgba(237,235,230,0.035)";
const TEXT = "rgba(237,235,230,0.55)";

const wire = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutExpo, delay: 0.12 + i * 0.07 },
  }),
};

const pop = {
  hidden: { opacity: 0, scale: 0.82 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 22, delay: 0.1 + i * 0.06 },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 6 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo, delay: 0.18 + i * 0.06 },
  }),
};

function Box({
  x,
  y,
  w,
  h,
  label,
  accent,
  order = 0,
  solid,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  accent?: string;
  order?: number;
  solid?: boolean;
}) {
  return (
    <motion.g variants={pop} custom={order} style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill={solid ? `${accent ?? SAND}1f` : FILL}
        stroke={accent ?? EDGE}
        strokeWidth={1}
      />
      {label ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 3.5}
          textAnchor="middle"
          fontSize="9"
          letterSpacing="1.6"
          fontFamily="var(--font-mono)"
          fill={accent ?? TEXT}
        >
          {label}
        </text>
      ) : null}
    </motion.g>
  );
}

function Wire({ d, accent, order = 0, dashed }: { d: string; accent?: string; order?: number; dashed?: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={accent ?? "rgba(237,235,230,0.28)"}
      strokeWidth={1.1}
      strokeDasharray={dashed ? "4 5" : undefined}
      variants={wire}
      custom={order}
    />
  );
}

function Cap({ x, y, children, accent, order = 0, anchor = "start" }: {
  x: number;
  y: number;
  children: string;
  accent?: string;
  order?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="9"
      letterSpacing="2"
      fontFamily="var(--font-mono)"
      fill={accent ?? TEXT}
      variants={fade}
      custom={order}
    >
      {children}
    </motion.text>
  );
}

/* ---------------------------------------------------------------- diagrams */

function Component() {
  const kids = [
    { x: 90, y: 150 },
    { x: 300, y: 150 },
  ];
  const leaves = [40, 160, 250, 370];
  return (
    <>
      <Box x={190} y={50} w={140} h={38} label="LAYOUT" accent={SAND} solid order={0} />
      {kids.map((k, i) => (
        <g key={i}>
          <Wire d={`M 260 88 L 260 118 L ${k.x + 65} 118 L ${k.x + 65} 150`} order={i} />
          <Box x={k.x} y={150} w={130} h={36} label={i === 0 ? "LIST" : "DETAIL"} order={i + 1} />
        </g>
      ))}
      {leaves.map((x, i) => (
        <g key={x}>
          <Wire d={`M ${i < 2 ? 155 : 365} 186 L ${i < 2 ? 155 : 365} 212 L ${x + 45} 212 L ${x + 45} 240`} order={i + 2} />
          <Box x={x} y={240} w={90} h={32} label={["CARD", "CARD", "META", "ACTION"][i]} order={i + 3} />
        </g>
      ))}
      <Cap x={30} y={40} order={5}>
        PROPS DOWN
      </Cap>
      <Wire d="M 34 52 L 34 262" accent={SAND} order={6} dashed />
      <Cap x={490} y={40} anchor="end" order={6}>
        EVENTS UP
      </Cap>
      <Wire d="M 486 262 L 486 52" accent={SIGNAL} order={7} dashed />
    </>
  );
}

function State() {
  const subs = [
    { x: 40, y: 220 },
    { x: 205, y: 250 },
    { x: 370, y: 220 },
  ];
  return (
    <>
      <Box x={185} y={40} w={150} h={34} label="ACTION" accent={SIGNAL} order={0} />
      <Wire d="M 260 74 L 260 112" accent={SIGNAL} order={0} />
      <motion.g variants={pop} custom={1} style={{ transformOrigin: "260px 152px" }}>
        <path
          d="M 260 112 L 302 132 L 302 172 L 260 192 L 218 172 L 218 132 Z"
          fill={`${SAND}22`}
          stroke={SAND}
        />
        <text x="260" y="156" textAnchor="middle" fontSize="9" letterSpacing="1.8" fontFamily="var(--font-mono)" fill={SAND}>
          STORE
        </text>
      </motion.g>
      {subs.map((s, i) => (
        <g key={i}>
          <Wire d={`M 260 192 L 260 210 L ${s.x + 55} 210 L ${s.x + 55} ${s.y}`} order={i + 1} />
          <Box x={s.x} y={s.y} w={110} h={32} label={["VIEW", "VIEW", "VIEW"][i]} order={i + 2} />
        </g>
      ))}
      <Cap x={30} y={160} order={5}>
        ONE OWNER
      </Cap>
      <Cap x={490} y={160} anchor="end" order={6}>
        MANY READERS
      </Cap>
    </>
  );
}

function Data() {
  return (
    <>
      <Box x={30} y={130} w={120} h={54} label="COMPONENT" order={0} />
      <Box x={200} y={130} w={120} h={54} label="CACHE" accent={SAND} solid order={1} />
      <Box x={370} y={130} w={120} h={54} label="API" accent={SIGNAL} order={2} />

      <Wire d="M 150 148 L 200 148" order={0} />
      <Wire d="M 320 148 L 370 148" accent={SIGNAL} order={1} />
      <Wire d="M 370 168 L 320 168" accent={SIGNAL} order={2} />
      <Wire d="M 200 168 L 150 168" order={3} />

      <Cap x={175} y={112} anchor="middle" order={3}>
        READ
      </Cap>
      <Cap x={345} y={112} anchor="middle" accent={SIGNAL} order={4}>
        FETCH
      </Cap>
      <Cap x={345} y={200} anchor="middle" accent={SIGNAL} order={5}>
        REVALIDATE
      </Cap>
      <Cap x={175} y={200} anchor="middle" order={6}>
        RENDER
      </Cap>

      <motion.g variants={fade} custom={7}>
        <rect x="200" y="238" width="120" height="26" rx="13" fill={`${SAND}14`} stroke={SAND} />
        <text x="260" y="255" textAnchor="middle" fontSize="8.5" letterSpacing="1.6" fontFamily="var(--font-mono)" fill={SAND}>
          NO DUPLICATE CALLS
        </text>
      </motion.g>
      <Wire d="M 260 184 L 260 238" accent={SAND} order={7} dashed />
    </>
  );
}

function Performance() {
  const before = [180, 250, 300, 360];
  const after = [110, 150, 180, 220];
  return (
    <>
      <Cap x={30} y={54} order={0}>
        BEFORE
      </Cap>
      {before.map((w, i) => (
        <motion.rect
          key={`b-${i}`}
          x={30}
          y={68 + i * 18}
          width={w}
          height={8}
          rx={4}
          fill="rgba(237,235,230,0.16)"
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.7, ease: easeOutExpo, delay: 0.1 + i * 0.06 } },
          }}
          style={{ transformOrigin: "30px 0px" }}
        />
      ))}

      <Cap x={30} y={188} accent={SAND} order={4}>
        AFTER
      </Cap>
      {after.map((w, i) => (
        <motion.rect
          key={`a-${i}`}
          x={30}
          y={202 + i * 18}
          width={w}
          height={8}
          rx={4}
          fill={SAND}
          fillOpacity={0.85}
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.8, ease: easeOutExpo, delay: 0.45 + i * 0.07 } },
          }}
          style={{ transformOrigin: "30px 0px" }}
        />
      ))}

      <Wire d="M 250 44 L 250 288" accent={SIGNAL} order={6} dashed />
      <Cap x={258} y={40} accent={SIGNAL} order={7}>
        BUDGET
      </Cap>
      <Cap x={490} y={288} anchor="end" accent={SAND} order={8}>
        −30% LOAD TIME
      </Cap>
    </>
  );
}

function Seo() {
  return (
    <>
      <Box x={30} y={120} w={116} h={50} label="DATA" order={0} />
      <Wire d="M 146 145 L 196 145" order={0} />
      <Box x={196} y={120} w={128} h={50} label="SERVER" accent={SAND} solid order={1} />
      <Wire d="M 324 145 L 374 145" accent={SAND} order={1} />
      <Box x={374} y={120} w={116} h={50} label="HTML" accent={SAND} order={2} />

      <Wire d="M 432 170 L 432 216" accent={SAND} order={3} />
      <Box x={366} y={216} w={132} h={44} label="CRAWLER" order={4} />

      <motion.g variants={fade} custom={5}>
        <rect x="30" y="216" width="270" height="44" rx="6" fill={FILL} stroke={EDGE} />
        <text x="46" y="236" fontSize="9" letterSpacing="1.8" fontFamily="var(--font-mono)" fill={TEXT}>
          SITEMAP.XML · ROBOTS.TXT
        </text>
        <text x="46" y="250" fontSize="9" letterSpacing="1.8" fontFamily="var(--font-mono)" fill={TEXT}>
          OPEN GRAPH METADATA
        </text>
      </motion.g>
      <Wire d="M 300 238 L 360 238" order={6} dashed />
      <Cap x={260} y={100} anchor="middle" order={7}>
        RENDERED, NOT PROMISED
      </Cap>
    </>
  );
}

function Auth() {
  const rows = [
    { y: 110, label: "CLIENT PUBLIC VALUE", dir: 1 },
    { y: 158, label: "SERVER PUBLIC VALUE", dir: -1 },
    { y: 206, label: "PROOF OF KNOWLEDGE", dir: 1 },
  ];
  return (
    <>
      <Box x={26} y={54} w={130} h={34} label="CLIENT" accent={SIGNAL} order={0} />
      <Box x={364} y={54} w={130} h={34} label="SERVER" order={1} />
      <Wire d="M 91 88 L 91 268" order={0} dashed />
      <Wire d="M 429 88 L 429 268" order={1} dashed />

      {rows.map((r, i) => (
        <g key={r.label}>
          <Wire
            d={r.dir > 0 ? `M 96 ${r.y} L 424 ${r.y}` : `M 424 ${r.y} L 96 ${r.y}`}
            accent={i === 2 ? SIGNAL : undefined}
            order={i + 2}
          />
          <Cap x={260} y={r.y - 8} anchor="middle" accent={i === 2 ? SIGNAL : undefined} order={i + 2}>
            {r.label}
          </Cap>
        </g>
      ))}

      <motion.g variants={fade} custom={6}>
        <rect x="150" y="246" width="220" height="30" rx="15" fill="rgba(237,235,230,0.03)" stroke={EDGE} />
        <text x="260" y="265" textAnchor="middle" fontSize="8.5" letterSpacing="1.6" fontFamily="var(--font-mono)" fill={TEXT}>
          PASSWORD NEVER SENT
        </text>
        <line x1="176" y1="276" x2="344" y2="246" stroke={SIGNAL} strokeWidth="1" opacity="0.7" />
      </motion.g>
    </>
  );
}

function Web3() {
  const steps = ["BUILD", "REVIEW", "SIGN", "BROADCAST"];
  return (
    <>
      {steps.map((s, i) => (
        <g key={s}>
          <Box
            x={26 + i * 122}
            y={130}
            w={104}
            h={54}
            label={s}
            accent={i === 2 ? SIGNAL : undefined}
            solid={i === 2}
            order={i}
          />
          {i < steps.length - 1 ? (
            <Wire d={`M ${130 + i * 122} 157 L ${148 + i * 122} 157`} accent={i === 1 ? SIGNAL : undefined} order={i} />
          ) : null}
        </g>
      ))}

      <motion.g variants={pop} custom={4} style={{ transformOrigin: "278px 88px" }}>
        <circle cx="278" cy="88" r="16" fill={INK} stroke={SIGNAL} strokeWidth="1.2" />
        <path d="M 272 88 v -6 a 6 6 0 0 1 12 0 v 6" fill="none" stroke={SIGNAL} strokeWidth="1.2" />
        <rect x="270" y="88" width="16" height="12" rx="2" fill={`${SIGNAL}33`} stroke={SIGNAL} strokeWidth="1" />
      </motion.g>
      <Wire d="M 278 104 L 278 130" accent={SIGNAL} order={4} />

      <Cap x={278} y={218} anchor="middle" order={5}>
        IRREVERSIBLE FROM HERE
      </Cap>
      <Wire d="M 148 234 L 408 234" accent={SIGNAL} order={6} dashed />
      <Cap x={26} y={268} order={7}>
        THE USER SEES EXACTLY WHAT THEY APPROVE
      </Cap>
    </>
  );
}

function Crypto() {
  return (
    <>
      <Cap x={30} y={54} order={0}>
        BROWSER
      </Cap>
      <Cap x={490} y={54} anchor="end" order={1}>
        SERVER
      </Cap>
      <Wire d="M 260 44 L 260 286" accent={SAND} order={0} dashed />

      <Box x={30} y={110} w={104} h={46} label="FILE" order={0} />
      <Wire d="M 134 133 L 168 133" order={1} />
      <Box x={168} y={110} w={74} h={46} label="ENC" accent={SAND} solid order={2} />
      <Wire d="M 242 133 L 340 133" accent={SAND} order={3} />
      <Box x={340} y={110} w={150} h={46} label="CIPHERTEXT" order={4} />

      <motion.g variants={pop} custom={5} style={{ transformOrigin: "205px 216px" }}>
        <circle cx="205" cy="216" r="20" fill={INK} stroke={SAND} strokeWidth="1.2" />
        <path d="M 199 216 v -7 a 6 6 0 0 1 12 0 v 7" fill="none" stroke={SAND} strokeWidth="1.2" />
        <rect x="196" y="216" width="18" height="13" rx="2" fill={`${SAND}33`} stroke={SAND} strokeWidth="1" />
      </motion.g>
      <Wire d="M 205 156 L 205 196" accent={SAND} order={5} />
      <Cap x={205} y={258} anchor="middle" accent={SAND} order={6}>
        KEY STAYS HERE
      </Cap>

      <motion.g variants={fade} custom={7}>
        <rect x="340" y="196" width="150" height="40" rx="6" fill={FILL} stroke={EDGE} />
        <text x="415" y="220" textAnchor="middle" fontSize="8.5" letterSpacing="1.6" fontFamily="var(--font-mono)" fill={TEXT}>
          CANNOT DECRYPT
        </text>
      </motion.g>
    </>
  );
}

function Responsive() {
  const frames = [
    { x: 30, w: 96, h: 150, label: "SM" },
    { x: 152, w: 150, h: 150, label: "MD" },
    { x: 326, w: 164, h: 150, label: "LG" },
  ];
  return (
    <>
      {frames.map((f, i) => (
        <g key={f.label}>
          <motion.g variants={pop} custom={i} style={{ transformOrigin: `${f.x + f.w / 2}px 145px` }}>
            <rect x={f.x} y={70} width={f.w} height={f.h} rx={8} fill={FILL} stroke={EDGE} />
            {Array.from({ length: i + 1 }).map((_, c) => {
              const cw = (f.w - 16 - i * 8) / (i + 1);
              return (
                <rect
                  key={c}
                  x={f.x + 8 + c * (cw + 8)}
                  y={86}
                  width={cw}
                  height={f.h - 32}
                  rx={4}
                  fill={`${SAND}1a`}
                  stroke={`${SAND}55`}
                />
              );
            })}
          </motion.g>
          <Cap x={f.x + f.w / 2} y={62} anchor="middle" order={i}>
            {f.label}
          </Cap>
        </g>
      ))}

      <Wire d="M 30 252 L 490 252" accent={SAND} order={3} />
      {[30, 106, 182, 258, 334, 410, 486].map((x, i) => (
        <motion.line
          key={x}
          x1={x}
          y1={248}
          x2={x}
          y2={258}
          stroke={SAND}
          strokeWidth="1"
          variants={fade}
          custom={i + 3}
        />
      ))}
      <Cap x={30} y={282} order={5}>
        ONE SCALE · ONE SET OF TOKENS · EVERY SCREEN
      </Cap>
    </>
  );
}

const MAP: Record<SchematicKey, () => React.ReactElement> = {
  component: Component,
  state: State,
  data: Data,
  performance: Performance,
  seo: Seo,
  auth: Auth,
  web3: Web3,
  crypto: Crypto,
  responsive: Responsive,
};

export function Schematic({ kind, title }: { kind: SchematicKey; title: string }) {
  const Diagram = MAP[kind];
  return (
    <motion.svg
      key={kind}
      viewBox="0 0 520 320"
      className="h-full w-full"
      role="img"
      aria-label={`Diagram: ${title}`}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: {} }}
    >
      <Diagram />
    </motion.svg>
  );
}
