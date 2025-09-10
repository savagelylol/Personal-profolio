import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { EasterEggTracker } from '@/components/EasterEggTracker';

// Easter Egg #5: Hidden message in 404 page
const hiddenMessage = "🎮 You found the secret! This 404 page has more personality than most homepages! 😄";

export default function NotFound() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);

  useEffect(() => {
    // Create floating particles for visual appeal
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.vx + window.innerWidth) % window.innerWidth,
        y: (p.y + p.vy + window.innerHeight) % window.innerHeight,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient-x" />
      
      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            animation: `pulse 3s ease-in-out infinite`,
            animationDelay: `${particle.id * 0.2}s`
          }}
        />
      ))}

      <Card className="w-full max-w-lg mx-4 bg-card/90 backdrop-blur-sm border-border/50 shadow-2xl">
        <CardContent className="pt-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <AlertCircle className="h-16 w-16 text-red-400 animate-bounce" />
              <div className="absolute inset-0 h-16 w-16 text-red-400/30 animate-ping">
                <AlertCircle className="h-16 w-16" />
              </div>
            </div>
          </div>

          <h1 
            className="text-3xl font-bold text-foreground mb-4 leading-tight cursor-pointer select-none"
            onDoubleClick={() => {
              localStorage.setItem('easterEgg5', 'found');
              alert(hiddenMessage);
            }}
            data-testid="text-404-title"
          >
            Oops looks like you messed with the URL, maybe dont do that.
          </h1>

          <p className="text-muted-foreground mb-8 text-lg">
            Did you forget to add the page to the router?
          </p>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="group" data-testid="button-home">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Take Me Home
                </Link>
              </Button>
              
              <Button variant="outline" onClick={() => history.back()} data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">Or explore something cool:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild variant="secondary" size="sm" data-testid="link-playground">
                  <Link href="/playground">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Playground
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="sm" data-testid="link-projects">
                  <Link href="/projects">
                    Projects
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="sm" data-testid="link-about">
                  <Link href="/about">
                    About Me
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="sm" data-testid="link-skills">
                  <Link href="/skills">
                    Skills
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Easter Egg Tracker */}
      <EasterEggTracker />
    </div>
  );
}
