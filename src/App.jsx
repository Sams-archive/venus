import Hero from './components/Hero'
import Traits from './components/Traits'
import Poem from './components/Poem'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import FloatingHearts from './components/FloatingHearts'
import BackgroundBlobs from './components/BackgroundBlobs'
import ScrollIndicator from './components/ScrollIndicator'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Global decorative layers */}
      <ScrollIndicator />
      <BackgroundBlobs />
      <FloatingHearts />

      {/* Sections */}
      <main>
        <Hero />
        <Traits />
        <Poem />
        <Timeline />
        <Gallery />
        <Footer />
      </main>
    </div>
  )
}
