import type { ExperienceItem } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Mid-Level Frontend Developer",
    company: "Vola Solution Pvt. Ltd.",
    period: "Feb 2025 – Present",
    location: "United Arab Emirates",
    type: "Remote",
    achievements: [
      "Built and shipped client-facing web projects using React, Next.js 14 and TypeScript, translating Figma mockups into pixel-perfect, responsive components with reusable architecture and strict TypeScript typing.",
      "Integrated REST APIs using React Query, building custom hooks for data fetching, caching, and synchronisation; participated in code reviews, mentored junior developers, and contributed to feature scoping and planning.",
      "Built Web3 frontend features for Vola Wallet using Polkadot and Cardano — wallet connect/disconnect flows, on-chain data reads, and transaction signing for dApp and smart contract interactions.",
      "Implemented E2EE for a secure cloud drive covering encrypted file upload, storage and access; built passwordless login using Secure Remote Password (SRP) protocol, eliminating password transmission over the network.",
      "Optimised performance through React Query cache tuning, lazy loading, code splitting, and next/image for efficient asset delivery — improving page load times and Lighthouse scores.",
    ],
  },
  {
    id: 2,
    role: "Mid-Level Frontend Developer",
    company: "Bidhee Pvt. Ltd.",
    period: "Aug 2023 – Aug 2024",
    location: "Kathmandu, Nepal",
    type: "On-site",
    metric: "Reduced load times by 30%",
    achievements: [
      "Led frontend development for furniturehub.com.np using Next.js 13, building core e-commerce features including product filters, search, infinite scroll pagination, and user authentication flows.",
      "Implemented SEO using Next.js 13 SSR and SSG for dynamic product pages, Open Graph metadata, and auto-generated sitemap and robots.txt — improving organic search visibility and page indexability.",
      "Used React Query for server-state management — configuring caching, background refetching and query invalidation — reducing unnecessary API calls and cutting load times by 30%.",
      "Built a consistent design system with Tailwind CSS, defining reusable component patterns, spacing tokens, and responsive breakpoints used across the entire platform.",
      "Coordinated with backend developers to integrate REST APIs, aligning on request/response contracts, handling error states, and ensuring consistent data flow across product listing, cart, and auth modules.",
    ],
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Saptacode Technology Pvt. Ltd.",
    period: "Mar 2022 – Aug 2023",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    achievements: [
      "Developed React.js web applications for enterprise clients including admin dashboards and marketing landing pages, focusing on clean component structure and maintainable code.",
      "Built and maintained reusable component libraries shared across multiple projects, standardising UI patterns and reducing duplicated code across the team's codebase.",
      "Integrated REST APIs into React components, handling data fetching, loading states, and error boundaries to ensure reliable data flow between frontend and backend.",
      "Translated Figma wireframes into clean, maintainable React components, working closely with designers for pixel-accurate implementation.",
      "Assisted senior developers in estimating and breaking down frontend tasks during sprint planning, gaining early exposure to Agile workflows and project delivery cycles.",
    ],
  },
];
