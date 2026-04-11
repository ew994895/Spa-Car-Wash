# Setup & Deployment

This document walks through installing, running, and deploying the Spa Car Wash marketing website. The codebase is a Vite + React SPA with Tailwind CSS and TypeScript. Admin controls (promotions, wait times, business status) are *frontend-only* and store their data in the browser's `localStorage`.

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

> The helper scripts `setup.sh` and `setup.bat` simply call `npm install` followed by `npm run dev`. They remain for convenience but are optional.

## Building & Deploying
1. Build the app:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist/` folder to your hosting platform of choice (Netlify, Vercel, static bucket, traditional hosting, etc.).

## Environment & Integrations
- **Crisp Chat** is embedded via `src/layout/CrispChat.tsx`. Update `window.CRISP_WEBSITE_ID` before shipping to production.
- No environment variables are required today; add a `.env` file only if you introduce external services.

## Known Limitations
- All admin settings are stored in the current browser's `localStorage`. Clearing browser data resets them.
- There is no authentication or server API; treat the admin overlays as demo tooling until a backend is added.
- The booking form currently logs submissions to the console. Wire it to email, a webhook, or a backend service before production launch.
