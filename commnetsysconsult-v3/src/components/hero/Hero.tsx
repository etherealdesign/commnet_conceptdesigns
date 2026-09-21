import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Parallax } from '@/components/shared/Parallax'
import { SonarGrid } from '@/components/ui/sonar-grid'
import { hero } from '@/data/home'

/**
 * Full-screen photograph, one centred sentence in cream. The photo drifts
 * slower than the page as it leaves; a dot lattice sits over it and answers
 * a click with a ripple, so the first screen is quietly interactive without
 * a single decorative element competing with the words.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const title = el.querySelector('[data-hero-title]')
    const media = el.querySelector('[data-hero-media]')
    if (!title || !media) return
    if (prefersReducedMotion()) {
      gsap.set([title, media], { opacity: 1, y: 0, scale: 1 })
      return
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.fromTo(media, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.8 }, 0)
      .fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.4 }, 0.35)
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <Block ref={root} isDark className="h-screen w-full bg-ink text-cream" ariaLabel="Introduction">
      <Parallax distance={200} className="absolute inset-0 z-0">
        <div data-hero-media className="relative h-full w-full opacity-0">
          <img
            src={hero.media}
            alt={hero.mediaAlt}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
        </div>
      </Parallax>

      <SonarGrid
        className="absolute inset-0 z-1"
        color="rgba(251,250,247,0.9)"
        spacing={30}
        dotRadius={1}
        baseOpacity={0.16}
        pingEvery={5}
        speed={220}
        ringWidth={110}
        amplitude={1.6}
        seedPing
        aria-hidden="true"
      />

      <div className="margin-px-1 relative z-2 flex h-full items-center justify-center py-16 md:py-24">
        <h1 data-hero-title className="md:span-w-10 max-w-5xl text-center text-25 opacity-0 md:text-60">
          {hero.title} <span className="text-cream/50">{hero.muted}</span>
        </h1>
      </div>
    </Block>
  )
}
