import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';

import { gsap } from '@/lib/gsap';

const SECTIONS = [
  { label: 'ABOUT', href: '#about', index: '01' },
  { label: 'PROJECTS', href: '#projects', index: '02' },
  { label: 'LINKS', href: '#links', index: '03' },
] as const;

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    };
    update();
    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  });

  useGSAP(
    () => {
      if (!navRef.current) return;
      gsap.from(navRef.current, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' });
    },
    { scope: navRef },
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12 ${
        scrolled ? 'border-warm-700/60 bg-background/80 border-b backdrop-blur-md' : ''
      }`}
    >
      {/* Left: Status + Logo */}
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-3 no-underline"
      >
        <span className="bg-acid-500 inline-block h-2 w-2 rounded-full shadow-[0_0_6px_hsl(72_100%_42%)]" />
        <span className="font-display text-foreground text-xl tracking-wider">SALKA.LOL</span>
      </a>

      {/* Center: Clock + Status (desktop) */}
      <div className="text-muted-foreground hidden items-center gap-4 font-mono text-[11px] tracking-widest md:flex">
        <span className="text-warm-400">{clock}</span>
        <span className="text-warm-600">|</span>
        <span>
          SYS:<span className="text-acid-500">NOMINAL</span>
        </span>
      </div>

      {/* Right: Section links */}
      <div className="flex items-center gap-5">
        {SECTIONS.map(({ label, href, index }) => (
          <a
            key={label}
            href={href}
            onClick={e => {
              e.preventDefault();
              document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-muted-foreground group hover:text-foreground flex items-center gap-1.5 font-mono text-[11px] tracking-widest no-underline transition-colors"
          >
            <span className="text-magenta-500 text-[10px] opacity-60 transition-opacity group-hover:opacity-100">
              {index}
            </span>
            <span>{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
