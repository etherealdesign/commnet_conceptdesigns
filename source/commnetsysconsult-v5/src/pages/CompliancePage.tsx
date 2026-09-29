import { PageHero } from '@/components/shared/PageHero'
import { Compliance } from '@/components/compliance/Compliance'
import { CtaBand } from '@/components/shared/CtaBand'
import { Seo } from '@/components/shared/Seo'
import { breadcrumbSchema, webPageSchema } from '@/utils/schema'

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Compliance', path: '/compliance' },
]

const DESC =
  'SIRA and ADMCC explained correctly, with links to the regulators, plus Commnet credentials and recognition. Requirements are confirmed with the authority at design stage rather than quoted as fixed figures.'

export function CompliancePage() {
  return (
    <>
      <Seo
        title="Compliance, SIRA, ADMCC and credentials"
        description={DESC}
        path="/compliance"
        graph={[webPageSchema('Compliance', DESC, '/compliance'), breadcrumbSchema(CRUMBS)]}
      />
      <PageHero
        eyebrow="Credentials & regulators"
        title="What each regulator covers,"
        muted="and what we hold."
        definition="Dubai's SIRA and Abu Dhabi's ADMCC both license companies and set the technical requirements security systems must meet. Those requirements are set by the authority and revised, so we confirm the current specification at design stage rather than publishing a fixed number, and we print a credential only once there is a licence number behind it."
        crumbs={CRUMBS}
        media="/media/security-operations.jpg"
        mediaAlt="Operators at a surveillance and control desk"
        meta={[
          { label: 'Regulators', value: 'SIRA · ADMCC' },
          { label: 'Emirates', value: '3' },
          { label: 'Recognition', value: 'Huawei · FIFA' },
          { label: 'Submissions', value: 'Handled by us' },
        ]}
      />
      <Compliance />
      <CtaBand />
    </>
  )
}
