# Setup & Deployment

This document covers local development and deployment for the Spa Car Wash site. The app is a Vite + React SPA. Admin controls remain frontend-only and store their data in browser `localStorage`.

## Requirements
- Node.js 18 or newer
- npm 9+
- macOS, Windows, or Linux workstation with Git access

## Installation
```bash
git clone <repo-url> spa-car-wash
cd spa-car-wash
npm install
```

## Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on http://localhost:5173 |
| `npm run build` | Generate production assets in `dist/` |
| `npm run preview` | Preview the production build locally |

## Building & Deploying
1. Build the app:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist/` folder to your hosting platform of choice (Netlify, Vercel, static bucket, traditional hosting, etc.).

## Environment & Integrations
- **Crisp Chat** is embedded via `src/layout/CrispChat.tsx`. Update `window.CRISP_WEBSITE_ID` before shipping to production.
- **Booking endpoint** – set `VITE_BOOKING_ENDPOINT` in a `.env` file to the HTTPS endpoint that should receive booking requests (Formspree, Zapier, custom API, etc.). Without it, the form will show an error and instruct the user to call.
- **Admin portal** – set `VITE_ADMIN_PASSCODE` in the same `.env` file. Staff must enter this passcode on `/admin` to unlock business status, promotion, and wait-time controls.

## Known Limitations
- All admin settings are stored in the current browser's `localStorage`. Clearing browser data resets them.
- The `/admin` route is gated by a passcode only; add a real auth provider before production.
- Booking submissions depend on an external endpoint (`VITE_BOOKING_ENDPOINT`). If it is unreachable, guests are prompted to call instead; add a backend for guaranteed delivery.
