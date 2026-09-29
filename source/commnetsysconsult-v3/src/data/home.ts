import { solutionMedia } from './solutions'

// Home page copy. Every number traces to the register (projects.ts) or the
// numbers register in CONTENT-REVAMP-REVIEW.md §4. Nothing here says
// "approved", "licensed", "certified" or "Tier-N" — see claims.ts.

export const hero = {
  title: 'Mission-critical infrastructure,',
  /** Second clause of the headline, set at reduced contrast. */
  muted: 'delivered as one package.',
  media: '/media/infrastructure-fiber.jpg',
  mediaAlt: 'Rows of terminated copper and fibre cabling inside a data-centre rack',
}

export const statement =
  'Structured cabling, networks, security systems, AV and critical power for data centres, hotels, government and command centres in the UAE. Designed, installed, certified and supported by one engineering team.'

/** The photo strip behind the systems section. */
export const systemsStrip = [
  { src: '/media/infrastructure-fiber.jpg', alt: 'Terminated copper and fibre inside a data-centre rack' },
  { src: '/media/av-command-center.jpg', alt: 'Operators in a control room overlooking the city' },
  { src: '/media/power-infrastructure.jpg', alt: 'Engineer at a switchgear panel in a plant room' },
  { src: '/media/executive-glass.jpg', alt: 'Boardroom video wall with a network dashboard' },
  { src: '/media/professional-it.jpg', alt: 'Engineering team on a data-centre walkway' },
]

export const method = {
  title: 'Engineering that reads like the tender asked for it.',
  part1: {
    title: 'Evidence-first delivery, from survey to handover',
    text: 'Every system we install passes through the same six stages. The Chennai centre does the detailed engineering; the Dubai office runs the commercial, the field and the commissioning. What comes out at the end is a test report, an authority submission and an as-built set the facilities team can maintain.',
    legend: {
      first: 'Chennai engineering centre',
      second: 'Dubai field & commissioning',
      third: 'Authority submission',
    },
  },
  part2: {
    line1: 'Six stages.',
    line2: 'One programme.',
    steps: [
      { title: 'Survey & regulatory mapping', body: 'Site survey, requirement capture, SIRA / ADMCC applicability check.' },
      { title: 'Design & BoQ', body: 'Architecture, drawings and bill of quantities reviewed with the consultant.' },
      { title: 'Engineering', body: 'Detailed design from the Chennai centre: racks, containment, power, network.' },
      { title: 'Installation', body: 'Field teams install, terminate and label to the documented convention.' },
      { title: 'Test, certify, submit', body: 'Link certification, commissioning, authority submission before handover.' },
      { title: 'Support', body: 'AMC and multi-year SLA. The longest in service ran eight years.' },
    ],
  },
}

/** The pinned scroll section. Three measured facts, one screen each. */
export const impact = {
  slides: [
    { value: '13,000', unit: 'cabling points', body: 'Certified on one hotel programme, Hilton Jewel of the Creek, over three years.' },
    { value: '15', unit: 'days', body: 'From empty site to police-grade surveillance, network, Wi-Fi and IPTV for the FIFA Beach Soccer World Cup 2024.' },
    { value: '8', unit: 'years', body: 'The longest managed network SLA on the register, renewed rather than re-tendered.' },
  ],
}

export const flagship = {
  title: '18 documented contracts across data centres, hotels, government and command centres in the UAE',
  subtitle: 'Dubai · Abu Dhabi · Sharjah',
  media: '/media/dubai-skyline.jpg',
  mediaAlt: 'Dubai skyline at dusk',
}

/**
 * Repeat business is the strongest reference on the site (review §8.5) and
 * it is evidenced, so it is said out loud rather than smoothed over.
 */
export const repeat = {
  heading: 'Brought back three times by the same prime.',
  cards: [
    { client: 'Hilton Jewel of the Creek', prime: 'GBM', fact: '13,000 cabling points · 2,500 cameras · 3 years', slug: 'hilton-jewel-of-the-creek' },
    { client: 'DEWA Cyber Security Operations Centre', prime: 'GBM', fact: 'Rack and panel cabling, device T&C · 1 year', slug: 'dewa-csoc' },
    { client: 'Atlantis The Royal', prime: 'GBM', fact: '820 GRMS rooms, PA and BGM · 14 months', slug: 'atlantis-the-royal' },
  ],
}

export const work = {
  title: 'Selected contracts',
  /** Project slugs shown in the carousel, in order. */
  slugs: [
    'hilton-jewel-of-the-creek',
    'sharjah-police-dc',
    'fifa-beach-soccer',
    'orientek-containers',
    'atlantis-the-royal',
    'dewa-csoc',
    'occidental-al-jadaf',
  ],
  /** One photo per environment slug, for the cards. */
  media: solutionMedia,
}

export const complianceNote = {
  chip: 'Compliance',
  paragraphs: [
    'Security systems are designed to the current SIRA (Dubai) and ADMCC (Abu Dhabi) technical requirements and submitted for approval before handover.',
    'Licence and registration numbers travel with the prequalification pack rather than a web page, and are printed here the moment they are confirmed. Until then the site says only what is true.',
    'Test reports, commissioning records and as-built documentation are issued for every contract, whether we are the prime or a subcontractor.',
  ],
  media: '/media/av-command-center.jpg',
  mediaAlt: 'Operators at a command centre overlooking the city',
}


/* ------------------------------------------------------------------
   Lightship-idiom home page. Sections in page order after the hero.
   ------------------------------------------------------------------ */

/** The photo collage that scrolls in from the edges under the hero. Three columns, left / centre / right. */
export const collage = {
  columns: [
    [
      { src: '/media/professional-it.jpg', alt: 'Engineering team on a data-centre walkway', small: false },
      { src: '/media/executive-glass.jpg', alt: 'Boardroom video wall', small: true },
    ],
    [{ src: '/media/av-command-center.jpg', alt: 'Operators in a control room overlooking the city', small: false }],
    [
      { src: '/media/security-systems.jpg', alt: 'Hotel atrium', small: true },
      { src: '/media/power-infrastructure.jpg', alt: 'Engineer at a switchgear panel', small: false },
    ],
  ],
  intro:
    'Commnet is a new standard in ELV and ICT delivery, where the discipline of a prequalification document meets one accountable engineering team. From our Chennai engineering centre to the Dubai site, every system is designed, installed, certified and supported under one contract.',
}

/** The stacking cards under the giant sticky heading. */
export const stack = {
  heading: 'This is Commnet.',
  cards: [
    { src: '/media/infrastructure-fiber.jpg', alt: 'Terminated copper and fibre inside a rack' },
    { src: '/media/enterprise-systems.jpg', alt: 'Engineer in a server hall' },
    { src: '/media/security-operations.jpg', alt: 'Security operations centre' },
    { src: '/media/dubai-skyline.jpg', alt: 'Dubai skyline at dusk' },
  ],
  blocks: [
    { title: 'One package, not five subcontracts.', body: 'Cabling, networks, security, AV and power arrive as one contract against one programme, with one team accountable from survey to handover.' },
    { title: 'More of what matters.', body: 'With 15,500 cabling points certified, 2,800 cameras commissioned and an eight-year managed SLA on the register, the evidence is measured, not described.' },
  ],
  last: { title: 'Built to the drawings.', button: { label: 'See the register', to: '/projects' } },
}

export const systemsRail = {
  title: 'Six disciplines. Smooth handovers.',
  tag: 'Systems',
}

/** Full-bleed parallax statement. */
export const journey = {
  title: 'The record starts with a closer look.',
  button: { label: 'Explore the register', to: '/projects' },
  media: '/media/dubai-skyline.jpg',
  mediaAlt: 'Dubai skyline at dusk',
}

export const bigText =
  'Discover a better way to build, where the taxonomy is correct, the quantities are as delivered and no claim is made that cannot survive a tender evaluator checking it. With one engineering team, a Chennai design centre and a Dubai field office, your programme holds.'

export const editorial = {
  body:
    'We started Commnet with a belief: mission-critical infrastructure should be delivered by the people who engineered it. As a turnkey ELV and ICT integrator we bring the whole package straight to the site, reimagining the trade with one team that designs in Chennai, installs in Dubai and stays on through the SLA. Whether it is an 800-room hotel or a fifteen-day event, our contracts are built for reliability, documentation and repeat business, so you can focus on the opening date, not the integration.',
  button: { label: 'About us', to: '/about' },
  media: '/media/professional-it.jpg',
  mediaAlt: 'The engineering team on a data-centre walkway',
}

export const industriesRail = {
  title: 'Built for sectors where downtime is not an option.',
  lead: 'Every vertical brings its own regulator, uptime target and threat model. Commnet engineers to all three.',
}

export const discover = {
  title: 'More to discover',
  /** Register entries shown, in order. */
  slugs: ['hilton-jewel-of-the-creek', 'sharjah-police-dc', 'fifa-beach-soccer', 'orientek-containers', 'dewa-csoc', 'atlantis-the-royal', 'uae-fa'],
}

export const push = {
  title: 'Want the full company profile?',
  body: 'The prequalification pack carries the register with contract values, licences, manpower and the test documentation we hand over. Leave an email and an engineer sends it.',
  media: '/media/av-command-center.jpg',
  mediaAlt: 'Operators in a control room overlooking the city',
}
