// Company history, sectors and recognition, recovered from the v1 build
// (commnetsysconsult-com/v1.html) and re-worded to the claims gate:
// nothing here says "approved", "certified" or "licensed" (claims.ts §7),
// and no contract values are printed (§8.3).

export interface Milestone {
  year: string
  title: string
  body: string
}

/** v1 timeline. The founding year stays "2000s" until the trade licence date is confirmed (claims.tradeLicenceYear). */
export const timeline: Milestone[] = [
  { year: '2000s', title: 'Foundation', body: 'Founded in Dubai as a two-member consulting team focused on low-current and structured cabling design.' },
  { year: '2010', title: 'Enterprise expansion', body: 'Grew into a full systems integrator: data centres, enterprise networks, power and AV for hospitality and corporate clients.' },
  { year: '2017', title: 'CSOC division', body: 'Launched the cyber security operations practice and began an eight-year managed infrastructure SLA with the UAE Football Association.' },
  { year: '2024', title: 'FIFA World Cup delivery', body: 'Delivered ICT, surveillance and multi-gigabit routing for the FIFA Beach Soccer World Cup UAE in fifteen days, and received the Huawei Service Performance certificate.' },
]

export interface Industry {
  name: string
  clients: string
  media: string
}

/** v1 "Built for sectors where downtime is not an option". Clients as named in v1. */
export const industries: Industry[] = [
  { name: 'Government', clients: 'DEWA · Sharjah Police · FTA', media: '/media/security-operations.jpg' },
  { name: 'Hospitality', clients: 'Atlantis · Hilton · Occidental', media: '/media/security-systems.jpg' },
  { name: 'Aviation', clients: 'Abu Dhabi Airport', media: '/media/iot-smart-building.jpg' },
  { name: 'Banking', clients: 'Samba Bank', media: '/media/executive-glass.jpg' },
  { name: 'Healthcare', clients: 'Intelligent video', media: '/media/av-command-center.jpg' },
  { name: 'Smart cities', clients: 'Masdar City · IoT', media: '/media/dubai-skyline.jpg' },
  { name: 'Industrial', clients: 'Jotun · Orientek', media: '/media/power-infrastructure.jpg' },
  { name: 'Education', clients: 'AV and campus networks', media: '/media/enterprise-systems.jpg' },
]

export interface Award {
  issuer: string
  title: string
  body: string
}

/** v1 "Awards and certifications", re-worded. SIRA/ADMCC is stated as design-to-specification, ISO 27001 as a service. */
export const awards: Award[] = [
  { issuer: 'Huawei Data Centre Facility · 2024/25', title: 'Service Performance certificate', body: 'Recognition for service performance and high-standard data-centre delivery.' },
  { issuer: 'FIFA · UAE FA · Dubai Police · 2024', title: 'FIFA Beach Soccer World Cup', body: 'Fifteen-day mobilisation: ICT, CID surveillance and multi-gigabit routing, delivered to the opening date.' },
  { issuer: 'Dubai and Abu Dhabi', title: 'SIRA and ADMCC specification', body: 'Surveillance and access control designed to both regulators’ current technical requirements and submitted for approval before handover.' },
  { issuer: 'Information security', title: 'ISO/IEC 27001 governance', body: 'Gap analysis, policy auditing and governance work against the ISO 27001 standard.' },
]
