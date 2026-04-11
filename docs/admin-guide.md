# Admin & Staff Guide

This site ships with browser-based admin overlays so front-desk staff can update messaging during the day. These tools are **not authenticated** and **store everything in localStorage**—treat them as a prototype until a secure backend is built.

## Accessing Admin Panels
- Focus the website tab, then use the following shortcuts:
  - `Ctrl+Shift+S` – Business status (open/closed, alerts, custom message)
  - `Ctrl+Shift+P` – Promotions manager (create/edit promo cards)
  - `Ctrl+Shift+X` – Wait-time manager (update service estimates)
- Shortcuts use the `Ctrl` key even on macOS.
- Each overlay has a close button; data saves automatically when you submit a form inside the panel.

### Where data is stored
| Data | Storage key | Notes |
|------|-------------|-------|
| Business status | `spaCarWashStatus` | Controls header badge and announcement text |
| Promotions | `spaCarWashPromotions` | Feeds banner, hero promo slot, floating button, popup |
| Wait times | `spaCarWashWaitTimes` | Powers header badges and wait-time cards |

Clearing browser storage or using another computer results in a fresh state.

## Daily Usage Checklist
1. Open the website on the front-desk computer.
2. Press `Ctrl+Shift+S` → mark the business as OPEN or CLOSED and add any alerts (weather, maintenance, etc.).
3. Press `Ctrl+Shift+X` → enter current wait times for Express, Deluxe, Ultimate, and Detailing services.
4. Optional: `Ctrl+Shift+P` → rotate promotions or highlight same-day specials.
5. Throughout the day, repeat Step 3 when wait times change. At closing, update the status panel to CLOSED.

## Crisp Chat
- Crisp is embedded globally via `src/layout/CrispChat.tsx` with website ID `9ad0b13f-c4a2-4189-a644-5233bbbcf561`.
- To update the ID:
  1. Log into https://app.crisp.chat/
  2. Copy the Website ID from Settings → Websites
  3. Replace the ID inside `CrispChat.tsx`
- Staff can open the chat manually from the Help section or by running `window.$crisp.push(["do", "chat:open"])` in the browser console.

## Limitations & Future Hardening
- Anyone with access to the public site can trigger the shortcuts; add authentication or an admin route before launch.
- Promotions and wait times are not shared across devices; a lightweight backend or Firebase store would be needed for multi-device sync.
- Booking form submissions currently log to the console; integrate email, CRM, or webhook delivery for production.
