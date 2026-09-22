import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Parallax } from '@/components/shared/Parallax'
import { hero, statement } from '@/data/home'
import { Button } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'

/**
 * One photograph, one sentence, one paragraph, one action. Left-aligned
 * and set low in the frame, so the first screen reads like the cover of
 * a tender submission rather than a landing page. The photo drifts slower
 * than the page as it leaves.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)
  const { setModalOpen } = useHeaderStore()

  useEffect(() => {
    const el = root.current
    if (!el) return
    const media = el.querySelector('[data-hero-media]')
    const lines = el.querySelectorAll('[data-hero-line]')
    if (!media) return
    if (prefersReducedMotion()) {
      gsap.set([media, ...lines], { opacity: 1, y: 0, scale: 1 })
      return
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.fromTo(media, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.6 }, 0)
      .fromTo(lines, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, 0.3)
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <Block ref={root} isDark className="min-h-[var(--shell-h)] w-full bg-ink text-cream" ariaLabel="Introduction">
      <Parallax distance={160} className="absolute inset-0 z-0">
        <div data-hero-media className="relative h-full w-full opacity-0">
          <img
            src={hero.media}
            alt={hero.mediaAlt}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" aria-hidden="true" />
        </div>
      </Parallax>

      <div className="margin-px-1 relative z-2 flex min-h-[var(--shell-h)] flex-col justify-end pb-16 pt-32 md:pb-24">
        <h1 data-hero-line className="md:span-w-9 text-36 opacity-0 md:text-60">
          {hero.title} <span className="text-cream/55">{hero.muted}</span>
        </h1>
        <p data-hero-line className="md:span-w-5 mt-8 text-16 text-cream/80 opacity-0">
          {statement}
        </p>
        <div data-hero-line className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 opacity-0">
          <Button to="/projects" variant="primary" theme="dark">
            See the project register
          </Button>
          <Button variant="underlined" theme="dark" onClick={() => setModalOpen(true)}>
            Send us your BoQ
          </Button>
        </div>
      </div>
    </Block>
  )
}
