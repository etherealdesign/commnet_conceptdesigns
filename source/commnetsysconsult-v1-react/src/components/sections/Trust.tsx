import { CLIENTS } from '../../data/company'

const initials = (c: string) =>
  c
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

export function Trust() {
  const items = [...CLIENTS, ...CLIENTS]
  return (
    <section id="trust" aria-label="Clients and primes">
      <div className="label">Delivered for government, hospitality and enterprise sites across the UAE</div>
      <div className="marquee">
        <div className="track">
          {items.map((c, i) => (
            <div className="logo-item" key={i} aria-hidden={i >= CLIENTS.length}>
              <i>{initials(c)}</i>
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
