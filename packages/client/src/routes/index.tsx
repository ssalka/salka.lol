import { createFileRoute } from '@tanstack/react-router';

import { AboutSection } from '@/components/home/AboutSection';
import { GlitchControlPanel } from '@/components/home/GlitchControlPanel';
import { HeroSection } from '@/components/home/HeroSection';
import { LinksSection } from '@/components/home/LinksSection';
import { Nav } from '@/components/home/Nav';
import { ProjectsSection } from '@/components/home/ProjectsSection';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="brutal noise-overlay grid-overlay bg-background min-h-screen">
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <LinksSection />
      </main>
      <GlitchControlPanel />
      <footer className="border-border/50 relative border-t px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 font-mono text-xs tracking-widest md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-magenta-500">37.7988°N</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-cyan-400">237.5495°W</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-4">
            <span>
              SYS:<span className="text-acid-500">NOMINAL</span>
            </span>
            <span className="text-muted-foreground/50">|</span>
            <span>VER:3.0.0</span>
            <span className="text-muted-foreground/50">|</span>
            <span>SALKA.LOL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
