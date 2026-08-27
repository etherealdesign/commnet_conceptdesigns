# Teleiostec

Static one-page site. No build step, no dependencies — `index.html`,
`css/v2.css`, `js/v2.js` and `Asset/`. Open `index.html` over any local
server (module-free, but the video and `srcset` behave better over HTTP than
over `file://`).

The live page is version 02. The first build is kept, unlinked, as
`index-v1.html` with `css/main.css` and `js/app.js`; nothing links to it and
it can be deleted whenever the v2 direction is settled.

## Editing content

The founding year is written in exactly one place — `data-founded` on the
studio note:

```html
<span data-founded="2012">Est. 2012</span>
```

`js/v2.js` renders both the "Est." label and the **Years of practice**
figure from it, so the two cannot drift apart and the figure does not go
stale each January. Change that attribute and nothing else.

The static `14` in the markup is the no-JavaScript fallback. It is correct
as authored and only matters when scripts are blocked; it does not need
updating annually.

## Assets

The page uses `Asset/media/` plus three sets in `Asset/photos/` —
`craftsman-working-on-walnut-cabinet`, `curved-walnut-and-limestone-inte` and
`modern-interior-corridor-leading`. Those three are committed; the rest of
`Asset/photos/`, along with `Asset/Parallax/`, `Interior/` and `_to_delete/`,
are unused source renders — around 420 MB — excluded from git and from the
deployment by `.gitignore` and `.vercelignore` in the repository root. They
exist only on the machine they were generated on; treat them as scratch, not
as backup.

If you reference a new file from `Asset/photos/` you must un-ignore it in
both of those files, or it will render locally and 404 in the deployment.

`Asset/media/` derivatives are named by their real pixel width and cap at the
original's native size — `atrium-1087.jpg`, `hearth-1023.jpg` — so there is no
generic `-1400` or extensionless original to fall back on. Check what is on
disk before writing a `srcset`.

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
