# Cursor AI Prompt — Linux Desktop Portfolio
> Use the wireframe SVGs for layout & design. Use the resume content below for all real information.

---

## Brief

Build a single-page portfolio website for **Shishir Sankula** that looks and feels like a **Linux desktop environment (Hyprland/Arch-style)**. The experience flows through three screens: Login → Boot/Init → Desktop. The design is dark, minimal, and uses a palette of near-blacks, charcoal greys, and ice/teal as the only accent colour.

Reference the three wireframe SVGs (`wireframe-01-login.svg`, `wireframe-02-boot.svg`, `wireframe-03-desktop.svg`) for **layout, component placement, spacing, and visual structure only**. All text content, names, skills, experience, and projects must come from the resume data provided below.

---

## Tech Stack & Constraints

- **Single HTML file** — no frameworks, no build tools, no external JS libraries
- **CSS custom properties** for the entire design system (colours, spacing)
- **JetBrains Mono** (monospace) for all terminal/code text — import from Google Fonts
- **Syne** for display names and headings — import from Google Fonts
- All screens managed via CSS classes (`.screen`, `.active`, `.fading`)
- Screen transitions use CSS `opacity` animations (400ms ease)
- No `localStorage`, no cookies, no backend

---

## Colour System

```css
:root {
  /* Backgrounds */
  --bg:       #0a0a0c;   /* page background */
  --bg2:      #0f1014;
  --panel:    #111316;   /* panel fill */
  --panel2:   #0d0f12;   /* darker panel / titlebar */
  --bar:      #080809;   /* top bar */

  /* Borders */
  --border:   rgba(255,255,255,0.07);
  --border-h: rgba(255,255,255,0.14);  /* hover */

  /* Grey scale — structural */
  --grey-1:   #8a8f98;   /* primary body text */
  --grey-2:   #5a5f68;   /* secondary text */
  --grey-3:   #32363d;   /* muted / labels */
  --grey-4:   #1e2128;   /* very subtle bg tint */
  --slate:    #c2c8d4;   /* headings, names */

  /* Ice — accent ONLY (use sparingly) */
  --ice:      #7ec8e0;
  --ice-dim:  #4a8fa8;
  --ice-dark: #1e4d60;

  /* Syntax highlighting */
  --syn-kw:   #778ca0;   /* keywords */
  --syn-str:  #7aab88;   /* strings */
  --syn-key:  #b8c4cc;   /* object keys */
  --syn-val:  #7ec8e0;   /* values */
  --syn-cmt:  #3d4550;   /* comments */

  /* Status colours */
  --green:    #5ea880;
  --amber:    #a89460;
}
```

---

## Screen Flow

```
SCREEN 1: LOGIN
  → User presses [ LOGIN ] button (or hits Enter)
  → 400ms fadeOut → SCREEN 2 plays

SCREEN 2: BOOT / INIT
  → Lines appear one by one, 380ms apart (opacity 0 → 1)
  → After last line: 600ms pause → 400ms fadeOut → SCREEN 3

SCREEN 3: DESKTOP
  → Panels slide up (staggered, animation-delay)
  → Welcome card overlay appears immediately on top
  → User clicks "got it" → overlay fades out and is removed from DOM
```

---

## Screen 1 — Login

See `wireframe-01-login.svg` for layout.

**Structure:**
- Full viewport; deep dark green-black radial gradient background
- Subtle dot grid overlay (using CSS `radial-gradient` pattern)
- Centred card (320px wide) with rounded corners, semi-transparent background, ice-colour border glow
- **Avatar circle**: 78px diameter, ice-dim border, inner gradient fill, displays initials `SS`
- **Name**: "Shishir Sankula" in Syne font, `--slate` colour
- **Username pill**: `shishir@portfolio` — pill shape, ice border, small font
- **Password input**: label "Password:" + `<input type="password">` placeholder `········`
- **Login button**: full width, ice border, letter-spacing, `[ LOGIN ]` text
- **Hint text**: `// Hint: type anything as the password and press Login to explore`
- **Footer bar** (fixed bottom): left = `Hyprland 0.47.0 — Arch Linux x86_64 / Hyprland ▾`; right = **live digital clock** (updates every second, shows HH:MM:SS)
- Pressing Enter in password field OR clicking Login triggers transition

---

## Screen 2 — Boot / Init

See `wireframe-02-boot.svg` for layout.

**Structure:**
- Pure black `#000` background
- No border, no decoration
- Header line (ice-dim): `// Loading Shishir's portfolio desktop — this will only take a moment`
- Seven `[ OK ]` lines that appear sequentially (opacity 0 → 1, staggered 380ms):
  1. `Started user session for shishir`
  2. `Loading Hyprland compositor...`
  3. `Applying dotfiles from ~/.config/hypr/`
  4. `Mounting wallpaper: arctic_dark.jpg`
  5. `Initialising btop, ranger, nvim...`
  6. `Spawning waybar...`
  7. `Portfolio ready. Launching desktop...` + blinking block cursor
- `[ OK ]` in `--green`; path strings in `--ice-dim`; bold words in `--grey-1`; body text in `--grey-2`
- Block cursor: CSS `animation: blink 0.9s step-end infinite`
- After all lines shown → 600ms delay → transition to desktop

---

## Screen 3 — Desktop

See `wireframe-03-desktop.svg` for layout.

### Top Bar (30px height, `--bar` background)
- Left: workspace pills `[ 1 ] [ 2 ] [ 3 ]` — pill `1` has ice border/colour (active)
- Left middle: `▸ PORTFOLIO` label
- Centre: `shishir@arch:~/portfolio`
- Right: green dot + `seeking internship` + live clock (HH:MM · Day DD)

### Path Bar (18px, `--panel2` background)
`~/experience · ~/education · ~/projects · ~/skills`

### Grid Layout
```
| ranger (col 1, row 1-2) | nvim (col 2, row 1)    |
|                          | btop + htop (col 2, row 2) |
```
- Column 1 width: 240px
- Column 2: fills remaining space
- Gap: 8px; padding: 10px

---

### Panel: ranger — Experience Browser
See wireframe for structure. Left dir-col (78px) + right entries-col.

**Dir column items:** `experience/` (active — ice colour, right ice border), `education/`, `projects/`, `skills/`

**Experience entries** (use resume data):

**Entry 1:**
- File: `2025_OPTIK.md`
- Role: Software Engineer & Co-Leader
- Company: OPTIK Consultancy · InnerSystems · Nov 2025 – Feb 2026
- Bullets:
  - Architected mobile web app MVP using React, TypeScript & Supabase
  - Co-led cross-functional team of 5 developers via agile frameworks
  - Developed BERT-based NLP classification model for document automation
  - Established code review workflows & documentation standards

**Entry 2:**
- File: `2025_InviteApp.md`
- Role: Software Engineer & Co-Leader
- Company: InviteApp Startup · Mar 2025 – Jul 2025
- Bullets:
  - Built mobile web app MVP using React Native & TypeScript
  - Led frontend architecture & scalable component design
  - Collaborated with backend team on centralised DB integration

Highlight key terms with `--ice` colour (React, TypeScript, BERT, NLP, 5 developers, React Native).

---

### Panel: nvim — Developer Profile
See wireframe. Left profile pane (195px) + right code editor.

**Profile pane:**
- Avatar: 68px circle, initials `SS`, dark gradient fill, ice-dark border
- Name: `Shishir Sankula` in `--slate`
- Role: `SE Student · UTS '26` in `--grey-2`
- Status badge: `● seeking internship` — green border/colour
- Links: `gh` → `https://github.com/Sankula99`, `li` → `https://www.linkedin.com/in/shishirsankula`

**Code editor** (fake, static, JetBrains Mono):
```js
# About Me

const developer = {
  name:       "Shishir Sankula",
  degree:     "BE (Hons) Software Engineering",
  university: "UTS · Class of 2026",
  wam:        79.96,
  passion:    ["NLP", "Full-Stack", "ML"],
  status:     "Seeking Internship"
};

// Building full-stack apps & training transformer models.
// Agile team leader · data engineer · ML enthusiast.
█   ← blinking cursor
```
Apply syntax highlighting using CSS spans matching the colour system above.

**Statusline** (bottom of nvim): `NORMAL` pill (ice-dark bg) + `README.md` | `unix · utf-8`

---

### Panel: btop — Skills Dashboard
See wireframe. Animated skill bars, staggered reveal.

| Skill | % | Tags |
|---|---|---|
| Python / ML | 96% | BERT, XGBoost, Scikit-Learn, Pandas |
| TypeScript / React | 90% | React Native, Node.js, HTML/CSS |
| Data / SQL | 96% | PostgreSQL, ETL, Supabase |
| Cloud & DevOps | 75% | AWS, Git, Figma, Power BI |

- Each bar: 2px height track, gradient fill, `transform: scaleX(0 → 1)` animation, `animation-delay: 0.6s`
- Bar gradients: use one of ice/green/slate/amber per bar (different for each)
- Tags: small pills, `--panel2` bg, `--border` stroke, `--grey-3` text

---

### Panel: htop — Projects & Tools
See wireframe. Sectioned table.

**Active projects section:**

| PID  | PROJECT           | STACK          | STATE |
|------|-------------------|----------------|-------|
| 2401 | Heart Disease ML  | XGBoost·Python | R     |
| 2402 | Sales Warehouse   | PostgreSQL·ETL | R     |

**Tools running section:**

| PID  | TOOL     | USER    | STATE |
|------|----------|---------|-------|
| 1001 | git      | shishir | R     |
| 1002 | figma    | shishir | S     |
| 1003 | aws-cli  | shishir | S     |
| 1004 | trello   | shishir | Z     |

State colours: R = `--green`, S = `--amber`, Z = `--grey-3`

---

## Welcome Card (Overlay on Desktop)

Appears **immediately** when desktop loads. Positioned centre-screen with a `backdrop-filter: blur(4px)` overlay.

See `wireframe-03-desktop.svg` for card structure.

**Card width:** 440px (max 92vw). Has a fake titlebar with win-dots.

**Heading:** `Not a Linux person? No problem.` — "Linux" in `--ice`

**Sub text:** `This portfolio is styled as a Linux desktop environment. Here's a plain-English guide to reading it:`

**Four tip rows** (each with icon + label + description):

| Icon | Label | Description |
|------|-------|-------------|
| 🗂️ | **ranger** (left panel) | My **experience browser** — each `.md file` is a job role with key achievements inside. |
| 📝 | **nvim** (top right) | A code-styled **bio** — showing my name, degree, and what I'm looking for. Syntax colours are aesthetic. |
| 📊 | **btop** (bottom left) | My **skills dashboard** — bars show proficiency, tags show specific tools within each area. |
| ⚙️ | **htop** (bottom right) | A **projects & tools list** — R = actively used, S = familiar, Z = phasing out. |

**Footer note:** `Everything is read-only — scroll and explore. The [ 1 ] [ 2 ] [ 3 ] squares at the top navigate between sections.`

**Button:** `[ got it, let me explore → ]` — full width, ice border, clicking removes the overlay from DOM with 300ms fadeOut.

---

## Animations & Micro-interactions

- **Panel hover**: border transitions from `--border` → `--border-h` (200ms)
- **Dir item hover**: background tint + `--slate` text colour (120ms)
- **Link hover**: ice border + ice text + subtle background (120ms)
- **Boot lines**: each line goes from `opacity: 0` to `opacity: 1` in sequence
- **Skill bars**: `transform: scaleX(0 → 1)` on a 1.1s cubic-bezier ease
- **Welcome card in**: `scale(0.96) translateY(10px)` → `scale(1) translateY(0)` with spring ease
- **Screen transitions**: `opacity` fadeOut/fadeIn, 400ms
- **Blinking cursor**: `animation: blink 1.1s step-end infinite`

---

## Resume Data Reference

```
NAME:        Shishir Sankula
PHONE:       0406820079
EMAIL:       sankulas99@gmail.com
LINKEDIN:    https://www.linkedin.com/in/shishirsankula
GITHUB:      https://github.com/Sankula99

EDUCATION:
  Degree:    Bachelor of Engineering (Honours)
  Major:     Software Engineering
  Uni:       University of Technology Sydney (UTS)
  Period:    Feb 2023 – Dec 2026
  WAM:       79.96
  Top units: Machine Learning (HD 96%), Data Systems (HD 96%),
             Cloud Computing & SaaS (HD 93%), Intro to Data Analytics (HD 85%)

EXPERIENCE:
  1. OPTIK Consultancy & InnerSystems
     Role:   Software Engineer & Co-Leader
     Period: Nov 2025 – Feb 2026
     - Architected mobile web app MVP (React, TypeScript, Supabase)
     - Co-led 5-person dev team via agile (stand-ups, sprint planning)
     - Developed BERT-based NLP classification model (Python)
     - Established code review & version control workflows

  2. InviteApp Startup
     Role:   Software Engineer & Co-Leader
     Period: Mar 2025 – Jul 2025
     - Delivered React Native + TypeScript mobile web MVP
     - Led frontend architecture & component design
     - Connected frontend to centralised DB with backend team

PROJECTS:
  1. Heart Disease Detection (Aug 2025 – Nov 2025)
     - XGBoost ML model on UCI Heart Disease dataset (Kaggle)
     - Full data preprocessing pipeline in Python
     - Feature scaling, encoding, missing value handling

  2. Sales Data Warehouse (Apr 2025 – Jun 2025)
     - PostgreSQL warehouse with Bronze/Silver multi-layer architecture
     - Custom ETL pipelines in SQL
     - Data normalisation and schema design for analytics

SKILLS:
  Languages:   C++, Python, Java, TypeScript, HTML, CSS, SQL
  Frameworks:  React, Node.js, React Native, Scikit-Learn, XGBoost, BERT, Pandas
  Data & ML:   PostgreSQL, ETL Pipelines, Data Warehousing, ML, NLP, Deep Learning
  Cloud/Tools: AWS, Supabase, Git/GitHub, Power BI, Figma, Trello
```

---

## File Deliverable

One file: `portfolio.html`
- Self-contained (fonts from Google Fonts CDN only)
- No external CSS or JS files
- Works by opening directly in a browser
- Scrollable desktop panel area if content overflows viewport
