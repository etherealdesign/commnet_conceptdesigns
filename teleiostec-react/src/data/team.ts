/**
 * ─────────────────────────────────────────────────────────────
 *  PLACEHOLDER CONTENT — replace before going live.
 *  None of the names, roles or bios below are real Teleiostec people.
 *
 *  To add a real photo: drop a portrait (4:5, ≥ 1000px tall) into
 *  public/Asset/team/, run `npm run images`, and set `photo` to its path
 *  without extension, e.g. photo: '/Asset/team/jane-doe'.
 *  Until `photo` is set the card shows a monogram.
 * ─────────────────────────────────────────────────────────────
 */
export type Person = {
  name: string
  role: string
  bio: string
  photo?: string
  linkedin?: string
  focus?: string[]
}

export const leaders: Person[] = [
  {
    name: 'Leader Name',
    role: 'Founder & Managing Director',
    bio: 'Founded Teleiostec in 2012 to bring design, engineering and craft under one roof. Leads the studio’s client relationships and sets the standard every project is held to.',
    focus: ['Strategy', 'Client partnerships', 'Quality'],
  },
  {
    name: 'Leader Name',
    role: 'Director of Design',
    bio: 'Leads the interior and joinery design teams — from first concept sketch to the last veneer sample — and makes sure every detail has a reason.',
    focus: ['Interior design', 'Joinery', 'Materials'],
  },
  {
    name: 'Leader Name',
    role: 'Head of MEP Engineering',
    bio: 'Runs MEP design and BIM coordination, so that mechanical, electrical and plumbing systems disappear into the architecture.',
    focus: ['MEP', 'BIM', 'Commissioning'],
  },
]

export const team: Person[] = [
  { name: 'Team Member', role: 'Senior Interior Designer', bio: 'Residential and hospitality interiors, material palettes and lighting.' },
  { name: 'Team Member', role: 'Project Manager', bio: 'Programme, procurement and site coordination from mobilisation to handover.' },
  { name: 'Team Member', role: 'Joinery Workshop Lead', bio: 'Runs the in-house workshop — veneer matching and hand-finished millwork.' },
  { name: 'Team Member', role: 'MEP Design Engineer', bio: 'HVAC, electrical and plumbing design coordinated in BIM.' },
  { name: 'Team Member', role: 'BIM Coordinator', bio: 'Keeps every discipline in one clash-free model.' },
  { name: 'Team Member', role: 'Site Engineer', bio: 'Quality, safety and progress on site, every day.' },
  { name: 'Team Member', role: 'Procurement Lead', bio: 'Sources materials and fixtures to specification, on time.' },
  { name: 'Team Member', role: 'Quantity Surveyor', bio: 'Budgets, valuations and cost control across the project.' },
]

export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('')
