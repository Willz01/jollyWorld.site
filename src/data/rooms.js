// Prices are placeholders (Naira per night). Changed on actual price confirmation.
export const TIERS = [
  {
    id: 'normal',
    name: 'Normal rooms',
    short: 'Normal',
    price: 25000,
    blurb: 'Clean, quiet and comfortable. Everything you need for a good night.',
    includes: ['Queen bed', 'Air conditioning', 'Free Wi-Fi', 'Private bathroom'],
    image: '/rooms/normal.png'
  },
  {
    id: 'special',
    name: 'Special rooms',
    short: 'Special',
    price: 45000,
    blurb: 'More space, better finishes and a proper work and lounge corner.',
    includes: ['King bed', 'Air conditioning', 'Free Wi-Fi', 'Smart TV', 'Work desk and seating area'],
    image: '/rooms/special.png'
  },
  {
    id: 'extra',
    name: 'Extra special rooms',
    short: 'Extra special',
    price: 75000,
    blurb: 'Our best rooms: suite-sized, with a separate lounge and the quietest position.',
    includes: ['King bed and separate lounge', 'Air conditioning', 'Free Wi-Fi', 'Smart TV', 'Bathtub', 'Breakfast for 1'],
    image: '/rooms/extra.png'
  }
]

const names = {
  normal: ['Palm', 'Cedar', 'Teak', 'Mahogany', 'Ebony'],
  special: ['Amber', 'Topaz', 'Citrine', 'Saffron', 'Honey'],
  extra: ['Crown', 'Regent', 'Sovereign', 'Imperial', 'Zenith']
}

export const ROOMS = TIERS.flatMap((tier, t) =>
  names[tier.id].map((n, i) => ({
    id: `${tier.id}-${i + 1}`,
    number: (t + 1) * 100 + (i + 1),
    name: `${n} room`,
    tier: tier.id,
    price: tier.price,
    guests: tier.id === 'normal' ? 1 : tier.id === 'special' ? 2 : 2,
    image: tier.image // Put a photo path here, e.g. '/rooms/palm.jpg' (file in /public/rooms). null shows the placeholder.
  }))
)

export const BAR = {
  eventRate: 150000, // placeholder: per event
  rateNote: 'Per event, up to 6 hours. Setup, sound and extra hours are quoted on request.'
}
