
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { isBrowser, prefersReducedMotion } from '@/utils/env';

// Add type declaration for navigator.deviceMemory
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
    rtt?: number;
    downlink?: number;
  };
}

export type PerformanceTier = 'high' | 'medium' | 'low';

export function usePerformance() {
  const isMobile = useIsMobile();
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>(isMobile ? 'medium' : 'high');
  const [batteryStatus, setBatteryStatus] = useState<{ charging: boolean; level: number } | null>(null);
  const [connectionType, setConnectionType] = useState<string | null>(null);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'fair' | 'poor'>('good');
  
  // Check device performance capabilities
  const checkPerformance = useCallback(() => {
    if (!isBrowser) return;
    
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
    else if (nav.connection) {
      const conn = nav.connection;
      
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.saveData) {
        tier = 'low';
        setConnectionQuality('poor');
      } else if (conn.effectiveType === '3g') {
        // If on 3g, consider as medium performance
        tier = 'medium';
        setConnectionQuality('fair');
      } else {
        setConnectionQuality('good');
      }
      
      // More detailed connection quality assessment
      if (conn.rtt && conn.downlink) {
        if (conn.rtt > 500 || conn.downlink < 1) {
          setConnectionQuality('poor');
          tier = 'low';
        } else if (conn.rtt > 100 || conn.downlink < 5) {
          setConnectionQuality('fair');
          if (tier === 'high') tier = 'medium';
        }
      }
      
      // Set connection type if available
      if (conn.effectiveType) {
        setConnectionType(conn.effectiveType);
      }
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
  }, [isMobile]);
  
  // Check battery status
  const checkBattery = useCallback(async () => {
    if (!isBrowser || !('getBattery' in navigator)) return;
    
    try {
      const battery = await (navigator as any).getBattery();
      
      const updateBatteryStatus = () => {
        setBatteryStatus({
          charging: battery.charging,
          level: battery.level
        });
      };
      
      // Initial status
      updateBatteryStatus();
      
      // Listen for battery changes
      battery.addEventListener('chargingchange', updateBatteryStatus);
      battery.addEventListener('levelchange', updateBatteryStatus);
      
      return () => {
        battery.removeEventListener('chargingchange', updateBatteryStatus);
        battery.removeEventListener('levelchange', updateBatteryStatus);
      };
    } catch (e) {
      console.error("Battery status not available:", e);
    }
  }, []);
  
  // Initialize and set up listeners
  useEffect(() => {
    if (!isBrowser) return;
    
    // Initial checks
    checkPerformance();
    checkBattery();
    
    // Set up connection change listener
    const nav = navigator as NavigatorWithMemory;
    if (nav.connection) {
      const connManager = nav.connection;
      
      const updateConnectionInfo = () => {
        if (connManager.effectiveType) {
          setConnectionType(connManager.effectiveType);
          checkPerformance(); // Recheck performance when connection changes
        }
      };
      
      // @ts-ignore - TypeScript doesn't know about connection events
      connManager.addEventListener('change', updateConnectionInfo);
      
      // Clean up
      return () => {
        // @ts-ignore
        connManager.removeEventListener('change', updateConnectionInfo);
      };
    }
    
    // Update on resize (for device rotation or window size changes)
    const handleResize = () => {
      checkPerformance();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkPerformance, checkBattery, isMobile]);
  
  // Adapt settings based on battery and connection
  const adaptiveTier = useMemo(() => {
    // If battery is low and not charging, drop a tier to save power
    if (batteryStatus && !batteryStatus.charging && batteryStatus.level < 0.2) {
      return performanceTier === 'high' ? 'medium' 
            : performanceTier === 'medium' ? 'low' 
            : 'low';
    }
    
    // If on slow connection, drop to low tier
    if (connectionType === '2g' || connectionType === 'slow-2g' || connectionQuality === 'poor') {
      return 'low';
    }
    
    return performanceTier;
  }, [performanceTier, batteryStatus, connectionType, connectionQuality]);
  
  // Return current performance tier and related settings
  return {
    // Core performance information
    performanceTier: adaptiveTier,
    actualPerformanceTier: performanceTier, // Before battery/connection adjustments
    
    // Animation settings
    particleCount: adaptiveTier === 'high' ? 100 : adaptiveTier === 'medium' ? 50 : 20,
    frameRate: adaptiveTier === 'high' ? 60 : adaptiveTier === 'medium' ? 30 : 15,
    
    // Visual effect flags
    useGlowEffects: adaptiveTier !== 'low',
    useParallaxEffects: adaptiveTier === 'high',
    useShadowEffects: adaptiveTier !== 'low',
    
    // Animation limits
    maxAnimatedElements: adaptiveTier === 'high' ? 50 : adaptiveTier === 'medium' ? 15 : 5,
    
    // Image quality
    imageQuality: adaptiveTier === 'high' ? 'original' : adaptiveTier === 'medium' ? 'medium' : 'low',
    
    // Connection information
    connectionType,
    connectionQuality,
    
    // Battery status
    batteryStatus,
    isLowPowerMode: batteryStatus && !batteryStatus.charging && batteryStatus.level < 0.2,
    
    // Helper methods
    isPoorConnection: connectionQuality === 'poor' || connectionType === '2g' || connectionType === 'slow-2g',
    shouldReduceAnimations: adaptiveTier === 'low' || prefersReducedMotion,
  };
}
