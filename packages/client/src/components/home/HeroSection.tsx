import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';

import { Readout } from '@ssalka/ui/components/readout';
import { cn } from '@ssalka/ui/utils';

import { RadarSweep } from '@/components/home/RadarSweep';
import { gsap } from '@/lib/gsap';
import { useGlitchText } from '@/lib/hooks/animations';
import { useGlitchStore } from '@/state/glitch';

const NAME_SIZE = { fontSize: 'clamp(4.5rem, 15vw, 11rem)' };

const formatLocalTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Los_Angeles',
  });

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stevenRef = useRef<HTMLSpanElement>(null);
  const salkaRef = useRef<HTMLSpanElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const readoutsRef = useRef<HTMLDivElement>(null);
  const [localTime, setLocalTime] = useState(formatLocalTime);

  const glitchEnabled = useGlitchStore(s => s.enabled);
  const cssGlitch = useGlitchStore(s => s.cssGlitch);

  useEffect(() => {
    const id = setInterval(() => setLocalTime(formatLocalTime()), 10_000);

    return () => clearInterval(id);
  }, []);

  // STEVEN: wipe in, plus the optional signal glitch
  useGlitchText(stevenRef, { delay: 0.1 });

  // SALKA, the ID plate and the readouts wipe / tick in after it
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.35 });

      tl.fromTo(
        [salkaRef.current, plateRef.current],
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.6,
          ease: 'power3.inOut',
          stagger: 0.15,
          clearProps: 'clipPath',
        },
      );

      const readouts = readoutsRef.current?.children;
      if (readouts?.length) {
        tl.from(
          readouts,
          { opacity: 0, y: 8, duration: 0.3, stagger: 0.08, ease: 'power2.out' },
          '-=0.2',
        );
      }
    },
    { scope: sectionRef },
  );

  // Subtitle typing
  useGSAP(
    () => {
      if (!subtitleRef.current) return;
      subtitleRef.current.textContent = '';

      const tl = gsap.timeline({ delay: 1.2 });

      tl.to(subtitleRef.current, {
        text: { value: 'STATUS // ', delimiter: '' },
        duration: 0.6,
        ease: 'none',
      });

      tl.to(
        subtitleRef.current,
        {
          text: { value: 'STATUS // BUILDING FAST, SHARP SOFTWARE', delimiter: '' },
          duration: 2,
          ease: 'power1.out',
        },
        '+=0.4',
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-graph-paper relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16 [--pattern-color:color-mix(in_srgb,var(--hairline)_25%,transparent)] md:px-12"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-label text-ink-muted mb-6 font-mono uppercase">
            PERSONAL_HOMEPAGE // V4.0
          </p>

          <h1 className="font-display text-ink leading-[0.86] font-bold uppercase">
            <span
              ref={stevenRef}
              data-testid="first-name"
              data-text="STEVEN"
              className={cn('block', glitchEnabled && cssGlitch && 'glitch-text')}
              style={NAME_SIZE}
            >
              STEVEN
            </span>
            <span ref={salkaRef} className="block" style={NAME_SIZE}>
              SALKA
            </span>
          </h1>

          {/* The one brand element in this view */}
          <div
            ref={plateRef}
            className="bg-brand text-on-accent mt-6 inline-flex items-center gap-3 px-4 py-3 font-mono text-sm font-semibold tracking-[0.08em] uppercase [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)] md:text-base"
          >
            <span aria-hidden="true" className="bg-on-accent size-2" />
            SOFTWARE ENGINEER
          </div>

          <p
            ref={subtitleRef}
            className="blink-cursor text-ink-muted text-label mt-6 h-5 font-mono uppercase"
          />

          <div
            ref={readoutsRef}
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:flex sm:flex-wrap"
          >
            <Readout label="LAT" value="37.7988" unit="°N" />
            <Readout label="LON" value="122.4505" unit="°W" />
            <Readout label="LOCAL" value={localTime} unit="PT" />
            <Readout label="BUILD" value="v4.0" />
          </div>
        </div>

        <RadarSweep className="hidden w-[min(38vw,420px)] lg:block" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-ink-muted font-mono text-[11px] tracking-[0.3em]">SCROLL</span>
        <div
          aria-hidden="true"
          className="h-8 w-2 bg-[repeating-linear-gradient(0deg,var(--ink-muted)_0_1px,transparent_1px_6px)]"
        />
      </div>
    </section>
  );
}
