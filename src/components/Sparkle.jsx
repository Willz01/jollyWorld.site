// Four-point gold sparkle used as a decorative doodle.
export default function Sparkle({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 2C21.5 13 27 18.5 38 20C27 21.5 21.5 27 20 38C18.5 27 13 21.5 2 20C13 18.5 18.5 13 20 2Z" />
    </svg>
  )
}
