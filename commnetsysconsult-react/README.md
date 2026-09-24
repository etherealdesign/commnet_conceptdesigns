# commnetsysconsult.com — React build of concept V1

A multi-page rebuild of `../commnetsysconsult-com/v1.html`. The visual design is
v1's, ported class for class: palette, spacing, cards, the loader, the pill nav,
the Three.js hero grid, the pinned horizontal project reel, the orbit, the process
path, the map beam and the particle CTA. The content follows
`../CONTENT-REVAMP-REVIEW.md`, with its corrected two-axis taxonomy and red-team fixes.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # sitemap.xml + robots.txt, typecheck, production build → dist/
npm run preview
npm run build:review   # self-contained copy → ../commnetsysconsult-com/ (hash routing, opens from disk)
```

## Stack

React 19 · TypeScript (strict) · Vite 7 · React Router 7 · Tailwind CSS v4 with CSS-variable
brand tokens · Manrope · Lucide · GSAP 3.13+ with `@gsap/react`, ScrollTrigger and SplitText
· Motion for route curtains, filter layout and accordions · Three.js (lazy-loaded, hero only)
· Lenis smooth scroll (as in v1) · react-helmet-async with a JSON-LD `@graph` per page.

## Routes (36 URLs)

| Path | Page |
|---|---|
| `/` | Home: all v1 sections, re-written to the review's copy |
| `/services`, `/services/:slug` ×5 | Axis A: the five systems |
| `/solutions`, `/solutions/:slug` ×6 | Axis B: the six environments |
| `/projects`, `/projects/:slug` ×18 | The register, filterable by system, environment and emirate (the filters are kept in the URL) |
| `/compliance` | SIRA and ADMCC explained correctly, with links to each regulator |
| `/about`, `/contact` | |

Content lives in `src/data/`: one source for pages, schema and the sitemap.

## Environment (`.env.example`)

- `VITE_SITE_URL`: canonical origin for canonical tags, Open Graph and JSON-LD.
- `VITE_FORM_ENDPOINT`: the brief form POSTs JSON here. If it is empty, the form opens
  the visitor's mail client with the brief filled in. It never fakes a success message.
- `VITE_SHOW_CONTRACT_VALUES`: `false` by default. Per-project AED values stay hidden (§8.3),
  and each project shows its scale metric instead.

## Still waiting on the client (review §9)

- SIRA and ADMCC licence numbers. Until they exist, the copy says "designed to specification",
  and `hasCredential` is left out of the schema.
- Permission to name end-clients such as Hilton, DEWA and EY. Every project already shows its
  client of record (for example GBM).
- Jotun's "800" figure, the EY "Tier-1" wording, and the trade-licence year. The timeline only
  dates milestones that have evidence.
- Photography. The 13 images are v1's embedded stock, extracted to `public/images/`.

## SEO note

This is a client-rendered SPA. Meta tags and JSON-LD are set per route at runtime, which
Google renders. For other crawlers and link unfurlers, add prerendering at deploy time.
