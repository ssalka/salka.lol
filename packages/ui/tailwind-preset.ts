/**
 * =============================================================================
 * DESIGN SYSTEM - TAILWIND PRESET
 * =============================================================================
 *
 * This preset exposes the design token system to Tailwind CSS.
 * All colors use consistent var(--token) format for theming support.
 *
 * Token layers:
 * 1. Primitives (in primitives.css) - raw color ramps
 * 2. Semantics (in semantic.css) - meaningful tokens with light/dark support
 * 3. Components - defined in component files
 *
 * Usage in Tailwind classes:
 * - bg-primary, text-foreground, border-border (semantic)
 * - bg-electric-aqua-500, text-amber-flame-900 (brand ramps)
 * =============================================================================
 */

import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
import defaultTheme from 'tailwindcss/defaultTheme';

const preset: Partial<Config> = {
  darkMode: 'class',
  plugins: [tailwindAnimate],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        /* =====================================================================
         * SEMANTIC COLORS
         * These reference CSS variables defined in semantic.css
         * ===================================================================== */
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: {
          DEFAULT: 'var(--surface)',
          raised: 'var(--surface-raised)',
          sunken: 'var(--surface-sunken)',
          overlay: 'var(--surface-overlay)',
        },

        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },

        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },

        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
        },

        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
          hover: 'var(--secondary-hover)',
          active: 'var(--secondary-active)',
        },

        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          hover: 'var(--accent-hover)',
          active: 'var(--accent-active)',
        },

        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },

        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
          hover: 'var(--destructive-hover)',
          active: 'var(--destructive-active)',
        },

        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
          subtle: 'var(--border-subtle)',
        },
        input: {
          DEFAULT: 'var(--input)',
          focus: 'var(--input-focus)',
        },

        ring: {
          DEFAULT: 'var(--ring)',
          offset: 'var(--ring-offset)',
        },

        link: {
          DEFAULT: 'var(--link)',
          hover: 'var(--link-hover)',
          visited: 'var(--link-visited)',
        },

        overlay: 'var(--overlay) / var(--overlay-opacity)',

        /* =====================================================================
         * BRAND COLORS
         * Futuristic palette with cool neutrals and cyan accent.
         * ===================================================================== */

        cyan: {
          DEFAULT: 'var(--color-cyan-500)',
          50: 'var(--color-cyan-50)',
          100: 'var(--color-cyan-100)',
          200: 'var(--color-cyan-200)',
          300: 'var(--color-cyan-300)',
          400: 'var(--color-cyan-400)',
          500: 'var(--color-cyan-500)',
          600: 'var(--color-cyan-600)',
          700: 'var(--color-cyan-700)',
          800: 'var(--color-cyan-800)',
          900: 'var(--color-cyan-900)',
          950: 'var(--color-cyan-950)',
        },
        neutral: {
          DEFAULT: 'var(--color-neutral-500)',
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },

        magenta: {
          DEFAULT: 'var(--color-magenta-500)',
          50: 'var(--color-magenta-50)',
          100: 'var(--color-magenta-100)',
          200: 'var(--color-magenta-200)',
          300: 'var(--color-magenta-300)',
          400: 'var(--color-magenta-400)',
          500: 'var(--color-magenta-500)',
          600: 'var(--color-magenta-600)',
          700: 'var(--color-magenta-700)',
          800: 'var(--color-magenta-800)',
          900: 'var(--color-magenta-900)',
          950: 'var(--color-magenta-950)',
        },
        acid: {
          DEFAULT: 'var(--color-acid-500)',
          50: 'var(--color-acid-50)',
          100: 'var(--color-acid-100)',
          200: 'var(--color-acid-200)',
          300: 'var(--color-acid-300)',
          400: 'var(--color-acid-400)',
          500: 'var(--color-acid-500)',
          600: 'var(--color-acid-600)',
          700: 'var(--color-acid-700)',
          800: 'var(--color-acid-800)',
          900: 'var(--color-acid-900)',
          950: 'var(--color-acid-950)',
        },
        warm: {
          DEFAULT: 'var(--color-warm-500)',
          50: 'var(--color-warm-50)',
          100: 'var(--color-warm-100)',
          200: 'var(--color-warm-200)',
          300: 'var(--color-warm-300)',
          400: 'var(--color-warm-400)',
          500: 'var(--color-warm-500)',
          600: 'var(--color-warm-600)',
          700: 'var(--color-warm-700)',
          800: 'var(--color-warm-800)',
          900: 'var(--color-warm-900)',
          950: 'var(--color-warm-950)',
        },
        brutal: {
          primary: 'var(--brutal-primary)',
          'primary-glow': 'var(--brutal-primary-glow)',
          'primary-foreground': 'var(--brutal-primary-foreground)',
          secondary: 'var(--brutal-secondary)',
          'secondary-glow': 'var(--brutal-secondary-glow)',
          'secondary-foreground': 'var(--brutal-secondary-foreground)',
          tertiary: 'var(--brutal-tertiary)',
          'tertiary-glow': 'var(--brutal-tertiary-glow)',
          'tertiary-foreground': 'var(--brutal-tertiary-foreground)',
        },

        brand: {
          github: '#333',
        },

        /* =====================================================================
         * STATUS COLORS
         * ===================================================================== */

        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
          background: 'var(--success-background)',
          border: 'var(--success-border)',
        },

        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
          background: 'var(--warning-background)',
          border: 'var(--warning-border)',
        },

        error: {
          DEFAULT: 'var(--error)',
          foreground: 'var(--error-foreground)',
          background: 'var(--error-background)',
          border: 'var(--error-border)',
        },

        info: {
          DEFAULT: 'var(--info)',
          foreground: 'var(--info-foreground)',
          background: 'var(--info-background)',
          border: 'var(--info-border)',
        },

        /* =====================================================================
         * SIDEBAR COLORS
         * ===================================================================== */

        sidebar: {
          DEFAULT: 'var(--sidebar-background)',
          background: 'var(--sidebar-background)',
          foreground: 'var(--sidebar-foreground)',
          border: 'var(--sidebar-border)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          ring: 'var(--sidebar-ring)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          muted: 'var(--sidebar-muted)',
          'muted-foreground': 'var(--sidebar-muted-foreground)',
        },
      },

      /* =======================================================================
       * BORDER RADIUS
       * ======================================================================= */
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-DEFAULT)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },

      /* =======================================================================
       * BOX SHADOW
       * ======================================================================= */
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-DEFAULT)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        inset: 'var(--shadow-inset)',
        'inset-lg': 'var(--shadow-inset-lg)',
      },

      /* =======================================================================
       * Z-INDEX
       * ======================================================================= */
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
        toast: 'var(--z-toast)',
      },

      /* =======================================================================
       * TRANSITION DURATION
       * ======================================================================= */
      transitionDuration: {
        0: 'var(--duration-0)',
        75: 'var(--duration-75)',
        100: 'var(--duration-100)',
        150: 'var(--duration-150)',
        200: 'var(--duration-200)',
        300: 'var(--duration-300)',
        500: 'var(--duration-500)',
        700: 'var(--duration-700)',
        1000: 'var(--duration-1000)',
      },

      /* =======================================================================
       * TRANSITION TIMING FUNCTION
       * ======================================================================= */
      transitionTimingFunction: {
        linear: 'var(--ease-linear)',
        in: 'var(--ease-in)',
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        bounce: 'var(--ease-bounce)',
        spring: 'var(--ease-spring)',
      },

      /* =======================================================================
       * KEYFRAMES & ANIMATIONS
       * ======================================================================= */
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.95)', opacity: '0' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulse: {
          ['0%, 100%']: { opacity: '1' },
          ['50%']: { opacity: '0.5' },
        },
        bounce: {
          ['0%, 100%']: {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          ['50%']: {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'glitch-1': {
          ['0%']: { clipPath: 'inset(0 0 100% 0)', transform: 'translate(0)' },
          ['20%']: { clipPath: 'inset(20% 0 40% 0)', transform: 'translate(-4px, 2px)' },
          ['40%']: { clipPath: 'inset(60% 0 10% 0)', transform: 'translate(4px, -2px)' },
          ['60%']: { clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-2px, 4px)' },
          ['80%']: { clipPath: 'inset(40% 0 20% 0)', transform: 'translate(2px, -4px)' },
          ['100%']: { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
        },
        'glitch-2': {
          ['0%']: { clipPath: 'inset(100% 0 0 0)', transform: 'translate(0)' },
          ['20%']: { clipPath: 'inset(40% 0 20% 0)', transform: 'translate(4px, -2px)' },
          ['40%']: { clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-4px, 2px)' },
          ['60%']: { clipPath: 'inset(60% 0 10% 0)', transform: 'translate(2px, -4px)' },
          ['80%']: { clipPath: 'inset(20% 0 40% 0)', transform: 'translate(-2px, 4px)' },
          ['100%']: { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
        },
        'clip-reveal': {
          ['0%']: { clipPath: 'inset(0 100% 0 0)' },
          ['100%']: { clipPath: 'inset(0 0 0 0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down var(--duration-200) var(--ease-out)',
        'accordion-up': 'accordion-up var(--duration-200) var(--ease-out)',
        'fade-in': 'fade-in var(--duration-150) var(--ease-out)',
        'fade-out': 'fade-out var(--duration-150) var(--ease-out)',
        'slide-in-from-top': 'slide-in-from-top var(--duration-200) var(--ease-out)',
        'slide-in-from-bottom': 'slide-in-from-bottom var(--duration-200) var(--ease-out)',
        'slide-in-from-left': 'slide-in-from-left var(--duration-200) var(--ease-out)',
        'slide-in-from-right': 'slide-in-from-right var(--duration-200) var(--ease-out)',
        'scale-in': 'scale-in var(--duration-150) var(--ease-out)',
        'scale-out': 'scale-out var(--duration-150) var(--ease-out)',
        spin: 'spin 1s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        'glitch-1': 'glitch-1 0.3s ease-in-out',
        'glitch-2': 'glitch-2 0.3s ease-in-out',
        'clip-reveal': 'clip-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards',
      },
    },

    /* =========================================================================
     * FONT FAMILY (override, not extend)
     * ========================================================================= */
    fontFamily: {
      sans: ['Geist', ...defaultTheme.fontFamily.sans],
      mono: ['Geist-Mono', ...defaultTheme.fontFamily.mono],
      display: ['Bebas Neue', 'Oswald', ...defaultTheme.fontFamily.sans],
    },
  },
};

export default preset;
