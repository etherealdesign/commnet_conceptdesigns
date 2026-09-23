import type { Pic } from '@/components/Img'

export type Project = {
  slug: string
  title: string
  location: string
  category: 'Residential' | 'Hospitality' | 'Commercial'
  discipline: string
  year: number
  summary: string
  body: string[]
  pic: Pic
}

export const projects: Project[] = [
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
      'Every panel was drawn, veneer-matched and hand-finished in our own workshop.',
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
      'Delivered turnkey — design, procurement and site under one accountable team — the house turns on a central atrium that carries light through every level.',
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
