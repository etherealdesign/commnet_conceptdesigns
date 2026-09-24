/**
 * Builds the review copy into ../commnetsysconsult-com/ — the folder the
 * review index (../index.html) links to for commnetsysconsult.com. Same
 * approach as ../teleiostec-react/scripts/build-review.mjs: it opens by
 * double-clicking index.html as well as over HTTP.
 *
 * A browser opening a page from disk will not fetch a module script, so the
 * whole app goes inside the document: one bundle (VITE_SINGLE), script and
 * stylesheet inlined. Routing moves to the hash (VITE_HASH_ROUTER) and every
 * asset path is folder-relative (VITE_BASE=./). Images stay as files.
 *
 *   npm run build:review
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync, statSync, rmSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(app, '..', 'commnetsysconsult-com')
const ROOTED = /(["'`(,\s])\/(images\/)/g

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
/** So the bundle cannot close the tag it is sitting inside. */
const safe = (code, tag) => code.replace(new RegExp(`</${tag}`, 'gi'), `<\\/${tag}`)

execFileSync('npx', ['tsc', '-b'], { cwd: app, stdio: 'inherit' })
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
  return `<script type="module">\n${safe(readFileSync(f, 'utf8'), 'script')}\n</script>`
})
html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="(\.\/[^"]+)"[^>]*>/g, (tag, href) => {
  const f = find(href)
  if (!f) return tag
  spent.push(f)
  return `<style>\n${safe(readFileSync(f, 'utf8'), 'style')}\n</style>`
})
html = html.replace(/\s*<link\b[^>]*rel="modulepreload"[^>]*>/g, '')
// Hosts with clean URLs serve this folder without its trailing slash, which
// resolves every relative path one level too high. Put the slash back first.
html = html.replace('<head>', `<head>\n<script>(function(l){if(l.protocol!=='file:'&&!/\\/$|\\.html$/.test(l.pathname))history.replaceState(null,'',l.pathname+'/'+l.search+l.hash)})(location)</script>`)
// A review copy is not the live site.
html = html.replace('<meta name="theme-color"', '<meta name="robots" content="noindex, nofollow" />\n    <meta name="theme-color"')
html = html.replace(ROOTED, '$1$2')
writeFileSync(htmlPath, html)
for (const f of spent) rmSync(f, { force: true })
rmSync(join(out, 'assets'), { recursive: true, force: true })

// Hosting files that mean nothing inside another deployment's folder.
for (const f of ['vercel.json', 'robots.txt', 'sitemap.xml']) rmSync(join(out, f), { force: true })

const left = (html.match(/["'`(,\s]\/images\//g) || []).length
const kb = Math.round(readFileSync(htmlPath).length / 1024)
console.log(`commnetsysconsult-com/ built — index.html is ${kb} KB, ${spent.length} file(s) inlined, ${left} rooted /images reference(s) left`)
