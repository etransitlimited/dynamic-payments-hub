
import React, { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";
import { useParticlesConfig } from "./particlesConfig";

const ParticlesLayer: React.FC = () => {
  const particlesConfig = useParticlesConfig();
  const [isReady, setIsReady] = useState(false);
  
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log("Initializing particles engine");
    await loadSlim(engine);
    setIsReady(true);
  }, []);

  // Delay mounting to improve initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
      className="absolute inset-0 -z-10"
    />
  );
};

export default React.memo(ParticlesLayer);
