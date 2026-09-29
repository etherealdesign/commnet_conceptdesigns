import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase)

// The reference's curves, named so every component reaches for the same
// ones. `overshoot` is the indicator square's flight; `quartInOut` is the
// page curtain and the header slide; power3/power4 in-out are the wipes.
export const EASE = {
  overshoot: CustomEase.create('overshoot', '0.68, -0.3, 0.32, 1.1'),
  quartInOut: 'power4.inOut',
  wipe: 'power3.inOut',
  out: 'power3.out',
  expoOut: 'expo.out',
  expoInOut: 'expo.inOut',
}

export const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#%&@:;~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText, CustomEase }
