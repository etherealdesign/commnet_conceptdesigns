
type Tag = 'span' | 'p' | 'h1' | 'h2' | 'h3'
interface Props {
  text: string
  as?: Tag
  className?: string
  onHover?: boolean
  trigger?: 'view' | 'manual'
  delay?: number
  duration?: number
  noiseClass?: string
}

/**
 * Once a glyph scramble; now plain text. The effect read as a toy next to
 * register data, so the component keeps its API and renders the words.
 */
export function Scramble({ text, as: Tag = 'span', className }: Props) {
  return <Tag className={className}>{text}</Tag>
}

/** Kept for the Button API; nothing to play. */
export function useScrambleLabel(_duration = 0.5) {
  return { ref: { current: null as HTMLSpanElement | null }, play: () => {} }
}
