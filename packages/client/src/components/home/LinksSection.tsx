import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { SectionHeader } from '@/components/home/SectionHeader';
import { gsap, ScrollTrigger } from '@/lib/gsap';

void ScrollTrigger;

const LINKS = [
  {
    label: 'GITHUB',
    description: 'Open source projects and contributions',
    href: 'https://github.com/ssalka',
    handle: 'ssalka',
  },
  {
    label: 'LINKEDIN',
    description: 'Professional profile and network',
    href: 'https://linkedin.com/in/ssalka',
    handle: 'in/ssalka',
  },
  {
    label: 'EMAIL',
    description: 'Direct communication channel',
    href: 'mailto:steven@salka.lol',
    handle: 'steven@salka.lol',
  },
] as const;

export function LinksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = sectionRef.current?.querySelectorAll('[data-link-row]');
      if (!rows?.length) return;

      gsap.from(rows, {
        opacity: 0,
        x: -12,
        stagger: 0.1,
        duration: 0.35,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="links" ref={sectionRef} className="relative px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeader index="03" title="Links" />

        <ul className="border-hairline border-t">
          {LINKS.map((link, i) => {
            const isMail = link.href.startsWith('mailto:');

            return (
              <li key={link.label} data-link-row className="border-hairline border-b">
                <a
                  href={link.href}
                  target={isMail ? undefined : '_blank'}
                  rel={isMail ? undefined : 'noopener noreferrer'}
                  className="group text-ink hover:bg-surface-200 hover:text-ink grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 px-3 py-5 no-underline transition-colors md:grid-cols-[2.5rem_10rem_1fr_auto]"
                >
                  <span className="text-ink-muted text-label font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-base font-semibold tracking-[0.08em]">
                    {link.label}
                  </span>
                  <span className="text-ink-muted col-start-2 row-start-2 md:col-start-auto md:row-start-auto">
                    {link.description}
                    <span className="text-body-sm hidden font-mono lg:inline">
                      {' '}
                      — {link.handle}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-ink col-start-3 row-span-2 row-start-1 font-mono text-lg transition-transform group-hover:translate-x-2 md:col-start-auto md:row-span-1 md:row-start-auto"
                  >
                    →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
