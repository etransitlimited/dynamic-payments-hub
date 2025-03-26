
import { useState, useEffect, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { isBrowser, prefersReducedMotion } from '@/utils/env';

// Add type declaration for navigator.deviceMemory
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
}

export type PerformanceTier = 'high' | 'medium' | 'low';

export function usePerformance() {
  const isMobile = useIsMobile();
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>(isMobile ? 'medium' : 'high');
  const [batteryStatus, setBatteryStatus] = useState<{ charging: boolean; level: number } | null>(null);
  const [connectionType, setConnectionType] = useState<string | null>(null);
  
  // Memory check
  useEffect(() => {
    if (!isBrowser) return;
    
    // Check device performance capabilities
    const checkPerformance = () => {
      // Start with mobile tier
      let tier: PerformanceTier = isMobile ? 'medium' : 'high';
      
      // Get navigator with memory properties
      const nav = navigator as NavigatorWithMemory;
      
      // Check if user prefers reduced motion
      if (prefersReducedMotion) {
        tier = 'low';
      }
      
      // Check for low memory conditions
      else if (
        nav.deviceMemory && nav.deviceMemory < 4 || // Less than 4GB RAM
        window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4 // Less than 4 cores
      ) {
        tier = 'low';
      }
      
      // Check connection speed
      else if (nav.connection && 
              (nav.connection.effectiveType === '2g' || 
               nav.connection.effectiveType === 'slow-2g' ||
               nav.connection.saveData)) {
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
      
      // Check connection type if available
      if (nav.connection && nav.connection.effectiveType) {
        setConnectionType(nav.connection.effectiveType);
      }
    };
    
    // Check battery status if available
    const checkBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          setBatteryStatus({
            charging: battery.charging,
            level: battery.level
          });
          
          // Listen for battery changes
          battery.addEventListener('chargingchange', () => {
            setBatteryStatus(prev => prev ? { ...prev, charging: battery.charging } : null);
          });
          
          battery.addEventListener('levelchange', () => {
            setBatteryStatus(prev => prev ? { ...prev, level: battery.level } : null);
          });
        } catch (e) {
          console.error("Battery status not available:", e);
        }
      }
    };
    
    checkPerformance();
    checkBattery();
    
    // Listen for connection changes
    const nav = navigator as NavigatorWithMemory;
    if (nav.connection) {
      const connManager = nav.connection;
      const updateConnectionType = () => {
        if (connManager.effectiveType) {
          setConnectionType(connManager.effectiveType);
          checkPerformance(); // Recheck performance when connection changes
        }
      };
      
      // @ts-ignore - TypeScript doesn't know about connection events
      connManager.addEventListener('change', updateConnectionType);
      return () => {
        // @ts-ignore
        connManager.removeEventListener('change', updateConnectionType);
      };
    }
    
    // Update tier on resize (in case of device rotation)
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, [isMobile]);
  
  // Adapt settings based on battery and connection
  const adaptiveTier = useMemo(() => {
    // If battery is low, drop a tier to save power
    if (batteryStatus && !batteryStatus.charging && batteryStatus.level < 0.2) {
      return performanceTier === 'high' ? 'medium' 
            : performanceTier === 'medium' ? 'low' 
            : 'low';
    }
    
    // If on slow connection, drop to low tier
    if (connectionType === '2g' || connectionType === 'slow-2g') {
      return 'low';
    }
    
    return performanceTier;
  }, [performanceTier, batteryStatus, connectionType]);
  
  // Return current performance tier and related settings
  return {
    performanceTier: adaptiveTier,
    // Animation particle counts based on adaptiveTier
    particleCount: adaptiveTier === 'high' ? 100 : adaptiveTier === 'medium' ? 50 : 20,
    // Animation frame rate based on adaptiveTier
    frameRate: adaptiveTier === 'high' ? 60 : adaptiveTier === 'medium' ? 30 : 15,
    // Whether to use certain effects
    useGlowEffects: adaptiveTier !== 'low',
    useParallaxEffects: adaptiveTier === 'high',
    useShadowEffects: adaptiveTier !== 'low',
    // Limits for complex animations
    maxAnimatedElements: adaptiveTier === 'high' ? 50 : adaptiveTier === 'medium' ? 15 : 5,
    // Connection info for debugging
    connectionType,
    // Battery status
    batteryStatus,
    // Flag for low power mode
    isLowPowerMode: batteryStatus && !batteryStatus.charging && batteryStatus.level < 0.2
  };
}
