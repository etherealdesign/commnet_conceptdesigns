import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { About as Story } from '../components/sections/About'
import { Numbers } from '../components/sections/Numbers'
import { Industries } from '../components/sections/Industries'
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
          { value: '25+', label: 'years in operation' },
          { value: '2', label: 'hubs: Dubai and Chennai' },
        ]}
      />
      <Story />
      <Numbers />
      <Industries />
      <Leadership />
      <Recognition />
      <Presence />
      <Cta />
    </PageTransition>
  )
}
