import { useRef } from 'react';

import { useScrollReveal } from '@/lib/hooks/animations';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useScrollReveal(cardRef);

  return (
    <section id="about" ref={sectionRef} className="relative px-6 py-28 md:px-12">
      {/* Giant watermark */}
      <div
        className="text-warm-900/50 font-display pointer-events-none absolute top-12 left-6 select-none md:left-12"
        style={{ fontSize: 'clamp(8rem, 20vw, 16rem)', lineHeight: 0.85 }}
      >
        01
      </div>

      {/* Vertical label (desktop) */}
      <div className="vertical-text text-warm-600 pointer-events-none absolute top-28 left-6 hidden font-mono text-[10px] tracking-[0.3em] select-none md:block">
        ABOUT
      </div>

      <div className="relative mx-auto max-w-4xl md:ml-[15%]">
        {/* Data readout */}
        <div className="text-muted-foreground mb-4 font-mono text-[10px] tracking-widest">
          ACTIVE | <span className="text-magenta-500">SEC.01</span>
        </div>

        {/* Content card */}
        <div
          ref={cardRef}
          className="brutal-border-l border-magenta-500 crosshair bg-warm-800/60 relative p-8 backdrop-blur-sm md:p-12"
        >
          <p className="font-display text-foreground mb-6 text-2xl tracking-wide md:text-3xl">
            FULL-STACK ENGINEER
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
            Focused on building products that feel fast and look sharp. I work across the entire
            stack — from interactive frontends to scalable backend systems — with a bias toward
            clean architecture and great developer experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] tracking-widest">
            {['REACT', 'TYPESCRIPT', 'NODE.JS', 'GSAP', 'TAILWIND'].map(skill => (
              <span key={skill} className="border-warm-600 text-warm-300 border px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
