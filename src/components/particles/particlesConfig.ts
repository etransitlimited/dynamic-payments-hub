
import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";

export const useParticlesConfig = () => {
  const isMobile = useIsMobile();
  
  // Optimize particle configuration based on device
  return useMemo(() => {
    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: isMobile ? 30 : 60, // Lower FPS limit for better performance
      particles: {
        color: {
          value: "#3b83f6",
        },
        links: {
          color: "#0ea5e9",
          distance: 150,
          enable: true,
          opacity: isMobile ? 0.2 : 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.3 : 0.6, // Reduced speed for better performance
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: {
            default: "out" as const,
          },
          attract: {
            enable: false, // Disabled for better performance
            rotateX: 600,
            rotateY: 1200,
          },
        },
        number: {
          density: {
            enable: true,
            area: isMobile ? 1500 : 1200, // Increased area = fewer particles
          },
          value: isMobile ? 25 : 50, // Reduced number of particles
        },
        opacity: {
          value: isMobile ? 0.3 : 0.4,
          animation: {
            enable: !isMobile,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false
          }
        },
        shape: {
          type: ["circle"], // Only circles for better performance
        },
        size: {
          value: { min: isMobile ? 0.5 : 1, max: isMobile ? 2 : 3 },
          animation: {
            enable: false, // Disabled for better performance
            speed: 2,
            minimumValue: 0.5,
            sync: false
          }
        },
      },
      detectRetina: false, // Disabled for better performance
    };
  }, [isMobile]);
};
