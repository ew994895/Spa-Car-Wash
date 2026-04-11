# Reliability Audit Summary (April 2026)

## Issues Found & Fixes
1. **Fragile localStorage parsing** – Promos, wait times, and status panels would throw if corrupted data was stored. Added `src/lib/storage.ts` helpers and wrapped every read/write to guard against malformed JSON and storage quota errors.
2. **Promotion banner dismissals not re-evaluated** – Dismissing a banner didn’t hide it until refresh. Added `dismissed` to the effect dependencies so filtering reacts immediately.
3. **Crisp chat was brittle** – Re-injected the script on every mount and failed silently on network errors. Now the loader runs once, reuses the existing global, and logs a clear error if the script fails to load.
4. **Admin footer advertised public keyboard shortcuts** – Replaced with a CTA pointing to the passcode-protected `/admin` route to avoid accidental access.
5. **Admin tooltip still referenced shortcuts** – Updated header tooltip and developer docs to reflect the new portal workflow.

## Reliability Improvements
- Centralized JSON storage utilities with error handling (`readJson`, `writeJson`).
- All promotion components, wait-time tools, and status admin now leverage the helpers and default gracefully when data is missing.
- Crisp loader now guards against duplicate injection and surfaces failures.
- Dismissed promotions persist reliably and update immediately.
- Setup scripts and documentation now instruct staff to use `/admin` with `VITE_ADMIN_PASSCODE` instead of hidden shortcuts.

## Accessibility & UX Tweaks
- Tooltip text clarifies how staff should update business status (no secret shortcuts).
- Admin footer copy now guides authorized users to a clearly labeled portal button instead of exposing key combos.
- Banner dismiss button already had `aria-label`; no change needed, but filtering now respects the dismiss state instantly for better UX feedback.

## Remaining Risks
- Admin portal is still client-side passcode protection with `sessionStorage`; a determined user could inspect source if they already know `/admin`.
- Promotions, wait times, and status data remain local to each device; multi-terminal sync requires a backend.
- Crisp chat still depends on the external CDN; if firewalls block it, only a console warning is shown.

## Recommended Final QA
1. Set `VITE_BOOKING_ENDPOINT` and `VITE_ADMIN_PASSCODE`, rebuild, and smoke-test `/admin` on both desktop and mobile.
2. Verify promotions/wait times/status load/reset correctly after intentionally corrupting localStorage entries (they should now self-heal).
3. Confirm Crisp chat loads in staging and that failure logs appear if the script URL is blocked.
4. Run through the full demo (wash packages → detailing → booking → admin portal) on a tablet to ensure responsive layouts still behave.
