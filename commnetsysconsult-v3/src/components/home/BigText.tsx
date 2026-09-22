import { Block } from '@/components/shared/Block'
import { AnimText } from '@/components/motion/AnimText'
import { bigText } from '@/data/home'

/** The manifesto paragraph at heading size, every character rising into place as it scrolls in. */
export function BigText() {
  return (
    <Block className="margin-px-1 my-[var(--spacing-fluid-2xl)]" ariaLabel="Our belief">
      <AnimText as="p" text={bigText} className="heading-xl max-w-[22ch]" balance />
    </Block>
  )
}
