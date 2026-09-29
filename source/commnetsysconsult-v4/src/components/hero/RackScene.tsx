import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { prefersReducedMotion } from '@/animations/gsap'
import { cn } from '@/lib/utils'

/**
 * The hero's 3D subject: a data-centre cold aisle. Two rows of cabinets
 * recede into fog, their inner faces carrying status LEDs that blink on
 * their own schedule, a cable tray above each row with light packets
 * travelling along it, and a raised-floor grid underneath. The camera sits
 * at the aisle entrance, drifts very slightly, and leans with the pointer.
 *
 * Built from a handful of merged geometries (one draw call each for
 * cabinets, edges, slot lines, floor, trays; one Points for LEDs, one for
 * packets), so it runs on integrated graphics. The loop stops off-screen
 * and in hidden tabs, DPR is capped at 2, and under reduced motion it
 * renders one still frame and never starts.
 */

const NAVY = 0x0b1a2e
const BLUE = 0x2563eb

const ROW_X = 1.35 // cabinet row centres, either side of the aisle
const CAB_W = 0.6 // along z
const CAB_D = 1.0 // along x
const CAB_H = 2.05
const GAP = 0.05
const PER_ROW = 14
const Z0 = -0.2 // nearest cabinet centre

export function RackScene({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const reduced = prefersReducedMotion()

    // ---- renderer / scene / camera ----
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(NAVY, 7, 19)

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60)
    // Looking straight down the aisle from its entrance, slightly above eye
    // level. The film is offset so the vanishing point lands in the right
    // half of the frame and the copy column on the left stays clear.
    const camHome = new THREE.Vector3(0, 1.75, 4.4)
    const camLook = new THREE.Vector3(0, 0.85, -7)
    camera.position.copy(camHome)
    camera.lookAt(camLook)
    const FILM_OFFSET = -9.5

    const world = new THREE.Group()
    scene.add(world)

    // ---- lights ----
    scene.add(new THREE.HemisphereLight(0x5b82bf, 0x0b1a2e, 1.6))
    const key = new THREE.DirectionalLight(0xdbe7ff, 1.6)
    key.position.set(-2, 6, 5)
    scene.add(key)
    const aisle = new THREE.PointLight(BLUE, 16, 11, 1.5)
    aisle.position.set(0, 2.5, -2.2)
    scene.add(aisle)
    const aisleFar = new THREE.PointLight(BLUE, 12, 11, 1.5)
    aisleFar.position.set(0, 2.5, -6.2)
    const aisleNear = new THREE.PointLight(0x9ec1ff, 5, 7, 1.6)
    aisleNear.position.set(0, 2.6, 1.6)
    scene.add(aisleNear)
    scene.add(aisleFar)

    // ---- cabinets ----
    const cabGeo = new THREE.BoxGeometry(CAB_D, CAB_H, CAB_W)
    const cabMat = new THREE.MeshStandardMaterial({ color: 0x16294a, roughness: 0.75, metalness: 0.3 })
    const cabinets = new THREE.InstancedMesh(cabGeo, cabMat, PER_ROW * 2)
    const m = new THREE.Matrix4()
    const edgeParts: THREE.BufferGeometry[] = []
    const slotParts: THREE.BufferGeometry[] = []
    const edgeUnit = new THREE.EdgesGeometry(cabGeo)
    let i = 0
    for (const side of [-1, 1]) {
      for (let k = 0; k < PER_ROW; k++) {
        const z = Z0 - k * (CAB_W + GAP)
        const x = side * ROW_X
        m.makeTranslation(x, CAB_H / 2, z)
        cabinets.setMatrixAt(i++, m)
        edgeParts.push(edgeUnit.clone().applyMatrix4(m))

        // horizontal slot lines on the inner (aisle-facing) face, 1U-ish
        const face = x - side * (CAB_D / 2 + 0.004)
        const pts: number[] = []
        for (let u = 0.16; u < CAB_H - 0.12; u += 0.145) {
          pts.push(face, u, z - CAB_W / 2 + 0.03, face, u, z + CAB_W / 2 - 0.03)
        }
        const g = new THREE.BufferGeometry()
        g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
        slotParts.push(g)
      }
    }
    cabinets.instanceMatrix.needsUpdate = true
    world.add(cabinets)

    const edges = new THREE.LineSegments(
      mergeGeometries(edgeParts),
      new THREE.LineBasicMaterial({ color: 0x5f86bf, transparent: true, opacity: 0.7 }),
    )
    world.add(edges)
    const slots = new THREE.LineSegments(
      mergeGeometries(slotParts),
      new THREE.LineBasicMaterial({ color: 0x2f4d7d, transparent: true, opacity: 0.5 }),
    )
    world.add(slots)

    // ---- LEDs on the inner faces ----
    const ledPos: number[] = []
    const ledCol: number[] = []
    const ledPhase: number[] = []
    const green = new THREE.Color(0x4ade80)
    const blue = new THREE.Color(0x60a5fa)
    const amber = new THREE.Color(0xfbbf24)
    for (const side of [-1, 1]) {
      const face = side * ROW_X - side * (CAB_D / 2 + 0.012)
      for (let k = 0; k < PER_ROW; k++) {
        const z = Z0 - k * (CAB_W + GAP)
        for (let u = 0.22; u < CAB_H - 0.15; u += 0.145) {
          if (Math.random() < 0.35) continue
          const n = Math.random() < 0.5 ? 1 : 2
          for (let c = 0; c < n; c++) {
            ledPos.push(face, u, z - 0.2 + c * 0.12 + Math.random() * 0.05)
            const r = Math.random()
            const col = r < 0.62 ? green : r < 0.92 ? blue : amber
            ledCol.push(col.r, col.g, col.b)
            ledPhase.push(Math.random() * Math.PI * 2, 0.4 + Math.random() * 1.6)
          }
        }
      }
    }
    const ledGeo = new THREE.BufferGeometry()
    ledGeo.setAttribute('position', new THREE.Float32BufferAttribute(ledPos, 3))
    ledGeo.setAttribute('color', new THREE.Float32BufferAttribute(ledCol, 3))
    ledGeo.setAttribute('phase', new THREE.Float32BufferAttribute(ledPhase, 2))
    const ledMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPx: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute vec3 color; attribute vec2 phase;
        uniform float uTime; uniform float uPx;
        varying vec3 vColor; varying float vA;
        void main() {
          vColor = color;
          float blink = sin(uTime * phase.y + phase.x);
          vA = 0.5 + 0.5 * smoothstep(0.2, 0.9, blink);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (4.4 * uPx) * (7.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vColor; varying float vA;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.15, d) * vA;
          gl_FragColor = vec4(vColor, a);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const leds = new THREE.Points(ledGeo, ledMat)
    world.add(leds)

    // ---- cable trays + packets ----
    const trayY = CAB_H + 0.22
    const zEnd = Z0 - (PER_ROW - 1) * (CAB_W + GAP) - 0.4
    const trayPts: number[] = []
    for (const side of [-1, 1]) {
      const x = side * ROW_X
      for (const dx of [-0.12, 0.12]) trayPts.push(x + dx, trayY, Z0 + 0.4, x + dx, trayY, zEnd)
      for (let z = Z0 + 0.4; z > zEnd; z -= 0.45) trayPts.push(x - 0.12, trayY, z, x + 0.12, trayY, z)
    }
    const trayGeo = new THREE.BufferGeometry()
    trayGeo.setAttribute('position', new THREE.Float32BufferAttribute(trayPts, 3))
    world.add(new THREE.LineSegments(trayGeo, new THREE.LineBasicMaterial({ color: 0x4a6fa5, transparent: true, opacity: 0.45 })))

    const N_PK = 14
    const pkPos = new Float32Array(N_PK * 3)
    const pk = Array.from({ length: N_PK }, (_, j) => ({
      side: j % 2 === 0 ? -1 : 1,
      t: Math.random(),
      v: 0.05 + Math.random() * 0.06,
      dir: Math.random() < 0.5 ? 1 : -1,
    }))
    const pkGeo = new THREE.BufferGeometry()
    pkGeo.setAttribute('position', new THREE.BufferAttribute(pkPos, 3))
    const packets = new THREE.Points(
      pkGeo,
      new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.07, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    world.add(packets)
    const placePackets = () => {
      pk.forEach((p, j) => {
        const z = Z0 + 0.4 + (zEnd - Z0 - 0.4) * p.t
        pkPos[j * 3] = p.side * ROW_X + (j % 4 < 2 ? -0.12 : 0.12)
        pkPos[j * 3 + 1] = trayY + 0.01
        pkPos[j * 3 + 2] = z
      })
      pkGeo.attributes.position.needsUpdate = true
    }
    placePackets()

    // ---- raised floor ----
    const fl: number[] = []
    for (let x = -3.6; x <= 3.6; x += 0.6) fl.push(x, 0, 1.5, x, 0, zEnd - 2)
    for (let z = 1.5; z > zEnd - 2; z -= 0.6) fl.push(-3.6, 0, z, 3.6, 0, z)
    const flGeo = new THREE.BufferGeometry()
    flGeo.setAttribute('position', new THREE.Float32BufferAttribute(fl, 3))
    world.add(new THREE.LineSegments(flGeo, new THREE.LineBasicMaterial({ color: 0x27456f, transparent: true, opacity: 0.5 })))
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 16),
      new THREE.MeshStandardMaterial({ color: 0x0c1c33, roughness: 0.6, metalness: 0.3 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, -0.002, zEnd / 2 + 0.5)
    world.add(floor)
    // the aisle's own light on the floor: a soft strip that fades into the fog
    const strip = new THREE.Mesh(
      new THREE.PlaneGeometry(ROW_X * 2 - CAB_D, -zEnd + 1.5),
      new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    strip.rotation.x = -Math.PI / 2
    strip.position.set(0, 0.004, (zEnd + 1.5) / 2)
    world.add(strip)

    // ---- sizing ----
    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // pan only on wide screens; on a phone the aisle is centred behind the copy
      camera.filmOffset = w > 768 ? FILM_OFFSET : 0
      camera.updateProjectionMatrix()
      ledMat.uniforms.uPx.value = renderer.getPixelRatio()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    // ---- interaction / loop ----
    const pointer = { x: 0, y: 0 }
    const lean = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const timer = new THREE.Timer()
    let raf = 0
    let running = false
    let intro = reduced ? 1 : 0

    const frame = () => {
      timer.update()
      const dt = Math.min(0.05, timer.getDelta())
      const t = timer.getElapsed()
      intro = Math.min(1, intro + dt / 2.2)
      const e = 1 - Math.pow(1 - intro, 3)

      lean.x += (pointer.x - lean.x) * 0.04
      lean.y += (pointer.y - lean.y) * 0.04
      world.rotation.y = lean.x * 0.035
      world.rotation.x = lean.y * 0.015

      const dolly = Math.sin(t * 0.25) * 0.12
      camera.position.set(camHome.x + lean.x * 0.25, camHome.y - lean.y * 0.12, camHome.z + 1.4 * (1 - e) + dolly)
      camera.lookAt(camLook)

      ledMat.uniforms.uTime.value = t
      pk.forEach((p) => {
        p.t += p.v * p.dir * dt
        if (p.t > 1) p.t = 0
        if (p.t < 0) p.t = 1
      })
      placePackets()
      renderer.render(scene, camera)
    }
    const loop = () => {
      if (!running) return
      frame()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduced) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    if (reduced) {
      frame()
    } else {
      window.addEventListener('pointermove', onMove, { passive: true })
    }
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0 })
    io.observe(el)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      renderer.dispose()
      scene.traverse((o) => {
        const any = o as THREE.Mesh
        any.geometry?.dispose?.()
        const mat = any.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose?.()
      })
      edgeUnit.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={host} className={cn('h-full w-full [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full', className)} aria-hidden="true" />
}

export default RackScene
