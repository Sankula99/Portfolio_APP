---
name: Shishir Sankula Portfolio
description: Hire-screen terminal shell — Overview first, ice accent scarce
colors:
  ice: "#7ec8e0"
  ice-dim: "#4a8fa8"
  ice-dark: "#1e4d60"
  bg: "#0a0a0c"
  bg2: "#0f1014"
  panel: "#111316"
  panel2: "#0d0f12"
  bar: "#080809"
  slate: "#c2c8d4"
  grey-1: "#8a8f98"
  grey-2: "#8b919b"
  grey-3: "#7a808a"
  grey-4: "#1e2128"
  green: "#5ea880"
  amber: "#a89460"
  border: "rgba(255, 255, 255, 0.07)"
  border-h: "rgba(255, 255, 255, 0.14)"
typography:
  display:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(28px, 4vw, 40px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.grey-1}"
    rounded: "{rounded.sm}"
    padding: "7px 12px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ice}"
  button-primary:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "7px 12px"
  button-primary-hover:
    backgroundColor: "{colors.ice-dim}"
    textColor: "{colors.bg}"
  panel:
    backgroundColor: "{colors.panel}"
    rounded: "8px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.grey-2}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.grey-1}"
    rounded: "{rounded.md}"
    padding: "8px 10px"
---

# Design System: Shishir Sankula Portfolio

## Overview

**Creative North Star: "The Hire-Screen Shell"**

The portfolio is a terminal/desktop shell whose default Overview carries the full evidence path. Terminal is optional craft — never required to find resume, work, or contact. Every visual decision answers one question: does this help a recruiter decide faster?

Tone is calm, precise, and legible (supporting principle from The Midnight Workstation). The interface should feel like a working tool, not a costume. Ice on carbon is scarce by design (supporting principle from Ice on Carbon): `--ice` appears only for the primary action, active tab, focus and hover, the status system, and key result figures.

**Anti-references:** no neon glow, no hacker-green fills, no SaaS pastels, no gradient washes, no glow on text or cards.

**Key Characteristics:**
- Overview-first hire screen; Terminal optional
- Near-black carbon surfaces with tonal panel layers
- Scarce glacier ice accent (`#7ec8e0`)
- Syne for display names; JetBrains Mono for body/UI
- Bracketed ghost buttons; one filled ice CTA per view
- Flat elevation; owl ring is the only allowed shadow

## Colors

A cold cyan signal on near-black carbon. Neutrals do the work; ice is rare.

### Primary
- **Glacier Ice** (`#7ec8e0` / `--ice`): filled primary CTA, active tab text, focus rings, hover emphasis, key result figures.
- **Depth Ice** (`#4a8fa8` / `--ice-dim`): active-surface borders, primary hover fill, owl ring stroke.
- **Abyss Ice** (`#1e4d60` / `--ice-dark`): compact status chips (e.g. nvim mode pill) and reserved deep accent.

### Neutral
- **Carbon Black** (`#0a0a0c` / `--bg`): page ground.
- **Panel Carbon** (`#111316` / `--panel`): primary surface.
- **Inset Carbon** (`#0d0f12` / `--panel2`): titlebars and nested cards.
- **Slate Text** (`#c2c8d4` / `--slate`): names, headings, high-emphasis copy.
- **Body Grey** (`#8a8f98` / `--grey-1`): default body text.
- **Meta Grey** (`#8b919b` / `--grey-2`): secondary meta.
- **Mute Grey** (`#7a808a` / `--grey-3`): titlebars and labels.
- **Hairline** (`rgba(255,255,255,0.07)` / `--border`): default borders.

### Status
- **Signal Green** (`#5ea880` / `--green`): availability / status dots.
- **Signal Amber** (`#a89460` / `--amber`): in-progress markers.

### Named Rules
**The Scarce Ice Rule.** `--ice` is used only for primary action, active tab, focus/hover, status system accents, and key result figures. Never for decorative text, static borders, or background washes.

**The No Glow Rule.** No neon glow, no glow on text or cards, no ice box-shadow washes. The owl ring is the sole permitted shadow.

## Typography

**Display Font:** Syne (with system-ui)
**Body Font:** JetBrains Mono (with ui-monospace)
**Label/Mono Font:** JetBrains Mono

**Character:** Display is geometric and confident for the name and section titles; body stays monospace so the shell reads as a working terminal without costume neon.

### Hierarchy
- **Display** (700, `clamp(28px, 4vw, 40px)`): Overview hero name (`h1`).
- **Headline** (600, 16px): panel headings, nvim name.
- **Title** (600, 15px): experience/project titles.
- **Body** (400, 13–14px, ~72ch max on pitch): evidence copy.
- **Label** (400, 12px, tracked uppercase where used): form labels, chip text, titlebars (lowercase).

### Named Rules
**The Tool Type Rule.** Mono for UI and evidence; Syne only for identity headings. Do not introduce new typefaces.

## Layout

Desktop shell centered in an `app-shell` with 16px inline padding. Overview stacks hero → building strip → featured projects → experience → education → skills → contact. Spacing rhythm uses 4px multiples (4 / 8 / 10 / 12 / 14 / 16 / 24). Breakpoints observed: 480px (form stack), 700px (topbar / nvim stack), 900px (hero owl side-by-side; contact columns), 1100px (terminal grid collapses). No horizontal page overflow from 320–1440px; wide code scrolls inside its container.

### Named Rules
**The Overview Path Rule.** All resume, work, and contact evidence is reachable on Overview. Terminal never becomes the primary route.

## Elevation & Depth

Flat tonal layers. Depth comes from background steps (`--bg` → `--panel` → `--panel2`) and 1px borders, not shadows. Active surfaces use a 1px `--ice-dim` border. Panel hover only brightens the border to `--border-h`.

### Shadow Vocabulary
- **Owl ring only** (`box-shadow: 0 0 24–28px rgba(126, 200, 224, 0.18–0.2)`): hero owl and nvim owl avatar. Nowhere else.

### Named Rules
**The Flat Shell Rule.** No card glow, no drop shadows on panels or dialogs. If it is not the owl, it has no shadow.

## Shapes

Soft terminal geometry: panels ~8px, controls 6–10px (`--radius-md` / sm), pills `999px` for chips and status badges, circular owl/avatar frames. Borders are 1px hairlines; active emphasis uses `--ice-dim` rather than thicker rules.

## Components

### Buttons
- **Shape:** gently squared (6px) or pill for compact chrome.
- **Ghost (default):** transparent, `--border`, `--grey-1` text, bracketed labels like `[ Email me ]`. Hover → `--ice` text + `--ice-dim` border.
- **Primary (one per view):** filled `--ice` on `--bg` text — Overview hero `[ Download resume ]` only. Hover → `--ice-dim` fill.
- **Focus:** 2px `--ice` outline, 2px offset.

### Chips
- **Style:** hairline border, pill radius, `--grey-2` text; stack tags stay quiet.

### Cards / Containers
- **Corner Style:** 8px panels; nested project cards 8px on `--panel2`.
- **Background:** `--panel` / `--panel2`.
- **Shadow Strategy:** none (see Elevation).
- **Border:** `--border`; hover `--border-h`.
- **Internal Padding:** 12–16px body; 24px titlebar height.

### Inputs / Fields
- **Style:** transparent fill, `--border`, `--radius-md`, mono 13px.
- **Focus:** 2px `--ice` outline.
- **Error / Success:** `#c45c5c` / `--green` status text.

### Navigation
- Workspace pills: inactive hairline; active `--ice-dim` border + `--ice` text.
- Ranger dirs: active ice text + `--ice-dim` rail; no wash fill.

### Signature: Steampunk Owl
Circular framed mascot with `--ice-dim` ring and the sole ice glow. 96px mobile / 260px desktop in hero; 120px in Terminal nvim.

## Do's and Don'ts

### Do:
- **Do** ask: does this help a recruiter decide faster?
- **Do** keep Overview as the full evidence path; Terminal optional.
- **Do** use one filled ice button per view (Download resume).
- **Do** reserve ice for primary action, active tab, focus/hover, status accents, and key results.
- **Do** keep WCAG 2.2 AA contrast (≥4.5:1), visible `:focus-visible`, and `prefers-reduced-motion`.

### Don't:
- **Don't** put ice on decorative text, static borders, or background washes.
- **Don't** add neon glow, hacker-green themes, SaaS pastels, or gradient washes.
- **Don't** add box-shadow or text-shadow except the owl ring.
- **Don't** add colours, fonts, or dependencies; refine within existing CSS variables.
- **Don't** make Terminal required to find resume, work, or contact.
