
import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";

export const useParticlesConfig = () => {
  const isMobile = useIsMobile();
  
  // Enhanced particle configuration with more dynamic behavior
  return useMemo(() => {
    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: isMobile ? 30 : 60, // Increased FPS on mobile for smoother animation
      particles: {
        color: {
          value: ["#3b83f6", "#0ea5e9", "#60a5fa", "#38bdf8"], // Multiple colors for variety
        },
        links: {
          color: "#0ea5e9",
          distance: isMobile ? 120 : 170, // Increased distances for better network effect
          enable: true,
          opacity: isMobile ? 0.2 : 0.35, // Increased opacity for better visibility
          width: isMobile ? 0.8 : 1.2, // Slightly thicker lines for better visibility
        },
        move: {
          enable: true,
          speed: isMobile ? 0.3 : 0.7, // Increased speed for more dynamic movement
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: {
            default: "bounce" as const, // Changed to bounce for more contained movement
          },
          attract: {
            enable: true, // Enabled attract for more organic movement
            rotateX: 600,
            rotateY: 1200,
            factor: 0.2, // Gentle attraction
          },
          trail: {
            enable: !isMobile, // Add trails for desktop
            length: 3,
            fillColor: "#000814",
          }
        },
        number: {
          density: {
            enable: true,
            area: isMobile ? 1800 : 1000, // Adjusted density
          },
          value: isMobile ? 25 : 60, // Increased particle count for richer visuals
        },
        opacity: {
          value: isMobile ? 0.4 : 0.5, // Slightly more opaque
          animation: {
            enable: true, // Enabled animations on mobile too
            speed: 0.6,
            minimumValue: 0.1,
            sync: false
          }
        },
        shape: {
          type: ["circle", "triangle"], // Added triangles for visual interest
        },
        size: {
          value: { min: isMobile ? 0.8 : 1, max: isMobile ? 2 : 3.5 }, // Larger particles
          animation: {
            enable: true, // Enabled for mobile too
            speed: 1.8,
            minimumValue: 0.5,
            sync: false
          }
        },
        twinkle: {
          particles: {
            enable: true,
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
            enable: !isMobile, // Disable on mobile for performance
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
      detectRetina: true, // Enable for sharper visuals
      smooth: true, // Enable smooth animations
    };
  }, [isMobile]);
};
