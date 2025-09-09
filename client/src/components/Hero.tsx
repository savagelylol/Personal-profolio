import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function Hero() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const technologies = ['Lua', 'Python', 'JavaScript', 'GoDot', 'Ruby'];

  const techInfo: Record<string, { description: string; usedFor: string[]; experience: string }> = {
    Lua: {
      description: "A powerful, fast, lightweight scripting language designed for embedded use in applications.",
      usedFor: ["Roblox game development", "Game scripting", "Configuration files", "Embedded systems"],
      experience: "5+ years of experience creating complex game systems in Roblox"
    },
    Python: {
      description: "A high-level, interpreted programming language known for its simplicity and versatility.",
      usedFor: ["Web development", "Data analysis", "Machine learning", "Automation scripts", "Backend APIs"],
      experience: "4+ years building web applications and data processing tools"
    },
    JavaScript: {
      description: "A versatile programming language that powers interactive web experiences and modern applications.",
      usedFor: ["Frontend development", "Backend with Node.js", "Mobile apps", "Desktop applications", "Web APIs"],
      experience: "6+ years creating dynamic web interfaces and full-stack applications"
    },
    GoDot: {
      description: "A feature-packed, open-source game engine that provides a huge set of common tools.",
      usedFor: ["2D game development", "3D game development", "Cross-platform games", "Indie game projects"],
      experience: "2+ years developing platformer and puzzle games"
    },
    Ruby: {
      description: "A dynamic, open-source programming language focused on simplicity and productivity.",
      usedFor: ["Web development with Rails", "Scripting", "Automation", "Rapid prototyping"],
      experience: "3+ years building web applications and automation tools"
    }
  };

  const handleTitleHover = (e: React.MouseEvent) => {
    const title = e.currentTarget as HTMLElement;
    const rect = title.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    title.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    title.style.textShadow = `${rotateY * 2}px ${rotateX * 2}px 20px rgba(99, 102, 241, 0.5)`;
  };

  const handleTitleLeave = (e: React.MouseEvent) => {
    const title = e.currentTarget as HTMLElement;
    title.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    title.style.textShadow = '';
  };

  const handleTechHover = (tech: string, e: React.MouseEvent) => {
    setHoveredTech(tech);
    const badge = e.currentTarget as HTMLElement;
    badge.style.transform = 'translateY(-8px) scale(1.1)';
    badge.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
  };

  const handleTechLeave = (e: React.MouseEvent) => {
    setHoveredTech(null);
    const badge = e.currentTarget as HTMLElement;
    badge.style.transform = 'translateY(0px) scale(1)';
    badge.style.boxShadow = 'none';
  };

  const handleTechClick = (tech: string) => {
    setSelectedTech(tech);
    setIsDialogOpen(true);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-10">
        <h1 
          className="text-6xl md:text-8xl font-mono font-bold mb-6 glow-text transition-all duration-300 cursor-pointer select-none" 
          data-testid="text-hero-name"
          onMouseMove={handleTitleHover}
          onMouseLeave={handleTitleLeave}
        >
          savage
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground" data-testid="text-hero-subtitle">
          <span className="text-accent font-bold">7 years</span> of crafting digital experiences
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm transition-all duration-300 cursor-pointer select-none hover:bg-accent/20 hover:border-accent hover:text-accent"
              data-testid={`badge-tech-${tech.toLowerCase()}`}
              onMouseEnter={(e) => handleTechHover(tech, e)}
              onMouseLeave={handleTechLeave}
              onClick={() => handleTechClick(tech)}
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {tech}
              {hoveredTech === tech && (
                <span className="ml-2 inline-block animate-pulse">✨</span>
              )}
            </span>
          ))}
        </div>
        <Link href="/projects">
          <Button
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all group"
            data-testid="button-explore-work"
          >
            <span className="group-hover:animate-pulse">Explore My Work</span>
          </Button>
        </Link>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-mono font-bold text-accent">
              {selectedTech}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground mt-2">
              {selectedTech && techInfo[selectedTech]?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">What I use it for:</h4>
              <ul className="space-y-1">
                {selectedTech && techInfo[selectedTech]?.usedFor.map((use, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center">
                    <span className="text-accent mr-2">•</span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium text-accent">
                {selectedTech && techInfo[selectedTech]?.experience}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
