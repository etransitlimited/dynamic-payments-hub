
import React, { lazy, Suspense, ComponentType, useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { usePerformance } from '@/hooks/use-performance';

// Create a default loading component
const DefaultLoading = ({ height = '24', className = '' }: { height?: string, className?: string }) => (
  <div className={`w-full ${className}`}>
    <Skeleton className={`w-full h-${height} bg-blue-900/10 rounded-lg`} />
  </div>
);

// Cache of preloaded components to avoid duplicate loading
const preloadCache = new Map<string, boolean>();

// Options for progressively loaded components
interface ProgressiveLoadOptions {
  minPerformanceTier?: 'low' | 'medium' | 'high';
  ssr?: boolean;
  preload?: boolean;
  delay?: number; // Milliseconds to delay loading (for perceived performance)
  prefetch?: boolean; // Whether to prefetch on hover or visibility
  cacheKey?: string; // Custom key for caching
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
}

// Function to create a component ID for caching
const createComponentId = (importFn: Function, options?: ProgressiveLoadOptions): string => {
  return options?.cacheKey || importFn.toString().slice(0, 100);
};

// Create a function that progressively imports components based on performance tier
export function progressiveLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  loadingFallback?: React.ReactNode,
  options?: ProgressiveLoadOptions
) {
  // Create a component ID for caching purposes
  const componentId = createComponentId(importFunc, options);
  
  // Create a lazy-loaded component with retry capability
  const LazyComponent = lazy(() => {
    // Notify when load starts
    options?.onLoadStart?.();
    
    // Start the import
    return importFunc()
      .then(module => {
        // Mark as preloaded in cache
        preloadCache.set(componentId, true);
        // Notify on successful load
        options?.onLoadComplete?.();
        return module;
      })
      .catch(error => {
        console.error(`Failed to load component: ${error}`);
        // Return a minimal fallback component on error
        return { default: (() => <div className="text-red-500">Failed to load component</div>) as unknown as T };
      });
  });
  
  // Return a wrapper component that handles the progressive loading
  return (props: React.ComponentProps<T>) => {
    const { performanceTier, isPoorConnection } = usePerformance();
    const { 
      minPerformanceTier = 'low',
      delay = 0,
      preload = false 
    } = options || {};
    
    const [shouldRender, setShouldRender] = useState(!delay);
    
    // Handle delayed loading for perceived performance improvement
    useEffect(() => {
      if (delay && !shouldRender) {
        const timer = setTimeout(() => {
          setShouldRender(true);
        }, isPoorConnection ? delay * 2 : delay); // Double delay on poor connections
        
        return () => clearTimeout(timer);
      }
    }, [delay, shouldRender, isPoorConnection]);
    
    // Preload the component if requested
    useEffect(() => {
      if (preload && !preloadCache.has(componentId)) {
        // Only preload if not already cached
        const timer = setTimeout(() => {
          importFunc().then(() => {
            preloadCache.set(componentId, true);
          });
        }, 300); // Small delay to let critical resources load first
        
        return () => clearTimeout(timer);
      }
    }, [preload, componentId]);
    
    // Don't render components that require higher performance than available
    const tierValues = { 'low': 0, 'medium': 1, 'high': 2 };
    if (tierValues[performanceTier] < tierValues[minPerformanceTier as keyof typeof tierValues]) {
      return null;
    }
    
    // Don't render until delay has passed
    if (!shouldRender) {
      return loadingFallback || <DefaultLoading />;
    }
    
    return (
      <Suspense fallback={loadingFallback || <DefaultLoading />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Specialized loaders for different UI elements
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

// Create a component for deferred loading (only when visible in viewport)
export const DeferredLoad: React.FC<{
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  threshold?: number;
}> = ({ children, placeholder, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!containerRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(containerRef);
    
    return () => {
      observer.disconnect();
    };
  }, [containerRef, threshold]);
  
  return (
    <div ref={setContainerRef} className="min-h-[20px]">
      {isVisible ? children : placeholder || <DefaultLoading />}
    </div>
  );
};
