# Bengal Institute — Next.js (JavaScript/JSX)

Next.js App Router · React · Tailwind v4 · HeroUI · Gravity UI · Better Auth · MongoDB

## Run
1. `cp .env.example .env.local` → fill MONGODB_URI, BETTER_AUTH_SECRET, BETTER_AUTH_URL
2. `npm install` (then `npm outdated`)
3. `npm run dev`  /  `npm run build && npm start`

## Routes
Part 1: / · /courses · /courses/[id] · /admission · /login · /register · /student
Part 2: /teachers · /roadmap · /campus · /verify · /verify/[id] (certificate page)
APIs: /api/auth/* · /api/admissions · /api/newsletter · /api/certificates/[id] · /api/homework

## MongoDB collections
admissions, newsletter_subscribers, homework, certificates (add real records here),
plus Better Auth's own: user, session, account, verification.

## Part 3 routes
/ai-studio · /drive · /firecrawl · /analytics
APIs: /api/gemini/generate-image · /api/google-token · /api/firecrawl/agent|status

## Google (optional)
Create an OAuth client, add redirect `${BETTER_AUTH_URL}/api/auth/callback/google`, set GOOGLE_CLIENT_ID/SECRET and
NEXT_PUBLIC_GOOGLE_ENABLED=true. Drive/Docs/Sheets scopes are "sensitive": Google may require app verification for public use.

## Not ported
BengalOneShowcaseBanner, BuildingArtwork, PhotoArtworkViews (only the building view was kept), CrestLogo,
RecentlyUploadedPhotosModal + imageStorageService + teachersStorage (photo upload/gallery relied on the Vite dev-server
plugin writing to /public), UserProfile (replaced by the navbar user menu), vite.config.ts, firebase files.

## Design notes
- Palette lives in `src/app/globals.css` (`@theme`): remapped slate scale (deep teal-ink) + `gold-*` accent. Change it there once; every page follows.
- Home page sections: `src/components/home/*` (Hero, Features, Process, Teachers, Tools, FinalCTA) + shared `SectionHeading`.
- Optional real photos: put `20211010_170230_edited.jpg`, `IMG_2810.JPG`, `IMG_2816.JPG`, `IMG_0759_edited.png`, `founder-director.png` in `/public` — they replace the vector art automatically.
