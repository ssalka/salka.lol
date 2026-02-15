import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { Particles } from '@ssalka/ui/components/effects/particles';

import { gsap, SplitText } from '@/lib/gsap';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!nameRef.current || !subtitleRef.current) return;

      const split = new SplitText(nameRef.current, { type: 'chars' });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(split.chars, {
        opacity: 0,
        y: 30,
        stagger: 0.04,
        duration: 0.7,
      });

      tl.to(
        subtitleRef.current,
        {
          text: { value: 'software engineer', delimiter: '' },
          duration: 1.2,
          ease: 'none',
        },
        '-=0.3',
      );

      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: 'power1.inOut',
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="scanlines relative flex h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <Particles
        className="absolute inset-0"
        quantity={80}
        color="#00b4d8"
        size={0.5}
        staticity={40}
        ease={40}
      />

      <div className="relative z-10 text-center">
        <h1
          ref={nameRef}
          className="text-glow text-foreground mb-4 font-mono text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
        >
          Steven Salka
        </h1>

        <p
          ref={subtitleRef}
          className="blink-cursor h-8 font-mono text-lg tracking-widest text-cyan-400 md:text-xl"
        />
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-12 z-10">
        <div className="h-6 w-px bg-cyan-400/50" />
      </div>
    </section>
  );
}
