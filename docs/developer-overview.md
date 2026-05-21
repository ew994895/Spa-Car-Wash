# Developer Overview

## Overview
- React + Vite front end for Spa Car Wash & Detailing Center
- Marketing pages plus a passcode-gated `/admin` route
- Client-side only; admin state persists in `localStorage`

## Stack
- React 18
- Vite 6
- TypeScript
- Tailwind CSS v4
- `react-router-dom`
- `lucide-react`

## Structure
- `src/app` bootstraps routing
- `src/pages` contains route-level screens
- `src/sections` contains homepage sections
- `src/features` groups booking, promotions, status, and wait-times logic
- `src/layout` contains shared chrome and Crisp chat setup
- `src/components/ui` is intentionally small now: only `button`, `card`, and `utils`

## Routes
```tsx
createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/premium-detailing", Component: PremiumDetailing },
  { path: "/ultimate-detailing", Component: UltimateDetailing },
  { path: "/admin", Component: Admin },
]);
```

## Data
- `spaCarWashStatus` powers the business-status UI
- `spaCarWashPromotions` powers banners, popups, and promo placements
- `spaCarWashWaitTimes` powers badges and wait-time displays
- `BookingForm.tsx` posts to `VITE_BOOKING_ENDPOINT`

## Local Development
```bash
npm install
npm run dev
npm run build
npm run preview
```
