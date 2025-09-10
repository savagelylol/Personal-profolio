import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Playground from "@/pages/playground";
import About from "@/pages/about";
import Skills from "@/pages/skills";
import Timeline from "@/pages/timeline";
import EasterEggs from "@/pages/easter-eggs";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/playground" component={Playground} />
      <Route path="/about" component={About} />
      <Route path="/skills" component={Skills} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/easter-eggs" component={EasterEggs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Global Konami code easter egg (Level 1)
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          if (!localStorage.getItem('easterEgg2')) {
            localStorage.setItem('easterEgg2', 'found');
            window.dispatchEvent(new CustomEvent('easterEggFound'));
            alert('🎉 Easter Egg #2 Found! 🎮 Konami Master! You entered the legendary cheat code!');
          }
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
