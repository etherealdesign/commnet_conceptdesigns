import type { ReactNode } from 'react'

export function SectionHead({ title, lead, center, eyebrow, style }: { title: ReactNode; lead?: ReactNode; center?: boolean; eyebrow?: string; style?: React.CSSProperties }) {
  return (
    <div className={`sec-head rv${center ? ' center' : ''}`} style={style}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  )
}
