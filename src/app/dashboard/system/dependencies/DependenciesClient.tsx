// src/app/dashboard/system/dependencies/DependenciesClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertTriangle, CheckCircle, Package, Boxes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { currentVersions } from '@/config/CurrentVersions';
import { checkDependencies } from '@/app/actions/checkUpdates';

interface Dependency {
  name: string;
  currentVersion: string;
  latestVersion: string;
  needsUpdate: boolean;
  type: 'production' | 'development' | 'unknown';
  error?: string;
}

interface DependencyResponse {
  name: string;
  latestVersion: string;
  type: 'production' | 'development' | 'unknown';
  error?: string;
}

export default function DependenciesClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [error, setError] = useState<string | null>(null);

  const checkVersions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await checkDependencies();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to check dependencies');
      }
      
      const updatedDeps: Dependency[] = result.data.map((dep: DependencyResponse) => ({
        name: dep.name,
        currentVersion: currentVersions[dep.name] || 'unknown',
        latestVersion: dep.latestVersion,
        needsUpdate: currentVersions[dep.name] !== dep.latestVersion,
        type: dep.type,
        error: dep.error
      }));

      setDependencies(updatedDeps);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkVersions();
  }, []);

  const productionDeps = dependencies.filter(dep => dep.type === 'production');
  const developmentDeps = dependencies.filter(dep => dep.type === 'development');
  const totalOutdated = dependencies.filter(dep => dep.needsUpdate).length;

  const DependencyCard = ({ dep }: { dep: Dependency }) => {
    const getVersionDiff = () => {
      if (!dep.needsUpdate || dep.error) return null;
      const current = dep.currentVersion.split('.');
      const latest = dep.latestVersion.split('.');
      
      if (current[0] !== latest[0]) return 'Major Update';
      if (current[1] !== latest[1]) return 'Minor Update';
      return 'Patch Update';
    };
  
    const updateType = getVersionDiff();
  
    return (
      <div className="p-4 bg-card border rounded-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground">{dep.name}</span>
              {updateType && (
                <span className={`text-xs px-2 py-1 rounded-full 
                  ${updateType === 'Major Update' ? 'bg-red-100 text-red-700' : 
                    updateType === 'Minor Update' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-blue-100 text-blue-700'}`}>
                  {updateType}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="text-foreground/60">Current:</span>
                <code className="px-1.5 py-0.5 bg-muted rounded text-foreground/70">
                  {dep.currentVersion}
                </code>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-foreground/60">Latest:</span>
                <code className="px-1.5 py-0.5 bg-muted rounded text-foreground/70">
                  {dep.latestVersion}
                </code>
              </div>
            </div>
          </div>
  
          <div className="flex items-center gap-2">
            {dep.error ? (
              <span className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1.5 rounded-md font-medium">
                <AlertTriangle className="h-4 w-4" />
                Error checking
              </span>
            ) : dep.needsUpdate ? (
              <span className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-md font-medium">
                <AlertTriangle className="h-4 w-4" />
                Update Available
              </span>
            ) : (
              <span className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-md font-medium">
                <CheckCircle className="h-4 w-4" />
                Up to date
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex-1 flex-col p-4 space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dependencies</h2>
          <p className="text-muted-foreground">
            Monitor and manage your project dependencies
          </p>
        </div>
        <Button 
          onClick={checkVersions}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Check Updates
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex flex-col gap-1">
                <span>Total Dependencies</span>
                <span className="text-2xl font-bold">{dependencies.length}</span>
              </div>
            </CardTitle>
            <div className="bg-blue-50 p-3 rounded-full">
              <Package className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Overall packages in your project
            </p>
          </CardContent>
        </Card>
      
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex flex-col gap-1">
                <span>Production Deps</span>
                <span className="text-2xl font-bold">{productionDeps.length}</span>
              </div>
            </CardTitle>
            <div className="bg-green-50 p-3 rounded-full">
              <Boxes className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Required for production build
            </p>
          </CardContent>
        </Card>
      
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex flex-col gap-1">
                <span>Dev Dependencies</span>
                <span className="text-2xl font-bold">{developmentDeps.length}</span>
              </div>
            </CardTitle>
            <div className="bg-purple-50 p-3 rounded-full">
              <Package className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Used during development
            </p>
          </CardContent>
        </Card>
      
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex flex-col gap-1">
                <span>Needs Update</span>
                <span className="text-2xl font-bold">{totalOutdated}</span>
              </div>
            </CardTitle>
            <div className="bg-yellow-50 p-3 rounded-full">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Packages requiring updates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dependencies Lists */}
      {error ? (
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="p-4 bg-red-50 text-red-600 rounded-md flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {error}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:h-[calc(100vh-24rem)]">
            <CardHeader>
              <CardTitle>Production Dependencies</CardTitle>
              <CardDescription>
                Dependencies required for production environment
              </CardDescription>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-32rem)]">
              <CardContent className="space-y-4 pr-6">
                {productionDeps.map((dep) => (
                  <DependencyCard key={dep.name} dep={dep} />
                ))}
                {productionDeps.length === 0 && !isLoading && (
                  <div className="text-center text-muted-foreground py-8">
                    No production dependencies found
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>

          <Card className="lg:h-[calc(100vh-24rem)]">
            <CardHeader>
              <CardTitle>Development Dependencies</CardTitle>
              <CardDescription>
                Dependencies required for development environment
              </CardDescription>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-32rem)]">
              <CardContent className="space-y-4 pr-6">
                {developmentDeps.map((dep) => (
                  <DependencyCard key={dep.name} dep={dep} />
                ))}
                {developmentDeps.length === 0 && !isLoading && (
                  <div className="text-center text-muted-foreground py-8">
                    No development dependencies found
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      )}
    </div>
  );
}