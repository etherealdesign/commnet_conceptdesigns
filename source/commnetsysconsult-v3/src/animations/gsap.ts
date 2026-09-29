import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger, SplitText, Observer)

// Shared motion vocabulary. Everything scroll-driven is scrubbed against
// scroll (no duration), everything pointer-driven is expo-out. One family of
// curves is what makes the whole site read as a single hand.
export const EASE = 'expo.out'
export const EASE_SOFT = 'power3.out'
export const DUR = { short: 0.6, base: 1, long: 1.6 }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText, Observer }
