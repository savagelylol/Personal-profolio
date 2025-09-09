import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Twitter, Mail, MessageSquare, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
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
              className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
          
          <div className="flex justify-center space-x-6 mt-12">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
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
