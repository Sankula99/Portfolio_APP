Please help me implement a few design, UX, and accessibility updates across my desktop portfolio app based on the provided architecture and screenshots. 

Here are the specific tasks:

### 1. Update `Contact` Panel Title & Layout (`src/panels/HtopPanel.tsx` or contact panel equivalent)
- Change or add prominent text inside this panel that explicitly says "Contact Me" so users immediately know its purpose.

### 2. Widen the Ranger Panel (`src/screens/DesktopScreen.tsx` & layout styles)
- The left column (`RangerPanel`) is currently clipping text (e.g., long project/experience names like `2025_OPTIK.md`). 
- Widen this panel's flex basis or grid column allocation so the file list and experience text are comfortably readable without wrapping awkwardly.

### 3. Increase Avatar Size (`src/panels/NvimPanel.tsx` or equivalent)
- In the `nvim` panel, increase the size of the circular image placeholder (the one currently showing "SS" for Shishir Sankula) to give the profile section a cleaner, more prominent look.

### 4. Add a "Recruiter Quick Glance" Hint / Onboarding Tip
- Add a clear text hint (either in the `WelcomeOverlay` or right in the top status bar / header area) that says something like: 
  *"Not a Linux person? Click workspace '2' at the top left for a clean, quick glance recruiter view!"*

### 5. SEO & AI Bot Scraping Readability Optimization
- Ensure that the portfolio data can be cleanly read by automated scripts, LLMs, or web scrapers.
- **Action:** Check how text is rendered across the panels. Make sure all critical resume information (skills, experiences, education) is present as semantic HTML text in the DOM (not hidden deeply behind unmounted tabs, nested inside non-standard elements, or obscured by canvas elements). If necessary, add hidden `aria-label` fields or a hidden `<div className="sr-only">` block containing the full plaintext resume resume data for web crawlers/AI agents to easily parse.

Please review `src/screens/DesktopScreen.tsx`, the respective panel files under `src/panels/`, and the global layout styles to apply these changes cleanly. Let me know which files you are modifying!