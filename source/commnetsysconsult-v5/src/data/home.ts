// Home page copy for v5. Every number traces to the register (projects.ts)
// or CONTENT-REVAMP-REVIEW.md §4. Nothing here says "approved", "licensed",
// "certified" or "Tier-N" — see claims.ts.

export const hero = {
  title: 'Mission-critical infrastructure, delivered as one package.',
  lead:
    'Structured cabling, networks, security, AV and critical power for data centres, hotels, government and command centres in the UAE. Designed, installed, certified and supported by one engineering team.',
  primary: { label: 'See the register', to: '/projects' },
  secondary: { label: 'Tell us about the project' },
  media: '/media/infrastructure-fiber.jpg',
  mediaAlt: 'Terminated copper and fibre cabling in a data-centre rack, rendered as type',
  clients: ['Hilton', 'DEWA', 'Atlantis The Royal', 'UAE FA', 'Sharjah Police'],
}

export const stats = {
  photo: '/media/professional-it.jpg',
  photoAlt: 'Commnet engineering team on a data-centre walkway',
  items: [
    { value: '15,500+', label: 'Cabling points certified' },
    { value: '2,800+', label: 'Cameras commissioned' },
    { value: '18', label: 'Documented contracts' },
  ],
}

export const process = {
  title: 'How we deliver.',
  label: 'Process',
  steps: [
    { title: 'Send us the drawings.', body: 'A scope, a BoQ or a site address is enough. An engineer replies with whether the shape is right for what we do.', photo: '/media/executive-glass.jpg' },
    { title: 'Survey and regulatory mapping.', body: 'Site survey, requirement capture, SIRA and ADMCC applicability check before a line is drawn.', photo: '/media/security-operations.jpg' },
    { title: 'Design and engineering.', body: 'Drawings and bill of quantities reviewed with the consultant. Detailed engineering from the Chennai centre: racks, containment, power, network.', photo: '/media/infrastructure-fiber.jpg' },
    { title: 'Install, test, certify.', body: 'Field teams install, terminate and label to the documented convention. Every link certified, commissioned and submitted to the authority before handover.', photo: '/media/power-infrastructure.jpg' },
    { title: 'Support.', body: 'AMC and multi-year SLA. The longest in service ran eight years, renewed rather than re-tendered.', photo: '/media/enterprise-systems.jpg' },
  ],
}

export const work = {
  title: 'Selected contracts.',
  lead: 'From the register of eighteen. Quantities as delivered; contract values stay in the company profile.',
  slugs: ['hilton-jewel-of-the-creek', 'sharjah-police-dc', 'fifa-beach-soccer', 'atlantis-the-royal', 'orientek-containers'],
  /** One photograph per contract, so no two entries share a frame. */
  photos: {
    'hilton-jewel-of-the-creek': '/media/security-systems.jpg',
    'sharjah-police-dc': '/media/infrastructure-fiber.jpg',
    'fifa-beach-soccer': '/media/iot-smart-building.jpg',
    'atlantis-the-royal': '/media/executive-glass.jpg',
    'orientek-containers': '/media/power-infrastructure.jpg',
  } as Record<string, string>,
  /** Fallback, one photo per environment slug. */
  media: {
    'hotels-resorts': '/media/security-systems.jpg',
    'data-centres-it-rooms': '/media/infrastructure-fiber.jpg',
    'events-rapid-deployment': '/media/iot-smart-building.jpg',
    'command-security-centres': '/media/security-operations.jpg',
    'corporate-fit-out': '/media/executive-glass.jpg',
    'amc-sla': '/media/enterprise-systems.jpg',
  } as Record<string, string>,
}

export const standard = {
  title: "What's in a contract.",
  label: 'The standard',
  strap: 'Every contract, the same handover.',
  items: [
    { title: 'Five systems, one package.', body: 'Cabling, networks, security, AV and power arrive as one contract against one programme, not five subcontracts.' },
    { title: 'Engineered in-house.', body: 'The Chennai centre does the detailed design. The people who draw it are the people who commission it.' },
    { title: 'Designed to the regulator.', body: 'Security systems designed to the current SIRA and ADMCC requirements and submitted before handover.' },
    { title: 'Tested and documented.', body: 'Every link certified. Test reports, port schedules, rack elevations and as-builts issued with the handover pack.' },
    { title: 'Prime or subcontract.', body: 'Eight of eighteen contracts ran under a prime. The documentation is the same either way; GBM came back three times.' },
    { title: 'Stays in service.', body: 'AMC and multi-year SLA after handover. The longest on the register ran eight years.' },
  ],
}

export const start = {
  title: 'Start a project.',
  lead: 'Send the drawings or book a call. An engineer reads everything.',
  photo: '/media/av-command-center.jpg',
  photoAlt: 'Operators in a control room overlooking the city',
  note: 'Dubai head office · Chennai engineering centre.',
}

export const footer = {
  status: ['Tenders open. Send the BoQ.', 'Dubai · Abu Dhabi · Sharjah'],
  wordmark: 'Commnet',
  tagline: 'Built to the drawings.',
}

/** Regulatory position, printed on the compliance page. */
export const complianceNote = {
  chip: 'Compliance',
  paragraphs: [
    'Security systems are designed to the current SIRA (Dubai) and ADMCC (Abu Dhabi) technical requirements and submitted for approval before handover.',
    'Licence and registration numbers travel with the prequalification pack rather than a web page, and are printed here the moment they are confirmed. Until then the site says only what is true.',
    'Test reports, commissioning records and as-built documentation are issued for every contract, whether we are the prime or a subcontractor.',
  ],
}
