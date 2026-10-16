// Everything you are likely to edit lives here.
export const SITE = {
    name: 'JollyWorld',
    tagline: 'A world of jollyMeant and entertainment, ' +
        '- just the way you like it.',
    address: 'Odiok Itam, Behind Raycon, Calabar-Itu Road, Uyo, Akwa Ibom, Nigeria',
    // Inquiry + reservation forms are delivered to this address [change later to hotel dedicated address]
    email: 'ekanemwills1@gmail.com',
    phone: '+234 808 344 1236', // TODO: replace with the hotel's real number
    social: {
        instagram: 'https://www.instagram.com/jollyworld.ng/',
        facebook: 'https://www.facebook.com/'    // TODO: replace with the hotel's Facebook page
    },
    credit: {label: 'Wills Ekanem 2026', url: 'https://willsekanem.vercel.app'},
    // Google Map. For an exact pin: Google Maps > Share > Embed a map > copy the src="..." value into mapEmbedSrc.
    mapQuery: 'Odiok Itam, Calabar-Itu Road, Uyo, Akwa Ibom, Nigeria',
    mapEmbedSrc: 'https://www.google.com/maps/d/u/0/embed?mid=1FSnjKWUKCuCZpiJZfzHLLKS7qtOEtuQ&ehbc=2E312F'
}

export const naira = (n) => '₦' + n.toLocaleString('en-NG')