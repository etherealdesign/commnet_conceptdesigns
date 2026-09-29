// Axis A, Systems ("what we install"). Five leaf disciplines, no overlap.
// Source: CONTENT-REVAMP-REVIEW.md §3.2 / §6.2. Copy kept to evidence that
// exists in the project register, no invented capabilities.
//
// "ELV" is the company descriptor and the collective name for this axis.
// "ICT Infrastructure" is A1 + A2 in prose. Neither is a card (§3.2).

export interface ServiceItem {
  slug: string
  code: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6'
  title: string
  summary: string
  evidence: string
  icon: 'cable' | 'network' | 'shield' | 'monitor-play' | 'server-cog'
  /** Photograph for the hub card, the page hero and the detail sidebar. */
  media: string
  mediaAlt: string
  /** Register evidence count, out of 18 */
  count: number
  /** H1 for the dedicated page, discipline + geography (§5 page anatomy) */
  pageH1: string
  /** ~60-word definition opening the page */
  definition: string
  /** "What we deliver", 4-6 items */
  deliver: { title: string; body: string }[]
}

export const services: ServiceItem[] = [
  {
    slug: 'structured-cabling',
    code: 'A1',
    title: 'Structured Cabling & Containment',
    summary:
      'Cat6A copper, single- and multi-mode fibre, backbone and riser, racks and patching, trays and baskets, every link tested and certified.',
    evidence: '13,000 points at Hilton Jewel of the Creek · 80 racks in 25 days for Sharjah Police',
    icon: 'cable',
    media: '/media/infrastructure-fiber.jpg',
    mediaAlt: 'Terminated copper and fibre inside a data-centre rack',
    count: 14,
    pageH1: 'Structured Cabling Contractor, Dubai & Abu Dhabi',
    definition:
      'Structured cabling is the passive layer every other system sits on: copper and fibre links, the backbone carrying them between floors, the racks they terminate into and the containment that protects them. Designed once, certified at handover, then left alone. It is the spine of fourteen of our eighteen documented contracts.',
    deliver: [
      { title: 'Copper & fibre', body: 'Cat6 and Cat6A UTP, single-mode and multi-mode fibre, coaxial where broadcast or SMATV requires it.' },
      { title: 'Backbone & riser', body: 'Vertical riser and horizontal backbone across floors, buildings and campuses, sized for the growth the consultant specifies.' },
      { title: 'Racks & patching', body: 'Rack build, patch-panel layout, labelling schedules and cable management to a documented convention.' },
      { title: 'Containment', body: 'Tray, basket, trunking and conduit, set out with the MEP package rather than fitted around it.' },
      { title: 'Test & certification', body: 'Every link tested and certified, with the test report issued as part of handover documentation.' },
      { title: 'As-built documentation', body: 'Port schedules, rack elevations and as-builts in a form the facilities team can actually maintain.' },
    ],
  },
  {
    slug: 'networks-wifi-compute',
    code: 'A2',
    title: 'Networks, Wi-Fi & Compute',
    summary:
      'Switching, routing and firewall commissioning, enterprise Wi-Fi, IP telephony, server and storage installation.',
    evidence: '8-year network SLA for the UAE Football Association · full switching, routing and firewall for a FIFA event in 15 days',
    icon: 'network',
    media: '/media/enterprise-systems.jpg',
    mediaAlt: 'Network engineer between two rows of live racks',
    count: 9,
    pageH1: 'Enterprise Network & Wi-Fi Integration, UAE',
    definition:
      'The active layer: switching and routing that moves the traffic, firewalls that bound it, wireless that carries it to people, and the servers and storage behind it. We commission it, document it, and on the longest contract on our register we stayed on to run it for eight years.',
    deliver: [
      { title: 'Switching & routing', body: 'Core, distribution and access switching, routing, VLAN and addressing schemes, configured and commissioned.' },
      { title: 'Firewall & gateway', body: 'Perimeter firewall and gateway installation and commissioning as part of the network package.' },
      { title: 'Enterprise Wi-Fi', body: 'Survey-led access-point placement, controller configuration and post-installation validation across occupied buildings and open sites.' },
      { title: 'Servers & storage', body: 'Physical installation, racking, cabling and commissioning of server and storage hardware.' },
      { title: 'IP telephony', body: 'IP telephony and endpoint rollout integrated with the structured cabling package.' },
    ],
  },
  {
    slug: 'security-systems',
    code: 'A3',
    title: 'Security Systems',
    summary:
      'IP CCTV designed to SIRA (Dubai) and ADMCC (Abu Dhabi) requirements, biometric access control, gate barriers, authority submission and handover.',
    evidence: '2,500 cameras at one hotel · ADMCC-specification cameras inside Abu Dhabi Airport · multi-branch access control for Samba Bank',
    icon: 'shield',
    media: '/media/security-operations.jpg',
    mediaAlt: 'Operators at a surveillance and control desk',
    count: 8,
    pageH1: 'SIRA & ADMCC Specification CCTV and Access Control, Dubai & Abu Dhabi',
    definition:
      'CCTV, access control and the authority submission that turns an installed system into an approved one. Dubai systems are designed to SIRA requirements, Abu Dhabi systems to ADMCC requirements. Both regulators set their own technical specifications and revise them, so we confirm the current requirement at design stage rather than working from a published figure.',
    deliver: [
      { title: 'IP & analogue CCTV', body: 'Camera selection, placement, head-end, storage and retention designed against the current regulator requirement for the emirate.' },
      { title: 'Access control', body: 'Card and biometric access control, door hardware integration, gate barriers and turnstiles.' },
      { title: 'Police & CID integration', body: 'Integration and feed hand-off where the authority requires it, delivered on police and CID surveillance scopes.' },
      { title: 'Authority submission', body: 'Applicability check at survey, submission to SIRA or ADMCC, and approval closed out before handover.' },
      { title: 'Commissioning & handover', body: 'Device-by-device testing, retention verification, operator training and documented handover.' },
    ],
  },
  {
    slug: 'av-guest-technology',
    code: 'A4',
    title: 'AV & Guest Technology',
    summary:
      'Guest Room Management Systems, IPTV/SMATV head-ends, PA and background music, video walls and control-room displays.',
    evidence: '820 GRMS rooms at Atlantis The Royal · 800 rooms of IPTV/SMATV at Occidental Al Jadaf',
    icon: 'monitor-play',
    media: '/media/executive-glass.jpg',
    mediaAlt: 'Boardroom video wall with a network dashboard',
    count: 3,
    pageH1: 'GRMS, IPTV and AV Systems for Hotels and Control Rooms, UAE',
    definition:
      'The systems a guest or an operator actually touches: room controls, in-room television, background music and paging, and the display walls a command room is run from. Guest technology is unforgiving, it is commissioned room by room, against an opening date that does not move.',
    deliver: [
      { title: 'Guest Room Management', body: 'GRMS installation, room-by-room commissioning and integration with the property management system.' },
      { title: 'IPTV & SMATV', body: 'Head-end build, distribution and in-room commissioning at property scale.' },
      { title: 'PA & background music', body: 'Public address, voice zoning and background music across guest and back-of-house areas.' },
      { title: 'Video walls & displays', body: 'Command-room and operations display walls, mounting, signal distribution and control.' },
      { title: 'Meeting rooms', body: 'Meeting-room and auditorium AV integrated with the building network.' },
    ],
  },
  {
    slug: 'critical-power-cooling',
    code: 'A5',
    title: 'Critical Power & Cooling',
    summary:
      'UPS and power distribution, generators, precision cooling, environmental monitoring, FM200 suppression, raised floors.',
    evidence: 'Delivered inside every data-centre package · UPS AMC for DAS Holding headquarters',
    icon: 'server-cog',
    media: '/media/power-infrastructure.jpg',
    mediaAlt: 'Engineer at a switchgear panel in a plant room',
    count: 3,
    pageH1: 'UPS, Precision Cooling and Data-Centre Infrastructure, UAE',
    definition:
      'What keeps a room running when the building does not: UPS and distribution, generators, precision cooling, environmental monitoring, suppression and raised floor. It sits inside every data-centre package we deliver, and it decides whether a room survives its first real incident.',
    deliver: [
      { title: 'UPS & distribution', body: 'UPS sizing, installation, PDU and distribution to rack level, with load testing on commissioning.' },
      { title: 'Generators', body: 'Standby generation integration and changeover testing as part of the room package.' },
      { title: 'Precision cooling', body: 'Close-control cooling units, airflow containment and validation against the installed heat load.' },
      { title: 'Environmental monitoring', body: 'EMS for temperature, humidity, leak and door state, alarmed to the operations team.' },
      { title: 'Suppression & raised floor', body: 'FM200 gas suppression and raised-floor systems installed with the room, not retrofitted to it.' },
    ],
  },
  {
    slug: 'cyber-security-csoc',
    code: 'A6',
    title: 'Cyber Security & CSOC',
    summary:
      'Security operations centre build-out, ISO/IEC 27001 gap analysis and policy auditing, and the physical and network layer a CSOC runs on.',
    evidence: 'DEWA Cyber Security Operations Centre build-out for GBM · CSOC practice since 2017',
    icon: 'shield',
    media: '/media/security-operations.jpg',
    mediaAlt: 'Operators at a security operations centre',
    count: 1,
    pageH1: 'Cyber Security & CSOC Integration, UAE',
    definition:
      'A security operations centre is a room, a network and a governance framework. We build the room and the network - racks, panel cabling, device installation, testing and commissioning, as at the DEWA CSOC - and run ISO/IEC 27001 gap analysis and policy auditing against the standard. The practice has operated since 2017.',
    deliver: [
      { title: 'CSOC build-out', body: 'Racks, panel cabling, device installation, testing and commissioning of the operations room, as delivered for the DEWA Cyber Security Operations Centre.' },
      { title: 'ISO/IEC 27001 gap analysis', body: 'Assessment of the current posture against the standard, with a prioritised gap register.' },
      { title: 'Policy auditing', body: 'Review of information-security policies and procedures against ISO 27001 controls.' },
      { title: 'Governance', body: 'A governance framework the organisation can maintain after handover, with the documentation to match.' },
    ],
  },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
export const serviceByCode = (code: string) => services.find((s) => s.code === code)
