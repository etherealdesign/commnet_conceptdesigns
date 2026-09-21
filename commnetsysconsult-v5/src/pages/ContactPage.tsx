import { PageHero } from '@/components/shared/PageHero'
import { Contact } from '@/components/contact/Contact'
import { Faq } from '@/components/faq/Faq'
import { Seo } from '@/components/shared/Seo'
import { breadcrumbSchema, webPageSchema, faqSchema } from '@/utils/schema'

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]

const DESC =
  'Send Commnet your drawings or BoQ. Dubai head office and Chennai engineering centre, an engineer reads every enquiry.'

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact, send us the drawings"
        description={DESC}
        path="/contact"
        graph={[webPageSchema('Contact', DESC, '/contact'), breadcrumbSchema(CRUMBS), faqSchema()]}
      />
      <PageHero
        eyebrow="Contact"
        title="Send the drawings."
        muted="An engineer replies."
        definition="Scope, a bill of quantities, or just a site address and the authority status of the premises. That is enough for us to tell you whether it is a job we should be quoting, and what we would need to price it properly."
        crumbs={CRUMBS}
        media="/media/executive-glass.jpg"
        mediaAlt="Boardroom video wall with a network dashboard"
        meta={[
          { label: 'Head office', value: 'Dubai' },
          { label: 'Engineering', value: 'Chennai' },
          { label: 'Emirates', value: 'Dubai · AUH · SHJ' },
          { label: 'Enquiries', value: 'BoQ or drawings' },
        ]}
      />
      <Contact />
      <Faq heading="Before you send it." />
    </>
  )
}
