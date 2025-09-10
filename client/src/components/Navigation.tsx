import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { SideMenu } from './SideMenu';

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

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
        className="fixed top-4 right-6 z-[60] bg-card border border-border rounded-full p-3 hover:bg-secondary hover:scale-110"
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
          <div className="flex items-center gap-6">
            {/* Main Navigation - Desktop */}
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('home')}
                className="hover:text-primary transition-colors"
                data-testid="link-home"
              >
                Home
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
                onClick={() => scrollToSection('contact')}
                className="hover:text-primary transition-colors"
                data-testid="link-contact"
              >
                Contact
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSideMenuOpen(true)}
              className="hover:bg-secondary hover:scale-110 transition-all"
              data-testid="button-menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)} 
      />
    </>
  );
}
