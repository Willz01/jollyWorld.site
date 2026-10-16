import { SITE } from '../data/site'

export default function Footer() {
  return (
    <footer className="footer">
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
      <div className="wrap footer__bottom">
        <p>
          © <a href={SITE.credit.url} target="_blank" rel="noopener noreferrer">{SITE.credit.label}</a>
        </p>
      </div>
    </footer>
  )
}
