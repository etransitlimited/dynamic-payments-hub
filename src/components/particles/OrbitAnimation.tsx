
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
  
  useEffect(() => {
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

    console.log("OrbitAnimation mounted, initializing canvas");

    // Force initial canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initialize canvas size
    const updateCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      
      console.log("Canvas size updated:", canvas.width, "x", canvas.height);
      
      // Re-initialize orbits on resize
      initOrbits();
    };

    // Create orbit configuration based on device
    const initOrbits = () => {
      try {
        if (!canvas.width || !canvas.height) {
          console.error("Canvas dimensions are zero, cannot initialize orbits");
          return;
        }
        
        console.log("Initializing orbits...");
        const orbits: Orbit[] = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Number of orbits and particles based on device
        const orbitsCount = isMobile ? 3 : 5;
        const particlesPerOrbit = isMobile ? [8, 12, 6] : [12, 18, 24, 10, 6];
        
        // Calculate minimum dimension to ensure orbits fit on screen
        const minDimension = Math.min(canvas.width, canvas.height);
        
        // Create orbit sizes as percentages of the minimum dimension
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
        
        // Create each orbit
        for (let i = 0; i < orbitsCount; i++) {
          const orbitColor = `rgba(${30 + i * 30}, ${120 + i * 20}, ${220 - i * 20}, 0.3)`;
          const orbit: Orbit = {
            x: centerX,
            y: centerY,
            radius: Math.max(orbitSizes[i] || 100, 10), // Ensure positive radius with fallback
            color: orbitColor,
            particles: []
          };
          
          // Ensure we have a valid number of particles
          const numParticles = particlesPerOrbit[i] || 6;
          
          // Create particles for this orbit
          for (let j = 0; j < numParticles; j++) {
            // Distribute particles evenly around the orbit
            const angle = (j / numParticles) * Math.PI * 2;
            const speed = 0.001 + Math.random() * 0.001;
            const size = Math.max(isMobile ? 1 + Math.random() * 1.5 : 1.5 + Math.random() * 2, 0.5);
            
            // Calculate initial position
            const x = orbit.x + Math.cos(angle) * orbit.radius;
            const y = orbit.y + Math.sin(angle) * orbit.radius;
            
            // Calculate initial velocity (tangent to orbit)
            const vx = Math.cos(angle + Math.PI/2) * speed * orbit.radius;
            const vy = Math.sin(angle + Math.PI/2) * speed * orbit.radius;
            
            // Bright blue particles with varying alpha
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

    // Draw orbit paths
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

    // Draw and update particles
    const drawParticles = (time: number) => {
      if (!ctx || !isInitialized) return;
      
      orbitsRef.current.forEach(orbit => {
        orbit.particles.forEach(particle => {
          // Update position based on velocity
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Keep particle on the orbit by calculating angle and repositioning
          const dx = particle.x - orbit.x;
          const dy = particle.y - orbit.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (Math.abs(distance - orbit.radius) > 1) {
            const angle = Math.atan2(dy, dx);
            particle.x = orbit.x + Math.cos(angle) * orbit.radius;
            particle.y = orbit.y + Math.sin(angle) * orbit.radius;
            
            // Recalculate velocity to be tangent to the orbit
            particle.vx = Math.cos(angle + Math.PI/2) * (0.001 + Math.random() * 0.001) * orbit.radius;
            particle.vy = Math.sin(angle + Math.PI/2) * (0.001 + Math.random() * 0.001) * orbit.radius;
          }
          
          // Draw the particle with glow effect - add safety check for radius
          const glowRadius = Math.max(particle.radius * 3, 1); // Ensure positive radius
          
          try {
            // Create radial gradient for glow effect
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
            // Fallback if gradient fails
            ctx.beginPath();
            ctx.fillStyle = particle.color;
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Draw particle core with safety check
          const coreRadius = Math.max(particle.radius, 0.5); // Ensure positive radius
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, coreRadius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          
          // Add pulsating effect based on time with safety check
          const pulseTime = (time * 0.001 + Math.random()) % 2;
          const pulseSize = Math.max(Math.sin(pulseTime * Math.PI) * 2, 0.1); // Ensure positive value
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, coreRadius + pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 220, 255, ${0.2 * Math.sin(pulseTime * Math.PI)})`;
          ctx.fill();
        });
      });
    };

    // Connection lines between particles that are close to each other
    const drawConnections = () => {
      if (!ctx || !isInitialized) return;
      
      // Only draw connections if not mobile (for performance)
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
                
                // Line opacity based on distance
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

    // Main animation loop
    const animate = (time = 0) => {
      if (!ctx || !canvas) return;

      if (!canvas.width || !canvas.height || canvas.width < 10 || canvas.height < 10) {
        console.warn("Canvas has invalid dimensions, resizing");
        updateCanvasSize();
        requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Only draw if orbits are initialized
      if (isInitialized) {
        // Draw orbit paths
        drawOrbits();
        
        // Draw and update particles
        drawParticles(time);
        
        // Draw connections between particles
        drawConnections();
      }
      
      // Schedule next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Ensure canvas is visible by forcing style properties
    if (canvas) {
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.zIndex = "-3";
      canvas.style.opacity = "1";
      canvas.style.visibility = "visible";
    }

    // Initialize
    updateCanvasSize();
    
    // Start animation after a short delay to ensure canvas is ready
    setTimeout(() => {
      animate();
    }, 100);
    
    // Handle window resize
    const handleResize = () => {
      // Cancel current animation frame before resizing
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      updateCanvasSize();
      requestAnimationFrame(animate);
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
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        visibility: "visible",
        opacity: 1,
        zIndex: -3
      }}
    />
  );
};

export default OrbitAnimation;
