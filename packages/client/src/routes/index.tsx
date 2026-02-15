import { createFileRoute } from '@tanstack/react-router';

import { AboutSection } from '@/components/home/AboutSection';
import { HeroSection } from '@/components/home/HeroSection';
import { LinksSection } from '@/components/home/LinksSection';
import { Nav } from '@/components/home/Nav';
import { ProjectsSection } from '@/components/home/ProjectsSection';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="grid-overlay bg-background min-h-screen">
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <LinksSection />
      </main>
      <footer className="border-border/50 text-muted-foreground border-t px-6 py-8 text-center font-mono text-xs tracking-widest md:px-12">
        salka.lol
      </footer>
    </div>
  );
}
