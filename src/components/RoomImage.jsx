// Placeholder artwork until real photos are added (set `image` on a room in src/data/rooms.js).
const palette = {
  normal: ['#2a2417', '#4a3d1f'],
  special: ['#33291a', '#7a6024'],
  extra: ['#3d2f12', '#c9a23a']
}

export default function RoomImage({ room }) {
  if (room.image) {
    return <img className="room__img" src={room.image} alt={`${room.name}, room ${room.number}`} loading="lazy" />
  }
  const [a, b] = palette[room.tier]
  const gid = `g-${room.id}`
  return (
    <svg
      className="room__img"
      viewBox="0 0 400 300"
      role="img"
      aria-label={`Placeholder photo for ${room.name}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
      <rect x="280" y="40" width="70" height="90" fill="none" stroke="#f0d98a" strokeOpacity=".5" strokeWidth="2" />
      <path d="M315 40v90M280 85h70" stroke="#f0d98a" strokeOpacity=".5" strokeWidth="2" />
      <rect x="70" y="120" width="14" height="110" fill="#0a0a0a" opacity=".85" />
      <rect x="70" y="170" width="260" height="60" rx="4" fill="#0a0a0a" opacity=".85" />
      <rect x="84" y="150" width="236" height="28" rx="6" fill="#f0d98a" opacity=".85" />
      <rect x="96" y="136" width="60" height="22" rx="8" fill="#fff3c9" opacity=".9" />
      <rect x="166" y="136" width="60" height="22" rx="8" fill="#fff3c9" opacity=".9" />
      <rect x="330" y="120" width="14" height="110" fill="#0a0a0a" opacity=".85" />
    </svg>
  )
}
