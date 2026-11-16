import { useEffect, useState } from 'react'

const LINKS = [
  ['About', '#about'],
  ['Rooms', '#rooms'],
  ['Bar', '#bar'],
  ['Rates', '#rates'],
  ['How to book', '#how'],
  ['Contact', '#contact']
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav${solid ? ' nav--solid' : ''}${open ? ' nav--open' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#home" onClick={close}>
          <img src="/logo-circle.png" alt="" width="36" height="36" />
          <span>jolly<em>World</em></span>
        </a>
        <nav id="nav-menu" className="nav__links" aria-label="Main">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
          <a className="btn btn--gold btn--sm nav__cta" href="#reserve" onClick={close}>Reserve</a>
        </nav>
        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  )
}
