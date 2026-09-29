import { AnimatedHeadline } from './AnimatedHeadline'
import { Scramble } from './Scramble'
import { cn } from '@/lib/utils'

/** Section title on the left (line-wipe on scroll), `// LABEL` resolving out of noise on the right. */
export function SectionHead({ title, label, className, indent = false }: { title: string; label: string; className?: string; indent?: boolean }) {
  return (
    <div className={cn('grid-layout items-end', className)}>
      <div className={cn('grid-span-12 md:grid-span-8', indent && 'lg:grid-start-3')}>
        <AnimatedHeadline as="h2" trigger="scroll" className="t-h2">
          {title}
        </AnimatedHeadline>
      </div>
      <p className={cn('label grid-span-12 md:grid-span-4 md:justify-self-end', indent && 'lg:grid-span-2 lg:grid-start-9')}>
        <Scramble text={label} />
      </p>
    </div>
  )
}
