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
  
  // Easter Egg #3: Triple click counter on logo
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showEasterEgg3, setShowEasterEgg3] = useState(false);
  
  // Easter Egg #4: Technology sequence clicking
  const [techSequence, setTechSequence] = useState<string[]>([]);
  const [showEasterEgg4, setShowEasterEgg4] = useState(false);
  const secretSequence = ['JavaScript', 'Python', 'Lua', 'SQL']; // JPLS = "Just Passionate Learning Squad"

  const technologies = ['Lua', 'Python', 'JavaScript', 'GoDot', 'Ruby', 'C++', 'SQL'];

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
    },
    "C++": {
      description: "A powerful, general-purpose programming language that supports procedural and object-oriented programming.",
      usedFor: ["Game engines", "System programming", "Performance-critical applications", "Desktop software"],
      experience: "3+ years developing high-performance applications and game systems"
    },
    SQL: {
      description: "A domain-specific language for managing and querying data stored in relational databases.",
      usedFor: ["Database queries", "Data analysis", "Report generation", "Backend data management"],
      experience: "4+ years designing databases and writing complex queries"
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
    
    // Easter Egg #4: Check for secret sequence
    const newSequence = [...techSequence, tech];
    if (newSequence.length > secretSequence.length) {
      newSequence.shift();
    }
    setTechSequence(newSequence);
    
    if (JSON.stringify(newSequence) === JSON.stringify(secretSequence)) {
      setShowEasterEgg4(true);
      if (!localStorage.getItem('easterEgg4')) {
        localStorage.setItem('easterEgg4', 'found');
        window.dispatchEvent(new CustomEvent('easterEggFound'));
        setTimeout(() => {
          alert('🎉 Easter Egg #4 Found! You clicked the secret technology sequence: JavaScript → Python → Lua → SQL (JPLS - Just Passionate Learning Squad)! 🚀');
        }, 100);
      }
    }
  };
  
  // Easter Egg #3: Logo triple click handler
  const handleLogoClick = () => {
    setLogoClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        setShowEasterEgg3(true);
        if (!localStorage.getItem('easterEgg3')) {
          localStorage.setItem('easterEgg3', 'found');
          window.dispatchEvent(new CustomEvent('easterEggFound'));
          setTimeout(() => {
            alert('🎉 Easter Egg #3 Found! You discovered the triple-click secret! The logo loves attention! 💖');
          }, 100);
        }
        return 0; // Reset counter
      }
      return newCount;
    });
    
    // Reset counter after 2 seconds if not completed
    setTimeout(() => {
      setLogoClickCount(prev => prev > 0 ? 0 : prev);
    }, 2000);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-10">
        <h1 
          className={`text-6xl md:text-8xl font-mono font-bold mb-6 glow-text transition-all duration-300 cursor-pointer select-none ${showEasterEgg3 ? 'animate-pulse' : ''} ${logoClickCount > 0 ? 'animate-bounce' : ''}`}
          data-testid="text-hero-name"
          onMouseMove={handleTitleHover}
          onMouseLeave={handleTitleLeave}
          onClick={handleLogoClick}
        >
          savage
          {showEasterEgg3 && (
            <span className="text-2xl md:text-4xl ml-4 text-yellow-500 animate-spin inline-block">
              ⭐
            </span>
          )}
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
