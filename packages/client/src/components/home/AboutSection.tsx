import { useRef } from 'react';

import { Panel } from '@ssalka/ui/components/panel';
import { Tag } from '@ssalka/ui/components/tag';

import { SectionHeader } from '@/components/home/SectionHeader';
import { useScrollReveal } from '@/lib/hooks/animations';

const SKILLS = ['REACT', 'TYPESCRIPT', 'NODE.JS', 'GSAP', 'TAILWIND'];

export function AboutSection() {
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollReveal(panelRef);

  return (
    <section id="about" className="relative px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeader index="01" title="About" />

        <div ref={panelRef}>
          <Panel title="01 // PROFILE" meta="SEC.01 ACTIVE" bodyClassName="p-6 md:p-8">
            <p className="font-display text-display-lg text-ink mb-4 uppercase">
              Full-stack engineer
            </p>

            <p className="text-ink max-w-2xl text-lg leading-relaxed">
              Focused on building products that feel fast and look sharp. I work across the entire
              stack — from interactive frontends to scalable backend systems — with a bias toward
              clean architecture and great developer experience.
            </p>

            <ul aria-label="Skills" className="mt-8 flex flex-wrap gap-2">
              {SKILLS.map(skill => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </section>
  );
}
