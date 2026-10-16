import { BAR } from '../data/rooms'
import { naira } from '../data/site'

export default function Bar({ onAsk }) {
  return (
    <section className="section veil" id="bar">
      <div className="wrap split">
        <div>
          <h2>The bar</h2>
        </div>
        <div className="prose">
          <p>
            Come in, sit down and stay a while. The jollyWorld bar is open to guests and visitors
            who want a cold drink, good company and a quiet corner after a long day.
          </p>
          <p>
            Planning something bigger? You can hire the bar for birthdays, receptions, meetings and
            private parties. The rate starts at <strong>{naira(BAR.eventRate)}</strong>. {BAR.rateNote}
          </p>
          <button className="btn btn--gold" onClick={onAsk}>Ask about an event</button>
        </div>
      </div>
    </section>
  )
}
