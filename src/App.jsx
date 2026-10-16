import { useState } from 'react'
import Background from './components/Background'
import Hero from './components/Hero'
import About from './components/About'
import Mission from './components/Mission'
import Rooms from './components/Rooms'
import Bar from './components/Bar'
import Rates from './components/Rates'
import Reserve from './components/Reserve'
import Contact from './components/Contact'
import Footer from './components/Footer'

const go = (id) => document.getElementById(id)?.scrollIntoView()

export default function App() {
  const [pick, setPick] = useState(null) // { id, stamp } room chosen from a card
  const [topic, setTopic] = useState({ value: 'General question', stamp: 0 })

  const reserveRoom = (room) => {
    setPick({ id: room.id, stamp: Date.now() })
    go('reserve')
  }
  const askAboutEvent = () => {
    setTopic({ value: 'Bar and event hire', stamp: Date.now() })
    go('contact')
  }

  return (
    <>
      <Background />
      <main>
        <Hero />
        <About />
        <Mission />
        <Rooms onReserve={reserveRoom} />
        <Bar onAsk={askAboutEvent} />
        <Rates />
        <Reserve pick={pick} />
        <Contact topic={topic} />
      </main>
      <Footer />
    </>
  )
}
