import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

interface Node {
  x: number
  y: number
}

// A small, deliberately sparse node graph — not a random particle field.
// Coordinates sit on a loose 0–400 x 0–460 grid so the connectors read as
// an architectural diagram rather than noise.
const NODES: Node[] = [
  { x: 40, y: 60 },
  { x: 160, y: 30 },
  { x: 280, y: 90 },
  { x: 360, y: 40 },
  { x: 90, y: 200 },
  { x: 220, y: 220 },
  { x: 340, y: 190 },
  { x: 60, y: 340 },
  { x: 190, y: 360 },
  { x: 320, y: 330 },
  { x: 250, y: 420 },
]

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [1, 4], [2, 6],
  [4, 5], [5, 6], [4, 7], [5, 8], [6, 9],
  [7, 8], [8, 9], [8, 10], [9, 10],
]

function edgePath(a: Node, b: Node) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 - 12
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`
}

/** Abstract architectural network — nodes, connector lines and streaming data packets. Subtle, no random floating objects. */
export function BlueprintNetwork() {
  const svgRef = useRef<SVGSVGElement>(null)
  const groupRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || prefersReducedMotion()) return

    const packets = svg.querySelectorAll<SVGCircleElement>('.packet')
    const paths = svg.querySelectorAll<SVGPathElement>('.edge')

    packets.forEach((packet, i) => {
      const path = paths[i % paths.length]
      if (!path) return
      const len = path.getTotalLength()
      gsap.set(packet, { opacity: 0.85 })
      gsap.to(
        { d: 0 },
        {
          d: 1,
          duration: 3 + (i % 4),
          repeat: -1,
          delay: i * 0.4,
          ease: 'none',
          onUpdate: function () {
            const pt = path.getPointAtLength(this.targets()[0].d * len)
            gsap.set(packet, { attr: { cx: pt.x, cy: pt.y } })
          },
        },
      )
    })

    // Subtle mouse-driven depth — the whole graph tilts a few degrees, never floats free.
    const onMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(groupRef.current, {
        x: px * 10,
        y: py * 10,
        duration: 0.8,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 460"
      className="w-full h-full max-w-[480px]"
      aria-hidden="true"
    >
      <g ref={groupRef}>
        {EDGES.map(([a, b], i) => (
          <path
            key={i}
            className="edge"
            d={edgePath(NODES[a], NODES[b])}
            stroke="#2563EB"
            strokeOpacity={0.22}
            strokeWidth={1}
            fill="none"
          />
        ))}
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 4 : 2.5} fill="#071826" fillOpacity={0.55} />
        ))}
        {EDGES.map((_, i) => (
          <circle key={`p${i}`} className="packet" r={2.2} fill="#2563EB" opacity={0} />
        ))}
      </g>
    </svg>
  )
}
