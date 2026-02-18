import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { Particles } from '@ssalka/ui/components/effects/particles';
import { cn } from '@ssalka/ui/utils';

import { gsap, SplitText } from '@/lib/gsap';
import { useGlitchText } from '@/lib/hooks/animations';
import { useGlitchStore } from '@/state/glitch';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stevenRef = useRef<HTMLSpanElement>(null);
  const salkaRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const cssGlitch = useGlitchStore(s => s.cssGlitch);

  // Glitch text for STEVEN (first line)
  useGlitchText(stevenRef, { delay: 0.2 });

  // Slam-in for SALKA (second line, slightly delayed)
  useGSAP(
    () => {
      const el = salkaRef.current;
      if (!el) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { opacity: 1 });

        return;
      }

      const split = new SplitText(el, { type: 'chars' });

      gsap.from(split.chars, {
        opacity: 0,
        x: () => gsap.utils.random(-60, 60),
        y: () => gsap.utils.random(-30, 30),
        rotation: () => gsap.utils.random(-10, 10),
        stagger: 0.03,
        duration: 0.5,
        ease: 'power4.out',
        delay: 0.5,
      });
    },
    { scope: sectionRef },
  );

  // Subtitle typing
  useGSAP(
    () => {
      if (!subtitleRef.current) return;
      subtitleRef.current.textContent = '';
      gsap.to(subtitleRef.current, {
        text: { value: 'DESIGNATION // SOFTWARE ENGINEER', delimiter: '' },
        duration: 1.4,
        ease: 'none',
        delay: 1.2,
      });
    },
    { scope: sectionRef },
  );

  // Scroll indicator bob
  useGSAP(
    () => {
      if (!scrollIndicatorRef.current) return;
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut',
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="scanlines relative flex h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <Particles
        className="absolute inset-0"
        quantity={80}
        color="#e6007e"
        size={0.5}
        staticity={40}
        ease={40}
      />

      {/* Left vertical text (desktop) */}
      <div className="vertical-text text-warm-600 pointer-events-none absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.3em] select-none md:block">
        PERSONAL_HOMEPAGE_V3.0
      </div>

      {/* Right vertical text (desktop) */}
      <div className="vertical-text text-warm-600 pointer-events-none absolute top-1/2 right-6 z-10 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.3em] select-none md:block">
        SF // 37.7988°N 237.5495°W
      </div>

      <div className="border-trace relative z-10 px-6 py-4 text-center md:px-10 md:py-6">
        <h1 className="font-display leading-none tracking-tight">
          <span
            ref={stevenRef}
            data-text="STEVEN"
            className={cn('text-glow-magenta text-magenta-500 block', cssGlitch && 'glitch-text')}
            style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
          >
            STEVEN
          </span>
          <span
            ref={salkaRef}
            className="text-foreground block"
            style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
          >
            SALKA
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="blink-cursor text-acid-500 mt-6 h-8 font-mono text-sm tracking-[0.2em] md:text-base"
        />
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-warm-500 font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <div className="from-magenta-500/60 h-8 w-px bg-gradient-to-b to-transparent" />
      </div>
    </section>
  );
}
