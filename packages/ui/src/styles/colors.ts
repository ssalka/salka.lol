/**
 * =============================================================================
 * DESIGN SYSTEM - COLOR UTILITIES
 * =============================================================================
 *
 * TypeScript utilities for working with design system colors.
 * These constants should mirror the color tokens defined in CSS.
 * =============================================================================
 */

/**
 * Text colours available in the typography system.
 * Each maps to a Neo-Industrial text token (see `typography.ts`).
 */
export const colors = ['ink', 'muted', 'brand'] as const;

export type Color = (typeof colors)[number];

/**
 * Status colors for UI feedback. Always pair them with a word or marker.
 */
export const statusColors = ['success', 'warning', 'error', 'info'] as const;

export type StatusColor = (typeof statusColors)[number];

/**
 * Neo-Industrial colour token names, exposed as Tailwind utilities
 * (e.g. `bg-surface-200`, `text-ink-muted`, `border-hairline`, `bg-brand`, `text-brand-text`).
 */
export const neoIndustrialColors = [
  'surface-100',
  'surface-200',
  'surface-300',
  'ink',
  'ink-muted',
  'hairline',
  'gunmetal',
  'on-gunmetal',
  'steel',
  'brand',
  'brand-text',
  'hazard',
  'patina',
  'signal-red',
  'on-accent',
] as const;

export type NeoIndustrialColor = (typeof neoIndustrialColors)[number];
