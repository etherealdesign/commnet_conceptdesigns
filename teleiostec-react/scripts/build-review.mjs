/**
 * Builds the review copy into ../teleiostec-com/react/ — the folder the
 * review index (../index.html) links to. Same approach as the Commnet
 * builds in ../scripts/build-reviews.mjs: it opens by double-clicking
 * index.html as well as over HTTP.
 *
 * A browser opening a page from disk will not fetch a module script, so the
 * whole app goes inside the document: one bundle (VITE_SINGLE), script and
 * stylesheet inlined. Routing moves to the hash (VITE_HASH_ROUTER), and every
 * root-relative /Asset, /favicon.svg and /og.jpg reference becomes
 * folder-relative. Photographs and video stay as files.
 *
 *   npm run build:review
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync, statSync, rmSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(app, '..', 'teleiostec-com', 'react')
const ROOTED = /(["'`(,\s])\/(Asset\/|favicon\.svg|og\.jpg)/g

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
/** So the bundle cannot close the tag it is sitting inside. */
const safe = (code, tag) => code.replace(new RegExp(`</${tag}`, 'gi'), `<\\/${tag}`)

execFileSync('npx', ['vite', 'build', '--outDir', out, '--emptyOutDir'], {
  cwd: app,
  stdio: 'inherit',
  env: { ...process.env, VITE_BASE: './', VITE_HASH_ROUTER: '1', VITE_SINGLE: '1' },
})

const files = walk(out)
const htmlPath = join(out, 'index.html')
const find = (href) => files.find((p) => './' + relative(out, p).split('\\').join('/') === href)
const spent = []
let html = readFileSync(htmlPath, 'utf8')

html = html.replace(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g, (tag, href) => {
  const f = find(href)
  if (!f) return tag
  spent.push(f)
  return `<script type="module">\n${safe(readFileSync(f, 'utf8').replace(ROOTED, '$1$2'), 'script')}\n</script>`
})
html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="(\.\/[^"]+)"[^>]*>/g, (tag, href) => {
  const f = find(href)
  if (!f) return tag
  spent.push(f)
  return `<style>\n${safe(readFileSync(f, 'utf8').replace(ROOTED, '$1$2'), 'style')}\n</style>`
})
html = html.replace(/\s*<link\b[^>]*rel="modulepreload"[^>]*>/g, '')
// The preload scanner fetches image preloads before the slash fix below can
// run; the hero <img> already carries fetchpriority=high, so drop the hint.
html = html.replace(/\s*<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/g, '')
// Hosts with clean URLs serve this folder as `.../react` (no slash), which
// resolves every relative path one level too high. Put the slash back before
// anything in the head is requested — replaceState, so no reload.
html = html.replace('<head>', `<head>\n<script>(function(l){if(l.protocol!=='file:'&&!/\\/$|\\.html$/.test(l.pathname))history.replaceState(null,'',l.pathname+'/'+l.search+l.hash)})(location)</script>`)
// Only the HTML shell is rewritten here: the JSON-LD's absolute https URLs don't match ROOTED.
html = html.replace(ROOTED, '$1$2')

// Video and its posters are byte-identical to the static site's copies one
// folder up, so the review copy reads those instead of shipping ~16 MB twice.
const SHARED = /Asset\/media\/\$\{(\w+)\}(\.mp4|-poster\.jpg)/g
const shared = (html.match(SHARED) || []).length
html = html.replace(SHARED, '../Asset/media/${$1}$2')

writeFileSync(htmlPath, html)
for (const f of spent) rmSync(f, { force: true })

// Files the site never requests: videos/posters (read from ../Asset), the
// unsized photo originals (srcsets only name -800/-1400), unused footage.
const unused = (f) => {
  const r = relative(out, f).split('\\').join('/')
  return /^Asset\/media\/.*(\.mp4|-poster\.(jpg|avif|webp))$/.test(r)
    || /^Asset\/media\/feature/.test(r)
    || /^Asset\/photos\/[a-z-]+[a-z]\.(jpg|avif|webp)$/.test(r)
    || r === 'Asset/logo.svg' || r === 'Asset/favicon.svg'
}
let pruned = 0
for (const f of walk(join(out, 'Asset'))) if (unused(f)) { rmSync(f); pruned += 1 }

// Hosting files that mean nothing inside another deployment's folder.
for (const f of ['vercel.json', 'robots.txt', 'sitemap.xml']) rmSync(join(out, f), { force: true })

const left = (html.match(/["'`(,\s]\/Asset\//g) || []).length
const kb = Math.round(readFileSync(htmlPath).length / 1024)
console.log(`teleiostec-com/react/ built — index.html is ${kb} KB, ${spent.length} file(s) inlined, ${shared} media path(s) shared with ../Asset, ${pruned} unused file(s) pruned, ${left} rooted /Asset reference(s) left`)
if (shared !== 2) throw new Error(`expected 2 shared media paths (video src + poster), found ${shared} — check Video.tsx`)
