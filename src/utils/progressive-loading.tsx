
import React, { lazy, Suspense, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { usePerformance } from '@/hooks/use-performance';

// Create a default loading component
const DefaultLoading = ({ height = '24', className = '' }: { height?: string, className?: string }) => (
  <div className={`w-full ${className}`}>
    <Skeleton className={`w-full h-${height} bg-blue-900/10 rounded-lg`} />
  </div>
);

// Create a function that progressively imports components based on performance tier
export function progressiveLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  loadingFallback?: React.ReactNode,
  options?: {
    minPerformanceTier?: 'low' | 'medium' | 'high';
    ssr?: boolean;
    preload?: boolean;
  }
) {
  // Create a lazy-loaded component
  const LazyComponent = lazy(importFunc);
  
  // Return a wrapper component that handles the progressive loading
  return (props: React.ComponentProps<T>) => {
    const { performanceTier } = usePerformance();
    const { minPerformanceTier = 'low' } = options || {};
    
    // Preload the component if requested
    React.useEffect(() => {
      if (options?.preload) {
        importFunc();
      }
    }, []);
    
    // Don't render components that require higher performance than available
    const tierValues = { 'low': 0, 'medium': 1, 'high': 2 };
    if (tierValues[performanceTier] < tierValues[minPerformanceTier]) {
      return null;
    }
    
    return (
      <Suspense fallback={loadingFallback || <DefaultLoading />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Create component-specific loaders for better UX
export const createSectionLoader = (id?: string, height = '36') => (
  <div className="container mx-auto px-4 py-4" id={id}>
    <DefaultLoading height={height} />
  </div>
);

export const createCardLoader = () => (
  <Skeleton className="h-60 w-full max-w-md rounded-xl bg-blue-900/20" />
);

export const createHeaderLoader = () => (
  <div className="w-full py-4 px-6">
    <div className="flex justify-between items-center">
      <Skeleton className="h-10 w-32 bg-blue-900/10 rounded-lg" />
      <div className="flex space-x-4">
        <Skeleton className="h-8 w-20 bg-blue-900/10 rounded-lg" />
        <Skeleton className="h-8 w-20 bg-blue-900/10 rounded-lg" />
      </div>
    </div>
  </div>
);
