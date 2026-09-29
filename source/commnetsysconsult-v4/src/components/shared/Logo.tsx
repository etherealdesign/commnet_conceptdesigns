/**
 * Commnet wordmark. Both artwork files are the company's own lockup, extracted
 * from the current site build: `commnet-ld.png` for light surfaces, and the
 * reversed `commnet-lw.png` for navy ones.
 *
 * NOTE for handover: these are raster (PNG). Swap both for the vector lockup
 * when the client supplies an SVG/AI, the markup below needs no change.
 */
export function Logo({
  variant = 'dark',
  className = '',
  height = 30,
}: {
  variant?: 'dark' | 'light'
  className?: string
  height?: number
}) {
  const src = variant === 'light' ? '/brand/commnet-lw.png' : '/brand/commnet-ld.png'
  return (
    <img
      src={src}
      alt="Commnet Systems Consultancy"
      width={Math.round(height * (600 / 255))}
      height={height}
      style={{ height, width: 'auto' }}
      className={className}
      decoding="async"
    />
  )
}

/** The orbital device on its own, used by the loader and as a small glyph. */
export function LogoMark({
  size = 44,
  stroke = 'var(--color-mark)',
  pathRef,
}: {
  size?: number
  stroke?: string
  pathRef?: React.Ref<SVGPathElement>
}) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 100 62" fill="none" aria-hidden="true">
      <path
        ref={pathRef}
        d="M74.5 10.5C86 18 88.5 33 79 44.5 69.5 56 50 59 33 53.5 16 48 5.5 35.5 8.5 24 11.5 12.5 28 5.5 46 5.5"
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}
