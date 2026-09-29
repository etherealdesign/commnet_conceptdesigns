import { Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/PageHero'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { CtaBlock } from '@/components/shared/CtaBlock'
import { Seo } from '@/components/shared/Seo'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { solutions } from '@/data/solutions'
import { projectsByEnvironment } from '@/data/projects'
import { serviceByCode } from '@/data/services'
import { breadcrumbSchema, webPageSchema } from '@/utils/schema'

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
]

const DESC =
  'The six environments Commnet delivers as one package: data centres and IT rooms, command and security centres, hotels and resorts, corporate fit-out, events and rapid deployment, and multi-year AMC/SLA.'

export function SolutionsHub() {
  const ref = useReveal<HTMLElement>()

  return (
    <>
      <Seo
        title="Solutions, six environments we deliver as one package"
        description={DESC}
        path="/solutions"
        graph={[webPageSchema('Solutions', DESC, '/solutions'), breadcrumbSchema(CRUMBS)]}
      />
      <PageHero
        index={1}
        eyebrow="Axis B · Where we deliver it"
        title="Six environments."
        muted="Each a recognisable procurement package."
        definition="A consultant writing a tender package thinks in systems. A hotel operator or a facilities director thinks in outcomes. These are the six environments our systems arrive in as one contract, and every one of the eighteen documented projects maps to exactly one of them."
        crumbs={CRUMBS}
        meta={[
          { label: 'Environments', value: 'Six' },
          { label: 'Contracts mapped', value: '18 of 18' },
          { label: 'Longest SLA', value: '8 years' },
          { label: 'Fastest delivery', value: '15 days' },
        ]}
      />

      <Block ref={ref} section="Environments" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
        <SectionLabel index={2} aside="Axis B">
          The environments
        </SectionLabel>

        <ol className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((s) => {
            const count = projectsByEnvironment(s.slug).length
            return (
              <li key={s.slug} data-reveal>
                <Link to={`/solutions/${s.slug}`} className="group flex h-full flex-col overflow-clip rounded-[var(--r-card)] border border-ink/10 bg-cream transition-colors duration-500 hover:bg-tint">
                  <div className="relative aspect-[16/10] overflow-clip rounded-[var(--r-card)] bg-ink">
                    <img
                      src={s.media}
                      alt={s.mediaAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-85 transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-105"
                    />
                    <span className="chip chip--tint absolute left-4 top-4">
                      {s.code}
                    </span>
                    <span className="chip chip--line-dark absolute right-4 top-4 bg-ink/40 backdrop-blur-sm">
                      {count} project{count === 1 ? '' : 's'}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <h2 className="d-2 transition-colors duration-500 group-hover:text-primary">{s.title}</h2>
                    <p className="text-14 text-grey">{s.summary}</p>
                    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-13 text-grey">
                      {s.uses.map((code) => (
                        <li key={code}>
                          {serviceByCode(code)?.title.split(' & ')[0].split(',')[0]}
                          <span className="text-ink/30"> /</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto flex items-center justify-between gap-3 border-t border-ink/12 pt-4 text-14 font-medium text-primary">
                      The package
                      <Arrow className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>
      </Block>

      <CtaBlock index={3} />
    </>
  )
}
