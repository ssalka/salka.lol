import { useGSAP } from '@gsap/react';
import type { RefObject } from 'react';

import { gsap, ScrollTrigger, SplitText, TextPlugin } from '@/lib/gsap';

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
