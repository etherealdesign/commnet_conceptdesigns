# Commnet Technology Services

Static site, no build step. Serve the folder — don't open `index.html` over
`file://`, or the browser blocks the self-hosted fonts (CORS) and the page
silently falls back to Helvetica.

```
python -m http.server 8765     # from the repository root
http://127.0.0.1:8765/Commnet-Tech/index.html
```

## What is in here

One site: Commnet Technology Services of Chennai, the newest and shortest of the
three builds that arrived in this folder (~7,700px).

```
index.html + commnet.css + commnet.js
fonts/    Inter 400 + 500, self-hosted
Assets/   photography
vendor/   GSAP, ScrollTrigger, Lenis — bundled, runs offline
```

The folder originally also carried two Commnet Systems Consultancy builds, which
are a different company and did not belong here. The WebGL one is now its own
site at `../Commnet-Sys/` for commnetsys.com. The GSAP one had no domain
assigned to it and is in `_archive/`, out of git and out of the deployment.

Source filenames were `Commnet.html`, `Old Version.html` and `New Version.html`.
The spaces were removed because they do not belong in a URL; nothing else about
those files was changed.

`NOTES-commnet-build.md` is the authoring note that came with the folder —
content sourcing, design tokens, motion, and the open placeholder list. Read it
before editing copy. Excluded from the deployment.

## Changed on the way in

The production canonical is commented out in `index.html`:

```html
<!-- canonical suppressed while this is hosted on the review domain; restore on launch:
     <link rel="canonical" href="https://commnettech.com/" /> -->
```

It pointed at `https://commnettech.com/`. Every path in this deployment already
carries `X-Robots-Tag: noindex, nofollow` from the root `vercel.json`, so this is
belt-and-braces — but a review copy should not be telling a crawler that the
client's live site is its canonical original. **Restore the tag when this build
moves to its own domain.**

`Assets/infrastructure-fiber-800.jpg` was added for the thumbnail on the review
index. The site itself does not use it.

## Still open

Carried over from the authoring notes, unresolved:

- **Images are unoptimised.** Ten JPEGs at 330–700 KB, no `srcset`, no WebP/AVIF.
  This is the single biggest performance win available and should be done before
  the site goes anywhere public.
- **`og:image` is a relative path** (`Assets/infrastructure-fiber.jpg`). Scrapers
  need an absolute URL — fix it at the same time as the canonical.
- **Form endpoint** is client-side validation only; the submit handler in
  `commnet.js` is not wired to anything.
- **Derived content to confirm with the client** — the "12 service lines" count,
  and the government/smart-city, transport and energy markets, are inferred from
  the source site rather than stated on it.
