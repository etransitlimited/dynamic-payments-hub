
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import { useMemo } from "react";

export const useParticlesConfig = () => {
  const isMobile = useIsMobile();
  const { performanceTier, frameRate } = usePerformance();
  
  // Enhanced particle configuration with more dynamic behavior based on performance tier
  return useMemo(() => {
    // Determine configuration based on performance tier
    const getConfigForTier = () => {
      // Low performance tier (mobile or low-end devices)
      if (performanceTier === 'low') {
        return {
          particleCount: 15,
          fpsLimit: 30,
          opacity: 0.3,
          size: { min: 0.5, max: 1.5 },
          enableLinks: false,
          moveSpeed: 0.2,
          enableAnimation: false
        };
      }
      
      // Medium performance tier (mid-range mobile)
      if (performanceTier === 'medium') {
        return {
          particleCount: isMobile ? 25 : 40,
          fpsLimit: 30,
          opacity: 0.4,
          size: { min: 0.8, max: 2 },
          enableLinks: true,
          moveSpeed: 0.4,
          enableAnimation: true
        };
      }
      
      // High performance tier (desktop or high-end mobile)
      return {
        particleCount: isMobile ? 40 : 60,
        fpsLimit: 60,
        opacity: 0.5,
        size: { min: 1, max: 3.5 },
        enableLinks: true,
        moveSpeed: 0.7,
        enableAnimation: true
      };
    };
    
    const config = getConfigForTier();
    
    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: config.fpsLimit,
      particles: {
        color: {
          value: ["#3b83f6", "#0ea5e9", "#60a5fa", "#38bdf8"],
        },
        links: {
          color: "#0ea5e9",
          distance: isMobile ? 120 : 170,
          enable: config.enableLinks,
          opacity: config.enableLinks ? (isMobile ? 0.2 : 0.35) : 0,
          width: isMobile ? 0.8 : 1.2,
        },
        move: {
          enable: true,
          speed: config.moveSpeed,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: {
            default: "bounce" as const,
          },
          attract: {
            enable: config.enableAnimation,
            rotateX: 600,
            rotateY: 1200,
            factor: 0.2,
          },
          trail: {
            enable: config.enableAnimation && !isMobile,
            length: 3,
            fillColor: "#000814",
          }
        },
        number: {
          density: {
            enable: true,
            area: isMobile ? 1800 : 1000,
          },
          value: config.particleCount,
        },
        opacity: {
          value: config.opacity,
          animation: {
            enable: config.enableAnimation,
            speed: 0.6,
            minimumValue: 0.1,
            sync: false
          }
        },
        shape: {
          type: config.enableAnimation ? ["circle", "triangle"] : ["circle"],
        },
        size: {
          value: config.size,
          animation: {
            enable: config.enableAnimation,
            speed: 1.8,
            minimumValue: 0.5,
            sync: false
          }
        },
        twinkle: {
          particles: {
            enable: config.enableAnimation,
            color: "#ffffff",
            frequency: 0.05,
            opacity: 0.8
          }
        }
      },
      interactivity: {
        detectsOn: "canvas" as const,
        events: {
          onHover: {
            enable: config.enableAnimation && !isMobile,
            mode: "grab" as const,
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.5
            }
          }
        }
      },
      detectRetina: true,
      smooth: config.enableAnimation,
    };
  }, [isMobile, performanceTier, frameRate]);
};
