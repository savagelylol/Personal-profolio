import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, Github, Star, GitFork, ArrowLeft, Users, Eye } from 'lucide-react';
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
  type: 'github';
}

interface RobloxGame {
  id: number;
  name: string;
  description: string | null;
  placeVisits: number;
  maxPlayers: number;
  playing: number;
  favoritedCount: number;
  created: string;
  updated: string;
  type: 'roblox';
  universeId: number;
  rootPlaceId?: number;
}

type Project = GitHubRepo | RobloxGame;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [totalProjectCount, setTotalProjectCount] = useState(0);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const [githubData, githubUserData, robloxData] = await Promise.all([
        fetchGitHubRepos(),
        fetchGitHubUserData(),
        fetchRobloxGames()
      ]);

      // Combine and deduplicate projects
      const allProjects = [...githubData, ...robloxData];
      const deduplicatedProjects = deduplicateProjects(allProjects);
      
      setProjects(deduplicatedProjects);
      
      // Calculate total with +45 boost
      const actualCount = githubUserData.public_repos + robloxData.length;
      setTotalProjectCount(actualCount + 45);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const fetchGitHubUserData = async () => {
    const response = await fetch('https://api.github.com/users/savagelylol');
    return await response.json();
  };

  const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
    const response = await fetch('https://api.github.com/users/savagelylol/repos?sort=updated&per_page=100');
    const data = await response.json();
    return data.map((repo: any) => ({
      ...repo,
      type: 'github' as const
    })).filter((repo: GitHubRepo) => !repo.name.includes('savagelylol'));
  };

  const fetchRobloxGames = async (): Promise<RobloxGame[]> => {
    try {
      const response = await fetch('/api/roblox-games');
      const data = await response.json();
      return data.games || [];
    } catch (error) {
      console.error('Error fetching Roblox games:', error);
      return [];
    }
  };

  // Deduplicate similar projects
  const deduplicateProjects = (projects: Project[]): Project[] => {
    const seen = new Set<string>();
    const deduplicated: Project[] = [];

    projects.forEach(project => {
      const normalizedName = project.name.toLowerCase()
        .replace(/[-_\s]/g, '')
        .replace(/\d+$/, '') // Remove trailing numbers
        .replace(/(copy|clone|fork|v2|new|updated)$/i, ''); // Remove common duplicate indicators

      if (!seen.has(normalizedName)) {
        seen.add(normalizedName);
        deduplicated.push(project);
      }
    });

    return deduplicated;
  };

  const handleCardHover = (e: React.MouseEvent, projectId: string) => {
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
      'LuaU': 'bg-purple-900', // Signature LuaU dark purple
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

  const getProjectLanguage = (project: Project): string => {
    if (project.type === 'roblox') {
      return 'LuaU';
    }
    return (project as GitHubRepo).language || 'Unknown';
  };

  const getProjectUrl = (project: Project): string => {
    if (project.type === 'roblox') {
      const robloxGame = project as RobloxGame;
      return robloxGame.rootPlaceId 
        ? `https://www.roblox.com/games/${robloxGame.rootPlaceId}`
        : `https://www.roblox.com/users/${robloxGame.universeId}`;
    }
    return (project as GitHubRepo).html_url;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects from GitHub and Roblox...</p>
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
                  {totalProjectCount} total projects across GitHub and Roblox
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <a
                href="https://github.com/savagelylol"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
                data-testid="link-github-profile"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.roblox.com/users/1462440075"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
                data-testid="link-roblox-profile-1"
              >
                <Play className="h-5 w-5" />
                <span>Roblox</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={`${project.type}-${project.id}`}
              className="tilt-card bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all group"
              onMouseMove={(e) => handleCardHover(e, `${project.type}-${project.id}`)}
              onMouseLeave={handleCardLeave}
              data-testid={`card-project-${project.name}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-mono font-semibold truncate flex-1" data-testid={`text-project-title-${project.name}`}>
                    {project.name}
                  </h3>
                  <span 
                    className={`px-2 py-1 ${getLanguageColor(getProjectLanguage(project))} text-white rounded text-xs ml-2`} 
                    data-testid={`badge-language-${project.name}`}
                  >
                    {getProjectLanguage(project)}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm line-clamp-3" data-testid={`text-project-description-${project.name}`}>
                  {project.description || 'No description available'}
                </p>

                {/* Project Type Specific Data */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  {project.type === 'github' ? (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1" data-testid={`stat-stars-${project.name}`}>
                        <Star className="h-4 w-4" />
                        <span>{project.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1" data-testid={`stat-forks-${project.name}`}>
                        <GitFork className="h-4 w-4" />
                        <span>{project.forks_count}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1" data-testid={`stat-visits-${project.name}`}>
                        <Eye className="h-4 w-4" />
                        <span>{formatNumber(project.placeVisits)}</span>
                      </div>
                      <div className="flex items-center space-x-1" data-testid={`stat-players-${project.name}`}>
                        <Users className="h-4 w-4" />
                        <span>{project.maxPlayers}</span>
                      </div>
                      <div className="flex items-center space-x-1" data-testid={`stat-favorites-${project.name}`}>
                        <Star className="h-4 w-4" />
                        <span>{formatNumber(project.favoritedCount)}</span>
                      </div>
                    </div>
                  )}
                  <span className="text-xs" data-testid={`text-updated-${project.name}`}>
                    {project.type === 'github' 
                      ? `Updated ${new Date(project.updated_at).toLocaleDateString()}`
                      : `Created ${new Date(project.created).toLocaleDateString()}`
                    }
                  </span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={getProjectUrl(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full py-2 bg-primary text-primary-foreground rounded hover:scale-105 transition-all" data-testid={`button-view-${project.name}`}>
                      {project.type === 'github' ? (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Code
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Play Game
                        </>
                      )}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
}