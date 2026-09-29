import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/gsap'

const FALLBACK = 'radial-gradient(circle at 50% 55%,rgba(34,211,238,.18),transparent 60%)'

const VERT = /* glsl */ `
  uniform float uTime, uHover, uSize, uPR, uExtent;
  uniform vec2 uMouse;
  uniform vec3 uRip[4];
  varying float vLift;
  varying float vFade;
  void main() {
    vec3 p = position;
    float w = sin(p.x * .7 + uTime * .8) * .18 + cos(p.z * .9 + uTime * .6) * .18 + sin((p.x + p.z) * .4 + uTime * .35) * .14;
    float d = distance(p.xz, uMouse);
    float bulge = exp(-d * d * .9) * 1.25 * uHover;
    float rip = 0.;
    for (int i = 0; i < 4; i++) {
      float age = uTime - uRip[i].z;
      if (age > 0. && age < 3.) {
        float front = age * 2.6;
        float rd = distance(p.xz, uRip[i].xy);
        rip += exp(-pow(rd - front, 2.) * 4.) * .55 * (1. - age / 3.);
      }
    }
    p.y = w + bulge + rip;
    vLift = clamp(bulge * .8 + rip * 1.4, 0., 1.);
    vFade = smoothstep(1., .5, length(p.xz) / (uExtent * .5));
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    gl_PointSize = uSize * uPR * (1. + vLift * 1.6) * (12. / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  varying float vLift;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - .5);
    if (d > .5) discard;
    float a = smoothstep(.5, 0., d);
    vec3 col = mix(vec3(.2, .75, 1.), vec3(1.), vLift * .85);
    gl_FragColor = vec4(col, a * vFade * (.8 + vLift * .2));
  }
`

/** A particle terrain that swells under the pointer and ripples on click (and,
 *  left alone, now and then by itself). Three.js loads lazily so it never
 *  blocks first paint; it is not started on narrow or touch-first screens. */
export function HeroGrid3D() {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = box.current
    if (!el || !matchMedia('(min-width: 901px)').matches) return
    let disposed = false
    let cleanup = () => {}

    import('three')
      .then((THREE) => {
        if (disposed) return
        const still = prefersReducedMotion()
        const host = el.closest('section') ?? el
        const scene = new THREE.Scene()
        const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 100)
        cam.position.set(0, 6.2, 11.5)
        cam.lookAt(0, -0.6, 0)
        const rd = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
        const pr = Math.min(devicePixelRatio, 1.75)
        rd.setPixelRatio(pr)
        rd.setSize(el.clientWidth, el.clientHeight)
        el.appendChild(rd.domElement)

        const N = 72
        const S = 12
        const pos = new Float32Array(N * N * 3)
        for (let i = 0; i < N; i++)
          for (let j = 0; j < N; j++) {
            const k = (i * N + j) * 3
            pos[k] = (i / (N - 1) - 0.5) * S
            pos[k + 2] = (j / (N - 1) - 0.5) * S
          }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        const uniforms = {
          uTime: { value: 0 },
          uHover: { value: 0 },
          uSize: { value: 5.5 },
          uPR: { value: pr },
          uExtent: { value: S },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uRip: { value: Array.from({ length: 4 }, () => new THREE.Vector3(0, 0, -100)) },
        }
        const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
        const group = new THREE.Group()
        group.add(new THREE.Points(geo, mat))
        scene.add(group)

        if (still) {
          rd.render(scene, cam)
          cleanup = () => {
            geo.dispose()
            mat.dispose()
            rd.dispose()
            rd.domElement.remove()
          }
          return
        }

        // Pointer → a point on the terrain plane, in the terrain's own frame.
        const ray = new THREE.Raycaster()
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
        const hit = new THREE.Vector3()
        const target = new THREE.Vector2(0, 0)
        const ndc = new THREE.Vector2()
        let inside = false
        let par = { x: 0, y: 0 }
        let lastInput = 0
        let nextRip = 0
        const t0 = performance.now()
        const now = () => (performance.now() - t0) / 1000

        const project = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
          ray.setFromCamera(ndc, cam)
          if (!ray.ray.intersectPlane(plane, hit)) return false
          group.worldToLocal(hit)
          return true
        }
        const ripple = (x: number, z: number) => {
          uniforms.uRip.value[nextRip++ % 4]!.set(x, z, uniforms.uTime.value)
        }
        const onMove = (e: PointerEvent) => {
          inside = true
          lastInput = now()
          par = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 }
          if (project(e)) target.set(hit.x, hit.z)
        }
        const onLeave = () => (inside = false)
        const onDown = (e: PointerEvent) => {
          if ((e.target as HTMLElement).closest('a, button')) return
          if (project(e)) ripple(hit.x, hit.z)
        }
        host.addEventListener('pointermove', onMove as EventListener)
        host.addEventListener('pointerleave', onLeave)
        host.addEventListener('pointerdown', onDown as EventListener)

        let visible = true
        const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting))
        io.observe(el)

        let raf = 0
        let idleRip = 2
        const tick = () => {
          raf = requestAnimationFrame(tick)
          if (!visible) return
          const t = now()
          uniforms.uTime.value = t
          uniforms.uHover.value += ((inside ? 1 : 0) - uniforms.uHover.value) * 0.06
          uniforms.uMouse.value.lerp(target, 0.1)
          if (t - lastInput > 3 && t > idleRip) {
            const a = Math.random() * Math.PI * 2
            const r = Math.random() * 2.5
            ripple(Math.cos(a) * r, Math.sin(a) * r)
            idleRip = t + 3.5
          }
          group.rotation.y += (par.x * 0.35 + Math.sin(t * 0.1) * 0.08 - group.rotation.y) * 0.04
          group.rotation.x += (par.y * 0.12 - group.rotation.x) * 0.04
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
          host.removeEventListener('pointermove', onMove as EventListener)
          host.removeEventListener('pointerleave', onLeave)
          host.removeEventListener('pointerdown', onDown as EventListener)
          io.disconnect()
          ro.disconnect()
          geo.dispose()
          mat.dispose()
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
