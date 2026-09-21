import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { cn } from '@/lib/utils'

const RAMP = ' .`\'-_:;,"^~=+<>!?/\\|()[]{}*#%&@'
const ALT = 'abcdefghijklmnopqrstuvwxyz0123456789'

interface Props {
  src: string
  /** cell size in CSS px */
  cell?: number
  /** fraction of cells drawn in the accent colour (brightest first) */
  accentShare?: number
  /** brightness below which a cell is left empty (0-1) */
  floor?: number
  /** frames per second for the glyph flicker */
  fps?: number
  /** react to the pointer: cells near it brighten and churn */
  interactive?: boolean
  /** Play the point-reveal when this becomes true; `undefined` reveals on mount. */
  start?: boolean
  /** Where the reveal grows from, as fractions of width/height. */
  origin?: [number, number]
  className?: string
  alt?: string
}

/**
 * A photograph re-drawn as a field of monospace glyphs. The image is
 * sampled once into a luminance grid; every frame a few percent of the
 * cells swap their glyph so the picture shimmers like a terminal. The
 * brightest cells take the accent colour, the rest are grey on the ground,
 * and the pointer stirs the cells it passes over.
 */
export function AsciiImage({
  src,
  cell = 9,
  accentShare = 0.35,
  floor = 0.12,
  fps = 14,
  interactive = true,
  start,
  origin = [0.55, 0.4],
  className,
  alt = '',
}: Props) {
  const host = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ox0, oy0] = origin

  useEffect(() => {
    const h = host.current
    const c = canvas.current
    if (!h || !c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let raf = 0
    let last = 0
    let cols = 0
    let rows = 0
    let lum: Float32Array = new Float32Array(0)
    let glyph: Uint8Array = new Uint8Array(0)
    let accentRGB = '37,99,235'
    const pointer = { x: -1e4, y: -1e4 }
    // reveal: cells appear in a growing, ragged disc from `origin`; colour
    // follows a beat later so the picture is grey before it is the accent.
    const rev = { p: still() ? 1 : 0, c: still() ? 1 : 0 }
    let seed: Float32Array = new Float32Array(0)
    let revealTween: gsap.core.Timeline | null = null
    const startReveal = () => {
      if (revealTween || still()) return
      revealTween = gsap.timeline().to(rev, { p: 1, duration: 2.4, ease: 'power2.out' }, 0).to(rev, { c: 1, duration: 3, ease: 'power1.inOut' }, 0.4)
    }
    function still() {
      return prefersReducedMotion()
    }
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    const readAccent = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
      const m = v.match(/^#([0-9a-f]{6})$/i)
      if (m) {
        const n = parseInt(m[1], 16)
        accentRGB = `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
      }
    }
    readAccent()
    const mo = new MutationObserver(readAccent)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-accent'] })

    const sample = () => {
      const w = h.clientWidth
      const ht = h.clientHeight
      if (!w || !ht || !img.naturalWidth) return
      c.width = Math.round(w * dpr)
      c.height = Math.round(ht * dpr)
      c.style.width = `${w}px`
      c.style.height = `${ht}px`
      cols = Math.floor(w / cell)
      rows = Math.floor(ht / (cell * 1.15))
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const octx = off.getContext('2d')!
      // cover-fit the image into the sample grid
      const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      octx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh)
      const data = octx.getImageData(0, 0, cols, rows).data
      lum = new Float32Array(cols * rows)
      glyph = new Uint8Array(cols * rows)
      seed = new Float32Array(cols * rows)
      for (let i = 0; i < cols * rows; i++) {
        const r = data[i * 4]
        const g = data[i * 4 + 1]
        const b = data[i * 4 + 2]
        const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
        lum[i] = Math.pow(l, 0.9)
        glyph[i] = (Math.random() * RAMP.length) | 0
        seed[i] = Math.random()
      }
    }

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (now - last < 1000 / fps) return
      last = now
      if (!cols) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, c.width, c.height)
      ctx.font = `${cell * 1.05}px "Geist Mono", ui-monospace, monospace`
      ctx.textBaseline = 'top'
      const still = prefersReducedMotion()
      const pr = cell * 9
      const ox = ox0 * cols
      const oy = oy0 * rows
      const maxD = Math.hypot(Math.max(ox, cols - ox), Math.max(oy, rows - oy))
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          if (rev.p < 1) {
            const d = Math.hypot(x - ox, y - oy) / maxD
            if (d + seed[i] * 0.35 > rev.p * 1.35) continue
          }
          let l = lum[i]
          if (interactive) {
            const dx = x * cell - pointer.x
            const dy = y * cell * 1.15 - pointer.y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < pr) {
              const k = 1 - d / pr
              l = Math.min(1, l + k * 0.6)
              if (!still && Math.random() < k) glyph[i] = (Math.random() * RAMP.length) | 0
            }
          }
          if (l < floor) continue
          if (!still && Math.random() < 0.03) glyph[i] = (Math.random() * RAMP.length) | 0
          const idx = Math.min(RAMP.length - 1, Math.floor(l * (RAMP.length - 1)))
          const ch = l > 0.55 && glyph[i] % 3 === 0 ? ALT[glyph[i] % ALT.length] : RAMP[Math.max(1, Math.min(idx, glyph[i] % RAMP.length || idx))]
          const accent = l > 1 - accentShare && seed[i] < rev.c
          const a = 0.45 + l * 0.55
          ctx.fillStyle = accent ? `rgba(${accentRGB},${a})` : `rgba(160,158,160,${a * 0.85})`
          ctx.fillText(ch, x * cell, y * cell * 1.15)
        }
      }
    }

    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }
    const onLeave = () => {
      pointer.x = -1e4
      pointer.y = -1e4
    }
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true })
      h.addEventListener('pointerleave', onLeave)
    }
    const ro = new ResizeObserver(sample)
    ro.observe(h)
    img.onload = () => {
      sample()
      raf = requestAnimationFrame(draw)
      if (start === undefined) startReveal()
    }
    const onStart = () => startReveal()
    h.addEventListener('ascii:start', onStart)
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(draw)
      } else cancelAnimationFrame(raf)
    })
    io.observe(h)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      window.removeEventListener('pointermove', onMove)
      h.removeEventListener('pointerleave', onLeave)
      h.removeEventListener('ascii:start', onStart)
      revealTween?.kill()
    }
  }, [src, cell, accentShare, floor, fps, interactive, ox0, oy0])

  useEffect(() => {
    if (start) host.current?.dispatchEvent(new Event('ascii:start'))
  }, [start])

  return (
    <div ref={host} className={cn('relative', className)} role="img" aria-label={alt}>
      <canvas ref={canvas} className="absolute inset-0" />
    </div>
  )
}
