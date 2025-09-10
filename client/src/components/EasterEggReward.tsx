import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, Sparkles, Trophy, Users, Code } from 'lucide-react';

interface EasterEggRewardProps {
  onClose: () => void;
}

export function EasterEggReward({ onClose }: EasterEggRewardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);

  const steps = [
    {
      icon: Trophy,
      title: "🎉 Incredible Achievement! 🎉",
      content: "You found all 7 easter eggs! Your curiosity and attention to detail is exactly what makes a great developer."
    },
    {
      icon: Users,
      title: "💝 A Personal Message",
      content: "Just like how turflix and expois inspired me to start coding, I hope your curiosity continues to drive you to explore, learn, and create amazing things."
    },
    {
      icon: Code,
      title: "🚀 Developer's Spirit",
      content: "You've proven you have that special quality every great developer needs - the drive to dig deeper, find hidden details, and never stop exploring."
    },
    {
      icon: Heart,
      title: "❤️ Thank You",
      content: "Thank you for taking the time to explore every corner of my portfolio. It means the world to me that you engaged so deeply with my work."
    },
    {
      icon: Sparkles,
      title: "✨ Keep Going",
      content: "Keep that curiosity alive! Whether you're coding, learning, or building - stay curious, stay passionate, and keep creating amazing things!"
    }
  ];

  useEffect(() => {
    setShowFireworks(true);
    const timer = setTimeout(() => setShowFireworks(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <Card className="max-w-2xl w-full bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-2xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center animate-bounce">
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {currentStepData.title}
          </h1>

          {/* Content */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {currentStepData.content}
          </p>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 py-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-primary w-6'
                    : index < currentStep
                    ? 'bg-primary/60'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Action Button */}
          <Button
            onClick={nextStep}
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 px-8 py-3 text-lg font-semibold"
          >
            {currentStep < steps.length - 1 ? (
              <>
                Continue <Star className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Amazing Journey! <Heart className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {/* Special Message */}
          {currentStep === steps.length - 1 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground italic">
                "The best developers are the ones who never stop being curious. You've got that spark - now go build something amazing!" 
                <br />
                <span className="text-primary font-medium">— savage.dev</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}