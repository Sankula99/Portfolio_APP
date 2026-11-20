# Shishir Sankula — Portfolio

React 19 + TypeScript + Vite desktop-style portfolio. Overview (recruiter) is the default and complete evidence path; Terminal is optional.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run verify
npm run lint
npm run preview
```

`verify` checks `dist/index.html` noscript coverage, meta description length, JSON-LD, fonts, and PDFs.

## Contact form (Formspree)

1. Create a form at [formspree.io](https://formspree.io).
2. Copy `.env.example` to `.env`.
3. Set `VITE_FORMSPREE_ID` to your form ID.

If the env var is missing, the form is hidden and only the mailto / resume links remain.

## Intro behaviour

- First visit: short login (~1.2s) + boot lines (~150ms each); press any key or tap to skip.
- Revisits: intro skipped via `localStorage` (`introSeen`).
- URL with a hash skips the intro completely.
- `prefers-reduced-motion: reduce` skips the intro entirely.

## Hash routes

| Hash | Behaviour |
|------|-----------|
| `#overview` | Overview view |
| `#terminal` | Terminal view |
| `#terminal-project-<slug>` | Terminal with that case study expanded |
| `#project-<slug>` | Overview with that case study expanded |
| `#projects`, `#experience`, `#education`, `#skills`, `#contact` | Overview section jump |

View/section changes use `history.pushState`. Card expand/collapse uses `history.replaceState` so Back does not step through every toggle. `terminal-project-` is parsed before `project-`.

## Content

- Site constants: `src/data/site.ts` (`pitch`, `status`, `startDate`, `workRights`, `metaDescription`, endorsements)
- Portfolio data: `src/data/portfolio.ts` (optional `headline` only where it states a real outcome; visuals; status notes; baseline placeholders)
- Resume PDF: `public/Shishir_Sankula_Resume.pdf` (keep identical copy at repo root)
- Self-hosted fonts: `public/fonts/` (JetBrains Mono + Syne; OFL licences included)
- Build-time `<noscript>` + meta/JSON-LD: Vite plugin imports `SITE` / portfolio data modules directly (no regex extraction)

## Placeholders still TODO (do not invent)

- Project `links` marked `TODO`
- `visualSrc` / `visualAlt` screenshots
- Heart Disease `baselineNote`
- `SITE.endorsements` (empty) and `SITE.linkedinRecommendations`

## Deploy (Vercel)

- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- Add `VITE_FORMSPREE_ID` in project env vars

## After deploying

Once you have a live URL, add these back:

1. `<link rel="canonical">` in `index.html`
2. `og:url` meta tag
3. Absolute `og:image` and `twitter:image` URLs — use a **1200×630** export of the owl
4. `"url"` field in the JSON-LD Person block
5. `public/sitemap.xml` with your domain
6. `Sitemap:` line in `public/robots.txt`
