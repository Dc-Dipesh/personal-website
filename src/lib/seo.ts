import { chapters } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

/**
 * One source of truth for everything a crawler reads.
 *
 * The JSON-LD is emitted as a single `@graph` so the entities can reference
 * each other by `@id` instead of repeating themselves — the person is the same
 * node whether it is the site's author, the page's subject or a project's
 * creator, and search engines resolve it as one entity rather than four.
 */

export const SITE_URL = profile.website;
export const SITE_NAME = `${profile.name} — ${profile.role}`;

export const SEO_TITLE = `${profile.name} — ${profile.role}`;

export const SEO_DESCRIPTION =
  "Building secure, scalable Web3 and frontend solutions. Four years in React, Next.js and TypeScript — from pixel-perfect interfaces to Polkadot and Cardano wallet flows and end-to-end encrypted storage.";

export const SEO_KEYWORDS = [
  "Dipesh Chaulagain",
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "TypeScript Developer",
  "Web3 Frontend Developer",
  "dApp developer",
  "Polkadot",
  "Cardano",
  "wallet integration",
  "end-to-end encryption",
  "SRP authentication",
  "Tailwind CSS",
  "React Query",
  "web performance",
  "technical SEO",
  "Frontend Developer Nepal",
  "Frontend Developer Kathmandu",
  "remote frontend developer",
];

/** Canonical ids for the graph nodes. */
const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  page: `${SITE_URL}/#webpage`,
  project: (id: string) => `${SITE_URL}/#project-${id}`,
  org: (name: string) => `${SITE_URL}/#org-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
};

/** Employers named on the CV, deduplicated, most recent first. */
const employers = chapters
  .filter((c) => c.role !== "BSc Computer Systems Engineering")
  .map((c) => c.org);

const currentEmployer = employers[employers.length - 1];

const skills = skillGroups.flatMap((group) => group.skills.map((skill) => skill.name));

const personSchema = {
  "@type": "Person",
  "@id": ID.person,
  name: profile.name,
  givenName: profile.firstName,
  familyName: profile.lastName,
  jobTitle: profile.title,
  description: profile.summary,
  disambiguatingDescription: profile.positioning,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  worksFor: {
    "@type": "Organization",
    "@id": ID.org(currentEmployer),
    name: currentEmployer,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.education.school,
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    educationalLevel: "Bachelor's Degree",
    name: profile.education.degree,
    recognizedBy: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
  },
  hasOccupation: {
    "@type": "Occupation",
    name: profile.role,
    occupationLocation: { "@type": "City", name: "Kathmandu" },
    skills: skills.join(", "),
  },
  knowsAbout: skills,
  sameAs: [profile.github, profile.linkedin],
  mainEntityOfPage: { "@id": ID.page },
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE_URL,
  name: SITE_NAME,
  description: SEO_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": ID.person },
  copyrightHolder: { "@id": ID.person },
};

const pageSchema = {
  "@type": "ProfilePage",
  "@id": ID.page,
  url: SITE_URL,
  name: SEO_TITLE,
  description: SEO_DESCRIPTION,
  inLanguage: "en",
  isPartOf: { "@id": ID.website },
  about: { "@id": ID.person },
  mainEntity: { "@id": ID.person },
  primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image` },
};

/**
 * Projects as `CreativeWork` rather than `SoftwareApplication`: the latter wants
 * an offer or a rating for rich results and warns without them, and neither is
 * true of client work.
 */
const projectSchemas = projects.map((project) => ({
  "@type": "CreativeWork",
  "@id": ID.project(project.id),
  name: project.name,
  headline: project.headline,
  description: project.problem,
  abstract: project.handle,
  ...(project.live ? { url: project.live } : {}),
  ...(project.shot ? { image: `${SITE_URL}${project.shot.src}` } : {}),
  keywords: project.stack.join(", "),
  creator: { "@id": ID.person },
  author: { "@id": ID.person },
  inLanguage: "en",
  isPartOf: { "@id": ID.website },
}));

const workListSchema = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#work`,
  name: "Selected work",
  numberOfItems: projects.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: projects.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@id": ID.project(project.id) },
  })),
};

const employerSchemas = employers.map((name) => ({
  "@type": "Organization",
  "@id": ID.org(name),
  name,
}));

/** The whole graph, ready to serialise into one script tag. */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    websiteSchema,
    pageSchema,
    workListSchema,
    ...projectSchemas,
    ...employerSchemas,
  ],
};
