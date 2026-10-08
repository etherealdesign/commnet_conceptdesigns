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
  /** A story film in /Asset/media, with -720 and -poster siblings. Vertical (9:16) unless `wide` (16:9). */
  film?: { name: string; label: string; wide?: boolean }
  /** Further views shown below the write-up on the project page. */
  gallery?: Pic[]
}

const view = (name: string, widths: number[], h: number, alt: string): Pic => ({ src: `/Asset/media/${name}`, widths, w: widths.at(-1)!, h, alt })

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
    slug: 'council-chamber',
    title: 'Council Chamber',
    location: 'UAE',
    category: 'Commercial',
    discipline: 'Design Proposal',
    summary: 'A council chamber built around one long table — a lit grid ceiling, timber and stone walls, and conferencing screens set into the joinery.',
    body: [
      'The room is planned for long sessions with many voices: a single U-shaped table with a microphone at every seat, so everyone faces the chair and each other.',
      'A coffered light ceiling spreads even daylight-like light across the table, while timber panelling and stone frame the walls and hold the conferencing screens flush. This is a design proposal, shown here as presented to the client.',
    ],
    pic: { src: '/Asset/media/council-chamber', widths: [400, 618], w: 618, h: 773, alt: 'Long council table with pale leather chairs under a lit grid ceiling' },
    film: { name: 'council-chamber-film', label: 'Council chamber design proposal: the lights come on over the U-shaped table, studded feature wall, fluted slats and backlit coffered ceiling' },
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
    pic: view('grosvenor-tower', [400, 800, 1200, 1694], 932, 'Limestone reception desk in front of a backlit oak screen carrying the Grosvenor name'),
    film: { name: 'grosvenor-tower-film', label: 'Grosvenor Business Tower concept film: corridor, waiting lounge and the reception', wide: true },
    gallery: [
      view('grosvenor-tower-entrance', [400, 800, 1200, 1765], 892, 'Entrance lobby with perforated stone walls and glazed doors'),
      view('grosvenor-tower-waiting', [400, 800, 1200, 1672], 942, 'Waiting alcove with a built-in bench, a tree planter and a lit oak screen'),
      view('grosvenor-tower-lounge', [400, 800, 1200, 1672], 942, 'Waiting area with a stone bench, bamboo planter and backlit oak screen'),
      view('grosvenor-tower-corridor', [400, 800, 1200, 1672], 942, 'Long corridor with a timber slat ceiling edge and perforated stone panels'),
      view('grosvenor-tower-lift-lobby', [400, 800, 1200, 1555], 1012, 'Lift lobby lined with perforated stone panels and a lit oak screen at the end'),
    ],
  },
  {
    slug: 'ellington',
    title: 'Ellington',
    location: 'Dubai',
    category: 'Residential',
    discipline: 'Residential Interior',
    summary: 'A home in warm oak, soft stone and filtered daylight — a living room built around one long media wall, and a dining space that opens to the balcony.',
    body: [
      'The living room is organised around a single media wall: tree-patterned panels, a lit slatted oak shelf and a floating oak console with a stone top, under woven leaf pendants.',
      'The dining space sits against sheer curtains and the balcony beyond, with olive upholstered chairs, an oak table and open shelving — calm, natural materials throughout.',
    ],
    pic: view('ellington-dining-sun', [400, 800, 1200, 1920], 1072, 'Sunlit dining space with olive chairs and an oak table beside sheer curtains and the balcony'),
    gallery: [
      view('ellington-media-wall', [400, 800, 1200, 1920], 1072, 'Sunlit media wall with tree-patterned panels, a slatted oak shelf and a floating oak console'),
      view('ellington-dining', [400, 800, 1199], 1050, 'Dining table with olive chairs, abstract artwork and a linear brass pendant'),
      view('ellington', [400, 800, 1200, 1920], 1080, 'Living room with a tree-patterned media wall, slatted oak shelving and woven leaf pendants'),
      view('ellington-living', [400, 800, 1200, 1920], 1080, 'Media wall with a floating oak console, curved sofa and travertine coffee table'),
    ],
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
