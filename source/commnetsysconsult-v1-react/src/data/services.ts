import type { LucideIcon } from 'lucide-react'
import { Cable, Network, ShieldCheck, MonitorPlay, Zap } from 'lucide-react'
import type { ImgKey } from '../lib/images'
import type { Faq } from './company'

export type ServiceSlug =
  | 'structured-cabling'
  | 'networks-wifi-compute'
  | 'security-systems'
  | 'av-guest-technology'
  | 'critical-power-cooling'

export interface Service {
  slug: ServiceSlug
  title: string
  /** Card line (home grid). */
  short: string
  /** Expanded panel / page lede. */
  long: string
  /** Page H1 — system + geography (review §5 page anatomy). */
  h1: string
  /** ~60-word definition for the page. */
  definition: string
  deliver: string[]
  img: ImgKey
  icon: LucideIcon
  /** Column span in the 12-col grid on the home page. */
  span: number
  proof: { value: string; label: string }[]
  faq: Faq[]
}

/** Axis A — what Commnet installs. Five leaf disciplines, no overlap (review §3.2). */
export const SERVICES: Service[] = [
  {
    slug: 'structured-cabling',
    title: 'Structured Cabling & Containment',
    short: 'Copper, fibre, racks and containment — every link tested and certified.',
    long:
      'Cat6A copper, single- and multi-mode fibre, backbone and riser, racks and patching, trays and baskets. Every link is tested and certified before handover. 13,000 points at Hilton Jewel of the Creek; 80 racks in 25 days for Sharjah Police.',
    h1: 'Structured cabling contractor for Dubai, Abu Dhabi and Sharjah',
    definition:
      'Structured cabling is the passive network every other system runs on: the copper and fibre links, the racks and patch panels they terminate in, and the containment that carries them through the building. It appears in 14 of Commnet’s 18 documented contracts, which is why it comes first — every package on this site starts here.',
    deliver: [
      'Cat6 and Cat6A UTP horizontal cabling',
      'Single-mode and multi-mode fibre backbone and riser',
      'Coaxial for IPTV and SMATV distribution',
      'Racks, patch panels and cable management',
      'Trays, baskets and containment',
      'Link testing, certification, labelling and as-built records',
    ],
    img: 'infrastructureFiber',
    icon: Cable,
    span: 8,
    proof: [
      { value: '14 of 18', label: 'contracts include cabling' },
      { value: '15,500+', label: 'points certified' },
      { value: '80', label: 'racks in 25 days' },
    ],
    faq: [
      { q: 'Do you certify every link?', a: 'Yes. Every copper and fibre link is tested and the results are handed over with the as-built drawings and labelling schedule.' },
      { q: 'What is the largest cabling job you have delivered?', a: '13,000 structured cabling points at Hilton Jewel of the Creek, delivered over three years alongside 2,500 CCTV cameras.' },
      { q: 'Can you work to a main contractor’s programme?', a: 'Most of our cabling is delivered that way. GBM, Alemco, Top Rock and Winner Holistics have all engaged us as the cabling subcontractor.' },
    ],
  },
  {
    slug: 'networks-wifi-compute',
    title: 'Networks, Wi-Fi & Compute',
    short: 'Switching, routing, firewalls, enterprise Wi-Fi, servers and storage.',
    long:
      'Switching, routing and firewall commissioning, enterprise Wi-Fi, IP telephony, and server and storage installation. Eight years of network SLA for the UAE Football Association; switching, routing and firewall for a FIFA tournament in 15 days.',
    h1: 'Enterprise network, Wi-Fi and server installation in the UAE',
    definition:
      'The active layer on top of the cabling: switches, routers and firewalls, the wireless network, telephony, and the servers and storage the business runs on. Commnet installs and commissions it, then keeps it running under SLA — the longest in service lasted eight years.',
    deliver: [
      'Core, distribution and access switching',
      'Routing and firewall commissioning',
      'Enterprise Wi-Fi design and deployment',
      'IP telephony',
      'Server and storage installation',
      'IT peripherals and end-user equipment',
    ],
    img: 'professionalIt',
    icon: Network,
    span: 4,
    proof: [
      { value: '8 yr', label: 'longest network SLA' },
      { value: '15', label: 'days for FIFA 2024' },
      { value: '8', label: 'contracts include networks' },
    ],
    faq: [
      { q: 'Do you provide network SLAs after installation?', a: 'Yes. The UAE Football Association network SLA ran from 2017 to 2024; Dubai Safari Park ran from 2022 to 2024.' },
      { q: 'Do you commission firewalls?', a: 'We install and commission firewalls and gateways as part of the network package — most recently for the FIFA Beach Soccer World Cup UAE 2024.' },
    ],
  },
  {
    slug: 'security-systems',
    title: 'Security Systems',
    short: 'CCTV to SIRA and ADMCC specification, access control and perimeter.',
    long:
      'IP CCTV designed to SIRA (Dubai) and ADMCC (Abu Dhabi) requirements, biometric access control, gate barriers, police and CID integration, and authority submission and handover. 2,500 cameras at one hotel; ADMCC-specification cameras inside Abu Dhabi Airport.',
    h1: 'CCTV and access control designed to SIRA and ADMCC specification',
    definition:
      'Physical security in the UAE is regulated emirate by emirate: SIRA in Dubai, ADMCC in Abu Dhabi. Commnet designs CCTV and access control to the current technical requirements of the relevant regulator, confirms them at design stage, and prepares the submission for approval before handover. It is always part of a larger package — never a standalone camera shop.',
    deliver: [
      'IP CCTV designed to SIRA requirements (Dubai)',
      'IP CCTV designed to ADMCC requirements (Abu Dhabi)',
      'Biometric and card access control',
      'Gate barriers and perimeter protection',
      'Police and CID surveillance integration',
      'Authority submission and handover documentation',
    ],
    img: 'securitySystems',
    icon: ShieldCheck,
    span: 4,
    proof: [
      { value: '2,800+', label: 'cameras commissioned' },
      { value: '9', label: 'contracts include security' },
      { value: '2', label: 'regulators designed to' },
    ],
    faq: [
      { q: 'Are your CCTV installations SIRA and ADMCC compliant?', a: 'Systems are designed to the current SIRA (Dubai) and ADMCC (Abu Dhabi) technical requirements and submitted for approval before handover. Requirements are set by each regulator and change, so we confirm them at design stage.' },
      { q: 'Do you install CCTV on its own?', a: 'We can — the Abu Dhabi Airport job was CCTV only, six days on site. Most of our security work, though, is part of a larger cabling and network package.' },
      { q: 'Can you integrate with police monitoring?', a: 'Yes. For the FIFA Beach Soccer World Cup UAE 2024 we delivered CCTV for the CID and Dubai Police.' },
    ],
  },
  {
    slug: 'av-guest-technology',
    title: 'AV & Guest Technology',
    short: 'GRMS, IPTV and SMATV, PA and background music, control-room displays.',
    long:
      'Guest Room Management Systems, IPTV and SMATV head-ends, PA and background music, video walls and control-room displays. 820 GRMS rooms at Atlantis The Royal; IPTV and SMATV to 800 rooms at Occidental Al Jadaf.',
    h1: 'GRMS, IPTV and hotel AV systems in Dubai',
    definition:
      'The systems guests and operators actually touch: room controls, television, sound and the displays in a control room. Commnet’s AV work is concentrated in hospitality, where it is installed alongside the cabling and network as one contract.',
    deliver: [
      'Guest Room Management Systems (GRMS)',
      'IPTV and SMATV head-ends and distribution',
      'Public address and background music',
      'Video walls and control-room displays',
      'Meeting-room AV',
    ],
    img: 'avCommandCenter',
    icon: MonitorPlay,
    span: 4,
    proof: [
      { value: '820', label: 'GRMS rooms' },
      { value: '800', label: 'rooms on IPTV/SMATV' },
      { value: '3', label: 'AV contracts' },
    ],
    faq: [
      { q: 'Have you delivered GRMS at scale?', a: 'Yes — 820 guest rooms at Atlantis The Royal, alongside the structured cabling and the AV and background-music installation.' },
    ],
  },
  {
    slug: 'critical-power-cooling',
    title: 'Critical Power & Cooling',
    short: 'UPS, precision cooling, monitoring, FM200 and raised floors.',
    long:
      'UPS and power distribution, generators, precision cooling, environmental monitoring, FM200 suppression and raised floors. Delivered inside every data-centre package, with UPS maintenance for DAS Holding headquarters.',
    h1: 'Data-centre power, cooling and fire suppression',
    definition:
      'The environment that keeps IT equipment alive: clean power, controlled temperature, fire suppression and the monitoring that raises the alarm. Commnet delivers it inside data-centre and IT-room packages, and maintains it afterwards.',
    deliver: [
      'UPS and power distribution',
      'Precision cooling (CCU)',
      'Environmental monitoring (EMS)',
      'FM200 fire suppression',
      'Raised floors',
      'UPS annual maintenance contracts',
    ],
    img: 'powerInfrastructure',
    icon: Zap,
    span: 4,
    proof: [
      { value: '1 mo', label: 'complete DC for Aptec' },
      { value: '20', label: 'days to IT room' },
      { value: '386', label: 'modular containers' },
    ],
    faq: [
      { q: 'Do you maintain UPS systems after installation?', a: 'Yes. DAS Holding headquarters is covered by a UPS annual maintenance contract following the IT-room build.' },
    ],
  },
]

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)
