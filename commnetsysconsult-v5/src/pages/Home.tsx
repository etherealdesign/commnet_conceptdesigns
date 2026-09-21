import { Hero } from '@/components/hero/Hero'
import { Stats } from '@/components/home/Stats'
import { Process } from '@/components/home/Process'
import { Work } from '@/components/home/Work'
import { Standard } from '@/components/home/Standard'
import { Faq } from '@/components/faq/Faq'
import { Start } from '@/components/home/Start'
import { Seo } from '@/components/shared/Seo'
import { site } from '@/data/site'
import { organizationSchema, webPageSchema, faqSchema } from '@/utils/schema'

/**
 * Dark, light, light, dark, light, dark, light. The page alternates its
 * ground so every chapter has an edge, and the header takes the colour of
 * whichever chapter is under it.
 */
export function Home() {
  return (
    <>
      <Seo
        title={site.name}
        description={site.description}
        path="/"
        graph={[organizationSchema(), webPageSchema(site.name, site.description, '/'), faqSchema()]}
      />
      <Hero />
      <Stats />
      <Process />
      <Work />
      <Standard />
      <Faq />
      <Start />
    </>
  )
}
