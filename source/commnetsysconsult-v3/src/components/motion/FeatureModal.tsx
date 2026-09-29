import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { useLenis } from '@/components/shared/SmoothScroll'

/**
 * The reference's feature modal: a rounded white sheet with an image at
 * the top and the tile's full story underneath, a round close button in
 * the corner. Opened from a tile's "+" button. A real <dialog>, so focus
 * is trapped and Escape closes it.
 */
export function FeatureModal({ open, onClose, image, imageAlt, children }: { open: boolean; onClose: () => void; image?: string; imageAlt?: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const d = ref.current
    const p = panel.current
    if (!d || !p) return
    if (open) {
      if (!d.open) d.showModal()
      lenis?.stop()
      document.body.classList.add('is-locked')
      if (!prefersReducedMotion()) gsap.fromTo(p, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' })
    } else if (d.open) {
      const close = () => {
        d.close()
        lenis?.start()
        document.body.classList.remove('is-locked')
      }
      if (prefersReducedMotion()) close()
      else gsap.to(p, { y: 24, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: close })
    }
  }, [open, lenis])

  useEffect(() => {
    const d = ref.current
    if (!d) return
    const onCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }
    d.addEventListener('cancel', onCancel)
    return () => d.removeEventListener('cancel', onCancel)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      <div className="flex h-full items-end justify-center p-2 md:items-center md:p-6">
        <div ref={panel} data-lenis-prevent className="relative flex max-h-[92dvh] w-full flex-col overflow-y-auto rounded-[20px] bg-white md:w-[min(760px,100%)]">
          {image && (
            <div className="plate aspect-[16/9] w-full rounded-none">
              <img src={image} alt={imageAlt ?? ''} />
            </div>
          )}
          <button type="button" onClick={onClose} aria-label="Close" className="icon-btn icon-btn--black absolute right-4 top-4">
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <div className="flex flex-col gap-6 p-6 md:p-10">{children}</div>
        </div>
      </div>
    </dialog>
  )
}
