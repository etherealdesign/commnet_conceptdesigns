# Which build goes on which domain

One folder per domain, named after the domain. If a folder name and a domain
ever disagree again, this file is wrong — fix it here first, then the folder.

| Domain | Folder | Build | State |
|---|---|---|---|
| commnetsysconsult.com | `commnetsysconsult-com/` | `Commnet - 2.html`, unmodified | ready |
| commnetsys.com | `commnetsys-com/` | `Commnet - 2.html` with the base location moved to India | ready |
| commnettech.com | `commnettech-com/` | `Commnet - 3.html`, unmodified | ready — see caveat |
| teleiostec.com | `teleiostec-com/` | the version 02 Teleiostec build | ready |

`index.html` at the root is the review index. It links to exactly these four and
nothing else.

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
