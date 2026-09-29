/**
 * The preloader plays once per page load. Anything that animates on mount
 * (hero titles, first-screen reveals) waits on `introDone` so it plays after
 * the curtain lifts instead of underneath it.
 */
let resolve!: () => void
export const introDone = new Promise<void>((r) => (resolve = r))
export const finishIntro = () => resolve()
