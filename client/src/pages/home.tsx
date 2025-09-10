import { useState, useEffect } from 'react';
import { CursorGlow } from '@/components/CursorGlow';
import { FloatingBackground } from '@/components/FloatingBackground';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { EasterEggTracker } from '@/components/EasterEggTracker';

export default function Home() {
  const [showEasterEggTracker, setShowEasterEggTracker] = useState(false);

  useEffect(() => {
    const handleShowTracker = () => setShowEasterEggTracker(true);
    window.addEventListener('showEasterEggTracker', handleShowTracker);
    
    return () => {
      window.removeEventListener('showEasterEggTracker', handleShowTracker);
    };
  }, []);

  return (
    <div className="bg-background text-foreground font-sans overflow-x-hidden">
      <CursorGlow />
      <FloatingBackground />
      <Navigation />
      
      <main>
        <Hero />
        <Skills />
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
      
      {/* Easter Egg Tracker */}
      <EasterEggTracker 
        isVisible={showEasterEggTracker}
        onHide={() => setShowEasterEggTracker(false)}
      />
    </div>
  );
}
