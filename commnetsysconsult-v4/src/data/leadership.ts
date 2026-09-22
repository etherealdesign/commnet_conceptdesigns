/**
 * Leadership, recovered from v1.html. The rebuilds dropped this section
 * entirely; a prequalification-grade site needs named people, and the content
 * review (§9) separately asks for a named engineer on the CTA.
 *
 * One edit from the v1 copy: the CEO bio claimed "strategic Tier-1 vendor
 * partnerships". Review §7.10 flags that as unevidenced ("Which vendors, and is
 * there a partner certificate?"). Huawei issued a service performance
 * certificate, which is not a partnership. The claim is out until the client
 * names the vendors and supplies certificates.
 */

export interface Leader {
  name: string
  initials: string
  role: string
  bio: string
}

export const leadership: Leader[] = [
  {
    name: 'Karthikeyan Narayanasamy',
    initials: 'KN',
    role: 'Chief Executive Officer',
    bio: 'Executive leadership and the commercial relationships behind the register, from a two-person cabling consultancy to a regional systems integrator.',
  },
  {
    name: 'Gopi',
    initials: 'GC',
    role: 'Project Director',
    bio: 'Turnkey ELV engineering execution, field operations and project delivery across hospitality, government and corporate sites.',
  },
  {
    name: 'Askar Basha M N',
    initials: 'AB',
    role: 'Business Development Manager',
    bio: 'Enterprise client acquisition, commercial tenders and partnership development.',
  },
  {
    name: 'Swathi Dumpala',
    initials: 'SD',
    role: 'Finance Manager',
    bio: 'Financial operations, contracts and accounting for multi-year SLA programmes.',
  },
]
