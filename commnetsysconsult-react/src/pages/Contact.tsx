import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { Cta } from '../components/sections/Cta'
import { Presence } from '../components/sections/Presence'
import { Faq } from '../components/sections/Faq'
import { HOME_FAQ } from '../data/company'
import { SITE } from '../lib/site'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]

const QUOTE_FAQ = HOME_FAQ.filter((f) => /quote|smallest|emirates|subcontractor/i.test(f.q))

export default function Contact() {
  return (
    <PageTransition label="Contact">
      <Seo
        path="/contact"
        title="Contact — Send Us the Drawings or BoQ"
        description={`Send the scope, BoQ or site address to Commnet's engineering team. Dubai ${SITE.phone} · ${SITE.email}.`}
        crumbs={crumbs}
        faq={QUOTE_FAQ}
        graph={[{ '@type': 'ContactPage', url: `${SITE.url}/contact`, about: { '@id': `${SITE.url}/#organization` } }]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Start your project"
        title="Drawings, BoQ or just a site address."
        lead="To quote we need the drawings or a bill of quantities, site access for a survey, and the SIRA or ADMCC status of the premises. Send what you have — the engineering team reads every enquiry."
        img="executiveGlass"
        actions={
          <>
            <a className="btn btn-primary magnetic" href="#brief">
              Send a brief
            </a>
            <a className="btn btn-ghost magnetic" href={SITE.phoneHref}>
              Call {SITE.phone}
            </a>
          </>
        }
      />
      <Cta id="brief" />
      <Presence />
      <Faq items={QUOTE_FAQ} title="Before you send it" />
    </PageTransition>
  )
}
