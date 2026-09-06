/**
 * Single source of truth for identity + contact.
 * Every value here is taken verbatim from Dipesh_Chaulagain_CV.pdf or
 * dipeshchaulagain.com.np. Nothing is inferred.
 */

export const profile = {
  name: "Dipesh Chaulagain",
  firstName: "Dipesh",
  lastName: "Chaulagain",
  initials: "DC",

  /** CV job title. */
  title: "Mid-Level Frontend Developer",
  /** Shorter label used in large type. */
  role: "Frontend Developer",
  tagline: "Building experiences, not just interfaces.",

  location: "Kathmandu, Nepal",
  timeZone: "Asia/Kathmandu",
  availability: "Open to remote frontend roles",
  yearsOfExperience: 4,

  /** Headline positioning, from dipeshchaulagain.com.np. */
  positioning: "Building secure, scalable Web3 and frontend solutions.",

  email: "dcdipesh1998@gmail.com",
  /** Display form, exactly as printed on the CV. */
  phone: "+977 9867754362",
  /** Dial form — no spaces, or iOS drops the call. */
  phoneHref: "tel:+9779867754362",
  website: "https://dipeshchaulagain.com.np",
  github: "https://github.com/Dc-Dipesh",
  linkedin: "https://www.linkedin.com/in/dipesh-chaulagain-4143641a4",
  resume: "/Dipesh_Chaulagain_CV.pdf",

  /** CV profile paragraph, unedited. */
  summary:
    "Mid level Frontend Developer with four years of experience building scalable web applications and Web3 solutions across Nepal and the UAE. Specialises in React, Next.js and TypeScript, with hands-on expertise in the Polkadot and Cardano ecosystems, dApp development and E2EE secure cloud systems. Delivers SEO-optimised, pixel-perfect interfaces from Figma to production.",

  education: {
    degree: "BSc Computer Systems Engineering",
    school: "University of Sunderland",
    period: "Sep 2019 – Jan 2023",
    start: 2019,
    end: 2023,
  },

  /**
   * Drop a photo at `public/portrait.jpg` and set this to "/portrait.jpg".
   * While it is null the About section renders the typographic panel instead —
   * no broken image, no layout shift.
   */
  portrait: null as string | null,
} as const;

export const socials = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, hint: "Fastest way to reach me" },
  { label: "Phone", value: profile.phone, href: profile.phoneHref, hint: "Kathmandu hours, UTC+05:45" },
  { label: "LinkedIn", value: "dipesh-chaulagain", href: profile.linkedin, hint: "Work history and referrals" },
  { label: "GitHub", value: "Dc-Dipesh", href: profile.github, hint: "Code, experiments, side projects" },
  { label: "Résumé", value: "PDF · one page", href: profile.resume, hint: "The condensed version" },
] as const;
