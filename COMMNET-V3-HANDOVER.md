# Commnet v3 — build handover

Date: 2026-09-21 · Build: `commnetsysconsult-v3/` · Source of truth: `CONTENT-REVAMP-REVIEW.md`

The goal was repositioning, not a reskin: the site now argues Commnet's case the way
a prequalification document does — evidence first, taxonomy correct, and no claim
that cannot survive a tender evaluator checking it.

---

## 1. What changed in this pass

### Information architecture — the review's §5 model, built

The site was a single anchor-scroll page. It is now 36 routes: five system pages
(Axis A), six environment pages (Axis B), eighteen project pages, plus Compliance,
About and Contact. Every service and environment page follows the §5 page anatomy —
H1 with geography, a sourced 60-word definition, "what we deliver", evidence
filtered from the register, process, FAQ with schema, and a CTA that asks for a BoQ.

Cross-linking is computed, never hand-maintained: a system page lists the
environments that consume it, an environment page lists its systems, and every
project links to both. Change `data/projects.ts` and every count on the site moves.

### Repositioning moves

- **The register is the argument.** Project cards lead with measured quantities
  (13,000 points, 80 racks, 820 GRMS rooms), not adjectives. The review's §2.4
  finding — that the competitor has no project evidence at all — is the wedge, so
  evidence appears on every page rather than in one portfolio section.
- **Subcontracting is stated, not hidden** (§8.5). GBM brought Commnet back three
  times — Hilton, DEWA, Atlantis. For a prime-and-consultant audience that repeat
  business is the strongest reference on the site, so it is printed on the cards and
  in the client marquee ("Hilton · via GBM") instead of being smoothed over.
- **Contract values stay off public pages** (§8.3). Scale metrics carry the same
  weight to a buyer and expose nothing of a prime's commercial terms. The register
  and project pages say so explicitly and point to the company profile.

### Claims gate

`src/data/claims.ts` holds every red-teamed claim from §7 as a `null` value. The
site renders the safe wording until a value is filled in — see the table in
`commnetsysconsult-v3/README.md`. Nothing on the live site says "approved",
"certified", "licensed", "Tier-1", "Regulation-800" or "175 MW", and JSON-LD emits
`hasCredential` only when a licence number exists.

One judgement call worth flagging: the previous build published **"PENDING
CONFIRMATION"** badges on the SIRA / ADMCC / ISO cards. §6.7 says print the number
or do not list the credential — telling a tender evaluator that the company does not
know its own licence status is worse than silence. The compliance wall now states
what is true (we design to the current requirement and make the submission) and says
licences travel with the prequalification pack. The moment a number lands in
`claims.ts`, the credential card renders itself.

### Hero field — SonarGrid

The home hero's background is now `SonarGrid` (`src/components/ui/sonar-grid.tsx`),
a canvas dot lattice that answers a click with an expanding wavefront. It replaced
the navy plate and node graph.

Three reasons it is the better hero, beyond looking better: the metaphor is
Commnet's own subject rather than decoration — a regular lattice of points reads
as cabling points or devices on a floor plate, and the ping reads as a signal
propagating through them; the all-light hero removes the dark-header collision
the navy plate caused; and the whole hero becomes one interactive surface.

It is tuned calmer than the component ships (spacing 30, resting opacity 0.22,
3.6s between ambient pings, a slower and thicker wavefront), and its crosshair
cursor is overridden back to default because the site already draws its own
cursor ring. Verified in-browser: the field animates, a click emits a ping,
ambient pings keep firing, and under `prefers-reduced-motion` it paints a still
grid that a click does not disturb.

Supporting this meant making the project **shadcn-compatible** — `components.json`,
`src/lib/utils.ts` (`cn`), a `src/components/ui/` namespace, and shadcn's token
names declared in `index.css` mapped onto Commnet's palette rather than shadcn's
slate defaults. `shadcn init` was deliberately not run: it rewrites `index.css`
and would have replaced the design tokens.

`BlueprintNetwork.tsx` is retained but no longer mounted — keep it if the node
graph is wanted elsewhere, delete it otherwise.

### Design

Brand blue `#2563EB` confirmed against the live build's `--blue` token and kept, with
navy `#071826`, paper `#F7F9FC`, ink `#111827`. Manrope 300–800 on a fluid scale;
headings sit at weight 300 with a single weight-600 phrase as the only emphasis
device. No gradients-as-decoration, no glassmorphism, no glow.

Motion: SVG mark stroke-draw on load, SplitText word-rise on the hero, count-ups
once on scroll, clip-path reveals on the environment rows, Motion layout animation
on the register filter, a drawn process timeline, magnetic buttons, a desktop cursor
ring and a paused-on-hover client marquee. Every one is skipped under
`prefers-reduced-motion`.

---

## 2. Things found and fixed in the existing build

These were live bugs, not preferences.

**Every colour utility on the site was dead CSS.** 122 usages of the
`text-[--color-navy]` form emitted `color:--color-navy` — invalid, so the browser
discarded it and the text fell back to inherited colour. Tailwind v4 dropped that
Tailwind-3 shorthand. Since the tokens are declared in `@theme`, the fix is the
generated utilities themselves (`text-navy`, `bg-primary`, `border-secondary`).
Ten `border-[--line]` usages had the same defect.

**Custom classes were silently beating Tailwind utilities.** `.u-eyebrow` and
friends were unlayered, and in the CSS cascade an unlayered rule beats any layered
one *regardless of specificity* — Tailwind v4 emits utilities into
`@layer utilities`. A `text-[#6096fa]` override on an eyebrow was being discarded.
All component classes now sit in `@layer components`.

**Contrast failures.** Measured per route against composited backgrounds (alpha
resolved by painting pixels, so `oklab(… / .45)` on navy is evaluated correctly):
footer text at `white/40` was 3.77:1, brand blue on navy 3.48:1, and the oversized
editorial numerals 1.24:1 — effectively invisible, which defeated the device. On
dark surfaces the accent now steps up to `#6096fa` (5.9:1). All routes pass AA.

**A focusable element was hidden from assistive technology** — the environment row
images were `<a aria-hidden="true" tabIndex={-1}>`, reachable by pointer but absent
from the accessibility tree, and duplicating the real link beside them. They are
plain elements now.

**The build could not empty `dist/`** in the Cowork-mounted folder until delete
permission was granted, so every rebuild after the first failed.

---

## 3. One thing to decide: the logo is red, the site is blue

The real Commnet lockup — recovered from the embedded logo in `v1.html`, and now in
`public/brand/` — is a black wordmark with a **crimson** orbital device and crimson
bars in the "E". The site palette the brief locks is blue.

Right now the logo is used as-is and the crimson appears nowhere else, so it reads
as a brand mark sitting on a blue interface rather than as a clash. That is a
defensible position and it is what a lot of enterprise sites do. But it is a choice
someone should make deliberately rather than inherit:

1. **Keep as built** — blue interface, crimson mark. Costs nothing, decide later.
2. **Bring the crimson in** as a strict accent (one or two places — the active nav
   state, the CTA arrow). Ties the identity together, costs a design pass.
3. **Re-draw the mark in brand blue.** Cleanest visually, but it changes the
   company's identity and is the client's call, not ours.

`--color-mark` is already a token, so option 2 is a small change.

Separately: both logo files are **raster PNG**. Ask the client for the vector
(SVG/AI) — the loader animation and the nav would both sharpen.

---

## 4. Blocking client questions

Unchanged from `CONTENT-REVAMP-REVIEW.md` §9 — the copy is written defensively so
nothing false ships meanwhile, but these gate the compliance page and the About
timeline:

1. **SIRA licence** — category and number? Which projects ran under it?
2. **ADMCC registration** — number?
3. **ISO 9001 / 27001** — certificate numbers, or none?
4. **Trade licence issue year** — fixes the About timeline (currently the honest
   "founded in the early 2000s"; the old build's invented "2000" and "2010" are gone).
5. **Per project: may we name the end-client? May we publish the value?** Eight of
   eighteen ran under primes. DEWA's CSOC and the Dubai Police / CID surveillance are
   security-sensitive sites regardless of NDA.
6. **Jotun — is "800" a camera count?** If yes, the headline becomes 3,600+ cameras
   (flip `jotunEightHundredIsCameras` in `claims.ts`).
7. **EY "Tier-1"** — Uptime tier, or "tier-1 client"? The term is off the site either way.
8. **Offices: two or seven?** The live site claims seven; the builds show two. Both
   cannot ship at once.

Non-blocking: named engineer for the CTA, vendor partnership certificates, Fluke
ownership, photography rights.

---

## 5. Still to do

- **Wire the contact form.** It shows its success state locally and posts nowhere.
  Set `VITE_CX_FORM_ENDPOINT`, and only then consider a response-time promise (§7.12).
- **Photography** to replace the blueprint plates, once rights are confirmed.
- **Real Lighthouse run** against a deployed URL. The build is structured for it —
  route-level code splitting, long-lived vendor chunks, fonts preconnected, no
  layout-shifting imagery — but a number from a local static server would not mean
  anything.
- **Company profile PDF.** §8.1 argues it is worth more than any landing page; the
  site now links to it in three places and it does not exist yet.
- **`SITES.md`** still records the "7 offices" contradiction — resolve with Q8 above.
