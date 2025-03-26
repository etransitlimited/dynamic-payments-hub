
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Add type declaration for navigator.deviceMemory
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

export type PerformanceTier = 'high' | 'medium' | 'low';

export function usePerformance() {
  const isMobile = useIsMobile();
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>('high');
  
  useEffect(() => {
    // Check device performance capabilities
    const checkPerformance = () => {
      // Start with mobile tier
      let tier: PerformanceTier = isMobile ? 'medium' : 'high';
      
      // Check for low memory conditions (using heuristics)
      const nav = navigator as NavigatorWithMemory;
      if (
        nav.deviceMemory && nav.deviceMemory < 4 || // Less than 4GB RAM
        window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4 // Less than 4 cores
      ) {
        tier = 'low';
      }
      
      // Check for low-end devices through user agent
      const userAgent = navigator.userAgent.toLowerCase();
      if (
        /android 4/.test(userAgent) || // Old Android
        /iphone os [789]_/.test(userAgent) // Older iPhones
      ) {
        tier = 'low';
      }
      
      setPerformanceTier(tier);
    };
    
    checkPerformance();
    
    // Update tier on resize (in case of device rotation which can impact performance)
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, [isMobile]);
  
  // Return current performance tier and related settings
  return {
    performanceTier,
    // Animation particle counts based on performance tier
    particleCount: performanceTier === 'high' ? 100 : performanceTier === 'medium' ? 60 : 30,
    // Animation frame rate based on performance tier
    frameRate: performanceTier === 'high' ? 60 : performanceTier === 'medium' ? 30 : 20,
    // Whether to use certain effects
    useGlowEffects: performanceTier !== 'low',
    useParallaxEffects: performanceTier === 'high',
    // Limits for complex animations
    maxAnimatedElements: performanceTier === 'high' ? 50 : performanceTier === 'medium' ? 20 : 10
  };
}
