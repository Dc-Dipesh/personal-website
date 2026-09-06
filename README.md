# Dipesh Chaulagain — Portfolio

A single-page, scroll-driven portfolio built as one continuous narrative rather than a stack of
sections: **who I am → how I started → what I learned → what I built → how I think → what I can
do → where I'm going → let's work together.**

Live content is sourced entirely from `Dipesh_Chaulagain_CV.pdf` and the previous portfolio. No
company, role, date or metric in this repository was invented.

---

## Stack

| Concern           | Choice                                                            |
| ----------------- | ----------------------------------------------------------------- |
| Framework         | Next.js 16 (App Router, static export-friendly, Turbopack)         |
| Language          | TypeScript, `strict`                                               |
| Styling           | Tailwind CSS v4 with a token layer in `src/app/globals.css`        |
| Motion            | Motion (Framer) for component-level animation                      |
| Scroll            | Lenis for smooth scroll, GSAP ScrollTrigger for the pinned section |
| 3D                | Three.js + React Three Fiber, custom GLSL, lazy-loaded             |
| Type              | Instrument Serif (display), Geist (UI), Geist Mono (annotations)   |

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

Deploys to Vercel with no configuration. Set the production domain in
`src/data/profile.ts → profile.website`; `metadataBase`, the sitemap and robots.txt all read from
it.

---

## Where the content lives

All copy is data, not markup. Editing these five files changes the whole site — no component
needs to be touched.

| File                      | Contains                                                          |
| ------------------------- | ----------------------------------------------------------------- |
| `src/data/profile.ts`     | Name, title, contact, education, résumé link, portrait slot        |
| `src/data/experience.ts`  | The four career chapters and the five journey milestones           |
| `src/data/projects.ts`    | The four case studies: problem, challenges, outcome, stack, links  |
| `src/data/skills.ts`      | Five tool groups, each entry with a note on how it was actually used |
| `src/data/narrative.ts`   | Story beats, engineering layers, the personal section, what's next |

### Before you publish — two things to check

1. **`skills.ts` → the "Backend & Adjacent" group.** Node.js, GraphQL, Prisma and Drizzle came
   from the brief, not from the CV. Keep what you'd be happy to be interviewed on; delete the
   rest. It is one array, one line each.
2. **Project links.** Vola Wallet and Nuvola Drive currently render as
   *"Private client product — no public link"* because the CV gives no public URL. If either has
   a public page or a case study, set `live` on that entry and the CTA appears automatically.

### Adding your photo

1. Drop the file at `public/portrait.jpg` (4:5 crop looks best).
2. Set `portrait: "/portrait.jpg"` in `src/data/profile.ts`.

Until then the About section renders an identity plate with the same frame and field labels —
no placeholder box, no broken image, no layout shift when you swap it in.

### Project screenshots

All four projects use real screenshots, in `public/projects/` (~296 KB total, WebP, lazy-loaded —
nothing is requested until the Work section is reached).

| File | Source | Notes |
| ---- | ------ | ----- |
| `vola.webp` | `dipeshchaulagain.com.np/images/projects/vola.png` | Portrait phone capture, rendered as a centred device |
| `drive.webp` | `dipeshchaulagain.com.np/images/projects/drive.png` | Nuvola Drive dashboard |
| `trekkers.webp` | Captured live from himalayantrekkers.com | The old site used an Unsplash stock photo here |
| `furniturehub.webp` | Captured live from furniturehub.com.np | Same — stock photo replaced with the real product |

**Check `drive.webp` before you publish.** It is the same image already on your live site, but it
shows real file thumbnails — including a photo of a person — and real filenames. If that is not
meant to be public, recapture the dashboard with a demo account and drop the new file in at the
same path.

To swap any of them: replace the file and update `width`/`height`/`alt` in the project's `shot`
entry in `src/data/projects.ts`. Set `shot: null` and the panel falls back to the hand-drawn
schematic for that project (`src/components/sections/ProjectVisual.tsx`) — those are still wired
up and used for any project without an image.

---

## Structure

```
src/
├── app/                      # layout, page, SEO routes, OG image, fonts
├── components/
│   ├── Experience.tsx        # the journey, in reading order
│   ├── providers/            # device capability + smooth scroll
│   ├── chrome/               # preloader, nav rail, cursor
│   ├── primitives/           # Reveal, Magnetic, Marker
│   ├── three/                # WebGL: shader core, particle field
│   └── sections/             # one file per chapter of the story
├── data/                     # all copy
├── hooks/
└── lib/                      # shared easings, springs, helpers
```

---

## Design system

Two accents, each with a job:

- **sand `#C8A876`** — the human, editorial voice (it echoes the CV letterhead)
- **signal `#6E7BFF`** — the machine layer: Web3, cryptography, engineering annotations

Everything else is neutral ink and warm paper. Three type roles: serif for the narrative voice,
grotesk for reading, mono for machine annotation. One motion vocabulary (`src/lib/motion.ts`) —
two easings, three springs — used everywhere, which is what makes the animation read as a system
rather than a pile of effects.

---

## Accessibility & performance

- **`prefers-reduced-motion` is a first-class path**, not a switch that disables things. Lenis
  never starts, WebGL never loads, the pinned horizontal section becomes a vertical stack, and
  the scroll-scrubbed story becomes a readable list. Verified with the media feature emulated.
- **Every animated section has its full text in the DOM**, including the scroll-scrubbed opening
  (`sr-only`), so screen readers and crawlers get the whole narrative.
- Semantic landmarks, a skip link, a real tablist with arrow-key support in *Behind the
  interface*, disclosure buttons with `aria-expanded` in *Experience*, and visible focus rings.
- **WebGL is gated three ways**: reduced motion, `hardwareConcurrency < 4`, and no WebGL context.
  It is dynamically imported *and* held until `requestIdleCallback`, so first contentful paint
  never waits on the 3D bundle. Frames stop entirely once the hero scrolls out of view, and
  render resolution drops automatically if the frame budget is blown.
- See **SEO** below.

---

## Notes

- The horizontal project section pins only at `lg` and above with motion enabled; everything else
  gets the same content stacked vertically.
- The custom cursor is fine-pointer only. Touch devices keep the system cursor and get tap
  interactions instead of hover ones.
- The intro counter runs once per session (`sessionStorage`), so returning visitors go straight
  to the page.

---

## SEO

Everything a crawler reads is built from the same data files, in `src/lib/seo.ts`.

**Metadata** (`src/app/layout.tsx`) — title with a template, description, keyword set, canonical,
author/creator/publisher, `referrer`, `format-detection` (off, so Safari stops linkifying token
balances), Apple web-app tags, and `robots` with `max-image-preview:large` and `max-snippet:-1`
so Google may show the full snippet and a large thumbnail.

**Open Graph & Twitter** — `opengraph-image.tsx` renders a 1200×630 card at build time from a
vendored TTF, so a build never depends on a font CDN. Next reuses it for `twitter:image`, giving a
`summary_large_image` card with alt text. There is no `twitter:creator` because there is no X
account to name.

**Structured data** — one `@graph` with 11 linked nodes rather than a pile of disconnected
snippets, so search engines resolve one entity instead of four copies of it:

- `Person` — job title, description, email, telephone, address, `worksFor`, `alumniOf`,
  `hasCredential` (the BSc), `hasOccupation` with the full skill list, `knowsAbout`, `sameAs`
- `WebSite` and `ProfilePage`, cross-referenced by `@id`
- `ItemList` of the four projects, each a `CreativeWork` with its screenshot, stack and live URL
- An `Organization` node per employer named on the CV

**Routes** — `sitemap.xml` (with all five images attached, so the screenshots are eligible for
Google Images), `robots.txt`, and `manifest.webmanifest` with maskable icons.

**Icons** — `icon.svg`, `apple-icon.png` (180), and 192/512/maskable-512 PNGs for the manifest.

**Crawlability** — every section is server-rendered, including the scroll-scrubbed opening, which
keeps its full text in an `sr-only` block. 43 KB of text reaches a crawler with JavaScript off.
Section headings are a real `h1 → h2 → h3` outline; the `h2`s are screen-reader-only but
descriptive ("07 — About Dipesh Chaulagain", not "About").

### Before you go live

1. Point `profile.website` at the production domain — `metadataBase`, canonical, sitemap, robots
   and every absolute URL in the structured data derive from it.
2. Verify in Google Search Console, then set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (see
   `.env.example`). Without it the tag is simply omitted.
3. Submit `https://<domain>/sitemap.xml` in Search Console.
4. Run the URL through Google's Rich Results Test and LinkedIn's Post Inspector once the domain
   is live — both need a public URL, so neither can be checked from here.
