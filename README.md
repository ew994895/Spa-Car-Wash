# Spa Car Wash Website

Responsive marketing site for Spa Car Wash & Detailing Center. Built with React, Vite, TypeScript, and Tailwind to showcase wash packages, detailing options, testimonials, and contact/help paths. The repo also contains a **prototype** admin experience (promotions, wait times, business status) so the business can preview how real-time updates might feel before investing in a backend.

> This is a frontend-only prototype. Data that appears to be “saved” is stored in the current browser’s `localStorage`, there is no authentication, and booking submissions are not sent anywhere yet.

---

## Project Overview
- **Audience:** Spa Car Wash owners, staff, and prospective customers
- **Goals:** Present a premium brand experience, promote detailing packages, highlight promos, capture interest, and experiment with staff-controlled updates
- **What’s implemented:** A full landing page plus premium/ultimate detailing detail pages, Crisp chat embed, and demo admin overlays connected to the UI

---

## Current Features
### Visitor Experience
- Multi-section homepage (hero, wash packages, memberships, detailing showcase, testimonials, contact/help)
- Premium and Ultimate detailing pages with long-form copy and booking CTAs
- Contact helpers: call/mail/chat buttons, copy-to-clipboard contact info, embedded map link
- Booking form with validation and success state (no backend wiring yet)
- Crisp chat widget initialized with Spa Car Wash’s website ID

### Prototype Admin Widgets
- Promotion system with banner, hero insert, floating CTA, and session popup placements
- Business status ribbon (open/closed, alerts, custom notes)
- Wait-time chips for each service category
- Passcode-protected `/admin` route to open the overlays intentionally

---

## Important Limitations
- **Frontend-only state:** Promotions, status, and wait times persist only in the current browser via `localStorage`. They do not sync between devices.
- **No authentication:** Anyone who knows the shortcuts can open the admin overlays. Treat them as demo tooling, not a secure production feature.
- **Booking form is passive:** Submissions are logged to the console only. Connect email, CRM, or API handling before launch.
- **No backend/database:** The project ships as static assets. Add a backend to share data, store leads, or enforce permissions.
- **Crisp ID is hard-coded:** Update `src/layout/CrispChat.tsx` if you change Crisp workspaces.

---

## Future Improvements
1. Add authentication and route guard for admin panels.
2. Replace `localStorage` with a backend (e.g., Supabase, Firebase, custom API) so data syncs across staff devices.
3. Wire `BookingForm` to an email service, webhook, or CRM.
4. Build a dedicated admin dashboard instead of relying on keyboard shortcuts.
5. Extract marketing copy/config into JSON or CMS-driven data to simplify updates.

---

## Setup & Scripts
```bash
npm install        # install dependencies
npm run dev        # start Vite dev server (http://localhost:5173)
npm run build      # output production assets to dist/
npm run preview    # serve the production build locally
```
`setup.sh` / `setup.bat` simply wrap the install + dev commands for non-technical operators.

> Booking submissions require a POST endpoint (e.g., Formspree, Zapier, or a custom API). Configure `VITE_BOOKING_ENDPOINT` in a `.env` file to ensure requests are delivered to the business.
>
> Staff access to `/admin` requires `VITE_ADMIN_PASSCODE`. Share the passcode only with authorized employees.

---

## Project Structure
```
Spa-Car-Wash/
├── docs/                 # setup, admin, developer notes, history
├── src/
│   ├── app/              # router shell
│   ├── components/ui/    # Radix-based primitives + utilities
│   ├── features/         # booking, promotions, status, wait-times modules
│   ├── layout/           # header, footer, Crisp chat, back-to-top
│   ├── pages/            # route-level screens (home, premium, ultimate)
│   ├── sections/         # marketing sections composing the homepage
│   └── styles/           # Tailwind entry + theme CSS
├── index.html
├── package.json / lockfile
├── postcss.config.mjs
├── tsconfig.json / tsconfig.node.json
├── setup.sh / setup.bat
└── vite.config.ts
```

---

## Documentation
- `docs/setup.md` – install, scripts, deployment checklist
- `docs/admin-guide.md` – how staff should use the prototype overlays + Crisp
- `docs/developer-overview.md` – architecture, data flow, localStorage schema
- `docs/booking-integration-summary.md` – explains the booking webhook/env configuration
- `docs/ATTRIBUTIONS.md` – assets and license notes
- `docs/content-refresh-summary.md` – snapshot of the latest on-site content updates
- `docs/admin-hardening-summary.md` – outlines how the admin portal is locked down today
- `docs/reliability-audit-summary.md` – latest stability/accessibility findings
- `docs/archived/` – historical restructure/cleanup logs
- `docs/final-polish-summary.md` – this cleanup summary

---

## License / Usage
No open-source license is declared. Treat this repo as confidential client work unless a license is added.
