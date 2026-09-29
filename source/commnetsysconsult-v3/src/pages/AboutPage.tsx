import { PageHero } from '@/components/shared/PageHero'
import { About } from '@/components/about/About'
import { Timeline } from '@/components/about/Timeline'
import { Industries } from '@/components/home/Industries'
import { Leadership } from '@/components/about/Leadership'
import { Process } from '@/components/process/Process'
import { ClientMarquee } from '@/components/shared/ClientMarquee'
import { Seo } from '@/components/shared/Seo'
import { breadcrumbSchema, organizationSchema, webPageSchema } from '@/utils/schema'

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

const DESC =
  'Commnet Systems Consultancy, founded in Dubai in the early 2000s, with a Chennai engineering centre. Who we are, how the two offices split the work, and what we have been recognised for.'

export function AboutPage() {
  return (
    <>
      <Seo
        title="About, Dubai head office, Chennai engineering centre"
        description={DESC}
        path="/about"
        graph={[webPageSchema('About', DESC, '/about'), breadcrumbSchema(CRUMBS), organizationSchema()]}
      />
      <PageHero
        eyebrow="The company"
        title="A cabling consultancy"
        muted="that grew into an integrator."
        definition="Founded in Dubai in the early 2000s and built one contract at a time. Design and detailed engineering sit in Chennai; commercial, field and commissioning teams sit in Dubai. Eighteen documented contracts later, the thing that keeps bringing primes back is that one team is accountable from survey to handover."
        crumbs={CRUMBS}
        media="/media/professional-it.jpg"
        mediaAlt="Engineering team on a data-centre walkway"
        meta={[
          { label: 'Founded', value: 'Early 2000s' },
          { label: 'Offices', value: 'Dubai · Chennai' },
          { label: 'Contracts', value: '18 documented' },
          { label: 'Repeat primes', value: 'GBM ×3' },
        ]}
      />
      <About />
      <Timeline />
      <Leadership />
      <Industries />
      <ClientMarquee />
      <Process />
    </>
  )
}
