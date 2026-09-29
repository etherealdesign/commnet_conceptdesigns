import { Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/Container'
import { CtaBand } from '@/components/shared/CtaBand'
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
  const ref = useReveal<HTMLDivElement>()

  return (
    <>
      <Seo
        title="Solutions, six environments we deliver as one package"
        description={DESC}
        path="/solutions"
        graph={[webPageSchema('Solutions', DESC, '/solutions'), breadcrumbSchema(CRUMBS)]}
      />
      <PageHero
        eyebrow="Axis B · Where we deliver it"
        title="Six environments."
        muted="Each a recognisable procurement package."
        definition="A consultant writing a tender package thinks in systems. A hotel operator or a facilities director thinks in outcomes. These are the six environments our systems arrive in as one contract, and every one of the eighteen documented projects maps to exactly one of them."
        crumbs={CRUMBS}
        media="/media/av-command-center.jpg"
        mediaAlt="Operators in a control room overlooking the city"
        meta={[
          { label: 'Environments', value: 'Six' },
          { label: 'Contracts mapped', value: '18 of 18' },
          { label: 'Longest SLA', value: '8 years' },
          { label: 'Fastest delivery', value: '15 days' },
        ]}
      />

      <section className="py-16 md:py-24" ref={ref}>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((s) => {
              const count = projectsByEnvironment(s.slug).length
              return (
                <Link
                  key={s.slug}
                  to={`/solutions/${s.slug}`}
                  data-reveal
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-clip rounded-sm bg-ink text-cream md:aspect-[3/4]"
                >
                  <img
                    src={s.media}
                    alt={s.mediaAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/35 to-ink/10" aria-hidden="true" />

                  <div className="relative flex items-center justify-between p-6 pb-0 md:p-7 md:pb-0">
                    <span className="u-num text-11 text-cream/70">{s.code}</span>
                    <span className="chip chip--line-dark text-11">
                      {count} project{count === 1 ? '' : 's'}
                    </span>
                  </div>
                  <div className="relative mt-auto p-6 md:p-7">
                    <h2 className="text-25 md:text-36">{s.title}</h2>
                    <p className="mt-3 text-13 text-cream/75">{s.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {s.uses.map((code) => (
                        <li key={code} className="chip chip--line-dark">
                          {serviceByCode(code)?.title.split(' & ')[0].split(',')[0]}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 flex items-center gap-2 text-13">
                      The package
                      <Arrow className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
