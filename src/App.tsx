import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ControlPanel from './components/ControlPanel'
import Expertise, { Solutions, Missions } from './components/Sections'
import { Technology, Timeline, Equipment, Safety } from './components/TechnologySections'
import Assistant from './components/Assistant'
import Contact, { Footer } from './components/Contact'

export default function App() {
  return (
    <>
      <div className="site-canvas" aria-hidden="true" />
      <Navigation />
      <main>
        <Hero />
        <ControlPanel />
        <Expertise />
        <Solutions />
        <Missions />
        <Technology />
        <Timeline />
        <Equipment />
        <Safety />
        <Assistant />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
