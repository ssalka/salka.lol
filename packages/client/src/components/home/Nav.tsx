import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';

import { Tag } from '@ssalka/ui/components/tag';
import { cn } from '@ssalka/ui/utils';

import { gsap } from '@/lib/gsap';
import { useDarkMode, useSettingsActions } from '@/lib/hooks/settings';

const SECTIONS = [
  { label: 'ABOUT', href: '#about', index: '01' },
  { label: 'PROJECTS', href: '#projects', index: '02' },
  { label: 'LINKS', href: '#links', index: '03' },
] as const;

const pad = (n: number) => String(n).padStart(2, '0');

/** Elapsed mission time since page load, as `T+HH:MM:SS` */
const formatElapsed = (ms: number) => {
  const total = Math.floor(ms / 1000);

  return `T+${pad(Math.floor(total / 3600))}:${pad(Math.floor(total / 60) % 60)}:${pad(total % 60)}`;
};

function ThemeSwitch() {
  const darkMode = useDarkMode();
  const { toggleDarkMode } = useSettingsActions();

  const options = [
    { label: 'CONCRETE', active: !darkMode },
    { label: 'FOUNDRY', active: darkMode },
  ];

  return (
    <div role="group" aria-label="Theme" className="border-on-gunmetal/60 flex border">
      {options.map(({ label, active }) => (
        <button
          key={label}
          type="button"
          aria-pressed={active}
          onClick={() => {
            if (!active) toggleDarkMode();
          }}
          className={cn(
            'cursor-pointer px-2 py-1 font-mono text-[11px] leading-4 font-semibold tracking-[0.08em] transition-colors',
            'focus-visible:outline-on-gunmetal focus-visible:-outline-offset-2',
            active
              ? 'bg-on-gunmetal text-gunmetal'
              : 'text-on-gunmetal hover:bg-on-gunmetal/15 bg-transparent',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [elapsed, setElapsed] = useState(formatElapsed(0));

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(formatElapsed(Date.now() - start)), 1000);

    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (!navRef.current) return;
      gsap.fromTo(
        navRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.4, ease: 'power2.out', clearProps: 'clipPath' },
      );
    },
    { scope: navRef },
  );

  return (
    <nav
      ref={navRef}
      className="bg-gunmetal text-on-gunmetal fixed top-0 right-0 left-0 z-50 flex items-center justify-between gap-4 px-4 py-2 md:px-8"
    >
      {/* Left: chamfered ID plate */}
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="bg-on-gunmetal text-gunmetal hover:text-gunmetal focus-visible:outline-on-gunmetal px-3 py-1.5 font-mono text-[13px] font-semibold tracking-[0.08em] no-underline [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)] focus-visible:[clip-path:none]"
      >
        SALKA.LOL
      </a>

      {/* Centre: mission clock + status (desktop) */}
      <div className="hidden items-center gap-4 lg:flex">
        <span className="font-mono text-[13px] tabular-nums" aria-label="Time since page load">
          {elapsed}
        </span>
        <Tag tone="ok" className="text-on-gunmetal">
          NOMINAL
        </Tag>
      </div>

      {/* Right: section links + theme switch */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden items-center gap-5 sm:flex">
          {SECTIONS.map(({ label, href, index }) => (
            <a
              key={label}
              href={href}
              onClick={e => {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-on-gunmetal hover:text-on-gunmetal focus-visible:outline-on-gunmetal text-label flex items-center gap-1.5 font-mono uppercase no-underline decoration-1 underline-offset-4 hover:underline"
            >
              <span className="opacity-70">{index}</span>
              <span>{label}</span>
            </a>
          ))}
        </div>
        <ThemeSwitch />
      </div>
    </nav>
  );
}
