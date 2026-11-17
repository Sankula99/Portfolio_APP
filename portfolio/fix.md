# Cursor Prompt — Portfolio Changes

Make the following changes to the portfolio. The architecture uses React 19 + TypeScript + Vite.
Key files are in `src/screens/`, `src/panels/`, `src/ui/`, and `src/data/portfolio.ts`.
Work through each task independently and do not break existing functionality in other panels.

---

## Task 1 — Auto-advance LoginScreen (no user interaction required)

**File:** `src/screens/LoginScreen.tsx` and `src/App.tsx`

Remove all login buttons, form inputs, and any click/submit handlers from `LoginScreen.tsx`.
The screen should display as a static, read-only terminal page — keep the existing visual
(ASCII art, boot text, blinking cursor, etc.) but strip out any interactive elements.

In `App.tsx`, use the existing `fadeTo` helper (or replicate its pattern) to automatically
transition from `login` → `boot` → `desktop` after **5 seconds** of the login screen being
visible. Use a `useEffect` with a `setTimeout` of 5000ms that calls the transition on mount.
Clean up the timeout in the `useEffect` return. Do not add any buttons or skip controls —
the transition must be fully automatic.

---

## Task 2 — Update status badge text

**Files:** `src/screens/DesktopScreen.tsx`, `src/data/portfolio.ts` (and any other file that
contains the string `"seeking internship"` — run a project-wide search to catch all instances)

Find every occurrence of the text `seeking internship` (case-insensitive, check both display
text and data values) and change it to:

```
seeking internship and graduate roles
```

This applies to the green dot badge shown in the top-right of the top bar and anywhere the
same string appears in `portfolio.ts` or `NvimPanel.tsx`.

---

## Task 3 — Add a Recruiter Quick-View panel (Workspace 2)

**Files to create:** `src/panels/RecruiterPanel.tsx`
**Files to edit:** `src/screens/DesktopScreen.tsx`

Create a new panel `src/panels/RecruiterPanel.tsx` that renders a single-page,
no-scrolling-required summary of the candidate. It must include all of the following sections
laid out in a compact two-column grid (left: labels/section headers, right: values):

- **Name, title, university, WAM, graduation year**
- **Status** (the seeking internship and graduate roles badge)
- **Contact** — email, GitHub, LinkedIn as inline links
- **Skills snapshot** — bullet list of top 4 skills with percentage (Python/ML 96%,
  TypeScript/React 90%, Data/SQL 96%, Cloud & DevOps 75%)
- **Experience** — one-line summary per role (company · title · dates)
- **Key projects** — name + one-sentence description per project, pulled from `portfolio.ts`

Style it consistently with the rest of the terminal UI (same CSS variables, monospace font,
panel-header bar). Title the panel header `recruiter_view.md`.

In `DesktopScreen.tsx`, wire Workspace tab **2** to display `RecruiterPanel` as the active
full-content panel instead of the default layout. Tabs 1 and 3 should continue to show the
existing layout unchanged.

---

## Task 4 — Remove HtopPanel

**Files:** `src/screens/DesktopScreen.tsx`, `src/panels/HtopPanel.tsx`

1. Remove the `<HtopPanel />` component from the desktop layout in `DesktopScreen.tsx`.
2. Remove the import of `HtopPanel` from `DesktopScreen.tsx`.
3. Delete the file `src/panels/HtopPanel.tsx`.
4. Update any CSS grid or layout classes in `src/App.css` or `src/index.css` that explicitly
   reference the htop panel's grid area so the layout does not leave an empty gap.

---

## Task 5 — Replace HtopPanel with an expanded ContactPanel (with form)

**File to create:** `src/panels/ContactPanel.tsx`
**Files to edit:** `src/screens/DesktopScreen.tsx`, `src/App.css` / `src/index.css`

Create `src/panels/ContactPanel.tsx`. It replaces `HtopPanel` in the bottom-right grid area
and must expand to fill the full space previously shared between `HtopPanel` and the existing
minimal contact info. Merge the existing contact information (email, DOWNLOAD RESUME,
VIEW RESUME, GitHub, LinkedIn links) into this panel alongside the new form.

The panel must include:

**Header bar** — label: `contact.md`

**Top row** — keep the existing elements:
- Email address (`sankulas99@gmail.com`) as a `mailto:` link, right-aligned
- `[ DOWNLOAD RESUME ]` and `[ VIEW RESUME ]` buttons (preserve existing download/open logic)
- `github` and `linkedin` icon-links

**Form section** — below the existing contact info, render a terminal-styled contact form
with three fields and a submit button:

```
Name     [ _________________________ ]
Subject  [ _________________________ ]
Message  [ _________________________ ]
         [ _________________________ ]
         [ _________________________ ]
         [      SEND MESSAGE         ]
```

Form requirements:
- All inputs styled to match the terminal theme: transparent or dark background, monospace
  font, border using the existing `--border` CSS variable, focus ring using `--teal` /
  `--cyan` accent colour.
- `Message` is a `<textarea>` with at least 3 visible rows.
- On submit: validate that all three fields are non-empty; if invalid, show an inline
  terminal-style error line in red (`-- error: all fields required --`); if valid, show a
  success line in green (`-- message queued --`) and clear the form. No backend required —
  client-side only for now.
- Use React controlled components (`useState`) for all field values and the
  status message.
- Do not use an HTML `<form>` element — use a `<div>` with an `onClick` on the submit button.

Import and render `<ContactPanel />` in `DesktopScreen.tsx` in the grid slot previously
occupied by `<HtopPanel />`. Update the grid CSS so the contact panel spans the full
bottom-right area with no leftover gap.

---

## Constraints

- Do not change the visual design or colour palette of any existing panel not mentioned above.
- Do not remove or alter `BtopPanel`, `RangerPanel`, or `NvimPanel`.
- All new components must be typed in TypeScript (no `any`).
- Preserve existing `useEffect` cleanup patterns for timers.
- After all changes, run `npm run build` mentally and confirm there are no missing imports,
  unused variables flagged by ESLint, or broken grid slots.