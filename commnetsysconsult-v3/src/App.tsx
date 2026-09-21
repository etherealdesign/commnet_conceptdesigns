import { useState } from 'react'
import { Loader } from '@/components/loader/Loader'
import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/hero/Hero'
import { TrustBar } from '@/components/trust/TrustBar'

function App() {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <>
      <Loader onDone={() => setLoaderDone(true)} />
      <Nav />
      <main>
        <Hero ready={loaderDone} />
        <TrustBar />
        {/* Services, Solutions, Project Register, Process, About, Compliance,
            Contact and Footer land in the next pass — see PROGRESS.md */}
      </main>
    </>
  )
}

export default App
