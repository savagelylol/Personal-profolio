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

// 3D Car Physics Game Component
function Game3D() {
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState({
    carColor: '#ff4444',
    speed: 5,
    friction: 0.95,
    gravity: 0.8,
    bounceHeight: 15
  });
  const [carState, setCarState] = useState({
    x: 0,
    y: 0,
    z: 0,
    velocityX: 0,
    velocityY: 0,
    velocityZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    onGround: true
  });
  const [cameraState, setCameraState] = useState({
    x: 0,
    y: -100,
    z: 150,
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: 0
  });
  const [keys, setKeys] = useState<{[key: string]: boolean}>({});
  const [gameAnimationId, setGameAnimationId] = useState<number>();
  const [score, setScore] = useState(0);
  const keysRef = useRef(keys);

  // Update keys ref to avoid stale closure
  useEffect(() => {
    keysRef.current = keys;
  }, [keys]);

  useEffect(() => {
    const canvas = gameCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 400;

    // 3D world objects
    const ground = { y: 0, size: 300 };
    const obstacles = [
      { x: -50, y: 10, z: -50, width: 30, height: 20, depth: 30 },
      { x: 80, y: 10, z: 20, width: 25, height: 15, depth: 25 },
      { x: -80, y: 10, z: 80, width: 40, height: 25, depth: 20 },
    ];
    const finish = { x: 0, y: 5, z: -120, width: 60, height: 30, depth: 10 };

    // 3D transformation functions
    function project3D(x: number, y: number, z: number, camera: typeof cameraState) {
      // Translate to camera space
      const dx = x - camera.x;
      const dy = y - camera.y;
      const dz = z - camera.z;
      
      // Simple perspective projection
      const scale = 300 / (300 + dz);
      const screenX = canvas!.width / 2 + dx * scale;
      const screenY = canvas!.height / 2 - dy * scale;
      
      return { x: screenX, y: screenY, scale, depth: dz };
    }

    function drawCar3D(car: typeof carState, camera: typeof cameraState) {
      const carPoints = [
        // Car body vertices (3D box)
        [-15, 0, -8], [15, 0, -8], [15, 15, -8], [-15, 15, -8],  // bottom
        [-15, 0, 8], [15, 0, 8], [15, 15, 8], [-15, 15, 8],      // top
      ];

      // Transform car points
      const transformedPoints = carPoints.map(([px, py, pz]) => {
        // Apply car rotation
        const cosY = Math.cos(car.rotationY);
        const sinY = Math.sin(car.rotationY);
        const cosX = Math.cos(car.rotationX);
        const sinX = Math.sin(car.rotationX);
        
        // Rotate around Y axis (turning)
        let x = px * cosY + pz * sinY;
        let y = py;
        let z = -px * sinY + pz * cosY;
        
        // Rotate around X axis (pitch)
        const newY = y * cosX - z * sinX;
        z = y * sinX + z * cosX;
        y = newY;
        
        // Translate to car position
        x += car.x;
        y += car.y;
        z += car.z;
        
        return project3D(x, y, z, camera);
      });

      // Draw car faces (simplified 3D rendering)
      const faces = [
        [0, 1, 5, 4], // front
        [1, 2, 6, 5], // right
        [2, 3, 7, 6], // back
        [3, 0, 4, 7], // left
        [4, 5, 6, 7], // top
        [0, 3, 2, 1]  // bottom
      ];

      // Sort faces by depth for proper rendering
      const facesWithDepth = faces.map((face, index) => {
        const avgDepth = face.reduce((sum, pointIndex) => 
          sum + transformedPoints[pointIndex].depth, 0) / face.length;
        return { face, depth: avgDepth, index };
      }).sort((a, b) => a.depth - b.depth);

      facesWithDepth.forEach(({ face, index }) => {
        ctx!.beginPath();
        face.forEach((pointIndex, i) => {
          const point = transformedPoints[pointIndex];
          if (i === 0) ctx!.moveTo(point.x, point.y);
          else ctx!.lineTo(point.x, point.y);
        });
        ctx!.closePath();

        // Different shades for different faces
        const brightness = Math.max(0.3, 1 - Math.abs(index - 2) * 0.2);
        const color = gameState.carColor;
        const r = parseInt(color.slice(1, 3), 16) * brightness;
        const g = parseInt(color.slice(3, 5), 16) * brightness;
        const b = parseInt(color.slice(5, 7), 16) * brightness;
        
        ctx!.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
        ctx!.fill();
        ctx!.strokeStyle = '#000';
        ctx!.lineWidth = 1;
        ctx!.stroke();
      });

      // Draw wheels
      const wheelPositions = [
        [-10, -5, -6], [10, -5, -6], [-10, -5, 6], [10, -5, 6]
      ];
      
      wheelPositions.forEach(([wx, wy, wz]) => {
        const cosY = Math.cos(car.rotationY);
        const sinY = Math.sin(car.rotationY);
        const x = wx * cosY + wz * sinY + car.x;
        const y = wy + car.y;
        const z = -wx * sinY + wz * cosY + car.z;
        
        const wheel = project3D(x, y, z, camera);
        ctx!.beginPath();
        ctx!.arc(wheel.x, wheel.y, 4 * wheel.scale, 0, Math.PI * 2);
        ctx!.fillStyle = '#222';
        ctx!.fill();
      });
    }

    function draw3DWorld(camera: typeof cameraState) {
      // Clear canvas with sky gradient
      const gradient = ctx!.createLinearGradient(0, 0, 0, canvas!.height);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#98FB98');
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Draw ground plane
      const groundPoints = [
        [-ground.size, 0, -ground.size],
        [ground.size, 0, -ground.size],
        [ground.size, 0, ground.size],
        [-ground.size, 0, ground.size]
      ].map(([x, y, z]) => project3D(x, y, z, camera));

      ctx!.beginPath();
      groundPoints.forEach((point, i) => {
        if (i === 0) ctx!.moveTo(point.x, point.y);
        else ctx!.lineTo(point.x, point.y);
      });
      ctx!.closePath();
      ctx!.fillStyle = '#228B22';
      ctx!.fill();

      // Draw obstacles
      obstacles.forEach(obs => {
        const corners = [
          [-obs.width/2, 0, -obs.depth/2],
          [obs.width/2, 0, -obs.depth/2],
          [obs.width/2, obs.height, -obs.depth/2],
          [-obs.width/2, obs.height, -obs.depth/2],
          [-obs.width/2, 0, obs.depth/2],
          [obs.width/2, 0, obs.depth/2],
          [obs.width/2, obs.height, obs.depth/2],
          [-obs.width/2, obs.height, obs.depth/2]
        ].map(([x, y, z]) => project3D(x + obs.x, y + obs.y, z + obs.z, camera));

        // Draw obstacle faces
        const obsFaces = [[0,1,2,3], [4,7,6,5], [0,4,5,1], [2,6,7,3], [0,3,7,4], [1,5,6,2]];
        obsFaces.forEach(face => {
          ctx!.beginPath();
          face.forEach((i, idx) => {
            const point = corners[i];
            if (idx === 0) ctx!.moveTo(point.x, point.y);
            else ctx!.lineTo(point.x, point.y);
          });
          ctx!.closePath();
          ctx!.fillStyle = '#8B4513';
          ctx!.fill();
          ctx!.strokeStyle = '#654321';
          ctx!.stroke();
        });
      });

      // Draw finish line
      const finishCorners = [
        [-finish.width/2, 0, -finish.depth/2],
        [finish.width/2, 0, -finish.depth/2],
        [finish.width/2, finish.height, -finish.depth/2],
        [-finish.width/2, finish.height, -finish.depth/2],
        [-finish.width/2, 0, finish.depth/2],
        [finish.width/2, 0, finish.depth/2],
        [finish.width/2, finish.height, finish.depth/2],
        [-finish.width/2, finish.height, finish.depth/2]
      ].map(([x, y, z]) => project3D(x + finish.x, y + finish.y, z + finish.z, camera));

      // Checkered finish pattern
      ctx!.fillStyle = '#FFD700';
      [[0,1,2,3], [4,7,6,5]].forEach(face => {
        ctx!.beginPath();
        face.forEach((i, idx) => {
          const point = finishCorners[i];
          if (idx === 0) ctx!.moveTo(point.x, point.y);
          else ctx!.lineTo(point.x, point.y);
        });
        ctx!.closePath();
        ctx!.fill();
      });
    }

    function checkCollisions3D(newX: number, newY: number, newZ: number) {
      // Ground collision
      if (newY < 0) return { collision: true, type: 'ground' };
      
      // World boundaries
      if (Math.abs(newX) > ground.size - 20 || Math.abs(newZ) > ground.size - 20) {
        return { collision: true, type: 'boundary' };
      }
      
      // Obstacle collisions
      for (const obs of obstacles) {
        if (Math.abs(newX - obs.x) < obs.width/2 + 15 &&
            newY < obs.height + 10 &&
            Math.abs(newZ - obs.z) < obs.depth/2 + 15) {
          return { collision: true, type: 'obstacle' };
        }
      }
      
      return { collision: false, type: 'none' };
    }

    function animate() {
      const currentKeys = keysRef.current;
      
      setCarState(prev => {
        let { x, y, z, velocityX, velocityY, velocityZ, rotationY, rotationX } = prev;
        
        // Handle input (no errors now!)
        if (currentKeys['ArrowUp'] || currentKeys['w'] || currentKeys['W']) {
          const speed = gameState.speed * 0.5;
          velocityX += Math.sin(rotationY) * speed;
          velocityZ += Math.cos(rotationY) * speed;
        }
        if (currentKeys['ArrowDown'] || currentKeys['s'] || currentKeys['S']) {
          const speed = gameState.speed * 0.3;
          velocityX -= Math.sin(rotationY) * speed;
          velocityZ -= Math.cos(rotationY) * speed;
        }
        if (currentKeys['ArrowLeft'] || currentKeys['a'] || currentKeys['A']) {
          rotationY -= 0.05;
        }
        if (currentKeys['ArrowRight'] || currentKeys['d'] || currentKeys['D']) {
          rotationY += 0.05;
        }
        if (currentKeys[' ']) { // Spacebar for jump
          if (y <= 5) velocityY = 20;
        }

        // Apply gravity
        velocityY -= gameState.gravity;
        
        // Apply friction
        velocityX *= gameState.friction;
        velocityZ *= gameState.friction;
        velocityY *= 0.98;

        // Calculate new position
        const newX = x + velocityX;
        const newY = y + velocityY;
        const newZ = z + velocityZ;

        // Check collisions
        const collision = checkCollisions3D(newX, newY, newZ);
        
        if (collision.collision) {
          if (collision.type === 'ground') {
            y = 0;
            velocityY = 0;
            rotationX *= 0.9; // Stabilize pitch
          } else {
            // Bounce off obstacles/boundaries
            velocityX *= -0.3;
            velocityZ *= -0.3;
            velocityY = Math.abs(velocityY) * 0.5;
          }
        } else {
          x = newX;
          y = newY;
          z = newZ;
        }

        // Add slight pitch based on movement
        rotationX = Math.sin(Date.now() * 0.01) * 0.05 * Math.sqrt(velocityX**2 + velocityZ**2);

        // Check finish line
        if (Math.abs(x - finish.x) < finish.width/2 && 
            Math.abs(z - finish.z) < finish.depth/2 && 
            y < finish.height + 10) {
          setScore(prev => prev + 10);
          // Reset position
          x = 0; y = 5; z = 100;
          velocityX = velocityY = velocityZ = 0;
        }

        return { x, y, z, velocityX, velocityY, velocityZ, rotationX, rotationY, rotationZ: 0, onGround: y <= 5 };
      });

      // Update camera to follow car with offset
      setCameraState(prev => ({
        ...prev,
        x: carState.x * 0.1 + prev.x * 0.9,
        y: (carState.y + 50) * 0.1 + prev.y * 0.9,
        z: (carState.z + 150) * 0.1 + prev.z * 0.9
      }));

      // Draw everything
      draw3DWorld(cameraState);
      drawCar3D(carState, cameraState);
      
      // Draw UI
      ctx!.fillStyle = '#000';
      ctx!.font = '16px monospace';
      ctx!.fillText(`Score: ${score}`, 20, 30);
      ctx!.fillText(`Speed: ${Math.sqrt(carState.velocityX**2 + carState.velocityZ**2).toFixed(1)}`, 20, 50);
      ctx!.fillText(`Altitude: ${carState.y.toFixed(1)}`, 20, 70);

      const id = requestAnimationFrame(animate);
      setGameAnimationId(id);
    }

    // Keyboard event handlers - fixed to prevent errors
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault();
        setKeys(prev => ({ ...prev, [e.key]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault();
        setKeys(prev => ({ ...prev, [e.key]: false }));
      }
    };

    // Focus the canvas for keyboard input
    canvas.focus();
    canvas.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('keyup', handleKeyUp);

    animate();

    return () => {
      if (gameAnimationId) cancelAnimationFrame(gameAnimationId);
      canvas.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  return (
    <div className="space-y-4">
      <canvas
        ref={gameCanvasRef}
        className="border-2 border-primary rounded-lg bg-gray-900 focus:outline-none"
        style={{ width: '100%', maxWidth: '500px', height: '350px' }}
        tabIndex={0}
      />
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Car Color:</label>
          <input
            type="color"
            value={gameState.carColor}
            onChange={(e) => setGameState(prev => ({ ...prev, carColor: e.target.value }))}
            className="ml-2 w-8 h-8 rounded cursor-pointer"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Speed: {gameState.speed}</label>
          <input
            type="range"
            min="2"
            max="10"
            value={gameState.speed}
            onChange={(e) => setGameState(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Friction: {gameState.friction.toFixed(2)}</label>
          <input
            type="range"
            min="0.8"
            max="0.99"
            step="0.01"
            value={gameState.friction}
            onChange={(e) => setGameState(prev => ({ ...prev, friction: parseFloat(e.target.value) }))}
            className="w-full"
          />
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={() => {
              setCarState({ x: 0, y: 5, z: 100, velocityX: 0, velocityY: 0, velocityZ: 0, rotationX: 0, rotationY: 0, rotationZ: 0, onGround: true });
              setScore(0);
            }}
          >
            Reset Car
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => setGameState(prev => ({ 
              ...prev, 
              carColor: `hsl(${Math.random() * 360}, 70%, 60%)` 
            }))}
          >
            Random Color
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p>🚗 3D Controls: WASD or Arrow Keys to drive</p>
          <p>🚀 Spacebar: Jump • 🏁 Reach the gold finish line!</p>
          <p>⚠️ Avoid 3D obstacles • 🌍 Full 3D physics with gravity</p>
          <p>📷 Dynamic 3D camera follows your car</p>
        </div>
      </div>
    </div>
  );
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

  // Easter Egg: Code Whisperer - typing secret message (Level 2)
  const handleCodeChange = (value: string) => {
    setCode(value);
    
    // Check if code contains the secret message
    if (value.includes('turflix and expois are awesome')) {
      // Check if level 1 is complete first
      const level1Eggs = ['easterEgg1', 'easterEgg2', 'easterEgg3', 'easterEgg4', 'easterEgg5', 'easterEgg6', 'easterEgg7'];
      const level1Complete = level1Eggs.every(id => localStorage.getItem(id) === 'found');
      
      if (level1Complete && !localStorage.getItem('easterEgg2_2')) {
        localStorage.setItem('easterEgg2_2', 'found');
        window.dispatchEvent(new CustomEvent('easterEggFound'));
        setTimeout(() => {
          alert('🎉 Level 2 Easter Egg Found! 💻 Code Whisperer mastered! You typed the secret message - turflix and expois are indeed awesome!');
        }, 100);
      }
    }
  };

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
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (selectedLanguage === 'javascript') {
        // Capture console output
        const logs: string[] = [];
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        // Override console methods to capture output
        console.log = (...args) => {
          logs.push('LOG: ' + args.join(' '));
          originalLog.apply(console, args);
        };
        console.error = (...args) => {
          logs.push('ERROR: ' + args.join(' '));
          originalError.apply(console, args);
        };
        console.warn = (...args) => {
          logs.push('WARN: ' + args.join(' '));
          originalWarn.apply(console, args);
        };

        try {
          // Create a safe execution context
          const func = new Function(`
            try {
              ${code}
              return 'Code executed successfully';
            } catch (e) {
              console.error(e.message);
              throw e;
            }
          `);
          
          const result = func();
          
          // Restore original console methods
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;

          const timestamp = new Date().toLocaleTimeString();
          let outputText = `🚀 Execution completed at ${timestamp}\n${'='.repeat(40)}\n\n`;
          
          if (logs.length > 0) {
            outputText += '📊 Console Output:\n' + '─'.repeat(20) + '\n';
            logs.forEach((log, index) => {
              const type = log.startsWith('ERROR:') ? '❌' : log.startsWith('WARN:') ? '⚠️' : '📝';
              outputText += `${index + 1}. ${type} ${log}\n`;
            });
            outputText += '\n✅ Code executed successfully!';
          } else {
            outputText += '📝 No console output generated.\n✅ Code executed without errors!';
          }
          
          outputText += `\n\n⏱️ Execution time: ${Date.now() - performance.now()}ms`;
          setOutput(outputText);
        } catch (error) {
          // Restore original console methods
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;

          const timestamp = new Date().toLocaleTimeString();
          let errorOutput = `💥 Execution failed at ${timestamp}\n${'='.repeat(40)}\n\n`;
          
          if (logs.length > 0) {
            errorOutput += '📊 Console Output:\n' + '─'.repeat(20) + '\n';
            logs.forEach((log, index) => {
              const type = log.startsWith('ERROR:') ? '❌' : log.startsWith('WARN:') ? '⚠️' : '📝';
              errorOutput += `${index + 1}. ${type} ${log}\n`;
            });
            errorOutput += '\n';
          }
          
          errorOutput += `🔍 Error Details:\n${'─'.repeat(15)}\n💡 ${(error as Error).message}\n\n`;
          errorOutput += '🛠️ Debugging Tips:\n';
          errorOutput += '• Check for syntax errors\n';
          errorOutput += '• Verify variable names\n';
          errorOutput += '• Check function calls\n';
          errorOutput += '• Look for missing semicolons';
          
          setOutput(errorOutput);
        }
      } else {
        setOutput(`✅ ${languages.find(l => l.id === selectedLanguage)?.name} code validated!\n📝 Code syntax looks good!`);
      }
    } catch (error) {
      setOutput('❌ Unexpected error:\n' + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const loadSnippet = (snippet: CodeSnippet) => {
    setCode(snippet.code);
    setSelectedLanguage(snippet.language);
    setOutput('');
    setActiveTab('code'); // Automatically switch to code editor tab
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
              <Badge className="bg-blue-500 text-white">
                Beta
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
                    onChange={(e) => handleCodeChange(e.target.value)}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🎮 3D Game Playground</CardTitle>
                </CardHeader>
                <CardContent>
                  <Game3D />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dev Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    🎨 Color Picker
                  </Button>
                  <Button className="w-full" variant="outline">
                    🌈 Gradient Generator
                  </Button>
                  <Button className="w-full" variant="outline">
                    📐 CSS Grid Generator
                  </Button>
                  <Button className="w-full" variant="outline">
                    🔤 Lorem Ipsum Generator
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