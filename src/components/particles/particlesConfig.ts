
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
      fpsLimit: isMobile ? 30 : 120,
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
          speed: isMobile ? 0.4 : 0.8,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: {
            default: "out" as const,
          },
          attract: {
            enable: !isMobile,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        number: {
          density: {
            enable: true,
            area: isMobile ? 1200 : 900,
          },
          value: isMobile ? 30 : 70,
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
          type: isMobile ? ["circle"] : ["circle", "triangle", "polygon"],
        },
        size: {
          value: { min: isMobile ? 0.5 : 1, max: isMobile ? 2 : 3 },
          animation: {
            enable: !isMobile,
            speed: 2,
            minimumValue: 0.5,
            sync: false
          }
        },
      },
      detectRetina: true,
    };
  }, [isMobile]);
};
