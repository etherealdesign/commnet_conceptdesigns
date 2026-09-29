import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { contact, nav, social } from '@/data/site'
import { SimpleImg } from './Img'

const ease = [0.76, 0, 0.24, 1] as const

/** Fullscreen overlay menu with a live image preview for the hovered page. */
export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation()
  const [hover, setHover] = useState(0)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="grain fixed inset-0 z-[70] overflow-hidden bg-dark text-ivory"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="wrap grid h-full grid-cols-1 items-center gap-10 pt-[var(--header-h)] pb-8 lg:grid-cols-[1.25fr_1fr]">
            <nav aria-label="Menu" className="flex flex-col">
              {nav.map((n, i) => (
                <div key={n.to} className="overflow-hidden border-b border-[var(--line-dark)]">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-110%' }}
                    transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.06 }}
                  >
                    <Link
                      to={n.to}
                      onClick={onClose}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      aria-current={pathname.startsWith(n.to) ? 'page' : undefined}
                      className="group flex items-baseline gap-5 py-[clamp(6px,1.1vh,14px)]"
                    >
                      <span className="w-8 text-[11px] tracking-[0.2em] text-muted-dark">0{i + 1}</span>
                      <span className="display text-[clamp(40px,7.2vh,96px)] transition-[transform,font-style] duration-700 ease-out-expo group-hover:translate-x-4 group-hover:italic group-aria-[current=page]:italic">
                        {n.label}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            <motion.div
              className="relative hidden aspect-[4/5] max-h-[68vh] overflow-hidden lg:block"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.35 }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={hover}
                  className="absolute inset-0"
                  initial={{ clipPath: 'inset(0% 0% 100% 0%)', scale: 1.15 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                  transition={{ duration: 0.9, ease }}
                >
                  <SimpleImg src={nav[hover]!.img} className="h-full w-full object-cover" />
                </motion.div>
              </AnimatePresence>
              <span className="absolute bottom-4 left-4 z-10 text-[11px] uppercase tracking-[0.2em] text-white">{nav[hover]!.label}</span>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-x-10 gap-y-2 self-end text-[13px] text-muted-dark lg:col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a href={`mailto:${contact.email}`} className="link-line text-ivory">{contact.email}</a>
              <a href={contact.phoneHref} className="link-line">{contact.phone}</a>
              <span>{contact.address.join(' — ')}</span>
              <span className="flex gap-6 lg:ml-auto">
                {social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener" className="link-line">{s.label}</a>
                ))}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
