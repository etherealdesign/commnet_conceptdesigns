import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { Arrow } from '../components/Arrow'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page not found" description="This page does not exist." noindex />
      <section className="nf dark" data-theme="dark">
        <div className="wrap">
          <div className="huge" style={{ background: 'linear-gradient(180deg,#fff,#475569)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
            404
          </div>
          <p className="lead" style={{ margin: '24px auto 36px' }}>
            That link doesn’t lead anywhere. The project register and services are a click away.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" to="/">
              Back to home <Arrow />
            </Link>
            <Link className="btn btn-ghost" to="/projects">
              Project register
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
