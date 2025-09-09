import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad, FileCode, Gem, Box, Code, Globe } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  percentage: number;
  description: string;
}

export function Skills() {
  const [animateMeters, setAnimateMeters] = useState(false);
  const [draggedSkill, setDraggedSkill] = useState<string | null>(null);
  const [skillPositions, setSkillPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    {
      id: 'roblox',
      name: 'Roblox Development',
      icon: <Gamepad className="text-accent text-2xl" />,
      percentage: 100,
      description: 'Master of Lua scripting and complex game systems'
    },
    {
      id: 'python',
      name: 'Python',
      icon: <FileCode className="text-accent text-2xl" />,
      percentage: 88,
      description: 'Backend development and automation'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: <Code className="text-accent text-2xl" />,
      percentage: 92,
      description: 'Modern web development and frameworks'
    },
    {
      id: 'godot',
      name: 'GoDot Engine',
      icon: <Box className="text-accent text-2xl" />,
      percentage: 85,
      description: '2D/3D game development'
    },
    {
      id: 'ruby',
      name: 'Ruby',
      icon: <Gem className="text-accent text-2xl" />,
      percentage: 78,
      description: 'Web applications and scripting'
    },
    {
      id: 'html',
      name: 'HTML/CSS',
      icon: <Globe className="text-accent text-2xl" />,
      percentage: 90,
      description: 'Modern web standards and design'
    },
    {
      id: 'csharp',
      name: 'C#',
      icon: <Code className="text-accent text-2xl" />,
      percentage: 82,
      description: '.NET development and desktop applications'
    },
    {
      id: 'cpp',
      name: 'C++',
      icon: <FileCode className="text-accent text-2xl" />,
      percentage: 75,
      description: 'System programming and performance optimization'
    },
    {
      id: 'c',
      name: 'C',
      icon: <FileCode className="text-accent text-2xl" />,
      percentage: 70,
      description: 'Low-level programming and embedded systems'
    },
    {
      id: 'sql',
      name: 'SQL',
      icon: <Box className="text-accent text-2xl" />,
      percentage: 85,
      description: 'Database design and complex queries'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateMeters(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e: React.MouseEvent, skillId: string) => {
    e.preventDefault();
    setDraggedSkill(skillId);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && draggedSkill) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setSkillPositions(prev => ({
        ...prev,
        [draggedSkill]: { x: x - 150, y: y - 100 }
      }));
    }
  };

  const handleMouseUp = () => {
    if (isDragging && draggedSkill) {
      // Smooth return to original position
      setTimeout(() => {
        setSkillPositions(prev => ({
          ...prev,
          [draggedSkill!]: { x: 0, y: 0 }
        }));
      }, 1000);
      
      setIsDragging(false);
      setDraggedSkill(null);
    }
  };


  return (
    <section id="skills" className="py-20 relative" ref={skillsRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16 glow-text" data-testid="text-skills-title">
          Interactive Skills
        </h2>
        
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {skills.map((skill, index) => {
            const position = skillPositions[skill.id] || { x: 0, y: 0 };
            const isBeingDragged = draggedSkill === skill.id && isDragging;
            
            return (
              <div
                key={skill.id}
                className={`tilt-card bg-card border border-border rounded-lg p-6 hover:border-primary transition-all cursor-grab ${
                  isBeingDragged ? 'z-50 scale-105 rotate-12 cursor-grabbing' : ''
                }`}
                style={{
                  position: 'relative',
                  transform: `translate(${position.x}px, ${position.y}px) ${
                    isBeingDragged ? 'scale(1.05) rotate(5deg)' : ''
                  }`,
                  zIndex: isBeingDragged ? 1000 : 'auto',
                }}
                onMouseDown={(e) => handleMouseDown(e, skill.id)}
                data-testid={`card-skill-${skill.id}`}
              >
                <div className="flex items-center mb-4">
                  {skill.icon}
                  <h3 className="text-xl font-mono font-semibold ml-3" data-testid={`text-skill-name-${skill.id}`}>
                    {skill.name}
                  </h3>
                </div>
                <div className="bg-muted rounded-full h-2 mb-2">
                  <div
                    className={`skill-meter bg-accent h-2 rounded-full transition-all duration-2000 ease-in-out ${
                      animateMeters ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      width: animateMeters ? `${skill.percentage}%` : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                    data-testid={`meter-skill-${skill.id}`}
                  />
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`text-skill-description-${skill.id}`}>
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4" data-testid="text-drag-hint">
            💡 Try dragging the skill cards around!
          </p>
        </div>
      </div>
    </section>
  );
}
