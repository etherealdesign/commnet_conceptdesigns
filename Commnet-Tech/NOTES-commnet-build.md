# Commnet — third build (`Commnet.html`)

A **separate, self-contained** version. `index.html` / `New Version.html` and their
CSS/JS are untouched. All three builds share `Assets/` and `vendor/`.

```
Commnet.html      structure + all copy
commnet.css       design system + every section
commnet.js        Lenis / GSAP motion, hero fan, index controllers
fonts/            Inter 400 + 500, self-hosted (96 KB total)
```

**Serve it, don't double-click it.** `python -m http.server` in this folder, then
open `http://localhost:8000/Commnet.html`. Over `file://` the browser blocks the
self-hosted fonts (CORS) and the page falls back to Helvetica. Everything else works.

---

## Content — where it came from

Every word is from **commnettech.com** (Commnet Technology Services Private Limited,
Chennai). Nothing was invented:

| On the page | Source |
|---|---|
| "A leading provider of IT and communication services… efficiency, security and reliability" | About page, verbatim |
| The 12 capability lines and their descriptions | Services page, condensed from the verbatim text |
| Smart city / BMS / gate & perimeter / RFID sub-lists | Home page solution lists |
| The commitment quote | Home page, verbatim |
| 10 years, 24/7 | Stated on the site |
| Address, both phone numbers, email | Site footer |
| Retail, manufacturing, healthcare | Named on the Services page under System Integration |

**Derived, not stated — check before publishing:**

- *12 service lines* — a count of the services the site lists.
- *Government & smart city, transport & mobility, energy & utilities* — inferred from
  the ITMS/ATMS, smart-metering and surveillance offerings. Reasonable, but Commnet
  should confirm these are markets they sell into.
- *"One accountable team"* and the framing copy around each discipline — written for
  this page from the site's own positioning.

**Deliberately absent** because the site has none, and inventing them would be worse
than leaving space: client logos, certifications, partner badges, named projects,
testimonials with real attributions, headcount, revenue, founding year, offices
beyond Chennai. When Commnet supplies any of these, the natural homes are a quiet
logo band above the Commitment section, and named case studies replacing the
generic images in *Capability domains*.

---

## The explorer — one section, three lenses

Solutions, Capabilities and Industries used to be three consecutive sections running
the *same* interaction: an index on the left, a reveal on the right. Three of those in
a row is monotonous to scroll and gives the visitor no reason to prefer one over
another. They are now a single component (`#systems`), with a segmented control
switching the lens:

| Lens | Items | What the stage shows |
|---|---|---|
| Disciplines | 5 | photograph, headline, description, service tags |
| Service lines | 12 | photograph, name, description |
| Industries | 6 | photograph, name, where it applies |

Every row's detail lives **inside that row** in the markup — that is the no-JS
rendering, the crawlable content, and the mobile layout (an accordion). Above
1180px, JS moves those same nodes once into the shared stage; there is no duplicated
content and no templating. `window.LENS_FOR` maps the surviving `#capabilities` and
`#industries` anchors onto their lens, so the old nav links still land correctly.

The three sections were 3,409px combined. The explorer is ~1,270px.

## The five disciplines

The site lists twelve services flatly. They're grouped here into five, so the page
has a spine — no service was dropped or added. They are the first lens of the
explorer described above. An earlier build repeated all five a second time as a
sticky card stack; that section was removed — same content, read twice, at the cost
of ~2,800px of scrolling.

| # | Group | Covers |
|---|---|---|
| 01 | Infrastructure | Data centre infrastructure · Systems & networking · Site & power · Generators |
| 02 | Security | Managed security · Data storage & security · BMS · Gate & perimeter |
| 03 | Digital systems | System integration · Software solutions · Cloud & hosting · Maintenance & outsourcing |
| 04 | Connectivity | Structured cabling · Low voltage & AV · Conferencing & signage · Help desk |
| 05 | Intelligent technology | Smart/safe city · IoT & metering · Video analytics, ANPR, RLVD · RFID |

---

## Design system

Tokens live at the top of `commnet.css` (§01). Change them there, not in sections.

- **Colour** — `#F7F7F5` paper, `#FFFFFF` objects, `#111111` ink, `#646464` secondary,
  `#DCDCD8` rules. A cool near-white radial field sits behind the hero and the closing
  CTA. Commnet red `#C8202B` appears exactly four times: the logotype mark and the
  three section pills' dots.
- **Two-tone headings** — every heading's second line carries `.dim` (`#AFB5BC`) and
  steps back. This is the page's signature move; keep it consistent.
- **Type** — Inter 400/500 only. Display `clamp(2.5rem, 5.2vw, 5.3rem)`.
  No third weight, no italics.
- **Radii** — 22 px on cards, 30 px on large frames, pill on controls.
- **Lift** — three shadow tokens, all wide and low-opacity. Objects sit above the
  field; nothing has a hard drop shadow.
- **Grid** — 12 columns, `1560px` max, `clamp(20px, 5.2vw, 88px)` outer margin.
  Section heads are centred; Position and Capabilities break left on purpose.

### Photography
One grade is applied to every photograph in CSS
(`saturate(.72) contrast(1.05) brightness(1.01)`) so ten separate stock images read as
a single edit rather than a folder. If images are replaced, keep the grade.

`Hero.png` (the neon VR image) and `dubai-skyline.jpg` are **unused** — the first is the
generated-tech cliché, the second is the wrong city for a Chennai company.

`commnet-logo.png` is unused: it's a white wordmark on transparent, invisible on a light
background. `commnet-logo-mark.png` — cropped from the supplied brand logo — is what the
nav and footer use. `commnet-logo-full.png` keeps the "Technology Services Private Ltd"
subtext if a larger lockup is ever wanted.

---

## Motion

- **Smooth scroll** — Lenis, driven off the GSAP ticker, synced to `ScrollTrigger.update`.
- **Hero fan** — five cards held in depth on a 1500 px perspective. The centre card is
  forward; the rest step back and turn away. Pointer tilts the whole assembly ±5°.
  It drifts one card every 4.2 s until the visitor touches it, then stops for good.
  Arrow keys step it when focused.
- **Hero lattice** — a canvas of three depth planes, nearest-neighbour links within each
  plane only. It runs only while on screen and only responds to a real cursor.
- **Explorer** — lens tabs are a real tablist: arrow keys move between them and the ink
  bar slides to the active one. Rows respond to hover on fine pointers, and to click and
  focus everywhere, so keyboard users get the same content.

- **Scroll progress** — a 2.5px blue rail fixed to the top edge, filled from the document
  scroll position, so a content-dense page still tells the visitor where they are.

`prefers-reduced-motion: reduce` collapses all of it: no Lenis, no lattice, no progress
rail, the fan becomes a flat rail, every element renders in its final state.

## Mobile

Not a collapsed desktop. The fan becomes a scroll-snap rail with no perspective; the
stat rail folds 4 → 2 → 1 column with its dividers following; the nav becomes a full-screen
drawer; the industries rows reflow so the descriptor sits under the name; the hero pill
drops its second clause below 560 px.

## Performance & accessibility

- No external requests at all — fonts, GSAP, ScrollTrigger and Lenis are all local.
- Fonts are two woff2 files, subset to Latin, preloaded, `font-display: swap`.
- Hero image preloaded with `fetchpriority="high"`; everything below the fold is
  `loading="lazy"` with intrinsic `width`/`height` to hold layout.
- Canvases and scroll animations are gated by IntersectionObserver — nothing renders
  off-screen.
- Semantic landmarks, one `h1`, skip link, visible focus rings, `aria-expanded` on the
  disclosure buttons, `aria-hidden` on decorative layers, real alt text on content
  images and empty alt on decorative ones.
- Organization JSON-LD, canonical, Open Graph and Twitter card in `<head>`.

**Still to wire:** the images are large (330–700 KB JPEGs). Convert them to WebP/AVIF at
two or three widths and add `srcset` before this goes live — it's the single biggest
Lighthouse win available.


---

## Page length

The page is deliberately short for the amount it covers — roughly **7,530px** on desktop
and **8,720px** on mobile, down from ~14,600px. What bought that back, largest first:

| Change | Saved |
|---|---|
| Solutions + Capabilities + Industries → one lensed explorer | ~2,140px |
| Removed the duplicated five-discipline card stack | ~2,800px |
| Capability domains as one four-across row, not two full-width banners | ~1,550px |
| `--sec` and section-head margins tightened | ~800px |
| Hero, CTA, quote padding and image aspect ratios | ~400px |

Seven sections remain. The hero is now the tallest single block at 1,141px; after that
the explorer at ~1,270px, which is carrying what used to be three sections.
