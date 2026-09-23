import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

// The review copy (scripts/build-review.mjs) lists here the clips that are
// byte-identical to ../teleiostec-com/Asset/media, and reads those from there.
const shared = (import.meta.env.VITE_SHARED_MEDIA ?? '').split(',').filter(Boolean)
const base = (name: string) => (shared.includes(name) ? '../Asset/media/' : '/Asset/media/') + name

type Props = {
  name: string
  label: string
  className?: string
  /** Hold the download until this resolves (the hero waits for the intro and an idle frame). */
  after?: Promise<unknown>
  /** Render no poster: the caller paints a responsive <Img> underneath and the video fades in over it. */
  noPoster?: boolean
  /** A `<name>-720.mp4` exists; phones get it instead of the full-size file. */
  mobile?: boolean
}

/** Muted looping video that only downloads/plays while on screen, never under reduced motion or Save-Data. */
export function Video({ name, label, className, after, noPoster, mobile }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) return
    let io: IntersectionObserver | undefined
    let dead = false
    const play = () => v.play().catch(() => {})
    const start = () => {
      if (dead) return
      io = new IntersectionObserver(([e]) => (e?.isIntersecting ? play() : v.pause()), { threshold: 0.15 })
      io.observe(v)
    }
    if (after) after.then(start)
    else start()
    const vis = () => document.hidden && v.pause()
    document.addEventListener('visibilitychange', vis)
    return () => { dead = true; io?.disconnect(); document.removeEventListener('visibilitychange', vis) }
  }, [after])

  return (
    <video
      ref={ref}
      className={cn('h-full w-full object-cover transition-opacity duration-1000', noPoster && !playing && 'opacity-0', className)}
      muted
      loop
      playsInline
      preload="none"
      poster={noPoster ? undefined : `${base(name)}-poster.jpg`}
      aria-label={label}
      onPlaying={() => setPlaying(true)}
    >
      {mobile && <source src={`${base(name)}-720.mp4`} type="video/mp4" media="(max-width: 768px)" />}
      <source src={`${base(name)}.mp4`} type="video/mp4" />
    </video>
  )
}
