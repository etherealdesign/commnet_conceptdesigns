import { projects } from '@/data/projects'

/**
 * Clients of record as one line of small type that drifts, paused on hover
 * and focus. Names come from the register: where a contract ran under a
 * prime, the prime is named, so the strip claims exactly what the evidence
 * supports (§7.8).
 */
export function ClientMarquee() {
  const names = projects.map((p) => (p.prime ? `${p.clientOfRecord} · via ${p.prime}` : p.clientOfRecord))
  const track = [...names, ...names]

  return (
    <section className="marquee overflow-clip border-y border-ink/12 py-5" aria-label="Clients on the project register">
      <div className="marquee-track items-center gap-x-10">
        {track.map((n, i) => (
          <span key={i} className="whitespace-nowrap text-13 text-grey" aria-hidden={i >= names.length}>
            {n}
            <span className="ml-10 text-ink/30" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
