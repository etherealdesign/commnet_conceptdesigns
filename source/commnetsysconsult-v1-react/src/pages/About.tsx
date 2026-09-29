import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { About as Story } from '../components/sections/About'
import { Numbers } from '../components/sections/Numbers'
import { Leadership } from '../components/sections/Leadership'
import { Recognition } from '../components/sections/Recognition'
import { Presence } from '../components/sections/Presence'
import { Cta } from '../components/sections/Cta'
import { Arrow } from '../components/Arrow'
import { LEADERSHIP } from '../data/company'
import { SITE } from '../lib/site'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

export default function About() {
  return (
    <PageTransition label="About">
      <Seo
        path="/about"
        title="About — From Two-Person Consultancy to Systems Integrator"
        description="Founded in Dubai in the early 2000s, Commnet Systems Consultancy is a turnkey ELV and ICT systems integrator with a Chennai engineering centre."
        crumbs={crumbs}
        graph={LEADERSHIP.map((p) => ({ '@type': 'Person', name: p.name, jobTitle: p.role, worksFor: { '@id': `${SITE.url}/#organization` } }))}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="About Commnet"
        title="Started with two people. Still run by engineers."
        lead="Commnet began in Dubai in the early 2000s as a two-person cabling consultancy. It now delivers every low-current system a building needs — with the same people who design it walking the site."
        img="dubaiSkyline"
        actions={
          <Link className="btn btn-primary magnetic" to="/projects">
            See what we’ve built <Arrow />
          </Link>
        }
        facts={[
          { value: '2000s', label: 'founded in Dubai' },
          { value: '2', label: 'hubs: Dubai and Chennai' },
        ]}
      />
      <Story />
      <Numbers title="Totals across the register" lead="Quantities summed from eighteen documented contracts — cabling points, cameras, rooms, containers and SLA years." />
      <Leadership title="The people who sign off the job" lead="Executive leadership, project delivery, business development and finance — four people accountable for every contract." />
      <Recognition title="What the record shows" lead="A Huawei Data Centre Facility certificate, a fifteen-day FIFA delivery and three GBM engagements in a row." />
      <Presence title="Two offices, one team" lead="Tenders, site work and commissioning run from Port Saeed, Dubai. Detailed design comes from St. Thomas Mount, Chennai." />
      <Cta title="Work with the team behind the record." lead="Send a scope, a BoQ or a site address — it goes to the engineers named above." />
    </PageTransition>
  )
}
