import { Helmet } from 'react-helmet-async'
import { SITE, absUrl } from '../lib/site'
import { OFFICES, type Faq } from '../data/company'

export interface Crumb {
  name: string
  path: string
}

interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  crumbs?: Crumb[]
  faq?: Faq[]
  /** Extra JSON-LD nodes (Service, CreativeWork …) merged into the page graph. */
  graph?: Record<string, unknown>[]
  noindex?: boolean
}

const ORG_ID = `${SITE.url}/#organization`

/** Site-wide Organization node — the one entity every page refers back to. */
export const organizationNode = () => ({
  '@type': ['Organization', 'LocalBusiness'],
  '@id': ORG_ID,
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: absUrl('/images/logo-dark.png'),
  image: absUrl(SITE.ogImage),
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'].map((name) => ({ '@type': 'AdministrativeArea', name })),
  address: OFFICES.map((o) => ({
    '@type': 'PostalAddress',
    streetAddress: o.street,
    addressLocality: o.locality,
    addressCountry: o.country,
  })),
  contactPoint: OFFICES.map((o) => ({
    '@type': 'ContactPoint',
    telephone: o.phone,
    email: o.email,
    contactType: 'sales',
    areaServed: o.country,
  })),
  // hasCredential is deliberately omitted until licence numbers are confirmed (review §7.1).
})

export function Seo({ title, description, path, image = SITE.ogImage, crumbs, faq, graph = [], noindex }: SeoProps) {
  const url = absUrl(path)
  const fullTitle = path === '/' ? title : `${title} | ${SITE.name}`

  const nodes: Record<string, unknown>[] = [
    organizationNode(),
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, publisher: { '@id': ORG_ID } },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: fullTitle,
      description,
      isPartOf: { '@id': `${SITE.url}/#website` },
      about: { '@id': ORG_ID },
      primaryImageOfPage: absUrl(image),
      ...(crumbs ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    },
  ]
  if (crumbs) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absUrl(c.path) })),
    })
  }
  if (faq?.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  nodes.push(...graph)

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absUrl(image)} />
      <meta property="og:locale" content="en_AE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absUrl(image)} />
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })}</script>
    </Helmet>
  )
}
