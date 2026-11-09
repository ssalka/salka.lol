---
name: ui
description: Design system and UI component guidelines for @ssalka/ui. Use when working with UI components, styling, colors, typography, or theming.
---

# UI Design System

This skill covers the `@ssalka/ui` package - the shared UI component library and design system.

## Package Overview

- **Location**: `packages/ui/`
- **Package name**: `@ssalka/ui`
- **Based on**: [shadcn/ui](https://ui.shadcn.com/) with [Radix UI](https://www.radix-ui.com/) primitives
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **Design system**: Neo-Industrial (Concrete light / Foundry dark)
- **Typography**: Barlow, IBM Plex Mono, Barlow Condensed

## Design Token Architecture

The system uses a 3-layer token architecture:

```
Layer 3: COMPONENT TOKENS (in component files)
         e.g., button styles, card shadows
              ↑
Layer 2: SEMANTIC TOKENS (src/tokens/semantic.css)
         e.g., --primary, --background, --success
         Concrete (:root) and Foundry (.dark) themes
              ↑
Layer 1: PRIMITIVE TOKENS (src/tokens/primitives.css)
         e.g., --ni-concrete-brand, --ni-foundry-surface-100
         Raw values, never use directly
```

### Token Usage Rules

| Token Layer | Use In Components? | Use In App Code?    |
| ----------- | ------------------ | ------------------- |
| Primitives  | Never              | Never               |
| Semantics   | Yes                | Yes                 |
| Component   | Yes (internally)   | Use component props |

## Neo-Industrial Design System

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

### Status Colors

- `success`, `warning`, `error`, `info`
- Each has: DEFAULT, foreground, background, border variants

### Sidebar Colors

Gunmetal plate: `sidebar-background`, `sidebar-foreground`, `sidebar-border`, `sidebar-accent`, `sidebar-primary`, `sidebar-muted`

## Importing Components

Always import components individually for tree-shaking:

```tsx
// Incorrect - barrel import prevents tree-shaking
import { Button, Card } from '@ssalka/ui';
// Correct - individual imports
import { Button } from '@ssalka/ui/components/button';
import { Card } from '@ssalka/ui/components/card';
```

## Key Components

### Button

Uses `class-variance-authority` (CVA) for variants:

```tsx
import { Button } from '@ssalka/ui/components/button';

// Variants: default, destructive, outline, secondary, ghost, link
<Button variant="default">Primary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Sizes: default, xs, sm, lg, icon, icon-sm, icon-xs
<Button size="sm">Small</Button>
<Button size="icon"><Icon /></Button>

// Intents: success, warning, info, error (works with variant)
<Button intent="success">Saved</Button>
<Button intent="error" variant="ghost">Error</Button>

// Polymorphic with asChild
<Button asChild><Link href="/home">Home</Link></Button>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@ssalka/ui/components/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>;
```

### Typography

```tsx
import { H1, H2, H3, H4, P, SmallCapsLabel } from '@ssalka/ui/components/typography';

<H1>Page Title</H1>           // text-4xl font-bold
<H2>Section</H2>              // text-2xl font-semibold
<H3>Subsection</H3>           // text-lg font-semibold
<P>Paragraph text</P>         // text-sm leading-tight
<SmallCapsLabel>Label</SmallCapsLabel>  // small-caps, muted
```

### Typography CVA Utility

```tsx
import { typography } from '@ssalka/ui/styles/typography';

// Size: 7xl, 6xl, 5xl, 4xl, 3xl, 2xl, xl, lg, md, sm, xs
// Weight: light, normal, medium, semibold, bold
// Color: ink, muted, brand (brand-text)
// Variant: code, codeBlock, paragraph, placeholder
// Caps: normal, small

<span className={typography({ size: 'lg', weight: 'semibold', color: 'muted' })}>Styled text</span>;
```

### Input

```tsx
import { Input } from '@ssalka/ui/components/input';

// Supports onEnter callback
<Input placeholder="Enter text..." onEnter={(e, value) => console.log(value)} />;
```

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription, AlertAction } from '@ssalka/ui/components/alert';

// Variants: default, error, info, success, warning, secondary
<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong</AlertDescription>
  <AlertAction><Button size="sm">Retry</Button></AlertAction>
</Alert>

// Compact mode
<Alert variant="info" compact>Quick info</Alert>
```

### Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@ssalka/ui/components/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Sidebar

Full-featured sidebar with mobile sheet support:

```tsx
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@ssalka/ui/components/sidebar';

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>Logo</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Section</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Home">
              <HomeIcon />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>Footer</SidebarFooter>
  </Sidebar>
  <SidebarTrigger />
  <main>Content</main>
</SidebarProvider>;
```

## Utility Functions

### cn() - Class Name Merger

```tsx
import { cn } from '@ssalka/ui/utils';

// Combines clsx and tailwind-merge
cn('bg-red-500', condition && 'text-white', 'bg-blue-500');
// Result: 'bg-blue-500 text-white' (tailwind-merge resolves conflicts)
```

### Other Utilities

```tsx
import { cn, isMobile, prefersReducedMotion, toast } from '@ssalka/ui/utils';

// Toast notifications (via sonner)
toast('Message saved');
toast.success('Success!');
toast.error('Error occurred');

// Motion preference check
if (!prefersReducedMotion) {
  // Run animation
}
```

## Tailwind Configuration

### Using the Preset

```ts
// tailwind.config.ts
import uiPreset from '@ssalka/ui/tailwind-preset';

export default {
  presets: [uiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../ui/src/**/*.{ts,tsx}', // Include UI package
  ],
};
```

### CSS Entry Point

```css
@import '@ssalka/ui/src/tailwind.css';
@config './tailwind.config.ts';
```

## Custom Utilities

Defined in `src/tailwind.css`:

- `small-caps` - Applies `font-variant-caps: all-small-caps`
- `caps-normal` - Resets to normal caps
- `squircle` - iOS-style rounded corners (with fallback)
- `page` - Standard page padding (`p-2 md:p-4`)

Pattern utilities are in `src/styles/patterns.css` (see Patterns above).

## Spacing Guidelines

| Context | Padding      | Gap           |
| ------- | ------------ | ------------- |
| Page    | `p-2 md:p-4` | `space-y-4`   |
| Card    | `p-6`        | `space-y-1.5` |
| Form    | `p-4`        | `space-y-4`   |

## Border Radius Scale

| Token        | Value | Usage                    |
| ------------ | ----- | ------------------------ |
| `rounded`    | 0     | Default: panels, buttons |
| `rounded-sm` | 2px   | Inputs and tags          |
| `rounded-md` | 4px   | Dialogs and menus        |

Don't use `rounded-lg` or larger in new UI.

## Shadows

**No shadows.** Separate layers with hairline rules, corner brackets and surface steps.

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

## Animation Tokens

### Durations

- `duration-150` - Micro-interactions
- `duration-200` - Standard transitions
- `duration-300` - Page transitions

### Built-in Animations

- `animate-fade-in`, `animate-fade-out`
- `animate-scale-in`, `animate-scale-out`
- `animate-slide-in-from-top/bottom/left/right`
- `animate-accordion-down`, `animate-accordion-up`

Animations automatically disable when `prefers-reduced-motion: reduce` is set.

## Dark Mode

Foundry (dark) is enabled via the `dark` class on the document root; Concrete (light) is the default:

```html
<html class="dark"></html>
```

All semantic tokens automatically adapt. Never hardcode light/dark variants:

```tsx
// Correct - automatically adapts
<div className="bg-background text-foreground" />

// Incorrect - manual dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
```

## Best Practices

### Do

- Use semantic tokens (`bg-surface-200`, `text-ink-muted`, `bg-primary`)
- Use `brand` once per view, and pair status colours with a word or marker
- Import components individually for tree-shaking
- Use component variants via props, not custom styling
- Follow the typography scale
- Use `cn()` for conditional class merging

### Don't

- Use raw Tailwind colors (`bg-gray-500`, `text-purple-600`)
- Add shadows, gradients or glows
- Use primitive tokens directly
- Add one-off spacing values
- Create custom colors outside the token system
- Import from the barrel export (`@ssalka/ui`)

## File Structure

```
packages/ui/
├── src/
│   ├── tokens/
│   │   ├── primitives.css    # Layer 1: Raw values
│   │   └── semantic.css      # Layer 2: Semantic mappings
│   ├── colors.css            # Token exports + @theme
│   ├── tailwind.css          # Main entry point
│   ├── styles/
│   │   ├── patterns.css      # Pattern utilities (grids, rings, stripes)
│   │   ├── typography.ts     # Typography CVA
│   │   └── colors.ts         # Color type exports
│   ├── utils.ts              # cn(), toast, etc.
│   └── components/           # UI components
├── tailwind-preset.ts        # Tailwind preset config
└── README.md                 # Full documentation
```

## Adding New Components

Use the shadcn CLI to add components:

```bash
# works from client or ui package, or from root
pnpm add-component <component-name>
```

This runs `pnpm dlx shadcn@latest add` which will scaffold the component following the design system patterns.
