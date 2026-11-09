# salka.lol → Neo-Industrial redesign plan

Source: your **Neo-Industrial** design system artifact (https://claude.ai/artifact/7uh5iDtzdQEPkPUgPBN4Eq): `project/tokens.json`, `project/README.md`, `project/components/bundle.{css,js}`.

## Where things stand

|         | Today                                                                           | Neo-Industrial                                                                                                              |
| ------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Palette | Dark cool neutrals, plus a warm `.brutal` scope with magenta / cyan / acid neon | Concrete (light, default) and Foundry (dark): surfaces, ink, hairline, gunmetal, steel, plus a single safety-orange `brand` |
| Accents | Three neon accents per view, with glows                                         | `brand` once per view. `hazard`, `patina` and `signal-red` only for status, and always paired with a word                   |
| Type    | Geist / Geist Mono / Bebas Neue                                                 | Barlow / IBM Plex Mono / Barlow Condensed                                                                                   |
| Effects | Glow shadows, chromatic glitch, conic border trace, particles, noise            | No shadows or gradients. Ticks, rules, corner brackets, grids, radar geometry                                               |
| Shape   | `--radius-md` default                                                           | Square (`radius-0`); `radius-sm` for inputs; 8px chamfer on primary actions                                                 |

## Phase 1: tokens in `@ssalka/ui`

1. **`tokens/primitives.css`**: add the 15 Neo-Industrial colours as primitives, one per theme (e.g. `--ni-concrete-surface-100`, `--ni-foundry-brand`). Leave the existing ramps alone for now; Phase 6 removes the unused ones.
2. **`tokens/semantic.css`**: rewrite it as two themes.
   - `:root` = **Concrete**, `.dark` = **Foundry**.
   - Expose the design system's own names as semantic tokens: `--surface-100/200/300`, `--ink`, `--ink-muted`, `--hairline`, `--gunmetal`, `--on-gunmetal`, `--steel`, `--brand`, `--brand-text`, `--hazard`, `--patina`, `--signal-red`, `--on-accent`.
   - Remap the existing shadcn tokens onto them so every current component re-themes without edits:
     - `background` → surface-100, `card` / `surface` → surface-200, `muted` / `surface-raised` → surface-300
     - `foreground` → ink, `muted-foreground` → ink-muted, `border` → hairline, `input` → ink-muted (control borders need ≥3:1)
     - `primary` → brand, `primary-foreground` → on-accent, `primary-hover` → hazard (the bundle's hover)
     - `link` → brand-text, `ring` → ink
     - `success` → patina, `warning` → hazard, `error` / `destructive` → signal-red, `info` → steel
     - `sidebar-*` → gunmetal / on-gunmetal
   - Delete the `.brutal` scope and the `--brutal-*` tokens.
3. **`tailwind-preset.ts`**
   - Register the new colour names as utilities: `bg-surface-200`, `text-ink-muted`, `border-hairline`, `bg-brand`, `text-brand-text`, etc.
   - Fonts: `sans: Barlow`, `mono: IBM Plex Mono`, `display: Barlow Condensed`.
   - Radius: `DEFAULT 0`, `sm 2px`, `md 4px`. Today's `rounded-lg` / `xl` values stay, but the site stops using them.
   - Type scale utilities from the tokens: `text-display-xl` (72/68), `text-display-lg` (40/40), `text-body` (15/22), `text-body-sm` (13/18), `text-label` (12/16, 0.08em, uppercase mono), `text-readout` (32/32 mono 500).
4. **Fonts**: load Barlow (400/600), Barlow Condensed (700) and IBM Plex Mono (400/500/600) from Google Fonts in `client/index.html`, replacing Bebas Neue. Remove the Geist `@font-face` blocks from both `fonts.css` files, and the `public/fonts/Geist*` files if nothing else uses them.
5. **Update the `ui` skill doc** (`.claude/skills/ui/SKILL.md`) for the new tokens, fonts, radius and "no shadows" rule.

## Phase 2: Neo-Industrial components in `@ssalka/ui`

These are ports of `bundle.js` / `bundle.css` to typed React and Tailwind using CVA, matching the existing component style.

| New file                       | Port of   | Notes                                                                                                                                                                                                            |
| ------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/panel.tsx`         | `Panel`   | `<section>` with hairline border, surface-200 fill, four 12px corner brackets, optional `title` / `meta` header, `accent` prop (brackets turn `brand`)                                                           |
| `components/readout.tsx`       | `Readout` | label / value / unit / delta, with the ruler-tick strip                                                                                                                                                          |
| `components/tag.tsx`           | `Tag`     | tones: `neutral`, `brand`, `hazard`, `ok`, `alert`, `redacted`. `ok` and `alert` get the square marker, so status isn't shown by colour alone                                                                    |
| `components/button.tsx` (edit) | `Button`  | `default` → chamfered brand fill with hazard hover; `outline` / `secondary` → ink-muted border; `ghost` → brand-text. Mono uppercase label, `rounded-none`. Existing variant names stay, so callers don't change |
| `components/input.tsx` (edit)  | `Field`   | mono 13px, surface-100, ink-muted border, `radius-sm`, brand-text focus outline. Add a small `Field` wrapper (label + hint with `aria-describedby`)                                                              |
| `styles/patterns.css`          | Patterns  | Tailwind utilities `bg-dot-grid`, `bg-graph-paper`, `bg-cross-grid`, `scanlines`, `hazard-stripes`, `range-rings`, drawn in hairline / steel. One per surface                                                    |

Each component gets a small Vitest render test (testing-patterns skill).

## Phase 3: redesign the homepage (`client/src`)

The page becomes an instrument console. The copy keeps its log-and-spec-sheet voice, which already suits the system.

- **`routes/index.tsx`**: drop `brutal noise-overlay grid-overlay`; use `bg-background` with a faint `bg-graph-paper` on the hero only.
- **`Nav.tsx`**: a gunmetal bar with on-gunmetal text. Left: a chamfered ID plate reading `SALKA.LOL`. Centre: mono clock as `T+HH:MM:SS` and a `NOMINAL` tag (`ok` tone, with marker). Right: `01 ABOUT / 02 PROJECTS / 03 LINKS` in label style. Add a `CONCRETE / FOUNDRY` theme switch wired to the existing `useSettingsStore().toggleDarkMode`.
- **`HeroSection.tsx`**: `STEVEN SALKA` in Barlow Condensed at display-xl, scaled up responsively with `clamp`, in ink. One `brand` element per view: a hazard-free orange bar or ID plate with `SOFTWARE ENGINEER`. Below it, a row of `Readout`s (e.g. `LAT 37.7988 N`, `LON 122.4505 W`, `UPTIME …`, `BUILD v4.0`). A range-ring / radar-sweep SVG on the right instead of `Particles`. Keep `data-testid="first-name"` on the first name so the e2e test still passes. The GSAP typing on the subtitle stays; the slam-in becomes a short clip-path wipe that fits the system.
- **`AboutSection.tsx`**: one `Panel` titled `01 // PROFILE` with meta `SEC.01 ACTIVE`, Barlow body text, and skills as neutral `Tag`s. Drop the giant watermark numbers (decoration that doesn't measure anything), or turn them into ruler ticks along the section edge.
- **`ProjectsSection.tsx`**: three `Panel`s in a grid. Header `PRJ_00 … PRJ_02`. Status as a `Tag`: `LIVE` → ok, `STABLE` → neutral, `DEV` → hazard. Tags are neutral. `VIEW →` is a ghost button. Replace the per-project magenta/cyan/acid accent maps with a single `accent` on whichever project you want to feature.
- **`LinksSection.tsx`**: a table-like list. Hairline rules between rows, mono label, description in ink-muted, and an arrow that moves on hover. No glow, no per-row accent colours.
- **Footer**: gunmetal strip with mono coordinates, `SYS: NOMINAL` tag and version, plus a serial-strip pattern.
- **Animations**: keep GSAP and the scroll reveals, but tone them down to wipes and tick-ins rather than flying characters. Everything keeps respecting `prefers-reduced-motion`.

## Phase 4: the glitch system (needs your decision)

The chromatic glitch, glow and border trace break the "no shadows, no gradients, colour marks one thing" rules. Options:

- **A (recommended): restyle it as a signal-control instrument.** Keep `GlitchControlPanel` and the store, rebuilt as a `Panel` with `Readout` values and NI sliders and switches. The glitch's colour flicker uses `brand` / `patina` instead of magenta / cyan, and it's off by default.
- **B: remove it.** Delete `GlitchControlPanel.tsx`, `state/glitch.ts`, `useGlitchText`, and the glitch/glow CSS.
- **C:** keep it as it is (it will clash).

Either way, delete these from `client/src/tailwind.css`: `glow-*`, `text-glow-*`, `border-trace`, `noise-overlay`, `crosshair` (now part of `Panel`) and the `@source inline` safelist of neon ramps.

## Phase 5: theming behaviour (needs your decision)

The system's default is Concrete (light), but salka.lol is dark today. Options:

- **A:** Concrete by default, Foundry via the nav toggle, and follow `prefers-color-scheme` on the first visit.
- **B:** Foundry by default (closest to today's mood), with a toggle to Concrete.

Either way, add a tiny inline script in `index.html` that sets `.dark` before first paint, to avoid a theme flash.

## Phase 6: clean-up and checks

- Remove unused primitives (magenta, acid, cyan, warm) and update `styles/colors.ts` and the `typography` CVA colour list to match.
- `pnpm checks`, `pnpm test`, `pnpm test:e2e`.
- Screenshot both themes at desktop and mobile widths, and check the contrast rules in the design system README (ink ≥ 9:1, ink-muted ≥ 4.5:1).
- Optional: write the ported components back to the Claude Design project with `/design-sync`, so the artifact and the code don't drift apart. Standalone Claude Design closes on Dec 14, 2026.

## Commit sequence (one branch: `claude/blissful-wright-jqn52p`)

1. `ui: add Neo-Industrial tokens, fonts and Tailwind mapping`
2. `ui: add Panel, Readout, Tag, Field; restyle Button and Input`
3. `ui: add pattern utilities`
4. `client: redesign homepage sections with Neo-Industrial`
5. `client: restyle or remove the glitch system` (per Phase 4)
6. `chore: remove the old neon palette and utilities; update the ui skill doc`

## Rough size

About 15 files changed in `ui`, 8 in `client`, plus about 4 new component and test files.
