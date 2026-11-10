# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **VCs and prospective Resolute customers** evaluating Steven Salka's engineering background and product sense, usually arriving from Resolute or a founder conversation.
- **Founders and collaborators** sizing up a potential partner or co-builder.
- **Fellow engineers** who found his open-source work or know him from the dev community.

## Product Purpose

salka.lol is Steven Salka's personal homepage. It shows who he is, what he builds, and how to reach him. Success means the visitor remembers him: the site itself is the proof of craft and product taste, more than any one click or contact.

## Positioning

The site is a working demonstration, not a résumé. Its interactive details (signal glitch the visitor can tune, live readouts, radar sweep) show the same engineering and product judgment that goes into Resolute.

## Operating Context

Single-page site: hero, About, Projects, Links, footer. Built with React 19, Vite, TanStack Router, Tailwind v4, GSAP, and the shared `@ssalka/ui` package in this monorepo. Dev server: `pnpm dev` at `localhost:5173`.

## Capabilities and Constraints

- Glitch effect with a visitor-facing control panel (`GlitchControlPanel`, `state/glitch.ts`).
- Concrete and Foundry palettes (theme switching via settings state).
- Projects list: Resolute (featured, in development), Aluna, claude-symphony.
- Contact: GitHub `ssalka`, LinkedIn `in/ssalka`, email `steven@salka.lol`.

## Brand Commitments

- Name: Steven Salka; domain salka.lol.
- Overall neo-industrial / military-intelligence design direction stays (instrument panels, readouts, coordinates, classified-document framing), using neutral forms rather than real military insignia.
- Glitch effect and its control panel stay.
- Terminal / readout voice stays: `STATUS //`, `PRJ_00`, `SEC.01 ACTIVE`, LAT/LON/LOCAL readouts, uppercase labels.

## Evidence on Hand

- Real projects with live links (resolute.fyi, GitHub repos) in `src/components/home/ProjectsSection.tsx`.
- No testimonials, client logos, metrics, or press. Don't make any up.

## Product Principles

1. The site is the proof: every detail should show craft a visitor can feel, not just read about.
2. Memorable over exhaustive: one strong impression beats a complete résumé.
3. Resolute gets the spotlight; the background and other projects back it up.
4. Playful mechanics, serious execution: the effects are toys, and they're built precisely.
