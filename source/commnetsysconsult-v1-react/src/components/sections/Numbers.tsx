import { NUMBERS } from '../../data/company'

export function Numbers({ title = 'Numbers from the register', lead = 'Counted from eighteen documented contracts — points, cameras, rooms and years, not a marketing estimate.' }: { title?: string; lead?: string }) {
  return (
    <section id="numbers" className="dark" data-theme="dark">
      <div className="glow g1" />
      <div className="glow g2" />
      <div className="wrap">
        <div className="sec-head rv">
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
        </div>
        <div className="nums">
          {NUMBERS.map((n) => (
            <div className="num" key={n.label}>
              <div className="v">
                {n.prefix && <small>{n.prefix}</small>}
                <span className="cnt" data-to={n.to}>
                  {n.to.toLocaleString('en-US')}
                </span>
                {n.suffix && (n.suffix.startsWith('+') ? n.suffix : <small>{n.suffix}</small>)}
              </div>
              <p>{n.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
