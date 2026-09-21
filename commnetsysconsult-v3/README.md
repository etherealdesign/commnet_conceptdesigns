# commnetsysconsult-v3

Production rebuild of **commnetsysconsult.com** — positioning Commnet as a premium
enterprise ELV & ICT systems integrator rather than a services-list website.

`../CONTENT-REVAMP-REVIEW.md` is the **single source of truth** for copy, service
taxonomy, project evidence and information architecture. Do not diverge from its
Axis A / Axis B model or its "safe to publish" numbers without re-reading it.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # sitemap + typecheck + production build
npm run preview    # serve dist/
npm run typecheck
npm run lint
```

## Stack

React 19 · Vite · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger + Observer) ·
Lenis smooth scroll · react-router-dom.

## Design system (v4, "paper & ink")

The site is set in one typeface at one weight (Instrument Sans 500) on a numeric
scale (`text-13`, `text-25 md:text-60`, up to `text-240`), a real column grid
(`--column / --gutter / --margin`, used as `span-w-5`, `md:span-wide-6`,
`span-ml-2`, `margin-px-1`) and two grounds: `paper` for the page and `ink` for
the dark chapters. Chips carry the taxonomy, hairlines carry the structure.
Tokens live in `src/index.css`; the grid classes are `@utility` so they take
variants.

Motion is one vocabulary: scroll-driven things are scrubbed (no duration), pointer
things are expo-out. `Block` is the section primitive - a dark Block flips the
fixed header to cream only while it is actually underneath it, and an anchored
Block lights its nav link while it fills the viewport. `Parallax`, `Carousel`
(native scroll-snap + drag + prev/next + dots) and `DragMarquee` (scroll-velocity
strip you can throw) are the three reusable motion pieces. The home page's
`Impact` chapter is pinned and turns its pages with the scroll.

## Architecture

```
src/
├── components/
│   ├── shared/      Block · Button · Carousel · DragMarquee · Parallax
│   │                SmoothScroll (Lenis) · HeaderStore · PageHero · ProjectCard
│   │                RelatedProjects · CtaBand · ClientMarquee · Seo · Logo
│   ├── ui/          third-party primitives (shadcn namespace) - SonarGrid
│   ├── hero/ systems/ method/ impact/ flagship/ repeat/ faq/ work/
│   ├── compliance/ about/ contact/ nav/ footer/ process/ projects/
├── animations/gsap.ts        plugin registration + shared easing
├── data/                     ALL copy and numbers live here (home.ts is the home page)
├── hooks/                    useReveal · useCountUp
├── pages/                    one file per route
├── utils/schema.ts           JSON-LD builders
└── index.css                 design tokens, grid utilities, base styles
```

Photographs live in `public/media/` (from `../assets/`, resized to 1600px); which
photo a project card shows is decided per environment in `data/home.ts`.

### Routes

`/` · `/services` · `/services/:slug` (5) · `/solutions` · `/solutions/:slug` (6) ·
`/projects` · `/projects/:slug` (18) · `/compliance` · `/about` · `/contact` · 404.

36 URLs, matching the review's §5 architecture. `scripts/gen-sitemap.mjs` derives
`sitemap.xml` and `robots.txt` from the data files on every build, so the sitemap
cannot drift from the content.

SPA deep links need a rewrite-to-index rule — `vercel.json` and `public/_redirects`
both ship one.

## Two rules that matter

**1. Copy and numbers live in `src/data/`.** Components render; they never
hard-code a fact. If a figure is wrong, it is wrong in one file.

**2. `src/data/claims.ts` is a gate, not a config.** Every regulatory or factual
claim the review red-teamed (§7) is `null` until the client confirms it in writing.
While a value is null the site renders the *safe* wording automatically:

| Gate | Renders while unconfirmed |
|---|---|
| `siraLicence` / `admccRegistration` | "Designed to SIRA & ADMCC specification" — never "approved", "certified" or "licensed" (§7.1) |
| `heldCredentials` empty | Compliance wall states that licences travel with the prequalification pack, rather than publishing a "pending confirmation" badge (§6.7) |
| `publishContractValue: false` | Scale metrics only — no AED values anywhere public (§8.3) |
| `responseTimePromise: null` | No response-window promise (§7.12) |
| `namedEngineer: null` | CTA omits the named engineer (§6.10) |

`utils/schema.ts` emits `hasCredential` **only** when a real licence number exists.
Asserting a credential with no evidence is precisely the mistake the competitor
teardown flags (§2.4).

Claims deliberately absent everywhere: "Tier-1" (§7.2 — Uptime Tier I is the
*lowest* tier), "Regulation-800" (§7.3 — almost certainly 800 cameras), "175 MW"
(§7.6), and the Healthcare / Education / Smart Cities sectors, which have no
project behind them (§7.11).

## Imagery

Project and environment artwork is `BlueprintPlate` — architectural line drawings
rendered as SVG (rack elevations, control-room consoles, guest-floor stacks, camera
fields of view). This is a deliberate stand-in: photography rights are an open
client question (§9 Q13), and a gradient placeholder reads as unfinished. Every
consumer renders the plate behind a fixed aspect box, so swapping in photographs
later is a single-component change.

## Brand assets

`public/brand/commnet-ld.png` (light surfaces) and `commnet-lw.png` (reversed, for
navy) were extracted from the current production build's embedded logo. They are
raster — **replace both with the vector lockup when the client supplies SVG/AI**;
no markup change is needed.

## Accessibility

WCAG 2.1 AA: semantic landmarks, one `h1` per route, skip link, visible focus
rings, keyboard-operable filters and FAQ, `prefers-reduced-motion` honoured by
every animation (GSAP timelines are skipped, Motion layout animation is disabled,
the marquee and cursor ring stop). Contrast was measured per route against
composited backgrounds; see `../COMMNET-V3-HANDOVER.md` for the audit result.
