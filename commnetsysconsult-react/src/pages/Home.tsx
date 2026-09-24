import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { Hero } from '../components/sections/Hero'
import { Trust } from '../components/sections/Trust'
import { About } from '../components/sections/About'
import { ServicesGrid } from '../components/sections/ServicesGrid'
import { SolutionsGrid } from '../components/sections/SolutionsGrid'
import { ProjectsReel } from '../components/sections/ProjectsReel'
import { Numbers } from '../components/sections/Numbers'
import { Industries } from '../components/sections/Industries'
import { Process } from '../components/sections/Process'
import { Recognition } from '../components/sections/Recognition'
import { Leadership } from '../components/sections/Leadership'
import { Presence } from '../components/sections/Presence'
import { Faq } from '../components/sections/Faq'
import { Cta } from '../components/sections/Cta'
import { HOME_FAQ } from '../data/company'

export default function Home() {
  return (
    <PageTransition label="Commnet">
      <Seo
        path="/"
        title="Commnet Systems Consultancy | Mission-Critical ELV & ICT Infrastructure, UAE"
        description="Turnkey ELV and ICT systems integrator. Structured cabling, networks, security systems, AV and critical power — 18 documented contracts across data centres, hotels, government and command centres in the UAE."
        faq={HOME_FAQ}
      />
      <Hero />
      <Trust />
      <About />
      <ServicesGrid />
      <ProjectsReel />
      <SolutionsGrid />
      <Numbers />
      <Industries />
      <Process />
      <Recognition />
      <Leadership />
      <Presence />
      <Faq items={HOME_FAQ} />
      <Cta />
    </PageTransition>
  )
}
