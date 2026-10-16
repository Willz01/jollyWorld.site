import { SITE } from '../data/site'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap hero__inner">
          <h1 className="hero__title text-center md:text-left" style={{'textAlign': 'center'}}>
              <span className="hero__jolly"> jolly</span>
              <span className="hero__world">World</span>
          </h1>

          <p className="hero__lead">
            {SITE.tagline}
        </p>
        <div className="hero__actions">
          <a className="btn btn--gold" href="#reserve">Reserve a room</a>
          <a className="btn btn--ghost" href="#rates">See rates</a>
        </div>
      </div>
      <p className="hero__hint">Comfort away from home</p>
      <span className="sr-only">{SITE.address}</span>
    </section>
  )
}
