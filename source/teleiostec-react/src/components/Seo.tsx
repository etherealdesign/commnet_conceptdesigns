import { createContext, useContext, useEffect } from 'react'
import { SITE_URL } from '@/data/site'

type Props = {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export type Head = {
  title: string
  description: string
  url: string
  image: string
  /** The page-level JSON-LD document (breadcrumbs plus the page's own entries). */
  ld: Record<string, unknown>
}

/** Everything a route puts in <head>, worked out once for the browser and for the prerender. */
export function headFor({ title, description, path, image = '/og.jpg', jsonLd }: Props): Head {
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
  return {
    title: path === '/' ? title : `${title} — Teleiostec`,
    description,
    url: SITE_URL + path,
    image: image.startsWith('http') ? image : SITE_URL + image,
    ld: { '@context': 'https://schema.org', '@graph': graph },
  }
}

/** Set by the prerender (src/entry-server.tsx) to receive the head of the page being rendered. */
export const HeadCollector = createContext<((h: Head) => void) | null>(null)

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) { el = create(); document.head.appendChild(el) }
  el.setAttribute(attr, value)
}
const meta = (key: 'name' | 'property', k: string, v: string) =>
  upsert(`meta[${key}="${k}"]`, () => { const m = document.createElement('meta'); m.setAttribute(key, k); return m }, 'content', v)

/**
 * Per-route head: title, description, canonical, OpenGraph, Twitter and a
 * page-level JSON-LD block. Updates the tags the page ships with instead of
 * appending duplicates, so crawlers never see two descriptions.
 */
export function Seo(props: Props) {
  const collect = useContext(HeadCollector)
  const { title, description, path, image, jsonLd } = props
  if (collect) collect(headFor(props))

  useEffect(() => {
    const h = headFor({ title, description, path, image, jsonLd })
    document.title = h.title
    meta('name', 'description', h.description)
    upsert('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l }, 'href', h.url)
    meta('property', 'og:title', h.title)
    meta('property', 'og:description', h.description)
    meta('property', 'og:url', h.url)
    meta('property', 'og:image', h.image)
    meta('name', 'twitter:title', h.title)
    meta('name', 'twitter:description', h.description)
    meta('name', 'twitter:image', h.image)

    document.getElementById('page-ld')?.remove()
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.id = 'page-ld'
    s.textContent = JSON.stringify(h.ld)
    document.head.appendChild(s)
  }, [title, description, path, image, jsonLd])

  return null
}
