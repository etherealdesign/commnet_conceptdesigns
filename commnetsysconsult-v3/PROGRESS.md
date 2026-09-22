# commnetsysconsult-v3 — build progress

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

Restored from v1: full Dubai and Chennai office addresses, PO box, opening
hours and the Chennai phone/email (`data/site.ts`, rendered in Contact);
the four-person leadership roster (`data/leadership.ts`,
`components/about/Leadership.tsx`, mounted on /about).

Design pass:
- Home order is now hero, systems, method, impact, work, flagship, repeat,
  faq, compliance, about: the register (evidence) comes before the
  testimonials and FAQ.
- Method chapter tightened: title screen 80svh, the 30vh spacer and the
  min-h-screen on the delivery-model block removed, the two-line
  statement 70svh, list lead-in 8vh. Chapter is ~2100px, was ~3900.
- Impact stays the page's one pinned chapter; stride per fact is 70vh
  instead of 100vh. Home is 13.8k px at 1440, was 15.9k.
- Hero carries two actions (register, BoQ); page-level CtaBands removed
  because the footer already asks for the BoQ.
- Ship-check clean: 4 routes x 4 breakpoints, no overflow, clipping,
  overlap, contrast or console errors.

## 2026-09-22 (later): simplification pass

Home is now six sections on one grid, one dark block (the hero), no
decorative layers: hero, systems, work, method, proof, faq, footer CTA.
- Hero: left-aligned, set low in the frame; headline, the statement as
  its lead, one primary button and an underlined BoQ link. SonarGrid
  removed.
- Systems: statement and photo strip removed (the statement moved into
  the hero); the two datasheets stay.
- Work: three register entries on the page grid via ProjectCard; no
  carousel, no 240px split title. ProjectCard lost its overlay, sector
  chip and arrow square.
- Method: one light section, heading + paragraph + six-step list. No
  dark chapter, no sonar field, no legend.
- Proof (new, `components/proof/Proof.tsx`): the 18-contracts line, the
  three numbers from `impact`, and the three GBM records from `repeat`
  as a list. Replaces Impact (pinned), Flagship (cityscape) and Repeat
  (carousel) on the home page; the data stays in `data/home.ts`.
- ComplianceNote and the About teaser are off the home page; both live
  on /compliance and /about.
- Home is 6.5k px at 1440 (was 13.8k). Ship-check clean.
Unused now but kept: Impact.tsx, Flagship.tsx, Repeat.tsx,
ComplianceNote.tsx, Carousel.tsx, DragMarquee.tsx, sonar-grid.tsx.

## 2026-09-22 (later still): Lightship-idiom redesign

Reference: lightshiprv.com. The page is now a card, the menu is a room,
and the footer is a directory.

- **Shell** (`App.tsx`, `index.css`): the body is ink; the page sits in a
  20px-radius card of paper inset by `--shell-x`, with a fixed
  announcement strip (`components/shared/Announcement.tsx`, dismissible)
  above it. New vars: `--ann-h`, `--shell-x`, `--shell-h`. Page margin on
  desktop widened 24 → 40px.
- **Nav**: three clusters — menu button plus Systems/Solutions/Projects
  on the left, wordmark centred, Compliance/About and the enquiry pill on
  the right. The mobile-only overlay is gone; the menu is now for every
  breakpoint.
- **Menu**: a full card of white inside the same insets. Three photo
  tiles that name where they go (Systems, About, Projects), the site as
  six hairline rows at text-48, and both offices underneath. Escape
  closes it.
- **Footer**: the statement and the four destinations as hairline rows;
  then the enquiry (a pill email field whose value travels into the
  contact modal via `HeaderStore.contactEmail`), the Company and Systems
  columns, and both offices; then the claims small print; then the
  wordmark, copyright and the emirates.
- **PageHero**: off the photograph and onto paper. Breadcrumb, label,
  headline left across eight columns with its second clause in grey, the
  definition in the last four, then the photograph as a wide rounded
  plate and the facts as a ruled row. Fixes the grey-on-photo contrast
  the centred version had.
- **New CSS components**: `.hair-row` (the list idiom, indents and turns
  blue on hover), `.tile` + `.tile-label` (photo with a scrim and its
  name), `.pill-field`.
- **ProjectCard** adopts the tile: the name and quantity sit on the
  photograph, the terms underneath.
- Ship-check clean at 4 routes x 4 breakpoints; menu verified at 390.

## 2026-09-22 (evening): Lightship motion, layout and the v1 content

Reference read from source (lightshiprv.com main.css / app.js): F37 Bolton
→ Figtree; the heading scale (`heading-xl` … `-0.05em`, line-height 1);
12px rounded plates; 2.5rem pills with the label roll and the accent fill
on hover; round grey icon buttons; the sand pattern ground.

Motion, mechanic for mechanic (`components/motion/`):
- `AnimText` — chars rise from one line below (0.8s, `cubic-bezier(.38,0,.215,1)`,
  10ms per char), words clipped so nothing bleeds; CSS-driven, `html.is-ready`
  gated (`useReady`).
- `SlideIn` / `SlideGroup` — 1.8s `cubic-bezier(0,1,.4,1)` rise from a
  fluid 5–6.25rem offset, 80ms stagger.
- `useScrollProgress` — writes a 0–1 CSS variable as an element crosses
  the viewport (their `data-scroll-position/offset`).
- `Rail` — native snap carousel bleeding to the right edge, round arrows.
- `FeatureModal` — the tile "+" sheet.

Home, in the reference's order after the (unchanged) hero:
`Collage` (three columns of plates arriving from the edges by scroll
progress, centred intro) → `Stack` (giant sticky heading, cards sticky and
stacking with `scale(1 − p·0.15)` / `translateY(−5%·p)`, side blocks fading
by progress, closing card with the button) → `SystemsRail` (tiles + modal)
→ `Journey` (full-bleed plate, −0.1 parallax, one line + button) →
`BigText` (manifesto at heading-xl, char rise) → `Editorial` → `Industries`
→ `Discover` (register rail) → `Push` (sand pattern, email pill that opens
the enquiry pre-filled). FAQ is off the home page (it stays on the service
pages). Header is now the floating pill: transparent over the hero, white
and blurred after 50px, slides in on load.

v1 content now in v3 (`data/company.ts`, `data/services.ts`):
- timeline (About), industries (home rail + About), awards (Compliance,
  re-worded to the claims gate), Cyber Security & CSOC as discipline A6
  (page, hub card, DEWA CSOC and the command-centre environment mapped).
- Leadership and office addresses were already recovered.
