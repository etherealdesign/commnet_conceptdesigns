// Every value here traces to Data/commnet_data.json via the content-revamp
// review (§4 Numbers register). Only numbers marked "safe to publish" are
// used. Do NOT add AED contract values or "approved/certified" language
// here without written client confirmation — see CONTENT-REVAMP-REVIEW.md §7.

export interface TrustMetric {
  value: string
  label: string
}

export const trustMetrics: TrustMetric[] = [
  { value: '15,500+', label: 'Cabling points certified' },
  { value: '2,800+', label: 'Cameras commissioned' },
  { value: '820', label: 'GRMS rooms delivered' },
  { value: '8-Year', label: 'Managed SLA in service' },
]

export const proofStrip: TrustMetric[] = [
  { value: '18', label: 'Documented contracts' },
  { value: '15,500+', label: 'Cabling points' },
  { value: '2,800+', label: 'Cameras commissioned' },
  { value: '820', label: 'GRMS rooms' },
  { value: '386', label: 'Modular containers' },
  { value: '8-yr', label: 'Longest SLA' },
]
