# Resume here

Last session: 2026-10-05 (evening). Everything below is pushed to `main` and live at
https://commnet-conceptdesigns.vercel.app/ (demo link, `noindex`, no real domain).

## Current state

| Area | State |
|---|---|
| Teleiostec site (`sites/teleiostec/react/`) | Founder-led copy, new renders placed, HD video, mobile/tablet checked. Home **Featured** now holds three film projects: PeopleLink, Grosvenor, Council Chamber |
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
| `6cc42f1` `3b6693e` `59c0027` | PeopleLink Experience Center added as the lead project with its 9:16 story film; year shown as 2026 |
| `5f51685` | Unverified stats (240 spaces, 98% on-time, ISO) replaced with years of practice / 4 disciplines / 1 point of contact |
| `3f9398f` | Dining sketch-to-room film plays on the Process Design step |
| `2c9235d` | **Grosvenor Business Tower** (Barsha Heights; reception & lobby *concept*, from the 24 Jul 2026 deck) added with the client's 9:16 clip, end card trimmed to 9 s. Home de-duplicated: projects with a film show only in Featured; Selected work lists the photo projects |
| `41f558d` | **Council Chamber · UAE · Design Proposal** added: 19 s film built from the SHJ RTA deck renders. Per client feedback no organisation is named — screens blanked (no PeopleLink logo), text generic, no portrait wall in any frame or still |

## Waiting on the client (Teleiostec)

1. **Founder details** — name, 2–3 line story, portrait, real credentials.
   Fill every `[ ]` in `source/teleiostec-react/src/data/founder.ts`; photo goes in
   `public/Asset/team/` then `npm run images`. Page shows a monogram until then.
2. ~~Stats~~ — done in `5f51685`. Only re-add numbers the client can back up.
3. **Grosvenor material** — Grosvenor turned out to be a client project, not a stray
   logo, so the held-back Oct-drop stills (`Downloads/Images Teleiostic/`) could now go
   on the Grosvenor page. Caveat: the clip used shows an *apartment-style* room while the
   PDF is a business-tower reception/lobby; the client chose it anyway (2026-10-05).
   The PDF's own renders (reception, lift lobby, corridor) would match better if they
   want a second pass.
4. **True HD video** — clips are Veo 720p upscaled to 1080p. Real detail needs
   them regenerated at 1080p.

5. **Council Chamber** — confirm the generic wording is final, and whether a year
   can be shown. Source deck: `Downloads/SHJ RTA DESIGN TELEIOS .pdf`.

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

## Next up (pick from here tomorrow)

- Client review of the live Featured section (three films) on a real phone — only
  headless 390px and desktop Chrome were checked.
- `feature.mp4` (shared clip) measured jittery (median 0.29, p90 1.9). Could be the
  clip's own camera move; watch it before deciding to replace or stabilise.
- Optional: Grosvenor page stills / better-matching film (see item 3 above).

## Things that bit us — check before repeating

- **Push identity:** this repo pushes as `etherealdesign` (local git config).
  `git credential fill` must say `etherealdesign`, or pushes may not deploy.
- **Deploy check:** compare `curl -s <live-url>/<file> | md5sum` with the local
  file. The Vercel connector here returns 403 for this team.
- **Mobile check:** the Chrome extension cannot resize; use headless Chrome via
  `playwright-core` at 390×844 and 820×1180, served by `node scripts/serve.mjs 8091`.
- **New media:** every AI asset so far carried a Gemini ✦ or "Veo" mark
  (bottom-right), and the Oct drop carried a Grosvenor logo. Check before wiring in.
- **Films from stills:** use `scripts/film/` (README there). ffmpeg pan/zoompan
  moves in whole pixels and looked shaky to the client; measure with `jitter.py`.
- **Client/organisation names:** check renders for logos on screens and portrait
  walls before using them; proposal decks are confidential by default.
- **Shared clips:** Teleiostec React reads `feature`, `moment`, `moment-720` and
  `timelapse` from `sites/teleiostec/v2/Asset/media/` when byte-identical — update
  both copies together.
- **Loose files:** `living-film*` (unused) are untracked in
  `source/teleiostec-react/public/Asset/media/` and `sites/teleiostec/react/Asset/media/`;
  safe to delete. `teleiostec-com/` at the root is a 414 MB untracked leftover
  from before the 2026-09-29 reorganisation.
