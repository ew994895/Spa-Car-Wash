# Car Wash Project Notes

## 1. High-Level Overview
- **What it is:** The `FigmaWebsite` folder is a React + Vite front-end rewrite of the Spa Car Wash & Detailing Center marketing site. It includes a full marketing funnel (hero, services, testimonials, contact) plus several in-browser admin tools for staff.
- **Purpose of the website:** Showcase wash/detailing packages, sell prepaid memberships, highlight promos, and capture leads for premium and ultimate detailing appointments through an on-page booking form (`src/app/components/BookingForm.tsx`). It also surfaces real-time-like info such as business status, wait times, and staff-managed promotions.
- **Likely tech stack:** Vite 6 + React 18 + TypeScript, Tailwind CSS v4 (via `@tailwindcss/vite`), Radix UI primitives (all components in `src/app/components/ui`), Lucide icons, and assorted UI helpers like `class-variance-authority`. Styling relies heavily on Tailwind utility classes plus custom CSS variables in `src/styles/theme.css`. Crisp Chat provides live chat integration.
- **Project organization:**
  - `/FigmaWebsite` holds the actual app, assets, and documentation.
  - `/FigmaWebsite/src/app` contains the React entry point (`App.tsx`), routes (`routes.tsx`), page-level components (`pages/`), and reusable sections/components (`components/`).
  - `/FigmaWebsite/src/styles` defines Tailwind imports and theming.
  - Numerous markdown guides at the project root (e.g., `README.md`, `QUICK_START.md`, `ADMIN_*` guides) explain setup and admin workflows for non-developers.

## 2. Full Folder and File Breakdown
### Root (`FigmaWebsite/`)
- `README.md`, `QUICK_START.md`, `SETUP_AND_DEPLOYMENT_GUIDE.md`, `ADMIN_*` and other guides: walk staff through setup, keyboard shortcuts for admin overlays, Crisp chat, promotions, etc. These match the functionality found in the React components.
- `package.json`: Declares dependencies (React listed as peer dependency only), scripts (`build` only), and Tailwind/Vite toolchain.
- `vite.config.ts`: Configures Vite with React + Tailwind plugins and aliases `@` → `src`.
- `setup.sh` / `setup.bat`: Helper scripts referenced in the docs for one-command installs.
- `src/`: Main application source.

### `src/app`
- `App.tsx`: Minimal entry that injects the router: `RouterProvider router={router}`.
- `routes.tsx`: Defines three routes—`/` (Home), `/premium-detailing`, and `/ultimate-detailing`—and maps them to components in `src/app/pages`.
- `pages/Home.tsx`: Composes the landing page by importing header/hero/sections plus admin overlays. It wires up keyboard shortcuts for the admin panels (Ctrl+Shift+S/P/X) and manages whether those overlays show.
- `pages/PremiumDetailing.tsx` and `pages/UltimateDetailing.tsx`: Full-screen detail pages for the two premium packages. They both reuse `BookingForm` for lead capture, display curated content arrays describing services, and navigate back to `/` via `useNavigate`.

### `src/app/components`
- **Layout & navigation:** `Header.tsx` (top nav, contact info, promotions, wait-time badge, status banner) and `Footer.tsx` (contact info, quick links, admin shortcut reminders).
- **Marketing sections:** `Hero`, `WashPackages`, `Membership`, `DetailingServicesNew`, `About`, `Testimonials`, `Contact`, `Help`, `LocationMap`, `BackToTop`.
- **Admin/utility overlays:** `PromotionBanner`, `PromotionPopup`, `PromotionFloating`, `PromotionDisplay`, `PromotionAdmin`, `WaitTimeBadge`, `WaitTimeDisplay`, `WaitTimeAdmin`, `StatusAdmin`. All persist state in `localStorage` and communicate via custom browser events.
- **Lead capture:** `BookingForm` (collects contact info and logs submissions to the console only), `Contact` (phone/email/map), Crisp chat integration (`CrispChat.tsx`).
- **UI kit (`components/ui/`):** Radix-based primitives (button, dialog, tabs, accordion, tooltip, etc.) and helper utilities (`utils.ts`, `use-mobile.ts`). These support consistent styling across custom sections.
- **Utilities:** `PromotionDisplay`/`PromotionBanner` rely on the `Promotion` type exported from `PromotionAdmin.tsx`, showing the shared nature of the promotion system.

### `src/styles`
- `index.css`: Bundles fonts, Tailwind base, and theme layers.
- `tailwind.css`: Enables Tailwind v4 with file scanning and imports an animation plugin (`tw-animate-css`).
- `theme.css`: Defines CSS variables for colors, spacing, animations, and custom keyframes used by the promotion widgets.
- `fonts.css`: Placeholder for custom font-face declarations (currently empty).

### `src/imports/pasted_text`
- Markdown/HTML snippets that look like raw content dumps from the legacy site. They are not imported anywhere yet but could be used for further content seeding.

## 3. App/Page Structure
- **Routes (`src/app/routes.tsx`):**
  ```tsx
  export const router = createBrowserRouter([
    { path: '/', Component: Home },
    { path: '/premium-detailing', Component: PremiumDetailing },
    { path: '/ultimate-detailing', Component: UltimateDetailing },
  ]);
  ```
- **Home page flow (`pages/Home.tsx`):** Fixed header + hero with CTA buttons, marketing blocks (wash packages, membership, detailing services, about, testimonials, contact, help), and multiple promotion placements. Navigation within the page is through anchor scrolling (buttons call `scrollIntoView` for IDs like `#packages`, `#detailing`, `#membership`).
- **Premium/Ultimate pages:** Each page highlights one service, displays curated lists (features, benefits, day-by-day breakdowns), and includes an inline `BookingForm` plus CTAs to call or navigate back to membership info. Query parameters (`?package=`) power the Premium page so visitors can switch packages in-page.
- **Navigation:** Most navigation is intra-page scrolling handled by buttons in `Header.tsx` and `Footer.tsx`. React Router handles the transition to dedicated `/premium-detailing` or `/ultimate-detailing` pages via `useNavigate` calls from buttons/cards.
- **User interactions available now:** exploring packages, toggling promotions, triggering Crisp chat, copying contact info, viewing wait-time cards, and submitting the booking form (which currently just logs and shows a success card). Admin keyboard shortcuts expose overlay panels for promotions, wait times, and business status.

## 4. Component Breakdown
| Category | Component(s) | Responsibility | Used On |
| --- | --- | --- | --- |
| Layout | `Header.tsx`, `Footer.tsx`, `BackToTop.tsx` | Global chrome, nav, in-page scrolling helpers, admin shortcut reminders | Home (and by extension every route via composition) |
| Hero/Marketing | `Hero`, `WashPackages`, `Membership`, `DetailingServicesNew`, `About`, `Testimonials`, `Contact`, `Help`, `LocationMap` | Present content for each service vertical, membership tiers, testimonials, contact info, map & help portal | Home |
| Promotions | `PromotionBanner`, `PromotionDisplay`, `PromotionPopup`, `PromotionFloating` | Surface staff-authored promos in different placements based on placement keys and `localStorage` data | Banner (global), hero, above-section slots, floating button |
| Admin Tools | `PromotionAdmin`, `WaitTimeAdmin`, `StatusAdmin`, `WaitTimeBadge`, `WaitTimeDisplay` | Provide modal overlays to manage promotions, wait times, business status, and update UI via browser events/localStorage | Triggered from Home keyboard shortcuts; data rendered in `Header`, `DetailingServicesNew`, etc. |
| Lead Capture | `BookingForm`, CTA buttons in `Contact`, `Help`, `Membership` | Collect booking requests, deep-link to tel/mail/chat, copy contact details | Premium/Ultimate pages + inline CTAs |
| Integrations | `CrispChat`, `LocationMap` | Crisp chat script injection, Google Maps iframe & geolocation for driving directions | Home |
| UI Kit | Files under `components/ui/` | Provide styled primitives (button, card, dialog, tabs, etc.) used throughout for consistent feel | Shared |

## 5. Styling System
- Tailwind CSS v4 handles utility classes. Global imports happen in `src/styles/index.css`, which pulls in fonts, Tailwind, and theme definitions.
- `src/styles/theme.css` defines CSS variables (colors, spacing, radii) for light/dark schemes and exposes them via Tailwind's `@theme inline`. It also provides custom keyframes and helper classes like `.animate-slideDown` used by promotion widgets.
- The components mix Tailwind utility classes with gradient backgrounds, e.g., `className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"` inside `WashPackages.tsx`.
- Tailwind plugin `tw-animate-css` supplies pre-built animations, and `class-variance-authority` plus `cn` utility streamline styling for UI primitives like `Button` (`components/ui/button.tsx`).
- There are no SCSS/styled-components; everything is utility-driven with a small set of CSS variables for branding.

## 6. Data and Logic
- **Static data arrays:** Service descriptions live directly in components such as `WashPackages.tsx`, `Membership.tsx`, `DetailingServicesNew.tsx`, `PremiumDetailing.tsx`, and `UltimateDetailing.tsx`. Each array contains names, prices, features, benefits, and CTA copy.
- **LocalStorage-backed state:**
  - Promotions (`PromotionAdmin.tsx`) persist to `localStorage['spa_promotions']`. Displays filter them by placement, activity window, and display mode before rendering.
  - Wait times (`WaitTimeAdmin.tsx`) persist to `localStorage['spa-wait-time-data']` and emit a `waitTimeUpdated` custom event so `WaitTimeBadge` (header) and `WaitTimeDisplay` (detail section) stay in sync.
  - Business status (`StatusAdmin.tsx`) saves to `localStorage['spaCarWashStatus']`. `Header.tsx` reads this to show OPEN/CLOSED badges and closure reasons.
- **Events & side effects:** Admin overlays dispatch browser events (`statusUpdated`, `promotionsUpdated`, `waitTimeUpdated`) so passive display components can refresh without prop drilling.
- **Hooks:** Standard React hooks manage state/resizing. Example: `Home.tsx` uses `useEffect` to register keyboard shortcuts and `useState` to toggle admin modals.
- **No API calls:** All “live” data is either hardcoded or stored in the browser. The Crisp integration is the only external network call, and it's handled by embedding a script tag.
- **Form handling:** `BookingForm.tsx` validates required fields, logs the submission, shows a success message, and resets after 3 seconds. There is no backend or email handler yet.

## 7. Booking / Integration Findings
- **Booking buttons:** `Hero`, `Membership`, Premium/Ultimate pages, and `BookingForm` contain CTA buttons. Most `Button` clicks either open tel links (`window.open('tel:610-695-0711')`), scroll to sections, or navigate to membership info via `useNavigate`.
- **Booking form limitations:** Submissions never leave the browser—they are `console.log`'d in `BookingForm.tsx`. The success state is purely UI, so no staff will actually receive the booking request without hooking up an API or email service.
- **Crisp chat (`components/CrispChat.tsx`):** Automatically injects the Crisp script with site ID `9ad0b13f-c4a2-4189-a644-5233bbbcf561`. `Help.tsx` can open the chat window via `window.$crisp.push(["do","chat:open"])`.
- **Location/map:** `LocationMap.tsx` uses a Google Maps iframe plus the browser geolocation API to open directions in a new tab.
- **External links:** Membership “Buy Now” buttons open the DRB Systems prepaid card purchase site (`https://websiteconnect.drb.com/spacarwash/BUY-A-PREPAID`). CTAs frequently reference `tel:`/`mailto:` links.
- **Booking status:** There is **no real booking or scheduling integration today**—only UI placeholders encouraging contact.

## 8. Current Completion Status
- **Feels complete:** Marketing content, layout, responsive sections, Crisp chat integration, promotion/ wait-time/status overlays (from a UI standpoint), and the premium/ultimate detail pages with fully written copy.
- **Still in-progress or placeholder:**
  - Booking form lacks backend submission or email notification.
  - Promotions/wait times/status persist only per browser via `localStorage`, so different devices won't see the same updates.
  - `package.json` is missing `react`/`react-dom` in `dependencies` and lacks a `dev` script, which could confuse new developers despite docs referencing `npm run dev`.
  - `src/imports/pasted_text/*` content is unused.
  - No automated tests or linting configuration are present.
  - There is no asset optimization/pipeline for images—everything uses external URLs.

## 9. How to Run the Project
1. **Install prerequisites**
   - Install **Node.js 18 or newer** from https://nodejs.org/.
   - Install **pnpm** or keep npm (the docs assume npm, so steps below use npm).
2. **Open the project folder**
   ```bash
   cd /Users/ethanwitkowski/Desktop/CarWash/FigmaWebsite
   ```
3. **Install dependencies**
   ```bash
   npm install
   npm install react react-dom   # they are only peerDependencies, so install once manually
   ```
4. **(Optional) add a dev script**
   - Edit `package.json` → `scripts` and add `"dev": "vite"` so `npm run dev` works exactly like the docs say. If you skip this, run Vite manually in the next step.
5. **Start the development server**
   ```bash
   npx vite dev
   # or, if you added the script: npm run dev
   ```
6. **Open the site**
   - Visit `http://localhost:5173/` in your browser. React Router handles `/`, `/premium-detailing`, and `/ultimate-detailing`.
7. **Build for production (optional)**
   ```bash
   npm run build
   ```
   - Vite writes optimized assets into `dist/`.
8. **Environment variables**
   - None required; Crisp chat uses the embedded ID and admin data lives in the browser.

