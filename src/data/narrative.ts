/**
 * The written spine of the site.
 *
 * Every factual claim traces to the CV: the dates, the companies, the 30%,
 * the Polkadot/Cardano and SRP work. The framing around those facts is
 * first-person voice, not new information.
 */

/** Section 01 — scroll-scrubbed beats. Each beat is one screen. */
export const openingBeats = [
  {
    id: "problem",
    kicker: "Every interface starts with a problem.",
    body: "Somebody has something they need to do, and the machine is in the way.",
  },
  {
    id: "start",
    kicker: "Mine started in Kathmandu, in 2022.",
    body: "A React admin dashboard for an enterprise client. Real users, real data, and a component structure that had to survive whoever touched it next.",
  },
  {
    id: "systems",
    kicker: "So I stopped shipping screens and started shipping systems.",
    body: "Reusable component libraries, shared across projects. Standardised patterns instead of a slightly different button on every page.",
  },
  {
    id: "traffic",
    kicker: "Then the work got heavier.",
    body: "A storefront with real traffic. Filters, search, infinite scroll, authentication — and every decision now visible in the numbers.",
  },
  {
    id: "performance",
    kicker: "Thirty percent faster loads.",
    body: "Not from a rewrite. From taking server state seriously: caching, background refetching, invalidation, and the redundant requests nobody had counted.",
  },
  {
    id: "stakes",
    kicker: "Four years in, the surface changed again.",
    body: "Wallets. Signatures. Encryption keys that never leave the browser tab.",
  },
  {
    id: "consequence",
    kicker: "Same discipline. Higher consequences.",
    body: "Get a button wrong and someone clicks twice. Get a signing flow wrong and someone loses money. The craft is identical; the margin for error is not.",
  },
  {
    id: "thesis",
    kicker: "That is the whole job.",
    body: "Making a complicated system feel obvious — and being able to prove why it is fast, indexable and correct when someone asks.",
  },
] as const;

/** Section 05 — the engineering under the surface. */
export type Schematic =
  | "component"
  | "state"
  | "data"
  | "performance"
  | "seo"
  | "auth"
  | "web3"
  | "crypto"
  | "responsive";

export const layers: {
  id: Schematic;
  index: string;
  title: string;
  claim: string;
  detail: string;
  evidence: string;
}[] = [
  {
    id: "component",
    index: "01",
    title: "Component architecture",
    claim: "A component is a promise about what happens next.",
    detail:
      "Same props in, same output out. Composition over configuration, one owner per piece of state, and boundaries drawn where the data changes — not where the visual design happens to have a box.",
    evidence: "Reusable component libraries shared across projects at Saptacode; strictly typed reusable architecture at Vola.",
  },
  {
    id: "state",
    index: "02",
    title: "State management",
    claim: "Server state and client state are two different problems.",
    detail:
      "Server state is a cache of something you do not own — it goes stale, it refetches, it gets invalidated. Client state is yours and should stay small. Conflating them is where the hard bugs come from.",
    evidence: "React Query for server state, Zustand and Redux for client state, across Bidhee and Vola.",
  },
  {
    id: "data",
    index: "03",
    title: "API integration",
    claim: "The contract is agreed before the component is written.",
    detail:
      "Response shapes, error states and loading behaviour negotiated with the backend up front. Custom hooks wrap the query layer so a screen asks for data instead of orchestrating fetches.",
    evidence: "REST contracts and error states aligned with backend developers at Bidhee; React Query custom hooks at Vola.",
  },
  {
    id: "performance",
    index: "04",
    title: "Performance",
    claim: "Performance is a design decision, not a cleanup task.",
    detail:
      "Cache configuration to stop redundant requests, lazy loading and code splitting to stop shipping code nobody has scrolled to yet, and next/image so the largest asset on the page is not the unoptimised one.",
    evidence: "30% faster loads on furniturehub.com.np; cache config, lazy loading, code splitting and next/image lifting Lighthouse scores at Vola.",
  },
  {
    id: "seo",
    index: "05",
    title: "SEO & rendering",
    claim: "If a crawler cannot render it, it does not exist.",
    detail:
      "Server-side rendering for dynamic pages, structured Open Graph metadata, and a generated sitemap and robots.txt — so a catalogue that changes weekly stays indexable without anyone maintaining a list by hand.",
    evidence: "SSR for dynamic product pages, Open Graph metadata, generated sitemap.xml and robots.txt at Bidhee.",
  },
  {
    id: "auth",
    index: "06",
    title: "Authentication",
    claim: "The best password to store is none.",
    detail:
      "Passwordless login over the Secure Remote Password protocol: the client proves it knows the secret through a zero-knowledge exchange. Nothing sensitive crosses the wire, and there is nothing at rest to leak.",
    evidence: "SRP passwordless login implemented for the secure cloud drive at Vola.",
  },
  {
    id: "web3",
    index: "07",
    title: "Web3 integration",
    claim: "A signature is irreversible. The UI has to act like it.",
    detail:
      "Connect, read, sign. Extension detection and account negotiation, on-chain reads treated as cached async state, and a signing step that shows exactly what is being approved before the key is touched.",
    evidence: "Wallet connect flows, on-chain data reads and transaction signing on Polkadot and Cardano for Vola Wallet.",
  },
  {
    id: "crypto",
    index: "08",
    title: "End-to-end encryption",
    claim: "The server should not be able to read the file.",
    detail:
      "Files are encrypted in the browser before upload. The server stores ciphertext and metadata it cannot open. Everything downstream — previews, progress, sharing — has to work with that constraint instead of around it.",
    evidence: "E2EE upload, storage and access implemented for the secure cloud drive at Vola.",
  },
  {
    id: "responsive",
    index: "09",
    title: "Responsive systems",
    claim: "Breakpoints are a system, not a set of exceptions.",
    detail:
      "Spacing tokens, a type scale and a shared set of breakpoints defined once and used platform-wide — so a new page is already responsive before anyone opens it on a phone.",
    evidence: "Tailwind CSS design system of reusable patterns, spacing tokens and breakpoints used platform-wide at Bidhee.",
  },
];

/** Section 07 — the person. First person, no buzzwords. */
export const personal = {
  greeting: "Hello — I'm Dipesh.",
  paragraphs: [
    "I build the front of things. Four years of it, from an office in Kathmandu to a remote team in the UAE, mostly in React, Next.js and TypeScript.",
    "I studied Computer Systems Engineering, which is a long way of saying I like knowing what is happening underneath. That habit is why I ended up on the crypto and encryption side of the product rather than only the layout side — a wallet or an encrypted drive is a frontend problem right up until it very much is not.",
    "What I actually enjoy: the moment a messy flow collapses into something obvious. Cutting a load time and being able to say exactly which request I removed. Writing the component that stops three other people from writing it.",
    "I review code, I mentor the developers coming up behind me, and I would rather ask an awkward question during scoping than discover the answer in production.",
  ],
  facts: [
    { label: "Based in", value: "Kathmandu, Nepal" },
    { label: "Working", value: "Remote, UAE team" },
    { label: "Experience", value: "4 years, frontend" },
    { label: "Studied", value: "BSc Computer Systems Engineering" },
  ],
} as const;

/** Section 08 — what is next. */
export const exploring = [
  {
    label: "Polkadot & Cardano",
    status: "Shipping",
    note: "Wallet flows and on-chain interaction in production right now — and there is a lot more of both ecosystems left to learn.",
    intensity: 1,
  },
  {
    label: "Applied cryptography",
    status: "Shipping",
    note: "E2EE and the Secure Remote Password protocol on a live product. Enough to respect how much more there is.",
    intensity: 1,
  },
  {
    label: "Frontend architecture",
    status: "Deepening",
    note: "How large React codebases stay navigable: boundaries, ownership, and the cost of every abstraction.",
    intensity: 0.85,
  },
  {
    label: "Web performance",
    status: "Deepening",
    note: "Web Vitals as a design constraint rather than an audit at the end.",
    intensity: 0.8,
  },
  {
    label: "Real-time applications",
    status: "Exploring",
    note: "Live state, subscriptions and optimistic updates — the UI problems that appear when data will not sit still.",
    intensity: 0.6,
  },
  {
    label: "3D on the web",
    status: "Exploring",
    note: "Three.js and WebGL as a storytelling tool. This site is part of that experiment.",
    intensity: 0.55,
  },
  {
    label: "Distributed systems",
    status: "Reading",
    note: "Consensus, eventual consistency, and what they imply for the interface sitting on top.",
    intensity: 0.4,
  },
  {
    label: "AI-assisted development",
    status: "Reading",
    note: "Where it genuinely accelerates the work, and where reviewing the output costs more than writing it.",
    intensity: 0.35,
  },
] as const;

/** Section metadata shared by the nav and the progress rail. */
export const sections = [
  { id: "opening", index: "00", label: "Opening", nav: false },
  { id: "story", index: "01", label: "Story", nav: true },
  { id: "journey", index: "02", label: "Journey", nav: true },
  { id: "tools", index: "03", label: "Tools", nav: true },
  { id: "work", index: "04", label: "Work", nav: true },
  { id: "craft", index: "05", label: "Craft", nav: true },
  { id: "chapters", index: "06", label: "Experience", nav: true },
  { id: "about", index: "07", label: "About", nav: true },
  { id: "next", index: "08", label: "Next", nav: true },
  { id: "contact", index: "09", label: "Contact", nav: true },
] as const;

export type SectionId = (typeof sections)[number]["id"];
