import { useLocation } from 'react-router-dom'

/**
 * Review chrome: a small fixed pill that flips between the concept builds,
 * keeping the same path. It renders only in a dev server or when
 * VITE_VERSION_SWITCH=1 is set at build time, so it can never reach the
 * live domain by accident. The other builds' origins come from the env
 * (see ../start.sh, which runs all three).
 */
const THIS: Version = 'v3'
type Version = 'v3' | 'v4' | 'v5'
const VERSIONS: Version[] = ['v3', 'v4', 'v5']
const ORIGINS: Record<Version, string> = {
  v3: import.meta.env.VITE_VERSION_SWITCH_V3_URL ?? 'http://localhost:5173',
  v4: import.meta.env.VITE_VERSION_SWITCH_V4_URL ?? 'http://localhost:5174',
  v5: import.meta.env.VITE_VERSION_SWITCH_V5_URL ?? 'http://localhost:5175',
}
const TITLES: Record<Version, string> = {
  v3: 'Concept 3, the Nfinite direction',
  v4: 'Concept 4, the instrument direction',
  v5: 'Concept 5, the landmark direction',
}

export function VersionSwitch() {
  const { pathname } = useLocation()
  if (!(import.meta.env.DEV || import.meta.env.VITE_VERSION_SWITCH === '1')) return null

  return (
    <div
      className="fixed bottom-4 left-1/2 z-[150] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0B0F14]/85 p-1 text-white shadow-lg backdrop-blur-md"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.04em' }}
      aria-label="Switch concept build"
    >
      {VERSIONS.map((v) =>
        v === THIS ? (
          <span key={v} title={TITLES[v]} className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 uppercase text-[#0B0F14]" aria-current="true">
            {v.toUpperCase()}
          </span>
        ) : (
          <a key={v} href={`${ORIGINS[v]}${pathname}`} title={TITLES[v]} className="whitespace-nowrap rounded-full px-3 py-1.5 uppercase text-white/70 transition-colors hover:bg-white/15 hover:text-white">
            {v.toUpperCase()}
          </a>
        ),
      )}
    </div>
  )
}
