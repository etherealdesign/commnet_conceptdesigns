# Teleiostec

Static one-page site. No build step, no dependencies — `index.html`,
`css/main.css`, `js/app.js` and `Asset/`. Open `index.html` over any local
server (module-free, but the video and `srcset` behave better over HTTP than
over `file://`).

## Editing content

The founding year is written in exactly one place — `data-founded` on the
hero meta line:

```html
<span data-founded="2012">Est. 2012</span>
```

`js/app.js` renders both the "Est." label and the **Years of practice**
figure from it, so the two cannot drift apart and the figure does not go
stale each January. Change that attribute and nothing else.

The static `14` in the markup is the no-JavaScript fallback. It is correct
as authored and only matters when scripts are blocked; it does not need
updating annually.

## Assets

Only `Asset/media/` is referenced by the page. `Asset/photos/`,
`Asset/Parallax/`, `Interior/` and `_to_delete/` are unused source renders —
around 420 MB — and are excluded from git and from the deployment by
`.gitignore` and `.vercelignore` in the repository root. They exist only on
the machine they were generated on; treat them as scratch, not as backup.

## Going live

This site currently ships inside the Commnet concept-review deployment at
`/Teleiostec/`, which is **not for public distribution**. The repository root
`vercel.json` sends `X-Robots-Tag: noindex, nofollow` for every path, so
nothing here is indexed — correct while it is a review link, and correct for
a client site being previewed on someone else's domain.

To publish it on its own domain, scope that header rule so it no longer
matches this path, or drop it if the whole deployment goes public. That one
rule is the only thing holding the site back — there are no `noindex` meta
tags in `index.html` to hunt down.

Do not add a `robots.txt` with `Disallow: /` to suppress indexing. Blocking
the crawl prevents crawlers from ever reading the `noindex` header, which is
the usual reason pages stay indexed after someone tries to remove them.
