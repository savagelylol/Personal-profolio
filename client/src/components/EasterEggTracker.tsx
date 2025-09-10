import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Trophy, Star, X } from 'lucide-react';
import { EasterEggReward } from './EasterEggReward';

interface EasterEggTrackerProps {
  isVisible?: boolean;
  onHide?: () => void;
}

export function EasterEggTracker({ isVisible = false, onHide }: EasterEggTrackerProps) {
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const totalEggs = 7;
  const easterEggList = [
    { id: 'easterEgg1', name: 'Menu Explorer', hint: 'Click the easter eggs menu item in the side menu' },
    { id: 'easterEgg2', name: 'Konami Master', hint: 'Use the classic cheat code when the side menu is open' },
    { id: 'easterEgg3', name: 'Logo Lover', hint: 'Show the home logo some love (triple action!)' },
    { id: 'easterEgg4', name: 'Tech Sequence', hint: 'Click technologies in the right order: JavaScript → Python → Lua → SQL' },
    { id: 'easterEgg5', name: '404 Detective', hint: 'Double-click the 404 page title' },
    { id: 'easterEgg6', name: 'Infinity Seeker', hint: 'Click the infinity symbol in skills page' },
    { id: 'easterEgg7', name: 'Timeline Explorer', hint: 'Right-click on the current timeline item' }
  ];

  // Live updating effect
  useEffect(() => {
    const updateFoundEggs = () => {
      const found = easterEggList
        .map(egg => egg.id)
        .filter(id => localStorage.getItem(id) === 'found');
      setFoundEggs(found);

      if (found.length === totalEggs && !localStorage.getItem('rewardClaimed')) {
        setShowReward(true);
      }
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

  const claimReward = () => {
    setShowRewardModal(true);
  };

  const handleRewardComplete = () => {
    localStorage.setItem('rewardClaimed', 'true');
    setShowReward(false);
    setShowRewardModal(false);
  };

  // Don't render if not visible or no eggs found and not explicitly shown
  if (!isVisible && foundEggs.length === 0) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : foundEggs.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
      <Card className="w-80 bg-card/95 backdrop-blur-sm border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Easter Egg Progress
            </div>
            {onHide && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onHide}
                className="h-6 w-6 p-0 hover:bg-secondary"
                data-testid="button-hide-tracker"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Found:</span>
            <Badge variant={foundEggs.length === totalEggs ? "default" : "secondary"}>
              {foundEggs.length}/{totalEggs}
            </Badge>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: totalEggs }, (_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  foundEggs.includes(`easterEgg${i + 1}`)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {foundEggs.includes(`easterEgg${i + 1}`) ? '🥚' : '?'}
              </div>
            ))}
          </div>

          {foundEggs.length === totalEggs && !showReward && (
            <div className="text-center pt-2">
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                🎉 All eggs found! You're amazing! 🎉
              </div>
            </div>
          )}

          {showReward && (
            <Button 
              onClick={claimReward}
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 animate-pulse"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Claim Your Reward!
            </Button>
          )}

          {foundEggs.length > 0 && foundEggs.length < totalEggs && (
            <div className="text-xs text-muted-foreground text-center">
              Keep exploring! {totalEggs - foundEggs.length} more to find!
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Reward Modal */}
      {showRewardModal && (
        <EasterEggReward onClose={handleRewardComplete} />
      )}
    </div>
  );
}