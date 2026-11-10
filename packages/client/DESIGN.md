---
name: salka.lol
description: Steven Salka's personal homepage, built as a Neo-Industrial field instrument.
colors:
  concrete-surface-100: "#d9d8d4"
  concrete-surface-200: "#cbcac5"
  concrete-surface-300: "#b9b8b2"
  concrete-ink: "#16181a"
  concrete-ink-muted: "#464a4e"
  concrete-hairline: "#8d9093"
  concrete-gunmetal: "#2c3338"
  concrete-steel: "#5b6770"
  concrete-brand: "#ff5a1f"
  concrete-brand-text: "#8f2c08"
  concrete-hazard: "#f2c200"
  concrete-patina: "#2f7f74"
  concrete-signal-red: "#c4281c"
  foundry-surface-100: "#16181a"
  foundry-surface-200: "#1e2124"
  foundry-surface-300: "#2a2e32"
  foundry-ink: "#ecebe6"
  foundry-ink-muted: "#a3a7a9"
  foundry-hairline: "#454b50"
  foundry-gunmetal: "#3a434a"
  foundry-steel: "#8c99a3"
  foundry-brand: "#ff6a2b"
  foundry-brand-text: "#ff8a57"
  foundry-hazard: "#ffd21f"
  foundry-patina: "#4fb3a5"
  foundry-signal-red: "#ff5a4d"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 0.94
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.47
  readout:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.08em"
rounded:
  none: "0"
  sm: "2px"
  md: "4px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "24": "96px"
components:
  button-primary:
    backgroundColor: "{colors.concrete-brand}"
    textColor: "{colors.concrete-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.concrete-hazard}"
  button-outline:
    textColor: "{colors.concrete-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "40px"
  button-ghost:
    textColor: "{colors.concrete-brand-text}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "32px"
  panel:
    backgroundColor: "{colors.concrete-surface-200}"
    textColor: "{colors.concrete-ink}"
    rounded: "{rounded.none}"
    padding: "16px"
  tag:
    textColor: "{colors.concrete-ink-muted}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  nav:
    backgroundColor: "{colors.concrete-gunmetal}"
    textColor: "{colors.concrete-surface-100}"
---

<!-- Creative North Star and component philosophy were inferred from the codebase; the user did not answer the naming question. Revise freely. -->

# Design System: salka.lol

## Overview

**Creative North Star: "The Field Instrument"**

The site reads as a ruggedized piece of survey and telemetry gear. Every mark looks like it measures something: coordinates, local time, elapsed mission time, build number, project status. Panels are ruled plates with corner brackets, values sit over ruler-tick strips, and the hero is backed by graph paper with a radar sweep. The terminal voice (`STATUS //`, `PRJ_00`, `SEC.01 ACTIVE`) is part of the visual system, not just copy.

Two themes share one token set: **Concrete** (light, default) is poured-concrete grey with near-black ink, and **Foundry** (dark) is a soot-black control room. Both carry exactly one safety-orange signal per view. Depth comes from rules, brackets, and surface steps, never from shadows. Motion is mechanical: clip-path wipes, ticking readouts, typed status lines, and an opt-in signal glitch the visitor can tune from a control panel.

The direction is neo-industrial / military-intelligence, built from neutral instrument forms (range rings, crosshairs, coordinates, redaction bars). It never uses real insignia.

**Key Characteristics:**
- Square steel geometry; the single flourish is an 8px chamfer.
- Mono uppercase labels everywhere data lives; condensed display type for names and titles.
- One brand fill per view; status colors always paired with a word or marker.
- Flat surfaces separated by hairlines and corner brackets.
- Mechanical, wipe-and-tick motion; glitch is opt-in and visitor-controlled.

## Colors

Concrete and gunmetal neutrals with one safety-orange signal and three status tones.

### Primary
- **Safety Orange** (`concrete-brand` / `foundry-brand`): the one fill per view, e.g. the `SOFTWARE ENGINEER` ID plate, primary buttons, the featured project's corner brackets. Text on it is ink.
- **Rust Text** (`concrete-brand-text` / `foundry-brand-text`): orange used as text (links, ghost buttons), darkened or lightened to pass contrast.

### Secondary
- **Hazard Yellow** (`concrete-hazard` / `foundry-hazard`): warning status, primary-button hover, the `::selection` band.
- **Patina Teal** (`concrete-patina` / `foundry-patina`): healthy/LIVE status markers; also the second channel of the glitch split.
- **Signal Red** (`concrete-signal-red` / `foundry-signal-red`): faults only.

### Neutral
- **Concrete / Foundry surfaces 100–300**: page, panel, inset well and hover row, in that order.
- **Ink / Ink Muted**: primary and secondary text (ink ≥ 9:1, ink-muted ≥ 4.5:1 on every surface).
- **Hairline**: 1px decorative rules, deliberately under 3:1.
- **Gunmetal**: heavy plates (nav, footer) with surface-100 text on top.
- **Steel**: cool mid-tone for charts and secondary fills, never text.

### Named Rules
**The One Signal Rule.** Safety orange fills one thing per view. A second orange fill means the first one stops meaning anything.

**The Word-With-Color Rule.** Hazard, patina and signal-red never carry meaning alone; pair each with a word (`LIVE`, `DEV`) or a square marker.

## Typography

**Display Font:** Barlow Condensed 700 (with Arial Narrow)
**Body Font:** Barlow 400/600 (with system-ui)
**Label/Mono Font:** IBM Plex Mono 400/500/600

**Character:** Condensed industrial stencil-weight headlines over a plain workhorse sans, with mono doing the instrument work: every label, value, code, and control.

### Hierarchy
- **Display** (700, `clamp(4.5rem, 15vw, 11rem)` for the hero name, 72/68 utility otherwise, uppercase, leading ~0.86): the name and hero titles only.
- **Headline** (700, 40/40, uppercase): section titles and project names.
- **Readout** (mono 500, 32/32, tabular numerals): live values in `Readout`.
- **Body** (400, 15/22; lg 18 for lead paragraphs; max ~65ch): running text.
- **Label** (mono 600, 12/16 or 11/16, 0.08em, uppercase): panel headers, tags, buttons, nav, metadata.

### Named Rules
**The Mono-Means-Data Rule.** If it's a value, a status, a code, or a control, it's set in IBM Plex Mono uppercase. Prose stays in Barlow.

## Layout

Single column of full-bleed sections with centered containers: `max-w-6xl` for hero and projects, `max-w-4xl` for prose sections. Gutters are 24px on mobile and 48px from `md`. Sections breathe at 96px vertical padding. The hero fills the viewport, puts the name block and radar side by side from `lg` (`1fr auto`), and drops the radar below `lg`. Project cards go from one column to three at `md`. Readouts sit in a 2-column grid on mobile and wrap in a row from `sm`. Spacing follows a 4px base (4, 8, 12, 16, 24, 32, 48, 96).

## Elevation & Depth

Flat by design: no shadows, no gradients, no glows. Depth comes from surface steps (100 → 200 → 300), 1px hairline borders, 2px corner brackets, and background patterns (`bg-graph-paper`, `bg-dot-grid`, `bg-cross-grid`, `scanlines`, `hazard-stripes`, `range-rings`, at most one per surface, tinted through `--pattern-color`).

### Named Rules
**The Plate Steel Rule.** Layers are separated by rules and brackets, never by shadow. If something needs to lift, give it a surface step and a border.

## Shapes

Square corners by default (0). Inputs and tags may use 2px, dialogs and menus 4px; nothing rounder. The one recurring silhouette is the 8px top-right chamfer (`clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)`) on primary buttons and ID plates, dropped on focus so the outline shows. Panels carry four 12px L-shaped corner brackets with 2px strokes. Ruler ticks (1px every 8px) underline readouts; the scroll cue is a vertical tick ladder.

## Components

Machined and exact: square steel, hairline rules, crisp state changes.

### Buttons
- **Shape:** square (0), with the 8px chamfer on primary.
- **Primary:** safety-orange fill, ink text, mono label, 40px tall, 16px horizontal padding. Hover swaps to hazard yellow.
- **Outline / Secondary:** transparent with an ink-muted border; hover fills surface-300.
- **Ghost:** rust-text label on transparent; hover fills surface-300. Used for `VIEW →` links, whose arrow nudges 4px right on hover.
- **Focus:** 2px ink outline, offset 2px.

### Chips (Tag)
- **Style:** 11px mono uppercase, 600 weight, 0.08em tracking, 1px border, 2px/8px padding, square.
- **Tones:** neutral (ink-muted border and text), brand and hazard (filled, ink text), ok and alert (colored border plus a 6px square marker), redacted (ink bar, text hidden, `aria-label="Redacted"`).

### Cards / Containers (Panel)
- **Corner Style:** square, with four 12px corner brackets in ink (brand when `accent`, once per view).
- **Background:** surface-200.
- **Shadow Strategy:** none (see Elevation).
- **Border:** 1px hairline; header separated by a hairline rule.
- **Header:** mono label row, title left (`01 // PROFILE`), meta right in ink-muted (`SEC.01 ACTIVE` or a status Tag).
- **Internal Padding:** 16px default; 20–32px for content panels.

### Navigation
- Gunmetal plate pinned at the top, with surface-100 mono labels prefixed by section index (`01 ABOUT`), a `T+HH:MM:SS` elapsed-time readout, and a segmented CONCRETE / FOUNDRY theme switch (active segment inverts to a light fill on gunmetal). Wipes down on load.

### Readout (signature)
- Mono label over a large tabular value with an optional ink-muted unit, sitting on a ruler-tick strip; optional delta line below. Used for LAT / LON / LOCAL / BUILD in the hero.

### Glitch Control Panel (signature)
- The visitor-facing control for the signal glitch: chromatic split of the display text into brand and patina channels, with tunable parameters. It stays opt-in and must keep working.

## Do's and Don'ts

### Do:
- **Do** keep safety orange to one fill per view; use rust text for orange words.
- **Do** set labels, values, statuses and controls in IBM Plex Mono uppercase at 0.08em tracking.
- **Do** separate layers with hairlines, corner brackets, and surface steps.
- **Do** keep the terminal voice in labels (`STATUS //`, `PRJ_00`, `SEC.01 ACTIVE`).
- **Do** make motion mechanical: clip-path wipes, ticks, typed text; respect reduced motion (durations drop to 0).

### Don't:
- **Don't** add shadows, gradients, or glows.
- **Don't** round corners past 4px, or use pills.
- **Don't** show status with color alone.
- **Don't** use real military insignia or loaded emblems as ornament; stick to neutral instrument forms.
- **Don't** reference primitive tokens (`--ni-*`) in components; use the semantic tokens.
