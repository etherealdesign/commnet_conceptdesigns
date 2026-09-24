import type { LucideIcon } from 'lucide-react'
import { Server, RadioTower, Hotel, Building2, Timer, Wrench } from 'lucide-react'
import type { ImgKey } from '../lib/images'
import type { ServiceSlug } from './services'
import type { Faq } from './company'

export type SolutionSlug =
  | 'data-centres-it-rooms'
  | 'command-security-centres'
  | 'hotels-resorts'
  | 'corporate-fit-out'
  | 'events-rapid-deployment'
  | 'amc-sla'

export interface Solution {
  slug: SolutionSlug
  title: string
  short: string
  h1: string
  definition: string
  includes: string[]
  systems: ServiceSlug[]
  img: ImgKey
  icon: LucideIcon
  faq: Faq[]
}

/** Axis B — where Commnet delivers it as one package (review §3.2). */
export const SOLUTIONS: Solution[] = [
  {
    slug: 'data-centres-it-rooms',
    title: 'Data Centres & IT Rooms',
    short: 'New builds, refurbishments, modular containers and migrations.',
    h1: 'Data-centre and IT-room contractor in the UAE',
    definition:
      'A data centre is not one trade but five: cabling, network, power, cooling and fire suppression, each depending on the others. Commnet delivers them as one engineered package — from a single corporate IT room in 20 days to 386 modular containers across two sites.',
    includes: ['Raised floor, racks and containment', 'Rack-to-rack copper and fibre', 'UPS, precision cooling and EMS', 'FM200 suppression', 'Equipment installation and migration support', 'Maintenance after handover'],
    systems: ['structured-cabling', 'networks-wifi-compute', 'critical-power-cooling', 'security-systems'],
    img: 'enterpriseSystems',
    icon: Server,
    faq: [
      { q: 'Do you support live migrations?', a: 'Yes. For Sharjah Police we installed 80 racks with containment and cabling, then supported equipment installation and migration — 25 days in total.' },
      { q: 'Do you build modular or containerised data centres?', a: 'We delivered the infrastructure for 386 modular data containers across Mina Zayed and Masdar City in four months.' },
    ],
  },
  {
    slug: 'command-security-centres',
    title: 'Command, Control & Security Centres',
    short: 'Rack, cabling and device build-out for CSOC, NOC and CID rooms.',
    h1: 'Command, control and security-centre build-out',
    definition:
      'The physical build of the rooms that watch everything else: racks, panel cabling, security devices, displays, testing and commissioning. Commnet builds the room to utility standard; the operating organisation runs it.',
    includes: ['Rack installation and dressing', 'Panel and console cabling', 'Security device installation', 'Control-room displays', 'Testing and commissioning'],
    systems: ['structured-cabling', 'networks-wifi-compute', 'security-systems', 'av-guest-technology'],
    img: 'securityOperations',
    icon: RadioTower,
    faq: [
      { q: 'Do you operate security operations centres?', a: 'No. We build them — racks, cabling, device installation, testing and commissioning. The DEWA CSOC is the reference.' },
    ],
  },
  {
    slug: 'hotels-resorts',
    title: 'Hotels & Resorts',
    short: 'Guest-room and back-of-house ELV as one contract.',
    h1: 'Hotel ELV and ICT systems in Dubai',
    definition:
      'A hotel needs every low-current system at once — cabling, CCTV, access control, GRMS, IPTV, Wi-Fi, PA — and needs them to open on the same day. Commnet has delivered that package at Atlantis The Royal, Hilton Jewel of the Creek and Occidental Al Jadaf.',
    includes: ['Guest-room and back-of-house cabling', 'CCTV and access control', 'GRMS', 'IPTV and SMATV', 'Wi-Fi and telephony', 'PA and background music'],
    systems: ['structured-cabling', 'networks-wifi-compute', 'security-systems', 'av-guest-technology'],
    img: 'executiveGlass',
    icon: Hotel,
    faq: [
      { q: 'Which hotels have you delivered?', a: 'Atlantis The Royal (820 GRMS rooms), Hilton Jewel of the Creek (13,000 cabling points, 2,500 cameras) and Occidental Al Jadaf (every low-current system, 800 rooms).' },
    ],
  },
  {
    slug: 'corporate-fit-out',
    title: 'Corporate Offices & Fit-out',
    short: 'Cabling, network, Wi-Fi and security for floors, branches and sites.',
    h1: 'Office ICT fit-out in Dubai and Abu Dhabi',
    definition:
      'Office floors, bank branches, industrial sites and residential towers: the ICT and security that goes in during fit-out. Usually delivered for the fit-out contractor, to their programme.',
    includes: ['Floor cabling and comms rooms', 'Switching, routing and Wi-Fi', 'CCTV and access control', 'Multi-site branch roll-outs'],
    systems: ['structured-cabling', 'networks-wifi-compute', 'security-systems'],
    img: 'dubaiSkyline',
    icon: Building2,
    faq: [
      { q: 'Can you roll out across multiple branches?', a: 'Yes. Samba Bank’s branch access control, UPS and cabling across Dubai and Abu Dhabi was delivered in fourteen days.' },
    ],
  },
  {
    slug: 'events-rapid-deployment',
    title: 'Events & Rapid Deployment',
    short: 'Temporary infrastructure on a date that will not move.',
    h1: 'Temporary ICT and surveillance for events',
    definition:
      'When the opening date is fixed, the infrastructure has to be. Commnet delivered cabling, police CCTV, network, Wi-Fi and IPTV for the FIFA Beach Soccer World Cup UAE 2024 in fifteen days.',
    includes: ['Temporary fibre and copper', 'Event CCTV and police integration', 'Switching, routing and firewall', 'Wi-Fi and IPTV', 'IT peripherals'],
    systems: ['structured-cabling', 'networks-wifi-compute', 'security-systems', 'av-guest-technology'],
    img: 'avCommandCenter',
    icon: Timer,
    faq: [
      { q: 'Can you deliver on a fixed date?', a: 'FIFA Beach Soccer World Cup UAE 2024: cabling, CCTV, network, Wi-Fi and IPTV in 15 days.' },
    ],
  },
  {
    slug: 'amc-sla',
    title: 'AMC & Multi-year SLA',
    short: 'Preventive maintenance, fault response and managed networks.',
    h1: 'Network SLA and ELV maintenance contracts',
    definition:
      'The job after handover. Preventive maintenance, fault response and managed network contracts, run by the team that installed the system. The longest in the register ran eight years.',
    includes: ['Preventive maintenance schedules', 'Fault response', 'Managed network infrastructure', 'Data-centre maintenance', 'UPS annual maintenance'],
    systems: ['structured-cabling', 'networks-wifi-compute', 'critical-power-cooling'],
    img: 'iotSmartBuilding',
    icon: Wrench,
    faq: [
      { q: 'Do you offer AMC or SLA after handover?', a: 'Yes. The longest in the register is an eight-year network SLA for the UAE Football Association (2017–2024).' },
    ],
  },
]

export const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.slug === slug)
