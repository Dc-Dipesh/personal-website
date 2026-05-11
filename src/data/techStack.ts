export interface TechItem {
  name: string;
  category: "frontend" | "web3" | "tools" | "testing";
  color: string;
  initials: string;
}

export const techStack: TechItem[] = [
  { name: "React", category: "frontend", color: "#61DAFB", initials: "Re" },
  { name: "Next.js", category: "frontend", color: "#FFFFFF", initials: "Nx" },
  {
    name: "TypeScript",
    category: "frontend",
    color: "#3178C6",
    initials: "TS",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    color: "#06B6D4",
    initials: "Tw",
  },
  {
    name: "React Query",
    category: "frontend",
    color: "#FF4154",
    initials: "RQ",
  },
  { name: "Zustand", category: "frontend", color: "#FF6B35", initials: "Zu" },
  { name: "Polkadot", category: "web3", color: "#E6007A", initials: "DOT" },
  { name: "Cardano", category: "web3", color: "#0033AD", initials: "ADA" },
  {
    name: "Wallet Extensions",
    category: "web3",
    color: "#000000",
    initials: "WE",
  },
  { name: "Framer", category: "tools", color: "#0055FF", initials: "FM" },
  { name: "Git", category: "tools", color: "#F05032", initials: "Git" },
  { name: "Figma", category: "tools", color: "#F24E1E", initials: "Fig" },
  { name: "VTest", category: "testing", color: "#C21325", initials: "VTest" },
  { name: "Playwright", category: "testing", color: "#000000", initials: "PW" },

  { name: "Vercel", category: "tools", color: "#FFFFFF", initials: "Vce" },
];

export const orbitRings: TechItem[][] = [
  techStack.filter((t) => t.category === "frontend").slice(0, 4),
  techStack
    .filter((t) => t.category === "web3")
    .concat(techStack.filter((t) => t.category === "tools").slice(0, 2)),
  techStack
    .filter((t) => t.category === "tools")
    .slice(2)
    .concat(techStack.filter((t) => t.category === "testing")),
];
