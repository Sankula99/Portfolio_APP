# Shishir Sankula — Portfolio

React 19 + TypeScript + Vite desktop-style portfolio. Overview (recruiter) is the default view; Terminal is optional.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Contact form (Formspree)

1. Create a form at [formspree.io](https://formspree.io).
2. Copy `.env.example` to `.env`.
3. Set `VITE_FORMSPREE_ID` to your form ID.

If the env var is missing, the form is hidden and only the mailto / resume links remain.

## Intro behaviour

- First visit: short login (~1.2s) + boot lines (~150ms each); press any key / click to skip.
- Revisits: intro skipped via `sessionStorage` (`introSeen`).
- `prefers-reduced-motion: reduce` skips the intro entirely.

## Content

- Site constants: `src/data/site.ts`
- Portfolio data: `src/data/portfolio.ts`
- Resume PDF: `public/Shishir_Sankula_Resume.pdf`

## Deploy (Vercel)

- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- Add `VITE_FORMSPREE_ID` in project env vars

## After deploying

Once you have a live URL, add these back:

1. `<link rel="canonical">` in `index.html`
2. `og:url` meta tag
3. Absolute `og:image` and `twitter:image` URLs
4. `"url"` field in the JSON-LD Person block
5. `public/sitemap.xml` with your domain
6. `Sitemap:` line in `public/robots.txt`
