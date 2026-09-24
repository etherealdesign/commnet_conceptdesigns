import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { IMG } from '../lib/images'

const IntroContext = createContext(false)

/** True once the first-load loader has cleared. Hero timelines wait on it. */
export const useIntroDone = () => useContext(IntroContext)

export function Intro({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduce = prefersReducedMotion()
      document.documentElement.style.overflow = 'hidden'
      const release = () => {
        document.documentElement.style.overflow = ''
      }
      gsap
        .timeline({ onComplete: () => setGone(true) })
        .to('.bar i', { width: '100%', duration: reduce ? 0 : 1.1, ease: 'power2.inOut' })
        .add(() => {
          release()
          setDone(true)
        })
        .to(ref.current, { yPercent: -100, duration: reduce ? 0 : 0.9, ease: 'expo.inOut' }, '-=.1')
      return release
    },
    { scope: ref },
  )

  return (
    <IntroContext.Provider value={done}>
      {!gone && (
        <div id="loader" ref={ref} aria-hidden="true">
          <div className="grid" />
          <div className="l-inner">
            <img src={IMG.logoLight} alt="" width={125} height={48} />
            <div className="bar">
              <i />
            </div>
          </div>
        </div>
      )}
      {children}
    </IntroContext.Provider>
  )
}
