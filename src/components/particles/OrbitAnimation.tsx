
import React, { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

interface Orbit {
  x: number;
  y: number;
  radius: number;
  color: string;
  particles: Particle[];
}

const OrbitAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();
  const orbitsRef = useRef<Orbit[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const canvasStyles: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "block",
    visibility: "visible",
    opacity: 1,
    zIndex: 0, // Increase z-index to make it more visible
    pointerEvents: "none"
  };
  
  useEffect(() => {
    console.log("OrbitAnimation mounted, initializing canvas");
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas context not available");
      return;
    }

    const setCanvasDimensions = () => {
      try {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        console.log("Canvas size updated:", canvas.width, "x", canvas.height);
        return true;
      } catch (error) {
        console.error("Error setting canvas dimensions:", error);
        return false;
      }
    };
    
    const updateCanvasSize = () => {
      if (!setCanvasDimensions()) return;
      
      initOrbits();
    };

    const initOrbits = () => {
      try {
        if (!canvas.width || !canvas.height || canvas.width < 10 || canvas.height < 10) {
          console.error("Canvas dimensions are invalid, cannot initialize orbits");
          return;
        }
        
        console.log("Initializing orbits...");
        const orbits: Orbit[] = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        const orbitsCount = isMobile ? 3 : 5;
        const particlesPerOrbit = isMobile ? [8, 12, 6] : [12, 18, 24, 10, 6];
        
        const minDimension = Math.min(canvas.width, canvas.height);
        
        const orbitSizes = isMobile 
          ? [
              minDimension * 0.25, 
              minDimension * 0.4, 
              minDimension * 0.6
            ]
          : [
              minDimension * 0.15, 
              minDimension * 0.25, 
              minDimension * 0.4,
              minDimension * 0.55,
              minDimension * 0.7
            ];
        
        for (let i = 0; i < orbitsCount; i++) {
          const orbitColor = `rgba(${30 + i * 30}, ${120 + i * 20}, ${220 - i * 20}, 0.3)`;
          const orbit: Orbit = {
            x: centerX,
            y: centerY,
            radius: Math.max(orbitSizes[i] || 100, 10),
            color: orbitColor,
            particles: []
          };
          
          const numParticles = particlesPerOrbit[i] || 6;
          
          for (let j = 0; j < numParticles; j++) {
            const angle = (j / numParticles) * Math.PI * 2;
            const speed = 0.001 + Math.random() * 0.001;
            const size = Math.max(isMobile ? 1 + Math.random() * 1.5 : 1.5 + Math.random() * 2, 0.5);
            
            const x = orbit.x + Math.cos(angle) * orbit.radius;
            const y = orbit.y + Math.sin(angle) * orbit.radius;
            
            const vx = Math.cos(angle + Math.PI/2) * speed * orbit.radius;
            const vy = Math.sin(angle + Math.PI/2) * speed * orbit.radius;
            
            const particleColor = `rgba(${100 + Math.random() * 100}, ${180 + Math.random() * 75}, 255, ${0.7 + Math.random() * 0.3})`;
            
            orbit.particles.push({
              x: x,
              y: y,
              vx: vx,
              vy: vy,
              radius: size,
              color: particleColor,
              alpha: 0.7 + Math.random() * 0.3
            });
          }
          
          orbits.push(orbit);
        }
        
        orbitsRef.current = orbits;
        setIsInitialized(true);
        console.log("Orbits initialized:", orbits.length, "orbits created");
      } catch (error) {
        console.error("Error initializing orbits:", error);
      }
    };

    const drawOrbits = () => {
      if (!ctx || !isInitialized) return;
      
      orbitsRef.current.forEach(orbit => {
        ctx.beginPath();
        ctx.arc(orbit.x, orbit.y, orbit.radius, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color;
        ctx.lineWidth = isMobile ? 0.5 : 1;
        ctx.stroke();
      });
    };

    const drawParticles = (time: number) => {
      if (!ctx || !isInitialized) return;
      
      orbitsRef.current.forEach(orbit => {
        orbit.particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          const dx = particle.x - orbit.x;
          const dy = particle.y - orbit.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (Math.abs(distance - orbit.radius) > 1) {
            const angle = Math.atan2(dy, dx);
            particle.x = orbit.x + Math.cos(angle) * orbit.radius;
            particle.y = orbit.y + Math.sin(angle) * orbit.radius;
            
            particle.vx = Math.cos(angle + Math.PI/2) * (0.001 + Math.random() * 0.001) * orbit.radius;
            particle.vy = Math.sin(angle + Math.PI/2) * (0.001 + Math.random() * 0.001) * orbit.radius;
          }
          
          const glowRadius = Math.max(particle.radius * 3, 1);
          
          try {
            const gradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, glowRadius
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();
          } catch (e) {
            ctx.beginPath();
            ctx.fillStyle = particle.color;
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          
          const coreRadius = Math.max(particle.radius, 0.5);
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, coreRadius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          
          const pulseTime = (time * 0.001 + Math.random()) % 2;
          const pulseSize = Math.max(Math.sin(pulseTime * Math.PI) * 2, 0.1);
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, coreRadius + pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 220, 255, ${0.2 * Math.sin(pulseTime * Math.PI)})`;
          ctx.fill();
        });
      });
    };

    const drawConnections = () => {
      if (!ctx || !isInitialized) return;
      
      if (!isMobile) {
        const maxDist = 150;
        
        orbitsRef.current.forEach(orbit => {
          orbit.particles.forEach(particleA => {
            orbit.particles.forEach(particleB => {
              const dx = particleA.x - particleB.x;
              const dy = particleA.y - particleB.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist > 0 && dist < maxDist) {
                ctx.beginPath();
                ctx.moveTo(particleA.x, particleA.y);
                ctx.lineTo(particleB.x, particleB.y);
                
                const opacity = 1 - (dist / maxDist);
                ctx.strokeStyle = `rgba(100, 180, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            });
          });
        });
      }
    };

    const animate = (time = 0) => {
      if (!ctx || !canvas) return;

      if (!canvas.width || !canvas.height || canvas.width < 10 || canvas.height < 10) {
        console.warn("Canvas has invalid dimensions, resizing");
        updateCanvasSize();
        requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isInitialized) {
        // For debugging, check if we're drawing
        console.log("Drawing orbits, frame:", time);
        drawOrbits();
        drawParticles(time);
        drawConnections();
      } else {
        console.warn("Animation not initialized yet");
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    if (canvas) {
      console.log("Setting canvas styles");
      Object.assign(canvas.style, canvasStyles);
    }

    setCanvasDimensions();
    initOrbits();
    animate(0);
    
    const handleResize = () => {
      console.log("Window resized");
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      updateCanvasSize();
      animate(0);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      console.log("OrbitAnimation unmounted");
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={canvasStyles}
      data-testid="orbit-canvas"
    />
  );
};

export default OrbitAnimation;
