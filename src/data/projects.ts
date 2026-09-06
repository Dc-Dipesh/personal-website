/**
 * Selected work. Every claim below maps to a line in the CV or to
 * dipeshchaulagain.com.np. Where the CV gives no public URL or repository the
 * field is `null` and the UI says so rather than inventing a link.
 */

export type ProjectVisual = "wallet" | "vault" | "ridge" | "storefront";

/**
 * A real screenshot of the product.
 *
 * `screen` fills the 16:10 frame; `device` is a portrait app capture centred in
 * it, so a phone UI is not stretched into a landscape box. When `shot` is null
 * the panel falls back to the hand-drawn schematic in `ProjectVisual`.
 */
export type ProjectShot = {
  src: string;
  width: number;
  height: number;
  fit: "screen" | "device";
  alt: string;
};

export type Project = {
  id: string;
  index: string;
  name: string;
  /** Domain if the product is public, otherwise a short descriptor. */
  handle: string;
  year: string;
  context: string;
  role: string;
  /** One sentence, large type. */
  headline: string;
  problem: string;
  challenges: { title: string; body: string }[];
  outcome: string[];
  stack: string[];
  shot: ProjectShot | null;
  live: string | null;
  repo: string | null;
  /** Marks work under NDA / private client products. */
  access: "public" | "private";
  visual: ProjectVisual;
  /** Hue rotates the section environment as each project scrolls in. */
  accent: string;
  accentSoft: string;
};

export const projects: Project[] = [
  {
    id: "vola-wallet",
    index: "01",
    name: "Vola Wallet",
    handle: "Polkadot & Cardano dApp wallet",
    year: "2025 — present",
    context: "Vola Solution Pvt. Ltd. · UAE, remote",
    role: "Frontend Developer — Web3 features",
    headline: "A wallet that has to be right the first time.",
    problem:
      "Holding assets across two different chain ecosystems normally means two wallets, two mental models and a lot of trust in a UI you cannot verify. Vola Wallet puts Polkadot and Cardano behind one interface.",
    challenges: [
      {
        title: "Wallet connect flows",
        body: "Detecting installed extensions, negotiating accounts and handling every rejection path — no connection, wrong network, user cancels mid-signature — as a first-class state rather than an error toast.",
      },
      {
        title: "On-chain data reads",
        body: "Chain state is asynchronous, occasionally stale and never guaranteed. Reads are modelled as cached queries with explicit loading, refetch and invalidation, so the interface never quietly shows a number that is no longer true.",
      },
      {
        title: "Transaction signing",
        body: "Building, previewing and signing transactions for dApp and smart-contract interactions. The signature step is deliberately slow and legible: the user sees exactly what they are approving before the key is touched.",
      },
    ],
    outcome: [
      "Shipped wallet connect, on-chain reads and transaction signing for dApp and smart-contract interactions.",
      "Built as reusable, strictly typed React components against Figma mockups.",
    ],
    stack: ["React", "Next.js 14", "TypeScript", "Polkadot", "Cardano", "Wallet extensions", "React Query"],
    shot: {
      src: "/projects/vola.webp",
      width: 413,
      height: 616,
      fit: "device",
      alt: "Vola Wallet: a dark mobile wallet showing a VOLA balance of 11389.9642 alongside 1299.83 ADA, with send, receive and bridge actions and an asset list for Vola and Cardano.",
    },
    live: null,
    repo: null,
    access: "private",
    visual: "wallet",
    accent: "#6E7BFF",
    accentSoft: "rgba(110,123,255,0.14)",
  },
  {
    id: "nuvola-drive",
    index: "02",
    name: "Nuvola Drive",
    handle: "End-to-end encrypted cloud drive",
    year: "2025 — present",
    context: "Vola Solution Pvt. Ltd. · UAE, remote",
    role: "Frontend Developer — E2EE and auth",
    headline: "Storage where the server never sees the file.",
    problem:
      "Ordinary cloud storage asks you to trust the provider. Nuvola Drive removes that requirement: files are encrypted in the browser before they leave it, and the password never travels either.",
    challenges: [
      {
        title: "Encryption in the browser",
        body: "Encrypted upload, storage and access implemented on the client. Keys are derived and used in the browser; the server stores ciphertext it cannot read.",
      },
      {
        title: "Passwordless login over SRP",
        body: "Authentication via the Secure Remote Password protocol — the client proves it knows the password without ever transmitting it, so there is no password on the wire and none at rest.",
      },
      {
        title: "Keeping crypto invisible",
        body: "The hard part is not the cryptography, it is making an encrypted drive feel like a normal one. Upload progress, previews and sharing all had to survive the constraint that plaintext exists only in the tab.",
      },
    ],
    outcome: [
      "End-to-end encrypted upload, storage and access shipped as part of the product.",
      "Passwordless login over the Secure Remote Password protocol.",
    ],
    stack: ["React", "TypeScript", "E2EE", "SRP protocol", "Web Crypto", "Next.js"],
    shot: {
      src: "/projects/drive.webp",
      width: 1440,
      height: 905,
      fit: "screen",
      alt: "Nuvola Drive dashboard: a storage ring showing 2.56 GB of 100 GB used, tiles counting images, videos and documents, and a grid of recently visited encrypted files.",
    },
    live: null,
    repo: null,
    access: "private",
    visual: "vault",
    accent: "#5FBFA6",
    accentSoft: "rgba(95,191,166,0.14)",
  },
  {
    id: "himalayan-trekkers",
    index: "03",
    name: "Himalayan Trekkers",
    handle: "himalayantrekkers.com",
    year: "Selected work",
    context: "Trek booking platform · Nepal, Bhutan, Tibet",
    role: "Frontend Developer",
    headline: "Turning a mountain of itineraries into one clear decision.",
    problem:
      "A trekking operator's catalogue is deep and irregular — dozens of routes across three countries, each with its own duration, difficulty and season. The site has to let someone find the right trek without reading all of them.",
    challenges: [
      {
        title: "Itineraries as structured content",
        body: "Day-by-day itineraries modelled as data rather than prose, so the same trek renders as a summary, a full plan and a search result without duplicating content.",
      },
      {
        title: "Search, cart and inquiry",
        body: "Search across the catalogue, a cart, and inquiry flows for a product nobody buys in one click — the conversion is a conversation, so the UI keeps that thread intact.",
      },
      {
        title: "Search visibility",
        body: "Built on Next.js with SEO in mind: server-rendered trek pages that search engines can actually index, which is how this kind of business is found at all.",
      },
    ],
    outcome: [
      "Live trek-booking platform covering Nepal, Bhutan and Tibet.",
      "Itineraries, search, cart and inquiry flows built end to end on Next.js.",
    ],
    stack: ["React", "Next.js", "Tailwind CSS", "SEO", "REST APIs"],
    shot: {
      src: "/projects/trekkers.webp",
      width: 1440,
      height: 900,
      fit: "screen",
      alt: "Himalayan Trekkers home page: a full-bleed photograph of a climber on a snow ridge behind the Island Peak Climbing headline and a Book My Trip call to action.",
    },
    live: "https://himalayantrekkers.com",
    repo: null,
    access: "public",
    visual: "ridge",
    accent: "#C8A876",
    accentSoft: "rgba(200,168,118,0.14)",
  },
  {
    id: "furniturehub",
    index: "04",
    name: "FurnitureHub Nepal",
    handle: "furniturehub.com.np",
    year: "2023 — 2024",
    context: "Bidhee Pvt. Ltd. · Kathmandu, on-site",
    role: "Frontend lead",
    headline: "An e-commerce frontend, owned end to end.",
    problem:
      "A furniture catalogue that has to be browsable, filterable and findable on Google — with pages that stay fast as the product list grows.",
    challenges: [
      {
        title: "Filters, search and infinite scroll",
        body: "Product filters, search and infinite-scroll pagination on Next.js 13, plus authentication flows — all sharing one server-state layer instead of each screen fetching its own way.",
      },
      {
        title: "SEO with server rendering",
        body: "SSR for dynamic product pages, Open Graph metadata and generated sitemap.xml and robots.txt, improving organic visibility and indexability.",
      },
      {
        title: "A design system, not a stylesheet",
        body: "A Tailwind CSS design system of reusable patterns, spacing tokens and breakpoints used platform-wide — and REST contracts and error states agreed with the backend team rather than discovered in production.",
      },
    ],
    outcome: [
      "Load times cut by 30% by managing server state with React Query — caching, background refetching and query invalidation removed redundant API calls.",
      "Platform-wide Tailwind design system adopted across the storefront.",
      "Dynamic product pages made indexable through SSR, structured metadata and generated sitemap and robots.txt.",
    ],
    stack: ["Next.js 13", "React", "React Query", "Tailwind CSS", "SSR / SEO", "REST APIs"],
    shot: {
      src: "/projects/furniturehub.webp",
      width: 1440,
      height: 900,
      fit: "screen",
      alt: "FurnitureHub Nepal storefront: a category navigation bar, a Making Your Home Beautiful hero carousel of living-room furniture, and a Hottest Deals promotion row.",
    },
    live: "https://furniturehub.com.np",
    repo: null,
    access: "public",
    visual: "storefront",
    accent: "#E08A5B",
    accentSoft: "rgba(224,138,91,0.14)",
  },
];
