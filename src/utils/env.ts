
/**
 * Environment and capability detection utilities
 */

// 添加API_BASE_URL常量
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

// Add type declaration for navigator.deviceMemory
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

// Detect if we're running in production
export const isProd = import.meta.env.PROD;

// Detect if we're running in development
export const isDev = import.meta.env.DEV;

// Detect the browser environment
export const isBrowser = typeof window !== 'undefined';

// Detect mobile/touch device
export const isTouchDevice = isBrowser && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// Detect if reduced motion is preferred
export const prefersReducedMotion = isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Detect if the device has a high DPI display
export const isHighDPI = isBrowser && window.devicePixelRatio >= 2;

// Detect if the device is likely a mobile device through user agent
export const isMobileUserAgent = isBrowser && 
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Detect iPad specifically (since it reports as desktop in newer iOS)
export const isIPad = isBrowser && 
  /iPad|Macintosh/i.test(navigator.userAgent) && 
  navigator.maxTouchPoints > 1;

// Detect browser support for HTTP/2
export const supportsHTTP2 = isBrowser && 'connection' in navigator && 
  (navigator as any).connection && (navigator as any).connection.effectiveType;

// Determine if we can use advanced effects
export const canUseAdvancedEffects = isBrowser && 
  !prefersReducedMotion && 
  !isMobileUserAgent &&
  window.navigator.hardwareConcurrency > 4;

// Helper for conditionally enabling features
export function feature<T>(options: {
  high: T;
  medium: T;
  low: T;
}): T {
  if (!isBrowser) return options.medium;
  
  const nav = navigator as NavigatorWithMemory;
  
  // Use low settings for low-end devices
  if (prefersReducedMotion || 
      (isMobileUserAgent && nav.deviceMemory && nav.deviceMemory < 4) ||
      (isMobileUserAgent && window.navigator.hardwareConcurrency < 4)) {
    return options.low;
  }
  
  // Use medium settings for mid-range devices
  if (isMobileUserAgent || isIPad) {
    return options.medium;
  }
  
  // Use high settings for desktop and high-end devices
  return options.high;
}
