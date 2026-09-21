import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Shared motion vocabulary — keep every scroll-triggered reveal on this
// easing/duration so the site reads as one system, per the build brief.
export const EASE = 'power3.out'
export const DUR = { short: 0.8, long: 1.2 }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText }
