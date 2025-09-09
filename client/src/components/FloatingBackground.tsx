import { useEffect, useState } from 'react';

export function FloatingBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const elements = [
    { size: 'w-20 h-20', color: 'bg-primary', position: 'top-1/4 left-1/4', speed: 0.5 },
    { size: 'w-16 h-16', color: 'bg-accent', position: 'top-3/4 right-1/4', speed: 1 },
    { size: 'w-12 h-12', color: 'bg-purple-500', position: 'top-1/2 left-3/4', speed: 1.5 },
    { size: 'w-24 h-24', color: 'bg-primary', position: 'bottom-1/4 left-1/2', speed: 2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => {
        const x = (mousePosition.x - 0.5) * element.speed * 100;
        const y = (mousePosition.y - 0.5) * element.speed * 100;
        const rotation = x * 0.1;

        return (
          <div
            key={index}
            className={`floating-bg ${element.size} ${element.color} rounded-full absolute ${element.position}`}
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
