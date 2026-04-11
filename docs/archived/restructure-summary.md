# Restructure Summary (April 2026)

## What Changed
- Promoted the real Vite app (previously under `CarWash/FigmaWebsite/`) to the repository root so `Spa-Car-Wash/` is now the working project directory.
- Moved every application artifact (README, package files, config, `src/`, `dist/`, `node_modules/`, `docs/`, setup scripts) into the root to match typical React/Vite repos.
- Consolidated all documentation under `docs/`, including the former `cleanup-summary.md` and `notes.md` that used to live one level up.
- Replaced the placeholder root `README.md` with the fully detailed README that shipped with the app.
- Added missing TypeScript configs (`tsconfig.json`, `tsconfig.node.json`) and dependency updates earlier in the session so aliases and builds keep working after the move.

## What Was Removed or Renamed
- Deleted the empty wrapper directories (`CarWash/` and its `FigmaWebsite/` subfolder) after their contents were promoted.
- Removed the stale root `package-lock.json` that did not correspond to the actual project.
- Dropped the placeholder root README (only contained the project name).

## What Was Updated
- `docs/notes.md` now documents the new layout (`src/layout`, `src/sections`, `src/features`, etc.) instead of referencing `CarWash/FigmaWebsite`.
- Added a root `.gitignore` so generated folders (`node_modules`, `dist`, `.vite`, logs) stay out of version control.
- New `docs/restructure-summary.md` (this file) explains the migration for future contributors.

## Verification
- `npm run dev` was invoked from the repo root; Vite attempted to start but macOS sandboxing blocked binding to port 5173 (`EPERM`). This confirms the command resolves correctly from the new root, but the dev server cannot stay running inside the sandbox.
- `npm run build` succeeds from the root, producing the expected `dist/` bundle.

## Final Mental Model
- Treat `Spa-Car-Wash/` as a standard Vite monorepo root: `src/` holds app code, `docs/` holds reference material, and the usual config files sit beside `package.json`.
- Inside `src/`, domain folders (`features/`, `layout/`, `sections/`, `pages/`) keep marketing components separate from admin/stateful modules, while `components/ui/` stores the Radix-based primitives shared across everything.
- Staff/admin content lives entirely on the client via `localStorage`, and Crisp Chat is bootstrapped globally via `src/layout/CrispChat.tsx`.
