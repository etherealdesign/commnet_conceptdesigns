import { useEffect } from 'react'
import { useHeaderStore } from './HeaderStore'

/**
 * Compatibility shim. Dark blocks now register themselves through `Block`
 * (`isDark`), which flips the header only while the block is actually under
 * it. A page that still opens on a dark hero without using `Block` can call
 * this and the header goes cream until the hook unmounts.
 */
export function useDarkHero() {
  const { pushDark, popDark } = useHeaderStore()
  useEffect(() => {
    pushDark()
    return () => popDark()
  }, [pushDark, popDark])
}

export function useHeroTheme() {
  return useHeaderStore().theme === 'dark'
}
