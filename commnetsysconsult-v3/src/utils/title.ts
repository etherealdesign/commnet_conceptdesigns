/**
 * Splits a page H1 of the form "Discipline, Geography" into its two clauses
 * so the hero can dim the geography. Falls back to the whole string and no
 * muted clause when there is no comma to split on.
 */
export function splitTitle(h1: string): [string, string | undefined] {
  const i = h1.lastIndexOf(', ')
  if (i === -1) return [h1, undefined]
  return [h1.slice(0, i + 1), h1.slice(i + 2)]
}
