/**
 * Generates public/sitemap.xml and public/robots.txt from the data files, so
 * adding a service, environment or project can never leave the sitemap stale.
 * Runs as part of `npm run build`.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = process.env.SITE_ORIGIN ?? 'https://commnetsysconsult.com'

/** Pull `slug: '...'` values out of a data module without importing TS. */
const slugs = (file) =>
  [...readFileSync(resolve(root, 'src/data', file), 'utf8').matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

const services = slugs('services.ts')
const solutions = slugs('solutions.ts')
const projects = slugs('projects.ts')

const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  ...services.map((s) => ({ path: `/services/${s}`, priority: '0.8', changefreq: 'monthly' })),
  { path: '/solutions', priority: '0.9', changefreq: 'monthly' },
  ...solutions.map((s) => ({ path: `/solutions/${s}`, priority: '0.8', changefreq: 'monthly' })),
  { path: '/projects', priority: '0.9', changefreq: 'monthly' },
  ...projects.map((s) => ({ path: `/projects/${s}`, priority: '0.6', changefreq: 'yearly' })),
  { path: '/about', priority: '0.7', changefreq: 'yearly' },
  { path: '/contact', priority: '0.8', changefreq: 'yearly' },
]

const today = new Date().toISOString().slice(0, 10)

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(
    (r) =>
      `  <url>\n    <loc>${ORIGIN}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  ),
  '</urlset>',
  '',
].join('\n')

const robots = `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`

mkdirSync(resolve(root, 'public'), { recursive: true })
writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
writeFileSync(resolve(root, 'public/robots.txt'), robots)

console.log(`sitemap: ${routes.length} routes (${services.length} services, ${solutions.length} solutions, ${projects.length} projects)`)
