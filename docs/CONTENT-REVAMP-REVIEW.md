# commnetsysconsult.com — Content Revamp: Due Diligence, Taxonomy Fix, Red Team

Prepared 2026-09-21. Scope: the landing-page and multi-page content for
`commnetsysconsult-com/` (V1 and V2), benchmarked against the direct competitor
page `emirtech.ae/admcc-approved-cctv-installation-services.html`.

This is a working document for Suresh and the client. It contains no prices for
the engagement. Every number in it traces to `Data/commnet_data.json` (the
extraction from the live site's own bundle) unless marked otherwise.

---

## 0. Read this first — the five things that matter

1. **The service taxonomy on V1/V2 is structurally wrong**, not just badly worded.
   "Data Centers", "ICT Infrastructure", "ELV Systems", "Security", "CSOC", "AV",
   "Cyber Security" are presented as seven sibling disciplines. Three of them are
   *umbrellas* of the others. A Sharjah Police rack job fits three cards at once.
   Section 3 gives the corrected two-axis model, validated against all 18 projects.

2. **Three claims on the page are regulatory or factual risks** and must be
   confirmed with the client before any launch: "SIRA and ADMCC **approved**"
   (means the company holds a licence — do they?), "**Tier-1** data centre"
   (Uptime Tier I is the *lowest* tier), and "**Regulation-800**" (almost certainly
   "800 cameras", mis-read as a regulation name). Section 7.

3. **Emirtech's page pattern is worth copying. Its scale and audience are not.**
   Emirtech sells CCTV to villas and shops through 77 location pages. Commnet
   sells AED 300k–7M turnkey packages through primes (GBM, Teksalah, Gerab) and
   tenders. Copy the *page anatomy* (regulator explainer → what we deliver →
   process → FAQ with schema → CTA). Do not copy the doorway-page strategy. Section 2.

4. **Emirtech's regulator explanation is wrong** — it says ADMCC sits under a
   "Digital Media Company". ADMCC (Abu Dhabi Monitoring & Control Centre) sits
   under the Supreme Council for National Security. That is an opening: Commnet
   can be the site that gets the regulator right, with sources.

5. **Publishing AED contract values is a business decision, not a design one.**
   Eight of the 18 contracts are subcontracts under a prime. Their values are the
   prime's commercial information. Section 8 (devil's advocate) argues for scale
   metrics on the public site and AED values only in the PDF profile.

---

## 1. What was checked, and what was not

**Checked (confirmed, from files/pages read):**

- `Data/commnet_data.json` and `Data/Commnet_Discovery_And_Extraction_Master.md`
  — 18 projects, 7 service groups, offices, leadership, awards, legal text.
- `commnetsysconsult-com/v1.html` — full visible copy plus the JS data arrays
  (`services`, `projects`, `clients`, `industries`).
- `commnetsysconsult-com/index.html` (V2) — headings and claim scan.
- Emirtech: the ADMCC page, home, `services.html`, `elv-smart-building-abu-dhabi`,
  `enterprise-it-abu-dhabi`, `structured-cabling`, `industries-we-serve` —
  headings, JSON-LD graph, internal link map (fetched 2026-09-21).
- ADMCC's parent body and SIRA licence categories — web sources, listed in §10.

**Not checked (unknown — do not treat as verified):**

- Whether Commnet holds a SIRA licence, an ADMCC registration, ISO 9001/27001,
  or any vendor partnership certificate. Nothing in the extraction shows a
  licence number. **This is the single most important open question.**
- Whether contracts permit naming end-clients (Hilton, DEWA, Dubai Police, EY).
- Search volumes for any keyword. No SEO tool was used; keyword statements below
  are reasoning, not data.
- Emirtech's traffic, rankings or revenue. Their page count is observable; its
  effectiveness is not.

---

## 2. Competitor teardown — Emirtech ADMCC page

### 2.1 What the page actually is

| Element | Emirtech does | Note |
|---|---|---|
| Title / H1 | "ADMCC Approved CCTV Installation Services in Abu Dhabi" | One intent per page: regulator + service + city |
| Trust strip | ADMC Approved · Certified Engineers · Free Site Survey · AMC Available | Four proof chips under the hero |
| Regulator explainer | "What is ADMCC and why does your CCTV system need approval?" | Educates the buyer *before* selling. Emirtech's explanation is factually wrong (see 2.4) |
| Why us | 6 cards: certified, technicians, tailored, technology, AMC, pricing | Generic but complete |
| Compliance checklist | Table: resolution, retention, placement, remote access, VLAN, installer approval | Specific numbers (1080p, 30 days) with **no source**. ADMCC itself says specs change and must be confirmed with the Centre |
| Process | 5 steps: survey → design → ADMCC application → install → test/register | The "we submit to the regulator on your behalf" step is the real conversion point |
| Service sub-cards | Residential, Commercial, Government, Integration, AMC, Upgrades | Property-type split — right for SMB, wrong for Commnet |
| Stats | Est. 2018 · 500+ systems · 24/7 · 3 emirates | Round, unverifiable, but present |
| FAQ | 8 questions, all in `FAQPage` JSON-LD | Direct answers on cost, time, geography, cameras, AMC |
| Schema | Organization+LocalBusiness with `hasCredential` (ADMCC), WebPage, Breadcrumb, Service, FAQPage, `speakable` | Complete graph. This is the part worth copying wholesale |
| CTAs | Free quote, call, WhatsApp — repeated 4×, plus sticky mobile bar | SMB conversion machine |
| Language | Arabic mirror page (`/ar/…`) with hreflang | Commnet has none |

### 2.2 Their site architecture (observed from the link map)

- ~25 service pages, grouped in the nav as **Security & CCTV / IT & Networking /
  Telephony & Business**.
- **3 hub pages**: ELV & Smart Building, Enterprise IT, Industries.
- **5 brand pages** (Hikvision, Dahua, Axis, Samsung, UNV).
- **~50 location pages** (`cctv-installation-<area>.html`) — Abu Dhabi
  districts, Dubai districts, Al Ain.
- Support pages: about, blog, reviews, FAQ, glossary, brands, areas, request
  quotation, privacy, terms, sitemap.

Roughly 100+ URLs. The location pages are near-duplicate templates; the hub pages
are where the actual taxonomy lives.

### 2.3 How Emirtech handles the hierarchy problem Commnet has

Emirtech's ELV hub groups systems by **function**: Life Safety (fire alarm, PA/
voice evac, nurse call) → Building Automation (BMS, lighting, energy, IoT) →
Customer Experience & Access (queue, ANPR parking, visitor). Their Enterprise IT
hub groups by **layer**: Firewall & Security → Backup & DR → Servers/Virtualisation
/Cloud → Storage → Wi-Fi & Networking. Structured cabling gets its own page with
"the six subsystems" explained.

So they *do* separate umbrella (hub) from leaf (service). That is the pattern to
take. Commnet's V1 flattens umbrella and leaf into one row of seven cards.

### 2.4 Where Emirtech is weak — Commnet's openings

1. **Wrong regulator fact.** "ADMCC … operates under the Abu Dhabi Digital Media
   Company (ADMC)". Per the sources in §10, ADMCC was established 2011 under the
   Executive Council and transferred in 2019 to the **Supreme Council for
   National Security**; its site is `mcc.gov.ae`. A page that cites the regulator
   correctly, with a link, beats one that gets it wrong.
2. **Unsourced spec numbers.** 1080p / 30 days presented as ADMCC requirements
   with no citation. Do not copy these numbers. Say "confirmed against the
   current ADMCC technical requirements at design stage" and link the regulator.
3. **No project evidence at all.** Not one named site, scope quantity or
   duration. "500+ systems" is the only number. Commnet has 18 contracts with
   points, cameras, rooms, racks and durations. This is the decisive difference.
4. **No enterprise proof**: no data centres, no CSOC, no GRMS, no multi-year SLA,
   no government utility. Everything is "your property".
5. **No licence number** shown despite `hasCredential` in schema. If Commnet has
   licence numbers, print them. If not, do not use `hasCredential` (see §7).

### 2.5 Positioning — different buyers

| | Emirtech | Commnet |
|---|---|---|
| Buyer | Villa owner, shop, SME office | Main contractor, MEP/ELV consultant, prime SI (GBM), government procurement, hotel operator |
| Ticket | AED 5k–200k | AED 75k–7M (register range) |
| Trigger | "CCTV installation near me", regulator letter | Tender, prequalification, prime looking for a subcontractor who passes SIRA/ADMCC first time |
| Proof they want | Approval badge, quote speed, price | Project references with quantities, licences, vendor partners, manpower, HSE, SLA track record |
| Page that closes | Location page + WhatsApp | Project register + company profile PDF + a named engineer |

**Consequence:** Commnet's site should be *prequalification-grade*, not
*lead-gen-grade*. The Emirtech page anatomy still works, but each page must end in
evidence, not a discount.

---

## 3. Data-level validation — the taxonomy

### 3.1 The problem in V1 ("Seven disciplines")

| V1 card | What it really is | Overlap |
|---|---|---|
| Data Centers | An **environment** (a room/facility type) built from cabling + racks + power + cooling + fire suppression + security | Consumes ICT, ELV, Power |
| ICT Infrastructure | Passive cabling + active network + servers | Cabling is itself an ELV discipline |
| ELV Systems | The **umbrella term** in UAE construction for *all* low-current systems — cabling, CCTV, ACS, PA/BGM, IPTV, GRMS, AV, BMS | Contains Security, AV, and the passive half of ICT |
| Security and Surveillance | A leaf ELV discipline (CSI Division 28 equivalent) | Subset of ELV |
| CSOC | An **environment** (a specific kind of command room); Commnet's scope was physical build-out | Consumes cabling, racks, network |
| Audio Visual | A leaf ELV discipline | Subset of ELV |
| Cyber Security | The only non-ELV item; consulting/software layer | Weakest evidence (see 3.4) |

Result: the same project scope line ("Rack-to-rack UTP/FOC cabling") belongs to
Data Centers, ICT Infrastructure and ELV simultaneously. A visitor who knows the
industry sees this immediately. A tender evaluator sees a company that cannot
describe its own trade.

V1's own bullet lists prove the overlap: "UPS, generators and cooling" appears
under ELV; "UPS and power distribution" under Data Centers. "IP CCTV" under ELV;
"SIRA compliant surveillance" under Security. "PA, BGM and SMATV" under ELV; "PA
and background music" under AV.

### 3.2 The corrected model — two axes

Industry logic (UAE tender packages and CSI MasterFormat Div 27 Communications /
Div 28 Electronic Safety & Security) separates **what is installed** from
**where it is delivered as a package**.

**Axis A — Systems (what we install).** Five leaf disciplines, no overlap:

| # | System | Contains | Register evidence (of 18) |
|---|---|---|---|
| A1 | **Structured Cabling & Containment** | Cat6/6A UTP, single/multi-mode FOC, coaxial, backbone/riser, racks & patching, trays/baskets/containment, Fluke test & certification | **14** |
| A2 | **Networks, Wi-Fi & Compute** | Switching, routing, firewall commissioning, enterprise Wi-Fi, IP telephony, server & storage installation, IT peripherals | **9** |
| A3 | **Security Systems** | IP/analogue CCTV to SIRA (Dubai) and ADMCC (Abu Dhabi) specification, access control (biometric), gate barriers, CID/police integration, authority submission & handover | **8** (7 CCTV, 3 ACS) |
| A4 | **AV & Guest Technology** | GRMS, IPTV/SMATV head-ends, PA/BGM, video walls & command displays, meeting rooms, auditoria | **3** (Atlantis, Occidental, FIFA) |
| A5 | **Critical Power & Cooling** | UPS/PDU, generators, precision cooling (CCU), EMS, FM200 suppression, raised floor | **3** explicit (Aptec, Samba, DAS) + implicit in every DC |

**Axis B — Environments (where we deliver it as one package).** Six, each a
recognisable procurement package:

| # | Environment | Uses systems | Register evidence |
|---|---|---|---|
| B1 | **Data Centres & IT Rooms** — new build, refurbishment, modular/container, migration | A1 A2 A5 A3 | Sharjah Police (80 racks), EY, Aptec, DAS, Orientek (386 containers), Occidental DC, Safari DC maintenance — **7** |
| B2 | **Command, Control & Security Centres** — CSOC/NOC/CID rooms | A1 A2 A3 A4 | DEWA CSOC, FIFA police/CID surveillance — **2** |
| B3 | **Hotels & Resorts** — guest-room and back-of-house ELV | A1 A2 A3 A4 | Atlantis (820 GRMS), Hilton (13,000 pts, 2,500 cams), Occidental (800 rooms) — **3** |
| B4 | **Corporate Offices & Fit-out** | A1 A2 A3 | FTA, Aptec, DAS, Jotun, Samba, Arjan, DiveTech — **7** |
| B5 | **Events & Rapid Deployment** — temporary infrastructure | A1 A2 A3 A4 | FIFA (15 days), Orientek containers (4 months) — **2** |
| B6 | **Managed Services — AMC & SLA** | all | UAE FA (8 yr), Safari Park (2 yr), DAS UPS AMC — **3** |

Every one of the 18 projects maps to exactly one primary environment and one or
more systems (table in 3.3). Nothing is orphaned; nothing double-counts.

**Where the old labels go:**

- "ELV" → the *company descriptor* ("turnkey ELV & ICT systems integrator"), and
  the collective name for Axis A. Not a card.
- "ICT Infrastructure" → A1 + A2 together. Use the phrase in prose; not a card.
- "Data Centers" → B1.
- "CSOC" → B2, renamed so it does not claim a cyber practice.
- "Cyber Security" → see 3.4.

### 3.3 Project-to-taxonomy map (validation)

| # | Project | Primary env. | Systems | Quantities usable on the page |
|---|---|---|---|---|
| 1 | Hilton Jewel of the Creek | B3 | A1 A3 | 13,000 cabling points · 2,500 cameras · 3 yrs |
| 2 | DEWA CSOC | B2 | A1 A2 A3 | racks, panel cabling, device T&C · 1 yr |
| 3 | Atlantis The Royal | B3 | A1 A4 | 820 GRMS rooms · AV-BGM · 14 mo |
| 4 | Occidental Al Jadaf | B3 | A1 A2 A3 A4 A5 | 2,500 points · 315 cams · 15 ACS doors · 800 rooms IPTV · 21 mo |
| 5 | FIFA Beach Soccer WC 2024 | B5 | A1 A2 A3 A4 | 15-day deployment · CID/Police CCTV · firewall |
| 6 | Aptec | B1 | A1 A3 A5 | raised floor, EMS, FM200, CCU, UPS · 1 mo |
| 7 | Jotun | B4 | A1 A2 A3 | SIRA-spec CCTV (800 — see §7.3) · ACS · 14 mo |
| 8 | UAE FA | B6 | A2 | servers, storage, Wi-Fi · 8-yr SLA (2017–2024) |
| 9 | Samba Bank | B4 | A1 A3 A5 | multi-branch ACS Dubai+AUH · UPS · 14 days |
| 10 | Sharjah Police DC | B1 | A1 A2 | 80 racks · containment · migration · 25 days |
| 11 | Dubai Safari Park | B6 | A1 A2 | Wi-Fi · cabling · DC maintenance · 2022–24 |
| 12 | EY | B1 | A1 A5 | refurbishment · 1 mo |
| 13 | Orientek containers | B1 / B5 | A1 A5 | 120 + 266 = 386 containers, 2 sites · 4 mo |
| 14 | DAS Holding | B1 | A1 A5 | IT room · UPS AMC · 20 days |
| 15 | DiveTech / AUH Ports | B4 | A1 | cabling · 45 days |
| 16 | Arjan Residency | B4 (residential) | A1 | cabling · 5 mo |
| 17 | Modern Baggage / AUH Airport | B4 | A3 | ADMCC-spec CCTV · 6 days |
| 18 | FTA Levels 13 & 17 | B4 | A1 A2 A3 | cabling · CCTV · network · Wi-Fi · 3 mo |

Observations from the map:

- **Cabling is the spine** — 14 of 18. The site currently buries it inside "ICT
  Infrastructure". It should be the first system card.
- **Security appears in 8**, always *inside* a larger package. Commnet is not a
  CCTV shop; it is an integrator whose packages include compliant CCTV. Position
  accordingly — the opposite of Emirtech.
- **AV/GRMS has 3 projects but the best story** (Atlantis 820 rooms). Keep it as
  a card; do not inflate it with "auditoriums, innovation centres, theatres"
  unless a project exists.
- **CSOC evidence is exactly one project** (DEWA). UAE FA carries "CSOC" in its
  title only — its scope lines are servers, network, Wi-Fi, storage, SLA.

### 3.4 Cyber Security — demote or drop

Evidence in the register for "Cyber Security": one line — "Network – Switching,
Routing and **Firewall**" at FIFA. Evidence for "ISO/IEC 27001 gap analysis and
auditing": **none**. Evidence Commnet itself is ISO 27001 certified: none stated.

Keeping a "Cyber Security" card with "attack surface management, ISO 27001
auditing, endpoint defense" invites the one question Commnet cannot answer with a
reference. Recommendation:

- Move "firewall and gateway commissioning" into A2 (where it is true).
- If the client insists on ISO 27001 advisory, label it honestly as an advisory
  offering in the About/Services prose, not as a discipline card, and only if a
  named person holds a relevant credential (Lead Auditor / Implementer).
- Do not use the word "auditing" unless they are an accredited certification
  body. "Gap analysis and readiness" is the correct term for what a consultancy
  can do.

---

## 4. Numbers register — every stat, traced

Computed from the 18 projects in `Data/commnet_data.json`. Values use Indian
digit grouping in the source ("AED 15,17,820" = 1,517,820).

| Stat | Value | Derivation | Safe to publish? |
|---|---|---|---|
| Documented contracts | 18 | count | Yes |
| Total contract value | AED 26,223,439 | sum of 18, Safari counted as one year | As "AED 26M+" — **but see §8.3 on whether to publish AED at all** |
| Structured cabling points | 15,500+ | Hilton 13,000 + Occidental 2,500; 12 other cabling projects unquantified | Yes, "15,500+" |
| CCTV cameras | 2,815 confirmed | Hilton 2,500 + Occidental 315. Jotun "800" unconfirmed (§7.3) | "2,800+" now; "3,600+" only if Jotun's 800 is cameras |
| GRMS rooms | 820 | Atlantis | Yes |
| IPTV/SMATV rooms | 800 | Occidental | Yes |
| Access-control doors | 15 + Samba branches (count unknown) | Occidental 15; Samba unquantified | Use "multi-branch", not a number |
| Racks installed | 80 in one project | Sharjah Police | Yes, as a project fact |
| Modular data containers | 386 across 2 sites | Orientek 120 + 266 | Yes. **Do not headline "175 MW"** (§7.6) |
| Longest SLA | 8 years | UAE FA 2017–2024 | Yes |
| Fastest deployment | 15 days | FIFA | Yes |
| Emirates worked in | 3 | Dubai, Abu Dhabi, Sharjah | Yes |
| Regulators designed to | 2 | SIRA, ADMCC | "Designed to" — yes. "Approved by" — only with licence (§7.1) |
| Years in operation | 25+ | "early 2000s" in source | "Since the early 2000s" is honest; "Founded 2000" is not (§7.4) |

V1/V2 stats to remove: "200% consistent growth" (no denominator, no period),
"AED 0 M+ infrastructure delivered" placeholder that counts up (fine as a widget
if the target is 26, not a rounded-up fantasy).

---

## 5. Proposed site architecture (Emirtech pattern, enterprise scale)

~35 URLs. Static HTML fits the current repo; each page is one template.

```
/                                  Home (landing — copy in §6)
/services/                         Hub: the five systems (Axis A)
  /services/structured-cabling
  /services/networks-wifi-compute
  /services/security-systems
    /services/sira-cctv-dubai          ← only if SIRA licence confirmed
    /services/admcc-cctv-abu-dhabi     ← only if ADMCC registration confirmed
  /services/av-guest-technology
  /services/critical-power-cooling
/solutions/                        Hub: the six environments (Axis B)
  /solutions/data-centres-it-rooms
  /solutions/command-security-centres
  /solutions/hotels-resorts
  /solutions/corporate-fit-out
  /solutions/events-rapid-deployment
  /solutions/amc-sla
/projects/                         Register: 18 cards, filter by system/environment/emirate
  /projects/<slug>  ×18            One page each — scope, quantities, duration, client-of-record
/sectors/                          Only proven sectors (§6.5) — 6 short pages or one page with anchors
/compliance/                       SIRA · ADMCC · ISO — licence numbers, regulator links, what each covers
/about/                            Story (honest dates), offices, leadership
/contact/                          Form (connected), phone, map, "send us the BoQ"
/company-profile.pdf               The prequalification document — the real conversion asset
```

**Page anatomy (every service/solution page):**

1. H1 = system/environment + geography ("Structured Cabling Contractor — Dubai & Abu Dhabi")
2. 60-word definition/regulator explainer, sourced
3. "What we deliver" — 4–6 cards
4. Evidence — project cards filtered to this page (from the register), with quantities
5. Process — 5 steps, ending in handover/authority approval
6. FAQ — 5–8 questions, `FAQPage` schema
7. CTA — "Send the BoQ" + phone + engineer's name

**Schema per page:** `Organization` (once, site-wide) + `WebPage` + `BreadcrumbList`
+ `Service` (service pages) or `Project`-style `CreativeWork`/`Article` (project
pages) + `FAQPage`. Add `hasCredential` **only** with a real licence number.

**What not to build:** location pages ("structured cabling Business Bay"), brand
pages, blog until there is a writer, Arabic until there is a translator who knows
ELV terminology. Each of these is a maintenance liability that Emirtech carries
because its buyer searches that way. Commnet's does not.

---

## 6. Landing page content — ready to use

Written to the corrected taxonomy. Every quantity comes from §4. Bracketed items
`[…]` are placeholders that need client confirmation.

### 6.1 Hero

**Eyebrow:** Turnkey ELV & ICT Systems Integrator · Dubai HQ · Chennai Engineering

**H1:** Mission-critical infrastructure, delivered as one package.

**Sub:** Structured cabling, networks, security systems, AV and critical power —
designed, installed, certified and supported by one engineering team. 18
documented contracts across data centres, hotels, government and command centres
in the UAE.

**CTAs:** See the project register · Send us your BoQ

**Trust strip (four chips):** 15,500+ certified cabling points · 2,800+ cameras
commissioned · 8-year SLA in service · Designed to SIRA & ADMCC specification

> Swap the last chip to "SIRA-licensed · ADMCC-registered" with numbers if the
> client confirms licences. Otherwise leave as "designed to specification".

### 6.2 Systems — "What we install" (five cards)

**Structured Cabling & Containment**
Cat6A copper, single- and multi-mode fibre, backbone and riser, racks and
patching, trays and baskets. Every link Fluke-tested and certified. 13,000 points
at Hilton Jewel of the Creek; 80 racks in 25 days for Sharjah Police.

**Networks, Wi-Fi & Compute**
Switching, routing and firewall commissioning, enterprise Wi-Fi, IP telephony,
server and storage installation. Eight years of network SLA for the UAE Football
Association; full switching, routing and firewall for a FIFA event in 15 days.

**Security Systems**
IP CCTV designed to SIRA (Dubai) and ADMCC (Abu Dhabi) requirements, biometric
access control, gate barriers, police and CID integration, authority submission
and handover. 2,500 cameras at one hotel; ADMCC-specification cameras inside Abu
Dhabi Airport; multi-branch access control for Samba Bank.

**AV & Guest Technology**
Guest Room Management Systems, IPTV/SMATV head-ends, PA and background music,
video walls and control-room displays. 820 GRMS rooms at Atlantis The Royal; 800
rooms of IPTV/SMATV at Occidental Al Jadaf.

**Critical Power & Cooling**
UPS and power distribution, generators, precision cooling, environmental
monitoring, FM200 suppression, raised floors. Delivered inside every data-centre
package; UPS AMC for DAS Holding headquarters.

### 6.3 Environments — "Where we deliver it" (six cards)

**Data Centres & IT Rooms** — New builds, refurbishments, modular containers and
migrations. Sharjah Police, EY, Aptec, DAS Holding, 386 modular containers for
Orientek across two Abu Dhabi sites.

**Command, Control & Security Centres** — Rack, cabling and device build-out for
CSOC, NOC and CID rooms, tested and commissioned to utility standard. DEWA's
Cyber Security Operations Centre; police surveillance for FIFA Beach Soccer 2024.

**Hotels & Resorts** — Guest-room and back-of-house ELV as one contract: cabling,
CCTV, GRMS, IPTV, Wi-Fi, PA. Atlantis The Royal, Hilton Jewel of the Creek,
Occidental Al Jadaf.

**Corporate Offices & Fit-out** — Cabling, network, Wi-Fi and security for
office floors, branches and industrial sites. FTA levels 13 & 17, Jotun, Samba
Bank, Aptec.

**Events & Rapid Deployment** — Temporary infrastructure on a fixed date. FIFA
Beach Soccer World Cup UAE 2024: cabling, CCTV, network, Wi-Fi and IPTV in 15 days.

**AMC & Multi-year SLA** — Preventive maintenance, fault response and managed
network contracts. UAE FA since 2017; Dubai Safari Park; DAS Holding UPS.

### 6.4 Proof strip — "Numbers from the register"

18 contracts · AED [26M+ — publish only if approved, §8.3] · 15,500+ cabling
points · 2,800+ cameras · 820 GRMS rooms · 386 modular containers · 8-year SLA ·
15-day fastest delivery

### 6.5 Sectors — only where a project exists

| Sector | Evidence | Keep? |
|---|---|---|
| Government & Public Sector | DEWA, Sharjah Police, FTA, Dubai Police (FIFA) | Yes |
| Hospitality | Atlantis, Hilton, Occidental | Yes |
| Corporate & Professional Services | EY, Aptec, DAS, Samba | Yes |
| Industrial & Manufacturing | Jotun | Yes (one project — say so) |
| Sports & Events | UAE FA, FIFA | Yes |
| Banking | Samba | Fold into Corporate, or keep with one project |
| Aviation | Modern Baggage, AUH Airport — 6 days, CCTV only | Mention inside Security; not a sector card |
| Healthcare | none | **Remove** — V1 says "Intelligent video" with no project |
| Education | none | **Remove** |
| Smart Cities | Masdar City project is mining containers, not smart-city work | **Remove** |

### 6.6 Process (six steps — keep V1's, tighten the claims)

1. **Survey & regulatory mapping** — site survey, requirement capture, SIRA/ADMCC
   applicability check.
2. **Design & BoQ** — architecture, drawings and bill of quantities reviewed with
   the consultant.
3. **Engineering** — detailed design from the Chennai centre: racks, containment,
   power, network.
4. **Installation** — certified field teams install, terminate and label to
   standard.
5. **Test, certify, approve** — link certification, commissioning, authority
   submission and approval. `[Fluke — confirm they own/issue reports]`
6. **Support** — AMC and multi-year SLA; the longest in service is eight years.

### 6.7 Compliance block (replaces "Awards and certifications")

Separate **credentials** from **awards**. They are not the same thing and V1
mixes them.

**Credentials** — print licence/registration numbers or do not list:
- SIRA — `[licence category + number, or remove]`
- ADMCC — `[registration number, or remove]`
- ISO 9001 / 27001 — `[certificate number, or remove]`
- Trade licence activity: "Installation & Maintenance of Security Systems" `[confirm]`

**Recognition:**
- Certificate of Service Performance — Huawei Data Centre Facility, 2024/25
- FIFA Beach Soccer World Cup UAE 2024 — 15-day delivery for UAE FA / Dubai Police

### 6.8 Regulator explainer (for the Security page and Compliance page)

Short, sourced, and correct where Emirtech is wrong:

> **SIRA** — the Security Industry Regulatory Agency, Dubai. Licenses companies
> that install and maintain security systems in the emirate and sets the
> technical guidelines CCTV must meet. Systems in licensed premises are designed,
> submitted and handed over under SIRA's rules.
>
> **ADMCC** — the Abu Dhabi Monitoring & Control Centre, established 2011 and
> since 2019 under the Supreme Council for National Security. It qualifies and
> licenses companies working in monitoring and control, and sets the technical
> requirements for CCTV in Abu Dhabi. Requirements are set by the Centre and
> change; Commnet confirms them at design stage rather than quoting fixed numbers.

Link both to the regulator (sira.gov.ae, mcc.gov.ae), not to a blog.

### 6.9 FAQ (for `FAQPage` schema — home and Security page)

1. Do you work as a subcontractor to main contractors and system integrators?
   — Yes. Eight of our eighteen documented contracts were delivered under primes
   including GBM, Teksalah and Gerab. We hand over the same test documentation
   either way.
2. Are your CCTV installations SIRA / ADMCC compliant? — Systems are designed to
   the current SIRA (Dubai) and ADMCC (Abu Dhabi) technical requirements and
   submitted for approval before handover. `[Add licence statement if held.]`
3. What is the smallest and largest job you take? — Register range: a 6-day
   airport CCTV installation to a three-year, 13,000-point hotel.
4. Can you deliver on a fixed date? — FIFA Beach Soccer World Cup 2024: cabling,
   CCTV, network, Wi-Fi and IPTV in 15 days.
5. Do you do the engineering in-house? — Design and detailed engineering are
   done by our Chennai engineering centre; commercial, field and commissioning
   teams are in Dubai.
6. Do you offer AMC or SLA after handover? — Yes; the longest in service is an
   eight-year network SLA for the UAE Football Association.
7. Which emirates do you cover? — Dubai, Abu Dhabi and Sharjah, from the Dubai
   head office.
8. What do you need from us to quote? — Drawings or a BoQ, site access for a
   survey, and the authority (SIRA/ADMCC) status of the premises.

### 6.10 CTA

**H2:** Send us the drawings. An engineer replies.
**Sub:** Scope, BoQ or a site address — `[name]`, `[role]`, reads every enquiry.
`+971 4 295 5299 · info@commnetsysconsult.com`

> Only promise "within one business day" if the client commits to it and the
> form is connected (`CX_FORM_ENDPOINT` — see `SITES.md`).

---

## 7. Red team — claims that can hurt

Ordered by severity. Each has: the claim as it appears, why it is dangerous,
what to say instead, and what the client must confirm.

### 7.1 "SIRA and ADMCC Compliance — Approved surveillance and access control delivery under both emirates' security regulators" (V1 awards block); "SIRA/ADMCC-certified" (source master doc)

- **Risk:** "Approved", "certified" and "licensed" mean the *company* holds a
  regulator licence. SIRA licenses companies by category (security systems
  installation & maintenance, consultancy); ADMCC "qualifies and licenses the
  companies that work in the monitoring and control field". If Commnet holds
  neither — e.g. it installed under GBM's licence — a public claim of approval is
  a false regulatory statement in a regulated industry. Regulators, primes and
  competitors check the register.
- **Say instead (until confirmed):** "Designed and delivered to SIRA and ADMCC
  specification." That is true of the Jotun, Airport and hotel projects.
- **Client must confirm:** licence category and number for SIRA; ADMCC
  registration number; which projects were under Commnet's own licence.

### 7.2 "Tier-1 data centre" (V1 service card, V2 hero stat, EY project)

- **Risk:** In the Uptime Institute classification, **Tier I is the lowest** —
  basic capacity, no redundancy. To a data-centre buyer or consultant, "Tier-1
  builds" as a headline capability reads as "we do the simplest kind". Uptime
  tier certification is also a formal, paid process; claiming any tier without a
  certificate is a misuse of the term.
- **Say instead:** "Enterprise data centres and IT rooms" and, for EY, "corporate
  data-centre refurbishment". Drop "Tier" everywhere unless a certificate exists.
- **Client must confirm:** what "Tier-1" meant in the EY scope — Uptime tier,
  or "tier-1 client"?

### 7.3 "Regulation-800 CCTV at Jotun" (V1 Security card)

- **Risk:** The source line is "CCTV System as per SIRA Regulation-800". V1 reads
  it as a regulation named "800". No such SIRA regulation is known; the far more
  likely reading is *800 cameras, to SIRA regulation*. The page currently cites
  a regulation that does not exist.
- **Say instead:** "SIRA-specification CCTV at Jotun" until the number is
  confirmed; then "800 cameras" if that is what it is.
- **Client must confirm:** camera count at Jotun.

### 7.4 Timeline dates: "2000 Foundation · 2010 Enterprise Expansion · 2017 CSOC Division · 2024 FIFA"

- **Risk:** The source says "started in the early 2000s". 2000 and 2010 are
  invented precision. "2017 — launched the cyber security operations practice"
  is inferred from the UAE FA contract start; nothing in the source says a
  division was launched. Precise wrong dates are worse than honest vague ones —
  a trade-licence issue date will contradict them.
- **Say instead:** "Founded in Dubai in the early 2000s as a two-person cabling
  consultancy" and date only the milestones with evidence (UAE FA 2017, FIFA
  2024, Huawei 2024/25).
- **Client must confirm:** trade licence issue year.

### 7.5 "CSOC" as a *cyber security operations practice*; "Cyber Security" discipline with "ISO/IEC 27001 auditing"

- **Risk:** Commnet's DEWA scope is racks, panel cabling, device installation,
  testing and commissioning — physical build-out, and genuinely valuable. Calling
  it a cyber security practice invites RFP questions (SOC analysts, SIEM,
  incident response, ISO 27001 lead auditors) it cannot answer. "Auditing" against
  ISO 27001 is a certification-body activity.
- **Say instead:** "Command, control and security-centre build-out"; "firewall and
  gateway commissioning" under Networks; "ISO 27001 readiness" only if a named
  person holds a credential.
- **Client must confirm:** any cyber project beyond FIFA's firewall; any ISO
  27001 credential held by staff.

### 7.6 "175 MW" (V2 hero stat; V1 Data Centers card)

- **Risk:** The 175 MW is the *site's* power capacity for a crypto-mining
  container deployment; Commnet's scope was the containers' infrastructure, not
  175 MW of power. Headlining it implies power-plant scale. Separately, some
  government and banking buyers view crypto-mining references negatively.
- **Say instead:** "386 modular data containers across two Abu Dhabi sites in
  four months." Mention MW only inside the project page as site context.

### 7.7 Naming end-clients and publishing subcontract values

- **Risk:** Eight contracts were with primes (GBM ×3, Teksalah, Gerab, Al Seeb,
  Top Rock, Modern Baggage, Winner Holistics, Alemco). The end-client name
  (Hilton, DEWA, EY, Dubai Police) and the contract value belong to the prime's
  relationship and may be under NDA. DEWA CSOC and Dubai Police/CID surveillance
  are also security-sensitive sites — publishing "we built DEWA's CSOC racks"
  could concern the end-client regardless of NDA.
- **Say instead:** show the prime as client-of-record ("for GBM"), name the
  end-client only with written permission, and keep AED values off public pages
  (see §8.3).
- **Client must confirm:** per project, permission to name the end-client and to
  publish value.

### 7.8 "Trusted by government, hospitality and enterprise clients" + client name strip

- Same issue as 7.7: a name strip implies a direct relationship. Where GBM was
  the client, GBM belongs in the strip, not Hilton. Ask which names may be shown.

### 7.9 "7 offices across the region" (live site) vs two offices (builds)

- Already logged in `SITES.md`. One of them is wrong. If there are seven, list
  them with addresses; if two, correct the live site's About page at the same time
  as the revamp so the two do not contradict each other during transition.

### 7.10 "Tier-1 vendor partnerships" (CEO bio)

- Which vendors, and is there a partner certificate? Huawei issued a service
  performance certificate; that is not a partnership. Remove or name the vendors
  with proof.

### 7.11 Sectors with no evidence: Healthcare, Education, Smart Cities

- Each is one question away from "show me the project". Remove (§6.5).

### 7.12 "An engineer, not a sales bot, replies within one business day"

- A service-level promise, currently backed by a form that opens a mail client.
  Keep only if the client commits and the form is connected.

### 7.13 Emirtech's compliance checklist numbers

- Do not copy "1080p minimum / 30 days retention" as ADMCC requirements. The
  regulator's own guidance is that specifications are set by the Centre and
  change. Quoting a competitor's unsourced number as a regulation is how a page
  ends up wrong in a way a reviewer can prove.

---

## 8. Devil's advocate — against the plan itself

### 8.1 "Just copy Emirtech — it clearly works for them"

Emirtech's model is 50 location pages × "CCTV installation" because villa owners
search "CCTV installation Khalifa City". That is a real intent with real volume.
Nobody searches "structured cabling contractor Port Saeed". Commnet's search
demand, where it exists, is a short list: *SIRA approved CCTV company Dubai*,
*ADMCC approved CCTV Abu Dhabi*, *ELV contractor Dubai*, *structured cabling
contractor UAE*, *data centre contractor UAE*, *GRMS installation Dubai*. Eight to
twelve pages capture it; a hundred dilute it and cost maintenance. (Assumption —
no keyword tool was run.)

And Commnet's actual deal flow is primes and tenders, where the website's job is
to survive a prequalification check, not to rank. **The PDF company profile and
the project register pages are worth more than any landing page.**

### 8.2 "Is a public revamp even the priority?"

Arguable no. The live site has a contact form that posts nowhere, a "7 offices"
claim the builds contradict, no licence numbers, and named clients that may be
under NDA. A revamp that keeps those is a nicer version of the same credibility
problem. **Fix the facts first** (§7.1, 7.4, 7.7, 7.9), then design. This
document's client questions (§9) are the actual critical path.

### 8.3 "Publish the AED values — they are impressive"

They are, and they are also: (a) the prime's commercial information for eight
projects, (b) a price signal to competitors (Samba: multi-branch ACS + UPS +
cabling for AED 130k is a benchmark anyone can undercut), and (c) a number the
end-client may not know its prime paid. Scale metrics — points, cameras, rooms,
racks, days — carry the same weight to a buyer and expose nothing.
**Recommendation:** scale metrics on the public site; AED values in the PDF
profile shared on request. If the client wants AED public, an aggregate ("AED 26M+
across 18 contracts") is far safer than per-project values.

### 8.4 "Two axes is over-engineered — buyers want one list"

A consultant writing an ELV tender package thinks in systems (Axis A). A hotel
operator or facilities director thinks in outcomes (Axis B). One list serves one
of them and confuses the other, which is exactly what V1's seven cards do. Two
short rows, five and six cards, is less to read than seven overlapping ones. If
forced to one axis: use Axis A (systems), because that is the language of the BoQ.

### 8.5 "'One accountable partner' — but you were the subcontractor on half of these"

True, and hiding it is the mistake. Reframe: "the ELV subcontractor that primes
bring back" — GBM used Commnet three times (Hilton, DEWA, Atlantis). For the
prime/consultant audience, repeat business from a large SI is the strongest
reference on the page. Say it.

### 8.6 "Dropping Cyber Security shrinks the offer"

It removes the card least likely to survive a question and most likely to
attract RFPs Commnet cannot deliver. The revenue in the register is 100% physical
infrastructure. If the client has a genuine cyber ambition, the honest path is a
partner, a credential and one delivered project — then the card.

### 8.7 "The India site (commnetsys.com) uses the same taxonomy — this doubles the work"

Yes. And the India page argues its case entirely with Gulf evidence (already
noted in `SITES.md`). The taxonomy fix carries over unchanged; the *evidence*
does not. Until Indian projects exist, the India site should present the same
systems/environments with the Chennai engineering centre as its lead story, not
a Gulf project register with an Indian phone number.

### 8.8 "You are being too careful about the regulator wording — everyone says 'approved'"

Everyone in Emirtech's segment says it, and Emirtech's schema even asserts a
credential. That is a segment where enforcement is aimed at unlicensed installers,
and Emirtech presumably holds its ADMCC registration. Commnet's segment includes
government utilities and police. The one audience that will check the SIRA
register is the one Commnet is trying to win. Precision costs nothing if the
licence exists; it costs a tender if it does not.

---

## 9. Questions only the client can answer

Blocking (needed before any launch copy is final):

1. SIRA licence — category and number? Which projects were under it?
2. ADMCC registration — number?
3. ISO 9001 / ISO 27001 — certificate numbers, or none?
4. Trade licence — issue year (fixes the timeline) and listed activities.
5. Per project: may we name the end-client? May we publish the value?
6. Jotun: is "800" a camera count?
7. EY "Tier-1": Uptime tier, or "tier-1 client"?
8. Offices: two, or seven? Addresses for any beyond Dubai and Chennai.

Non-blocking (improves the page):

9. Named engineer for the CTA and the response-time promise.
10. Vendor partnerships with certificates (the "Tier-1 vendor" claim).
11. Fluke (or equivalent) ownership and report format.
12. Any Indian projects, clients or certifications for commnetsys.com.
13. Photography rights for project images currently hot-linked from the live site.

---

## 10. Sources

Competitor (fetched 2026-09-21):
- https://emirtech.ae/admcc-approved-cctv-installation-services.html
- https://emirtech.ae/services.html · /elv-smart-building-abu-dhabi.html ·
  /enterprise-it-abu-dhabi.html · /structured-cabling.html · /industries-we-serve.html

Regulators and licensing (secondary sources; confirm with the regulator before
quoting on a live page):
- ADMCC parent body and licensing role — https://lexaidxb.com/en/blog/admcc-abu-dhabi-guide
  (states: established 2011 under the Executive Council; transferred 2019 to the
  Supreme Council for National Security; the Centre "qualifies and licenses the
  companies that work in the monitoring and control field"; specifications are
  set by the Centre and change — confirm at mcc.gov.ae)
- SIRA licence categories — https://www.sira.gov.ae/en/services/security-equipment-and-devices-certification-29917987 ;
  https://diac.ae/blog/sira-license-dubai/ ; https://noblecoreventures.com/sira-license-dubai-2026/
- Other ADMCC guides consulted for the "approved contractor" framing —
  https://alphastonecontracting.com/cctv-security-systems/admcc/ ;
  https://quicknet.me/admcc-cctv-approval-abu-dhabi

Internal:
- `Data/commnet_data.json`, `Data/Commnet_Discovery_And_Extraction_Master.md`
- `commnetsysconsult-com/v1.html`, `commnetsysconsult-com/index.html`
- `SITES.md`, `PRODUCT.md`

Not used: any keyword-volume tool, any traffic-estimation tool. Statements about
search demand in §8.1 are reasoning, not measurement.
