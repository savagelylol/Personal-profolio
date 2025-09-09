import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function Navigation() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Theme Toggle */}
      <Button
        onClick={toggleTheme}
        className="fixed top-4 right-6 z-50 bg-card border border-border rounded-full p-3 hover:bg-secondary hover:scale-110"
        size="icon"
        variant="ghost"
        data-testid="button-theme-toggle"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono text-xl font-bold glow-text" data-testid="text-logo">
            savage.dev
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="hover:text-primary transition-colors"
              data-testid="link-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="hover:text-primary transition-colors"
              data-testid="link-skills"
            >
              Skills
            </button>
            <Link href="/projects">
              <button 
                className="hover:text-primary transition-colors"
                data-testid="link-projects"
              >
                Projects
              </button>
            </Link>
            <Link href="/playground">
              <button 
                className="hover:text-primary transition-colors"
                data-testid="link-playground"
              >
                Playground
              </button>
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-primary transition-colors"
              data-testid="link-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-primary transition-colors"
              data-testid="link-contact"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
