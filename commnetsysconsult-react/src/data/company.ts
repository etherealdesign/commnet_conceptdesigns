import type { LucideIcon } from 'lucide-react'
import { Award, Trophy, ShieldCheck, Repeat } from 'lucide-react'

export interface Faq {
  q: string
  a: string
}

export const NAV = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/projects', label: 'Projects' },
  { to: '/compliance', label: 'Compliance' },
  { to: '/contact', label: 'Contact' },
] as const

/** Names in the trust strip. Primes appear alongside end-clients (review §7.8). */
export const CLIENTS = [
  'GBM',
  'DEWA',
  'Atlantis The Royal',
  'Hilton',
  'EY',
  'UAE Football Association',
  'Dubai Safari Park',
  'Jotun',
  'Sharjah Police',
  'Samba Bank',
  'Abu Dhabi Airport',
  'Federal Tax Authority',
]

/** Only milestones with evidence carry a year (review §7.4). */
export const TIMELINE = [
  { yr: '2000s', title: 'Foundation', body: 'Founded in Dubai in the early 2000s as a two-person consultancy focused on low-current and structured cabling design.' },
  { yr: '2017', title: 'Eight-year SLA begins', body: 'Implemented the UAE Football Association’s servers, network and Wi-Fi, then held its network infrastructure SLA through 2024.' },
  { yr: '2022', title: 'Managed services', body: 'Took on Dubai Safari Park’s Wi-Fi, cabling and data-centre maintenance under a network SLA.' },
  { yr: '2024', title: 'FIFA delivery and Huawei recognition', body: 'Delivered ICT and police surveillance for the FIFA Beach Soccer World Cup UAE in 15 days, and received a Huawei Data Centre Facility service performance certificate.' },
]

/** Every figure traces to the 18-contract register (review §4). */
export const NUMBERS: { to: number; prefix?: string; suffix?: string; label: string }[] = [
  { to: 18, label: 'Documented enterprise contracts' },
  { to: 15500, suffix: '+', label: 'Structured cabling points certified' },
  { to: 2800, suffix: '+', label: 'CCTV cameras commissioned' },
  { to: 820, label: 'Hotel rooms on GRMS' },
  { to: 386, label: 'Modular data containers' },
  { to: 8, suffix: '-year', label: 'Longest SLA in service' },
]

/** Only sectors where a project exists (review §6.5). */
export const SECTORS = [
  { name: 'Government', proof: 'DEWA, Sharjah Police, FTA' },
  { name: 'Hospitality', proof: 'Atlantis, Hilton, Occidental' },
  { name: 'Corporate', proof: 'EY, Aptec, DAS Holding' },
  { name: 'Sports & Events', proof: 'UAE FA, FIFA 2024' },
  { name: 'Industrial', proof: 'Jotun' },
  { name: 'Banking', proof: 'Samba Bank' },
]

export const PROCESS = [
  { t: 'Survey', d: 'Site survey, requirement capture and a SIRA or ADMCC applicability check.' },
  { t: 'Design & BoQ', d: 'Architecture, drawings and bill of quantities reviewed with the consultant.' },
  { t: 'Engineering', d: 'Detailed design from the Chennai centre: racks, containment, power, network.' },
  { t: 'Installation', d: 'Field teams install, terminate and label to standard.' },
  { t: 'Test & approve', d: 'Link certification, commissioning, authority submission and approval.' },
  { t: 'Support', d: 'AMC and multi-year SLA. The longest in service ran eight years.' },
]

export const RECOGNITION: { kicker: string; title: string; body: string; icon: LucideIcon }[] = [
  { kicker: 'Huawei Data Centre Facility · 2024/25', title: 'Service Performance Certificate', body: 'Recognition for service performance and data-centre delivery standards.', icon: Award },
  { kicker: 'UAE FA · FIFA · Dubai Police · 2024', title: 'FIFA Beach Soccer World Cup', body: 'Cabling, police CCTV, network, Wi-Fi and IPTV delivered in 15 days.', icon: Trophy },
  { kicker: 'Dubai and Abu Dhabi', title: 'Designed to SIRA and ADMCC', body: 'Security systems designed to each regulator’s current technical requirements and submitted before handover.', icon: ShieldCheck },
  { kicker: 'GBM · three engagements', title: 'The subcontractor primes bring back', body: 'GBM engaged Commnet for Hilton Jewel of the Creek, the DEWA CSOC and Atlantis The Royal.', icon: Repeat },
]

export const LEADERSHIP = [
  { initials: 'KN', name: 'Karthikeyan Narayanasamy', role: 'Chief Executive Officer', bio: 'Executive leadership and the vision that grew a two-person consultancy into a regional systems integrator.', ceo: true },
  { initials: 'GC', name: 'Gopi', role: 'Project Director', bio: 'Turnkey ELV execution, field operations and project delivery across hospitality, government and corporate sites.' },
  { initials: 'AB', name: 'Askar Basha M N', role: 'Business Development Manager', bio: 'Enterprise client acquisition, commercial tenders and partnership development.' },
  { initials: 'SD', name: 'Swathi Dumpala', role: 'Finance Manager', bio: 'Financial operations, contracts and accounting for multi-year SLA programmes.' },
]

export const OFFICES = [
  {
    kicker: 'Middle East HQ',
    city: 'Dubai, UAE',
    address: 'Office 301, Centurion Star Building, Tower A, Port Saeed, PO Box 117133',
    street: 'Office 301, Centurion Star Building, Tower A, Port Saeed',
    locality: 'Dubai',
    country: 'AE',
    phone: '+971 4 295 5299',
    phoneHref: 'tel:+97142955299',
    email: 'info@commnetsysconsult.com',
    hours: 'Mon to Fri, 9:00 to 18:00',
  },
  {
    kicker: 'Engineering Center',
    city: 'Chennai, India',
    address: '7/1 KKSK Building, 1st Floor, Visvanathar Koil St, St. Thomas Mount, Chennai 600016',
    street: '7/1 KKSK Building, 1st Floor, Visvanathar Koil St, St. Thomas Mount',
    locality: 'Chennai',
    country: 'IN',
    phone: '+91 75581 64222',
    phoneHref: 'tel:+917558164222',
    email: 'info@commnetsysconsult.in',
    hours: 'Mon to Fri, 9:30 to 18:30',
  },
]

/** Home-page FAQ (review §6.9). Emitted as FAQPage JSON-LD. */
export const HOME_FAQ: Faq[] = [
  { q: 'Do you work as a subcontractor to main contractors and system integrators?', a: 'Yes. Many of our documented contracts were delivered for primes including GBM, Teksalah, Gerab and Al Seeb. We hand over the same test documentation either way.' },
  { q: 'Are your CCTV installations SIRA and ADMCC compliant?', a: 'Systems are designed to the current SIRA (Dubai) and ADMCC (Abu Dhabi) technical requirements and submitted for approval before handover.' },
  { q: 'What is the smallest and largest job you take?', a: 'The register runs from a six-day airport CCTV installation to a three-year, 13,000-point hotel.' },
  { q: 'Can you deliver on a fixed date?', a: 'FIFA Beach Soccer World Cup UAE 2024: cabling, CCTV, network, Wi-Fi and IPTV in 15 days.' },
  { q: 'Do you do the engineering in-house?', a: 'Design and detailed engineering are done by our Chennai engineering centre; commercial, field and commissioning teams are in Dubai.' },
  { q: 'Do you offer AMC or SLA after handover?', a: 'Yes. The longest in service was an eight-year network SLA for the UAE Football Association.' },
  { q: 'Which emirates do you cover?', a: 'Dubai, Abu Dhabi and Sharjah, from the Dubai head office.' },
  { q: 'What do you need from us to quote?', a: 'Drawings or a BoQ, site access for a survey, and the authority (SIRA or ADMCC) status of the premises.' },
]

/** Regulator explainer — correct where competitors are wrong (review §6.8). */
export const REGULATORS = [
  {
    abbr: 'SIRA',
    name: 'Security Industry Regulatory Agency',
    where: 'Dubai',
    body: 'Licenses the companies that install and maintain security systems in Dubai and sets the technical guidelines CCTV must meet. Systems in licensed premises are designed, submitted and handed over under SIRA’s rules.',
    href: 'https://www.sira.gov.ae',
  },
  {
    abbr: 'ADMCC',
    name: 'Abu Dhabi Monitoring & Control Centre',
    where: 'Abu Dhabi',
    body: 'Established in 2011 and, since 2019, part of the Supreme Council for National Security. It qualifies and licenses companies working in monitoring and control and sets the technical requirements for CCTV in Abu Dhabi. Requirements change; Commnet confirms them at design stage rather than quoting fixed numbers.',
    href: 'https://www.mcc.gov.ae',
  },
]
