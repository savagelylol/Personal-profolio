import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Twitter, Mail, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Track if we need to check for easter egg on submit
  const [shouldCheckEasterEgg, setShouldCheckEasterEgg] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Track if the name field contains the easter egg trigger
    if (field === 'name' && value.toLowerCase() === 'easter egg hunter') {
      setShouldCheckEasterEgg(true);
    } else if (field === 'name') {
      setShouldCheckEasterEgg(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Easter Egg: Contact Master - submit form with "easter egg hunter" as name (Level 2)
    if (shouldCheckEasterEgg) {
      const level1Eggs = ['easterEgg1', 'easterEgg2', 'easterEgg3', 'easterEgg4', 'easterEgg5', 'easterEgg6', 'easterEgg7'];
      const level1Complete = level1Eggs.every(id => localStorage.getItem(id) === 'found');
      
      if (level1Complete && !localStorage.getItem('easterEgg2_5')) {
        localStorage.setItem('easterEgg2_5', 'found');
        window.dispatchEvent(new CustomEvent('easterEggFound'));
        setTimeout(() => {
          alert('🎉 Level 2 Easter Egg Found! 📧 Contact Master unlocked! You submitted with the secret name - turflix and expois approve!');
        }, 100);
      }
      setShouldCheckEasterEgg(false);
    }
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Message Sent! 🎉",
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Easter Egg: Social Sleuth - Shift+click Twitter link (Level 2)
  const handleSocialClick = (link: any, event: React.MouseEvent) => {
    if (link.label === 'Twitter' && event.shiftKey) {
      event.preventDefault();
      
      // Check if level 1 is complete first
      const level1Eggs = ['easterEgg1', 'easterEgg2', 'easterEgg3', 'easterEgg4', 'easterEgg5', 'easterEgg6', 'easterEgg7'];
      const level1Complete = level1Eggs.every(id => localStorage.getItem(id) === 'found');
      
      if (level1Complete && !localStorage.getItem('easterEgg2_1')) {
        localStorage.setItem('easterEgg2_1', 'found');
        window.dispatchEvent(new CustomEvent('easterEggFound'));
        alert('🎉 Level 2 Easter Egg Found! 🔍 Social Sleuth discovered! You found the hidden Twitter secret - turflix and expois would love this!');
      } else {
        // Still open the link if easter egg is already found or level 1 not complete
        window.open(link.href, '_blank');
      }
    } else {
      // Normal link behavior
      if (link.href !== '#') {
        window.open(link.href, '_blank');
      }
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/savagelylol', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/savagelylol', label: 'Twitter' },
    { icon: MessageSquare, href: '#', label: 'Discord' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16 glow-text" data-testid="text-contact-title">
          Get In Touch
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className="floating-form-group transition-all duration-300"
              style={{
                transform: focusedField === 'name' ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                filter: focusedField === 'name' ? 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.2))' : 'none'
              }}
            >
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                data-testid="input-name"
              />
            </div>

            <div
              className="floating-form-group transition-all duration-300"
              style={{
                transform: focusedField === 'email' ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                filter: focusedField === 'email' ? 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.2))' : 'none'
              }}
            >
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                data-testid="input-email"
              />
            </div>

            <div
              className="floating-form-group transition-all duration-300"
              style={{
                transform: focusedField === 'message' ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                filter: focusedField === 'message' ? 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.2))' : 'none'
              }}
            >
              <Textarea
                rows={6}
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                data-testid="textarea-message"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-send-message"
            >
              <Send className={`w-4 h-4 mr-2 ${isSubmitting ? 'animate-pulse' : ''}`} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
          
          <div className="flex justify-center space-x-6 mt-12">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleSocialClick(link, e)}
                className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                aria-label={link.label}
                data-testid={`link-social-${link.label.toLowerCase()}`}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
