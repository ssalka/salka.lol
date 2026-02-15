import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';

import { gsap } from '@/lib/gsap';

const SECTIONS = [
  { label: 'about', href: '#about' },
  { label: 'projects', href: '#projects' },
  { label: 'links', href: '#links' },
] as const;

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-12 ${
        scrolled ? 'bg-background/80 backdrop-blur-md' : ''
      }`}
    >
      <a
        href="#"
        className="text-foreground hover:text-foreground font-mono text-sm tracking-wider no-underline"
      >
        salka.lol
      </a>

      <div className="flex items-center gap-6">
        {SECTIONS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-muted-foreground font-mono text-xs tracking-widest uppercase no-underline transition-colors hover:text-cyan-400"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
