import { useEffect, useRef } from 'react'
import { Compass, Ruler, ClipboardList, Wrench, BadgeCheck, LifeBuoy } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'

const STEPS = [
  { title: 'Survey & regulatory mapping', body: 'Site survey, requirement capture, SIRA/ADMCC applicability check.', icon: Compass },
  { title: 'Design & BoQ', body: 'Architecture, drawings and bill of quantities reviewed with the consultant.', icon: Ruler },
  { title: 'Engineering', body: 'Detailed design from the Chennai centre: racks, containment, power, network.', icon: ClipboardList },
  { title: 'Installation', body: 'Certified field teams install, terminate and label to standard.', icon: Wrench },
  { title: 'Test, certify, approve', body: 'Link certification, commissioning, authority submission and approval.', icon: BadgeCheck },
  { title: 'Support', body: 'AMC and multi-year SLA, the longest in service is eight years.', icon: LifeBuoy },
]

export function Process() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    if (!wrap || !path || prefersReducedMotion()) return

    const dots = gsap.utils.toArray<HTMLElement>(wrap.querySelectorAll('[data-proc-dot]'))
    const n = dots.length
    const points = dots.map((_, i) => `${(i / (n - 1)) * 100},20`).join(' L ')
    path.setAttribute('d', `M ${points}`)

    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    const drawTween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top 70%', end: 'bottom 45%', scrub: 0.6 },
    })
    const dotTween = gsap.fromTo(
      dots,
      { opacity: 0.25, scale: 0.7 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: wrap, start: 'top 65%', end: 'bottom 50%', scrub: 0.6 },
      },
    )

    return () => {
      drawTween.scrollTrigger?.kill()
      drawTween.kill()
      dotTween.scrollTrigger?.kill()
      dotTween.kill()
    }
  }, [])

  useEffect(() => () => ScrollTrigger.refresh(), [])

  return (
    <section className="py-28 bg-bg">
      <Container>
        <div className="text-center">
          <p className="text-xs font-medium text-primary">
            How a project moves through Commnet
          </p>
          <h2
            className="mx-auto mt-3 max-w-2xl font-medium tracking-tight text-navy"
            style={{ fontSize: 'var(--fs-h2)' }}
          >
            Six engineering stages, one accountable team.
          </h2>
        </div>

        <div ref={wrapRef} className="relative mt-20 hidden lg:block">
          <svg className="absolute left-0 top-5 w-full" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
            <path ref={pathRef} fill="none" stroke="url(#proc-gradient)" strokeWidth="0.4" strokeLinecap="round" />
            <defs>
              <linearGradient id="proc-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="100" y2="20">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#8FB4FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative grid grid-cols-6 gap-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <span
                  data-proc-dot
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-primary bg-cream text-primary"
                >
                  <step.icon size={18} strokeWidth={1.75} />
                </span>
                <p className="mt-5 text-xs font-medium text-secondary">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h4 className="mt-1 text-sm font-medium text-navy">{step.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-secondary">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 space-y-8 lg:hidden">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-primary bg-cream text-primary">
                <step.icon size={18} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-xs font-medium text-secondary">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h4 className="mt-1 text-sm font-medium text-navy">{step.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-secondary">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
