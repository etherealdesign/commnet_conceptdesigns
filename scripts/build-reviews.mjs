/**
 * Builds the three React versions into reviews/<v> as folders that open by
 * double-clicking index.html — no server, no terminal.
 *
 * A browser opening a page from disk will not fetch a module script, so the
 * whole application has to be inside the document: one bundle, no code
 * splitting, script and stylesheet inlined. Routing moves to the hash because
 * there is nothing to rewrite deep paths, and the /media and /brand
 * references are made relative to the folder. Photographs stay as files —
 * <img src> works from disk.
 *
 *   node scripts/build-reviews.mjs
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync, statSync, rmSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
// v5 rasterises photographs to glyphs on a canvas, and a canvas cannot read a
// file:// image without tainting, so its photographs travel in the document.
const VERSIONS = [
  { id: 'v3', inlineMedia: false },
  { id: 'v4', inlineMedia: false },
  { id: 'v5', inlineMedia: true },
]
const ROOTED = /(["'`(])\/(media\/|brand\/|icons\.svg|favicon\.svg)/g

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

/** So the bundle cannot close the tag it is sitting inside. */
const safe = (code, tag) => code.replace(new RegExp(`</${tag}`, 'gi'), `<\\/${tag}`)

for (const { id: v, inlineMedia } of VERSIONS) {
  const src = join(root, `commnetsysconsult-${v}`)
  const out = join(root, 'reviews', v)
  console.log(`=== ${v}`)
  execFileSync('npx', ['vite', 'build', '--outDir', out, '--emptyOutDir'], {
    cwd: src,
    stdio: 'inherit',
    env: { ...process.env, VITE_BASE: './', VITE_HASH_ROUTER: '1', VITE_SINGLE: '1' },
  })

  const files = walk(out)
  const htmlPath = join(out, 'index.html')
  let html = readFileSync(htmlPath, 'utf8')
  const spent = []

  // the single entry bundle and the single stylesheet, straight into the page
  html = html.replace(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g, (tag, href) => {
    const f = files.find((p) => './' + relative(out, p).split('\\').join('/') === href)
    if (!f) return tag
    spent.push(f)
    return `<script type="module">\n${safe(readFileSync(f, 'utf8'), 'script')}\n</script>`
  })
  html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (tag, href) => {
    const f = files.find((p) => './' + relative(out, p).split('\\').join('/') === href)
    if (!f) return tag
    spent.push(f)
    return `<style>\n${safe(readFileSync(f, 'utf8'), 'style')}\n</style>`
  })
  // preloads point at files that are now inline
  html = html.replace(/\s*<link\b[^>]*rel="modulepreload"[^>]*>/g, '')
  html = html.replace(ROOTED, '$1$2')

  if (inlineMedia) {
    // One copy of each photograph in a lookup, and every reference to it
    // becomes a read from that lookup — the same picture is named in several
    // places and a data URI per mention would multiply the file.
    const map = {}
    for (const f of walk(join(out, 'media'))) {
      const name = relative(out, f).split('\\').join('/')
      if (!html.includes(name)) continue
      const type = f.endsWith('.png') ? 'image/png' : f.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
      map[name] = `data:${type};base64,${readFileSync(f).toString('base64')}`
      // the bundler quotes strings with double, single or backtick marks
      for (const q of ['"', "'", '`']) {
        html = html.split(q + name + q).join(`__M[${JSON.stringify(name)}]`)
      }
    }
    const names = Object.keys(map)
    if (names.length) {
      html = html.replace('<script type="module">', `<script>window.__M=${safe(JSON.stringify(map), 'script')}</script>\n<script type="module">`)
      html = html.replace('<script type="module">\n', '<script type="module">\nconst __M = window.__M\n')
      for (const n of names) rmSync(join(out, n), { force: true })
    }
    console.log(`inlined ${names.length} photograph(s) so the glyph renderer can read them`)
  }

  writeFileSync(htmlPath, html)
  for (const f of spent) rmSync(f, { force: true })

  // photographs are still fetched, so their paths must be folder-relative too
  let touched = 0
  for (const f of walk(out)) {
    if (!/\.(js|css)$/.test(f)) continue
    const before = readFileSync(f, 'utf8')
    const after = before.replace(ROOTED, '$1$2')
    if (after !== before) {
      writeFileSync(f, after)
      touched += 1
    }
  }
  const kb = Math.round(readFileSync(htmlPath).length / 1024)
  console.log(`inlined ${spent.length} file(s) — index.html is ${kb} KB; ${touched} other file(s) rewritten`)
}
console.log('reviews/ rebuilt — open reviews/index.html or any reviews/<v>/index.html')
