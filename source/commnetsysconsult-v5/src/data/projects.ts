// Project register, 18 documented contracts.
// Source: CONTENT-REVAMP-REVIEW.md §3.3. No AED values on public pages (§8.3).
//
// `prime` is populated only where the review evidences it. §8.5 is explicit
// that repeat business from a large system integrator is the strongest
// reference on the page and should be said out loud: GBM brought Commnet back
// three times (Hilton, DEWA, Atlantis). End-client naming for the remaining
// subcontracts is still an open client question (§9 Q5), do not add a prime
// here on inference.

export type Sector = 'Government' | 'Hospitality' | 'Corporate' | 'Data Centres' | 'Events'
export type SystemCode = 'A1' | 'A2' | 'A3' | 'A4' | 'A5'

export interface Project {
  slug: string
  name: string
  clientOfRecord: string
  /** Main contractor / prime the work was delivered under, where evidenced. */
  prime?: string
  location: string
  duration: string
  sector: Sector
  /** Primary environment (Axis B), title must match a solutions[] title. */
  environment: string
  environmentSlug: string
  /** Systems (Axis A) engaged on this contract. */
  systems: SystemCode[]
  quantities: string
  /** Individual quantity facts, for the detail page. */
  facts: string[]
  scope: string
}

export const projects: Project[] = [
  { slug: 'hilton-jewel-of-the-creek', name: 'Hilton Jewel of the Creek', clientOfRecord: 'Hilton', prime: 'GBM', location: 'Dubai, UAE', duration: '3 years', sector: 'Hospitality', environment: 'Hotels & Resorts', environmentSlug: 'hotels-resorts', systems: ['A1', 'A3'], quantities: '13,000 cabling points · 2,500 cameras', facts: ['13,000 structured cabling points', '2,500 cameras commissioned', 'Three-year programme'], scope: 'Structured cabling and SIRA-specification security systems, guest-room to back-of-house. The largest single cabling scope on the register.' },
  { slug: 'dewa-csoc', name: 'DEWA Cyber Security Operations Centre', clientOfRecord: 'DEWA', prime: 'GBM', location: 'Dubai, UAE', duration: '1 year', sector: 'Government', environment: 'Command, Control & Security Centres', environmentSlug: 'command-security-centres', systems: ['A1', 'A2', 'A3'], quantities: 'Rack & panel cabling, device T&C', facts: ['Rack and panel cabling', 'Device testing and commissioning', 'Utility command-and-control standard'], scope: 'Physical build-out of a utility command-and-control room: racks, panel cabling, device installation, testing and commissioning.' },
  { slug: 'atlantis-the-royal', name: 'Atlantis The Royal', clientOfRecord: 'Atlantis The Royal', prime: 'GBM', location: 'Dubai, UAE', duration: '14 months', sector: 'Hospitality', environment: 'Hotels & Resorts', environmentSlug: 'hotels-resorts', systems: ['A1', 'A4'], quantities: '820 GRMS rooms', facts: ['820 Guest Room Management System rooms', 'PA and background music throughout', '14-month programme'], scope: 'Guest Room Management System and PA/BGM across 820 rooms, commissioned room by room against the opening date.' },
  { slug: 'occidental-al-jadaf', name: 'Occidental Al Jadaf', clientOfRecord: 'Occidental Al Jadaf', location: 'Dubai, UAE', duration: '21 months', sector: 'Hospitality', environment: 'Hotels & Resorts', environmentSlug: 'hotels-resorts', systems: ['A1', 'A2', 'A3', 'A4', 'A5'], quantities: '2,500 cabling points · 315 cameras · 15 ACS doors · 800 rooms IPTV', facts: ['2,500 cabling points', '315 cameras', '15 access-controlled doors', '800 rooms of IPTV/SMATV'], scope: 'All five systems on one contract, cabling, network, security, AV and power across an 800-room hotel.' },
  { slug: 'fifa-beach-soccer', name: 'FIFA Beach Soccer World Cup UAE 2024', clientOfRecord: 'UAE Football Association', location: 'UAE', duration: '15 days', sector: 'Events', environment: 'Events & Rapid Deployment', environmentSlug: 'events-rapid-deployment', systems: ['A1', 'A2', 'A3', 'A4'], quantities: 'Cabling, CID/Police CCTV, network & Wi-Fi, IPTV', facts: ['15-day deployment', 'Police and CID surveillance', 'Switching, routing and firewall', 'Wi-Fi and IPTV distribution'], scope: 'Full temporary event infrastructure delivered in fifteen days, including police and CID surveillance, the fastest delivery on the register.' },
  { slug: 'aptec', name: 'Aptec', clientOfRecord: 'Aptec', location: 'UAE', duration: '1 month', sector: 'Data Centres', environment: 'Data Centres & IT Rooms', environmentSlug: 'data-centres-it-rooms', systems: ['A1', 'A3', 'A5'], quantities: 'Raised floor, EMS, FM200, CCU, UPS', facts: ['Raised floor', 'Environmental monitoring', 'FM200 suppression', 'Close-control cooling and UPS'], scope: 'IT room build-out, power, cooling and fire suppression delivered inside one month.' },
  { slug: 'jotun', name: 'Jotun', clientOfRecord: 'Jotun', location: 'UAE', duration: '14 months', sector: 'Corporate', environment: 'Corporate Offices & Fit-out', environmentSlug: 'corporate-fit-out', systems: ['A1', 'A2', 'A3'], quantities: 'SIRA-specification CCTV · access control', facts: ['SIRA-specification CCTV', 'Access control', 'Office and industrial-site cabling'], scope: 'Office and industrial-site cabling, CCTV and access control across a 14-month programme.' },
  { slug: 'uae-fa', name: 'UAE Football Association', clientOfRecord: 'UAE Football Association', location: 'UAE', duration: '8-year SLA (2017-2024)', sector: 'Government', environment: 'AMC & Multi-year SLA', environmentSlug: 'amc-sla', systems: ['A2'], quantities: 'Servers, storage, Wi-Fi', facts: ['Eight years in service, 2017-2024', 'Servers and storage', 'Managed Wi-Fi and network'], scope: 'The longest-running managed network SLA on the register, renewed rather than re-tendered across eight years.' },
  { slug: 'samba-bank', name: 'Samba Bank', clientOfRecord: 'Samba Bank', location: 'Dubai & Abu Dhabi, UAE', duration: '14 days', sector: 'Corporate', environment: 'Corporate Offices & Fit-out', environmentSlug: 'corporate-fit-out', systems: ['A1', 'A3', 'A5'], quantities: 'Multi-branch access control', facts: ['Multi-branch rollout across two emirates', 'Access control', 'UPS and cabling'], scope: 'Multi-branch access control rollout across Dubai and Abu Dhabi, plus UPS and cabling, in fourteen days.' },
  { slug: 'sharjah-police-dc', name: 'Sharjah Police Data Centre', clientOfRecord: 'Sharjah Police', location: 'Sharjah, UAE', duration: '25 days', sector: 'Government', environment: 'Data Centres & IT Rooms', environmentSlug: 'data-centres-it-rooms', systems: ['A1', 'A2'], quantities: '80 racks', facts: ['80 racks installed', 'Containment and network cabling', 'Live migration in 25 days'], scope: 'Rack, containment and network cabling migration for a police data centre, 80 racks in twenty-five days.' },
  { slug: 'dubai-safari-park', name: 'Dubai Safari Park', clientOfRecord: 'Dubai Safari Park', location: 'Dubai, UAE', duration: '2022-2024', sector: 'Government', environment: 'AMC & Multi-year SLA', environmentSlug: 'amc-sla', systems: ['A1', 'A2'], quantities: 'Wi-Fi, cabling, DC maintenance', facts: ['Open-site Wi-Fi', 'Structured cabling', 'Data-centre maintenance'], scope: 'Ongoing Wi-Fi, cabling and data-centre maintenance across an open public site.' },
  { slug: 'ey', name: 'EY', clientOfRecord: 'EY', location: 'UAE', duration: '1 month', sector: 'Corporate', environment: 'Data Centres & IT Rooms', environmentSlug: 'data-centres-it-rooms', systems: ['A1', 'A5'], quantities: 'IT room refurbishment', facts: ['Corporate data-centre refurbishment', 'Delivered in one month'], scope: 'Corporate data-centre refurbishment inside an occupied professional-services building.' },
  { slug: 'orientek-containers', name: 'Orientek Modular Containers', clientOfRecord: 'Orientek', location: '2 sites, Abu Dhabi, UAE', duration: '4 months', sector: 'Data Centres', environment: 'Data Centres & IT Rooms', environmentSlug: 'data-centres-it-rooms', systems: ['A1', 'A5'], quantities: '386 modular containers (120 + 266)', facts: ['386 modular data containers', 'Two Abu Dhabi sites', '120 + 266 split', 'Four-month programme'], scope: 'Infrastructure build-out for 386 modular data containers across two Abu Dhabi sites, the largest modular deployment on the register.' },
  { slug: 'das-holding', name: 'DAS Holding', clientOfRecord: 'DAS Holding', location: 'UAE', duration: '20 days', sector: 'Corporate', environment: 'Data Centres & IT Rooms', environmentSlug: 'data-centres-it-rooms', systems: ['A1', 'A5'], quantities: 'IT room, UPS AMC', facts: ['Headquarters IT room build-out', 'Ongoing UPS maintenance contract'], scope: 'IT room build-out at headquarters, followed by an ongoing UPS maintenance contract.' },
  { slug: 'divetech-auh-ports', name: 'DiveTech / AUH Ports', clientOfRecord: 'Abu Dhabi Ports', location: 'Abu Dhabi, UAE', duration: '45 days', sector: 'Corporate', environment: 'Corporate Offices & Fit-out', environmentSlug: 'corporate-fit-out', systems: ['A1'], quantities: 'Structured cabling', facts: ['Structured cabling installation', '45-day programme'], scope: 'Structured cabling installation on a ports-authority site.' },
  { slug: 'arjan-residency', name: 'Arjan Residency', clientOfRecord: 'Arjan Residency', location: 'Dubai, UAE', duration: '5 months', sector: 'Corporate', environment: 'Corporate Offices & Fit-out', environmentSlug: 'corporate-fit-out', systems: ['A1'], quantities: 'Structured cabling', facts: ['Residential structured cabling', 'Five-month programme'], scope: 'Residential structured cabling across a completed residency building.' },
  { slug: 'modern-baggage-auh-airport', name: 'Modern Baggage, Abu Dhabi Airport', clientOfRecord: 'Modern Baggage', prime: 'Modern Baggage', location: 'Abu Dhabi, UAE', duration: '6 days', sector: 'Government', environment: 'Corporate Offices & Fit-out', environmentSlug: 'corporate-fit-out', systems: ['A3'], quantities: 'ADMCC-specification CCTV', facts: ['ADMCC-specification CCTV', 'Inside an operating airport', 'Six days on site'], scope: 'CCTV installation to ADMCC specification inside an operating airport, the shortest contract on the register.' },
  { slug: 'fta-levels-13-17', name: 'FTA, Levels 13 & 17', clientOfRecord: 'Federal Tax Authority', location: 'UAE', duration: '3 months', sector: 'Government', environment: 'Corporate Offices & Fit-out', environmentSlug: 'corporate-fit-out', systems: ['A1', 'A2', 'A3'], quantities: 'Cabling, CCTV, network, Wi-Fi', facts: ['Two floors of a federal authority', 'Cabling, CCTV, network and Wi-Fi'], scope: 'Two-floor government office fit-out: cabling, security, network and Wi-Fi.' },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const SECTORS: (Sector | 'All')[] = ['All', 'Government', 'Hospitality', 'Corporate', 'Data Centres', 'Events']

/** Projects evidencing a given Axis A system. */
export const projectsBySystem = (code: SystemCode) => projects.filter((p) => p.systems.includes(code))
/** Projects delivered inside a given Axis B environment. */
export const projectsByEnvironment = (slug: string) => projects.filter((p) => p.environmentSlug === slug)
