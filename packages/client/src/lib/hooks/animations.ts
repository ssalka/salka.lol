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

/** ScrollTrigger fade + translate on scroll */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
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

/** SplitText chars slam in from random positions + periodic glitch flicker */
export function useGlitchText(ref: RefObject<HTMLElement | null>, options: GlitchTextOptions = {}) {
  const { delay = 0 } = options;

  const glitchInterval = useGlitchStore(s => s.glitchInterval);
  const displacement = useGlitchStore(s => s.displacement);
  const blurIntensity = useGlitchStore(s => s.blurIntensity);
  const colorShift = useGlitchStore(s => s.colorShift);
  const doublePulse = useGlitchStore(s => s.doublePulse);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Respect reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { opacity: 1 });

        return;
      }

      const split = new SplitText(el, { type: 'chars' });

      // Initial slam-in from random positions
      gsap.from(split.chars, {
        opacity: 0,
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-40, 40),
        rotation: () => gsap.utils.random(-15, 15),
        stagger: 0.03,
        duration: 0.5,
        ease: 'power4.out',
        delay,
      });

      // Periodic glitch flicker
      const glitchTl = gsap.timeline({
        repeat: -1,
        repeatDelay: glitchInterval,
        delay: delay + 1.5,
      });

      // First burst: displacement + color + blur
      glitchTl.to(split.chars, {
        x: () => gsap.utils.random(-displacement, displacement),
        y: () => gsap.utils.random(-displacement * 0.67, displacement * 0.67),
        ...(colorShift && {
          color: () => (gsap.utils.random(0, 1) > 0.5 ? 'hsl(330 100% 48%)' : 'hsl(185 100% 42%)'),
        }),
        filter: () => `blur(${gsap.utils.random(blurIntensity * 0.5, blurIntensity)}px)`,
        duration: 0.05,
        stagger: { each: 0.01, from: 'random' },
      });
      // Partial recovery
      glitchTl.to(split.chars, {
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        clearProps: 'color',
        duration: 0.08,
        stagger: { each: 0.01, from: 'random' },
      });

      if (doublePulse) {
        // Double-pulse: second mini blur burst for "signal lock" feel
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
        // Final snap to sharp
        glitchTl.to(split.chars, {
          filter: 'blur(0px)',
          duration: 0.06,
          stagger: { each: 0.008, from: 'random' },
        });
      }
    },
    {
      dependencies: [
        ref,
        delay,
        glitchInterval,
        displacement,
        blurIntensity,
        colorShift,
        doublePulse,
      ],
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
