# commnetsysconsult-v4 — build progress

React 19 + Vite + TypeScript + Tailwind CSS 4. A redesign of `commnetsysconsult-v3`:
the motion and interaction of the darknode.army reference, dressed in the
layout and style of integratedbio.com, in a light theme with Commnet's own
colours. Content, routing, SEO and the claims gate are carried over unchanged
from v3; `../CONTENT-REVAMP-REVIEW.md` is still the copy/taxonomy source of truth.

Run both concepts side by side with `../start.sh` (v3 on :5173, v4 on :5174);
each build carries a dev-only "V3 · V4" pill that flips to the same path on
the other build (`components/shared/VersionSwitch.tsx`).

Design goal, from the brief: premium engineering, enterprise trust, mission-
critical infrastructure, clean minimal luxury, technical yet human. Apple
precision + IBM enterprise + Awwwards motion.

## Design system — "enterprise"

Two earlier passes (a condensed-type HUD, then a rounded Manrope restyle)
both read as gaming. The instruments themselves were the problem, so this
pass removes them and keeps only corporate motion.

- **Grounds:** white and cool light grey `#F4F6F8`; navy `#0B1A2E` for text
  and the dark plates (hero, project stage, CTA band, footer). One brand blue
  `#2563EB` as the accent. Crimson `#CE2032` stays logo-only.
- **Type:** Inter for reading copy; Inter Tight 500 sentence case for every
  heading (`.d-hero`, `.d-1`, `.d-2`, `.d-3`); small-caps Inter for labels
  (`.mono`, the class name is historical, it is no longer monospace).
- **Shapes:** moderate radii, hairlines, a strict 12-column grid, cards with
  a hover lift. No pills with index numbers, no bracket numerals, no grain.
- **Nav:** solid white bar with a hairline; navy over a dark block. The
  header colour is derived from the live dark-block triggers and re-synced on
  every route change (`HeaderStore.syncDark`).
- **Motion kept:** clip-mask headline rise, staggered reveals, count-ups on
  the six proof numbers, the 3D aisle's drift and pointer lean,
  the sticky systems panel with a progress bar, the scroll-scrubbed project
  stage, the ruler trace under the six stages, the accordion FAQ.
- **Removed:** the HUD readouts (coordinates, scroll %, clock, counter),
  scramble-decode text, the canvas grid field, the radar, the reticle, the
  dial, the growing CTA plate, the giant footer wordmark.

## Structure — six routes, no unnecessary pages

`/` · `/services` (+5 detail) · `/solutions` (+6 detail) · `/projects` (+18
detail) · `/about` (now carries Compliance at `#compliance`) · `/contact`.
`/compliance` redirects to `/about#compliance`. 35 sitemap routes.

## Home, top to bottom

1. **Hero** — a 3D data-centre cold aisle (`hero/RackScene.tsx`, raw
   Three.js in its own lazy chunk): two rows of cabinets receding into fog,
   blinking status LEDs on the inner faces, cable trays with light packets,
   a raised-floor grid and a cold-aisle floor glow. The camera looks straight
   down the aisle with a film offset that puts the vanishing point in the
   right half of the frame, drifts slowly, and leans with the pointer.
   Statement, summary and two CTAs left, the register's headline numbers as
   a ruled strip. One draw call per element group; the loop stops off-screen
   and in hidden tabs; reduced motion renders one still frame.
2. **Statement** — "We install the systems buildings run on", the paragraph
   beside it, six proof numbers counting up.
3. **Systems stack** — sticky left panel (photo, summary, progress bar) with
   the five systems scrolling past on the right; the live one opens.
4. **Environments** — statement, then six photo cards.
5. **Showcase** — a pinned navy stage that turns through four register
   entries with a spec strip and counter.
6. **Method** — six stages on a hairline with a blue trace that draws on scroll.
7. **Repeat** — the GBM ×3 tiles.
8. **CTA** — navy band, statement left, two buttons right.
9. **FAQ** — numbered accordion.
   Footer: navy, four columns.

## Not built yet

Unchanged from v3: contact form endpoint (`VITE_CX_FORM_ENDPOINT`), real
photography, the company profile PDF, a Lighthouse run against a deployed URL,
the vector logo. Blocking client questions are in `../COMMNET-V3-HANDOVER.md` §4.
