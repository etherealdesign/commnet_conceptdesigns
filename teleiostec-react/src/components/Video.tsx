import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  name: string
  label: string
  className?: string
  /** Hold the download until this resolves (the hero waits for the intro and an idle frame). */
  after?: Promise<unknown>
  /** Render no poster: the caller paints a responsive <Img> underneath and the video fades in over it. */
  noPoster?: boolean
}

/** Muted looping video that only downloads/plays while on screen, never under reduced motion or Save-Data. */
export function Video({ name, label, className, after, noPoster }: Props) {
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
      poster={noPoster ? undefined : `/Asset/media/${name}-poster.jpg`}
      aria-label={label}
      onPlaying={() => setPlaying(true)}
    >
      <source src={`/Asset/media/${name}.mp4`} type="video/mp4" />
    </video>
  )
}
