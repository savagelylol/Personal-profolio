import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  type: 'game' | 'web' | 'demo';
}

export function Projects() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: 'roblox-rpg',
      title: 'Epic Adventure RPG',
      description: 'A complete RPG system in Roblox with custom combat, inventory, and progression systems.',
      technologies: ['Lua', 'Roblox Studio'],
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      type: 'game'
    },
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization tool built with Python backend and JavaScript frontend.',
      technologies: ['Python', 'JavaScript'],
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      type: 'web'
    },
    {
      id: 'pixel-quest',
      title: 'Pixel Quest',
      description: '2D platformer game developed in GoDot with custom physics and level editor.',
      technologies: ['GoDot', 'GDScript'],
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      type: 'demo'
    }
  ];

  const handleCardHover = (e: React.MouseEvent, projectId: string) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardLeave = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const getActionButton = (project: Project) => {
    switch (project.type) {
      case 'game':
        return (
          <Button className="flex-1 py-2 bg-primary text-primary-foreground rounded hover:scale-105 transition-all" data-testid={`button-play-${project.id}`}>
            <Play className="w-4 h-4 mr-2" />
            Play Game
          </Button>
        );
      case 'web':
        return (
          <Button className="flex-1 py-2 bg-primary text-primary-foreground rounded hover:scale-105 transition-all" data-testid={`button-demo-${project.id}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
        );
      case 'demo':
        return (
          <Button className="flex-1 py-2 bg-primary text-primary-foreground rounded hover:scale-105 transition-all" data-testid={`button-download-${project.id}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Download
          </Button>
        );
    }
  };

  return (
    <section id="projects" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16 glow-text" data-testid="text-projects-title">
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="tilt-card bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all group"
              onMouseMove={(e) => handleCardHover(e, project.id)}
              onMouseLeave={handleCardLeave}
              data-testid={`card-project-${project.id}`}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                data-testid={`img-project-${project.id}`}
              />
              <div className="p-6">
                <h3 className="text-xl font-mono font-semibold mb-2" data-testid={`text-project-title-${project.id}`}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`text-project-description-${project.id}`}>
                  {project.description}
                </p>
                <div className="flex gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-accent/20 text-accent rounded text-xs"
                      data-testid={`badge-project-tech-${project.id}-${tech.toLowerCase()}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {getActionButton(project)}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="px-4 py-2 border border-border rounded hover:bg-muted transition-all"
                    data-testid={`button-github-${project.id}`}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
