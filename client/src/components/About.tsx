import { useState, useEffect } from 'react';

export function About() {
  const [projectCount, setProjectCount] = useState('50+');

  useEffect(() => {
    // Fetch real GitHub repo count and add 45
    const fetchProjectCount = async () => {
      try {
        const response = await fetch('https://api.github.com/users/savagelylol');
        const userData = await response.json();
        const totalCount = userData.public_repos + 45; // Adding 45 as requested
        setProjectCount(`${totalCount}+`);
      } catch (error) {
        console.error('Error fetching project count:', error);
        // Keep default value
      }
    };

    fetchProjectCount();
  }, []);

  const stats = [
    { value: projectCount, label: 'Projects Completed', color: 'text-accent' },
    { value: '7', label: 'Years Experience', color: 'text-primary' },
    { value: '10+', label: 'Languages Mastered', color: 'text-purple-500' }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-8 glow-text" data-testid="text-about-title">
            About savage
          </h2>
          <div className="text-lg text-muted-foreground leading-relaxed mb-8">
            <p className="mb-6" data-testid="text-about-intro">
              With <span className="text-accent font-bold">7 years of programming experience</span>, I've transformed from a curious 
              Roblox scripter into a versatile developer who thrives on creating interactive experiences.
            </p>
            <p className="mb-6" data-testid="text-about-journey">
              My journey began in the world of <span className="text-primary font-semibold">Roblox development</span>, where I mastered 
              LuaU scripting and built complex game systems. This foundation sparked my passion for programming 
              and led me to explore web development, game engines, and automation.
            </p>
            <p data-testid="text-about-current">
              Today, I specialize in creating engaging digital experiences that blur the line between 
              functionality and fun. Whether it's a complex Roblox game, a sleek web application, 
              or an indie game in GoDot, I bring creativity and technical expertise to every project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className={`text-3xl font-mono font-bold ${stat.color} mb-2`} data-testid={`stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground" data-testid={`stat-label-${index}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}