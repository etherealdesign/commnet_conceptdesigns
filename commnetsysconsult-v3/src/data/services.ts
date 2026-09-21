// Axis A — Systems ("what we install"). Five leaf disciplines, no overlap.
// Source: CONTENT-REVAMP-REVIEW.md §3.2 / §6.2. Copy kept to evidence that
// exists in the project register — no invented capabilities.

export interface ServiceItem {
  slug: string
  title: string
  summary: string
  evidence: string
  icon: 'cable' | 'network' | 'shield' | 'monitor-play' | 'server-cog'
}

export const services: ServiceItem[] = [
  {
    slug: 'structured-cabling',
    title: 'Structured Cabling & Containment',
    summary:
      'Cat6A copper, single- and multi-mode fibre, backbone and riser, racks and patching, trays and baskets — every link tested and certified.',
    evidence: '13,000 points at Hilton Jewel of the Creek · 80 racks in 25 days for Sharjah Police',
    icon: 'cable',
  },
  {
    slug: 'networks-wifi-compute',
    title: 'Networks, Wi-Fi & Compute',
    summary:
      'Switching, routing and firewall commissioning, enterprise Wi-Fi, IP telephony, server and storage installation.',
    evidence: '8-year network SLA for the UAE Football Association · full switching, routing and firewall for a FIFA event in 15 days',
    icon: 'network',
  },
  {
    slug: 'security-systems',
    title: 'Security Systems',
    summary:
      'IP CCTV designed to SIRA (Dubai) and ADMCC (Abu Dhabi) requirements, biometric access control, gate barriers, authority submission and handover.',
    evidence: '2,500 cameras at one hotel · ADMCC-specification cameras inside Abu Dhabi Airport · multi-branch access control for Samba Bank',
    icon: 'shield',
  },
  {
    slug: 'av-guest-technology',
    title: 'AV & Guest Technology',
    summary:
      'Guest Room Management Systems, IPTV/SMATV head-ends, PA and background music, video walls and control-room displays.',
    evidence: '820 GRMS rooms at Atlantis The Royal · 800 rooms of IPTV/SMATV at Occidental Al Jadaf',
    icon: 'monitor-play',
  },
  {
    slug: 'critical-power-cooling',
    title: 'Critical Power & Cooling',
    summary:
      'UPS and power distribution, generators, precision cooling, environmental monitoring, FM200 suppression, raised floors.',
    evidence: 'Delivered inside every data-centre package · UPS AMC for DAS Holding headquarters',
    icon: 'server-cog',
  },
]
