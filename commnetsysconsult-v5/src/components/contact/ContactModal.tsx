import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { useLenis } from '@/components/shared/SmoothScroll'
import { ContactForm } from './ContactForm'
import { site } from '@/data/site'

/**
 * "Get in contact" opens the form in a panel over the page rather than
 * leaving it, so the enquiry can be sent from wherever the argument landed.
 * The panel is a real <dialog>: focus is trapped, Escape closes it, and the
 * page behind is inert. The smooth scroll is paused while it is open.
 */
export function ContactModal() {
  const { modalOpen, setModalOpen } = useHeaderStore()
  const ref = useRef<HTMLDialogElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const d = ref.current
    const p = panel.current
    if (!d || !p) return
    if (modalOpen) {
      if (!d.open) d.showModal()
      lenis?.stop()
      document.body.classList.add('is-locked')
      if (!prefersReducedMotion()) {
        gsap.fromTo(d, { '--backdrop': 0 } as gsap.TweenVars, { '--backdrop': 1, duration: 0.5 } as gsap.TweenVars)
        gsap.fromTo(p, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out' })
      }
    } else if (d.open) {
      const close = () => {
        d.close()
        lenis?.start()
        document.body.classList.remove('is-locked')
      }
      if (prefersReducedMotion()) close()
      else gsap.to(p, { y: 24, opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: close })
    }
  }, [modalOpen, lenis])

  useEffect(() => {
    const d = ref.current
    if (!d) return
    const onCancel = (e: Event) => {
      e.preventDefault()
      setModalOpen(false)
    }
    d.addEventListener('cancel', onCancel)
    return () => d.removeEventListener('cancel', onCancel)
  }, [setModalOpen])

  return (
    <dialog
      ref={ref}
      aria-label="Get in contact"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-dark/70"
      onClick={(e) => {
        if (e.target === ref.current) setModalOpen(false)
      }}
    >
      <div className="flex h-full items-end justify-center md:items-center">
        <div
          ref={panel}
          data-lenis-prevent
          className="theme-light relative flex max-h-[92dvh] w-full flex-col overflow-y-auto md:max-h-[88dvh] md:w-[min(960px,calc(100vw-48px))]"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface px-5 py-4 md:px-8">
            <h2 className="mono mono-lg">Get in contact</h2>
            <button
              type="button"
              className="mono cursor-pointer text-fg-muted transition-colors hover:text-fg"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="grid gap-10 px-5 py-8 md:grid-cols-[1fr_1.6fr] md:px-8 md:py-10">
            <div className="flex flex-col gap-6">
              <p className="t-h3 font-normal">Send us the drawings. An engineer replies.</p>
              <ul className="flex flex-col gap-5 t-small text-fg-muted">
                {site.offices.map((o) => (
                  <li key={o.id}>
                    <p className="mono text-fg">
                      {o.city} · {o.id === 'dubai' ? 'HQ' : 'Engineering centre'}
                    </p>
                    <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="u-num block hover:text-fg">
                      {o.phone}
                    </a>
                    <a href={`mailto:${o.email}`} className="block hover:text-fg">
                      {o.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </dialog>
  )
}
