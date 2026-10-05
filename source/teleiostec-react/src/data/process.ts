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
    pic: { src: '/Asset/media/tl-reception', widths: [400, 800, 1200, 1536], w: 1536, h: 1072, alt: 'Reception lobby with perforated timber screens' },
  },
  {
    no: '03', title: 'Build', short: 'Hand-picked specialists build what was drawn.',
    long: 'Each trade is carried out by specialists chosen for the project and supervised on site by the founder, so what was drawn is what gets built.',
    pic: { src: '/Asset/media/tl-lounge', widths: [400, 800, 1200, 1536], w: 1536, h: 1150, alt: 'Waiting lounge beside a planted courtyard' },
  },
  {
    no: '04', title: 'Deliver', short: 'Snagged to a boutique standard, on time.',
    long: 'Every room is snagged to a boutique standard, systems are commissioned and documented, and the space is handed over on programme.',
    pic: { src: '/Asset/media/tl-dining', widths: [400, 800, 1200, 1536], w: 1536, h: 858, alt: 'Sunlit dining room, finished and handed over' },
  },
]

export const principles = [
  { no: '01', title: 'Resolved before it is built.', body: 'BIM models, MEP routing, joinery details and material palettes are settled together — so nothing is discovered late on site.' },
  { no: '02', title: 'One point of contact.', body: 'The founder leads every project personally, from brief to handover. On programme, within budget, with no hand-offs between design and delivery.' },
  { no: '03', title: 'Made by trusted hands.', body: 'Specialist joiners, engineers and finishers chosen for each job, briefed directly and held to one boutique standard of finish.' },
]
