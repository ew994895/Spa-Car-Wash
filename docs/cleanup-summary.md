# Cleanup Summary

## Major Structural Changes
- Reorganized `src/` to separate `app/`, `components/` (with `layout`, `sections`, `features`, `ui`), and `pages/` so the project matches a standard React layout and newcomers can navigate by concern.
- Moved the UI kit from `src/app/components/ui` to `src/components/ui` and updated every import to use the existing `@` alias for clarity.
- Relocated page components from `src/app/pages` to `src/pages` and updated `src/app/routes/index.tsx` to consume the new paths.
- Converted `src/app/routes.tsx` into `src/app/routes/index.tsx` to better reflect its folder’s purpose.
- Renamed `DetailingServicesNew.tsx` to `components/sections/DetailingServicesSection.tsx`, renamed the exported component, and updated every consumer to remove the confusing "New" suffix.

## Component and Feature Organization
- Grouped layout pieces (`Header`, `Footer`, `CrispChat`, `BackToTop`) under `components/layout`.
- Grouped marketing/section blocks (`Hero`, `WashPackages`, `Membership`, `Contact`, etc.) under `components/sections` to match the landing page order.
- Created `components/features` with focused subfolders:
  - `booking/BookingForm.tsx`
  - `promotions/Promotion*`
  - `status/StatusAdmin.tsx`
  - `wait-times/WaitTime*`
- Updated all feature imports to point to the new folders, including the header badge integrations and the Home page composition.

## Removals and Renames
- Deleted the dead `src/app/components/DetailingServices.tsx` file, the unused `src/app/components/figma/ImageWithFallback.tsx`, and the entire `src/imports/` dump of pasted text since nothing referenced them.
- Removed stray `.DS_Store` files across the repo.
- Renamed `Guidelines.md` to `docs/TEAM_GUIDELINES.md` to better convey its purpose.

## Documentation Cleanup
- Collected every secondary markdown guide into a new `docs/` directory (`ADMIN_*`, `ATTRIBUTIONS`, `CRISP_SETUP_GUIDE`, etc.) so the repo root now contains only project-critical files.
- Updated `README.md` with the new tree, refreshed documentation links to point into `docs/`, and mentioned the reorganized structure.

## Tooling & Dependencies
- Added `dev` and `preview` scripts to `package.json` so the commands advertised in the docs work without manual edits.
- Promoted `react` and `react-dom` from peer dependencies into the main dependency list, removed the peer metadata block, and re-ran `npm install` to refresh `package-lock.json`.

## Verification
- Ran `npm run build` after the refactor; Vite completed successfully, confirming the UI still bundles with the new structure.

## Uncertainties / Deferred Items
- All marketing data (wash packages, testimonials, detailing packages) still lives inline inside their components. Centralizing into `src/data/` would be a nice follow-up but was out of scope for this cleanup.
- The promotion/wait-time/admin flows continue to rely on `localStorage`. A future enhancement could abstract those helpers into `lib/` or a lightweight backend if shared persistence is required.

## Recommended Next Steps
1. Extract the large static data arrays into dedicated files under a new `src/data/` module to reduce component size.
2. Consider adding a `tsconfig.json` with matching `paths` so editors can resolve the `@/*` imports without relying solely on Vite.
3. Review the `docs/` folder and merge overlapping guides if you want a leaner documentation set for the team.
