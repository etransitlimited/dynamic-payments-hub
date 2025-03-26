
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
      fpsLimit: isMobile ? 15 : 60, // Further reduced FPS limit for better mobile performance
      particles: {
        color: {
          value: "#3b83f6",
        },
        links: {
          color: "#0ea5e9",
          distance: isMobile ? 80 : 150, // Even shorter distances for mobile
          enable: true,
          opacity: isMobile ? 0.1 : 0.3, // Lower opacity for better performance
          width: isMobile ? 0.5 : 1, // Thinner lines on mobile
        },
        move: {
          enable: true,
          speed: isMobile ? 0.1 : 0.6, // Further reduced speed significantly for mobile
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
            area: isMobile ? 2800 : 1200, // Further increased area = even fewer particles on mobile
          },
          value: isMobile ? 10 : 50, // Further reduced number of particles for mobile
        },
        opacity: {
          value: isMobile ? 0.2 : 0.4,
          animation: {
            enable: !isMobile, // Disabled animations on mobile
            speed: 0.5,
            minimumValue: 0.1,
            sync: false
          }
        },
        shape: {
          type: ["circle"], // Only using circles for better performance
        },
        size: {
          value: { min: isMobile ? 0.5 : 1, max: isMobile ? 1 : 3 }, // Smaller max size on mobile
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
