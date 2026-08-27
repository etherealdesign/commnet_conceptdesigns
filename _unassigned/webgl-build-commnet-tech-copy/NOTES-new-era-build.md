# Commnet — Integration Simplified

Static site. Open `index.html` directly, or serve the folder (`python -m http.server`).

## Files

- `index.html` — page structure
- `styles.css` — design tokens + all layout
- `main.js` — content data + GSAP/Lenis motion system
- `vendor/` — GSAP 3.12.5, ScrollTrigger, Lenis 1.1.13 (bundled so the site runs offline)
- `Assets/` — photography

## Where to edit content

All copy for the solutions, industries, offices, testimonials and logo wall lives in the
data arrays at the top of `main.js` (`SOLUTIONS`, `INDUSTRIES`, `LOCATIONS`, `QUOTES`, `LOGOS`).
Change those, not the markup.

## Placeholders that need real Commnet content

1. **Dubai contact block** (`index.html`, `.contact__aside`) — address, phone, email.
2. **Testimonials** (`QUOTES` in `main.js`) — currently anonymised references. Replace with
   the supplied verbatim quotes and real attributions. No fictional people were invented.
3. **Client / partner logos** (`LOGOS` in `main.js`) — text wordmarks standing in for
   monochrome SVG logo assets.
4. **Insights links** — both story cards point at `#contact` until real article URLs exist.
5. **Form endpoint** — `#form` validates and confirms client-side only; wire the submit
   handler in `main.js` to the Commnet endpoint.

## Photography notes

`Assets/Hero.png` (the neon VR/AI image) is deliberately unused — it reads as the
generated-tech cliché the art direction rules out. The hero uses `dubai-skyline.jpg`.
Each solution and industry is mapped to its own photographic world in `main.js`;
`professional-it.jpg` and `security-operations.jpg` each cover two related disciplines
and are the first images to replace when more photography is available.

## Motion

- Smooth scroll: Lenis, driven off the GSAP ticker and synced to `ScrollTrigger.update`.
- Solutions section: pinned horizontal track, desktop/tablet only (`gsap.matchMedia`,
  min-width 821px). Below that it becomes vertical storytelling — no horizontal scroll.
- `prefers-reduced-motion: reduce` disables Lenis, parallax, pinning and all reveals;
  every element renders in its final state.
- Custom cursor and magnetic buttons are gated to fine-pointer devices.

---

# NEW ERA — the environment build

`new-era.html` + `new-era.css` + `new-era.js`. The light build
(`index.html`, `styles.css`, `main.js`) is untouched.

## Architecture

There are no sections. The document is a 1100vh empty scroll track;
its height is the *length of a camera path*. Ten stations sit in depth
150 units apart, and one camera travels a CatmullRom spline through
them. `scrollY / maxScroll` is the camera's position on that spline —
nothing else drives the page.

One WebGLRenderer, one scene, one camera. Objects are built once and
never destroyed; the solutions system is not rebuilt per discipline,
it *re-forms* by lerping 900 instance positions between four
formations (lattice / shell / tower / signal).

A second, deliberately tiny renderer draws one structural member per
two stations on a transparent canvas ABOVE the type layer, so real
geometry passes in front of the words. Those members are held to the
middle band so they never cross the micro type in the corners.

DOM text layers are fixed and driven by the same progress value: each
moves through depth (translate3d on a 1400px perspective), blurs with
distance, and fades — text behaves like an object.

## Stations

| # | station | object |
|---|---|---|
| 01 | ARRIVAL | 336 milled blocks in 8 rings + spars + glass blades + one emissive filament |
| 02 | POSITION | nine layered slabs the camera passes between |
| 03 | DURATION | architectural torus, 48 radial fins, flown through |
| 04 | SOLUTIONS | the persistent 900-element system, re-forming per discipline |
| 05 | INDUSTRIES | photographs as enormous cropped panels in world space |
| 06 | GLOBAL | 2200-point sphere, meridians, real lat/long nodes, travelling arcs |
| 07 | TESTIMONY | a drifting infrastructure panel behind the quote |
| 08 | INSIGHTS | two panels moving independently of the type |
| 09 | INVITATION | dark metal icosahedron emerging inside a wire cage |
| 10 | CONTACT | a field of technical rules |

## Materials and light

MeshStandardMaterial, metalness ~0.96, roughness 0.2-0.35, lit by a
procedural PMREM environment (three emissive panels in a dark room —
no external HDR, no examples/ dependency), one key, one rim, 0.55
ambient, ACES filmic tone mapping. Depth of field needs EffectComposer,
which is absent from the UMD build, so distance falloff is carried by
FogExp2 plus CSS blur on far text.

## Content

Unchanged Commnet content throughout. Placeholders still flagged:
Dubai address, verbatim testimonials, partner logos, article links,
form endpoint.

## Contrast

All text uses a measured four-step ramp against #030303
(17.0 / 8.0 / 6.2 / 4.9 : 1). No readable text is built from low-alpha
white. Type carries a soft shadow so it survives bright metal passing
behind it.

## Reduced motion

prefers-reduced-motion collapses the whole thing: the track becomes
auto-height, scenes become ordinary stacked full-height sections, the
loop and boot sequence do not run, one static frame is rendered.

---

# NEW ERA — futuristic build (separate files)

`new-era.html` + `new-era.css` + `new-era.js` are a **second, self-contained
version** of the same site. The original light build (`index.html`,
`styles.css`, `main.js`) is untouched — open either one.

Both share `Assets/` and `vendor/`.

## What it is

A dark, cinematic re-presentation of the *existing* Commnet content:
the same tagline, the same eleven disciplines, the same six industries,
six offices, testimonials, insights, contact fields and footer. No
services, statistics, offices, awards, clients or testimonials were
invented — every placeholder from the original build is still flagged
as a placeholder here (Dubai address, verbatim testimonials, partner
logos, article links, form endpoint).

## Scenes

| Section | Technique |
|---|---|
| Hero | Three.js — node shell + nearest-neighbour links + three nested wire shells + 3 particle depths. Cursor drives the camera, scroll dollies it inward, one red pulse crosses a random edge at a time. |
| Menu | 2D canvas particle field with proximity links. |
| Solutions | 2D canvas ring of 11 nodes. Selecting a discipline lights its node and fires pulses outward — "one connected infrastructure". Pinned; scroll steps through. |
| Industries | Pinned full-screen frames; outgoing image falls back, incoming comes forward. Swipe on mobile. |
| Global | Three.js wire globe. Real lat/long markers, arcs from Dubai to every regional office with travelling pulses; selecting a city rotates that marker to face camera. |
| CTA | 2D canvas drifting field. |

`vendor/three.min.js` (r160) is bundled so the page runs offline.

## Performance notes

- Every canvas is gated by a ScrollTrigger — nothing renders off-screen.
- Pixel ratio capped at 2 (1.5 on mobile); geometry counts drop on mobile.
- Camera smoothing is time-based (`1 - exp(-dt·k)`), so moves take the
  same wall-clock time at 30fps or 120fps.
- `prefers-reduced-motion` disables Lenis, the boot sequence, all pinning
  and every scene loop; the 3D scenes render one static frame.

## Known placeholders

Same list as the original build — see above. Additionally the boot
sequence is a fixed ~1.5s timeline, not a real asset-load meter; wire it
to actual progress if the asset payload grows.
