# commnetsysconsult-v5 — build progress

React 19 + Vite + TypeScript + Tailwind CSS 4 rebuild of commnetsysconsult.com,
per the Awwwards-grade master build prompt and `../CONTENT-REVAMP-REVIEW.md`
(the copy/taxonomy source of truth — do not diverge from its Axis A / Axis B
service model or its "safe to publish" numbers without re-checking that doc).

See `../COMMNET-V3-HANDOVER.md` for what changed, what was found broken, the
open client questions, and the one open decision (logo crimson vs site blue).

## Design tokens (locked)

- Primary Blue `#2563EB` (confirmed against the live build's `--blue` token)
- Dark Navy `#071826` · Background `#F7F9FC` · White `#FFFFFF`
- Text `#111827` · Secondary `#64748B`
- `--color-mark` `#CE2032` — the wordmark's crimson orbital device. Reserved for
  the logo lockup and loader mark only; never an interface colour.
- Manrope 300–800 on a fluid scale. Headings at weight 300 with a single
  weight-600 phrase as the only emphasis device.
- No gradients-as-decoration, no glassmorphism, no glow/neon — per brief.

## Complete

**Foundation** — Vite + React 19 + TS, Tailwind 4, GSAP (ScrollTrigger +
SplitText), Motion, Lucide, react-router-dom. Component classes live in
`@layer components` so Tailwind utilities can override them.

**Routing — the review's §5 architecture, 36 URLs.** `/` · `/services` +5 ·
`/solutions` +6 · `/projects` +18 · `/compliance` · `/about` · `/contact` · 404.
Home ships in the entry bundle; every other route is code-split. Service,
solution and project pages cross-link off the data, so counts and related lists
are computed rather than maintained.

**Content** — all 18 contracts with systems (Axis A) and environment (Axis B)
mapping, per-page 60-word definitions, deliverables, and the GBM repeat-business
story §8.5 asks to be said out loud.

**Claims gate** (`src/data/claims.ts`) — every §7 red-teamed claim is `null`
until the client confirms it, and the safe wording renders automatically. The
compliance wall no longer publishes "pending confirmation" badges (§6.7: print
the number or do not list the credential).

**Sections** — loader (mark stroke-draw + real wordmark), adaptive nav (reversed
logo and white links over dark heroes), hero (full-viewport, SplitText word-rise,
`SonarGrid` dot field that answers a click with an expanding wavefront), trust bar
count-ups, five-system list, client marquee, six environment rows with clip-path
reveals, register with Motion layout filtering, process timeline, editorial
About, compliance wall with sourced regulator explainers, FAQ accordion, contact
form with floating labels and BoQ upload, footer.

**Imagery** — `BlueprintPlate`: eleven architectural line drawings (rack
elevations, control-room consoles, guest-floor stacks, camera fields of view,
UPS/CRAC rows) replacing the gradient placeholders, pending photography rights.

**SEO** — per-route `<title>`/description/canonical/OG via React 19 metadata
hoisting; JSON-LD `@graph` with Organization, WebPage, BreadcrumbList, Service,
CreativeWork and FAQPage. `hasCredential` is emitted only with a real licence
number. `scripts/gen-sitemap.mjs` derives sitemap.xml + robots.txt from the data
on every build.

**Accessibility** — AA verified per route with contrast measured against
composited backgrounds. Skip link, one h1 per route, keyboard-operable filters
and FAQ, visible focus, reduced-motion honoured everywhere.

**Deploy** — `vercel.json` and `public/_redirects` carry the SPA rewrite and
immutable asset caching.

## Inner pages — cinematic pass (2026-09-21)

Reference: nfinitepaper.com, same feel with Commnet's identity. The home page
already carried the idiom; this pass brought the inner routes up to it.

- `PageHero` is now a full-bleed photograph under an ink wash, one centred
  headline in cream with its second clause dimmed (`muted`), the breadcrumb in
  the picture's top-left, and the metrics as a ruled row on paper beneath.
  Registers as a dark `Block`, so the header turns cream over it.
- Two-tone headline device applied site-wide: home hero, every hub H1, and
  detail pages via `utils/title.ts` (`splitTitle`, dims the geography after
  the last comma).
- Photography replaces the navy `BlueprintPlate` line drawings everywhere.
  `services[]` and `solutions[]` carry `media`/`mediaAlt`; `work.media` is now
  derived from `solutionMedia` so project cards, project heroes and solution
  pages share one photo per environment. `BlueprintPlate.tsx` is deleted.
- `SpecPanel` (`components/shared/SpecPanel.tsx`): the tinted specification
  sheet — numbered rows, hairlines — used for "what we deliver" on service and
  solution pages. Rows without a body span the full width.
- Hub cards are photographic tiles with the title, summary and system chips
  over a bottom gradient.
- Nav: `Solutions` added (inner pages only); `Method` is a home anchor only.

## Preloader

`src/components/loader/DotMatrixWordmark.tsx` rasterises the real Commnet logo
PNG to an offscreen canvas, samples it on a 5px pitch, and turns every opaque
sample into a square. The cursor pushes through the matrix (radial force with
distance falloff, plus a spring back to each dot's home cell), so the mark keeps
reacting as long as the pointer moves and settles on its own. On exit every dot
takes an outward impulse from the centre and scatters, then the plate lifts.

Because the matrix is sampled from the artwork rather than drawn by hand, the
vector logo drops in later with no change here.

Reference: the user's screen recording of artefakt.mov. The *technique* (dot
matrix, cursor repulsion, scatter exit) is carried over; the layout, wordmark
and copy are Commnet's.

## Hero field

The home hero is a dark editorial lockup over `src/components/hero/NetworkField.tsx`
— a Three.js node-and-link graph. Nodes sit in a flattened ellipsoid, link to
their nearest neighbours, and light packets travel the links.

**Cursor tracking is the interaction, not a parallax tilt.** Every frame each
node is projected to screen space; distance to the pointer drives a `glow`
attribute, so nodes light up under the cursor and their links brighten with
them. On top of that the cursor is treated as a node of the graph: the six
nearest nodes reach out and draw beams to it, fading with distance. Custom
vertex/fragment shaders for nodes and links are what make the per-point glow
possible — `PointsMaterial` has no per-point size or alpha.

Three draw calls for the graph plus two for the cursor layer. Depth falloff is
done in-shader by fading alpha, which suits a transparent canvas over a CSS
backdrop better than scene fog mixing toward an opaque colour. Point size is
clamped so a node drifting near the lens cannot bloom into a blob. The loop
stops off-screen and in hidden tabs, caps DPR at 2, and under
`prefers-reduced-motion` paints one still frame and never starts a rAF.

Three.js is ~130 kB gzipped, so the field is `React.lazy`-loaded into its own
chunk and fades in — the hero paints on its CSS backdrop immediately.

The lockup is one `<h1>` reading "Mission-critical infrastructure delivered as
one package" (the approved H1, review §6.1) split across three optical weights:
two grotesque lines and a serif closing line in Bodoni Moda. All three scale
off one `--hero-u` unit capped so the longest word, INFRASTRUCTURE, cannot clip
at any width — verified at 1920/1440/1024/390 along with overlap and
horizontal-overflow checks.

`SonarGrid` (`src/components/ui/sonar-grid.tsx`) and `BlueprintNetwork.tsx` are
retained but unmounted — earlier hero directions, kept in case either is wanted
elsewhere.

## Not built yet

- Contact form endpoint (`VITE_CX_FORM_ENDPOINT` unset — the form shows its
  success state but posts nowhere). No response-time promise until it is live (§7.12).
- Real project photography.
- Company profile PDF — linked from three places, does not exist.
- Lighthouse run against a deployed URL.
- Vector (SVG/AI) logo to replace the two extracted PNGs in `public/brand/`.

## 2026-09-22: v1 content restore + creative-director pass

Restored from v1: full office addresses, PO box, hours, Chennai
phone/email (`data/site.ts`); four-person leadership roster
(`data/leadership.ts`, `components/about/Leadership.tsx` on /about).

Design pass:
- Selected contracts: one photograph per contract (`work.photos`), so no
  two frames repeat; layout is a full-width 16:10 lead followed by
  portrait pairs with the right column dropped 4rem. Section is ~half
  the height it was; home is 8.6k px at 1440, was 9.9k.
- Accent contrast: filled accent buttons and chips use white text (the
  ink-on-blue header button was 3.6:1). Small accent text steps to
  `--accent-text-light` #1D4ED8 on light and `--accent-text-dark`
  #6096FA on dark (`.label`, `.u-eyebrow`, `.text-primary`); fills keep
  #2563EB.
- Em-dash separators replaced with ` / `; scramble alphabet no longer
  emits em-dashes.
- Ship-check clean: 4 routes x 4 breakpoints.

## 2026-09-22 (later): simplification pass

The reference-site tics are out; the structure stays.
- Hero: a photograph on the right instead of the glyph portrait;
  "+ many more" removed from the client line.
- Scramble renders plain text (API kept, so Button/SectionHead/Nav are
  untouched); `.label` lost its `// ` prefix.
- AccentSwitch removed from App (the footer's "C change colour" button
  still cycles the accent). Footer reverted to the previous version at
  the client's request: newsletter form, status ticker, site map, and
  the glyph-rendered skyline behind the wordmark.
- Work and ProjectCard meta lines read `Sector · quantity · via prime`
  instead of bracketed mono.
- FAQ on the light ground (page is now dark / light / light / dark /
  light / light / light / dark); questions in body type, not mono caps.
- Process: inactive steps at 0.55 opacity (was 0.3), active slide 24px
  power2 (was 48px back.out).
- Page curtain 0.6s each way (was 1s + 1.1s).
- Home is 8.4k px at 1440. Ship-check clean.
