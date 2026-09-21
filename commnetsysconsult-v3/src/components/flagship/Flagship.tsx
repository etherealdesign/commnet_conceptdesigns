import { Block } from '@/components/shared/Block'
import { Parallax } from '@/components/shared/Parallax'
import { useReveal } from '@/hooks/useReveal'
import { flagship } from '@/data/home'

/** Full-screen photograph with one sentence on it. The photo drifts, the words do not. */
export function Flagship() {
  const ref = useReveal<HTMLElement>()
  return (
    <Block ref={ref} isDark className="grid min-h-screen w-full place-content-center bg-ink text-cream" ariaLabel="Where we work">
      <Parallax distance={200} className="absolute inset-0 z-0">
        <img src={flagship.media} alt={flagship.mediaAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />
      </Parallax>
      <div className="margin-px-1 span-wide-5 md:span-w-12 relative z-1 flex h-full items-center justify-center py-16 md:py-24">
        <div className="flex flex-col items-center gap-5 text-center md:gap-12">
          <h2 data-reveal className="text-25 md:text-60">
            {flagship.title}
          </h2>
          <span data-reveal className="text-14 uppercase tracking-wide text-cream/75">
            {flagship.subtitle}
          </span>
        </div>
      </div>
    </Block>
  )
}
