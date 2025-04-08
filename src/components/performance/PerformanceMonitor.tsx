
import React, { useEffect, useRef } from 'react';

interface PerformanceMonitorProps {
  enabled?: boolean;
  children: React.ReactNode;
}

/**
 * Component that monitors performance metrics for the application
 * Helps identify re-renders, slow operations, and other performance issues
 */
const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  enabled = process.env.NODE_ENV === 'development', 
  children 
}) => {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());
  const startTimeRef = useRef(performance.now());
  
  useEffect(() => {
    if (!enabled) return;
    
    const renderTime = performance.now();
    const timeSinceLastRender = renderTime - lastRenderTimeRef.current;
    const timeSinceStart = renderTime - startTimeRef.current;
    
    renderCountRef.current++;
    
    if (renderCountRef.current > 1) {
      console.log(
        `%c[Performance] Render #${renderCountRef.current}`,
        'color: #8B5CF6; font-weight: bold;',
        `\nTime since last render: ${timeSinceLastRender.toFixed(2)}ms`,
        `\nTime since component mounted: ${timeSinceStart.toFixed(2)}ms`
      );
      
      // Log warning for potentially problematic render times
      if (timeSinceLastRender < 100) {
        console.warn(
          `%c[Performance Warning] Rapid re-render detected (${timeSinceLastRender.toFixed(2)}ms)`,
          'color: #FBBF24; font-weight: bold;',
          '\nMultiple renders in quick succession may indicate a performance issue.'
        );
      }
    }
    
    lastRenderTimeRef.current = renderTime;
    
    // Track long tasks using PerformanceObserver
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.warn(
          `%c[Performance Warning] Long task detected: ${entry.duration.toFixed(2)}ms`,
          'color: #EF4444; font-weight: bold;',
          entry
        );
      });
    });
    
    try {
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task observation may not be supported in all browsers
      console.log('Long task observation not supported in this browser');
    }
    
    return () => {
      observer.disconnect();
    };
    
  }, [enabled]);
  
  // Simply return children since this is just a monitoring component
  return <>{children}</>;
};

export default PerformanceMonitor;
