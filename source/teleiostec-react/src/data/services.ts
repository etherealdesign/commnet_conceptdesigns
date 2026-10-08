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
    slug: 'interior', no: '01', title: 'Interior Design', tag: 'Residential · Hospitality · Commercial',
    desc: 'Thoughtfully conceived interiors shaped by space, material, light and function — creating environments with a clear identity and purpose.',
    deliverables: ['Concept & spatial planning', 'Material & finish palettes', 'Lighting design', 'FF&E coordination'],
    pic: { src: '/Asset/media/tl-living', widths: [400, 800, 1200, 1536], w: 1536, h: 858, alt: 'Living room with a travertine media wall and woven pendant lights' },
  },
  {
    slug: 'project-management', no: '02', title: 'Project Management', tag: 'Programme · Procurement · Site',
    desc: 'End-to-end oversight of programme, procurement, coordination and site progress — maintaining control over quality, timelines and delivery.',
    deliverables: ['Programme & scheduling', 'Procurement', 'Consultant & trade coordination', 'Site progress & quality control'],
    pic: { src: '/Asset/media/joinery', widths: [400, 800, 1200, 1536], w: 1536, h: 1024, alt: 'Timber workshop with joinery in progress' },
  },
  {
    slug: 'mep', no: '03', title: 'MEP Solutions', tag: 'Engineering · Coordination',
    desc: 'Mechanical, electrical and plumbing solutions engineered and coordinated to perform efficiently while integrating seamlessly with the design.',
    deliverables: ['HVAC design', 'Electrical & lighting power', 'Plumbing & drainage', 'BIM clash coordination'],
    pic: { src: '/Asset/media/mep', widths: [400, 800, 1200, 1536], w: 1536, h: 1024, alt: 'MEP services coordinated above a ceiling' },
  },
  {
    slug: 'fit-out', no: '04', title: 'Fit-Out', tag: 'Turnkey · Execution',
    desc: 'Complete fit-out execution, translating approved designs into built environments through carefully managed coordination, workmanship and delivery.',
    deliverables: ['Turnkey delivery', 'Authority approvals', 'Workmanship & finishes', 'Snagging & handover'],
    pic: { src: '/Asset/media/tl-office', widths: [400, 800, 1200, 1536], w: 1536, h: 1428, alt: 'Office corridor with a timber slat ceiling and perforated screen walls' },
  },
]
