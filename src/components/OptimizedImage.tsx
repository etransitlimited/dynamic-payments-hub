
import React, { useState, useEffect, useMemo } from 'react';
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
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { performanceTier } = usePerformance();
  
  // If we're on low performance devices, possibly downgrade the image quality
  const optimizedSrc = useMemo(() => {
    // If it's a local image and we can parse size parameters, downsize for low-end devices
    if (performanceTier === 'low' && src.includes('.')) {
      // If it's likely a URL with size parameters
      if (src.includes('?')) {
        const base = src.split('?')[0];
        const params = new URLSearchParams(src.split('?')[1]);
        
        // If it has width/quality params, reduce them for low-performance
        if (params.has('w')) {
          const originalWidth = parseInt(params.get('w') || '0');
          params.set('w', Math.round(originalWidth * 0.75).toString());
        }
        
        if (params.has('q')) {
          params.set('q', '60'); // Lower quality
        }
        
        return `${base}?${params.toString()}`;
      }
    }
    return src;
  }, [src, performanceTier]);
  
  useEffect(() => {
    // Reset state when src changes
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
  }, [optimizedSrc, priority, onLoad]);
  
  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  
  // Handle image error
  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setIsError(true);
  };
  
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
      />
    </div>
  );
};

export default OptimizedImage;
