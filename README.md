# jollyWorld hotel website

React + Vite + three.js single-page hotel site (gold and black), with a scroll-driven spinning globe.

## Run
```bash
npm install
npm run dev      # local dev
npm run build    # production build in /dist
```
Deploy the `dist` folder (or connect the repo) on Vercel. Framework preset: Vite.

## Edit your content
- `src/data/site.js`: address, phone, Instagram/Facebook links, map query, credit link, destination email.
- `src/data/rooms.js`: tiers, prices (Naira), room names, bar event rate. To use real photos, drop images in `public/rooms/` and set `image: '/rooms/name.jpg'` on a room.

## Forms
Reservation and contact forms post to `ekanemwills1@gmail.com` through FormSubmit. The first time a form is submitted from the live site, FormSubmit emails an activation link to that address; click it once and every later submission arrives normally.

## Map
`src/data/site.js` uses a Google Maps search for Odiok Itam. For an exact pin, open the hotel on Google Maps, choose Share > Embed a map, and paste the `src` URL into `mapEmbedSrc`.
