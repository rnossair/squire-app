# Squire — client

Squire is a nutrition attendant. You set your daily macro targets once; Squire
tracks what's left of the day, suggests meals that fit, and keeps a record of
what you've eaten.

This is the web client — a [Next.js](https://nextjs.org) (App Router) app.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Structure

- `app/page.js` — landing page (hero previews the "what's left today" rings).
- `app/dashboard/page.js` — the daily dashboard: remaining-macro rings, meal
  suggestions, recent days.
- `app/knot-integration/page.js` — links merchant accounts via Knot.
- `app/Components/MacroRing.js` — the signature ring that depletes as you log meals.
- `app/globals.css` — design tokens (colours, type roles) live in the `@theme` block.

## Design system

- **Colour:** warm parchment canvas, heraldic herb-green + brass, and an earthen
  macro family (herb / clay / wheat / slate).
- **Type:** Bricolage Grotesque (display), Inter (body), Space Mono (numbers).

The client talks to the API at `https://squire-app.onrender.com`. Set
`NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_KNOT_CLIENT_ID` to override.
