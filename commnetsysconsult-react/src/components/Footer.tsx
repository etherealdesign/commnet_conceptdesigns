import { Link } from 'react-router'
import { IMG } from '../lib/images'
import { SERVICES } from '../data/services'
import { SOLUTIONS } from '../data/solutions'
import { OFFICES } from '../data/company'
import { SITE } from '../lib/site'

export function Footer() {
  return (
    <footer className="site-footer" data-theme="dark">
      <div className="wrap">
        <div className="top">
          <div>
            <Link className="logo" to="/" aria-label="Commnet Systems Consultancy — home">
              <img src={IMG.logoLight} alt="" width={104} height={44} loading="lazy" />
            </Link>
            <p>Turnkey ELV and ICT systems integrator: structured cabling, networks, security systems, AV and critical power, delivered as one package.</p>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Solutions</h5>
            <ul>
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link to={`/solutions/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Project register</Link></li>
              <li><Link to="/compliance">Compliance</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            {OFFICES.map((o) => (
              <div key={o.city} style={{ marginBottom: 24 }}>
                <h5>{o.locality}</h5>
                <p>
                  {o.address}
                  <br />
                  <a href={o.phoneHref}>{o.phone}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bottom">
          <span>
            © {new Date().getFullYear()} {SITE.legalName}.
          </span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
    </footer>
  )
}
