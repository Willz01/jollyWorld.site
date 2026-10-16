import { ROOMS, TIERS } from '../data/rooms'
import { naira } from '../data/site'
import RoomImage from './RoomImage'

export default function Rooms({ onReserve }) {
  return (
    <section className="section veil" id="rooms">
      <div className="wrap">
        <h2>Our rooms</h2>
        <p className="lead">Fifteen rooms across three tiers. Pick one and we will take you straight to the booking form.</p>

        {TIERS.map((tier) => (
          <div className={`tier tier--${tier.id}`} key={tier.id}>
            <header className="tier__head">
              <h3>{tier.name}</h3>
              <p>{tier.blurb}</p>
              <p className="tier__price">{naira(tier.price)} <span>per night</span></p>
            </header>
            <div className="grid">
              {ROOMS.filter((r) => r.tier === tier.id).map((room) => (
                <article className="room" key={room.id}>
                  <RoomImage room={room} />
                  <div className="room__body">
                    <h4>{room.name}</h4>
                    <p className="room__meta">Room {room.number} - max guests {room.guests}</p>
                    <p className="room__price">{naira(room.price)} <span>per night</span></p>
                    <button className="btn btn--ghost btn--sm" onClick={() => onReserve(room)}>
                      Reserve this room
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
