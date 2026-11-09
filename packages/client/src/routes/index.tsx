import { createFileRoute } from '@tanstack/react-router';

import { AboutSection } from '@/components/home/AboutSection';
import { Footer } from '@/components/home/Footer';
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
    <div className="bg-background min-h-screen">
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <LinksSection />
      </main>
      <GlitchControlPanel />
      <Footer />
    </div>
  );
}
