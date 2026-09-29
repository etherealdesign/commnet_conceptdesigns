import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { AnimatedHeadline, type RevealHandle } from '@/components/shared/AnimatedHeadline'
import { AnimatedSubtext } from '@/components/shared/AnimatedSubtext'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { usePageEnter } from '@/components/shared/PageEnter'
import { hero } from '@/data/home'

/**
 * Enters in the reference's order once the loader's wipe reaches 90 %:
 * the headline lines sweep in (t), the lead rises through its masks
 * (t + 0.15), the buttons fade up (t + 0.3), the client names follow
 * 0.08 s apart. A photograph sits on the right, faded into the ground. On the way out the copy is pushed
 * down at 35 % of scroll speed and the portrait at 30 %, so the hero
 * sinks under the next section rather than sliding off.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const headline = useRef<RevealHandle>(null)
  const sub = useRef<RevealHandle>(null)
  const buttons = useRef<HTMLDivElement>(null)
  const clients = useRef<(HTMLLIElement | null)[]>([])
  const { setModalOpen } = useHeaderStore()
  const still = prefersReducedMotion()

  useEffect(() => {
    if (still) return
    gsap.set([buttons.current, ...clients.current].filter(Boolean), { opacity: 0, y: 20 })
  }, [still])

  usePageEnter(
    (delay) => {
      const t = delay + 0.3
      headline.current?.reveal(t)
      sub.current?.reveal(t + 0.15)
      if (still) {
        gsap.set([buttons.current, ...clients.current].filter(Boolean), { opacity: 1, y: 0 })
        return
      }
      const tl = gsap.timeline({ delay: t + 0.2 })
      tl.to(buttons.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.1)
      const items = clients.current.filter(Boolean)
      if (items.length) tl.to(items, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 }, 0.3)
    },
    { priority: 1 },
  )

  // scroll push
  useEffect(() => {
    const el = root.current
    if (!el || still) return
    const ctx = gsap.context(() => {
      gsap.to(copy.current, { yPercent: 35, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } })
      gsap.to(media.current, { yPercent: 30, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } })
    }, el)
    return () => ctx.revert()
  }, [still])

  return (
    <Block ref={root} isDark className="theme-dark relative min-h-svh overflow-clip" ariaLabel="Introduction">
      <div className="grid-container relative min-h-svh">
        <div className="grid-layout min-h-[calc(100svh-52px)]">
          <div ref={copy} className="grid-span-12 relative z-1 flex flex-col justify-between pb-10 pt-32 will-change-transform lg:grid-span-7 lg:pb-16 lg:pt-44">
            <div className="flex flex-col items-start gap-8">
              <AnimatedHeadline ref={headline} as="h1" className="t-display max-w-[13ch]">
                {hero.title}
              </AnimatedHeadline>
              <AnimatedSubtext ref={sub} className="t-body max-w-xl text-fg-muted">
                {hero.lead}
              </AnimatedSubtext>
              <div ref={buttons} className="flex flex-wrap items-center gap-4">
                <Button to={hero.primary.to}>{hero.primary.label}</Button>
                <Button variant="underline" onClick={() => setModalOpen(true)}>
                  {hero.secondary.label}
                </Button>
              </div>
            </div>
            <ul className="mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-2" aria-label="Clients on the register">
              {hero.clients.map((c, i) => (
                <li
                  key={c}
                  ref={(el) => {
                    clients.current[i] = el
                  }}
                  className="text-[1.125rem] font-medium tracking-tight text-fg-light/70"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div ref={media} className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] will-change-transform lg:block">
            <img src={hero.media} alt={hero.mediaAlt} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-dark to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark to-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Block>
  )
}
