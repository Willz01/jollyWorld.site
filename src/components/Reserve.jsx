import { useEffect, useMemo, useState } from 'react'
import { ROOMS, TIERS } from '../data/rooms'
import { SITE, naira } from '../data/site'
import { useSubmit } from '../lib/useSubmit'

const today = () => new Date().toISOString().slice(0, 10)
const empty = { tier: 'normal', roomId: '', checkIn: '', checkOut: '', guests: '1', name: '', email: '', phone: '', notes: '' }

export default function Reserve({ pick }) {
  const [f, setF] = useState(empty)
  const [err, setErr] = useState('')
  const { status, submit, reset } = useSubmit()

  useEffect(() => {
    if (!pick) return
    const r = ROOMS.find((x) => x.id === pick.id)
    if (r) setF((s) => ({ ...s, tier: r.tier, roomId: r.id }))
  }, [pick])

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value, ...(k === 'tier' ? { roomId: '' } : {}) }))
  const rooms = ROOMS.filter((r) => r.tier === f.tier)
  const room = ROOMS.find((r) => r.id === f.roomId)
  const tier = TIERS.find((t) => t.id === f.tier)

  const nights = useMemo(() => {
    if (!f.checkIn || !f.checkOut) return 0
    const n = Math.round((new Date(f.checkOut) - new Date(f.checkIn)) / 864e5)
    return n > 0 ? n : 0
  }, [f.checkIn, f.checkOut])
  const total = nights * (room ? room.price : tier.price)

  function onSubmit(e) {
    e.preventDefault()
    if (!nights) return setErr('Check-out must be after check-in.')
    setErr('')
    submit({
      _subject: `New reservation request: ${room ? room.name : tier.name}`,
      'Room tier': tier.short,
      Room: room ? `${room.name} (room ${room.number})` : 'Any available in this tier',
      'Check-in': f.checkIn,
      'Check-out': f.checkOut,
      Nights: nights,
      Guests: f.guests,
      'Estimated total': naira(total),
      Name: f.name,
      email: f.email,
      Phone: f.phone,
      Notes: f.notes
    })
  }

  return (
    <section className="section veil" id="reserve">
      <div className="wrap split split--form">
        <div>
          <h2>Reserve a room</h2>
          <p className="lead">Send your dates and we will confirm availability by email or phone.</p>
          <div className="summary" aria-live="polite">
            <p className="summary__label">Your stay</p>
            <p className="summary__room">{room ? `${room.name}, room ${room.number}` : `${tier.name} (any room)`}</p>
            <p>{nights ? `${nights} night${nights > 1 ? 's' : ''} at ${naira(room ? room.price : tier.price)}` : 'Choose your dates to see the total.'}</p>
            {nights > 0 && <p className="summary__total">{naira(total)}</p>}
          </div>
        </div>

        {status === 'sent' ? (
          <div className="notice notice--ok">
            <h3>Request sent</h3>
            <p>Thank you, {f.name.split(' ')[0] || 'friend'}. We will confirm your reservation shortly.</p>
            <button className="btn btn--ghost" onClick={() => { reset(); setF(empty) }}>Make another reservation</button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="sr-only" aria-hidden="true" />
            <div className="row">
              <label>Room tier
                <select value={f.tier} onChange={set('tier')}>
                  {TIERS.map((t) => <option key={t.id} value={t.id}>{t.short} ({naira(t.price)})</option>)}
                </select>
              </label>
              <label>Room
                <select value={f.roomId} onChange={set('roomId')}>
                  <option value="">Any available</option>
                  {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}, room {r.number}</option>)}
                </select>
              </label>
            </div>
            <div className="row">
              <label>Check-in
                <input type="date" required min={today()} value={f.checkIn} onChange={set('checkIn')} />
              </label>
              <label>Check-out
                <input type="date" required min={f.checkIn || today()} value={f.checkOut} onChange={set('checkOut')} />
              </label>
            </div>
            <div className="row">
              <label>Guests
                <select value={f.guests} onChange={set('guests')}>
                  {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label>Full name
                <input type="text" required autoComplete="name" value={f.name} onChange={set('name')} />
              </label>
            </div>
            <div className="row">
              <label>Email
                <input type="email" required autoComplete="email" value={f.email} onChange={set('email')} />
              </label>
              <label>Phone
                <input type="tel" required autoComplete="tel" value={f.phone} onChange={set('phone')} />
              </label>
            </div>
            <label>Notes (optional)
              <textarea rows="3" value={f.notes} onChange={set('notes')} />
            </label>
            {err && <p className="notice notice--err" role="alert">{err}</p>}
            {status === 'error' && (
              <p className="notice notice--err" role="alert">
                We could not send that. Try again, or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            )}
            <button className="btn btn--gold" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send reservation request'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
