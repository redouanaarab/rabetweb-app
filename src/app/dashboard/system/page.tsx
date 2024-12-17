import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package2, GitFork, Scale, Calendar, ExternalLink } from 'lucide-react';
import { projectInfo } from '@/config/CurrentVersions';

const ProjectInfoPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl p-8">
        <div className="absolute inset-0 bg-grid-white/10 rounded-3xl" />
        <div className="relative space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">{projectInfo.name}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{projectInfo.description}</p>
            </div>
            <Badge variant="default" className="text-lg px-6 py-2 rounded-full">
              v{projectInfo.version}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {projectInfo.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-4 py-1.5 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Package2, label: 'Version', value: projectInfo.version },
          { 
            icon: GitFork, 
            label: 'Repository', 
            value: projectInfo.repository,
            isLink: true
          },
          { icon: Scale, label: 'License', value: projectInfo.license },
          { icon: Calendar, label: 'Last Update', value: projectInfo.lastUpdate },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1"> {/* Added min-w-0 and flex-1 */}
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  {stat.isLink ? (
                    <a 
                      href={stat.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium truncate block hover:underline flex items-center gap-1"
                    >
                      {stat.value.replace('https://github.com/', '')}
                      <ExternalLink className="h-4 w-4 inline-block flex-shrink-0" />
                    </a>
                  ) : (
                    <p className="font-medium truncate">{stat.value}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Changelog section remains the same */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Changelog</CardTitle>
            <Badge variant="outline" className="px-4">
              Latest Changes
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            {projectInfo.changelog.map((release, index) => (
              <div key={release.version} className="relative">
                {index !== projectInfo.changelog.length - 1 && (
                  <div className="absolute w-px bg-primary/20 h-full left-[19px] top-[40px]" />
                )}
                <div className="flex gap-6">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="default" className="px-4">v{release.version}</Badge>
                      <span className="text-sm text-muted-foreground">{release.date}</span>
                    </div>
                    <ul className="space-y-3">
                      {release.changes.map((change, changeIndex) => (
                        <li 
                          key={changeIndex} 
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-start gap-2"
                        >
                          <span className="block w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5" />
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectInfoPage;