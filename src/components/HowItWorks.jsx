import { useEffect, useRef, useState } from 'react'
import { TIERS } from '../data/rooms'
import { naira } from '../data/site'
import Sparkle from './Sparkle'

const STEPS = [
  { title: 'Choose your room', text: 'Browse three tiers, from a quiet single night to a suite with its own lounge.' },
  { title: 'Pick your dates', text: 'Set check-in and check-out. The nights and total add up as you go.' },
  { title: 'Send the request', text: 'Leave your name and number. It reaches the front desk straight away.' },
  { title: 'We confirm and welcome you', text: 'We call or email to confirm, and your room is ready when you arrive.' }
]

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function Screen({ step }) {
  if (step === 0) {
    return (
      <div className="ph__screen" key="s0">
        <p className="ph__title">Choose a room</p>
        {TIERS.map((t, i) => (
          <div className={`ph__tier${i === 1 ? ' is-on' : ''}`} key={t.id}>
            <span>{t.short}</span>
            <strong>{naira(t.price)}</strong>
          </div>
        ))}
        <p className="ph__note">Special · King bed, smart TV</p>
      </div>
    )
  }
  if (step === 1) {
    return (
      <div className="ph__screen" key="s1">
        <p className="ph__title">Pick your dates</p>
        <div className="ph__cal">
          {DAYS.map((d, i) => <span className="ph__dow" key={i}>{d}</span>)}
          {Array.from({ length: 28 }, (_, i) => {
            const n = i + 1
            const cls = n === 12 || n === 15 ? ' is-end' : n > 12 && n < 15 ? ' is-mid' : ''
            return <span className={`ph__day${cls}`} key={n}>{n}</span>
          })}
        </div>
        <div className="ph__sum"><span>3 nights</span><strong>{naira(TIERS[1].price * 3)}</strong></div>
      </div>
    )
  }
  if (step === 2) {
    return (
      <div className="ph__screen" key="s2">
        <p className="ph__title">Your request</p>
        <div className="ph__field"><span>Room</span>Amber room · 202</div>
        <div className="ph__field"><span>Dates</span>12 – 15, 3 nights</div>
        <div className="ph__field"><span>Name</span>Your name</div>
        <div className="ph__btn">Send request</div>
        <p className="ph__sent"><i>✓</i> Sent to the front desk</p>
      </div>
    )
  }
  return (
    <div className="ph__screen ph__screen--key" key="s3">
      <p className="ph__title">Welcome to jollyWorld</p>
      <div className="ph__key">
        <span className="ph__keyBrand">jolly<b>World</b></span>
        <span className="ph__keyRoom">202</span>
        <span className="ph__keyName">Amber room</span>
      </div>
      <p className="ph__note">Confirmed. See you on the 12th.</p>
    </div>
  )
}

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const [fill, setFill] = useState(0)
  const listRef = useRef(null)
  const stepRefs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.step))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    stepRefs.current.forEach((el) => el && io.observe(el))

    const onScroll = () => {
      const el = listRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const mid = window.innerHeight * 0.5
      setFill(Math.min(1, Math.max(0, (mid - r.top) / r.height)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section className="section veil how" id="how">
      <Sparkle className="spark spark--a" />
      <Sparkle className="spark spark--b" />
      <div className="wrap">
        <h2 className="reveal">How booking works</h2>
        <p className="lead reveal">Four steps from browsing to your room key. No account, no deposit online.</p>

        <div className="how__grid">
          <ol className="how__steps" ref={listRef} style={{ '--fill': fill }}>
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                data-step={i}
                ref={(el) => (stepRefs.current[i] = el)}
                className={`how__step${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
              >
                <span className="how__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="how__card">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <div className="how__mini" aria-hidden="true"><Screen step={i} /></div>
                </div>
              </li>
            ))}
          </ol>

          <div className="how__phoneWrap" aria-hidden="true">
            <div className="ph">
              <div className="ph__notch" />
              <Screen step={active} />
              <div className="ph__dots">
                {STEPS.map((_, i) => <span key={i} className={i === active ? 'is-on' : ''} />)}
              </div>
            </div>
          </div>
        </div>

        <a className="btn btn--gold how__go" href="#reserve">Start your booking</a>
      </div>
    </section>
  )
}
