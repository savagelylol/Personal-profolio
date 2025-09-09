import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function Hero() {

  const technologies = ['Lua', 'Python', 'JavaScript', 'GoDot', 'Ruby'];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-10">
        <h1 className="text-6xl md:text-8xl font-mono font-bold mb-6 glow-text" data-testid="text-hero-name">
          savage
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground" data-testid="text-hero-subtitle">
          <span className="text-accent font-bold">7 years</span> of crafting digital experiences
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm hover:bg-secondary transition-all cursor-pointer"
              data-testid={`badge-tech-${tech.toLowerCase()}`}
            >
              {tech}
            </span>
          ))}
        </div>
        <Link href="/projects">
          <Button
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all"
            data-testid="button-explore-work"
          >
            Explore My Work
          </Button>
        </Link>
      </div>
    </section>
  );
}
