
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { usePerformance } from '@/hooks/use-performance';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: React.ReactNode;
  onLoad?: () => void;
  optimizationLevel?: 'none' | 'low' | 'medium' | 'high';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder,
  onLoad,
  optimizationLevel,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { performanceTier } = usePerformance();
  
  // Determine optimization level based on props or device performance
  const effectiveOptimizationLevel = useMemo(() => {
    if (optimizationLevel) return optimizationLevel;
    return performanceTier === 'low' ? 'high' : 
           performanceTier === 'medium' ? 'medium' : 'low';
  }, [optimizationLevel, performanceTier]);
  
  // If we're on low performance devices, possibly downgrade the image quality
  const optimizedSrc = useMemo(() => {
    // If optimization is disabled, return original source
    if (effectiveOptimizationLevel === 'none') return src;
    
    // If it's a local image and we can parse size parameters, downsize for low-end devices
    if (src.includes('.')) {
      // Apply different optimization levels
      const qualityMap = {
        low: '85',
        medium: '75',
        high: '60'
      };
      
      // If it's likely a URL with size parameters
      if (src.includes('?')) {
        const base = src.split('?')[0];
        const params = new URLSearchParams(src.split('?')[1]);
        
        // If it has width/quality params, adjust them based on performance level
        if (params.has('w')) {
          const originalWidth = parseInt(params.get('w') || '0');
          const scaleFactor = effectiveOptimizationLevel === 'high' ? 0.75 : 
                             effectiveOptimizationLevel === 'medium' ? 0.85 : 0.95;
          params.set('w', Math.round(originalWidth * scaleFactor).toString());
        }
        
        if (params.has('q')) {
          params.set('q', qualityMap[effectiveOptimizationLevel as keyof typeof qualityMap]);
        } else {
          params.append('q', qualityMap[effectiveOptimizationLevel as keyof typeof qualityMap]);
        }
        
        return `${base}?${params.toString()}`;
      }
      
      // If it's a direct image URL with no parameters but needs optimization
      // We could add query parameters to indicate to a server-side image processor
      if (effectiveOptimizationLevel !== 'low' && !src.includes('?')) {
        return `${src}?q=${qualityMap[effectiveOptimizationLevel as keyof typeof qualityMap]}`;
      }
    }
    return src;
  }, [src, effectiveOptimizationLevel]);
  
  // Reset state when src changes and preload priority images
  useEffect(() => {
    setIsLoaded(false);
    setIsError(false);
    
    // For priority images, preload them
    if (priority) {
      const img = new Image();
      img.src = optimizedSrc;
      img.onload = () => {
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => setIsError(true);
    }
    
    return () => {
      // Clean up any pending operations if component unmounts
    };
  }, [optimizedSrc, priority, onLoad]);
  
  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);
  
  // Handle image error
  const handleError = useCallback(() => {
    console.error(`Failed to load image: ${src}`);
    setIsError(true);
  }, [src]);
  
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {(!isLoaded || isError) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {placeholder || (
            <Skeleton 
              className={`w-full h-full ${isError ? 'bg-red-900/10' : 'bg-blue-900/10'}`} 
            />
          )}
        </div>
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default React.memo(OptimizedImage);
