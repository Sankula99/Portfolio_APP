## Architecture Overview

**Project:** Desktop-style portfolio built with React + TypeScript + Vite.

**Purpose:** Overview-first recruiter page with an optional Terminal/Linux visual layout for experience, projects, skills and contact.

---

## Tech stack

- **Framework:** React 19
- **Language:** TypeScript
- **Bundler / Dev server:** Vite
- **Linting:** ESLint
- **Contact:** Formspree (`VITE_FORMSPREE_ID`)
- **Verify:** `npm run verify` → `scripts/verify-dist.mjs`

---

## High-level app flow

- `src/main.tsx` — mounts the React tree (StrictMode on in dev).
- `src/App.tsx` — manages `login` → `boot` → `desktop`, skippable intro, `localStorage` / reduced-motion short-circuit.
- Screens:
  - `LoginScreen` — static splash (~1.2s).
  - `BootScreen` — fast boot lines (~150ms each).
  - `DesktopScreen` — Overview (default) or Terminal tabs; hash routing.

---

## Hash routing (`DesktopScreen`)

| Hash | View |
|------|------|
| `#overview` / section ids | Overview |
| `#terminal` | Terminal |
| `#terminal-project-<slug>` | Terminal + expanded case study |
| `#project-<slug>` | Overview + expanded case study |

`pushState` for view/section changes; `replaceState` for card expand/collapse. Parse `terminal-project-` before `project-`.

---

## Desktop views

| Tab | Component | Role |
|-----|-----------|------|
| Overview | `RecruiterPanel` | Hero, featured projects, experience, education, skills, contact |
| Terminal | Ranger / Nvim / Btop / Contact | Optional Linux-themed layout |

Welcome overlay appears only the first time Terminal is opened (`terminalTipSeen`).

---

## Key files

- `src/data/site.ts` — name, email, links, pitch, `startDate`, `workRights`, `metaDescription`, TODOs for endorsements
- `src/data/portfolio.ts` — experience, education, projects (optional `headline`), skills
- `src/panels/ProjectsPanel.tsx` — expandable project cards + Now building strip
- `src/panels/ContactPanel.tsx` — Formspree form; persistent `aria-live` success region; honeypot
- `src/ui/ProjectVisuals.tsx` — stress charts (held-out vs on-device) + AWS diagram
- `vite.config.ts` — imports data modules to build noscript / meta / JSON-LD
- Resume PDF: `public/Shishir_Sankula_Resume.pdf`

---

## Styling

- Global tokens and layout in `src/index.css`
- Body copy 14px (`--grey-1` / `--grey-2`); chips/captions may be 12px; nothing under 12px
- Touch targets ≥44px under `@media (pointer: coarse), (max-width: 700px)`
- WCAG-oriented greys, visible `:focus-visible`, `prefers-reduced-motion`

---

## How to run

```bash
npm install
npm run dev
npm run build && npm run verify && npm run lint
```

See `README.md` for Formspree and Vercel notes.
