
import React, { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const WorldMapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize time variable before it's used
    let time = 0;
    let animationFrameId: number;
    
    // Handle resize and set canvas dimensions
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      setDimensions({ width: innerWidth, height: innerHeight });
    };

    // Create data structure for nodes
    const nodeCount = isMobile ? 120 : 200;
    const nodes: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: [number, number, number];
      connections: number[];
    }> = [];

    // Generate a dataset that resembles a world map distribution
    const createNodes = () => {
      // Clear existing nodes
      nodes.length = 0;
      
      // World regions with approximate coordinate ranges (as percentages of canvas)
      const regions = [
        { name: "North America", x: [15, 30], y: [15, 40], density: 0.7 },
        { name: "South America", x: [25, 35], y: [50, 85], density: 0.6 },
        { name: "Europe", x: [45, 55], y: [15, 35], density: 1 },
        { name: "Africa", x: [45, 60], y: [40, 70], density: 0.7 },
        { name: "Asia", x: [60, 85], y: [15, 50], density: 0.9 },
        { name: "Australia", x: [80, 90], y: [60, 75], density: 0.5 },
      ];
      
      // Distribute nodes among regions
      let nodeIdx = 0;
      regions.forEach(region => {
        const regionNodeCount = Math.floor(nodeCount * region.density / regions.reduce((sum, r) => sum + r.density, 0));
        
        for (let i = 0; i < regionNodeCount; i++) {
          const x = region.x[0] + Math.random() * (region.x[1] - region.x[0]);
          const y = region.y[0] + Math.random() * (region.y[1] - region.y[0]);
          
          // Random color variations in blue-cyan spectrum
          const colorBase = [
            30 + Math.random() * 50, // R
            100 + Math.random() * 155, // G
            200 + Math.random() * 55, // B
          ];
          
          nodes.push({
            x,
            y,
            size: 0.5 + Math.random() * 1.5,
            speed: 0.2 + Math.random() * 0.8,
            color: colorBase as [number, number, number],
            connections: []
          });
          
          nodeIdx++;
        }
      });
      
      // Create connections between nearby nodes
      nodes.forEach((node, idx) => {
        const connectionCount = Math.floor(Math.random() * 3) + 1;
        const distances: {index: number, distance: number}[] = [];
        
        // Calculate distances to all other nodes
        nodes.forEach((otherNode, otherIdx) => {
          if (idx !== otherIdx) {
            const dx = (node.x - otherNode.x) / 100 * canvas.width;
            const dy = (node.y - otherNode.y) / 100 * canvas.height;
            const distance = Math.sqrt(dx * dx + dy * dy);
            distances.push({ index: otherIdx, distance });
          }
        });
        
        // Sort by distance and take the closest ones
        distances.sort((a, b) => a.distance - b.distance);
        node.connections = distances
          .slice(0, connectionCount)
          .filter(d => d.distance < (isMobile ? 200 : 300)) // Only connect if within range
          .map(d => d.index);
      });
    };

    // Draw node network on canvas
    const drawNodeNetwork = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time for animations
      time += 0.01;
      
      // Draw connections first (behind nodes)
      nodes.forEach((node, idx) => {
        const x1 = (node.x / 100) * canvas.width;
        const y1 = (node.y / 100) * canvas.height;
        
        node.connections.forEach(connIdx => {
          const connectedNode = nodes[connIdx];
          const x2 = (connectedNode.x / 100) * canvas.width;
          const y2 = (connectedNode.y / 100) * canvas.height;
          
          // Calculate distance for opacity
          const dx = x2 - x1;
          const dy = y2 - y1;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = isMobile ? 200 : 300;
          const opacity = Math.max(0, Math.min(0.5, 1 - distance / maxDistance));
          
          // Animate connection with slight wave
          const waveAmplitude = 1.5;
          const segments = Math.ceil(distance / 50);
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${opacity * 0.5})`;
          ctx.lineWidth = 0.5;
          
          ctx.moveTo(x1, y1);
          
          if (segments > 1 && !isMobile) {
            // Draw wavy connection line
            for (let i = 1; i <= segments; i++) {
              const ratio = i / segments;
              const wave = Math.sin(time * 2 + ratio * Math.PI * 4) * waveAmplitude;
              const midX = x1 + dx * ratio;
              const midY = y1 + dy * ratio + wave;
              ctx.lineTo(midX, midY);
            }
          } else {
            // Simple straight line for mobile or short distances
            ctx.lineTo(x2, y2);
          }
          
          ctx.stroke();
        });
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const x = (node.x / 100) * canvas.width;
        const y = (node.y / 100) * canvas.height;
        
        // Animate node size with pulsing effect
        const pulse = Math.sin(time * node.speed + node.x + node.y) * 0.5 + 0.5;
        const nodeSize = node.size * (0.7 + pulse * 0.6);
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, nodeSize * 4);
        gradient.addColorStop(0, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${0.7 * pulse})`);
        gradient.addColorStop(1, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, 0)`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, nodeSize * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node center
        ctx.beginPath();
        ctx.fillStyle = `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${0.9})`;
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    // Animation loop
    const animate = () => {
      drawNodeNetwork();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize
    handleResize();
    createNodes();
    window.addEventListener('resize', () => {
      handleResize();
      createNodes(); // Recreate nodes on resize
    });
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <canvas 
      ref={canvasRef} 
      className="world-map-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isMobile ? 0.7 : 0.9
      }}
    />
  );
};

export default WorldMapCanvas;
