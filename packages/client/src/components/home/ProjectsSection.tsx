import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '@ssalka/ui/components/card';

import { gsap, ScrollTrigger } from '@/lib/gsap';

void ScrollTrigger;

const PROJECTS = [
  {
    name: 'salka.lol',
    description: 'This site. A futuristic personal homepage with GSAP animations.',
    tags: ['React', 'GSAP', 'Tailwind'],
    href: 'https://github.com/ssalka',
  },
  {
    name: 'ai-toolkit',
    description: 'A modular toolkit for building AI-powered applications.',
    tags: ['TypeScript', 'LLM', 'Node.js'],
    href: 'https://github.com/ssalka',
  },
  {
    name: 'monorepo-starter',
    description: 'Opinionated full-stack monorepo with auth, tRPC, and design system.',
    tags: ['pnpm', 'tRPC', 'Auth.js'],
    href: 'https://github.com/ssalka',
  },
] as const;

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll('[data-project-card]');
      if (!cards?.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef} className="mx-auto max-w-4xl px-6 py-24 md:px-12">
      <p className="mb-12 font-mono text-xs tracking-widest text-cyan-400 uppercase">
        02 — projects
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {PROJECTS.map(project => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group no-underline"
            data-project-card
          >
            <Card className="group-hover:glow-cyan h-full border-t-2 border-t-cyan-700/40 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-t-cyan-400/60">
              <CardHeader>
                <CardTitle className="text-foreground font-mono text-base">
                  {project.name}
                </CardTitle>
                <CardDescription className="text-sm">{project.description}</CardDescription>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-sm border border-cyan-800/30 px-2 py-0.5 font-mono text-[10px] tracking-wider text-cyan-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
