import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { AnimatedHeadline } from '@/components/shared/AnimatedHeadline'
import { AnimatedSubtext } from '@/components/shared/AnimatedSubtext'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { start } from '@/data/home'
import { site } from '@/data/site'

/** Light ground. Headline wipe, lead through masks, the rest fading up 0.08 s apart; the photo drifts. */
export function Start() {
  const { setModalOpen } = useHeaderStore()
  const root = useRef<HTMLElement>(null)
  const img = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const rows = el.querySelectorAll('[data-fade]')
    gsap.set(rows, { opacity: 0, y: 20 })
    const st = ScrollTrigger.create({ trigger: el, start: 'top 70%', once: true, onEnter: () => gsap.to(rows, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.3 }) })
    const ctx = gsap.context(() => {
      if (img.current) {
        gsap.set(img.current, { scale: 1.2 })
        gsap.fromTo(img.current, { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: img.current.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      }
    }, el)
    return () => {
      st.kill()
      ctx.revert()
    }
  }, [])
  return (
    <Block ref={root} anchor="contact" className="theme-light py-24 md:py-32" ariaLabel="Start a project">
      <div className="grid-container">
        <div className="grid-layout gap-y-12">
          <div className="grid-span-12 lg:grid-span-6 flex flex-col gap-12">
            <AnimatedHeadline as="h2" trigger="scroll" className="t-h2">
              {start.title}
            </AnimatedHeadline>
            <figure className="aspect-[16/9] w-full overflow-clip bg-card">
              <img ref={img} src={start.photo} alt={start.photoAlt} loading="lazy" decoding="async" className="h-full w-full object-cover will-change-transform" />
            </figure>
          </div>
          <div className="grid-span-12 lg:grid-span-5 lg:grid-start-8 flex flex-col gap-12">
            <AnimatedSubtext trigger="scroll" className="t-h3 max-w-md font-normal">
              {start.lead}
            </AnimatedSubtext>
            <div data-fade className="flex flex-col gap-1">
              <a href={`mailto:${site.email}`} className="ul-link w-fit">{site.email}</a>
              <p className="text-fg-muted">{start.note}</p>
            </div>
            <div data-fade className="flex flex-col items-start gap-4">
              <Button variant="underline" to="/contact">Get in touch</Button>
              <Button variant="dark" onClick={() => setModalOpen(true)}>Send the BoQ</Button>
            </div>
            <p data-fade className="text-fg-muted">An engineer reads every enquiry.</p>
          </div>
        </div>
      </div>
    </Block>
  )
}
