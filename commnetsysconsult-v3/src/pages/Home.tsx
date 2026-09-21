import { Hero } from '@/components/hero/Hero'
import { Systems } from '@/components/systems/Systems'
import { Method } from '@/components/method/Method'
import { Impact } from '@/components/impact/Impact'
import { Flagship } from '@/components/flagship/Flagship'
import { Repeat } from '@/components/repeat/Repeat'
import { Faq } from '@/components/faq/Faq'
import { Work } from '@/components/work/Work'
import { ComplianceNote } from '@/components/compliance/ComplianceNote'
import { About } from '@/components/about/About'
import { Seo } from '@/components/shared/Seo'
import { site } from '@/data/site'
import { organizationSchema, webPageSchema, faqSchema } from '@/utils/schema'

/**
 * The home page reads top to bottom as an argument: the claim (hero), the
 * statement and the taxonomy (systems), how the work is done (method), the
 * scale of it (impact), where (flagship), who came back (repeat), the
 * evaluator's questions (faq), the evidence (work), the regulatory position
 * (compliance) and the company (about). The footer asks for the BoQ.
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
      <Systems />
      <Method />
      <Impact />
      <Flagship />
      <Repeat />
      <Faq />
      <Work />
      <ComplianceNote />
      <About />
    </>
  )
}
