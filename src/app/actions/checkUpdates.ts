'use server'
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

// Define types for better type safety
type DependencyType = 'production' | 'development';
type Platform = 'netlify' | 'vercel';

interface PackageInfo {
  name: string;
  type: DependencyType;
}

interface DependencyResult {
  name: string;
  latestVersion: string;
  type: DependencyType;
  error?: string;
  platform: Platform;
}

const productionDependencies = [
  'next',
  'react',
  // ... rest of production dependencies
] as const;

const devDependencies = [
  'tailwindcss',
  'typescript',
  // ... rest of dev dependencies
] as const;

// Add environment configuration
const CONFIG = {
  CACHE_DURATION: 3600,
  REGISTRY_URL: 'https://registry.npmjs.org',
  REVALIDATION_PATH: '/dashboard/dependencies'
} as const;

const packagesToCheck: PackageInfo[] = [
  ...productionDependencies.map(name => ({ name, type: 'production' as const })),
  ...devDependencies.map(name => ({ name, type: 'development' as const }))
];

// Improve error type checking
const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

// Separate platform detection
const detectPlatform = (userAgent: string): Platform => {
  return userAgent.includes('Netlify') ? 'netlify' : 'vercel';
};

async function fetchPackageInfo(packageName: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // Add timeout

  try {
    const response = await fetch(`${CONFIG.REGISTRY_URL}/${packageName}/latest`, {
      headers: {
        'Cache-Control': `public, max-age=${CONFIG.CACHE_DURATION}`,
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: CONFIG.CACHE_DURATION,
        tags: [`pkg-${packageName}`],
      },
      signal: controller.signal
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${packageName}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${packageName}:`, error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function checkDependencies() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const platform = detectPlatform(userAgent);

  try {
    const results = await Promise.allSettled(
      packagesToCheck.map(async (pkg) => {
        try {
          const data = await fetchPackageInfo(pkg.name);
          return {
            name: pkg.name,
            latestVersion: data.version,
            type: pkg.type,
            platform
          } satisfies DependencyResult;
        } catch (error) {
          return {
            name: pkg.name,
            latestVersion: 'unknown',
            type: pkg.type,
            error: isErrorWithMessage(error) ? error.message : 'Unknown error',
            platform
          } satisfies DependencyResult;
        }
      })
    );

    const processedResults = results.map(result => {
      if (result.status === 'fulfilled') {
        return result.value;
      }
      return {
        name: 'unknown',
        latestVersion: 'error',
        type: 'unknown' as const,
        error: isErrorWithMessage(result.reason) ? result.reason.message : 'Unknown error',
        platform
      };
    });

    if (platform === 'vercel') {
      revalidatePath(CONFIG.REVALIDATION_PATH);
    }

    return { 
      success: true, 
      data: processedResults,
      platform
    };
  } catch (error) {
    return { 
      success: false, 
      error: isErrorWithMessage(error) ? error.message : 'Failed to check dependencies',
      platform
    };
  }
}