// Source: CONTENT-REVAMP-REVIEW.md §6.7 and §9. Do not print a licence or
// registration number here until the client confirms one (§9 Q1-3), an
// honest "pending confirmation" beats an unverified claim in a regulated
// industry.

export interface CredentialItem {
  name: string
  detail: string
}

/**
 * NOT RENDERED on the public site, and deliberately so. §6.7: print the
 * licence number or do not list the credential. Publishing a "pending
 * confirmation" badge tells a tender evaluator that the company does not know
 * its own licence status, which is worse than saying nothing.
 *
 * These three are the open client questions (§9 Q1-Q3). When an answer comes
 * back, put it in `claims.ts`, the compliance wall reads from there and will
 * start rendering the credential with its number automatically.
 */
export const pendingCredentials: CredentialItem[] = [
  { name: 'SIRA', detail: 'Licence category & number, pending client confirmation' },
  { name: 'ADMCC', detail: 'Registration number, pending client confirmation' },
  { name: 'ISO 9001 / 27001', detail: 'Certificate number, pending client confirmation' },
]

export const recognition = [
  { name: 'Certificate of Service Performance', detail: 'Huawei Data Centre Facility, 2024/25' },
  { name: 'FIFA Beach Soccer World Cup UAE 2024', detail: '15-day delivery for UAE FA / Dubai Police' },
]

export const regulatorExplainers = [
  {
    name: 'SIRA',
    body: "The Security Industry Regulatory Agency, Dubai. Licenses companies that install and maintain security systems in the emirate and sets the technical guidelines CCTV must meet.",
    href: 'https://www.sira.gov.ae/',
  },
  {
    name: 'ADMCC',
    body: 'The Abu Dhabi Monitoring & Control Centre, under the Supreme Council for National Security since 2019. It qualifies and licenses companies working in monitoring and control, and sets CCTV technical requirements for Abu Dhabi.',
    href: 'https://mcc.gov.ae/',
  },
]
