# Portfolio overhaul: fix design, UX, accessibility, content, SEO and conversion issues

Project: React 19 + TypeScript + Vite desktop-style portfolio in `portfolio/`.
Key files: `src/App.tsx`, `src/screens/*`, `src/panels/*`, `src/ui/*`, `src/data/portfolio.ts`, `src/index.css`, `index.html`.

Work through tasks in order. Keep the existing terminal/Linux visual identity and palette. Do not add dependencies unless stated. All code must be typed (no `any`), keep timer cleanup in every `useEffect`, and `npm run build` and `npm run lint` must pass at the end.

Where I write `TODO:`, do NOT invent a value. Use a clearly marked placeholder constant in one file (`src/data/site.ts`) and list every TODO in your final summary.

---

## Task 0: Single source of truth for content

Create `src/data/site.ts` exporting:

```ts
export const SITE = {
  name: 'Shishir Sankula',
  title: 'Software Engineer (ML, Data & Security)',
  location: 'Sydney, NSW',
  email: 'sankulashishir@gmail.com',
  github: 'https://github.com/Sankula99',
  linkedin: 'https://www.linkedin.com/in/shishirsankula',
  resumeFile: 'Shishir_Sankula_Resume.pdf',
  availability: 'TODO: e.g. "Available from Jan 2027"',
  url: 'TODO: deployed site URL',
} as const
```

- Replace every hardcoded email, GitHub and LinkedIn URL in `NvimPanel`, `ContactPanel`, `RecruiterPanel` and `ResumeCrawlData` with `SITE`. The old address `sankulas99@gmail.com` must not appear anywhere in the codebase after this task.
- Rename `SoftwareResumV4.9.pdf` to `Shishir_Sankula_Resume.pdf` and update imports. Leave the phone number OFF the site.
- One-line pitch (use everywhere: hero, meta description, nvim bio):
  "Final-year Software Engineering student at UTS building ML, data and secure full-stack products. Co-led two startup MVP teams. Seeking internship and graduate roles."

---

## Task 1: Replace `src/data/portfolio.ts` content with resume-accurate, outcome-led data

Update types so projects can carry case-study fields:

```ts
export type ProjectEntry = {
  slug: string
  name: string
  role: string
  period: string
  status: 'shipped' | 'in-progress'
  summary: string           // one sentence
  problem: string
  approach: string[]
  result: string[]          // include real numbers
  stack: string[]
  links: { label: string; href: string }[]  // TODO placeholders where unknown
  featured: boolean
}
```

Education: Bachelor of Engineering (Honours), Software Engineering, UTS, Feb 2023 – Dec 2026.
- Replace the `wam` field in `EducationEntry` with `gpa: number` set to `6.04`, and display it as "GPA 6.04/7.00" everywhere.
- Show "Dean's List (2026)" as an award.
- Remove every remaining occurrence of WAM or `79.96` across the codebase, including `NvimPanel` (the `wam:` line in the code block), `RecruiterPanel` (the WAM row), `RangerPanel` (`EducationView`), and `ResumeCrawlData` (the sr-only summary text). Use `grep -ri "wam\|79.96"` to confirm none remain.
- Highlights: Machine Learning, Data Systems, Cloud Computing & SaaS, Introduction to Data Analytics, Real-time Operating Systems, Cybersecurity. Drop the unverified "HD %" labels unless I confirm them.

Experience (replace bullets with these):

**Software Engineer & Co-Leader, OPTIK Consultancy (Internship), Nov 2025 – Feb 2026**
- Built a startup client's MVP web app with React, TypeScript, Supabase and Clerk; designed the PostgreSQL schema and frontend components.
- Implemented authentication and session management with Clerk to control access to user data.
- Gathered requirements directly with the client, demoed each sprint, delivered the MVP on schedule.
- Developed a Python BERT NLP model to classify recorded meetings, achieving 0.98 recall.
- Co-led a team of 5 developers (stand-ups, sprint planning, prioritisation); introduced code review, version control and documentation standards, and ran 1-on-1s.

**Software Engineer & Frontend Lead, InviteApp Startup (Client Project), Mar 2025 – Jul 2025**
- Built a React Native, TypeScript, Prisma mobile MVP, delivered a working prototype ahead of the client's funding round.
- Led frontend architecture and component design for a 6-person team (iOS and Android).
- Integrated REST APIs to sync the dashboard with the centralised backend.

Projects (all as case studies; mark `featured: true` for the first four):

1. **RAG Document Assistant**: Full-Stack AI Engineer, Jun 2026 – Present, in-progress. Problem: users can't quickly query long PDFs with trustworthy citations. Approach: React + FastAPI, Weaviate vector DB, Ollama local LLMs; ingestion, semantic chunking, embeddings, vector search, LLM response generation. Result: TODO add measurable eval metric (e.g. retrieval accuracy) when available; currently exploring prompt engineering, retrieval optimisation and citation quality.
2. **Hybrid Deep Learning for Physiological Stress Detection**: ML Engineer, May 2026 – Present, in-progress. CNN+LSTM and CNN+GRU on UBFC-Phys, WESAD and a wearable dataset; sliding-window segmentation, 80/20 split, class weighting and early stopping. Result: on UBFC-Phys CNN+LSTM 0.80 F1 vs CNN+GRU 0.73. Next: cross-dataset generalisation and quantised/pruned models for a Raspberry Pi Zero 2W.
3. **Network Attack and Defence Labs**: Network Security Analyst, Sep – Oct 2026. Executed SYN flooding, ARP cache poisoning, TCP session hijacking, DNS cache poisoning in a virtual lab. Defended with Snort IDS/IPS rules, iptables policies, Juniper SRX policies, verified against live attack traffic. Built a CA and issued X.509 certs with OpenSSL; analysed HTTP credential sniffing. (Merge the duplicated bullet into one clear "mapped each attack to a mitigating control" result.)
4. **Heart Disease Detection**: Data Scientist, Aug – Nov 2025. XGBoost on the UCI clinical dataset, 0.88 F1; full pandas/NumPy preprocessing pipeline (cleaning, encoding, scaling, imputation); benchmarked configurations on precision/recall trade-offs.
5. **Scalable AWS LAMP Web Application**: System Programmer, Sep – Nov 2024. Custom VPC across 2 AZs, Auto Scaling 2 to 8 EC2, load balancer, Multi-AZ RDS, custom AMI; security groups allow only HTTP and SSH; architecture write-up justifying each service for HA/DR.
6. **Video Game Sales and Consumer Insights System**: Data Analyst, Apr – May 2025. Power BI dashboards over a star-schema Azure SQL DB via DirectQuery, bridge tables for many-to-many, fixed a firewall connection failure by whitelisting the IP; wrote architecture, task-flow diagrams and requirements for a 4-person team.
7. **CPU Scheduler & Page Replacement Simulator**: System Programmer, Apr – Jun 2026. Round Robin scheduler with configurable quantum (waiting/turnaround times for a 7-process workload), two-thread pipeline over a named pipe with semaphores, FIFO page-replacement simulator.
8. **This portfolio site**: React 19, TypeScript, Vite; terminal-themed UI with a recruiter view.

Each project's `links` must contain `TODO:` placeholders for repo and demo URLs. Do not fabricate URLs.

Replace `skillGroups` percentages with evidence-based groups (no percentages anywhere, including `RecruiterPanel` and `BtopPanel`):

```
Languages: Python, TypeScript, Java, C/C++, SQL, HTML/CSS
AI & Data: BERT, RAG/LLMs (Ollama), XGBoost, Scikit-Learn, TensorFlow, pandas, NumPy, Power BI
Security & Networking: Snort, iptables, Juniper SRX, Wireshark, OpenSSL/PKI, John the Ripper
Web & Cloud: React, React Native, FastAPI, Prisma, Supabase, PostgreSQL, AWS, Docker, Git/GitHub
```

Each group gets a one-line "used in:" evidence string (e.g. "OPTIK BERT classifier, Heart Disease, Stress Detection"). In `BtopPanel`, replace the % bars with a count of projects using that skill group (derived from data) so the bars represent evidence.

---

## Task 2: Fix the forced 9-second intro

In `App.tsx`, `LoginScreen`, `BootScreen`:
- Reduce login to 1200ms and keep boot lines but speed to ~150ms per line (total intro under 2.5s).
- Add skip: any keypress, click or tap on the intro jumps straight to desktop. Show a small hint "press any key to skip" (readable contrast).
- Persist `sessionStorage` key `introSeen` (wrapped in try/catch); if set, skip the intro entirely on revisits.
- If `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, skip the intro entirely.
- Clean up all timers and key listeners in effect returns.

---

## Task 3: Make the recruiter-friendly view the default

In `DesktopScreen.tsx`:
- Default `page` to `'recruiter'`. The terminal layout becomes the optional "Terminal view".
- Replace the numbered workspace pills `1 2 3` with two labelled buttons, "Overview" and "Terminal", using `role="tablist"`/`role="tab"`/`aria-selected`. Delete the dead workspace `3` span.
- Remove the repeated "Not a Linux person?" banner and rewrite the `WelcomeOverlay` copy (max 2 sentences, only shown the first time the Terminal view is opened, persisted via try/catch `sessionStorage`). Neutral tone, no apologising.
- Rebuild `RecruiterPanel` as the main page, top to bottom, no scrolling needed for the first section:
  1. Hero: name, title, the one-line pitch, availability, location, status badge, and a primary CTA row: [Download resume] [Email me] [GitHub] [LinkedIn], all above the fold.
  2. Featured projects (4 cards) with summary, key result, stack chips, repo/demo links (hide link buttons whose href starts with `TODO`).
  3. Experience (the two roles with outcome-led bullets).
  4. Education (GPA 6.04/7.00, Dean's List, coursework).
  5. Skills (evidence groups, no %).
  6. Contact (see Task 6).
- Style with existing CSS variables and monospace/Syne fonts.

---

## Task 4: Project case studies

- Create `src/panels/ProjectsPanel.tsx` showing all projects. Each is an expandable card (`<button aria-expanded>` plus region) with Problem / Approach / Result / Stack / Links, with the result figures emphasised using `--ice`.
- Use the same component in the Overview (featured only, with a "View all projects" control) and in the Terminal view's `ranger` projects tab (replace the thin ProjectsView with it).
- Add a "Now building" strip in Overview listing the two in-progress projects.
- Remove `GitContributionGraph` (it is hardcoded fake data). Delete the file and its CSS and replace its slot in the ranger panel with the "Now building" list.

---

## Task 5: Responsive layout (mobile currently scrolls horizontally, 593px at 390px viewport)

- No horizontal scroll at 320, 375, 390, 768, 1024, 1440 widths. Verify with Playwright (`document.documentElement.scrollWidth <= innerWidth`).
- `DesktopTopBar`: on narrow screens stack into two rows; status text must wrap inside its own container, never overlap the tabs or path. Hide the `shishir@arch:~/portfolio` path under 700px.
- `.desktop-grid` already collapses at 1100px; also ensure `.screen` padding shrinks to 12px under 600px, `.desktop-col-left--fixed` has `min-width: 0` and no fixed 400px under 1100px.
- `nvim` code block: `overflow-x: auto` inside its own container, with the profile stacking above the code at under 700px; on mobile, wrap the `passion` array across lines.
- Reduce the nvim `passion` list to 3 focused items: ML, Data Engineering, Secure Full-Stack.
- Fill dead space on desktop: make the right column grid rows `auto` so the btop panel doesn't leave a large empty area.

---

## Task 6: Contact that really works

In `ContactPanel.tsx` (and reuse in the Overview):
- Remove the fake success state. Implement submission via Formspree: `fetch('https://formspree.io/f/' + import.meta.env.VITE_FORMSPREE_ID, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, subject, message }) })`.
- Add a required Email field (so I can reply) with basic validation.
- If `VITE_FORMSPREE_ID` is missing, hide the form entirely and show only the mailto link; never show "message queued" unless the request returned `res.ok`.
- States: idle / sending (button disabled) / success / error with retry; announce status with `role="status"` and `aria-live="polite"`.
- Convert label `<span>`s to real `<label htmlFor>` elements with matching input `id`s, `autoComplete` attributes, and `required`.
- Add `.env.example` with `VITE_FORMSPREE_ID=`. Mention in README.
- Keep a visible `mailto:sankulashishir@gmail.com` link and the Download resume button; use the new resume filename.

---

## Task 7: Accessibility

- **Contrast (WCAG AA 4.5:1 for text):** `--grey-2 (#5a5f68)` is 2.9:1 and `--syn-cmt (#3d4550)` is 1.9:1 on `#111316`. Change them to values with at least 4.5:1 (suggest `--grey-2: #8b919b`, `--syn-cmt: #7c8794`) and adjust any dim tab/label/tag colours using them. Verify with a small script and report the ratios.
- **Font sizes:** raise all 9px and 10px text to at least 12px; body/list text 13–14px.
- **Welcome overlay:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the heading, focus moves into the dialog on open, focus is trapped, Esc closes, and focus returns to the opener on close.
- **Tabs (ranger and view switcher):** `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, arrow-key navigation.
- **Focus styles:** a visible `:focus-visible` outline (2px `--ice`) on every link and button, not just form fields.
- **Reduced motion:** add `@media (prefers-reduced-motion: reduce)` that disables fades, blinking cursors, bar-grow animations and transitions.
- Add `aria-hidden="true"` to decorative elements (block cursors), semantic `<main>`, `<nav>`, `<header>`, and one visible `<h1>` (name). Keep `ResumeCrawlData` but sync it from the new data.
- Replace the "SS" avatar with an `<img>` that has real `alt` text when `public/headshot.jpg` exists; otherwise keep the initials. TODO: I will add `public/headshot.jpg` (square, at least 400x400).
- Dead spans must not look interactive.

---

## Task 8: SEO, sharing and performance

In `index.html`:
- `<title>`: `Shishir Sankula — Software Engineer (ML, Data & Security) | Sydney`
- Meta description: the one-line pitch (under 160 chars).
- Add `og:title`, `og:description`, `og:type=website`, `og:url`, `og:image` (`/og-image.png`, TODO: I will provide 1200x630), `twitter:card=summary_large_image`, `<link rel="canonical">`, and `<meta name="theme-color" content="#0a0a0c">`.
- Replace `vite.svg` favicon with a custom SVG favicon (an "SS" monogram in `--ice` on `--bg`) at `public/favicon.svg` and delete `vite.svg`.
- Add `JSON-LD` `Person` schema (name, jobTitle, url, email, sameAs: GitHub and LinkedIn, alumniOf UTS).
- Add a `<noscript>` block with name, role, email, links, resume link and a short summary, for crawlers and preview bots.
- Add `public/robots.txt` and `public/sitemap.xml` (use `SITE.url` placeholder).
- Fonts: trim the Google Fonts request to only used weights (JetBrains Mono 400, 500, 600; Syne 600, 700), keep `display=swap`.
- Remove unused assets (`src/assets/react.svg`).

---

## Task 9: Cleanup

- Move internal AI notes (`cursor-prompt.md`, `prompt.md`, `fix.md`, `fix2.md`, `fix3.md`) into a `docs/` folder or add them to `.gitignore`, and confirm `node_modules` and `dist` are ignored.
- Update `architecture.md` and `README.md` for the new flow (recruiter default, skip intro, Formspree env var). `architecture.md` still references a deleted `HtopPanel`; fix this.
- Remove `dangerouslySetInnerHTML` in `RangerPanel.highlightKeywords`; render highlights as React elements instead.

---

## Final verification (report results)

1. `npm run build` and `npm run lint` pass with no errors.
2. `grep -ri "sankulas99\|wam\|79.96"` returns no results.
3. Playwright screenshots at 390px and 1440px for Overview and Terminal views, plus a check that there is no horizontal overflow.
4. Contrast ratios table for all text colour tokens against their backgrounds (all body text at least 4.5:1).
5. Keyboard walkthrough: Tab through the first view; overlay traps focus and closes with Esc.
6. Time from first load to visible content is under 3s on first visit and instant on repeat visits.
7. Summary of every `TODO:` I still need to fill in.