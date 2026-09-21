import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

export type HeaderTheme = 'dark' | 'light'

/**
 * The header is fixed and transparent, so it has to know what is underneath
 * it. Dark blocks register themselves (see `Block`) and the header flips to
 * cream while one is behind it. The active anchor works the same way for
 * the home page's in-page navigation.
 *
 * `dark` is a counter rather than a boolean: two adjacent dark blocks both
 * "enter" before the first "leaves", and a boolean would flicker.
 */
interface HeaderState {
  theme: HeaderTheme
  activeAnchor: string | null
  headerCenter: number
  pushDark: () => void
  popDark: () => void
  setActiveAnchor: (a: string | null) => void
  setHeaderCenter: (n: number) => void
  modalOpen: boolean
  setModalOpen: (v: boolean) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
}

const Ctx = createContext<HeaderState | null>(null)

export function HeaderProvider({ children }: { children: ReactNode }) {
  const darkCount = useRef(0)
  const [theme, setTheme] = useState<HeaderTheme>('light')
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null)
  const [headerCenter, setHeaderCenter] = useState(38)
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const pushDark = useCallback(() => {
    darkCount.current += 1
    setTheme('dark')
  }, [])
  const popDark = useCallback(() => {
    darkCount.current = Math.max(0, darkCount.current - 1)
    if (darkCount.current === 0) setTheme('light')
  }, [])

  const value = useMemo<HeaderState>(
    () => ({ theme, activeAnchor, headerCenter, pushDark, popDark, setActiveAnchor, setHeaderCenter, modalOpen, setModalOpen, menuOpen, setMenuOpen }),
    [theme, activeAnchor, headerCenter, pushDark, popDark, modalOpen, menuOpen],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useHeaderStore() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useHeaderStore outside HeaderProvider')
  return v
}
