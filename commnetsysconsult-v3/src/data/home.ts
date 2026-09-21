import { solutionMedia } from './solutions'

// Home page copy. Every number traces to the register (projects.ts) or the
// numbers register in CONTENT-REVAMP-REVIEW.md §4. Nothing here says
// "approved", "licensed", "certified" or "Tier-N" — see claims.ts.

export const hero = {
  title: 'Structured cabling, networks, security, AV and critical power,',
  /** Second clause of the headline, set at reduced contrast. */
  muted: 'designed, installed, certified and supported by one engineering team.',
  media: '/media/infrastructure-fiber.jpg',
  mediaAlt: 'Rows of terminated copper and fibre cabling inside a data-centre rack',
}

export const statement =
  'Introducing a systems integrator that argues its case the way a prequalification document does: evidence first, taxonomy correct, and no claim that cannot survive a tender evaluator checking it.'

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
  title: 'Our Work',
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
