import { SITE } from '../data/site'
import HotelOutline from './HotelOutline'
import Sparkle from './Sparkle'

export default function Footer() {
  return (
    <footer className="footer">
      <HotelOutline variant="footer" />
      <div className="wrap footer__grid">
        <div>
          <p className="footer__brand">jollyWorld</p>
          <p className="footer__small">{SITE.address}</p>
        </div>
        <nav aria-label="Jump to a section">
          <h4>Book and explore</h4>
          <ul>
            <li><a href="#reserve">Book or reserve a room</a></li>
            <li><a href="#rooms">Rooms</a></li>
            <li><a href="#rates">Rates</a></li>
            <li><a href="#contact">Contact us</a></li>
          </ul>
        </nav>
        <div>
          <h4>Follow us</h4>
          <ul>
            <li><a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap">
        <div className="mark">
          <Sparkle className="spark mark__spark" />
          <p className="mark__word" aria-hidden="true">jolly<span>World</span></p>
          <div className="mark__row">
            <p>Hotel and bar · Odiok Itam, Uyo</p>
            <a className="btn btn--gold btn--sm" href="#home">Back to top ↑</a>
          </div>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <p>
          © {new Date().getFullYear()} jollyWorld. All rights reserved.
          <span className="footer__credit">
            Website by <a href={SITE.credit.url} target="_blank" rel="noopener noreferrer">Wills Ekanem</a>
          </span>
        </p>
      </div>
    </footer>
  )
}
