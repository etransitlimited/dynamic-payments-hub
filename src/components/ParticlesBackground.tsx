
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#061428]/98 to-[#071b34]/98 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')",
            filter: "blur(2px)"
          }}
        ></div>
        
        {/* Digital circuit pattern overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-5 mix-blend-luminosity"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2832&auto=format&fit=crop')",
          }}
        ></div>
      </div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#3b83f6",
            },
            links: {
              color: "#0ea5e9",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            number: {
              density: {
                enable: true,
                area: 900,
              },
              value: 70,
            },
            opacity: {
              value: 0.4,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false
              }
            },
            shape: {
              type: ["circle", "triangle", "polygon"],
            },
            size: {
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
                sync: false
              }
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />
    </>
  );
};

export default ParticlesBackground;
