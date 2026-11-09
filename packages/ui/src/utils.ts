import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { extendTailwindMerge } from 'tailwind-merge';

export { ClassValue as MaybeClassName, toast };

/** Teach tailwind-merge the custom type scale, so `text-label` isn't mistaken for a colour */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display-xl', 'display-lg', 'body', 'body-sm', 'label', 'readout'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    process.env.NODE_ENV === 'test');

export const isMobile =
  typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
