# @ssalka/ui

Shared UI component library and design system for this project.

## Overview

This package provides:

- **Design tokens** - A 3-layer token system (primitives → semantics → components)
- **UI components** - Reusable components from [shadcn/ui](https://ui.shadcn.com/) built on [Radix UI](https://www.radix-ui.com/)
- **Tailwind preset** - The Neo-Industrial theme: colours, type scale, radius and motion

---

## Design Token Architecture

The design system follows a 3-layer token architecture:

```
┌─────────────────────────────────────────────────────────────┐
│  COMPONENT TOKENS (Layer 3)                                 │
│  e.g., button-primary-bg, card-shadow, input-focus-ring     │
│  → Defined in component files                               │
├─────────────────────────────────────────────────────────────┤
│  SEMANTIC TOKENS (Layer 2)                                  │
│  e.g., --primary, --background, --success, --sidebar-*      │
│  → Defined in src/tokens/semantic.css                       │
│  → Concrete (light, :root) and Foundry (dark, .dark)        │
├─────────────────────────────────────────────────────────────┤
│  PRIMITIVE TOKENS (Layer 1)                                 │
│  e.g., --ni-concrete-brand, --ni-foundry-surface-100        │
│  → Defined in src/tokens/primitives.css                     │
│  → Raw values, no semantic meaning                          │
└─────────────────────────────────────────────────────────────┘
```

### Usage Rules

| Token Layer | Use In Components?  | Use In App Code?       |
| ----------- | ------------------- | ---------------------- |
| Primitives  | ❌ Never            | ❌ Never               |
| Semantics   | ✅ Yes              | ✅ Yes                 |
| Component   | ✅ Yes (internally) | ❌ Use component props |

### Color Token Categories

| Category    | Tokens                                  | Purpose                      |
| ----------- | --------------------------------------- | ---------------------------- |
| **Core**    | `background`, `foreground`, `surface-*` | Page backgrounds and text    |
| **Brand**   | `primary`, `secondary`, `accent`        | Brand actions and emphasis   |
| **Status**  | `success`, `warning`, `error`, `info`   | Feedback and validation      |
| **Sidebar** | `sidebar-*`                             | Navigation and sidebar areas |

---

## Neo-Industrial

The design system is **Neo-Industrial**: an instrument-panel look built from ruled panels, corner brackets, tick marks, mono readouts and radar geometry, on concrete and gunmetal with one safety-orange signal.

### Themes

| Theme        | Selector | Notes                                      |
| ------------ | -------- | ------------------------------------------ |
| **Concrete** | `:root`  | Light, the default                         |
| **Foundry**  | `.dark`  | Dark, the native mode for monitoring views |

Both themes share the same token names. The client sets `.dark` before first paint (inline script in `index.html`), from the saved setting or `prefers-color-scheme`.

### Colour tokens

| Token                            | Tailwind                                  | Usage                                                  |
| -------------------------------- | ----------------------------------------- | ------------------------------------------------------ |
| `surface-100` / `200` / `300`    | `bg-surface-100` … `bg-surface-300`       | Page / panels / inset wells, hover rows                |
| `ink`, `ink-muted`               | `text-ink`, `text-ink-muted`              | Primary and secondary text                             |
| `hairline`                       | `border-hairline`                         | 1px decorative rules; never the only edge of a control |
| `gunmetal`, `on-gunmetal`        | `bg-gunmetal`, `text-on-gunmetal`         | Heavy fills (nav, footer) and the text on them         |
| `steel`                          | `bg-steel`                                | Cool mid-tone for charts and secondary fills; no text  |
| `brand`, `brand-text`            | `bg-brand`, `text-brand-text`             | Safety orange: fill once per view / orange as text     |
| `hazard`, `patina`, `signal-red` | `bg-hazard`, `bg-patina`, `bg-signal-red` | Warning / healthy / fault. Always pair with a word     |
| `on-accent`                      | `text-on-accent`                          | Text on brand and hazard fills                         |

The shadcn tokens are mapped onto these, so existing components re-theme without edits: `background` → surface-100, `card` / `surface` → surface-200, `muted` → surface-300, `foreground` → ink, `muted-foreground` → ink-muted, `border` → hairline, `input` → ink-muted, `primary` → brand (hover: hazard), `link` → brand-text, `ring` → ink, `success` → patina, `warning` → hazard, `error` / `destructive` → signal-red, `info` → steel, `sidebar-*` → gunmetal.

### Colour rules

- `brand` appears **once per view**. As text, use `brand-text`; `brand` itself is a fill with `on-accent` text.
- Status colours (`hazard`, `patina`, `signal-red`) always come with a word or a marker (see `Tag`).
- Contrast: `ink` ≥ 9:1 and `ink-muted` ≥ 4.5:1 on every surface. Control borders use `ink-muted` (`border-input`); `hairline` is under 3:1 by design.
- **No shadows, no gradients, no glows.** Separate layers with rules, brackets and surface steps.

### Type

| Family           | Tailwind       | Usage                                       |
| ---------------- | -------------- | ------------------------------------------- |
| Barlow           | `font-sans`    | Running text                                |
| IBM Plex Mono    | `font-mono`    | Labels, values, controls, codes, timestamps |
| Barlow Condensed | `font-display` | Large titles                                |

All three are loaded from Google Fonts in the app's `index.html`.

| Utility           | Size / line height | Notes                             |
| ----------------- | ------------------ | --------------------------------- |
| `text-display-xl` | 72 / 68, 700       | Hero titles (`font-display`)      |
| `text-display-lg` | 40 / 40, 700       | Section titles (`font-display`)   |
| `text-body`       | 15 / 22            | Running text (the `body` default) |
| `text-body-sm`    | 13 / 18            | Captions, helper text             |
| `text-label`      | 12 / 16, 0.08em    | Pair with `font-mono uppercase`   |
| `text-readout`    | 32 / 32, 500       | Pair with `font-mono`             |

`cn()` knows these sizes, so `text-label` won't be merged away as a colour.

### Shape

Square by default (`rounded` = 0). `rounded-sm` (2px) for inputs and tags, `rounded-md` (4px) for dialogs and menus. The one flourish is the 8px chamfer on primary buttons and ID plates.

### Patterns

From `src/styles/patterns.css`. Use one per surface; tint with `[--pattern-color:…]`.

`bg-dot-grid`, `bg-graph-paper`, `bg-cross-grid`, `scanlines`, `hazard-stripes`, `range-rings`

### Components

```tsx
import { Field } from '@ssalka/ui/components/input';
import { Panel } from '@ssalka/ui/components/panel';
import { Readout } from '@ssalka/ui/components/readout';
import { Tag } from '@ssalka/ui/components/tag';

// Ruled panel with corner brackets; `accent` turns the brackets brand (one per view)
<Panel title="01 // PROFILE" meta="SEC.01 ACTIVE" accent>…</Panel>

// Mono value over a ruler-tick strip
<Readout label="LAT" value="37.7988" unit="°N" delta="+0.0001" />

// Tones: neutral, brand, hazard, ok, alert (with square marker), redacted
<Tag tone="ok">NOMINAL</Tag>

// Labelled input; the hint is linked with aria-describedby
<Field label="CALLSIGN" hint="Four letters" />
```

`Button` keeps its variant names: `default` is the chamfered brand fill (hazard on hover), `outline` / `secondary` have an `ink-muted` border, `ghost` is `brand-text`. Labels are mono uppercase.

---

## Installation

This package is internal to the this monorepo. Add it to your package dependencies:

```json
{
  "dependencies": {
    "@ssalka/ui": "workspace:*"
  }
}
```

Also add it as a reference in your package's tsconfig:

```json
{
  "references": [{ "path": "../common" }, { "path": "../ui" }]
}
```

---

## Usage

### Tailwind Configuration

Import the preset in your `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

import uiPreset from '@ssalka/ui/components/tailwind-preset';

const config: Config = {
  presets: [uiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../ui/src/**/*.{ts,tsx}', // Include UI package components
  ],
};

export default config;
```

### CSS Entrypoint

Import the design system in your main CSS file:

```css
@import '@ssalka/ui/src/tailwind.css';
@config './tailwind.config.ts';
```

### Components

Import components individually for optimal tree-shaking:

```tsx
import { Button } from '@ssalka/ui/components/button';
import { Card } from '@ssalka/ui/components/card';

function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Using Semantic Colors

Always use semantic tokens in your code:

```tsx
// ✅ Good - uses semantic tokens
<div className="bg-primary text-primary-foreground" />
<div className="bg-success-background text-success-foreground" />
<div className="border-border bg-surface-sunken" />

// ❌ Bad - uses raw colors
<div className="bg-purple-500 text-white" />
<div className="bg-green-100 text-green-800" />
<div className="border-gray-200 bg-gray-50" />
```

---

## Typography

See [Neo-Industrial → Type](#type).

### Typography Components

```tsx
import { H1, H2, H3, H4, P, SmallCapsLabel } from '@ssalka/ui/components/typography';

<H1>Page Title</H1>
<H2>Section Heading</H2>
<P>Body paragraph text</P>
<SmallCapsLabel>Form Label</SmallCapsLabel>
```

### Typography CVA Utility

```tsx
import { typography } from '@ssalka/ui/components/styles/typography';

const textClass = typography({
  size: 'lg',
  weight: 'semibold',
  color: 'muted',
});
```

---

## Spacing & Density

Use Tailwind's spacing scale. The system defines comfortable defaults:

| Context | Padding      | Gap           |
| ------- | ------------ | ------------- |
| Page    | `p-2 md:p-4` | `space-y-4`   |
| Card    | `p-6`        | `space-y-1.5` |
| Form    | `p-4`        | `space-y-4`   |

---

## Border Radius

| Token        | Value | Usage                    |
| ------------ | ----- | ------------------------ |
| `rounded`    | 0     | Default: panels, buttons |
| `rounded-sm` | 2px   | Inputs and tags          |
| `rounded-md` | 4px   | Dialogs and menus        |

`rounded-lg` and larger still exist for legacy components, but don't use them in new UI.

---

## Shadows & Elevation

**Don't use shadows.** The `shadow-*` utilities remain for legacy components only. Separate layers with hairline rules, corner brackets and surface steps (`surface-100` → `200` → `300`).

---

## Motion & Animation

### Duration Tokens

| Token          | Value | Usage                |
| -------------- | ----- | -------------------- |
| `duration-150` | 150ms | Micro-interactions   |
| `duration-200` | 200ms | Standard transitions |
| `duration-300` | 300ms | Page transitions     |

### Built-in Animations

| Class                    | Effect           |
| ------------------------ | ---------------- |
| `animate-fade-in`        | Fade in          |
| `animate-scale-in`       | Scale + fade in  |
| `animate-accordion-down` | Accordion expand |

### Reduced Motion

Animations automatically disable when `prefers-reduced-motion: reduce` is set.

---

## Z-Index Scale

| Token              | Value | Usage               |
| ------------------ | ----- | ------------------- |
| `z-dropdown`       | 100   | Dropdowns           |
| `z-sticky`         | 200   | Sticky headers      |
| `z-modal-backdrop` | 400   | Modal overlays      |
| `z-modal`          | 500   | Modals              |
| `z-popover`        | 600   | Popovers            |
| `z-tooltip`        | 700   | Tooltips            |
| `z-toast`          | 800   | Toast notifications |

---

## Dark Mode

Foundry (dark) is enabled via the `dark` class on the document root; Concrete (light) is the default:

```html
<html class="dark"></html>
```

All semantic tokens automatically adapt. Never hardcode light/dark variants:

```tsx
// ✅ Good - automatically adapts
<div className="bg-background text-foreground" />

// ❌ Bad - manual dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
```

---

## Governance & Best Practices

### PR Checklist for Token Changes

When modifying design tokens, ensure:

- The change is documented in this README
- Both light and dark mode values are updated
- Contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for UI)
- All affected components are tested
- No hardcoded colors bypass the token system

### Code Review Guidelines

**Do:**

- Use semantic tokens (`bg-primary`, `text-muted-foreground`)
- Use component variants over custom styling
- Follow the existing typography scale

**Don't:**

- Use raw Tailwind colors (`bg-gray-500`, `text-purple-600`)
- Add one-off spacing values
- Create custom colors outside the token system

### Adding New Tokens

1. Add primitive to `src/tokens/primitives.css` if it's a new raw value
2. Create semantic mapping in `src/tokens/semantic.css`
3. Expose in `tailwind-preset.ts`
4. Document in this README
5. Ensure both light and dark mode are handled

---

## File Structure

```
packages/ui/
├── src/
│   ├── tokens/
│   │   ├── primitives.css    # Layer 1: Raw values
│   │   └── semantic.css      # Layer 2: Semantic mappings
│   ├── colors.css            # Token exports + @theme
│   ├── fonts.css             # Font face definitions
│   ├── tailwind.css          # Main entry point
│   ├── styles/
│   │   ├── typography.ts     # Typography CVA
│   │   └── colors.ts         # Color type exports
│   └── components/           # UI components
├── tailwind-preset.ts        # Tailwind preset config
├── tailwind.config.ts        # Internal config
└── README.md                 # This file
```

---

## Accessibility

The design system is built with accessibility in mind:

- **Color contrast**: All text meets WCAG AA (4.5:1 ratio)
- **Focus indicators**: Visible focus rings on all interactive elements
- **Motion**: Respects `prefers-reduced-motion`
- **Screen readers**: Proper ARIA labels in components
