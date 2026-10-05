/**
 * ─────────────────────────────────────────────────────────────
 *  PLACEHOLDER CONTENT — replace before going live.
 *  Teleiostec is run by one person. Name, story, credentials and photo
 *  below are stand-ins; everything marked [ ] must come from the client.
 *
 *  To add the photo: drop a portrait (4:5, ≥ 1200px tall) into
 *  public/Asset/team/, run `npm run images`, and set `photo` to its path
 *  without extension, e.g. photo: '/Asset/team/founder'.
 *  Until `photo` is set the portrait shows a monogram.
 * ─────────────────────────────────────────────────────────────
 */
import { FOUNDED } from './site'

export type Person = {
  name: string
  role: string
  bio: string
  photo?: string
  linkedin?: string
  focus?: string[]
}

export const founder: Person & { firstName: string; story: string[]; quote: string } = {
  name: 'Founder Name',
  firstName: 'Founder',
  role: 'Founder & Principal',
  bio: `Founded Teleiostec in ${FOUNDED} and leads every project personally — from the first site visit to the day the keys are handed over.`,
  story: [
    `[Founder story, 2–3 sentences: background, training, what led to starting Teleiostec in ${FOUNDED}.]`,
    'Teleiostec is deliberately small. There is no account manager between you and the person designing your space: the founder takes the brief, resolves the design and the services together, chooses the specialists for each trade and is on site until handover.',
  ],
  quote: 'The person who draws your space is the person you call — every day until it is finished.',
  focus: ['Interior design', 'Fit-out management', 'Joinery detailing', 'MEP coordination'],
}

/** What the founder personally carries on every project — this is the offer. */
export const handles = [
  { no: '01', title: 'The brief and the site', body: 'Every first meeting and site survey, in person. Budget and programme are set against the building as it really is.' },
  { no: '02', title: 'Design and coordination', body: 'Interior, joinery and MEP drawn and resolved together, so clashes are found on screen rather than on site.' },
  { no: '03', title: 'Choosing the specialists', body: 'Each trade is matched to the job — joiners for the joinery, engineers for the services — and briefed directly.' },
  { no: '04', title: 'On site to handover', body: 'Site supervision, quality checks and snagging to a boutique standard, then commissioning and handover.' },
]

/** Trades brought in per project. Disciplines only — no firm names unless the client supplies them. */
export const specialists = [
  { title: 'Joinery', body: 'Veneer matching, solid timber and hand-finished millwork, made to our detailing.' },
  { title: 'MEP engineering', body: 'HVAC, power, lighting and plumbing, designed and installed to the coordinated model.' },
  { title: 'Stone & finishes', body: 'Natural stone, plaster, paint and specialist surfaces.' },
  { title: 'Lighting & controls', body: 'Lighting scenes, controls and AV integrated into the architecture.' },
  { title: 'Approvals', body: 'Authority submissions and certificates for fit-out and services.' },
]

/** [Credentials — replace with real qualifications, memberships and licences, or remove.] */
export const credentials = ['[Qualification / degree]', '[Professional membership]', '[Trade licence — Dubai]']

export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('')
