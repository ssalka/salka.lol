import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

void ScrollTrigger;

const PROJECTS = [
  {
    name: 'SALKA.LOL',
    description:
      'This site. A brutalist personal homepage with GSAP animations and industrial design.',
    tags: ['React', 'GSAP', 'Tailwind'],
    href: 'https://github.com/ssalka',
    status: 'LIVE',
    accent: 'magenta' as const,
  },
  {
    name: 'AI-TOOLKIT',
    description: 'A modular toolkit for building AI-powered applications with pluggable providers.',
    tags: ['TypeScript', 'LLM', 'Node.js'],
    href: 'https://github.com/ssalka',
    status: 'DEV',
    accent: 'cyan' as const,
  },
  {
    name: 'MONOREPO-STARTER',
    description: 'Opinionated full-stack monorepo with auth, tRPC, and design system.',
    tags: ['pnpm', 'tRPC', 'Auth.js'],
    href: 'https://github.com/ssalka',
    status: 'STABLE',
    accent: 'acid' as const,
  },
] as const;

const ACCENT_STYLES = {
  magenta: {
    border: 'border-t-magenta-500',
    hoverBorder: 'group-hover:border-t-magenta-400',
    glow: 'group-hover:glow-magenta',
    status: 'text-magenta-400',
    tag: 'border-magenta-800/40 text-magenta-400',
    arrow: 'text-magenta-500 group-hover:text-magenta-400',
  },
  cyan: {
    border: 'border-t-cyan-500',
    hoverBorder: 'group-hover:border-t-cyan-400',
    glow: 'group-hover:glow-cyan',
    status: 'text-cyan-400',
    tag: 'border-cyan-800/40 text-cyan-400',
    arrow: 'text-cyan-500 group-hover:text-cyan-400',
  },
  acid: {
    border: 'border-t-acid-500',
    hoverBorder: 'group-hover:border-t-acid-400',
    glow: 'group-hover:glow-acid',
    status: 'text-acid-400',
    tag: 'border-acid-800/40 text-acid-400',
    arrow: 'text-acid-500 group-hover:text-acid-400',
  },
} as const;

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
    <section id="projects" ref={sectionRef} className="relative px-6 py-28 md:px-12">
      {/* Giant watermark */}
      <div
        className="text-warm-900/50 font-display pointer-events-none absolute top-12 right-6 select-none md:right-12"
        style={{ fontSize: 'clamp(8rem, 20vw, 16rem)', lineHeight: 0.85 }}
      >
        02
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <span className="text-magenta-500 font-mono text-xs tracking-widest">02</span>
          <div className="bg-warm-700 h-px flex-1" />
          <span className="font-display text-foreground text-2xl tracking-wider md:text-3xl">
            PROJECTS
          </span>
          <div className="bg-warm-700 h-px flex-1" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project, i) => {
            const styles = ACCENT_STYLES[project.accent];

            return (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline"
                data-project-card
              >
                <div
                  className={`brutal-border-t ${styles.border} ${styles.hoverBorder} ${styles.glow} bg-warm-800/60 h-full p-6 transition-all duration-300 group-hover:-translate-y-1`}
                >
                  {/* Data readout */}
                  <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-widest">
                    <span className="text-muted-foreground">PRJ_{String(i).padStart(2, '0')}</span>
                    <span className={styles.status}>{project.status}</span>
                  </div>

                  {/* Project name */}
                  <h3 className="font-display text-foreground mb-2 text-xl tracking-wide">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className={`border px-2 py-0.5 font-mono text-[10px] tracking-wider ${styles.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View link */}
                  <div
                    className={`${styles.arrow} font-mono text-xs tracking-widest transition-transform group-hover:translate-x-1`}
                  >
                    VIEW --&gt;
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
