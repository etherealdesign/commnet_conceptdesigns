# Which build goes on which domain

One folder per domain, named after the domain. If a folder name and a domain
ever disagree again, this file is wrong — fix it here first, then the folder.

| Domain | Folder | Build | State |
|---|---|---|---|
| commnetsysconsult.com | `commnetsysconsult-com/` | `Commnet - 2.html`, plus `v1.html` (concept 01) | ready — see below |
| commnetsys.com | `commnetsys-com/` | `Commnet - 2.html` with the base location moved to India | ready |
| commnettech.com | `commnettech-com/` | `Commnet - 3.html`, unmodified | ready — see caveat |
| teleiostec.com | `teleiostec-com/` | the version 02 Teleiostec build | ready |

`index.html` at the root is the review index. It links to exactly these four and
nothing else.

## commnetsysconsult.com carries two concepts

The client liked the original prototype after it had already been archived, so it
came back out and now sits beside the current build:

| File | Is | Switcher label |
|---|---|---|
| `commnetsysconsult-com/index.html` | the current build | V2 |
| `commnetsysconsult-com/v1.html` | concept 01, the original prototype | V1 |

A fixed pill at the top of the screen switches between them. It is injected into
both files as a `<style id="vsw-style">` block plus a `<div class="vsw">` before
`</body>`, and it nudges the fixed site header down 40px to clear itself.

**That pill is review chrome and must come off before either page goes live under
the real domain.** Remove both injected blocks; nothing else depends on them.

Concepts 02 and 03 stay in `_archive/`. The client declined them, and confirmed
again on 2026-08-27 that they are not wanted in the switcher.

## Dubai and India are one design, two bases

`commnetsys-com/` is a copy of `commnetsysconsult-com/` with the base location
moved. Seven things change and nothing else:

1. meta description — "Chennai engineering center, Dubai HQ"
2. About lede — engineered *from* Chennai, Dubai behind it
3. Company information lead — "two hubs, Chennai and Dubai"
4. Office cards — Chennai first
5. CTA button — calls Chennai, `+91 75581 64222`
6. CTA email — `info@commnetsysconsult.in`
7. Footer columns — Chennai first

**When the Dubai site changes, the India site does not follow automatically.**
Re-copy `commnetsysconsult-com/index.html` over `commnetsys-com/index.html` and
re-apply those seven. There is no build step doing it for you.

### What did NOT change, deliberately

The proof on both pages is the same, and it is all UAE: DEWA, Atlantis, Hilton,
the UAE Football Association, Dubai Police, Abu Dhabi Airport; every project
value in AED; SIRA and ADMCC compliance, which are Dubai and Abu Dhabi
regulators. That is the company's real record and inventing an Indian
equivalent would be worse than leaving it. But it does mean the India page
argues its case with Gulf evidence. If Commnet has Indian projects,
certifications or clients, those are what should replace this section on
`commnetsys-com/` — and that is content only they can supply.

## Caveat on commnettech.com

The build on this domain is `Commnet - 3.html`: the full Commnet Systems
Consultancy site — eleven sections, the Dubai and Chennai offices, the UAE
project register — presented behind the WebGL hero. It is the newest and most
developed of everything delivered so far.

It says **Commnet Systems Consultancy** throughout, and names Dubai, India and
Singapore. It carries no Commnet Technology Services content: no Chennai head
office, none of the twelve service lines, none of the commnettech.com copy.
This was flagged and the file was supplied again for this domain, so it is a
deliberate choice, not an oversight — but the copy still has to be repointed
before it goes live under that name.

Two things exist for that work, both in `_unassigned/`, in git and never
deployed:

- `commnettech-chennai-content-build/` — a complete build made entirely from
  commnettech.com: twelve service lines, five disciplines, six industries, the
  real Chennai address and JSON-LD. This is the content source.
- `webgl-build-commnet-tech-copy/` — the earlier WebGL-only build, with its
  copy already repointed to Commnet Technology Services. Useful as a worked
  example of which strings carry the company identity.

## Directories that are not sites

- `_unassigned/` — finished builds with no domain. In git, never deployed.
- `_archive/` — declined and superseded work. Local only: in `.gitignore`, so
  not on GitHub either. Recoverable from history; see `_archive/README.md`.

## Checked against the live site

`https://commnetsysconsult.com/` is the live Commnet Systems Consultancy site.
The contact details in these builds were cross-checked against its Contact page
and match exactly: `+971 4 295 5299`, `info@commnetsysconsult.com`, Office 301,
Centurion Star Building, Tower A, Port Saeed, PO Box 117133.

Taken from it and wired in:

- Privacy — `https://commnetsysconsult.com/PrivacyPolicy`
- Terms — `https://commnetsysconsult.com/TermsAndConditions`
- LinkedIn — `linkedin.com/company/commnet-systems-consultancy`

The X and YouTube icons were removed rather than linked. Neither account
exists; the live site points its Facebook and Instagram icons at bare
`facebook.com` and `instagram.com`, which is worse than not offering them.
If those accounts are created later, the markup pattern is still in git.

Note these three URLs sit on the commnetsysconsult.com domain. They are correct
for `commnetsysconsult-com/` and `commnetsys-com/`, and correct for
`commnettech-com/` only for as long as that build carries Systems Consultancy
copy. If it is repointed to Commnet Technology Services, these change too.

**Still unresolved: the contact form.** The live site's own form posts by
script with no `action` attribute, so there was nothing to copy. All three
builds validate, confirm, and then drop the message. An endpoint is needed, or
the forms should be replaced with the email address.

**Discrepancy worth checking:** the live site says "7 offices across the
region". These builds show two — Dubai and Chennai. If there are five more,
they belong in the offices section.

## Teleiostec, checked against teleiostec.com

The live site corrected one thing and supplied three.

**Corrected:** the build addressed every enquiry to `info@teleiostec.com`. The
live site takes them at **`sales@teleiostec.com`**. That was wrong in seven
places, including the "Start a Project" call to action, the contact block and
the menu — every one of them sending a visitor to an address the studio may
not read. Fixed throughout.

**Supplied:** three real social accounts, which the redesign had dropped —
`linkedin.com/company/teleiostec`, `instagram.com/teleiostec.ae` and
`facebook.com/teleiostec`. Added to the footer beside the address, styled from
the existing `.ft__nav` rules rather than a new treatment.

Confirmed identical to the live site and left alone: `+971 4 295 5299`, and the
Office 301, Centurion Star Tower A, Port Saeed address. The phone is shared
with Commnet Systems Consultancy — that is correct, not a copy-paste error.

teleiostec.com publishes no privacy or terms pages, so there is nothing to
link; the build does not offer those links either. Consistent.
