
import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground = () => {
  const isMobile = useIsMobile();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Optimize particle configuration based on device
  const particlesConfig = useMemo(() => {
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
          direction: "none" as const, // Fix: Use a type assertion to specify the exact type
          random: true,
          straight: false,
          outModes: {
            default: "out" as const, // Fix: Add type assertion for outModes
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

  // Optimize background image opacity and blur for mobile performance
  const backgroundImageStyle = useMemo(() => {
    return {
      backgroundImage: "url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop')",
      filter: isMobile ? "blur(1px)" : "blur(2px)"
    };
  }, [isMobile]);

  // Optimize circuit pattern for mobile
  const circuitPatternStyle = useMemo(() => {
    return {
      backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')",
      opacity: isMobile ? 0.05 : 0.1
    };
  }, [isMobile]);

  return (
    <>
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#061428]/98 to-[#071b34]/98 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0"
          style={backgroundImageStyle}
        ></div>
        
        {/* Digital circuit pattern overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-luminosity z-5"
          style={circuitPatternStyle}
        ></div>
      </div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 -z-10"
      />
    </>
  );
};

export default ParticlesBackground;
