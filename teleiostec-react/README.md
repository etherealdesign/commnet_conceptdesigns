# Teleiostec — React build

React 19 + Vite + TypeScript + Tailwind CSS 4 rebuild of the static
`../teleiostec-com/` site (which is left untouched). Every menu item is its
own route, and there is a new **Team** page.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve dist/
npm run images     # after adding/replacing any .jpg under public/Asset
npm run build:review   # rebuild ../teleiostec-com/react/ — the copy the review index links to
```

**The review index card links to `../teleiostec-com/react/`, not to this
folder.** That copy is generated, so re-run `npm run build:review` after any
change here, or the card shows the old site. It is a single inlined page with
hash routing (`#/team`), so it works both over HTTP and opened straight from
disk. Its video and posters are read from `../teleiostec-com/Asset/media/`,
so keep that folder.

## Routes

| Path | Page |
|---|---|
| `/` | Home — video hero, scroll-lit statement, pinned horizontal work gallery, services with cursor preview, film plate, numbers, team teaser |
| `/projects` | Filterable grid (Motion layout animations) |
| `/projects/:slug` | Project detail with clip-reveal hero and "next project" |
| `/studio` | Story, film, principles, craft spread, numbers |
| `/services` | Four disciplines with sticky copy + parallax imagery; `/services#joinery` deep-links |
| `/process` | Pinned image-stack of the four stages |
| `/team` | **New.** Leadership spreads + team grid, bio drawer |
| `/contact` | Enquiry form (opens the visitor's mail client — there is no backend) |

## ⚠️ Before going live

1. **Team content is placeholder.** `src/data/team.ts` — every name, role and
   bio is a stand-in. Add portraits to `public/Asset/team/`, run
   `npm run images`, and set `photo: '/Asset/team/<file-without-ext>'`.
   Cards show a monogram until a photo is set.
2. **Project body copy** in `src/data/projects.ts` and **service deliverables**
   in `src/data/services.ts` were written from the original captions — have
   the client confirm them.
3. `SITE_URL` in `src/data/site.ts`, `public/sitemap.xml` and the JSON-LD in
   `index.html` assume `https://www.teleiostec.com`.

## How it's put together

- **Animation:** GSAP (ScrollTrigger, SplitText) for scroll/timeline work,
  Motion for component state (menu, page curtains, filters, drawer), Lenis
  for smooth scroll driven off the GSAP ticker. All of it respects
  `prefers-reduced-motion`.
- **Three.js** is used once — `src/three/Particles.tsx`, a single-draw-call
  dust field on dark sections. It is code-split and only loads after the
  visitor's first interaction, near the viewport.
- **Images:** `<Img>` emits `<picture>` with AVIF → WebP → JPEG, `srcset`,
  explicit dimensions and lazy loading. `scripts/optimize-images.mjs`
  (sharp) writes the siblings; every `.jpg` must have them.
- **SEO:** `src/components/Seo.tsx` sets title, description, canonical,
  OpenGraph/Twitter and a per-page JSON-LD graph (breadcrumbs + page type:
  CreativeWork, Service, HowTo, Person…). The organisation schema lives in
  `index.html`.
- **Founding year** is `FOUNDED` in `src/data/site.ts`; "years of practice"
  derives from it.

## Deploying

`vercel.json` rewrites every non-asset path to `index.html` (SPA routing) and
sets long cache headers. Note the parent repo's root `vercel.json` sends
`X-Robots-Tag: noindex` for the review deployment — see
`../teleiostec-com/README.md` before publishing on the real domain.
