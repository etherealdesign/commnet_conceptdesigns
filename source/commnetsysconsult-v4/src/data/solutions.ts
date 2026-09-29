// Axis B, Environments ("where we deliver it as one package").
// Source: CONTENT-REVAMP-REVIEW.md §3.2 / §6.3. Six recognisable procurement
// packages; every one of the 18 register contracts maps to exactly one.

export interface SolutionItem {
  slug: string
  code: 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6'
  title: string
  summary: string
  evidence: string
  /** Photograph for the hub card, the page hero and every project card in this environment. */
  media: string
  mediaAlt: string
  /** H1 for the dedicated page, environment + geography */
  pageH1: string
  /** ~60-word definition opening the page (§5 page anatomy, step 2) */
  definition: string
  /** Axis A system codes this environment consumes */
  uses: ('A1' | 'A2' | 'A3' | 'A4' | 'A5')[]
  /** "What we deliver" for this environment */
  deliver: string[]
}

export const solutions: SolutionItem[] = [
  {
    slug: 'data-centres-it-rooms',
    code: 'B1',
    title: 'Data Centres & IT Rooms',
    summary: 'New builds, refurbishments, modular containers and migrations.',
    evidence: 'Sharjah Police · EY · Aptec · DAS Holding · 386 modular containers for Orientek across two Abu Dhabi sites',
    media: '/media/infrastructure-fiber.jpg',
    mediaAlt: 'Terminated copper and fibre inside a data-centre rack',
    pageH1: 'Data Centre & IT Room Contractor, UAE',
    definition:
      'A data centre is not a discipline, it is a room: cabling, racks, power, cooling, suppression and security arriving as one package against one programme. We build them new, refurbish them in occupied buildings, deploy them modular, and migrate live ones, seven of our eighteen documented contracts are rooms of this kind.',
    uses: ['A1', 'A2', 'A5', 'A3'],
    deliver: [
      'New-build white space: racks, containment, power, cooling and suppression',
      'Refurbishment and live upgrade inside an occupied building',
      'Modular and containerised deployment at site scale',
      'Rack-to-rack migration with a documented cutover plan',
      'Environmental monitoring and handover documentation',
    ],
  },
  {
    slug: 'command-security-centres',
    code: 'B2',
    title: 'Command, Control & Security Centres',
    summary: 'Rack, cabling and device build-out for CSOC, NOC and CID rooms, tested and commissioned to utility standard.',
    evidence: "DEWA's Cyber Security Operations Centre · police surveillance for FIFA Beach Soccer 2024",
    media: '/media/security-operations.jpg',
    mediaAlt: 'Operators at a surveillance and control desk',
    pageH1: 'Command, Control & Security Centre Build-out, UAE',
    definition:
      'A command room is a data centre with people in it. Our scope is the physical build: racks, panel cabling, operator positions, display walls, and the device-by-device testing and commissioning that signs the room off. We build the room to utility standard, we do not staff or operate it.',
    uses: ['A1', 'A2', 'A3', 'A4'],
    deliver: [
      'Rack and panel cabling to control-room standard',
      'Operator console positions and cable management',
      'Display and video-wall installation and signal distribution',
      'Device installation, testing and commissioning',
      'Integration with police, CID or authority feeds where required',
    ],
  },
  {
    slug: 'hotels-resorts',
    code: 'B3',
    title: 'Hotels & Resorts',
    summary: 'Guest-room and back-of-house ELV as one contract: cabling, CCTV, GRMS, IPTV, Wi-Fi, PA.',
    evidence: 'Atlantis The Royal · Hilton Jewel of the Creek · Occidental Al Jadaf',
    media: '/media/security-systems.jpg',
    mediaAlt: 'Hotel atrium at dusk with a single figure crossing the lobby',
    pageH1: 'Hotel ELV & Guest Technology Contractor, Dubai',
    definition:
      'Hospitality is the hardest ELV programme to run: every system lands in every room, and the opening date does not move. We take guest-room and back-of-house as one contract, cabling, CCTV, room controls, television, wireless and paging, so there is one party accountable when a floor has to be signed off.',
    uses: ['A1', 'A2', 'A3', 'A4'],
    deliver: [
      'Guest-room cabling, containment and riser to every key',
      'Guest Room Management Systems commissioned room by room',
      'IPTV/SMATV head-end and in-room distribution',
      'CCTV and access control to the emirate’s regulator specification',
      'Back-of-house network, Wi-Fi, PA and background music',
    ],
  },
  {
    slug: 'corporate-fit-out',
    code: 'B4',
    title: 'Corporate Offices & Fit-out',
    summary: 'Cabling, network, Wi-Fi and security for office floors, branches and industrial sites.',
    evidence: 'FTA Levels 13 & 17 · Jotun · Samba Bank · Aptec',
    media: '/media/executive-glass.jpg',
    mediaAlt: 'Boardroom video wall with a network dashboard',
    pageH1: 'Office Fit-out ELV & ICT Contractor, Dubai & Abu Dhabi',
    definition:
      'Floors, branches and industrial sites, usually on a fit-out programme alongside the MEP contractor. Cabling and containment set out with the ceiling, network and wireless commissioned before handover, CCTV and access control submitted to the regulator in time for occupancy. Seven of our documented contracts are this shape.',
    uses: ['A1', 'A2', 'A3'],
    deliver: [
      'Floor-plate cabling, containment and outlet set-out',
      'Comms room build and patching',
      'Switching, routing and enterprise Wi-Fi commissioning',
      'CCTV and access control with authority submission',
      'Multi-branch rollouts to a repeatable standard',
    ],
  },
  {
    slug: 'events-rapid-deployment',
    code: 'B5',
    title: 'Events & Rapid Deployment',
    summary: 'Temporary infrastructure on a fixed date.',
    evidence: 'FIFA Beach Soccer World Cup UAE 2024, cabling, CCTV, network, Wi-Fi and IPTV in 15 days',
    media: '/media/iot-smart-building.jpg',
    mediaAlt: 'Glass atrium with people crossing the floor',
    pageH1: 'Temporary Event Infrastructure, UAE',
    definition:
      'Temporary infrastructure is judged on one thing: whether it is live on the date. For the FIFA Beach Soccer World Cup UAE 2024 we delivered cabling, police and CID CCTV, switching, routing, firewall, Wi-Fi and IPTV in fifteen days, then removed it cleanly. The same discipline covers modular and containerised deployments.',
    uses: ['A1', 'A2', 'A3', 'A4'],
    deliver: [
      'Fixed-date programme with a day-by-day deployment schedule',
      'Temporary cabling, distribution and power',
      'Event CCTV including police and CID integration',
      'Network, firewall and public Wi-Fi',
      'IPTV and display distribution, then clean de-rig',
    ],
  },
  {
    slug: 'amc-sla',
    code: 'B6',
    title: 'AMC & Multi-year SLA',
    summary: 'Preventive maintenance, fault response and managed network contracts.',
    evidence: 'UAE Football Association since 2017 · Dubai Safari Park · DAS Holding UPS',
    media: '/media/enterprise-systems.jpg',
    mediaAlt: 'Network engineer between two rows of live racks',
    pageH1: 'ELV & ICT Maintenance Contracts and Managed SLA, UAE',
    definition:
      'The part of the work that is only proven by time. Preventive maintenance visits, fault response against an agreed target, spares and managed network operation. The longest contract on our register ran eight years for the UAE Football Association, 2017 to 2024, renewed rather than re-tendered.',
    uses: ['A1', 'A2', 'A3', 'A4', 'A5'],
    deliver: [
      'Scheduled preventive maintenance with written visit reports',
      'Fault response against an agreed target',
      'Managed network operation and monitoring',
      'UPS and critical-plant maintenance',
      'Spares holding and lifecycle replacement planning',
    ],
  },
]

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug)

/** One photograph per environment slug, shared by every project card. */
export const solutionMedia: Record<string, string> = Object.fromEntries(solutions.map((s) => [s.slug, s.media]))
