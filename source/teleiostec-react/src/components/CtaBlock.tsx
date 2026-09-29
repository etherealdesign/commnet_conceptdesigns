import { Link } from 'react-router-dom'
import { contact } from '@/data/site'
import { Split } from './Split'
import { Magnetic } from './Magnetic'
import { ParticleField } from './ParticleField'

export function CtaBlock({ title = <>Let’s create<br /><em>better spaces.</em></>, kicker = 'Start a project' }: { title?: React.ReactNode; kicker?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-dark text-ivory">
      <ParticleField tone="dark" />
      <div className="wrap relative grid min-h-[90svh] content-center gap-12 py-[var(--sec)] md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="kick mb-8 !text-muted-dark">{kicker}</p>
          <Split as="h2" className="display text-fluid-3xl">{title}</Split>
        </div>
        <Magnetic>
          <Link
            to="/contact"
            data-cursor-hover
            className="group relative flex size-[clamp(140px,14vw,200px)] items-center justify-center overflow-hidden rounded-full border border-[var(--line-dark)] text-[12px] uppercase tracking-[0.18em]"
          >
            <span className="absolute inset-0 translate-y-full rounded-full bg-ivory transition-transform duration-700 ease-out-expo group-hover:translate-y-0" />
            <span className="relative transition-colors duration-500 group-hover:text-ink">Get in touch →</span>
          </Link>
        </Magnetic>
        <a href={`mailto:${contact.email}`} className="display link-line w-fit text-fluid-xl text-muted-dark hover:text-ivory md:col-span-2">
          {contact.email}
        </a>
      </div>
    </section>
  )
}
