import { useEffect } from 'react'

export const ACCENTS = ['blue', 'orange', 'green', 'violet'] as const
export type Accent = (typeof ACCENTS)[number]
const KEY = 'commnet-accent'

export function getAccent(): Accent {
  try {
    const v = localStorage.getItem(KEY) as Accent | null
    return v && ACCENTS.includes(v) ? v : 'blue'
  } catch {
    return 'blue'
  }
}

export function setAccent(a: Accent) {
  document.documentElement.setAttribute('data-accent', a)
  try {
    localStorage.setItem(KEY, a)
  } catch {
    /* private mode */
  }
}

export function cycleAccent() {
  const i = ACCENTS.indexOf(getAccent())
  setAccent(ACCENTS[(i + 1) % ACCENTS.length])
}

/**
 * The accent colour is one CSS variable. Pressing `C` cycles it - the
 * reference site's easter egg - and the choice sticks for that browser.
 * Blue is the brand default; the others are there to prove the system
 * does not depend on it.
 */
export function AccentSwitch() {
  useEffect(() => {
    setAccent(getAccent())
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'c' || e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      cycleAccent()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return null
}
