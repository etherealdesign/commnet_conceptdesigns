import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/gsap'

const FALLBACK = 'radial-gradient(circle at 50% 40%,rgba(37,99,235,.25),transparent 60%)'

/** v1's blueprint wave grid — points, grid lines and floating nodes that lean
 *  toward the pointer. Three.js loads lazily so it never blocks first paint. */
export function HeroGrid3D() {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = box.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.background = FALLBACK
      return
    }
    let disposed = false
    let cleanup = () => {}

    import('three')
      .then((THREE) => {
        if (disposed) return
        const W = el.clientWidth
        const H = el.clientHeight
        const scene = new THREE.Scene()
        const cam = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
        cam.position.set(0, 3.2, 7.5)
        cam.lookAt(0, 0, 0)
        const rd = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
        rd.setPixelRatio(Math.min(devicePixelRatio, 2))
        rd.setSize(W, H)
        el.appendChild(rd.domElement)

        const N = 26
        const S = 9
        const geo = new THREE.BufferGeometry()
        const pos = new Float32Array(N * N * 3)
        const base: number[] = []
        for (let i = 0; i < N; i++)
          for (let j = 0; j < N; j++) {
            const k = (i * N + j) * 3
            pos[k] = (i / (N - 1) - 0.5) * S
            pos[k + 1] = 0
            pos[k + 2] = (j / (N - 1) - 0.5) * S
            base.push(pos[k]!, pos[k + 2]!)
          }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        const ptsMat = new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.06, transparent: true, opacity: 0.9 })
        scene.add(new THREE.Points(geo, ptsMat))

        const idx: number[] = []
        for (let i = 0; i < N; i++)
          for (let j = 0; j < N; j++) {
            if (i < N - 1) idx.push(i * N + j, (i + 1) * N + j)
            if (j < N - 1) idx.push(i * N + j, i * N + j + 1)
          }
        const lg = new THREE.BufferGeometry()
        lg.setAttribute('position', geo.getAttribute('position'))
        lg.setIndex(idx)
        const lineMat = new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.28 })
        scene.add(new THREE.LineSegments(lg, lineMat))

        const ng = new THREE.BufferGeometry()
        const np = new Float32Array(30 * 3)
        for (let i = 0; i < 30; i++) {
          np[i * 3] = (Math.random() - 0.5) * S
          np[i * 3 + 1] = Math.random() * 2 + 0.5
          np[i * 3 + 2] = (Math.random() - 0.5) * S
        }
        ng.setAttribute('position', new THREE.BufferAttribute(np, 3))
        const nodeMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.09, transparent: true, opacity: 0.8 })
        scene.add(new THREE.Points(ng, nodeMat))

        let mx = 0
        let my = 0
        const onMove = (e: MouseEvent) => {
          mx = e.clientX / innerWidth - 0.5
          my = e.clientY / innerHeight - 0.5
        }
        addEventListener('mousemove', onMove)

        let visible = true
        const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting))
        io.observe(el)

        const t0 = performance.now()
        let raf = 0
        const tick = () => {
          raf = requestAnimationFrame(tick)
          if (!visible) return
          const t = (performance.now() - t0) / 1000
          const p = geo.attributes.position!.array as Float32Array
          for (let i = 0; i < N * N; i++) {
            const x = base[i * 2]!
            const z = base[i * 2 + 1]!
            p[i * 3 + 1] = Math.sin(x * 0.9 + t * 0.9) * 0.22 + Math.cos(z * 1.1 + t * 0.7) * 0.22 + Math.sin((x + z) * 0.5 + t * 0.4) * 0.15
          }
          geo.attributes.position!.needsUpdate = true
          scene.rotation.y += (mx * 0.6 - scene.rotation.y) * 0.04
          scene.rotation.x += (my * 0.25 - scene.rotation.x) * 0.04
          rd.render(scene, cam)
        }
        tick()

        const ro = new ResizeObserver(() => {
          const w = el.clientWidth
          const h = el.clientHeight
          if (!w || !h) return
          cam.aspect = w / h
          cam.updateProjectionMatrix()
          rd.setSize(w, h)
        })
        ro.observe(el)

        cleanup = () => {
          cancelAnimationFrame(raf)
          removeEventListener('mousemove', onMove)
          io.disconnect()
          ro.disconnect()
          ;[geo, lg, ng].forEach((g) => g.dispose())
          ;[ptsMat, lineMat, nodeMat].forEach((m) => m.dispose())
          rd.dispose()
          rd.domElement.remove()
        }
      })
      .catch(() => {
        el.style.background = FALLBACK
      })

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return <div id="three" ref={box} aria-hidden="true" />
}
