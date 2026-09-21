# commnetsysconsult-v5

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

React 19 · Vite · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger) · Lenis smooth
scroll · react-router-dom. Runs on :5175 from `../start.sh`; the dev-only pill at the
bottom of the screen flips to the same path on v3 (:5173) and v4 (:5174).

## Design system (v5, "landmark")

The reference for this concept is a premium studio site: two grounds that alternate
down the page (near-black `#141314` and light grey `#EEEEEE`), a grotesque for the
words (Archivo) and a monospace for everything that is a label (Geist Mono,
uppercase), squares with no radii, and one accent colour that does all the
pointing. The accent is a CSS variable: the brand blue by default, and the `C` key
cycles it (orange, green, violet) the way the reference does - the choice sticks
per browser.

Tokens and the 12-column grid (`grid-container`, `grid-layout`, `grid-span-N`,
`grid-start-N`) live in `src/index.css`. Every section declares its ground
(`theme-dark` / `theme-light`) and the fixed header - a container-width panel -
takes the surface colour of whichever section is under it once the page has
scrolled.

## Motion (matched to the reference's source, not its look)

Every mechanic below was read out of the reference's shipped JavaScript and
rebuilt with the same timings and curves:

| Moment | What happens |
|---|---|
| Preloader | four 16 px squares slide into place turning 90° on their corner (0.7 s expo in-out, staggered); `LOADING` resolves out of noise; at 2.275 s the plate is cut away on a diagonal (1.5 s expo in-out) and at 90 % of the cut the page is told to enter |
| Page enter | `PageEnterProvider` fires registered entrances in priority order, 80 ms between groups: header slides down (0), hero headline (1), then the rest |
| Headlines | `AnimatedHeadline`: per line, an accent bar sweeps in (0.45 s power3 in-out), a foreground bar follows 0.1 s later, the text appears at 0.5 s, both bars retract to the right; lines 0.15 s apart. Section titles play once on scroll |
| Body copy | `AnimatedSubtext`: SplitText lines under masks, y 100 % → 0, 0.8 s power3-out, 0.05 s apart |
| Buttons | left `+` rotates in from -45°/scale 0, label slides one box right, right `+` rotates out (700 ms power4 in-out); label scrambles and resolves on hover |
| Labels | `Scramble` (ScrambleTextPlugin): a pass of random glyphs in the accent, then the real text revealed left to right |
| Stats | cards rise from 25 % below (1 s expo-out, 0.1 s apart); `SlotNumber` digits roll through three stacks to -(20 + d) em over 1.5 s expo in-out, right column first |
| Process | not pinned: scroll progress between 55 % and 45 % of the viewport picks the stage; it steps right 48 px (quickTo, back-out), the others rest at 30 %; the `Indicator` square flies with the overshoot curve (.68, -.3, .32, 1.1); the sticky photo crossfades |
| Work | IntersectionObserver at 50 % with a 20 % margin picks the contract in view; each photo is scaled 1.3 and drifts -15 % → +15 % as its frame crosses the viewport |
| Menu | panel grows its grid row 0fr → 1fr (1 s expo in-out); links rise through masks (1.4 s expo-out, 0.1 s apart); contact rows follow (0.5 s, 0.04 s apart); photos fade; closes with a clip from the bottom (0.6 s) |
| Header | panel: transparent at top, surface colour after 50 px, wider padding with the menu open; slides away (`translateY(-200 %)`, 0.4 s quart in-out) until the page has entered, during route changes, and while the footer is within 10 % of the viewport top; MENU/CLOSE rolls vertically |
| Route change | `PageTransitionProvider` intercepts in-app links: a square two viewports on a side pivots in at the bottom-centre (rotate -90° → 0, 1 s quart in-out), holds while the route mounts, moves its pivot one viewport right and swings out to 90°; the page behind dims and blurs; the new page enters as the curtain leaves |
| Hero scroll | copy pushed down at 35 % of scroll speed, the glyph portrait at 30 %; the portrait grows from a point and warms from grey to the accent on entry |

## Architecture

```
src/
├── components/
│   ├── shared/      Block · Button · Scramble · SlotNumber · SectionHead
│   │                SmoothScroll (Lenis) · HeaderStore · AccentSwitch · PageHero
│   │                ProjectCard · RelatedProjects · CtaBand · Seo · Logo · VersionSwitch
│   ├── ui/          ascii-image
│   ├── hero/ home/ (Stats · Process · Work · Standard · Start) faq/ loader/
│   ├── compliance/ about/ contact/ nav/ footer/ process/ projects/
├── animations/gsap.ts        plugin registration + shared easing
├── data/                     ALL copy and numbers live here (home.ts is the home page)
├── hooks/                    useReveal · useCountUp
├── pages/                    one file per route
├── utils/schema.ts           JSON-LD builders
└── index.css                 design tokens, grid utilities, base styles
```

Photographs live in `public/media/`; which photo a project card shows is decided
per environment in `data/home.ts`.

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
