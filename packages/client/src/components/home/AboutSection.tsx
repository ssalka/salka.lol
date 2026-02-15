import { useRef } from 'react';

import { useScrollReveal } from '@/lib/hooks/animations';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="mx-auto max-w-3xl px-6 py-24 md:px-12">
      <p className="mb-12 font-mono text-xs tracking-widest text-cyan-400 uppercase">01 — about</p>

      <p className="text-muted-foreground border-l-2 border-cyan-800/40 pl-6 text-lg leading-relaxed md:text-xl">
        Full-stack engineer focused on building products that feel fast and look sharp. I work
        across the entire stack — from interactive frontends to scalable backend systems — with a
        bias toward clean architecture and great developer experience.
      </p>
    </section>
  );
}
