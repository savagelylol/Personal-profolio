import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, Github, Star, GitFork, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch('https://api.github.com/users/savagelylol/repos?sort=updated&per_page=20');
      const data = await response.json();
      setRepos(data.filter((repo: GitHubRepo) => !repo.name.includes('savagelylol')));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      setLoading(false);
    }
  };

  const handleCardHover = (e: React.MouseEvent, repoId: string) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardLeave = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'Lua': 'bg-blue-600',
      'C#': 'bg-purple-500',
      'C++': 'bg-red-500',
      'C': 'bg-gray-500',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-blue-400',
      'Ruby': 'bg-red-600',
      'GDScript': 'bg-indigo-500'
    };
    return colors[language || ''] || 'bg-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects from GitHub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back-home">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-mono font-bold glow-text" data-testid="text-projects-title">
                  My Projects
                </h1>
                <p className="text-muted-foreground" data-testid="text-projects-subtitle">
                  Real projects from my GitHub repository
                </p>
              </div>
            </div>
            <a
              href="https://github.com/savagelylol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-github-profile"
            >
              <Github className="h-5 w-5" />
              <span>@savagelylol</span>
            </a>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="tilt-card bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all group"
              onMouseMove={(e) => handleCardHover(e, repo.id.toString())}
              onMouseLeave={handleCardLeave}
              data-testid={`card-project-${repo.name}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-mono font-semibold truncate flex-1" data-testid={`text-project-title-${repo.name}`}>
                    {repo.name}
                  </h3>
                  {repo.language && (
                    <span className={`px-2 py-1 ${getLanguageColor(repo.language)} text-white rounded text-xs ml-2`} data-testid={`badge-language-${repo.name}`}>
                      {repo.language}
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm line-clamp-3" data-testid={`text-project-description-${repo.name}`}>
                  {repo.description || 'No description available'}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-accent/20 text-accent rounded text-xs"
                        data-testid={`badge-topic-${repo.name}-${topic}`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1" data-testid={`stat-stars-${repo.name}`}>
                      <Star className="h-4 w-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1" data-testid={`stat-forks-${repo.name}`}>
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                  <span className="text-xs" data-testid={`text-updated-${repo.name}`}>
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full py-2 bg-primary text-primary-foreground rounded hover:scale-105 transition-all" data-testid={`button-view-${repo.name}`}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {repos.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
}