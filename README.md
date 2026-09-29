# Client site builds — review hub

Every client site and every version of it, behind one hub page (`index.html`).
Deployed to Vercel as a demo link with `noindex` on every path — nothing here is
pointed at a real domain.

## Run it

```bash
./start.sh                  # hub + every build → http://127.0.0.1:8080/
./start.sh dev v1-react     # hot-reload dev server (v1-react · v3 · v4 · v5 · teleiostec · all)
./start.sh build all        # rebuild the self-contained copies in sites/ from source/
./start.sh status           # what is running, on which port
./start.sh stop             # stop everything this project started
./start.sh help
```

Needs Node.js. First `dev`/`build` of a project runs `npm install` for it.

Every server binds to **127.0.0.1**, not `localhost`. On this Mac, Vite's default
`localhost` resolves to IPv6 `::1` only, and a browser that tries IPv4 gets
"connection refused" — that was why pages would not load.

No server needed to just look: every `sites/**/index.html` opens by double-click.

## Layout

```
index.html              the hub
start.sh                run / build / stop — see above
sites/                  what the hub links to: built, self-contained, deployable
  commnetsysconsult/
    v1-react/           current build     ← source/commnetsysconsult-v1-react
    v3/ v4/ v5/         React alternates  ← source/commnetsysconsult-v3|v4|v5
    v2/                 static one-page concept (not on the hub)
    v1/                 original static prototype (not on the hub)
  commnetsys/v1/        India site — static, a copy of consultancy v2 with 7 edits
  commnettech/v1/       static WebGL build — copy still needs repointing
  teleiostec/
    react/              current build     ← source/teleiostec-react
    v2/                 static one-page version (not on the hub) — keep it:
                        react/ reads three shared video clips from ../v2/Asset/media
source/                 editable React projects (npm run dev inside each, or ./start.sh dev)
assets/hub/             hub thumbnails (screenshots of each build)
docs/                   handover, content review, domain notes (SITES.md)
scripts/                serve.mjs (hub server), build-reviews.mjs (v3–v5), git helpers
Data/                   extracted company data — reference, not deployed
_unassigned/            finished builds with no domain — in git, never deployed
_archive/               superseded material — local only, git-ignored
```

A build with a `source/` project is never edited in `sites/` — change the source,
then `./start.sh build <target>`. The static builds have no source and are edited
in place.

## Old path → new path (reorganised 2026-09-29)

| Was | Now |
|---|---|
| `commnetsysconsult-com/` | `sites/commnetsysconsult/v1-react/` |
| `commnet HTML/Home v1.html` | `sites/commnetsysconsult/v1/index.html` |
| `commnet HTML/Home.html` | `sites/commnetsysconsult/v2/index.html` |
| `reviews/v3`, `v4`, `v5` | `sites/commnetsysconsult/v3`, `v4`, `v5` |
| `reviews/index.html` | merged into the hub (old copy in `_archive/`) |
| `commnetsys-com/` | `sites/commnetsys/v1/` (restored from git — it was deleted in `94674c3`) |
| `commnettech-com/` | `sites/commnettech/v1/` |
| `teleiostec-com/react/` | `sites/teleiostec/react/` |
| `teleiostec-com/` (static) | `sites/teleiostec/v2/` |
| `commnetsysconsult-react/` | `source/commnetsysconsult-v1-react/` |
| `commnetsysconsult-v3/v4/v5/`, `teleiostec-react/` | `source/…` (same names) |
| `SITES.md`, handover, content review | `docs/` |
| `website animation reference.mov` | `_archive/` |

`docs/SITES.md` still describes each domain's state and caveats; read its paths
through this table.

## Before any build goes live on its real domain

- Remove the `noindex` header for that project only (`vercel.json`).
- Remove the V1/V2 switcher pill from the static consultancy pages.
- Set a form endpoint (`VITE_FORM_ENDPOINT` / `CX_FORM_ENDPOINT`) — forms fall back to `mailto:` until then.
- commnettech: repoint the copy to Commnet Technology Services (`_unassigned/commnettech-chennai-content-build/`).
- Teleiostec: replace the placeholder Team page.
