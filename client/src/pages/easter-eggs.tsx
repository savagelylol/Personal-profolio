import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Gift, Trophy, Search, CheckCircle, Circle, Star, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { EasterEggTracker } from '@/components/EasterEggTracker';

export default function EasterEggs() {
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [showAllHints, setShowAllHints] = useState(false);

  const totalEggs = 7;
  const easterEggList = [
    { 
      id: 'easterEgg1', 
      name: 'Menu Explorer', 
      hint: 'Click the easter eggs menu item in the side menu',
      fullHint: 'Open the hamburger menu and click on the "Easter Eggs" item',
      page: 'Side Menu',
      difficulty: 'Easy',
      emoji: '🍔'
    },
    { 
      id: 'easterEgg2', 
      name: 'Konami Master', 
      hint: 'Enter the famous cheat code sequence',
      fullHint: 'Type the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A (or use arrow keys + B + A)',
      page: 'Anywhere',
      difficulty: 'Medium',
      emoji: '🎮'
    },
    { 
      id: 'easterEgg3', 
      name: 'Logo Lover', 
      hint: 'Show the home logo some love (triple action!)',
      fullHint: 'Triple-click on the "savage" logo on the home page hero section',
      page: 'Home',
      difficulty: 'Easy',
      emoji: '💖'
    },
    { 
      id: 'easterEgg4', 
      name: 'Sequence Solver', 
      hint: 'Click technologies in a special order: J→P→L→S',
      fullHint: 'On the hero section, click the technology badges in order: JavaScript → Python → Lua → SQL',
      page: 'Home',
      difficulty: 'Hard',
      emoji: '🔢'
    },
    { 
      id: 'easterEgg5', 
      name: '404 Detective', 
      hint: 'Double-click the 404 page title',
      fullHint: 'Navigate to a non-existent page (like /doesnt-exist) and double-click the error message title',
      page: '404 Page',
      difficulty: 'Medium',
      emoji: '🕵️'
    },
    { 
      id: 'easterEgg6', 
      name: 'Infinity Seeker', 
      hint: 'Click the infinity symbol in skills page',
      fullHint: 'Go to Skills page and click on the ∞ symbol in the stats section',
      page: 'Skills',
      difficulty: 'Easy',
      emoji: '♾️'
    },
    { 
      id: 'easterEgg7', 
      name: 'Timeline Explorer', 
      hint: 'Right-click on the current timeline item',
      fullHint: 'Go to Timeline page and right-click (context menu) on the "Present" timeline item',
      page: 'Timeline',
      difficulty: 'Medium',
      emoji: '🎯'
    }
  ];

  // Live updating effect
  useEffect(() => {
    const updateFoundEggs = () => {
      const found = easterEggList
        .map(egg => egg.id)
        .filter(id => localStorage.getItem(id) === 'found');
      setFoundEggs(found);
    };

    // Initial load
    updateFoundEggs();

    // Listen for localStorage changes
    window.addEventListener('storage', updateFoundEggs);
    
    // Custom event for same-page updates
    window.addEventListener('easterEggFound', updateFoundEggs);

    return () => {
      window.removeEventListener('storage', updateFoundEggs);
      window.removeEventListener('easterEggFound', updateFoundEggs);
    };
  }, []);

  const progress = (foundEggs.length / totalEggs) * 100;
  const completedEggs = easterEggList.filter(egg => foundEggs.includes(egg.id));
  const remainingEggs = easterEggList.filter(egg => !foundEggs.includes(egg.id));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Hard': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Gift className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Easter Egg Hunt
            </h1>
            <Sparkles className="w-10 h-10 text-purple-500" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover hidden secrets scattered throughout the website. Each easter egg rewards your curiosity with a fun surprise!
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Progress Overview
              </div>
              <Badge variant={foundEggs.length === totalEggs ? "default" : "secondary"}>
                {foundEggs.length} / {totalEggs}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="w-full h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {foundEggs.length === 0 && "Start your hunt!"}
                  {foundEggs.length > 0 && foundEggs.length < totalEggs && `Keep going! ${totalEggs - foundEggs.length} more to find.`}
                  {foundEggs.length === totalEggs && "🎉 All easter eggs found! You're amazing!"}
                </span>
                <span className="text-primary font-medium">{Math.round(progress)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Found Easter Eggs */}
        {completedEggs.length > 0 && (
          <Card className="mb-8 bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                Found Easter Eggs ({completedEggs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {completedEggs.map((egg) => (
                  <div
                    key={egg.id}
                    className="flex items-center gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20"
                  >
                    <div className="text-2xl">{egg.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-green-600 truncate">{egg.name}</h3>
                        <Badge className={`text-xs ${getDifficultyColor(egg.difficulty)}`}>
                          {egg.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{egg.page}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Remaining Easter Eggs */}
        {remainingEggs.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  Remaining Easter Eggs ({remainingEggs.length})
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllHints(!showAllHints)}
                  data-testid="button-toggle-hints"
                >
                  {showAllHints ? 'Hide Hints' : 'Show All Hints'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {remainingEggs.map((egg) => (
                  <div
                    key={egg.id}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50"
                  >
                    <div className="text-2xl opacity-50">{egg.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{egg.name}</h3>
                        <Badge className={`text-xs ${getDifficultyColor(egg.difficulty)}`}>
                          {egg.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{egg.page}</p>
                      <p className="text-xs text-muted-foreground italic">
                        {showAllHints ? egg.fullHint : egg.hint}
                      </p>
                    </div>
                    <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Star className="w-5 h-5" />
              Hunt Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>🖱️ Try different types of clicks (single, double, triple, right-click)</p>
              <p>⌨️ Some easter eggs require keyboard input or key combinations</p>
              <p>🔍 Look for interactive elements that seem a bit different or special</p>
              <p>📱 Most easter eggs work on both desktop and mobile devices</p>
              <p>🎯 Don't forget to explore different pages - eggs are hidden everywhere!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Easter Egg Tracker */}
      <EasterEggTracker />
    </div>
  );
}