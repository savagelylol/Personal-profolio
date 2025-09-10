import { useState, useEffect } from "react";

// Easter Egg #6: Hidden in skills page - hover over "∞" symbol
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  Database, 
  Palette, 
  Wrench,
  Star,
  TrendingUp,
  Sparkles,
  Award,
  Target,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { EasterEggTracker } from '@/components/EasterEggTracker';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [animatedProgress, setAnimatedProgress] = useState<{[key: string]: number}>({});

  const skillCategories = {
    frontend: {
      icon: Code,
      name: "Frontend Development",
      color: "text-blue-500",
      skills: [
        { name: "React/TypeScript", level: 95, years: 3, projects: 25 },
        { name: "Next.js", level: 90, years: 2, projects: 15 },
        { name: "JavaScript/ES6+", level: 92, years: 4, projects: 40 },
        { name: "HTML5/CSS3", level: 95, years: 5, projects: 50 },
        { name: "Tailwind CSS", level: 90, years: 2, projects: 20 },
        { name: "Vue.js", level: 75, years: 1, projects: 8 }
      ]
    },
    backend: {
      icon: Database,
      name: "Backend Development", 
      color: "text-green-500",
      skills: [
        { name: "Node.js/Express", level: 85, years: 3, projects: 18 },
        { name: "Python", level: 80, years: 2, projects: 12 },
        { name: "PostgreSQL", level: 85, years: 3, projects: 15 },
        { name: "MongoDB", level: 75, years: 2, projects: 10 },
        { name: "RESTful APIs", level: 90, years: 3, projects: 25 },
        { name: "GraphQL", level: 70, years: 1, projects: 5 }
      ]
    },
    design: {
      icon: Palette,
      name: "Design & UI/UX",
      color: "text-purple-500",
      skills: [
        { name: "Figma", level: 85, years: 2, projects: 20 },
        { name: "UI/UX Design", level: 80, years: 3, projects: 30 },
        { name: "Responsive Design", level: 95, years: 4, projects: 45 },
        { name: "Design Systems", level: 75, years: 2, projects: 12 },
        { name: "Prototyping", level: 70, years: 2, projects: 15 }
      ]
    },
    tools: {
      icon: Wrench,
      name: "Tools & Technologies",
      color: "text-orange-500", 
      skills: [
        { name: "Git/GitHub", level: 90, years: 4, projects: 60 },
        { name: "VS Code", level: 95, years: 5, projects: 100 },
        { name: "Docker", level: 70, years: 1, projects: 8 },
        { name: "Vite/Webpack", level: 85, years: 2, projects: 25 },
        { name: "Testing (Jest)", level: 75, years: 2, projects: 15 },
        { name: "Roblox Studio", level: 95, years: 4, projects: 15 }
      ]
    }
  };

  // Animate progress bars when category changes
  useEffect(() => {
    const currentSkills = skillCategories[selectedCategory as keyof typeof skillCategories].skills;
    
    // Reset all to 0
    const resetProgress: {[key: string]: number} = {};
    currentSkills.forEach(skill => resetProgress[skill.name] = 0);
    setAnimatedProgress(resetProgress);

    // Animate to target values
    const timer = setTimeout(() => {
      const targetProgress: {[key: string]: number} = {};
      currentSkills.forEach(skill => targetProgress[skill.name] = skill.level);
      setAnimatedProgress(targetProgress);
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const currentCategory = skillCategories[selectedCategory as keyof typeof skillCategories];
  const CategoryIcon = currentCategory.icon;

  const getExperienceColor = (years: number) => {
    if (years >= 4) return "text-green-500";
    if (years >= 2) return "text-yellow-500";
    return "text-blue-500";
  };

  const getSkillLevel = (level: number) => {
    if (level >= 90) return { label: "Expert", color: "bg-green-500" };
    if (level >= 75) return { label: "Advanced", color: "bg-blue-500" };
    if (level >= 60) return { label: "Intermediate", color: "bg-yellow-500" };
    return { label: "Beginner", color: "bg-gray-500" };
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          
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
              Skills & <span 
                onDoubleClick={() => {
                  // Easter Egg: Skill Seeker - double-click "Experience" (Level 2)
                  const level1Eggs = ['easterEgg1', 'easterEgg2', 'easterEgg3', 'easterEgg4', 'easterEgg5', 'easterEgg6', 'easterEgg7'];
                  const level1Complete = level1Eggs.every(id => localStorage.getItem(id) === 'found');
                  
                  if (level1Complete && !localStorage.getItem('easterEgg2_6')) {
                    localStorage.setItem('easterEgg2_6', 'found');
                    window.dispatchEvent(new CustomEvent('easterEggFound'));
                    alert('🎉 Level 2 Easter Egg Found! 🎭 Skill Seeker discovered! You found the hidden skill - turflix and expois would be proud!');
                  }
                }}
                style={{ cursor: 'pointer' }}
                data-testid="text-experience-title"
              >
                Experience
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technologies I love working with and the experience I've gained over the years
            </p>
          </div>

          {/* Category Selection */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(skillCategories).map(([key, category]) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === key;
                  return (
                    <Button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      variant={isActive ? "default" : "outline"}
                      className={`flex-col h-auto p-4 space-y-2 transition-all ${
                        isActive ? 'ring-2 ring-primary' : 'hover:scale-105'
                      }`}
                      data-testid={`category-${key}`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : category.color}`} />
                      <span className="text-sm font-medium leading-tight">
                        {category.name}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Skills Display */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CategoryIcon className={`w-6 h-6 ${currentCategory.color}`} />
                {currentCategory.name}
                <Badge variant="secondary" className="ml-auto">
                  {currentCategory.skills.length} Skills
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {currentCategory.skills.map((skill, index) => {
                  const skillLevelInfo = getSkillLevel(skill.level);
                  return (
                    <div 
                      key={skill.name}
                      className="space-y-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`${skillLevelInfo.color} text-white border-0`}
                          >
                            {skillLevelInfo.label}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Proficiency</span>
                          <span className="text-sm font-medium">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={animatedProgress[skill.name] || 0} 
                          className="h-2"
                        />
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <Star className={`w-3 h-3 ${getExperienceColor(skill.years)}`} />
                          <span className="text-muted-foreground">
                            {skill.years} year{skill.years !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {skill.projects} project{skill.projects !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardContent className="pt-6">
                <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm text-muted-foreground">Years Coding</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
              <CardContent className="pt-6">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardContent className="pt-6">
                <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
              <CardContent className="pt-6">
                <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div 
                  className="text-2xl font-bold cursor-pointer hover:animate-spin transition-all"
                  onClick={() => {
                    if (!localStorage.getItem('easterEgg6')) {
                      localStorage.setItem('easterEgg6', 'found');
                      window.dispatchEvent(new CustomEvent('easterEggFound'));
                      alert('🎉 Easter Egg #6 Found! Infinity is not just a symbol, it\'s a mindset! ♾️ Always learning, always growing!');
                    }
                  }}
                  data-testid="text-infinity"
                >
                  ∞
                </div>
                <div className="text-sm text-muted-foreground">Learning More</div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
      
      {/* Easter Egg Tracker */}
      <EasterEggTracker />
    </div>
  );
}