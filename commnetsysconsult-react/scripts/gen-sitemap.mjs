// Writes public/sitemap.xml and public/robots.txt from the slugs in src/data.
import { readFileSync, writeFileSync } from 'node:fs'

const site = (process.env.VITE_SITE_URL || 'https://commnetsysconsult.com').replace(/\/$/, '')
const slugs = (file) => [...readFileSync(new URL(`../src/data/${file}`, import.meta.url), 'utf8').matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1])

const routes = [
  ['/', '1.0'],
  ['/services', '0.9'],
  ['/solutions', '0.9'],
  ['/projects', '0.9'],
  ['/about', '0.7'],
  ['/compliance', '0.7'],
  ['/contact', '0.8'],
  ...slugs('services.ts').map((s) => [`/services/${s}`, '0.8']),
  ...slugs('solutions.ts').map((s) => [`/solutions/${s}`, '0.8']),
  ...slugs('projects.ts').map((s) => [`/projects/${s}`, '0.6']),
]
const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([p, pr]) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
writeFileSync(new URL('../public/robots.txt', import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
console.log(`sitemap: ${routes.length} routes`)
