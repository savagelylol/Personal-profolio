import { CursorGlow } from '@/components/CursorGlow';
import { FloatingBackground } from '@/components/FloatingBackground';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <div className="bg-background text-foreground font-sans overflow-x-hidden">
      <CursorGlow />
      <FloatingBackground />
      <Navigation />
      
      <main>
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground" data-testid="text-footer">
            &copy; 2024 savage.dev - Crafted with 💙 and 7 years of experience
          </p>
        </div>
      </footer>
    </div>
  );
}
