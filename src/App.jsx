import { useEffect, useState } from 'react'
import Background from './components/Background'
import Header from './components/Header'
import HowItWorks from './components/HowItWorks'
import Hero from './components/Hero'
import About from './components/About'
import Mission from './components/Mission'
import Rooms from './components/Rooms'
import Bar from './components/Bar'
import Rates from './components/Rates'
import Reserve from './components/Reserve'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Fade-and-rise elements into view as they scroll in.
const REVEAL = '.section h2, .section .lead, .statement, .pillar, .facts li, .tier__head, .room, .rate, .prose p, .summary, .map'
function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = [...document.querySelectorAll(REVEAL), ...document.querySelectorAll('.reveal')]
    document.documentElement.classList.add('js-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      }),
      { rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => {
      el.classList.add('reveal')
      // Stagger siblings in a grid so cards arrive one after another.
      const i = [...el.parentElement.children].indexOf(el)
      el.style.setProperty('--d', `${Math.min(i, 6) * 70}ms`)
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}

const go = (id) => document.getElementById(id)?.scrollIntoView()

export default function App() {
  useReveal()
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
      <Header />
      <main>
        <Hero />
        <About />
        <Mission />
        <Rooms onReserve={reserveRoom} />
        <Bar onAsk={askAboutEvent} />
        <Rates />
        <HowItWorks />
        <Reserve pick={pick} />
        <Contact topic={topic} />
      </main>
      <Footer />
    </>
  )
}
