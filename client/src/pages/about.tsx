import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MapPin, 
  Calendar, 
  Heart, 
  Coffee,
  Music,
  Gamepad2,
  Code,
  Sparkles,
  Github,
  Twitter,
  Mail
} from "lucide-react";

export default function About() {
  const [funFactIndex, setFunFactIndex] = useState(0);

  const funFacts = [
    "🎮 I've built over 15 games in Roblox with millions of plays combined",
    "☕ I can't code without my perfect cup of coffee - it's basically my programming fuel",
    "🎵 I code best with lo-fi beats playing in the background",
    "🌙 I'm a night owl - my best coding happens after midnight",
    "🎯 I once debugged a problem for 6 hours straight and the fix was a missing semicolon",
    "🚀 My dream is to create games that bring people together like Roblox did for me",
    "🎨 I taught myself design because I got tired of my apps looking terrible",
    "⚡ I type at 95+ WPM when I'm in the zone"
  ];

  const interests = [
    { icon: Gamepad2, name: "Game Development", desc: "Creating immersive experiences" },
    { icon: Code, name: "Web Development", desc: "Building modern applications" },
    { icon: Music, name: "Music Production", desc: "Creating beats and melodies" },
    { icon: Coffee, name: "Coffee Brewing", desc: "Perfecting the perfect cup" }
  ];

  const nextFunFact = () => {
    setFunFactIndex((prev) => (prev + 1) % funFacts.length);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-primary/20" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A passionate developer who turns coffee into code and ideas into reality
            </p>
          </div>

          {/* Main Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Personal Info */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Get to Know Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>Based somewhere awesome</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Coding since I discovered the magic of "Hello, World!"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Passionate about creating experiences that matter</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  I'm a developer who believes in the power of code to bring ideas to life. 
                  Started my journey in Roblox game development and expanded into full-stack 
                  web development. I love creating interactive experiences that make people smile.
                </p>
              </CardContent>
            </Card>

            {/* Fun Facts */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Fun Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="min-h-[100px] flex items-center">
                  <p className="text-lg leading-relaxed">
                    {funFacts[funFactIndex]}
                  </p>
                </div>
                <Button 
                  onClick={nextFunFact}
                  variant="outline" 
                  className="w-full"
                  data-testid="button-next-fact"
                >
                  Tell me another! 🎲
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Interests */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>What I'm Passionate About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {interests.map((interest, index) => {
                  const Icon = interest.icon;
                  return (
                    <div key={index} className="text-center group hover:scale-105 transition-transform">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">{interest.name}</h3>
                      <p className="text-sm text-muted-foreground">{interest.desc}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="animate-pulse">
                    <Coffee className="w-3 h-3 mr-1" />
                    Currently Coding
                  </Badge>
                  <Badge variant="outline">
                    🚀 Building Cool Stuff
                  </Badge>
                  <Badge variant="outline">
                    💡 Always Learning
                  </Badge>
                </div>
                
                <p className="text-lg">
                  Right now I'm working on making this portfolio even more interactive and 
                  building some exciting new projects. Stay tuned! ✨
                </p>

                <div className="flex justify-center gap-4 pt-4">
                  <Button variant="outline" size="sm" asChild data-testid="link-github">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild data-testid="link-twitter">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild data-testid="link-contact">
                    <a href="/#contact">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}