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

  const level1Eggs = [
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

  const level2Eggs = [
    {
      id: 'easterEgg2_1',
      name: 'Social Sleuth',
      hint: 'Find the hidden social media secret',
      fullHint: 'Hold Shift and click on the Twitter/X link in the contact section',
      page: 'Home (Contact)',
      difficulty: 'Medium',
      emoji: '🔍'
    },
    {
      id: 'easterEgg2_2',
      name: 'Code Whisperer',
      hint: 'Type a secret message in the playground',
      fullHint: 'In the playground code editor, type exactly: "turflix and expois are awesome"',
      page: 'Playground',
      difficulty: 'Hard',
      emoji: '💻'
    },
    {
      id: 'easterEgg2_3',
      name: 'Theme Shifter',
      hint: 'Discover the theme toggle secret',
      fullHint: 'Click the theme toggle button 5 times rapidly (within 2 seconds)',
      page: 'Navigation',
      difficulty: 'Medium',
      emoji: '🌓'
    },
    {
      id: 'easterEgg2_4',
      name: 'Project Detective',
      hint: 'Find the hidden project details',
      fullHint: 'On the Projects page, hold Alt and click on any GitHub project star count',
      page: 'Projects',
      difficulty: 'Hard',
      emoji: '⭐'
    },
    {
      id: 'easterEgg2_5',
      name: 'Contact Master',
      hint: 'Uncover the contact form secret',
      fullHint: 'In the contact form, type "easter egg hunter" as your name and submit',
      page: 'Home (Contact)',
      difficulty: 'Medium',
      emoji: '📧'
    },
    {
      id: 'easterEgg2_6',
      name: 'Skill Seeker',
      hint: 'Find the hidden skill in the skills page',
      fullHint: 'On Skills page, double-click on the word "Experience" in the page title',
      page: 'Skills',
      difficulty: 'Easy',
      emoji: '🎭'
    },
    {
      id: 'easterEgg2_7',
      name: 'Ultimate Explorer',
      hint: 'Complete the final challenge',
      fullHint: 'On this Easter Eggs page, click on the gift icon 7 times while holding Ctrl',
      page: 'Easter Eggs',
      difficulty: 'Expert',
      emoji: '🏆'
    }
  ];

  // Live updating effect
  useEffect(() => {
    const updateFoundEggs = () => {
      const foundL1 = level1Eggs
        .map(egg => egg.id)
        .filter(id => localStorage.getItem(id) === 'found');
      const foundL2 = level2Eggs
        .map(egg => egg.id)
        .filter(id => localStorage.getItem(id) === 'found');
      setFoundEggs([...foundL1, ...foundL2]);
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

  const totalEggs = level1Eggs.length + level2Eggs.length;
  const level1Complete = level1Eggs.every(egg => foundEggs.includes(egg.id));
  const level2Unlocked = level1Complete;
  
  const progress = (foundEggs.length / totalEggs) * 100;
  const allEggs = [...level1Eggs, ...(level2Unlocked ? level2Eggs : [])];
  const completedEggs = allEggs.filter(egg => foundEggs.includes(egg.id));
  const remainingEggs = allEggs.filter(egg => !foundEggs.includes(egg.id));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Hard': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Expert': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
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
            <Gift 
              className="w-10 h-10 text-primary" 
              onClick={(e) => {
                // Easter Egg: Ultimate Explorer - Ctrl+click gift icon 7 times (Level 2)
                if (e.ctrlKey || e.metaKey) {
                  const clickCount = parseInt(localStorage.getItem('ultimateExplorerClicks') || '0') + 1;
                  localStorage.setItem('ultimateExplorerClicks', clickCount.toString());
                  
                  if (clickCount >= 7) {
                    // Check if level 1 is complete first
                    const level1Eggs = ['easterEgg1', 'easterEgg2', 'easterEgg3', 'easterEgg4', 'easterEgg5', 'easterEgg6', 'easterEgg7'];
                    const level1Complete = level1Eggs.every(id => localStorage.getItem(id) === 'found');
                    
                    if (level1Complete && !localStorage.getItem('easterEgg2_7')) {
                      localStorage.setItem('easterEgg2_7', 'found');
                      window.dispatchEvent(new CustomEvent('easterEggFound'));
                      localStorage.removeItem('ultimateExplorerClicks'); // Reset counter
                      alert('🎉 Level 2 Easter Egg Found! 🏆 Ultimate Explorer achieved! You completed the final challenge! You are now the Master Explorer - turflix and expois salute you!');
                    }
                  }
                }
              }}
              style={{ cursor: 'pointer' }}
              data-testid="icon-gift-ultimate"
            />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Easter Egg Hunt
            </h1>
            <Sparkles className="w-10 h-10 text-purple-500" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover hidden secrets scattered throughout the website. Complete Level 1 to unlock Level 2's advanced challenges!
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
              {/* Level Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Level 1:</span>
                  <Badge variant={level1Complete ? "default" : "secondary"}>
                    {level1Eggs.filter(egg => foundEggs.includes(egg.id)).length} / {level1Eggs.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Level 2:</span>
                  {level2Unlocked ? (
                    <Badge variant={level2Eggs.every(egg => foundEggs.includes(egg.id)) ? "default" : "secondary"}>
                      {level2Eggs.filter(egg => foundEggs.includes(egg.id)).length} / {level2Eggs.length}
                    </Badge>
                  ) : (
                    <Badge variant="outline">🔒 Locked</Badge>
                  )}
                </div>
              </div>
              
              <Progress value={progress} className="w-full h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {foundEggs.length === 0 && "Start your Level 1 hunt!"}
                  {!level1Complete && foundEggs.length > 0 && `${level1Eggs.length - level1Eggs.filter(egg => foundEggs.includes(egg.id)).length} more to unlock Level 2!`}
                  {level1Complete && !level2Eggs.every(egg => foundEggs.includes(egg.id)) && `Level 2 unlocked! ${level2Eggs.length - level2Eggs.filter(egg => foundEggs.includes(egg.id)).length} more challenges await!`}
                  {foundEggs.length === totalEggs && "🎉 Master Explorer! All easter eggs found! 🏆"}
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
              <div className="space-y-6">
                {/* Level 1 Completed Eggs */}
                {level1Eggs.some(egg => foundEggs.includes(egg.id)) && (
                  <div>
                    <h3 className="font-semibold text-sm text-green-600 mb-3 flex items-center gap-2">
                      <span>Level 1</span>
                      {level1Complete && <span className="text-xs">✅ Complete</span>}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {level1Eggs.filter(egg => foundEggs.includes(egg.id)).map((egg) => (
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
                  </div>
                )}

                {/* Level 2 Completed Eggs */}
                {level2Unlocked && level2Eggs.some(egg => foundEggs.includes(egg.id)) && (
                  <div>
                    <h3 className="font-semibold text-sm text-yellow-600 mb-3 flex items-center gap-2">
                      <span>Level 2</span>
                      {level2Eggs.every(egg => foundEggs.includes(egg.id)) && <span className="text-xs">🏆 Master!</span>}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {level2Eggs.filter(egg => foundEggs.includes(egg.id)).map((egg) => (
                        <div
                          key={egg.id}
                          className="flex items-center gap-3 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20"
                        >
                          <div className="text-2xl">{egg.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-yellow-600 truncate">{egg.name}</h3>
                              <Badge className={`text-xs ${getDifficultyColor(egg.difficulty)}`}>
                                {egg.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{egg.page}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
              <div className="space-y-6">
                {/* Level 1 Remaining Eggs */}
                {level1Eggs.some(egg => !foundEggs.includes(egg.id)) && (
                  <div>
                    <h3 className="font-semibold text-sm text-primary mb-3">Level 1</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {level1Eggs.filter(egg => !foundEggs.includes(egg.id)).map((egg) => (
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
                  </div>
                )}

                {/* Level 2 Remaining Eggs */}
                {level2Unlocked && level2Eggs.some(egg => !foundEggs.includes(egg.id)) && (
                  <div>
                    <h3 className="font-semibold text-sm text-yellow-600 mb-3">Level 2 🔓</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {level2Eggs.filter(egg => !foundEggs.includes(egg.id)).map((egg) => (
                        <div
                          key={egg.id}
                          className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30"
                        >
                          <div className="text-2xl opacity-70">{egg.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate text-yellow-700 dark:text-yellow-300">{egg.name}</h3>
                              <Badge className={`text-xs ${getDifficultyColor(egg.difficulty)}`}>
                                {egg.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{egg.page}</p>
                            <p className="text-xs text-muted-foreground italic">
                              {showAllHints ? egg.fullHint : egg.hint}
                            </p>
                          </div>
                          <Circle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
              <p>🏆 Complete Level 1 to unlock Level 2's advanced challenges!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Easter Egg Tracker */}
      <EasterEggTracker />
    </div>
  );
}