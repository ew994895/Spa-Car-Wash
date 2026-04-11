# Developer Overview

## 1. High-Level Overview
- **What it is:** A React + Vite front-end for Spa Car Wash & Detailing Center. The site covers the full marketing journey (hero, services, testimonials, pricing, contact) and exposes in-browser admin switches (promotions, wait times, business status) so staff can keep the landing page fresh without a backend.
- **Primary goals:** Showcase wash/detailing packages, promote prepaid memberships, highlight limited-time promos, capture leads through the detail booking form, and give visitors instant access to phone/email/chat/help resources.
- **Tech stack:** Vite 6, React 18, TypeScript, Tailwind CSS v4 (via `@tailwindcss/vite`), Radix UI primitives (in `src/components/ui`), Lucide icons, Motion (for subtle animations), and Crisp Chat for live support. Styling relies on Tailwind utilities plus CSS variables defined in `src/styles/theme.css`.
- **Deployment footprint:** Everything is client-side. Data for admin overlays persists in `localStorage`, so each front-desk computer can manage promos/status/wait times independently.

## 2. Project Organization
The repository root (`Spa-Car-Wash/`) is now the true app. Key directories:
- `docs/` – onboarding, admin, and setup guides, plus internal notes/cleanup summaries.
- `src/` – application source.
- `dist/` – Vite production output (generated).
- `node_modules/` – dependencies (generated).
- Tooling files (`package.json`, `package-lock.json`, `tsconfig*.json`, `vite.config.ts`, `postcss.config.mjs`, `setup.*`).

## 3. Key Directories & Files
### Root
- `README.md` – Product/feature overview and quick start.
- `package.json` – Scripts (`dev`, `build`, `preview`) + dependency graph.
- `vite.config.ts` – React + Tailwind plugins, `@ → src` alias.
- `setup.sh` / `setup.bat` – Optional helper installers.
- `docs/` – contains this overview, the staff/admin playbook, setup instructions, attributions, and cleanup logs.

### `src/app`
- `App.tsx` – Wraps the router using `RouterProvider`.
- `routes/index.tsx` – Declares `/`, `/premium-detailing`, `/ultimate-detailing` routes.

### `src/pages`
- `Home.tsx` – Composes the marketing site + admin overlays. Handles keyboard shortcuts (`Ctrl+Shift+S/P/X`) to toggle `StatusAdmin`, `PromotionAdmin`, and `WaitTimeAdmin`.
- `PremiumDetailing.tsx` / `UltimateDetailing.tsx` – Detail pages for premium services. Share the `BookingForm` and curated packages copy.

### `src/layout`
- `Header.tsx`, `Footer.tsx`, `BackToTop.tsx`, `CrispChat.tsx` – Global chrome. `CrispChat` injects the Crisp script (`window.CRISP_WEBSITE_ID = "9ad0b13f-c4a2-4189-a644-5233bbbcf561"`) and exposes helpers so sections (e.g., Help) can open the widget.

### `src/sections`
Reusable marketing blocks for the homepage: `Hero`, `WashPackages`, `Membership`, `DetailingServicesSection`, `About`, `Testimonials`, `Contact`, `Help`, `LocationMap`. Each section is a pure presentational component that relies on the shared UI kit.

### `src/features`
Domain-specific logic grouped by concern:
- `booking/BookingForm.tsx` – Lead form (validates inputs, shows success state, logs submissions for now).
- `promotions/` – `PromotionBanner`, `PromotionPopup`, `PromotionFloating`, `PromotionDisplay`, `PromotionAdmin`. Stores promotions in `localStorage['spaCarWashPromotions']` and exposes placement-specific renderers.
- `status/StatusAdmin.tsx` – Tracks open/closed, conditions, and custom notes in `localStorage['spaCarWashStatus']`.
- `wait-times/` – `WaitTimeBadge`, `WaitTimeDisplay`, `WaitTimeAdmin`. Persists `localStorage['spaCarWashWaitTimes']` and emits browser events so badges refresh live.

### `src/components/ui`
Radix-driven primitives (buttons, dialogs, accordions, tooltips, etc.), layout helpers (cards, tabs, navigation menu), feedback components (`alert`, `skeleton`, `progress`), and utilities (`use-mobile.ts`, `utils.ts`). These provide consistent styling and interaction patterns for the marketing and admin modules.

### `src/styles`
- `index.css` – Imports fonts + Tailwind base/components/utilities.
- `tailwind.css` – Tailwind v4 setup with the animation plugin.
- `theme.css` – CSS variables + keyframes, especially for promotion widgets.
- `fonts.css` – Placeholder for future custom font embedding.

## 4. App & Admin Flows
- **Routing:**
  ```tsx
  export const router = createBrowserRouter([
    { path: '/', Component: Home },
    { path: '/premium-detailing', Component: PremiumDetailing },
    { path: '/ultimate-detailing', Component: UltimateDetailing },
  ]);
  ```
- **Homepage:** Fixed header, hero CTA, packages, membership, detailing services, testimonials, contact, location, help, footer. Admin promotions render in multiple placements (banner, hero insert, floating button, popup).
- **Detail pages:** Provide long-form copy, gallery cards, pricing, and a CTA ribbon that links back to the booking form.
- **Admin controls:** Keyboard shortcuts open overlay panels. Each panel writes to `localStorage` + dispatches a custom event so read-only widgets (status badge, wait-time chips, promo displays) update instantly.
- **Chat/help:** `Help` section buttons call `window.$crisp.push(["do", "chat:open"])` to pop the Crisp widget.

## 5. Data & Integration Notes
- Promotions: `localStorage['spaCarWashPromotions']` stores arrays of promotion cards. `PromotionDisplay` filters by placement prop.
- Wait times: `localStorage['spaCarWashWaitTimes']` stores {express, deluxe, ultimate, detailing}. Badge colors change based on thresholds.
- Business status: `localStorage['spaCarWashStatus']` stores open/closed + message. Header displays indicator + reason.
- Booking form currently logs to console; integration point for backend/email lives around `BookingForm.tsx`'s `handleSubmit`.
- Crisp chat uses site ID `9ad0b13f-c4a2-4189-a644-5233bbbcf561`. No other env vars.

### LocalStorage Schema Reference
| Key | Interface / Shape | Primary Files |
|-----|-------------------|---------------|
| `spaCarWashStatus` | `BusinessStatus` (`isOpen`, `reason`, `updatedAt`, optional `nextOpenDate` + `nextOpenTime`, `useCustomTime`) | `src/features/status/StatusAdmin.tsx` |
| `spaCarWashPromotions` | `Promotion[]` with placement flags (`banner`, `popup`, `heroTop`, `above*`, `floating`) and optional CTA data | `src/features/promotions/*` |
| `spaCarWashWaitTimes` | `WaitTimeData` -> `{ services: { serviceName, waitTime, traffic, enabled }[], updatedAt }` | `src/features/wait-times/*` |

Color thresholds for wait times live in `WaitTimeBadge.tsx` (`low < 20`, `medium < 35`, `high < 50`, `very-high ≥ 50`). Promotions apply simple date checks inside `PromotionAdmin.tsx` to hide expired campaigns.

## 6. Local Development & Build
See `docs/getting-started.md` for the canonical commands. In short:
```bash
npm install
npm run dev
npm run build
npm run preview
```
