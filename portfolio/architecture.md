## Architecture Overview

**Project:** Desktop-style portfolio built with React + TypeScript + Vite.

**Purpose:** Provide a self-contained, desktop-like UI showcasing projects, a resume PDF, and small terminal-style panels. The app mimics a login → boot → desktop flow and exposes modular panels for content and demos.

---

## Tech stack

- **Framework:** React 19
- **Language:** TypeScript
- **Bundler / Dev server:** Vite
- **Linting:** ESLint

---

## High-level app flow

- App entry: `src/main.tsx` — mounts the React tree.
- Top-level: `src/App.tsx` — manages current screen (`login`, `boot`, `desktop`) and transitions.
- Screens:
  - `src/screens/LoginScreen.tsx` — initial screen where user triggers login.
  - `src/screens/BootScreen.tsx` — simulated boot sequence.
  - `src/screens/DesktopScreen.tsx` — main desktop UI with panels and overlay.

State transitions are handled locally in `App.tsx` using `useState` and a `fadeTo` helper that sets visibility flags and a 400ms timeout for transition animations.

---

## Key components & purpose

- `src/screens/DesktopScreen.tsx`: orchestrates desktop layout, top bar, workspaces, clock, and a timed welcome overlay.
- `src/panels/RangerPanel.tsx`: left-column content panel (file list/navigation demo).
- `src/panels/NvimPanel.tsx`: main editor-like content panel showing code or content.
- `src/panels/BtopPanel.tsx`: bottom-left system/monitoring demo panel.
- `src/panels/HtopPanel.tsx`: bottom-right system/monitoring demo panel.
- `src/ui/WelcomeOverlay.tsx`: dismissible overlay that appears shortly after the desktop loads.
- `src/data/portfolio.ts`: central data file for projects/content (edit here to change displayed portfolio items).

Each panel is intentionally self-contained and stateless where possible; parent components provide props and visibility control.

---

## Data & assets

- Resume PDF: `SoftwareResumV4.9.pdf` is imported in `DesktopScreen.tsx` — update the file in the project root/public folder if you want a different resume.
- Content: update `src/data/portfolio.ts` to change projects, descriptions, links, and metadata.

---

## Styling & layout

- Global styles: `src/index.css` and `src/App.css` define fonts, layout grid, and the desktop visual system.
- Screens and panels use class-based styles for transitions: `.screen--active`, `.screen--fading`, etc.

---

## Dev notes and gotchas

- React `StrictMode` is enabled in `src/main.tsx`. In development this causes certain components and hooks (including `useEffect`) to run twice to detect side-effects. This is expected and only happens in dev. To disable during dev, remove the `<StrictMode>` wrapper.
- Timers and intervals: `DesktopScreen.tsx` uses `setInterval` for the clock and `setTimeout` for the overlay. Confirm cleanup in `useEffect` (they currently clear on unmount).
- HMR (Vite) will refresh components; during development you may see components re-mount as code changes.

---

## File map (important files)

- `src/main.tsx` — app bootstrap and React root.
- `src/App.tsx` — top-level screen state and transitions.
- `src/screens/LoginScreen.tsx` — login UI.
- `src/screens/BootScreen.tsx` — boot sequence UI.
- `src/screens/DesktopScreen.tsx` — desktop layout, clock, overlay, and panel composition.
- `src/panels/*` — modular panels (`RangerPanel`, `NvimPanel`, `BtopPanel`, `HtopPanel`).
- `src/ui/*` — small UI components like `WelcomeOverlay`.
- `src/data/portfolio.ts` — portfolio data.
- `package.json` — scripts and dependencies. Useful scripts:
  - `npm run dev` — start development server (Vite)
  - `npm run build` — build for production
  - `npm run preview` — preview production build

---

## How to run (developer quick start)

Open a terminal in the project root and run:

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (typically `http://localhost:5173`).

---

## Customization points

- Change visible portfolio content: `src/data/portfolio.ts`.
- Replace resume PDF: update `SoftwareResumV4.9.pdf` in the project and the import in `DesktopScreen.tsx`.
- Adjust transitions: `src/App.tsx` controls the `fadeTo` timeout and visibility flags.
- Disable StrictMode for simpler dev behavior: edit `src/main.tsx`.

---

## Troubleshooting

- Symptom: desktop appears to load twice in dev — expected when `StrictMode` is on; not present in production builds.
- Symptom: assets (PDF/images) not loading — ensure path is correct and file exists in `public/` or imported correctly.

---

## Extending the app

- Add new panels by creating a file under `src/panels/` and importing it in `DesktopScreen.tsx`.
- Centralize state with a context if you need cross-panel communication (e.g., a global settings panel or message bus).

---

If you'd like, I can also:

- update `README.md` to reference this `architecture.md` and add a short features section,
- or open a PR with these docs.
