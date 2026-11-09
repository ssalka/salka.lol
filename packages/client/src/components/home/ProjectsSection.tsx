import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { Button } from '@ssalka/ui/components/button';
import { Panel } from '@ssalka/ui/components/panel';
import { Tag, type TagTone } from '@ssalka/ui/components/tag';

import { SectionHeader } from '@/components/home/SectionHeader';
import { gsap, ScrollTrigger } from '@/lib/gsap';

void ScrollTrigger;

type ProjectStatus = 'LIVE' | 'STABLE' | 'DEV';

const STATUS_TONES: Record<ProjectStatus, TagTone> = {
  LIVE: 'ok',
  STABLE: 'neutral',
  DEV: 'hazard',
};

interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
  /** Accessible name for the VIEW link; defaults to "View <name> on GitHub" */
  linkLabel?: string;
  status: ProjectStatus;
  /** The one featured project; its brackets turn brand */
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    name: 'RESOLUTE',
    description:
      'Your issue tracker as a dependency graph: see what blocks what, and what to work on next.',
    tags: ['Linear', 'Jira', 'MCP'],
    href: 'https://resolute.fyi',
    linkLabel: 'Visit resolute.fyi',
    status: 'DEV',
    featured: true,
  },
  {
    name: 'ALUNA',
    description: 'AI-powered candidate assessments with deep research capabilities.',
    tags: ['AI', 'React', 'tRPC'],
    href: 'https://github.com/ssalka/aluna',
    status: 'STABLE',
  },
  {
    name: 'CLAUDE-SYMPHONY',
    description:
      'Rust daemon that polls Linear for issues and runs Claude Code as a subprocess agent.',
    tags: ['Rust', 'Claude Code', 'Linear'],
    href: 'https://github.com/ssalka/claude-symphony',
    status: 'STABLE',
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll('[data-project-card]');
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.inOut',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef} className="relative px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="02" title="Projects" />

        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <div key={project.name} data-project-card className="flex">
              <Panel
                accent={project.featured}
                title={`PRJ_${String(i).padStart(2, '0')}`}
                meta={<Tag tone={STATUS_TONES[project.status]}>{project.status}</Tag>}
                className="flex w-full flex-col"
                bodyClassName="flex flex-1 flex-col p-5"
              >
                <h3 className="font-display text-ink mb-2 text-3xl leading-none font-bold uppercase">
                  {project.name}
                </h3>

                <p className="text-ink-muted mb-5">{project.description}</p>

                <ul aria-label="Stack" className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>

                <Button asChild variant="ghost" size="sm" className="group mt-auto self-start">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={project.linkLabel ?? `View ${project.name} on GitHub`}
                  >
                    VIEW
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </Button>
              </Panel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
