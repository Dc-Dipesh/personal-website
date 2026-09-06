/**
 * Tools, grouped by the job they do.
 *
 * `note` describes how the technology was actually used, drawn from the CV.
 * `weight: "core"` = named in the CV's core-skills column or an experience
 * bullet. `weight: "working"` = supporting tool in the CV's tooling list.
 *
 * NOTE FOR DIPESH: the "Backend & Adjacent" group below comes from your brief,
 * not from the CV. Trim anything you would not want to be asked about in an
 * interview — it is one array, one line each.
 */

export type Skill = {
  name: string;
  note: string;
  weight: "core" | "working";
};

export type SkillGroup = {
  id: string;
  index: string;
  title: string;
  /** What this cluster is for, in one line. */
  premise: string;
  tone: "sand" | "signal";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "interface",
    index: "01",
    title: "Interface",
    premise: "What the user actually touches. Four years of it, in production.",
    tone: "sand",
    skills: [
      {
        name: "React.js",
        note: "Four years, daily. Admin dashboards at Saptacode, a storefront at Bidhee, wallet and drive UIs at Vola — plus the shared component libraries underneath them.",
        weight: "core",
      },
      {
        name: "Next.js",
        note: "Next.js 13 for furniturehub.com.np, Next.js 14 for current client work. App and Pages routing, SSR for dynamic pages, next/image, code splitting.",
        weight: "core",
      },
      {
        name: "TypeScript",
        note: "Strict typing on every current project. Types are how a component library stays safe to use once other people are building on it.",
        weight: "core",
      },
      {
        name: "JavaScript ES6+",
        note: "The layer underneath everything else — where the async behaviour, the event model and the browser APIs actually live.",
        weight: "core",
      },
      {
        name: "HTML",
        note: "Semantic structure first. Landmarks, headings and real controls, because that is what accessibility and SEO both read.",
        weight: "core",
      },
      {
        name: "CSS",
        note: "Layout, cascade and modern primitives — grid, flexbox, custom properties, container-aware sizing — before reaching for a library.",
        weight: "core",
      },
      {
        name: "Tailwind CSS",
        note: "Built a platform-wide design system at Bidhee: reusable patterns, spacing tokens and breakpoints used across the whole storefront.",
        weight: "core",
      },
      {
        name: "Bootstrap",
        note: "Earlier client and enterprise work, before the Tailwind-based systems.",
        weight: "working",
      },
      {
        name: "Figma",
        note: "Mockup to component. Translating designs into pixel-accurate, responsive builds alongside designers rather than after them.",
        weight: "core",
      },
    ],
  },
  {
    id: "state",
    index: "02",
    title: "State & Data",
    premise: "Where most frontend bugs are born. Server state and client state are not the same problem.",
    tone: "sand",
    skills: [
      {
        name: "React Query",
        note: "Server state at both Bidhee and Vola. Custom hooks, cache configuration, background refetching and query invalidation — this is what cut redundant API calls and load times by 30% on furniturehub.com.np.",
        weight: "core",
      },
      {
        name: "Zustand",
        note: "Small, explicit client stores for UI state that genuinely has to be global — without wiring a whole reducer architecture for it.",
        weight: "core",
      },
      {
        name: "Redux",
        note: "Used where a project already standardised on it. Predictable state, one direction of flow, traceable updates.",
        weight: "core",
      },
      {
        name: "REST APIs",
        note: "Integrated across every role. Loading states, error boundaries and agreed response contracts negotiated with backend developers up front.",
        weight: "core",
      },
      {
        name: "Axios",
        note: "Request layer with interceptors for auth headers and consistent error shaping before data reaches the query layer.",
        weight: "working",
      },
      {
        name: "Postman",
        note: "Where an API gets understood — and where a contract mismatch gets caught before it becomes a UI bug.",
        weight: "working",
      },
    ],
  },
  {
    id: "web3",
    index: "03",
    title: "Web3 & Security",
    premise: "The part where a wrong interface costs more than a wrong click.",
    tone: "signal",
    skills: [
      {
        name: "Polkadot",
        note: "Wallet connect flows, on-chain data reads and transaction signing for Vola Wallet.",
        weight: "core",
      },
      {
        name: "Cardano",
        note: "The second ecosystem behind the same wallet interface — separate account model, same product surface.",
        weight: "core",
      },
      {
        name: "Wallet integration",
        note: "Extension detection, account negotiation and every rejection path treated as a designed state, not an error toast.",
        weight: "core",
      },
      {
        name: "dApps & smart contracts",
        note: "Frontend for dApp and smart-contract interactions: building, previewing and signing transactions the user can actually read.",
        weight: "core",
      },
      {
        name: "E2EE",
        note: "End-to-end encryption for a secure cloud drive — encrypted upload, storage and access, with plaintext existing only in the browser tab.",
        weight: "core",
      },
      {
        name: "SRP auth",
        note: "Passwordless login over the Secure Remote Password protocol: the client proves it knows the password without ever sending it.",
        weight: "core",
      },
    ],
  },
  {
    id: "backend",
    index: "04",
    title: "Backend & Adjacent",
    premise: "Enough of the other side to design a frontend that does not fight it.",
    tone: "signal",
    skills: [
      {
        name: "Node.js",
        note: "The runtime the Next.js server work sits on — server rendering, route handlers and build tooling.",
        weight: "working",
      },
      {
        name: "GraphQL",
        note: "Typed queries where the shape of the data is the contract, and the client asks for exactly the fields it renders.",
        weight: "working",
      },
      {
        name: "Prisma",
        note: "Typed schema and client for relational data — models in one file, types generated from them.",
        weight: "working",
      },
      {
        name: "Drizzle ORM",
        note: "SQL-first, type-safe query building for TypeScript projects that want to stay close to the database.",
        weight: "working",
      },
    ],
  },
  {
    id: "craft",
    index: "05",
    title: "Testing & Craft",
    premise: "How the work stays correct after it ships.",
    tone: "sand",
    skills: [
      {
        name: "Jest",
        note: "Unit coverage on the logic that is easy to break silently — formatting, derivation, state transitions.",
        weight: "core",
      },
      {
        name: "React Testing Library",
        note: "Tests written against what a user can see and do, not against component internals.",
        weight: "core",
      },
      {
        name: "Lighthouse / Web Vitals",
        note: "Performance measured, not guessed. Cache config, lazy loading, code splitting and next/image tuned against the numbers.",
        weight: "core",
      },
      {
        name: "Git & GitHub",
        note: "Branching, review and history that reads. Reviewed code and mentored junior developers at Vola.",
        weight: "core",
      },
      {
        name: "Vercel / Netlify",
        note: "Deploys, preview environments and the feedback loop that makes review actually possible.",
        weight: "working",
      },
      {
        name: "Vite",
        note: "Fast dev server and build for projects that do not need a full framework.",
        weight: "working",
      },
      {
        name: "VS Code",
        note: "Where all of the above happens.",
        weight: "working",
      },
    ],
  },
];

export const skillCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);
