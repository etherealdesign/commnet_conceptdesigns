import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { ScrollTrigger } from '@/animations/gsap'

export type HeaderTheme = 'dark' | 'light'

/**
 * The header is fixed and transparent, so it has to know what is underneath
 * it. Dark blocks register a ScrollTrigger (see `Block`) whose id starts
 * with `dark-`; the header is dark while any of them is active. The set of
 * active ids is kept here, and `syncDark` rebuilds it from the live triggers
 * after anything that can jump the scroll position (a route change), so a
 * block that was under the header on the previous page cannot leave the
 * header dark on the next.
 */
interface HeaderState {
  theme: HeaderTheme
  activeAnchor: string | null
  headerCenter: number
  setDarkActive: (id: string, active: boolean) => void
  syncDark: () => void
  setActiveAnchor: (a: string | null) => void
  setHeaderCenter: (n: number) => void
  modalOpen: boolean
  setModalOpen: (v: boolean) => void
}

const Ctx = createContext<HeaderState | null>(null)

export function HeaderProvider({ children }: { children: ReactNode }) {
  const active = useRef(new Set<string>())
  const [theme, setTheme] = useState<HeaderTheme>('light')
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null)
  const [headerCenter, setHeaderCenter] = useState(38)
  const [modalOpen, setModalOpen] = useState(false)

  const commit = useCallback(() => setTheme(active.current.size > 0 ? 'dark' : 'light'), [])

  const setDarkActive = useCallback(
    (id: string, on: boolean) => {
      if (on) active.current.add(id)
      else active.current.delete(id)
      commit()
    },
    [commit],
  )

  const syncDark = useCallback(() => {
    active.current.clear()
    for (const st of ScrollTrigger.getAll()) {
      const id = (st.vars as { id?: string }).id
      if (id && id.startsWith('dark-') && st.isActive) active.current.add(id)
    }
    commit()
  }, [commit])

  const value = useMemo<HeaderState>(
    () => ({ theme, activeAnchor, headerCenter, setDarkActive, syncDark, setActiveAnchor, setHeaderCenter, modalOpen, setModalOpen }),
    [theme, activeAnchor, headerCenter, setDarkActive, syncDark, modalOpen],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useHeaderStore() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useHeaderStore outside HeaderProvider')
  return v
}
