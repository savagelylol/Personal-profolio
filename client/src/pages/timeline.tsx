import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Rocket,
  Star,
  Code,
  Gamepad2,
  Trophy,
  Heart,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { EasterEggTracker } from '@/components/EasterEggTracker';

interface TimelineItem {
  id: string;
  year: string;
  date: string;
  title: string;
  type: 'education' | 'work' | 'project' | 'achievement' | 'personal';
  description: string;
  location?: string;
  technologies?: string[];
  highlights?: string[];
  icon: any;
  color: string;
}

export default function Timeline() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const timelineData: TimelineItem[] = [
    {
      id: 'start',
      year: '2019',
      date: 'Late 2019',
      title: 'First Line of Code',
      type: 'personal',
      description: 'Discovered programming through Roblox scripting. Fell in love with the magic of making things work with code.',
      technologies: ['Lua', 'Roblox Studio'],
      highlights: ['Built first working script', 'Learned basic programming concepts'],
      icon: Code,
      color: 'bg-purple-500'
    },
    {
      id: 'roblox-games',
      year: '2020',
      date: 'Throughout 2020',
      title: 'Game Development Journey',
      type: 'project',
      description: 'Started creating games on Roblox, learning game mechanics, user experience, and how to build engaging experiences.',
      technologies: ['Lua', 'Roblox Studio', 'Game Design'],
      highlights: ['Published first game', 'Gained thousands of players', 'Learned user feedback integration'],
      icon: Gamepad2,
      color: 'bg-green-500'
    },
    {
      id: 'web-dev',
      year: '2021',
      date: 'Mid 2021',
      title: 'Web Development Discovery',
      type: 'education',
      description: 'Expanded beyond games into web development. Started with HTML, CSS, and JavaScript fundamentals.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      highlights: ['Built first website', 'Learned responsive design', 'Discovered developer tools'],
      icon: GraduationCap,
      color: 'bg-blue-500'
    },
    {
      id: 'react-journey',
      year: '2022',
      date: 'Early 2022',
      title: 'React & Modern Development',
      type: 'education',
      description: 'Dove deep into React, TypeScript, and modern development practices. Started building more complex applications.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Git'],
      highlights: ['Mastered component thinking', 'Built several web apps', 'Learned version control'],
      icon: Rocket,
      color: 'bg-cyan-500'
    },
    {
      id: 'fullstack',
      year: '2023',
      date: 'Throughout 2023',
      title: 'Full-Stack Development',
      type: 'work',
      description: 'Became proficient in full-stack development, working with databases, APIs, and complex architectures.',
      technologies: ['PostgreSQL', 'Express.js', 'REST APIs', 'Database Design'],
      highlights: ['Built end-to-end applications', 'Learned database design', 'Mastered API development'],
      icon: Briefcase,
      color: 'bg-orange-500'
    },
    {
      id: 'portfolio',
      year: '2024',
      date: 'Early 2024',
      title: 'Advanced Portfolio & Projects',
      type: 'achievement',
      description: 'Created this interactive portfolio and several advanced projects showcasing modern development practices.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', '3D Canvas', 'Advanced UI'],
      highlights: ['Interactive 3D game', 'Real-time code execution', 'Advanced animations'],
      icon: Trophy,
      color: 'bg-yellow-500'
    },
    {
      id: 'current',
      year: '2025',
      date: 'Now',
      title: 'Continuous Growth',
      type: 'personal',
      description: 'Always learning, always building. Currently exploring new technologies and working on exciting projects. 🚀✨',
      technologies: ['Next.js', 'AI/ML', 'Cloud Technologies', 'Mobile Development'],
      highlights: ['Learning every day', 'Building cool stuff', 'Helping others learn', '🥚 Secret: Right-click me!'],
      icon: Heart,
      color: 'bg-red-500'
    }
  ];

  const typeFilters = [
    { key: 'all', label: 'All', icon: Star },
    { key: 'education', label: 'Learning', icon: GraduationCap },
    { key: 'work', label: 'Work', icon: Briefcase },
    { key: 'project', label: 'Projects', icon: Code },
    { key: 'achievement', label: 'Achievements', icon: Trophy },
    { key: 'personal', label: 'Personal', icon: Heart }
  ];

  const filteredTimeline = selectedType === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.type === selectedType);

  const getTypeColor = (type: string) => {
    const colors: {[key: string]: string} = {
      education: 'bg-blue-500',
      work: 'bg-green-500',
      project: 'bg-purple-500',
      achievement: 'bg-yellow-500',
      personal: 'bg-red-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Back Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild data-testid="button-back">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              My Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From first "Hello, World!" to building complex applications - here's my development story
            </p>
          </div>

          {/* Filter Buttons */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {typeFilters.map((filter) => {
                  const Icon = filter.icon;
                  const isActive = selectedType === filter.key;
                  return (
                    <Button
                      key={filter.key}
                      onClick={() => setSelectedType(filter.key)}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className={`transition-all ${isActive ? 'ring-2 ring-primary' : ''}`}
                      data-testid={`filter-${filter.key}`}
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {filter.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-purple-600 hidden sm:block" />

            <div className="space-y-8">
              {filteredTimeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="relative flex gap-6 group"
                    style={{ 
                      animation: `fadeInUp 0.6s ease-out forwards`,
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0
                    }}
                    onContextMenu={(e) => {
                      if (item.id === 'current') {
                        e.preventDefault();
                        localStorage.setItem('easterEgg7', 'found');
                        alert('🎉 Easter Egg #7 Found! You right-clicked on the current timeline item! Thanks for exploring every corner of my journey! 🎯');
                      }
                    }}
                  >
                    {/* Timeline Node */}
                    <div className="hidden sm:flex">
                      <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <Card className="flex-1 bg-card/70 backdrop-blur-sm border-border/50 group-hover:bg-card/90 transition-all">
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                          <div className="flex items-center gap-3 mb-2 sm:mb-0">
                            <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center sm:hidden`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{item.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {item.date}
                                {item.location && (
                                  <>
                                    <MapPin className="w-3 h-3 ml-2" />
                                    {item.location}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className={`${getTypeColor(item.type)} text-white border-0`}>
                              {item.type}
                            </Badge>
                            <Badge variant="secondary" className="text-2xl font-bold px-3">
                              {item.year}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {item.description}
                        </p>

                        {item.technologies && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2">Technologies Used:</h4>
                            <div className="flex flex-wrap gap-1">
                              {item.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.highlights && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Key Highlights:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {item.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Star className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20 text-center">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-2">What's Next?</h3>
              <p className="text-muted-foreground mb-4">
                The journey continues! Always learning, always building, always growing.
              </p>
              <div className="flex justify-center gap-3">
                <Button asChild variant="default" data-testid="link-projects">
                  <Link href="/projects">View My Projects</Link>
                </Button>
                <Button asChild variant="outline" data-testid="link-contact">
                  <Link href="/#contact">Let's Connect</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      {/* Easter Egg Tracker */}
      <EasterEggTracker />
    </div>
  );
}