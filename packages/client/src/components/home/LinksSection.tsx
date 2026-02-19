import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { gsap } from '@/lib/gsap';

const LINKS = [
  {
    label: 'GITHUB',
    description: 'Open source projects and contributions',
    href: 'https://github.com/ssalka',
    accent: 'magenta' as const,
  },
  {
    label: 'LINKEDIN',
    description: 'Professional profile and network',
    href: 'https://linkedin.com/in/ssalka',
    accent: 'cyan' as const,
  },
  {
    label: 'EMAIL',
    description: 'Direct communication channel',
    href: 'mailto:steven@salka.lol',
    accent: 'acid' as const,
  },
] as const;

const ACCENT_STYLES = {
  magenta: {
    border: 'border-l-magenta-500',
    hoverBg: 'hover:bg-magenta-950/30',
    hoverGlow: 'hover:glow-magenta',
    label: 'text-magenta-500 group-hover:text-magenta-400',
    arrow: 'text-magenta-500',
  },
  cyan: {
    border: 'border-l-cyan-500',
    hoverBg: 'hover:bg-cyan-950/30',
    hoverGlow: 'hover:glow-cyan',
    label: 'text-cyan-400 group-hover:text-cyan-300',
    arrow: 'text-cyan-400',
  },
  acid: {
    border: 'border-l-acid-500',
    hoverBg: 'hover:bg-acid-950/30',
    hoverGlow: 'hover:glow-acid',
    label: 'text-acid-500 group-hover:text-acid-400',
    arrow: 'text-acid-500',
  },
} as const;

export function LinksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(
    () => {
      const lines = linesRef.current.filter(Boolean);
      if (!lines.length) return;

      gsap.fromTo(
        lines,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power3.out',
        },
      );
    },
    { dependencies: [] },
  );

  return (
    <section id="links" ref={sectionRef} className="relative px-6 py-28 md:px-12">
      {/* Giant watermark */}
      <div
        className="text-warm-900/50 font-display pointer-events-none absolute top-12 left-6 select-none md:left-12"
        style={{ fontSize: 'clamp(8rem, 20vw, 16rem)', lineHeight: 0.85 }}
      >
        03
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest text-cyan-400">03</span>
          <div className="bg-warm-700 h-px flex-1" />
          <span className="font-display text-foreground text-2xl tracking-wider md:text-3xl">
            LINKS
          </span>
          <div className="bg-warm-700 h-px flex-1" />
        </div>

        <div className="space-y-4">
          {LINKS.map((link, i) => {
            const styles = ACCENT_STYLES[link.accent];

            return (
              <a
                key={link.label}
                ref={el => {
                  linesRef.current[i] = el;
                }}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className={`brutal-border-l ${styles.border} ${styles.hoverBg} ${styles.hoverGlow} group flex items-center justify-between p-6 no-underline transition-all duration-300`}
              >
                <div>
                  <div
                    className={`font-display text-2xl tracking-wider md:text-3xl ${styles.label}`}
                  >
                    {link.label}
                  </div>
                  <p className="text-muted-foreground mt-1 font-mono text-xs tracking-widest">
                    {link.description}
                  </p>
                </div>
                <span
                  className={`${styles.arrow} font-mono text-lg transition-transform group-hover:translate-x-2`}
                >
                  &rarr;
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
