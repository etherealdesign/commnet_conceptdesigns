// Source: CONTENT-REVAMP-REVIEW.md §6.9. FAQPage schema uses this list verbatim.
export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'Do you work as a subcontractor to main contractors and system integrators?',
    answer:
      'Yes. Eight of our eighteen documented contracts were delivered under primes including GBM, Teksalah and Gerab. We hand over the same test documentation either way.',
  },
  {
    question: 'Are your CCTV installations SIRA / ADMCC compliant?',
    answer:
      'Systems are designed to the current SIRA (Dubai) and ADMCC (Abu Dhabi) technical requirements and submitted for approval before handover.',
  },
  {
    question: 'What is the smallest and largest job you take?',
    answer:
      'Register range: a 6-day airport CCTV installation to a three-year, 13,000-point hotel programme.',
  },
  {
    question: 'Can you deliver on a fixed date?',
    answer:
      'FIFA Beach Soccer World Cup 2024: cabling, CCTV, network, Wi-Fi and IPTV delivered in 15 days.',
  },
  {
    question: 'Do you do the engineering in-house?',
    answer:
      'Design and detailed engineering are done by our Chennai engineering centre; commercial, field and commissioning teams are in Dubai.',
  },
  {
    question: 'Do you offer AMC or SLA after handover?',
    answer:
      'Yes, the longest in service is an eight-year network SLA for the UAE Football Association.',
  },
  {
    question: 'Which emirates do you cover?',
    answer: 'Dubai, Abu Dhabi and Sharjah, from the Dubai head office.',
  },
  {
    question: 'What do you need from us to quote?',
    answer:
      'Drawings or a BoQ, site access for a survey, and the authority (SIRA/ADMCC) status of the premises.',
  },
]
