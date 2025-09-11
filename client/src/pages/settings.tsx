import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon,
  Palette,
  Zap,
  Eye,
  Volume2,
  ArrowLeft,
  Moon,
  Sun,
  Coffee,
  Home,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";
import { EasterEggTracker } from '@/components/EasterEggTracker';

export default function Settings() {
  // Settings state
  const [comfortMode, setComfortMode] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setComfortMode(settings.comfortMode || false);
      setNightMode(settings.nightMode || false);
      setReducedMotion(settings.reducedMotion || false);
      setDarkMode(settings.darkMode || false);
      setSoundEffects(settings.soundEffects !== undefined ? settings.soundEffects : true);
      setAutoSave(settings.autoSave !== undefined ? settings.autoSave : true);
      setCompactMode(settings.compactMode || false);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      comfortMode,
      nightMode,
      reducedMotion,
      darkMode,
      soundEffects,
      autoSave,
      compactMode
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // Apply comfort mode class to body
    if (comfortMode) {
      document.body.classList.add('comfort-mode');
    } else {
      document.body.classList.remove('comfort-mode');
    }

    // Apply night mode class to body
    if (nightMode) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }

    // Apply reduced motion preference
    if (reducedMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }

    // Apply compact mode
    if (compactMode) {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }

    // Dispatch event for other components to react to settings changes
    window.dispatchEvent(new CustomEvent('settingsChanged', { detail: settings }));
  }, [comfortMode, nightMode, reducedMotion, darkMode, soundEffects, autoSave, compactMode]);

  const settingSections = [
    {
      title: "Visual Experience",
      icon: Eye,
      settings: [
        {
          id: "comfort-mode",
          title: "Comfort Mode",
          description: "Softer colors, rounded corners, and cozy spacing for a relaxing experience",
          icon: Coffee,
          value: comfortMode,
          onChange: (value: boolean) => {
            setComfortMode(value);
            if (value && nightMode) {
              setNightMode(false);
            }
          },
          badge: "Popular"
        },
        {
          id: "night-mode",
          title: "Night Time Mode",
          description: "Deep midnight purple theme perfect for late-night browsing",
          icon: Moon,
          value: nightMode,
          onChange: (value: boolean) => {
            setNightMode(value);
            if (value && comfortMode) {
              setComfortMode(false);
            }
          },
          badge: "New"
        },
        {
          id: "compact-mode", 
          title: "Compact Mode",
          description: "Tighter spacing and smaller elements for more content on screen",
          icon: Zap,
          value: compactMode,
          onChange: setCompactMode
        },
        {
          id: "reduced-motion",
          title: "Reduced Motion",
          description: "Minimize animations and transitions for better accessibility",
          icon: Eye,
          value: reducedMotion,
          onChange: setReducedMotion
        }
      ]
    },
    {
      title: "Interface",
      icon: SettingsIcon,
      settings: [
        {
          id: "sound-effects",
          title: "Sound Effects",
          description: "Enable subtle audio feedback for interactions",
          icon: Volume2,
          value: soundEffects,
          onChange: setSoundEffects
        },
        {
          id: "auto-save",
          title: "Auto Save",
          description: "Automatically save your preferences and progress",
          icon: Home,
          value: autoSave,
          onChange: setAutoSave
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/10 rounded-full animate-pulse ${
              reducedMotion ? '' : 'animate-bounce'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-secondary"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Customize your experience</p>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settingSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <Card 
                key={sectionIndex}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <SectionIcon className="w-4 h-4 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.settings.map((setting, settingIndex) => {
                    const SettingIcon = setting.icon;
                    return (
                      <div key={setting.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <SettingIcon className="w-4 h-4 text-muted-foreground" />
                            <div className="flex items-center gap-2">
                              <Label htmlFor={setting.id} className="font-medium cursor-pointer">
                                {setting.title}
                              </Label>
                              {setting.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {setting.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Switch
                            id={setting.id}
                            checked={setting.value}
                            onCheckedChange={setting.onChange}
                            data-testid={`switch-${setting.id}`}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground ml-7">
                          {setting.description}
                        </p>
                        {settingIndex < section.settings.length - 1 && (
                          <Separator className="!mt-4" />
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Settings Info */}
        <Card className="mt-8 border-border/50 bg-card/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Settings are automatically saved</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your preferences are stored locally in your browser and will persist across sessions. 
                  Some changes may require a page refresh to take full effect.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <EasterEggTracker />
    </div>
  );
}