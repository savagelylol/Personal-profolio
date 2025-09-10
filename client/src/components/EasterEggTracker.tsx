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
  const [foundLevel1Eggs, setFoundLevel1Eggs] = useState<string[]>([]);
  const [foundLevel2Eggs, setFoundLevel2Eggs] = useState<string[]>([]);
  const [showLevel1Complete, setShowLevel1Complete] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [manuallyHidden, setManuallyHidden] = useState(() => {
    return localStorage.getItem('easterEggTrackerHidden') === 'true';
  });

  const level1Eggs = [
    { id: 'easterEgg1', name: 'Menu Explorer', hint: 'Click the easter eggs menu item in the side menu' },
    { id: 'easterEgg2', name: 'Konami Master', hint: 'Use the classic cheat code when the side menu is open' },
    { id: 'easterEgg3', name: 'Logo Lover', hint: 'Show the home logo some love (triple action!)' },
    { id: 'easterEgg4', name: 'Tech Sequence', hint: 'Click technologies in the right order: JavaScript → Python → Lua → SQL' },
    { id: 'easterEgg5', name: '404 Detective', hint: 'Double-click the 404 page title' },
    { id: 'easterEgg6', name: 'Infinity Seeker', hint: 'Click the infinity symbol in skills page' },
    { id: 'easterEgg7', name: 'Timeline Explorer', hint: 'Right-click on the current timeline item' }
  ];

  const level2Eggs = [
    { id: 'easterEgg2_1', name: 'Social Sleuth', hint: 'Find the hidden social media links' },
    { id: 'easterEgg2_2', name: 'Code Whisperer', hint: 'Type a secret message in the playground' },
    { id: 'easterEgg2_3', name: 'Theme Shifter', hint: 'Discover the theme toggle secret' },
    { id: 'easterEgg2_4', name: 'Project Detective', hint: 'Find the hidden project details' },
    { id: 'easterEgg2_5', name: 'Contact Master', hint: 'Uncover the contact form secret' },
    { id: 'easterEgg2_6', name: 'Skill Seeker', hint: 'Find the hidden skill in the skills page' },
    { id: 'easterEgg2_7', name: 'Ultimate Explorer', hint: 'Complete the final challenge' }
  ];

  const totalLevel1Eggs = level1Eggs.length;
  const totalLevel2Eggs = level2Eggs.length;
  const level1Complete = foundLevel1Eggs.length === totalLevel1Eggs;
  const level2Unlocked = level1Complete;

  // Live updating effect
  useEffect(() => {
    const updateFoundEggs = () => {
      const foundL1 = level1Eggs
        .map(egg => egg.id)
        .filter(id => localStorage.getItem(id) === 'found');
      setFoundLevel1Eggs(foundL1);

      const foundL2 = level2Eggs
        .map(egg => egg.id)
        .filter(id => localStorage.getItem(id) === 'found');
      setFoundLevel2Eggs(foundL2);

      // Show Level 1 complete message
      if (foundL1.length === totalLevel1Eggs && !localStorage.getItem('level1Celebrated')) {
        setShowLevel1Complete(true);
        localStorage.setItem('level1Celebrated', 'true');
        setTimeout(() => {
          alert('🎉 Level 1 Complete! You found all 7 easter eggs! Level 2 is now unlocked with even more challenging secrets! 🚀✨');
          setShowLevel1Complete(false);
        }, 500);
      }

      // Show big reward only after Level 2 completion
      if (foundL2.length === totalLevel2Eggs && foundL1.length === totalLevel1Eggs && !localStorage.getItem('rewardClaimed')) {
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

  // Don't render if manually hidden or if not visible and no eggs found
  const totalFoundEggs = foundLevel1Eggs.length + foundLevel2Eggs.length;
  const shouldShow = isVisible || (!manuallyHidden && totalFoundEggs > 0);
  if (!shouldShow) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${shouldShow ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
      <Card className="w-80 bg-card/95 backdrop-blur-sm border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Easter Egg Progress
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setManuallyHidden(true);
                localStorage.setItem('easterEggTrackerHidden', 'true');
                if (onHide) onHide();
              }}
              className="h-6 w-6 p-0 hover:bg-secondary"
              data-testid="button-hide-tracker"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Level 1 Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Level 1:</span>
              <Badge variant={level1Complete ? "default" : "secondary"}>
                {foundLevel1Eggs.length} / {totalLevel1Eggs}
              </Badge>
            </div>
            {level1Complete && (
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                ✅ Level 1 Complete!
              </div>
            )}
          </div>

          {/* Level 2 Progress */}
          {level2Unlocked ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Level 2:</span>
                <Badge variant={foundLevel2Eggs.length === totalLevel2Eggs ? "default" : "secondary"}>
                  {foundLevel2Eggs.length} / {totalLevel2Eggs}
                </Badge>
              </div>
              {foundLevel2Eggs.length === totalLevel2Eggs && (
                <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                  🏆 Master Explorer!
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Level 2:</span>
                <Badge variant="outline">🔒 Locked</Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Complete Level 1 to unlock!
              </div>
            </div>
          )}

          {/* Reward Button - only after Level 2 completion */}
          {showReward && (
            <Button
              onClick={claimReward}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 animate-pulse"
              data-testid="button-claim-reward"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Claim Ultimate Reward! 🎉
            </Button>
          )}

          {!level1Complete && (
            <div className="text-xs text-muted-foreground text-center">
              Keep exploring! {totalLevel1Eggs - foundLevel1Eggs.length} more to unlock Level 2!
            </div>
          )}

          {level1Complete && foundLevel2Eggs.length < totalLevel2Eggs && (
            <div className="text-xs text-muted-foreground text-center">
              Level 2 challenge! {totalLevel2Eggs - foundLevel2Eggs.length} more secrets to find!
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