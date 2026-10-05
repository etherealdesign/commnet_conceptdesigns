# Resume here

Last session: 2026-10-05. Everything below is pushed to `main` and live at
https://commnet-conceptdesigns.vercel.app/ (demo link, `noindex`, no real domain).

## Current state

| Area | State |
|---|---|
| Teleiostec site (`sites/teleiostec/react/`) | Founder-led copy, new renders placed, HD video, mobile/tablet checked |
| Commnet sites (consultancy v1-react/v3/v4/v5, commnetsys, commnettech) | Watermarks removed, mobile/tablet checked |
| Hub (`index.html`) | Tablet nav and lead thumbnail fixed |

## Done on 2026-10-05

| Commit | What |
|---|---|
| `bd03051` | Gemini ✦ and "Veo" watermarks removed from all Teleiostec media |
| `b3dd3f4` | New Teleiostec renders placed: Home film (sketch → room), Services Interior/Fit-Out, Process Design/Build/Deliver |
| `b392b11` | Same watermark removal across every Commnet photo, video and embedded base64 image |
| `626a072` | Phone (390px) and tablet (820px) readability fixes on every hub site |
| `af61e6e` | All videos rebuilt at 1080p from originals; 720p copies served to phones |
| `00bc656` | Teleiostec rewritten as founder-led: Team page → Founder page, no in-house team/workshop claims |

## Waiting on the client (Teleiostec)

1. **Founder details** — name, 2–3 line story, portrait, real credentials.
   Fill every `[ ]` in `source/teleiostec-react/src/data/founder.ts`; photo goes in
   `public/Asset/team/` then `npm run images`. Page shows a monogram until then.
2. **Stats to confirm or remove** — "240 spaces delivered", "98% on-time handover",
   "ISO certified processes" (`src/data/site.ts`). ISO is unlikely for a one-person firm.
3. **Grosvenor-branded renders** — 6 stills and 4 clips from the Oct drop are held
   back because the logo is in shot. Need re-renders without the logo to use them.
4. **True HD video** — clips are Veo 720p upscaled to 1080p. Real detail needs
   them regenerated at 1080p.

Older open items (testimonials, commnettech identity, "7 offices", SIRA/ADMCC
wording) are unchanged — see `docs/SITES.md` and `docs/CONTENT-REVAMP-REVIEW.md`.

## How to pick up

```bash
./start.sh                       # hub + every build → http://127.0.0.1:8080/
./start.sh dev teleiostec        # hot-reload one source project
cd source/teleiostec-react && npm run build:review   # regenerate sites/teleiostec/react/
node scripts/build-reviews.mjs   # regenerate consultancy v3/v4/v5
```

A build with a `source/` project is never edited in `sites/` — change the source,
then rebuild. Static builds (commnetsys, commnettech, consultancy v1/v2) are
edited in place; their readability overrides sit in one `<style id="readability">`
block per page.

## Things that bit us — check before repeating

- **Push identity:** this repo pushes as `etherealdesign` (local git config).
  `git credential fill` must say `etherealdesign`, or pushes may not deploy.
- **Deploy check:** compare `curl -s <live-url>/<file> | md5sum` with the local
  file. The Vercel connector here returns 403 for this team.
- **Mobile check:** the Chrome extension cannot resize; use headless Chrome via
  `playwright-core` at 390×844 and 820×1180, served by `node scripts/serve.mjs 8091`.
- **New media:** every AI asset so far carried a Gemini ✦ or "Veo" mark
  (bottom-right), and the Oct drop carried a Grosvenor logo. Check before wiring in.
- **Shared clips:** Teleiostec React reads `feature`, `moment`, `moment-720` and
  `timelapse` from `sites/teleiostec/v2/Asset/media/` when byte-identical — update
  both copies together.
- **Loose files:** `living-film*` (unused) are untracked in
  `source/teleiostec-react/public/Asset/media/` and `sites/teleiostec/react/Asset/media/`;
  safe to delete. `teleiostec-com/` at the root is a 414 MB untracked leftover
  from before the 2026-09-29 reorganisation.
