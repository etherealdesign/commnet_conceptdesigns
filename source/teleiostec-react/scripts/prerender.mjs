/**
 * Runs after `vite build`. Builds src/entry-server.tsx for Node, renders every
 * route, and writes dist/<route>.html with that page's markup and head (title,
 * description, canonical, OpenGraph, Twitter, JSON-LD). vercel.json's
 * cleanUrls serves /studio from studio.html; unknown paths still fall back to
 * index.html and render client-side.
 *
 *   npm run build   (runs this as its last step)
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const app = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(app, 'dist')
const ssrOut = join(app, 'dist-ssr')

const { build } = await import('vite')
// copyPublicDir off: the Node bundle needs no copy of the photos and video in public/.
await build({ root: app, logLevel: 'warn', build: { ssr: 'src/entry-server.tsx', outDir: ssrOut, copyPublicDir: false } })
const { render, routes } = await import(pathToFileURL(join(ssrOut, 'entry-server.js')).href)

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function page(route, html, h) {
  if (!h) throw new Error('a route rendered without <Seo>')
  const tags = [
    `<link rel="canonical" href="${esc(h.url)}">`,
    `<meta property="og:title" content="${esc(h.title)}">`,
    `<meta property="og:description" content="${esc(h.description)}">`,
    `<meta property="og:url" content="${esc(h.url)}">`,
    `<meta name="twitter:title" content="${esc(h.title)}">`,
    `<meta name="twitter:description" content="${esc(h.description)}">`,
    `<meta name="twitter:image" content="${esc(h.image)}">`,
    // `<` is escaped so page text can never close the script tag.
    `<script type="application/ld+json" id="page-ld">${JSON.stringify(h.ld).replace(/</g, '\\u003c')}</script>`,
  ].join('\n')
  let out = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(h.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(h.description)}">`)
    .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esc(h.image)}">`)
    .replace('</head>', `${tags}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  // The template preloads the Home hero still; other pages never show it.
  if (route !== '/') out = out.replace(/<link rel="preload" as="image"[^>]*>\n?/, '')
  if (!out.includes(`<title>${esc(h.title)}</title>`) || !out.includes(h.url)) throw new Error('template markers missing in dist/index.html')
  return out
}

for (const route of routes) {
  const { html, head } = await render(route)
  const file = route === '/' ? join(dist, 'index.html') : join(dist, `${route.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(route, html, head))
  console.log(`prerender: ${route.padEnd(40)} ${(html.length / 1024).toFixed(0)} KB  ${head.title}`)
}
rmSync(ssrOut, { recursive: true, force: true })
