import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

void ScrollTrigger;

const LINKS = [
  { label: 'github', href: 'https://github.com/ssalka', prefix: '~/' },
  { label: 'linkedin', href: 'https://linkedin.com/in/ssalka', prefix: '~/' },
  { label: 'email', href: 'mailto:steven@salka.lol', prefix: '~/' },
] as const;

export function LinksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(
    () => {
      const lines = linesRef.current.filter(Boolean);
      if (!lines.length) return;

      gsap.from(lines, {
        opacity: 0,
        x: -20,
        stagger: 0.15,
        duration: 0.5,
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
    <section id="links" ref={sectionRef} className="mx-auto max-w-3xl px-6 py-24 md:px-12">
      <p className="mb-12 font-mono text-xs tracking-widest text-cyan-400 uppercase">03 — links</p>

      <div className="space-y-4 font-mono">
        {LINKS.map((link, i) => (
          <a
            key={link.label}
            ref={el => {
              linesRef.current[i] = el;
            }}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="group text-muted-foreground flex items-center gap-3 text-sm no-underline transition-colors hover:text-cyan-400"
          >
            <span className="text-cyan-600">{link.prefix}</span>
            <span className="group-hover:text-glow">{link.label}</span>
            <span className="text-muted-foreground transition-colors group-hover:text-cyan-400">
              →
            </span>
          </a>
        ))}

        <div className="blink-cursor text-muted-foreground mt-8 text-sm" />
      </div>
    </section>
  );
}
