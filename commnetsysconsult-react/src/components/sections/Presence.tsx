import { useRef } from 'react'
import { OFFICES } from '../../data/company'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { SectionHead } from './SectionHead'
import { IMG } from '../../lib/images'

export function Presence() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return gsap.set('.beampath', { strokeDashoffset: 0 })
      gsap.to('.beampath', { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: '.map', start: 'top 70%', once: true } })
    },
    { scope: ref },
  )
  return (
    <section id="presence" ref={ref}>
      <div className="wrap">
        <SectionHead title="Dubai headquarters. Chennai engineering." lead="Commercial, field and commissioning teams in the UAE, backed by an engineering centre in India." />
        <div className="map">
          <div className="bgp" style={{ ['--map-img' as string]: `url(${IMG.dubaiSkyline})` }} />
          <div className="veil" />
          <svg viewBox="0 0 800 520" aria-hidden="true">
            <defs>
              <linearGradient id="bm" x1="0" x2="1">
                <stop offset="0" stopColor="#2563EB" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
              <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255,255,255,.12)" />
              </pattern>
            </defs>
            <rect width="800" height="520" fill="url(#dots)" />
            <path id="beampath" className="beampath" d="M210 250 C 330 150, 470 150, 600 300" fill="none" stroke="url(#bm)" strokeWidth="2" strokeDasharray="600" strokeDashoffset="600" />
            <circle cx="210" cy="250" r="40" fill="rgba(37,99,235,.15)">
              <animate attributeName="r" values="30;46;30" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="210" cy="250" r="7" fill="#2563EB" stroke="#fff" strokeWidth="2" />
            <circle cx="600" cy="300" r="40" fill="rgba(34,211,238,.15)">
              <animate attributeName="r" values="30;46;30" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="300" r="7" fill="#22D3EE" stroke="#fff" strokeWidth="2" />
            <circle r="4" fill="#fff">
              <animateMotion dur="3.2s" repeatCount="indefinite">
                <mpath href="#beampath" />
              </animateMotion>
            </circle>
            <text x="210" y="300" fill="#fff" fontFamily="Manrope" fontWeight="700" fontSize="20" textAnchor="middle">Dubai</text>
            <text x="210" y="320" fill="#94A3B8" fontSize="12" textAnchor="middle">Headquarters · GMT+4</text>
            <text x="600" y="350" fill="#fff" fontFamily="Manrope" fontWeight="700" fontSize="20" textAnchor="middle">Chennai</text>
            <text x="600" y="370" fill="#94A3B8" fontSize="12" textAnchor="middle">Engineering Center · GMT+5:30</text>
          </svg>
          <div className="offices">
            {OFFICES.map((o) => (
              <div className="office glass" key={o.city}>
                <small>{o.kicker}</small>
                <b>{o.city}</b>
                <p>
                  {o.address}
                  <br />
                  <a href={o.phoneHref}>{o.phone}</a> · <a href={`mailto:${o.email}`}>{o.email}</a>
                  <br />
                  {o.hours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
