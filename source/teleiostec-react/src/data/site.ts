export const SITE_URL = 'https://www.teleiostec.com'

/** The founding year is written once; every "years of practice" figure derives from it. */
export const FOUNDED = 2012
export const yearsOfPractice = () => new Date().getFullYear() - FOUNDED

export const contact = {
  email: 'sales@teleiostec.com',
  phone: '+971 4 295 5299',
  phoneHref: 'tel:+97142955299',
  address: ['Office 301, Centurion Star Tower A', 'Port Saeed, Dubai, U.A.E.'],
  mapHref: 'https://www.google.com/maps/search/?api=1&query=Centurion+Star+Tower+A+Port+Saeed+Dubai',
  coords: '25.2582° N, 55.3312° E',
}

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/teleiostec/' },
  { label: 'Instagram', href: 'https://www.instagram.com/teleiostec.ae/' },
  { label: 'Facebook', href: 'https://www.facebook.com/teleiostec/' },
]

/** Primary navigation — every entry is its own page. `img` is the menu-overlay preview. */
export const nav = [
  { to: '/projects', label: 'Projects', img: '/Asset/media/great-room-800' },
  { to: '/studio', label: 'Studio', img: '/Asset/photos/craftsman-working-on-walnut-cabinet-800' },
  { to: '/services', label: 'Services', img: '/Asset/media/joinery-800' },
  { to: '/process', label: 'Process', img: '/Asset/media/kitchen-house-800' },
  { to: '/team', label: 'Team', img: '/Asset/photos/curved-walnut-and-limestone-inte-800' },
  { to: '/contact', label: 'Contact', img: '/Asset/media/hearth-800' },
] as const

export const stats = [
  { value: yearsOfPractice(), suffix: '', label: 'Years of practice' },
  { value: 240, suffix: '', label: 'Spaces delivered' },
  { value: 98, suffix: '%', label: 'On-time handover' },
  { value: 0, suffix: '', text: 'ISO', label: 'Certified processes' },
]
