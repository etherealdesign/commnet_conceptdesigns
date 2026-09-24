import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { SolutionsGrid } from '../components/sections/SolutionsGrid'
import { ProjectsReel } from '../components/sections/ProjectsReel'
import { Industries } from '../components/sections/Industries'
import { Cta } from '../components/sections/Cta'
import { Arrow } from '../components/Arrow'
import { SOLUTIONS } from '../data/solutions'
import { SITE } from '../lib/site'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
]

export default function Solutions() {
  return (
    <PageTransition label="Solutions">
      <Seo
        path="/solutions"
        title="Turnkey ELV Packages — Data Centres, Hotels, Command Centres"
        description="Six environments Commnet delivers end to end: data centres and IT rooms, command and security centres, hotels and resorts, corporate fit-out, events, and AMC and SLA."
        crumbs={crumbs}
        graph={[
          {
            '@type': 'ItemList',
            name: 'Commnet solutions',
            itemListElement: SOLUTIONS.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/solutions/${s.slug}`, name: s.title })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Where we deliver it"
        title="Six environments, each one contract."
        lead="A consultant writes the tender in systems. A hotel operator or facilities director buys an outcome. These are the outcomes — each one a recognisable procurement package, each one proven in the register."
        img="enterpriseSystems"
        actions={
          <Link className="btn btn-primary magnetic" to="/projects">
            See the project register <Arrow />
          </Link>
        }
        facts={[
          { value: '6', label: 'delivery environments' },
          { value: '18', label: 'contracts, each mapped to one' },
        ]}
      />
      <SolutionsGrid title="Choose the environment" />
      <ProjectsReel />
      <Industries />
      <Cta />
    </PageTransition>
  )
}
