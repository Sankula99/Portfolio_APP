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

---

## High-level app flow

- `src/main.tsx` — mounts the React tree (StrictMode on in dev).
- `src/App.tsx` — manages `login` → `boot` → `desktop`, skippable intro, `sessionStorage` / reduced-motion short-circuit.
- Screens:
  - `LoginScreen` — static splash (~1.2s).
  - `BootScreen` — fast boot lines (~150ms each).
  - `DesktopScreen` — Overview (default) or Terminal tabs.

---

## Desktop views

| Tab | Component | Role |
|-----|-----------|------|
| Overview | `RecruiterPanel` | Hero, featured projects, experience, education, skills, contact |
| Terminal | Ranger / Nvim / Btop / Contact | Optional Linux-themed layout |

Welcome overlay appears only the first time Terminal is opened (`terminalTipSeen`).

---

## Key files

- `src/data/site.ts` — name, email, links, pitch, TODO placeholders
- `src/data/portfolio.ts` — experience, education, projects (case studies), skills
- `src/panels/ProjectsPanel.tsx` — expandable project cards + Now building strip
- `src/panels/ContactPanel.tsx` — Formspree form (hidden if env missing)
- `src/ui/ResumeCrawlData.tsx` — sr-only semantic resume for crawlers
- Resume PDF: `Shishir_Sankula_Resume.pdf`

---

## Styling

- Global tokens and layout in `src/index.css`
- WCAG-oriented greys (`--grey-2`, `--syn-cmt`), min 12px text, reduced-motion media query

---

## How to run

```bash
npm install
npm run dev
```

See `README.md` for Formspree and Vercel notes.
