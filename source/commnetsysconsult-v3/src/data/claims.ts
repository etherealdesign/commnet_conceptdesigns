/**
 * CLAIMS GATE, CONTENT-REVAMP-REVIEW.md §7 (red team) and §9 (client questions).
 *
 * Every regulatory or factual claim the review flagged as a risk is gated here.
 * While a value is `null`, the site renders the SAFE wording automatically:
 * "designed to SIRA & ADMCC specification" rather than "approved", no printed
 * licence numbers, no response-time promise, no AED contract values.
 *
 * Fill a value in only once the client supplies written confirmation. Do not
 * bypass this file by hard-coding "approved", "certified", "licensed" or a
 * Tier-N claim anywhere in a component.
 */

export interface Credential {
  /** Regulator or standards body */
  authority: string
  /** Licence / registration / certificate number, exactly as issued */
  number: string
  /** Licence category or scope of certification */
  category: string
  since?: string
}

export const claims = {
  /** §7.1, SIRA licenses the COMPANY. Until a number exists we do not claim one. */
  siraLicence: null as Credential | null,
  /** §7.1, ADMCC registration number. */
  admccRegistration: null as Credential | null,
  /** §9 Q3, ISO certificate numbers, or none. */
  iso9001: null as Credential | null,
  iso27001: null as Credential | null,

  /** §7.4, trade licence issue year. Until confirmed, About says "the early 2000s". */
  tradeLicenceYear: null as string | null,

  /** §7.3, is Jotun's "800" a camera count? If true the headline becomes 3,600+. */
  jotunEightHundredIsCameras: false,

  /** §8.3, publish an aggregate AED contract value on public pages? Default: no. */
  publishContractValue: false,

  /** §7.12, only promise a response window if the client commits AND the form is live. */
  responseTimePromise: null as string | null,

  /** §6.10, named engineer for the CTA. */
  namedEngineer: null as { name: string; role: string } | null,

  /** §9 Q8, offices beyond Dubai and Chennai, with addresses. */
  additionalOffices: [] as { city: string; country: string; address: string }[],
} as const

/** Regulator wording that is true today (§6.1 / §7.1). */
export const regulatorPhrase =
  claims.siraLicence && claims.admccRegistration
    ? 'SIRA-licensed · ADMCC-registered'
    : 'Designed to SIRA & ADMCC specification'

export const heldCredentials = [
  claims.siraLicence,
  claims.admccRegistration,
  claims.iso9001,
  claims.iso27001,
].filter(Boolean) as Credential[]
