import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  X, 
  User, 
  Star, 
  Clock, 
  Sparkles,
  Coffee,
  Gamepad2,
  Settings
} from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [easterEggFound, setEasterEggFound] = useState(false);

  const menuItems = [
    { 
      icon: User, 
      label: 'About Me', 
      href: '/about',
      description: 'Learn about my story'
    },
    { 
      icon: Star, 
      label: 'Skills', 
      href: '/skills',
      description: 'Technical expertise'
    },
    { 
      icon: Clock, 
      label: 'My Journey', 
      href: '/timeline',
      description: 'Development timeline'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/settings',
      description: 'Customize your experience'
    },
    { 
      icon: Sparkles, 
      label: 'Easter Eggs', 
      href: '/easter-eggs',
      description: '🥚 Hunt for hidden secrets',
      onClick: () => {
        // This is easter egg #1 - clicking on easter eggs menu item
        if (!localStorage.getItem('easterEgg1')) {
          localStorage.setItem('easterEgg1', 'found');
          // Dispatch custom event for live updates
          window.dispatchEvent(new CustomEvent('easterEggFound'));
          alert('🎉 Easter Egg #1 Found! You clicked the Easter Eggs menu item!');
        }
        // Show tracker and navigate to easter eggs page
        localStorage.removeItem('easterEggTrackerHidden');
        window.dispatchEvent(new CustomEvent('showEasterEggTracker'));
        setTimeout(() => {
          window.location.href = '/easter-eggs';
        }, 100);
      }
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Side Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-96 bg-card/95 backdrop-blur-md border-r border-border shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-border">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <h2 className="font-mono text-2xl font-bold">savage.dev</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-secondary"
            data-testid="button-close-menu"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Easter Egg Indicator */}
        {easterEggFound && (
          <div className="mx-8 mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg animate-bounce">
            <div className="flex items-center gap-3">
              <Coffee className="w-5 h-5 text-yellow-500" />
              <span className="text-base text-yellow-600 dark:text-yellow-400 font-medium">
                🎮 Konami Code Discovered! Easter Egg #2!
              </span>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="p-8 space-y-3 overflow-y-auto flex-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="group">
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center gap-5 p-5 rounded-xl hover:bg-secondary/50 transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg"
                    data-testid={`menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </button>
                ) : (
                  <Link href={item.href}>
                    <button
                      onClick={onClose}
                      className="w-full flex items-center gap-5 p-5 rounded-xl hover:bg-secondary/50 transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg"
                      data-testid={`menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-lg">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </button>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

      </div>
    </>
  );
}