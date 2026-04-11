# Spa Car Wash Website

A React + Vite + Tailwind marketing site for Spa Car Wash & Detailing Center. The UI showcases wash packages, long-form detailing content, testimonials, and contact/help options. It also includes **prototype** admin overlays (status, promotions, wait times) so staff can experiment with messaging before a proper backend exists.

> **Project status:** working frontend prototype. All admin data persists only in the browser’s `localStorage` and there is no authentication or server API yet.

## Table of Contents
1. [What’s Included](#whats-included)
2. [Current Limitations](#current-limitations)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Admin & Data Flow](#admin--data-flow)
7. [Roadmap Ideas](#roadmap-ideas)
8. [Documentation](#documentation)

## What’s Included
### Visitor Experience
- Responsive landing page with hero, service cards, detailing long-form content, testimonials, and contact/help CTAs
- Crisp chat widget wired to `window.CRISP_WEBSITE_ID = 9ad0b13f-c4a2-4189-a644-5233bbbcf561`
- Static booking form (validates input and shows success state)
- Map/location card, call/email buttons, and copy-to-clipboard helpers

### Staff Controls (prototype)
- Promotion placements: top banner, hero insert, floating CTA, and session popup
- Business status ribbon (open/closed + alert messaging)
- Wait-time badges for each service category
- Keyboard shortcuts (`Ctrl+Shift+S/P/X`) to open overlays directly

## Current Limitations
- **Local-only state:** Promotions, wait-times, and status data stay in the current browser via `localStorage`. Switching computers or clearing storage resets everything.
- **No authentication:** Anyone on the public site could trigger the admin overlays. Add auth or an admin route before production launch.
- **Booking form is passive:** Submissions are logged to the console only. Hook up email/CRM/webhook handling before going live.
- **Single Crisp ID:** Update `src/layout/CrispChat.tsx` if you need to point to another Crisp workspace.

## Tech Stack
| Tool | Version | Notes |
|------|---------|-------|
| React | 18.3.1 | UI library |
| React Router | 7.13.0 | Routing between landing + detail pages |
| Vite | 6.4.x | Dev server + bundler |
| Tailwind CSS | 4.1.x | Styling via `@tailwindcss/vite` |
| TypeScript | 5.6.x | Strict mode + path aliases (`@/*`) |
| Radix UI + Lucide | latest | UI primitives & icons |
| Crisp Chat | – | Embedded live chat widget |

## Getting Started
See `docs/getting-started.md` for detailed instructions. The short version:
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serves the production build
```
Support scripts `setup.sh` / `setup.bat` simply wrap the install+dev process.

## Project Structure
```
Spa-Car-Wash/
├── docs/                     # setup, admin, developer, cleanup, attributions
├── src/
│   ├── app/                  # Router shell
│   ├── components/ui/        # Radix-based primitives
│   ├── features/             # booking, promotions, status, wait-times modules
│   ├── layout/               # header, footer, Crisp chat, back-to-top
│   ├── pages/                # route-level screens (home + detail pages)
│   ├── sections/             # marketing sections that compose the homepage
│   └── styles/               # Tailwind + theme CSS
├── index.html                # root HTML shell
├── package.json              # scripts + dependencies
├── postcss.config.mjs
├── setup.bat / setup.sh
├── tsconfig.json / tsconfig.node.json
└── vite.config.ts
```

## Admin & Data Flow
- Keyboard shortcuts (Ctrl+Shift+S/P/X) toggle the admin overlays. The logic lives in `src/pages/Home.tsx`.
- Each panel writes to `localStorage` and dispatches custom events so the UI updates live:
  - `spaCarWashStatus` → header badges + hero alert
  - `spaCarWashPromotions` → top banner, hero promo slot, floating CTA, popup
  - `spaCarWashWaitTimes` → wait-time badges/cards
- Crisp chat loads globally via `src/layout/CrispChat.tsx`. Sections can open the widget by pushing `window.$crisp.push(["do", "chat:open"])`.

## Roadmap Ideas
1. Add authentication + backend persistence for promotions/status/wait-times.
2. Wire `BookingForm` to a form service, email notification, or CRM integration.
3. Centralize service/testimonial data into `src/data/` to simplify components.
4. Add automated tests (unit + integration) for the admin flows.
5. Replace keyboard shortcuts with an authenticated admin dashboard.

## Documentation
- `docs/getting-started.md` – installation, scripts, deployment
- `docs/developer-overview.md` – architecture notes and component breakdowns
- `docs/admin-guide.md` – staff instructions + limitations
- `docs/ATTRIBUTIONS.md` – asset and library credits
- `docs/restructure-summary.md` & `docs/repo-cleanup-summary.md` – history of major refactors
