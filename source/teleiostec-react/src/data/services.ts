import type { Pic } from '@/components/Img'

export type Service = {
  slug: string
  no: string
  title: string
  tag: string
  desc: string
  deliverables: string[]
  pic: Pic
}

export const services: Service[] = [
  {
    slug: 'interior', no: '01', title: 'Interior', tag: 'Residential · Hospitality',
    desc: 'Considered residential and hospitality interiors — material, light and proportion resolved before a single wall is set.',
    deliverables: ['Concept & spatial planning', 'Material & finish palettes', 'Lighting design', 'FF&E coordination'],
    pic: { src: '/Asset/media/atrium', widths: [400, 800, 1087], w: 1087, h: 1447, alt: 'Atrium interior with staircase' },
  },
  {
    slug: 'fit-out', no: '02', title: 'Fit-Out', tag: 'Turnkey · Commercial',
    desc: 'Turnkey commercial and workplace fit-out — programme, procurement and site delivered under one accountable team.',
    deliverables: ['Turnkey delivery', 'Programme & procurement', 'Authority approvals', 'Snagging & handover'],
    pic: { src: '/Asset/media/fitout', widths: [400, 800, 1200, 1536], w: 1536, h: 1024, alt: 'Commercial fit-out in progress' },
  },
  {
    slug: 'joinery', no: '03', title: 'Joinery', tag: 'Bespoke · In-house',
    desc: 'Bespoke in-house joinery — veneer matching, solid timber detailing and hand-finished millwork.',
    deliverables: ['Shop drawings', 'Veneer matching', 'Solid timber detailing', 'Hand-finished millwork'],
    pic: { src: '/Asset/media/joinery', widths: [400, 800, 1200, 1536], w: 1536, h: 1024, alt: 'Bespoke timber joinery detail' },
  },
  {
    slug: 'mep', no: '04', title: 'MEP Solutions', tag: 'Engineering · BIM',
    desc: 'Mechanical, electrical and plumbing engineering, coordinated in BIM and integrated invisibly into the architecture.',
    deliverables: ['HVAC design', 'Electrical & lighting power', 'Plumbing & drainage', 'BIM clash coordination'],
    pic: { src: '/Asset/media/mep', widths: [400, 800, 1200, 1536], w: 1536, h: 1024, alt: 'MEP services coordinated above a ceiling' },
  },
]
