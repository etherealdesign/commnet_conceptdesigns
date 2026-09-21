import { site } from '@/data/site'

/**
 * Page metadata + JSON-LD. React 19 hoists <title>, <meta> and <link> rendered
 * anywhere in the tree into <head>, so each page can declare its own without a
 * helmet dependency. JSON-LD is emitted as one `@graph` so the nodes can
 * cross-reference (`@id`) instead of repeating the organization on every page.
 */
export function Seo({
  title,
  description,
  path,
  graph = [],
  noindex = false,
}: {
  title: string
  description: string
  path: string
  graph?: object[]
  noindex?: boolean
}) {
  const fullTitle = path === '/' ? `${site.name}, ${site.descriptor}, UAE` : `${title}, ${site.name}`
  const url = `${site.url}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_AE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {graph.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
          }}
        />
      )}
    </>
  )
}
