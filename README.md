# Spa Car Wash Website

Marketing site and lightweight staff admin prototype for Spa Car Wash & Detailing Center. Built with React, Vite, TypeScript, and Tailwind.

## What’s Here
- Homepage plus premium and ultimate detailing pages
- Booking request form with client-side validation
- Passcode-gated `/admin` area for promotions, business status, and wait times
- Crisp chat embed for support

## Constraints
- Admin data is browser-local via `localStorage`
- `/admin` is protected by a client-side passcode, not real auth
- Booking requests require `VITE_BOOKING_ENDPOINT`; without it the form falls back to phone instructions

## Commands
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Environment
- `VITE_BOOKING_ENDPOINT` for booking submissions
- `VITE_ADMIN_PASSCODE` for `/admin`

## Structure
```text
src/app        router shell
src/components minimal shared UI primitives
src/features   booking, promotions, status, wait-times
src/layout     header, footer, Crisp chat, back-to-top
src/pages      route screens
src/sections   homepage sections
src/styles     global CSS and theme files
```

## Docs
- `docs/setup.md`
- `docs/admin-guide.md`
- `docs/developer-overview.md`
- `docs/ATTRIBUTIONS.md`
