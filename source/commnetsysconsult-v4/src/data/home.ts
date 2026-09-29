import { solutionMedia } from './solutions'

// Home page copy. Every number traces to the register (projects.ts) or the
// numbers register in CONTENT-REVAMP-REVIEW.md §4. Nothing here says
// "approved", "licensed", "certified" or "Tier-N" — see claims.ts.

export const hero = {
  eyebrow: 'Turnkey ELV & ICT systems integrator',
  media: '/media/professional-it.jpg',
  mediaAlt: 'Engineering team on a data-centre walkway',
  /** The approved H1 (§6.1), split into display lines. HTML allowed for the accent. */
  lines: ['Mission-critical infrastructure,', 'delivered as <strong>one package.</strong>'],
  sub: 'Structured cabling, networks, security systems, AV and critical power, designed, installed, certified and supported by one engineering team. 18 documented contracts across the UAE.',
}

/** The radar statement: who we are, in one line. */
export const statement = {
  label: 'Who we are',
  lines: ['We install the systems', '<strong>buildings run on.</strong>'],
  body:
    'A systems integrator that argues its case the way a prequalification document does: evidence first, taxonomy correct, and no claim that cannot survive a tender evaluator checking it. Eighteen documented contracts across data centres, hotels, government and command centres.',
}

/** Environments: the staggered statement over the reticle, then the table. */
export const environments = {
  label: 'Where we deliver',
  words: ['Six', 'environments.', 'One contract.'],
  body:
    'A consultant writing a tender package thinks in systems. A hotel operator thinks in outcomes. Every one of the eighteen documented projects maps to exactly one of these six packages.',
}

/** The scroll-scrubbed stage: four register entries, one screen each. */
export const showcase = {
  label: 'From the register',
  slugs: ['hilton-jewel-of-the-creek', 'sharjah-police-dc', 'fifa-beach-soccer', 'atlantis-the-royal'],
}

export const method = {
  label: 'Method',
  lines: ['Six stages.', '<strong>One programme.</strong>'],
  body:
    'Every system we install passes through the same six stages. The Chennai centre does the detailed engineering; the Dubai office runs the commercial, the field and the commissioning. What comes out at the end is a test report, an authority submission and an as-built set the facilities team can maintain.',
  steps: [
    { title: 'Survey & regulatory mapping', body: 'Site survey, requirement capture, SIRA / ADMCC applicability check.' },
    { title: 'Design & BoQ', body: 'Architecture, drawings and bill of quantities reviewed with the consultant.' },
    { title: 'Engineering', body: 'Detailed design from the Chennai centre: racks, containment, power, network.' },
    { title: 'Installation', body: 'Field teams install, terminate and label to the documented convention.' },
    { title: 'Test, certify, submit', body: 'Link certification, commissioning, authority submission before handover.' },
    { title: 'Support', body: 'AMC and multi-year SLA. The longest in service ran eight years.' },
  ],
}

/**
 * Repeat business is the strongest reference on the site (review §8.5) and
 * it is evidenced, so it is said out loud rather than smoothed over.
 */
export const repeat = {
  label: 'Repeat business',
  lines: ['Brought back', '<strong>three times</strong>', 'by the same prime.'],
  body:
    'Eight of the eighteen contracts on the register ran under a prime. GBM engaged Commnet on three of them, in sequence. For a prime-and-consultant audience that is the strongest reference on the page.',
  slugs: ['hilton-jewel-of-the-creek', 'dewa-csoc', 'atlantis-the-royal'],
}

export const cta = {
  lines: ['Send us the drawings.', 'An engineer replies.'],
  body: 'Scope, a bill of quantities or a site address is enough to start. Dubai head office for commercial and commissioning, Chennai engineering centre for the detailed design.',
}

export const work = {
  title: 'Our Work',
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
