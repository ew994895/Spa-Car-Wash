# Repository Cleanup Summary (April 2026)

## Files Removed
- Legacy docs: `ADMIN_ACCESS_GUIDE.md`, `ADMIN_CHEAT_SHEET.md`, `CRISP_SETUP_GUIDE.md`, `DEVELOPER_NOTES.md`, `FINAL_UPDATES_SUMMARY.md`, `NEW_FEATURES_SUMMARY.md`, `PRINT_THIS_FOR_STAFF.md`, `PROMOTION_CONTROLS_GUIDE.md`, `QUICK_START.md`, `SETUP_AND_DEPLOYMENT_GUIDE.md`, `TEAM_GUIDELINES.md`, `WAIT_TIME_GUIDE.md`, `WEBSITE_FEATURES_BREAKDOWN.md`, and `cleanup-summary.md` (content merged into the new canonical guides below).
- Mac system junk: `.DS_Store` at the repo root.

## Docs Added / Renamed
- `docs/developer-overview.md`: renamed from `notes.md` and expanded with localStorage schema details.
- `docs/getting-started.md`: consolidated setup + deployment instructions.
- `docs/admin-guide.md`: single source of truth for staff shortcuts, data keys, and Crisp chat notes.
- `docs/repo-cleanup-summary.md`: this report.

## Docs Retained
- `docs/ATTRIBUTIONS.md`
- `docs/restructure-summary.md`

## README Changes
- Rewrote the README to remove “production-ready” claims, describe the prototype nature of the admin tools, and outline real vs. future functionality.
- Updated features, limitations, setup, structure, and roadmap sections to match the current codebase.

## `.gitignore` Changes
- Added entries for `.env*`, coverage reports, IDE folders, `.vercel/`, `.parcel-cache/`, and other common local artifacts so junk files stay untracked.

## Accuracy Fixes
- Documentation now explains that admin overlays rely on `localStorage`, keyboard shortcuts require no auth, and booking submissions are console-only.
- Crisp chat instructions were trimmed to a concise section inside `docs/admin-guide.md` and the README data-flow section.

## Items Left Unchanged on Purpose
- Existing setup scripts (`setup.sh`, `setup.bat`) remain for teams that still use them.
- `docs/restructure-summary.md` stays as historical context for the earlier refactor.
- The client-only admin flow is still implemented exactly as before; this cleanup only touched docs + repo hygiene.

## Verification
- `npm run build` completed successfully from the repo root.
- `npm run dev` was not left running because the macOS sandbox blocks binding to port 5173 in this environment; run it locally to double-check the dev server.
