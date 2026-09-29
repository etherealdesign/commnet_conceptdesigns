import { useEffect } from 'react'

/**
 * `html.is-ready` gates every CSS entrance so nothing plays before the
 * fonts and first paint have settled. The reference flips it after load;
 * we do the same one frame after the fonts resolve.
 */
export function useReady() {
  useEffect(() => {
    let raf = 0
    const ready = () => {
      raf = requestAnimationFrame(() => document.documentElement.classList.add('is-ready', 'is-first-loaded'))
    }
    if (document.fonts?.ready) document.fonts.ready.then(ready)
    else ready()
    return () => cancelAnimationFrame(raf)
  }, [])
}
