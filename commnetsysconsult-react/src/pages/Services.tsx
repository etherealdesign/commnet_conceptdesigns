import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { ServicesGrid } from '../components/sections/ServicesGrid'
import { Process } from '../components/sections/Process'
import { Numbers } from '../components/sections/Numbers'
import { Cta } from '../components/sections/Cta'
import { Arrow } from '../components/Arrow'
import { SERVICES } from '../data/services'
import { SITE } from '../lib/site'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]

export default function Services() {
  return (
    <PageTransition label="Services">
      <Seo
        path="/services"
        title="ELV & ICT Services — Cabling, Networks, Security, AV, Power"
        description="Five systems, delivered as one package: structured cabling, networks and Wi-Fi, SIRA- and ADMCC-specification security, AV and guest technology, and critical power and cooling."
        crumbs={crumbs}
        graph={[
          {
            '@type': 'ItemList',
            name: 'Commnet services',
            itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/services/${s.slug}`, name: s.title })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="What we install"
        title="Five systems. No gaps between trades."
        lead="ELV is the umbrella; these are the five disciplines underneath it. Each is a separate line on a BoQ — and Commnet delivers all five, so the interfaces between them are one team’s problem, not yours."
        img="infrastructureFiber"
        actions={
          <>
            <Link className="btn btn-primary magnetic" to="/contact">
              Send us your BoQ <Arrow />
            </Link>
            <Link className="btn btn-ghost magnetic" to="/solutions">
              See the packages
            </Link>
          </>
        }
        facts={[
          { value: '5', label: 'systems, no overlap' },
          { value: '14 of 18', label: 'contracts start with cabling' },
        ]}
      />
      <ServicesGrid />
      <Process />
      <Numbers />
      <Cta />
    </PageTransition>
  )
}
