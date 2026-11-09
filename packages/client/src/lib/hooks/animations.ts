import { useGSAP } from '@gsap/react';
import type { RefObject } from 'react';

import { gsap, ScrollTrigger, SplitText, TextPlugin } from '@/lib/gsap';
import { useGlitchStore } from '@/state/glitch';

// Ensure plugins are registered (import has side effects)
void ScrollTrigger;
void TextPlugin;

/** Char-by-char stagger reveal using SplitText */
export function useTextReveal(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const split = new SplitText(el, { type: 'chars' });

      gsap.from(split.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power3.out',
      });
    },
    { dependencies: [ref] },
  );
}

/** ScrollTrigger clip-path wipe (left to right) on scroll */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.6,
          ease: 'power2.inOut',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { dependencies: [ref] },
  );
}

/** TextPlugin typing effect with cursor */
export function useTerminalType(ref: RefObject<HTMLElement | null>, text: string) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      el.textContent = '';

      gsap.to(el, {
        text: { value: text, delimiter: '' },
        duration: text.length * 0.04,
        ease: 'none',
        delay: 0.8,
      });
    },
    { dependencies: [ref, text] },
  );
}

interface GlitchTextOptions {
  /** Delay before initial reveal in seconds */
  delay?: number;
}

/** Reads a theme colour token, so the flicker follows Concrete / Foundry */
const readToken = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/**
 * Clip-path wipe reveal, plus a periodic signal glitch when enabled in the glitch store.
 * The glitch is off by default; its colour flicker uses `brand` / `patina`.
 */
export function useGlitchText(ref: RefObject<HTMLElement | null>, options: GlitchTextOptions = {}) {
  const { delay = 0 } = options;

  const enabled = useGlitchStore(s => s.enabled);
  const glitchInterval = useGlitchStore(s => s.glitchInterval);
  const displacement = useGlitchStore(s => s.displacement);
  const blurIntensity = useGlitchStore(s => s.blurIntensity);
  const colorShift = useGlitchStore(s => s.colorShift);
  const doublePulse = useGlitchStore(s => s.doublePulse);

  // Initial wipe-in (runs once)
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          ease: 'power3.inOut',
          delay,
          clearProps: 'clipPath',
        },
      );
    },
    { dependencies: [ref, delay] },
  );

  // Periodic glitch flicker
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !enabled) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const split = new SplitText(el, { type: 'chars' });
      const flickerColors = [readToken('--brand'), readToken('--patina')];

      const glitchTl = gsap.timeline({
        repeat: -1,
        repeatDelay: glitchInterval,
        delay: 1,
      });

      // First burst: displacement + colour + blur
      glitchTl.to(split.chars, {
        x: () => gsap.utils.random(-displacement, displacement),
        y: () => gsap.utils.random(-displacement * 0.67, displacement * 0.67),
        ...(colorShift && {
          color: () => gsap.utils.random(flickerColors),
        }),
        filter: () => `blur(${gsap.utils.random(blurIntensity * 0.5, blurIntensity)}px)`,
        duration: 0.05,
        stagger: { each: 0.01, from: 'random' },
      });
      // Recovery
      glitchTl.to(split.chars, {
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        clearProps: 'color',
        duration: 0.08,
        stagger: { each: 0.01, from: 'random' },
      });

      if (doublePulse) {
        // Second mini blur burst for a "signal lock" feel
        glitchTl.to(
          split.chars,
          {
            filter: () =>
              `blur(${gsap.utils.random(blurIntensity * 0.25, blurIntensity * 0.625)}px)`,
            duration: 0.04,
            stagger: { each: 0.008, from: 'random' },
          },
          '+=0.15',
        );
        glitchTl.to(split.chars, {
          filter: 'blur(0px)',
          duration: 0.06,
          stagger: { each: 0.008, from: 'random' },
        });
      }

      return () => split.revert();
    },
    {
      dependencies: [
        ref,
        enabled,
        glitchInterval,
        displacement,
        blurIntensity,
        colorShift,
        doublePulse,
      ],
      revertOnUpdate: true,
    },
  );
}

interface ClipRevealOptions {
  /** Direction of the clip-path wipe */
  direction?: 'left' | 'right' | 'top' | 'bottom';
  /** Duration in seconds */
  duration?: number;
}

/** Scroll-triggered clip-path wipe reveal */
export function useClipReveal(ref: RefObject<HTMLElement | null>, options: ClipRevealOptions = {}) {
  const { direction = 'left', duration = 0.8 } = options;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const clipStart: Record<string, string> = {
        left: 'inset(0 100% 0 0)',
        right: 'inset(0 0 0 100%)',
        top: 'inset(100% 0 0 0)',
        bottom: 'inset(0 0 100% 0)',
      };

      gsap.fromTo(
        el,
        { clipPath: clipStart[direction] },
        {
          clipPath: 'inset(0 0 0 0)',
          duration,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { dependencies: [ref, direction, duration] },
  );
}

interface HorizontalSlideOptions {
  /** Direction to slide from */
  from?: 'left' | 'right';
  /** Stagger delay between children in seconds */
  stagger?: number;
}

/** Staggered child element slide-in for lists */
export function useHorizontalSlide(
  ref: RefObject<HTMLElement | null>,
  options: HorizontalSlideOptions = {},
) {
  const { from = 'left', stagger = 0.1 } = options;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const children = el.children;
      if (!children.length) return;

      gsap.from(children, {
        opacity: 0,
        x: from === 'left' ? -60 : 60,
        stagger,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { dependencies: [ref, from, stagger] },
  );
}
