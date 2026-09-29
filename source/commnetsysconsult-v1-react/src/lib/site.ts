export const SITE = {
  name: 'Commnet Systems Consultancy',
  legalName: 'Commnet Systems Consultancy LLC',
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://commnetsysconsult.com',
  description:
    'Turnkey ELV and ICT systems integrator. Structured cabling, networks, security systems, AV and critical power, designed by one engineering team and delivered across Dubai, Abu Dhabi and Sharjah.',
  phone: '+971 4 295 5299',
  phoneHref: 'tel:+97142955299',
  email: 'info@commnetsysconsult.com',
  ogImage: '/images/dubai-skyline.jpg',
} as const

/** Per-project AED values are the prime's commercial information on 8 of 18
 *  contracts (CONTENT-REVAMP-REVIEW.md §7.7, §8.3). Off until the client approves. */
export const SHOW_CONTRACT_VALUES = import.meta.env.VITE_SHOW_CONTRACT_VALUES === 'true'

export const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || ''

export const absUrl = (path: string) => {
  const p = path.replace(/^\.\//, '')
  return `${SITE.url}${p.startsWith('/') ? p : `/${p}`}`
}
