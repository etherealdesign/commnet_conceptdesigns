import type { Pic } from '@/components/Img'

/** `film`: a looping clip in /Asset/media (with -720 and -poster siblings) shown instead of the still. */
export const steps: { no: string; title: string; short: string; long: string; pic: Pic; film?: { name: string; label: string } }[] = [
  {
    no: '01', title: 'Discover', short: 'Site, brief and budget mapped to the building.',
    long: 'We survey the site, listen to how the space will be lived in or worked in, and set a realistic budget and programme against the building as it really is.',
    pic: { src: '/Asset/media/kitchen-house', widths: [400, 800, 1200, 1616], w: 1616, h: 974, alt: 'Kitchen interior' },
  },
  {
    no: '02', title: 'Design', short: 'BIM, MEP, joinery and materials resolved together.',
    long: 'Interior, joinery and MEP are drawn in one coordinated BIM model — clashes are found on screen, not on site, and every material is chosen before work begins.',
    pic: { src: '/Asset/media/atrium', widths: [400, 800, 1087], w: 1087, h: 1447, alt: 'Atrium interior' },
    film: { name: 'dining-sketch-film', label: 'A pencil sketch of a dining room filling in with colour, timber and light' },
  },
  {
    no: '03', title: 'Build', short: 'Hand-picked specialists build what was drawn.',
    long: 'Each trade is carried out by specialists chosen for the project and coordinated on site by our team, so what was drawn is what gets built.',
    pic: { src: '/Asset/media/hearth', widths: [400, 800, 1023], w: 1023, h: 1537, alt: 'Living room with fireplace' },
  },
  {
    no: '04', title: 'Deliver', short: 'Snagged to a boutique standard, on time.',
    long: 'Every room is snagged to a boutique standard, systems are commissioned and documented, and the space is handed over on programme.',
    pic: { src: '/Asset/media/tl-dining', widths: [400, 800, 1200, 1536], w: 1536, h: 858, alt: 'Sunlit dining room, finished and handed over' },
  },
]

export const principles = [
  { no: '01', title: 'Resolved before it is built.', body: 'BIM models, MEP routing, joinery details and material palettes are settled together — so nothing is discovered late on site.' },
  { no: '02', title: 'One integrated team.', body: 'Design, engineering and execution coordinated under one roof, from brief to handover. On programme, within budget, with no hand-offs between design and delivery.' },
  { no: '03', title: 'Made by trusted hands.', body: 'Specialist joiners, engineers and finishers chosen for each job, briefed directly and held to one boutique standard of finish.' },
]
