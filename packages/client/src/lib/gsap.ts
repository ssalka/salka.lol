import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

/** Disable all GSAP animations when user prefers reduced motion */
if (
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  // Finish every tween near-instantly. NOTE `Infinity` leaves ScrollTrigger tweens stuck at their start state
  gsap.globalTimeline.timeScale(1000);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, TextPlugin };
