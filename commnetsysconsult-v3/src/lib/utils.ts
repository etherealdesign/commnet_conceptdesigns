import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// The numeric type scale (text-13, text-60 …) is declared in index.css.
// tailwind-merge has to be told these are font sizes, or it files them under
// colours and drops `text-13` whenever a `text-ink` follows it.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['11', '13', '14', '16', '21', '25', '36', '48', '60', '65', '84', '100', '240'] }],
    },
  },
})

/**
 * Merge class names with Tailwind conflict resolution, the last conflicting
 * utility wins. Required by shadcn-style components (`@/lib/utils`), and it is
 * what lets a caller override a component's own defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
