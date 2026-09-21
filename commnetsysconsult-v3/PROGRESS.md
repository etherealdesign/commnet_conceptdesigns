# commnetsysconsult-v3 — build progress

React 19 + Vite + TypeScript + Tailwind CSS 4 rebuild of commnetsysconsult.com,
per the Awwwards-grade master build prompt and `CONTENT-REVAMP-REVIEW.md`
(the copy/taxonomy source of truth — do not diverge from its Axis A / Axis B
service model or its "safe to publish" numbers without re-checking that doc).

## Design tokens (locked)

- Primary Blue `#2563EB` (existing brand blue — confirmed against the live
  `commnetsysconsult-com/index.html` `--blue` token)
- Dark Navy `#071826` · Background `#F7F9FC` · White `#FFFFFF`
- Text `#111827` · Secondary `#64748B`
- Font: Manrope (300–800), fluid type scale in `src/index.css`
- No gradients-as-decoration, no glassmorphism, no glow/neon — per brief.

## Built so far

- Project scaffold: Vite + React 19 + TS, Tailwind 4 (`@tailwindcss/vite`),
  GSAP + ScrollTrigger + SplitText (free since GSAP 3.13), Motion, Three.js,
  Lucide, react-router-dom. Folder architecture matches the brief's
  `src/components|animations|data|hooks|pages|styles|utils` layout.
- **Loader** — SVG mark stroke-draw → wordmark fade → fade out, <1.2s,
  reduced-motion aware. **Placeholder mark** — swap for Commnet's real logo
  vector the moment an SVG/AI file is available (see "Open items" below).
- **Nav** — sticky header, underline-on-hover links, magnetic CTA, fullscreen
  GSAP-staggered mobile overlay menu.
- **Hero** — SplitText word-stagger headline, fade-up sub/CTAs, an abstract
  SVG "blueprint" node network (not random particles) with GSAP-animated
  data packets streaming along the connectors and subtle mouse-parallax
  depth on the whole graph.
- **Trust bar** — four metrics, GSAP count-up once on scroll-into-view.
- All copy in `src/data/*.ts` uses only the "safe to publish" language from
  `CONTENT-REVAMP-REVIEW.md` §6 — e.g. "designed to SIRA & ADMCC
  specification", never "approved/certified/licensed" (§7.1), no AED
  contract values (§8.3), no Tier-1 / Regulation-800 / 175 MW claims (§7.2,
  §7.3, §7.6).

## Not built yet (next passes, section by section)

Services grid · Solutions alternating layout · Project register (18 cards +
filter) · Process timeline · About (storytelling/editorial) · Compliance
wall · Contact form · Footer · page routing for `/services/*`, `/solutions/*`,
`/projects/*` per the site architecture in the review doc §5 · SEO
schema/JSON-LD · reduced-bundle image pipeline.

## Open items — need Suresh / the client before those sections can go live

These are the **blocking** questions from `CONTENT-REVAMP-REVIEW.md` §9 —
copy is written defensively (§6/§7) so nothing false ships in the meantime,
but the Compliance section and any "approved" language stay generic until
answered:

1. SIRA licence — category + number, and which projects were under it.
2. ADMCC registration number.
3. ISO 9001 / 27001 — certificate numbers, or none.
4. Trade licence issue year (fixes the About timeline).
5. Per project: OK to name the end-client / publish contract value?
6. Jotun: is "800" a camera count?
7. Real Commnet logo as an SVG/AI vector (loader + nav currently use a
   placeholder network-node mark).
