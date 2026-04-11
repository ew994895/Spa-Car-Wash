# Deployment & Handoff Summary

## 1. Local Development
```bash
git clone <repo-url> spa-car-wash
cd spa-car-wash
npm install
npm run dev  # http://localhost:5173
```
- Use `npm run build` followed by `npm run preview` to sanity-check the production bundle locally.

## 2. Environment Variables
Create `.env` (and configure the same variables in Netlify/Vercel):
```
VITE_ADMIN_PASSCODE=<staff passcode>
VITE_BOOKING_ENDPOINT=https://example.com/booking-webhook
```
- `VITE_ADMIN_PASSCODE` unlocks `/admin`. Rotate it any time staff change.
- `VITE_BOOKING_ENDPOINT` should accept JSON POSTs (Formspree, Zapier, Make, custom API). If absent or returning non-2xx, the UI tells guests to call 610-695-0711.
- Update `window.CRISP_WEBSITE_ID` in `src/layout/CrispChat.tsx` if the business uses a different Crisp workspace.

## 3. Building & Deploying
1. `npm run build` – outputs static assets to `dist/`.
2. Deploy `dist/` to any static host (Netlify, Vercel, S3, etc.). For Netlify/Vercel:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add the two environment variables above in the project settings.
3. After deploy, visit `/admin`, enter the passcode, and verify you can update promotions, wait times, and status.
4. Submit a booking test to ensure the webhook receives JSON payloads.

## 4. Application Architecture Highlights
- **Public site** – React + Vite SPA with hero, wash packages, detailing showcase, testimonials, contact, and help sections. Promotions display in the hero, banner, floating CTA, and popup placements.
- **Booking form** – Client-side validation + honeypot. POSTs to `VITE_BOOKING_ENDPOINT`; errors instruct guests to call instead of silently failing.
- **Admin portal (`/admin`)** – Passcode-protected dashboard that opens Business Status, Promotions, and Wait Time overlays. Session stored in `sessionStorage` until sign-out.
- **Data storage** – Promotions, wait times, and business status persist in `localStorage` on each browser. Booking submissions and Crisp chat rely on external services.

## 5. Staff Operations
- Direct staff to `/admin`. They must enter the shared passcode before updating banners, wait times, or status.
- Booking leads appear wherever `VITE_BOOKING_ENDPOINT` sends them (e.g., email, CRM, Slack). Confirm the destination is monitored.
- Promotions, wait times, and status are local only. If multiple front-desk computers are used, they must be updated individually until a shared backend is implemented.

## 6. Remaining Considerations
- Add a backend or cloud store for promotions/status/wait times if multi-device sync is required.
- Replace the passcode gate with real authentication for production.
- Configure uptime monitoring or email alerts for the booking endpoint to catch failures quickly.
- Keep Crisp credentials up to date and confirm the script is allowed on the target network.
