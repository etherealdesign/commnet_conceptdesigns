import type { Pic } from '@/components/Img'

export const steps: { no: string; title: string; short: string; long: string; pic: Pic }[] = [
  {
    no: '01', title: 'Discover', short: 'Site, brief and budget mapped to the building.',
    long: 'We survey the site, listen to how the space will be lived in or worked in, and set a realistic budget and programme against the building as it really is.',
    pic: { src: '/Asset/media/kitchen-house', widths: [400, 800, 1200, 1616], w: 1616, h: 974, alt: 'Kitchen interior' },
  },
  {
    no: '02', title: 'Design', short: 'BIM, MEP, joinery and materials resolved together.',
    long: 'Interior, joinery and MEP are drawn in one coordinated BIM model — clashes are found on screen, not on site, and every material is chosen before work begins.',
    pic: { src: '/Asset/media/atrium', widths: [400, 800, 1087], w: 1087, h: 1447, alt: 'Atrium interior' },
  },
  {
    no: '03', title: 'Build', short: 'Our own craftsmen construct what was drawn.',
    long: 'Our own site teams and workshop build what was drawn. The people who detailed the joinery are the people who make it.',
    pic: { src: '/Asset/media/hearth', widths: [400, 800, 1023], w: 1023, h: 1537, alt: 'Living room with fireplace' },
  },
  {
    no: '04', title: 'Deliver', short: 'Snagged to a boutique standard, on time.',
    long: 'Every room is snagged to a boutique standard, systems are commissioned and documented, and the space is handed over on programme.',
    pic: { src: '/Asset/media/great-room', widths: [400, 800, 1200, 1535], w: 1535, h: 1024, alt: 'Finished great room' },
  },
]

export const principles = [
  { no: '01', title: 'Resolved before it is built.', body: 'BIM models, MEP routing, joinery details and material palettes are settled together — so nothing is discovered late on site.' },
  { no: '02', title: 'One accountable team.', body: 'A single point of responsibility from brief to handover. On programme, within budget, with no gaps between design and delivery.' },
  { no: '03', title: 'Made by our own hands.', body: 'Our own craftsmen and engineers build what we draw, held to a boutique standard of finish and quality assurance.' },
]
