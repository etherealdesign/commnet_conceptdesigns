// Axis B — Environments ("where we deliver it as one package").
// Source: CONTENT-REVAMP-REVIEW.md §3.2 / §6.3.

export interface SolutionItem {
  slug: string
  title: string
  summary: string
  evidence: string
}

export const solutions: SolutionItem[] = [
  {
    slug: 'data-centres-it-rooms',
    title: 'Data Centres & IT Rooms',
    summary: 'New builds, refurbishments, modular containers and migrations.',
    evidence: 'Sharjah Police · EY · Aptec · DAS Holding · 386 modular containers for Orientek across two Abu Dhabi sites',
  },
  {
    slug: 'command-security-centres',
    title: 'Command, Control & Security Centres',
    summary: 'Rack, cabling and device build-out for CSOC, NOC and CID rooms, tested and commissioned to utility standard.',
    evidence: "DEWA's Cyber Security Operations Centre · police surveillance for FIFA Beach Soccer 2024",
  },
  {
    slug: 'hotels-resorts',
    title: 'Hotels & Resorts',
    summary: 'Guest-room and back-of-house ELV as one contract: cabling, CCTV, GRMS, IPTV, Wi-Fi, PA.',
    evidence: 'Atlantis The Royal · Hilton Jewel of the Creek · Occidental Al Jadaf',
  },
  {
    slug: 'corporate-fit-out',
    title: 'Corporate Offices & Fit-out',
    summary: 'Cabling, network, Wi-Fi and security for office floors, branches and industrial sites.',
    evidence: 'FTA Levels 13 & 17 · Jotun · Samba Bank · Aptec',
  },
  {
    slug: 'events-rapid-deployment',
    title: 'Events & Rapid Deployment',
    summary: 'Temporary infrastructure on a fixed date.',
    evidence: 'FIFA Beach Soccer World Cup UAE 2024 — cabling, CCTV, network, Wi-Fi and IPTV in 15 days',
  },
  {
    slug: 'amc-sla',
    title: 'AMC & Multi-year SLA',
    summary: 'Preventive maintenance, fault response and managed network contracts.',
    evidence: 'UAE Football Association since 2017 · Dubai Safari Park · DAS Holding UPS',
  },
]
