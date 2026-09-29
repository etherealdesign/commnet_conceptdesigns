import { site } from '@/data/site'
import { faqItems } from '@/data/faq'
import { heldCredentials } from '@/data/claims'
import { services } from '@/data/services'
import type { Project } from '@/data/projects'

const ORG_ID = `${site.url}/#organization`

/**
 * Organization graph. `hasCredential` is emitted ONLY when a real licence
 * number exists, asserting a credential you cannot evidence is exactly the
 * mistake the competitor teardown flags (CONTENT-REVAMP-REVIEW.md §2.4 / §7.1).
 */
export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    areaServed: site.emirates.map((e) => ({ '@type': 'AdministrativeArea', name: e })),
    address: site.offices.map((o) => ({
      '@type': 'PostalAddress',
      addressLocality: o.city,
      addressCountry: o.countryCode,
    })),
    knowsAbout: services.map((s) => s.title),
    ...(heldCredentials.length
      ? {
          hasCredential: heldCredentials.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: c.category,
            recognizedBy: { '@type': 'Organization', name: c.authority },
            identifier: c.number,
          })),
        }
      : {}),
  }
}

export interface Crumb { name: string; path: string }

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  }
}

export function faqSchema(items = faqItems) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    provider: { '@id': ORG_ID },
    areaServed: site.emirates.map((e) => ({ '@type': 'AdministrativeArea', name: e })),
    url: `${site.url}${path}`,
  }
}

export function projectSchema(p: Project) {
  return {
    '@type': 'CreativeWork',
    name: p.name,
    about: p.environment,
    creator: { '@id': ORG_ID },
    locationCreated: { '@type': 'Place', name: p.location },
    description: p.scope,
    url: `${site.url}/projects/${p.slug}`,
  }
}

export function webPageSchema(name: string, description: string, path: string) {
  return {
    '@type': 'WebPage',
    name,
    description,
    url: `${site.url}${path}`,
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
    publisher: { '@id': ORG_ID },
  }
}
