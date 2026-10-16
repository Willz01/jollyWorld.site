import { TIERS, BAR } from '../data/rooms'
import { naira } from '../data/site'

export default function Rates() {
  return (
    <section className="section veil" id="rates">
      <div className="wrap">
        <h2>Rates</h2>
        <p className="lead">Prices are per room, per night, in Naira.</p>

        <div className="rates">
          {TIERS.map((t) => (
            <div className={`rate rate--${t.id}`} key={t.id}>
              <h3>{t.short}</h3>
              <p className="rate__price">{naira(t.price)}</p>
              <ul>
                {t.includes.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <a className="btn btn--ghost btn--sm" href="#reserve">Reserve</a>
            </div>
          ))}
        </div>

        <div className="rate rate--bar">
          <div>
            <h3>Bar and event hire</h3>
            <p>{BAR.rateNote}</p>
          </div>
          <p className="rate__price">{naira(BAR.eventRate)}</p>
        </div>
      </div>
    </section>
  )
}
