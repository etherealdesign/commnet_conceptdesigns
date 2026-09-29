import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { hero } from '@/data/home'
import { trustMetrics } from '@/data/metrics'
import { regulatorPhrase } from '@/data/claims'

// Three.js is ~130 kB gzipped, so the scene lives in its own chunk and the
// hero paints its navy ground and copy before the scene arrives.
const RackScene = lazy(() => import('./RackScene'))

/**
 * First screen: a navy plate with a 3D data-centre aisle on the right and
 * the statement, summary and two calls to action on the left, the
 * register's headline numbers as a ruled strip along the bottom. The scene
 * fades up once its chunk has loaded; the copy rises line by line.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)
  const sceneWrap = useRef<HTMLDivElement>(null)
  const [sceneReady, setSceneReady] = useState(false)
  const { setModalOpen } = useHeaderStore()

  useEffect(() => {
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('[data-hero-line]')
    const items = el.querySelectorAll<HTMLElement>('[data-hero-item]')
    if (prefersReducedMotion()) {
      gsap.set([...lines, ...items], { opacity: 1, y: 0, yPercent: 0 })
      return
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.fromTo(lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.09 }, 0.3)
      .fromTo(items, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, stagger: 0.06 }, 0.7)
    return () => {
      tl.kill()
    }
  }, [])

  useEffect(() => {
    const w = sceneWrap.current
    if (!w || !sceneReady) return
    if (prefersReducedMotion()) {
      gsap.set(w, { opacity: 1 })
      return
    }
    const tw = gsap.fromTo(w, { opacity: 0 }, { opacity: 1, duration: 1.8, ease: 'power2.out' })
    return () => {
      tw.kill()
    }
  }, [sceneReady])

  return (
    <Block ref={root} isDark className="relative min-h-svh w-full overflow-clip bg-ink text-white" ariaLabel="Introduction" section="Introduction">
      {/* 3D aisle: full-bleed, masked so the copy column stays clean */}
      <div
        ref={sceneWrap}
        className="absolute inset-0 opacity-0 md:[mask-image:linear-gradient(to_right,transparent_30%,black_62%)] lg:[mask-image:linear-gradient(to_right,transparent_8%,black_42%)]"
      >
        <Suspense fallback={null}>
          <SceneMount onReady={() => setSceneReady(true)} />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink/85 via-ink/30 to-transparent md:from-ink/40 md:via-20% md:via-transparent md:to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink via-ink/70 to-transparent" aria-hidden="true" />

      <div className="margin-px-1 relative flex min-h-svh flex-col justify-end pb-10 pt-32 md:pb-14">
        <div className="md:span-w-7 lg:span-w-6">
          <p data-hero-item className="mono bullet mb-6 text-white/80 opacity-0">
            {hero.eyebrow}
          </p>
          <h1 className="d-hero">
            {hero.lines.map((l, i) => (
              <span key={i} className="block overflow-clip">
                <span data-hero-line className="block opacity-0" dangerouslySetInnerHTML={{ __html: l }} />
              </span>
            ))}
          </h1>
          <p data-hero-item className="mt-7 max-w-xl text-16 text-white/80 opacity-0 md:text-[1.0625rem]">
            {hero.sub}
          </p>
          <div data-hero-item className="mt-9 flex flex-wrap gap-3 opacity-0">
            <Button variant="primary" theme="dark" glyph="→" onClick={() => setModalOpen(true)}>
              Send us the drawings
            </Button>
            <Button variant="outline" theme="dark" to="/projects">
              View the project register
            </Button>
          </div>
        </div>

        <dl data-hero-item className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/20 pt-6 opacity-0 md:mt-20 md:grid-cols-5">
          {trustMetrics.map((m) => (
            <div key={m.label}>
              <dt className="mono text-white/60">{m.label}</dt>
              <dd className="d-3 mt-2 text-white">{m.value}</dd>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <dt className="mono text-white/60">Regulators</dt>
            <dd className="mt-2 text-14 font-medium text-white">{regulatorPhrase}</dd>
          </div>
        </dl>
      </div>
    </Block>
  )
}

/** Mounts the scene and reports once it is in the tree, so the wrapper can fade up. */
function SceneMount({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady()
  }, [onReady])
  return <RackScene />
}
