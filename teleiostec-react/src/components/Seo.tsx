import { useEffect } from 'react'
import { SITE_URL } from '@/data/site'

type Props = {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) { el = create(); document.head.appendChild(el) }
  el.setAttribute(attr, value)
}
const meta = (key: 'name' | 'property', k: string, v: string) =>
  upsert(`meta[${key}="${k}"]`, () => { const m = document.createElement('meta'); m.setAttribute(key, k); return m }, 'content', v)

/**
 * Per-route head: title, description, canonical, OpenGraph, Twitter and a
 * page-level JSON-LD block. Updates the tags index.html ships with instead of
 * appending duplicates, so crawlers never see two descriptions.
 */
export function Seo({ title, description, path, image = '/og.jpg', jsonLd }: Props) {
  useEffect(() => {
    const full = path === '/' ? title : `${title} — Teleiostec`
    const url = SITE_URL + path
    const img = image.startsWith('http') ? image : SITE_URL + image
    document.title = full
    meta('name', 'description', description)
    upsert('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l }, 'href', url)
    meta('property', 'og:title', full)
    meta('property', 'og:description', description)
    meta('property', 'og:url', url)
    meta('property', 'og:image', img)
    meta('name', 'twitter:title', full)
    meta('name', 'twitter:description', description)
    meta('name', 'twitter:image', img)

    document.getElementById('page-ld')?.remove()
    const crumbs = path.split('/').filter(Boolean)
    const graph = [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }].concat(
          crumbs.map((c, i) => ({
            '@type': 'ListItem', position: i + 2,
            name: i === crumbs.length - 1 ? title : c[0]!.toUpperCase() + c.slice(1),
            item: SITE_URL + '/' + crumbs.slice(0, i + 1).join('/'),
          })),
        ),
      },
      ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
    ]
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.id = 'page-ld'
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    document.head.appendChild(s)
  }, [title, description, path, image, jsonLd])

  return null
}
