# Admin & Staff Guide

The Spa Car Wash site now exposes all management tools through the dedicated `/admin` route. Updates still save to the current browser's `localStorage`, but access is gated by a passcode so only staff can open the overlays during demos or daily ops.

## Accessing Admin Panels
1. Visit `https://<your-domain>/admin` (link is also in the site footer under “Staff Admin Portal”).
2. Enter the passcode defined in `VITE_ADMIN_PASSCODE` (management controls distribution).
3. After unlocking, use the dashboard buttons to open:
   - **Business Status** – toggle open/closed, weather alerts, and next reopening time.
   - **Promotions** – edit hero banners, floating CTA, and pop-up offers.
   - **Wait Times** – adjust estimated times for Express, Deluxe, Ultimate, and Detailing services.
4. Click “Sign Out” when you’re done or close your browser to clear the session.

_The portal remembers your session in `sessionStorage` until you log out or close the tab._

### Where data is stored
| Data | Storage key | Notes |
|------|-------------|-------|
| Business status | `spaCarWashStatus` | Powers header badge + alert ribbon |
| Promotions | `spaCarWashPromotions` | Drives banner, hero insert, floating CTA, popup |
| Wait times | `spaCarWashWaitTimes` | Feeds wait-time chips and cards |

Clearing browser storage or using another computer results in a fresh state. Keep a shared spreadsheet or take screenshots if multiple locations need to stay in sync.

## Daily Usage Checklist
1. Unlock the `/admin` portal when you arrive.
2. Open **Business Status** → set OPEN or CLOSED and add any weather notes.
3. Open **Wait Times** → enter the latest estimates for each service tier.
4. Optional: update **Promotions** to highlight any same-day specials or reminders.
5. Throughout the day, revisit Wait Times if the lobby fills up. At closing, flip Business Status to CLOSED and set the next opening time.

## Crisp Chat
- Crisp remains embedded globally via `src/layout/CrispChat.tsx` (ID `9ad0b13f-c4a2-4189-a644-5233bbbcf561`).
- Update the ID whenever you switch Crisp workspaces.
- Staff can still trigger the widget from the Help section or by running `window.$crisp.push(["do", "chat:open"])` in the console for testing.

## Limitations & Future Hardening
- Data is still local to the browser. For multi-terminal consistency, add a shared backend or cloud store.
- Passcode protection is client-side only; use unique URLs and change the passcode regularly until a real auth service is added.
- Booking submissions now POST to `VITE_BOOKING_ENDPOINT`, but promotions/status/wait times still rely on localStorage.
- Consider adding audit logs, role-based access, and automatic logout timers for production deployments.
