# Commnet Systems — commnetsys.com

Static site, no build step. Serve the folder; don't open `index.html` over
`file://`.

```
python -m http.server 8765     # from the repository root
http://127.0.0.1:8765/Commnet-Sys/index.html
```

```
index.html    structure and all copy
new-era.css   the whole design
new-era.js    Three.js camera path, DOM depth layers, canvas scenes
vendor/       three r160, GSAP, ScrollTrigger, Lenis — bundled, runs offline
Assets/       commnet-logo.png, the only image the page loads
```

## Why the folder is only 1 MB

`loadPanel()` in `new-era.js` is a stub — superseded by the generative system.
The photograph filenames still sitting in the data arrays (`av-command-center.jpg`
and the rest) are never requested. Every visual on this page is geometry, so the
site needs the logo and `vendor/` and nothing else. Don't copy the `Assets/`
photography in on the assumption that it is used; confirmed by resource audit
in Chrome — 11 requests, 7 local, and the only image is the logo.

The two external requests are Google Fonts. The Chennai build self-hosts its
fonts; this one does not.

## The boot class

`<body class="booting">` carries `overflow:hidden`, and `new-era.js` removes it
once the boot sequence finishes. It can still read as `booting` several seconds
after load in an idle tab — the removal lands on first real interaction. This
is not a stuck page: `html` still scrolls, and the class clears on the first
wheel event. Verified.

`NOTES-new-era-build.md` is the authoring note that came with the folder —
architecture, the ten stations, materials, the contrast ramp, reduced-motion
behaviour. Read it before editing. Excluded from the deployment.

## Open

Carried over from the authoring notes:

- The boot sequence is a fixed ~1.5s timeline, not a real asset-load meter.
- Placeholders unresolved: Dubai address, verbatim testimonials with real
  attributions, partner logos, article links, form endpoint.
