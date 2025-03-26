
import React, { useEffect, useRef } from "react";
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
  const isInitializedRef = useRef<boolean>(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize canvas size
    const updateCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      
      // Re-initialize orbits on resize
      initOrbits();
    };

    // Create orbit configuration based on device
    const initOrbits = () => {
      const orbits: Orbit[] = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Number of orbits and particles based on device
      const orbitsCount = isMobile ? 3 : 5;
      const particlesPerOrbit = isMobile ? [8, 12, 6] : [12, 18, 24, 10, 6];
      const orbitSizes = isMobile 
        ? [
            Math.min(canvas.width, canvas.height) * 0.25, 
            Math.min(canvas.width, canvas.height) * 0.4, 
            Math.min(canvas.width, canvas.height) * 0.6
          ]
        : [
            Math.min(canvas.width, canvas.height) * 0.15, 
            Math.min(canvas.width, canvas.height) * 0.25, 
            Math.min(canvas.width, canvas.height) * 0.4,
            Math.min(canvas.width, canvas.height) * 0.55,
            Math.min(canvas.width, canvas.height) * 0.7
          ];
      
      // Create each orbit
      for (let i = 0; i < orbitsCount; i++) {
        const orbitColor = `rgba(${30 + i * 30}, ${120 + i * 20}, ${220 - i * 20}, 0.1)`;
        const orbit: Orbit = {
          x: centerX,
          y: centerY,
          radius: orbitSizes[i] || 100, // Provide fallback value
          color: orbitColor,
          particles: []
        };
        
        // Create particles for this orbit
        for (let j = 0; j < (particlesPerOrbit[i] || 6); j++) { // Provide fallback value
          // Distribute particles evenly around the orbit
          const angle = (j / (particlesPerOrbit[i] || 6)) * Math.PI * 2;
          const speed = 0.0005 + Math.random() * 0.0010;
          const size = isMobile ? 1 + Math.random() * 1.5 : 1.5 + Math.random() * 2;
          
          // Bright blue particles with varying alpha
          const particleColor = `rgba(${100 + Math.random() * 100}, ${180 + Math.random() * 75}, 255, ${0.7 + Math.random() * 0.3})`;
          
          orbit.particles.push({
            x: orbit.x + Math.cos(angle) * orbit.radius,
            y: orbit.y + Math.sin(angle) * orbit.radius,
            vx: Math.cos(angle + Math.PI/2) * speed * orbit.radius,
            vy: Math.sin(angle + Math.PI/2) * speed * orbit.radius,
            radius: size,
            color: particleColor,
            alpha: 0.7 + Math.random() * 0.3
          });
        }
        
        orbits.push(orbit);
      }
      
      orbitsRef.current = orbits;
      isInitializedRef.current = true;
    };

    // Draw orbit paths
    const drawOrbits = () => {
      if (!ctx || !isInitializedRef.current) return;
      
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
      if (!ctx || !isInitializedRef.current) return;
      
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
            particle.vx = Math.cos(angle + Math.PI/2) * (0.0005 + Math.random() * 0.0010) * orbit.radius;
            particle.vy = Math.sin(angle + Math.PI/2) * (0.0005 + Math.random() * 0.0010) * orbit.radius;
          }
          
          // Draw the particle with glow effect - add safety check for radius
          const glowRadius = Math.max(particle.radius * 3, 0.1); // Ensure positive radius
          ctx.beginPath();
          
          // Create radial gradient for glow effect
          try {
            const gradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, glowRadius
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();
          } catch (e) {
            // Fallback if gradient fails
            ctx.fillStyle = particle.color;
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Draw particle core with safety check
          const coreRadius = Math.max(particle.radius, 0.1); // Ensure positive radius
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
      if (!ctx || !isInitializedRef.current) return;
      
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
      if (!canvas.width || !canvas.height) {
        updateCanvasSize();
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw orbit paths
      drawOrbits();
      
      // Draw and update particles
      drawParticles(time);
      
      // Draw connections between particles
      drawConnections();
      
      // Schedule next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    updateCanvasSize();
    
    // Start animation after a short delay to ensure canvas is ready
    setTimeout(() => {
      animate();
    }, 100);
    
    // Handle window resize
    const handleResize = () => {
      // Debounce resize event
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
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 5,
        opacity: 1,
        visibility: "visible",
        display: "block",
      }}
    />
  );
};

export default OrbitAnimation;
