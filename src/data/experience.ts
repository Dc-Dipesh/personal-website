/**
 * Career chapters. Companies, roles, dates, locations and bullet copy are
 * transcribed from the CV without alteration. Chapter titles are framing only.
 */

export type Chapter = {
  id: string;
  chapter: string;
  /** Narrative framing for the chapter. */
  title: string;
  /** Actual role from the CV — empty for the education chapter. */
  role: string;
  org: string;
  period: string;
  place: string;
  /** Sort/anchor value used by the timeline path. */
  from: number;
  to: number | "now";
  /** One line the visitor sees before expanding. */
  precis: string;
  points: string[];
  /** Drives the accent hue of the milestone node. */
  tone: "sand" | "signal" | "neutral";
};

export const chapters: Chapter[] = [
  {
    id: "foundations",
    chapter: "01",
    title: "Learning the foundations",
    role: "BSc Computer Systems Engineering",
    org: "University of Sunderland",
    period: "Sep 2019 – Jan 2023",
    place: "Computer Systems Engineering",
    from: 2019,
    to: 2023,
    precis:
      "Four years of systems engineering, finished while already working full time as a developer.",
    points: [
      "BSc Computer Systems Engineering, University of Sunderland, Sep 2019 – Jan 2023.",
      "The last year of the degree overlapped with a full-time frontend role — the theory and the shipping happened side by side.",
    ],
    tone: "neutral",
  },
  {
    id: "saptacode",
    chapter: "02",
    title: "Building real products",
    role: "Frontend Developer",
    org: "Saptacode Technology Pvt. Ltd.",
    period: "Mar 2022 – Aug 2023",
    place: "Kathmandu, Nepal · Full-time",
    from: 2022,
    to: 2023,
    precis:
      "React dashboards and marketing sites for enterprise clients — and the first shared component library.",
    points: [
      "Developed React.js admin dashboards and marketing sites for enterprise clients with clean, maintainable component structure.",
      "Built reusable component libraries shared across projects, standardising UI patterns and cutting duplicated code across the team.",
      "Integrated REST APIs with careful loading states and error boundaries, and translated Figma wireframes into pixel-accurate components alongside designers.",
    ],
    tone: "neutral",
  },
  {
    id: "bidhee",
    chapter: "03",
    title: "Taking ownership",
    role: "Mid-Level Frontend Developer",
    org: "Bidhee Pvt. Ltd.",
    period: "Aug 2023 – Aug 2024",
    place: "Kathmandu, Nepal · On-site",
    from: 2023,
    to: 2024,
    precis:
      "Led the frontend of a production e-commerce platform, from search and auth to SEO and a Tailwind design system.",
    points: [
      "Led frontend development for furniturehub.com.np on Next.js 13: product filters, search, infinite-scroll pagination and authentication flows.",
      "Implemented SEO with SSR for dynamic product pages, Open Graph metadata and generated sitemap and robots.txt, improving organic visibility and indexability.",
      "Managed server state with React Query — caching, background refetching, query invalidation — cutting redundant API calls and load times by 30%.",
      "Built a Tailwind CSS design system of reusable patterns, spacing tokens and breakpoints used platform-wide, and aligned REST contracts and error states with backend developers.",
    ],
    tone: "sand",
  },
  {
    id: "vola",
    chapter: "04",
    title: "Web2 discipline, Web3 stakes",
    role: "Mid-Level Frontend Developer",
    org: "Vola Solution Pvt. Ltd.",
    period: "Feb 2025 – Present",
    place: "United Arab Emirates · Remote",
    from: 2025,
    to: "now",
    precis:
      "Wallet flows on Polkadot and Cardano, end-to-end encrypted storage, and mentoring the developers coming up behind me.",
    points: [
      "Shipped client-facing projects in React, Next.js 14 and TypeScript, translating Figma mockups into pixel-perfect, responsive components with reusable architecture and strict typing.",
      "Built Web3 frontend features for Vola Wallet on Polkadot and Cardano: wallet connect flows, on-chain data reads and transaction signing for dApp and smart-contract interactions.",
      "Implemented E2EE for a secure cloud drive — encrypted upload, storage and access — plus passwordless login over the Secure Remote Password protocol.",
      "Integrated REST APIs with React Query custom hooks and tuned performance via cache config, lazy loading, code splitting and next/image, lifting load times and Lighthouse scores.",
      "Reviewed code, mentored junior developers and contributed to feature scoping and planning.",
    ],
    tone: "signal",
  },
];

/** Milestone labels for the journey path in Section 02. */
export const milestones = [
  {
    key: "learning",
    label: "Learning",
    year: "2019",
    caption: "Computer Systems Engineering. Fundamentals before frameworks.",
    chapterId: "foundations",
  },
  {
    key: "building",
    label: "Building",
    year: "2022",
    caption: "First professional React work. Dashboards, marketing sites, component libraries.",
    chapterId: "saptacode",
  },
  {
    key: "shipping",
    label: "Shipping",
    year: "2023",
    caption: "A live storefront with real traffic. Search, auth, SEO, 30% faster loads.",
    chapterId: "bidhee",
  },
  {
    key: "leading",
    label: "Leading",
    year: "2024",
    caption: "Owning the frontend end to end. Design systems, API contracts, code review.",
    chapterId: "bidhee",
  },
  {
    key: "exploring",
    label: "Exploring",
    year: "2025",
    caption: "Polkadot and Cardano wallets. End-to-end encryption. Mentoring.",
    chapterId: "vola",
  },
] as const;
