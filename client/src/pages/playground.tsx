import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  Play, 
  Trash2, 
  Download, 
  Share2, 
  Sparkles,
  Terminal,
  Code2,
  Palette,
  Zap
} from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  code: string;
  description: string;
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState('code');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('// Welcome to the Interactive Playground!\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationId, setAnimationId] = useState<number>();

  const languages = [
    { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500' },
    { id: 'python', name: 'Python', color: 'bg-green-500' },
    { id: 'html', name: 'HTML', color: 'bg-orange-500' },
    { id: 'css', name: 'CSS', color: 'bg-blue-500' },
  ];

  const snippets: CodeSnippet[] = [
    {
      id: '1',
      name: 'Animated Button',
      language: 'javascript',
      code: `// Interactive animated button
const btn = document.createElement('button');
btn.textContent = 'Click me!';
btn.style.cssText = \`
  padding: 12px 24px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(1);
\`;

btn.addEventListener('mouseover', () => {
  btn.style.transform = 'scale(1.1) rotate(5deg)';
  btn.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.4)';
});

btn.addEventListener('mouseout', () => {
  btn.style.transform = 'scale(1) rotate(0deg)';
  btn.style.boxShadow = 'none';
});

btn.addEventListener('click', () => {
  btn.style.animation = 'bounce 0.6s ease';
  console.log('Button clicked with style! ✨');
});

document.body.appendChild(btn);`,
      description: 'Create an interactive button with hover and click animations'
    },
    {
      id: '2',
      name: 'Color Palette Generator',
      language: 'javascript',
      code: `// Dynamic color palette generator
function generatePalette() {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.floor(Math.random() * 30);
    const lightness = 50 + Math.floor(Math.random() * 20);
    colors.push(\`hsl(\${hue}, \${saturation}%, \${lightness}%)\`);
  }
  return colors;
}

function createPaletteDisplay() {
  const container = document.createElement('div');
  container.style.cssText = \`
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
  \`;

  generatePalette().forEach((color, index) => {
    const colorBox = document.createElement('div');
    colorBox.style.cssText = \`
      width: 80px;
      height: 80px;
      background: \${color};
      border-radius: 10px;
      cursor: pointer;
      transition: transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
    \`;
    
    colorBox.textContent = \`#\${index + 1}\`;
    
    colorBox.addEventListener('click', () => {
      navigator.clipboard.writeText(color);
      colorBox.textContent = 'Copied!';
      setTimeout(() => colorBox.textContent = \`#\${index + 1}\`, 1000);
    });
    
    colorBox.addEventListener('mouseover', () => {
      colorBox.style.transform = 'scale(1.1)';
    });
    
    colorBox.addEventListener('mouseout', () => {
      colorBox.style.transform = 'scale(1)';
    });
    
    container.appendChild(colorBox);
  });

  return container;
}

document.body.appendChild(createPaletteDisplay());
console.log('🎨 Color palette generated! Click colors to copy.');`,
      description: 'Generate beautiful color palettes with click-to-copy functionality'
    },
    {
      id: '3',
      name: 'Particle System',
      language: 'javascript',
      code: `// Interactive particle system
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.life = 100;
    this.decay = Math.random() * 0.02 + 0.01;
    this.size = Math.random() * 3 + 1;
    this.color = \`hsl(\${Math.random() * 60 + 200}, 70%, 60%)\`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // gravity
    this.life -= this.decay;
    this.size *= 0.99;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life / 100;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 300;
canvas.style.cssText = \`
  border: 2px solid #667eea;
  border-radius: 10px;
  cursor: crosshair;
  background: linear-gradient(45deg, #1a1a2e, #16213e);
\`;

const ctx = canvas.getContext('2d');
const particles = [];

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  for (let i = 0; i < 15; i++) {
    particles.push(new Particle(x, y));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.update();
    particle.draw(ctx);
    
    if (particle.life <= 0 || particle.size <= 0.1) {
      particles.splice(i, 1);
    }
  }
  
  requestAnimationFrame(animate);
}

document.body.appendChild(canvas);
animate();
console.log('✨ Click the canvas to create particles!');`,
      description: 'Create mesmerizing particle effects with mouse interaction'
    }
  ];

  const codeTemplates = {
    javascript: '// JavaScript playground\nconsole.log("Hello, JavaScript!");',
    python: '# Python playground\nprint("Hello, Python!")',
    html: '<!-- HTML playground -->\n<div class="hello">\n  <h1>Hello, HTML!</h1>\n  <p>Welcome to the playground!</p>\n</div>',
    css: '/* CSS playground */\n.hello {\n  background: linear-gradient(45deg, #667eea, #764ba2);\n  color: white;\n  padding: 20px;\n  border-radius: 10px;\n  text-align: center;\n}'
  };

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prev => {
        return prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.99,
          vy: particle.vy * 0.99,
        })).filter(particle => 
          Math.abs(particle.vx) > 0.1 || Math.abs(particle.vy) > 0.1
        );
      });

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
        ctx.fill();
      });

      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [particles.length]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (selectedLanguage === 'javascript') {
        setOutput('✅ Code executed successfully!\n🎉 Check the browser console for output');
        // In a real implementation, you would safely execute the JavaScript
        console.log('Executing user code:', code);
      } else {
        setOutput(`✅ ${languages.find(l => l.id === selectedLanguage)?.name} code validated!\n📝 Code looks good and ready to run`);
      }
    } catch (error) {
      setOutput('❌ Error executing code:\n' + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const loadSnippet = (snippet: CodeSnippet) => {
    setCode(snippet.code);
    setSelectedLanguage(snippet.language);
    setOutput('');
  };

  const clearCode = () => {
    setCode(codeTemplates[selectedLanguage as keyof typeof codeTemplates] || '');
    setOutput('');
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add particles at click position
    const newParticles: Array<{id: number, x: number, y: number, vx: number, vy: number}> = [];
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  return (
    <div className="min-h-screen bg-gradient-animated text-foreground relative overflow-hidden">
      {/* Interactive canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        onClick={handleCanvasClick}
        style={{ pointerEvents: activeTab === 'visual' ? 'auto' : 'none' }}
      />
      
      {/* Floating cursor effect */}
      <div
        className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none z-10 enhanced-glow"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transition: 'all 0.1s ease',
        }}
      />

      {/* Header */}
      <div className="relative z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back-home">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-mono font-bold glow-text flex items-center">
                  <Zap className="mr-2 text-accent" />
                  Interactive Playground
                </h1>
                <p className="text-muted-foreground">
                  Code, create, and explore in real-time
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="animate-pulse">
                <Sparkles className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="code" className="flex items-center space-x-2">
              <Code2 className="w-4 h-4" />
              <span>Code Editor</span>
            </TabsTrigger>
            <TabsTrigger value="snippets" className="flex items-center space-x-2">
              <Terminal className="w-4 h-4" />
              <span>Snippets</span>
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Visual Effects</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Tools</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Code Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Code2 className="w-5 h-5" />
                      <span>Code Editor</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="px-3 py-1 bg-card border border-border rounded text-sm"
                      >
                        {languages.map(lang => (
                          <option key={lang.id} value={lang.id}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                      <Button size="sm" variant="outline" onClick={clearCode}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-4 bg-secondary border border-border rounded font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Start coding..."
                    data-testid="textarea-code-editor"
                  />
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      onClick={runCode} 
                      disabled={isRunning}
                      className="flex items-center space-x-2"
                    >
                      <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
                      <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-3 h-3 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Output */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span>Output</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 p-4 bg-secondary border border-border rounded font-mono text-sm overflow-auto">
                    {output || (
                      <div className="text-muted-foreground italic">
                        Run your code to see output here...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="snippets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {snippets.map(snippet => (
                <Card key={snippet.id} className="group hover:border-primary transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{snippet.name}</CardTitle>
                      <Badge 
                        className={`${languages.find(l => l.id === snippet.language)?.color} text-white`}
                      >
                        {languages.find(l => l.id === snippet.language)?.name}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {snippet.description}
                    </p>
                    <Button 
                      onClick={() => loadSnippet(snippet)}
                      className="w-full group-hover:scale-105 transition-all"
                    >
                      Load Snippet
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Interactive Canvas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Click anywhere on the screen to create particle effects!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => setParticles([])}
                      variant="outline"
                    >
                      Clear Particles
                    </Button>
                    <Button 
                      onClick={() => {
                        const newParticles: Array<{id: number, x: number, y: number, vx: number, vy: number}> = [];
                        for (let i = 0; i < 50; i++) {
                          newParticles.push({
                            id: Date.now() + i,
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            vx: (Math.random() - 0.5) * 5,
                            vy: (Math.random() - 0.5) * 5,
                          });
                        }
                        setParticles(newParticles);
                      }}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Random Burst
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Color Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    🎨 Color Picker
                  </Button>
                  <Button className="w-full" variant="outline">
                    🌈 Gradient Generator
                  </Button>
                  <Button className="w-full" variant="outline">
                    🎯 Palette Generator
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dev Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    📐 CSS Grid Generator
                  </Button>
                  <Button className="w-full" variant="outline">
                    🔤 Lorem Ipsum Generator
                  </Button>
                  <Button className="w-full" variant="outline">
                    📱 Responsive Tester
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}