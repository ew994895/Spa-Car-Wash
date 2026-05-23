# Admin Hardening Summary (April 2026)

## Existing Admin Features
- **Business Status** (`StatusAdmin.tsx`) – controls the open/closed ribbon, reasons, and reopening estimates.
- **Promotions** (`PromotionAdmin.tsx`) – manages hero banners, floating CTAs, and popup campaigns.
- **Wait Times** (`WaitTimeAdmin.tsx`) – updates service-time chips and detail cards.

## Access Changes
- Admin tools are no longer exposed through global keyboard shortcuts.
- Staff now visit `/admin`, enter the `VITE_ADMIN_PASSCODE`, and use a dedicated dashboard to open each overlay.
- Sessions persist in `sessionStorage` until users sign out or close the browser, preventing accidental re-entry.
- Footer messaging directs employees to the portal instead of advertising shortcuts to the public.

## Authentication / Protection
- Simple passcode gate enforced client-side via environment variable `VITE_ADMIN_PASSCODE`.
- Sign-out button clears the session key; passcode prompts reappear on refresh.
- Honeypot or rate limiting is not included—this remains a lightweight deterrent suitable for demos.

## Data Storage
- Promotions, status, and wait times continue to live in `localStorage` (`spaCarWashStatus`, `spaCarWashPromotions`, `spaCarWashWaitTimes`).
- Booking submissions are handled separately via `VITE_BOOKING_ENDPOINT` and are not part of the admin portal.

## Remaining Limitations
- Passcode validation lives entirely in the browser; motivated visitors could still inspect code to find requirements.
- No audit logging or multi-user roles.
- Data does not sync across different browsers/computers.
- Keyboard shortcuts have been removed, but anyone who guesses `/admin` and the passcode can still make changes.

## Path to Production Security
1. Replace `localStorage` with a shared backend (e.g., Supabase, Firebase, custom API) that stores promotions/status/wait times centrally.
2. Authenticate staff through a real identity provider (Auth0, Cognito, Azure AD) and issue tokens for API access.
3. Add server-side validation, audit logs, and role-based permissions (e.g., marketing vs. operations).
4. Implement rate limiting and IP restrictions if the portal becomes internet-facing.
5. Encrypt or rotate the admin passcode regularly until a full auth system is live.
