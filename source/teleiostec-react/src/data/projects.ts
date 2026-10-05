import type { Pic } from '@/components/Img'

export type Project = {
  slug: string
  title: string
  location: string
  category: 'Residential' | 'Hospitality' | 'Commercial'
  discipline: string
  /** Left out when unconfirmed — shown only where it is known. */
  year?: number
  summary: string
  body: string[]
  pic: Pic
  /** A vertical (9:16) story film in /Asset/media, with -720 and -poster siblings. */
  film?: { name: string; label: string }
}

export const projects: Project[] = [
  {
    slug: 'peoplelink-experience-center',
    title: 'PeopleLink Experience Center',
    location: 'Al Moosa Tower 2, Dubai',
    category: 'Commercial',
    discipline: 'Commercial Fit-Out',
    year: 2026,
    summary: 'A corporate experience centre taken from floor plan to finished floor — reception, boardroom, training room and leadership cabins.',
    body: [
      'Every great space starts as a plan. The centre was resolved from a single layout into six connected zones: a branded reception, an enterprise boardroom, a digital-signage wall, a hybrid training room, glazed corridors and a leadership cabin.',
      'Collaboration technology is built into the architecture — screens, cameras and signage sit in timber and glass rather than on top of it — so the brand story carries onto every wall.',
    ],
    pic: { src: '/Asset/media/peoplelink', widths: [400, 800, 1080], w: 1080, h: 1250, alt: 'Boardroom with a long timber table and a wall-mounted conferencing screen' },
    film: { name: 'peoplelink-film', label: 'PeopleLink Experience Center, from floor plan through reception, boardroom, training room and leadership cabin' },
  },
  {
    slug: 'grosvenor-business-tower',
    title: 'Grosvenor Business Tower',
    location: 'Barsha Heights, Dubai',
    category: 'Commercial',
    discipline: 'Reception & Lobby Concept',
    year: 2026,
    summary: 'A concept for the tower’s arrival spaces — reception, waiting areas, corridors and lift lobby — in contemporary Japanese minimalism.',
    body: [
      'The reception is the first thing a visitor meets in the building, so the concept starts there. A restrained palette of natural limestone, warm oak and soft architectural lighting carries from the entrance through the waiting areas, corridors and lift lobby.',
      'Clean geometry and understated detailing keep the spaces calm and lasting. This is a design concept presented to the client, to be refined with them before anything is built.',
    ],
    pic: { src: '/Asset/media/grosvenor', widths: [400, 720], w: 720, h: 834, alt: 'Warm living space with oak joinery, a stone feature wall and woven pendant lights' },
    film: { name: 'grosvenor-film', label: 'Grosvenor concept film: oak joinery, stone walls and woven pendant lights' },
  },
  {
    slug: 'the-great-room',
    title: 'The Great Room',
    location: 'Valley Estate, Hatta',
    category: 'Residential',
    discipline: 'Residential Interior',
    year: 2025,
    summary: 'A double-height great room organised around a circular oculus and the valley beyond.',
    body: [
      'The room is drawn from a single gesture: a circular oculus that pulls daylight down the full height of the space and frames the valley view.',
      'Joinery, lighting and MEP were resolved together in one coordinated model, so services disappear into the architecture rather than competing with it.',
    ],
    pic: { src: '/Asset/media/great-room', widths: [400, 800, 1200, 1535], w: 1535, h: 1024, alt: 'Double-height great room with a circular oculus and valley view' },
  },
  {
    slug: 'hearth-residence',
    title: 'Hearth Residence',
    location: 'Emirates Hills',
    category: 'Residential',
    discipline: 'Interior & Joinery',
    year: 2024,
    summary: 'A living room anchored by a sculpted fireplace and warm timber joinery.',
    body: [
      'A sculpted hearth sets the room’s centre of gravity; timber joinery wraps the walls to hold storage, media and lighting in one continuous line.',
      'Every panel was drawn in the studio, then veneer-matched and hand-finished by specialist joiners to that detailing.',
    ],
    pic: { src: '/Asset/media/hearth', widths: [400, 800, 1023], w: 1023, h: 1537, alt: 'Living room with a sculpted fireplace and timber joinery' },
  },
  {
    slug: 'atrium-house',
    title: 'Atrium House',
    location: 'Palm Jumeirah',
    category: 'Residential',
    discipline: 'Turnkey Fit-Out',
    year: 2025,
    summary: 'A turnkey fit-out around a light-filled atrium, staircase and pendant lighting.',
    body: [
      'Delivered turnkey — design, procurement and site under one accountable lead — the house turns on a central atrium that carries light through every level.',
      'The staircase, balustrades and pendant scheme were detailed as a single sculptural element.',
    ],
    pic: { src: '/Asset/media/atrium', widths: [400, 800, 1087], w: 1087, h: 1447, alt: 'Atrium living space with staircase and pendant lighting' },
  },
  {
    slug: 'performance-club',
    title: 'Performance Club',
    location: 'Business Bay',
    category: 'Hospitality',
    discipline: 'Wellness Fit-Out',
    year: 2024,
    summary: 'A wellness and training club finished in warm, tactile materials.',
    body: [
      'A training and recovery club that feels closer to a residence than a gym: warm timber, soft light and acoustic control throughout.',
      'Heavy MEP loads — ventilation, cooling and power for equipment — were routed and concealed without compromising ceiling heights.',
    ],
    pic: { src: '/Asset/media/performance-club', widths: [400, 800, 1200, 1536], w: 1536, h: 1024, alt: 'Wellness and training club interior in warm materials' },
  },
]

export const projectBySlug = (slug?: string) => projects.find((p) => p.slug === slug)
