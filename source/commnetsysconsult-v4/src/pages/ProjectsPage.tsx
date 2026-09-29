import { PageHero } from '@/components/shared/PageHero'
import { ProjectsRegister } from '@/components/projects/ProjectsRegister'
import { CtaBlock } from '@/components/shared/CtaBlock'
import { Seo } from '@/components/shared/Seo'
import { breadcrumbSchema, webPageSchema } from '@/utils/schema'

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
]

const DESC =
  'The full Commnet project register: 18 documented contracts across data centres, hotels, government, corporate fit-out and events, with scope, quantities and duration as delivered.'

export function ProjectsPage() {
  return (
    <>
      <Seo
        title="Project register, 18 documented contracts"
        description={DESC}
        path="/projects"
        graph={[webPageSchema('Project register', DESC, '/projects'), breadcrumbSchema(CRUMBS)]}
      />
      <PageHero
        index={1}
        eyebrow="The register"
        title="Eighteen contracts,"
        muted="with the quantities."
        definition="A prequalification document rather than a portfolio. Every entry carries the scope, the measured quantities and the duration as delivered. Contract values are held in the company profile and shared on request; the scale metrics tell a buyer the same thing without exposing a prime's commercial terms."
        crumbs={CRUMBS}
        meta={[
          { label: 'Contracts', value: '18' },
          { label: 'Cabling points', value: '15,500+' },
          { label: 'Cameras', value: '2,800+' },
          { label: 'Longest SLA', value: '8 years' },
        ]}
      />
      <ProjectsRegister />
      <CtaBlock
        index={3}
        lines={['Need the full', 'company profile?']}
        body="The prequalification PDF carries contract values, licences and manpower. Ask and we will send it."
      />
    </>
  )
}
