import { useEffect, useRef } from 'react'
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, NormalBlending, PerspectiveCamera,
  Points, Scene, ShaderMaterial, WebGLRenderer,
} from 'three'

const vert = /* glsl */ `
  uniform float uTime;
  uniform float uPx;
  uniform vec2 uMouse;
  attribute float aSeed;
  attribute float aSize;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float t = uTime * 0.05 + aSeed * 6.2831;
    p.x += sin(t * 1.3 + p.y * 0.4) * 0.35;
    p.y += cos(t * 0.9 + p.x * 0.3) * 0.35 + sin(t * 0.5) * 0.5;
    p.xy += uMouse * (0.25 + p.z * 0.08);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPx * (6.0 / -mv.z);
    vAlpha = 0.25 + 0.75 * fract(aSeed * 13.7 + uTime * 0.03);
    vAlpha *= smoothstep(-9.0, -3.0, mv.z);
  }
`
const frag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
  }
`

/**
 * Subtle drifting dust — the only WebGL on the site. One draw call, a few
 * hundred points, DPR capped, and the loop stops whenever it is off screen.
 */
export default function Particles({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const small = window.innerWidth < 768
    const count = small ? 220 : 520
    const dpr = Math.min(window.devicePixelRatio, 1.5)

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
    } catch { return }
    renderer.setPixelRatio(dpr)
    el.appendChild(renderer.domElement)
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'

    const scene = new Scene()
    const camera = new PerspectiveCamera(55, 1, 0.1, 50)
    camera.position.z = 6

    const pos = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    const size = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      seed[i] = Math.random()
      size[i] = 0.6 + Math.random() * 1.8
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(pos, 3))
    geo.setAttribute('aSeed', new BufferAttribute(seed, 1))
    geo.setAttribute('aSize', new BufferAttribute(size, 1))

    const dark = tone === 'dark'
    const mat = new ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      blending: dark ? AdditiveBlending : NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uPx: { value: dpr * 4 },
        uMouse: { value: [0, 0] },
        uColor: { value: dark ? [0.96, 0.92, 0.84] : [0.09, 0.09, 0.08] },
        uOpacity: { value: dark ? 0.55 : 0.35 },
      },
    })
    const pts = new Points(geo, mat)
    scene.add(pts)

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / Math.max(h, 1)
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    const mouse = [0, 0], target = [0, 0]
    const onMove = (e: PointerEvent) => {
      target[0] = (e.clientX / window.innerWidth - 0.5) * 2
      target[1] = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let raf = 0, visible = false, t0 = performance.now()
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      mouse[0]! += (target[0]! - mouse[0]!) * 0.04
      mouse[1]! += (target[1]! - mouse[1]!) * 0.04
      mat.uniforms.uTime!.value = (now - t0) / 1000
      mat.uniforms.uMouse!.value = mouse
      pts.rotation.y = mouse[0]! * 0.06
      renderer.render(scene, camera)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    })
    io.observe(el)
    const onVis = () => { cancelAnimationFrame(raf); if (visible && !document.hidden) raf = requestAnimationFrame(loop) }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect(); ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
      geo.dispose(); mat.dispose(); renderer.dispose()
      renderer.domElement.remove()
    }
  }, [tone])

  return <div ref={host} aria-hidden className={className ?? 'pointer-events-none absolute inset-0'} />
}
