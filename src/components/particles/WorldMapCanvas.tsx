
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
    const nodeCount = isMobile ? 120 : 250; // Increased node count for more density
    const nodes: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: [number, number, number];
      connections: number[];
      pulse: number; // Add pulse variation for each node
    }> = [];

    // Generate a dataset that resembles a world map distribution
    const createNodes = () => {
      // Clear existing nodes
      nodes.length = 0;
      
      // World regions with approximate coordinate ranges (as percentages of canvas)
      // Enhanced coverage and adjusted density for a more realistic map
      const regions = [
        { name: "North America", x: [15, 30], y: [15, 40], density: 0.7 },
        { name: "South America", x: [25, 35], y: [50, 85], density: 0.6 },
        { name: "Europe", x: [45, 55], y: [15, 35], density: 1 },
        { name: "Africa", x: [45, 60], y: [40, 70], density: 0.7 },
        { name: "Asia", x: [60, 85], y: [15, 50], density: 0.9 },
        { name: "Australia", x: [80, 90], y: [60, 75], density: 0.5 },
        // Add some ocean nodes for better coverage
        { name: "Pacific", x: [5, 15], y: [30, 60], density: 0.2 },
        { name: "Atlantic", x: [35, 45], y: [25, 60], density: 0.2 },
        { name: "Indian", x: [65, 75], y: [50, 65], density: 0.2 }
      ];
      
      // Distribute nodes among regions
      let nodeIdx = 0;
      regions.forEach(region => {
        const regionNodeCount = Math.floor(nodeCount * region.density / regions.reduce((sum, r) => sum + r.density, 0));
        
        for (let i = 0; i < regionNodeCount; i++) {
          // Add slight randomness to node distribution
          const jitterX = Math.random() * 2 - 1; // -1 to 1
          const jitterY = Math.random() * 2 - 1; // -1 to 1
          
          const x = region.x[0] + Math.random() * (region.x[1] - region.x[0]) + jitterX;
          const y = region.y[0] + Math.random() * (region.y[1] - region.y[0]) + jitterY;
          
          // Enhanced color variations with more vibrant blues and cyans
          // Continental nodes are brighter, ocean nodes are darker
          const isOceanRegion = ["Pacific", "Atlantic", "Indian"].includes(region.name);
          
          let colorBase;
          if (isOceanRegion) {
            // Darker blue for oceans
            colorBase = [
              20 + Math.random() * 40, // Lower R for darker blue
              70 + Math.random() * 100, // Lower G
              180 + Math.random() * 40, // More consistent blue
            ];
          } else {
            // Brighter cyan-blue for continents
            colorBase = [
              40 + Math.random() * 60, // R
              120 + Math.random() * 135, // G - more variance
              220 + Math.random() * 35, // B - brighter blue
            ];
          }
          
          nodes.push({
            x,
            y,
            size: isOceanRegion ? 0.3 + Math.random() * 0.8 : 0.6 + Math.random() * 1.8, // Larger nodes for continents
            speed: 0.2 + Math.random() * 1.2, // Increased max speed for more dynamic motion
            color: colorBase as [number, number, number],
            connections: [],
            pulse: Math.random() * 2 * Math.PI // Random starting phase for pulse animation
          });
          
          nodeIdx++;
        }
      });
      
      // Create connections between nearby nodes with improved algorithm
      nodes.forEach((node, idx) => {
        // More connections for land nodes, fewer for ocean
        const isLargeNode = node.size > 0.8;
        const connectionCount = isLargeNode ? 
          Math.floor(Math.random() * 4) + 2 : // 2-5 connections for land
          Math.floor(Math.random() * 2) + 1;  // 1-2 connections for ocean
        
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
        
        // Connection range is larger for land nodes
        const connectionRange = isLargeNode ? 
          (isMobile ? 250 : 350) : // Increased range for land
          (isMobile ? 150 : 250);  // Smaller range for ocean
          
        node.connections = distances
          .slice(0, connectionCount)
          .filter(d => d.distance < connectionRange)
          .map(d => d.index);
      });
    };

    // Draw node network on canvas with enhanced effects
    const drawNodeNetwork = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time for animations - slightly faster for more dynamic feel
      time += 0.015;
      
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
          const maxDistance = connectedNode.size > 0.8 ? 
            (isMobile ? 250 : 350) : // Land nodes
            (isMobile ? 150 : 250);  // Ocean nodes
          
          // Enhanced opacity calculation
          const opacity = Math.max(0.1, Math.min(0.7, 1.2 - distance / maxDistance));
          
          // Animate connection with enhanced wave effect
          const waveAmplitude = 2.0; // Increased amplitude
          const segments = Math.ceil(distance / 40); // More segments for smoother curves
          
          // Create gradient for connection
          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${opacity * 0.8})`);
          gradient.addColorStop(1, `rgba(${connectedNode.color[0]}, ${connectedNode.color[1]}, ${connectedNode.color[2]}, ${opacity * 0.6})`);
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.7; // Slightly thicker lines
          
          ctx.moveTo(x1, y1);
          
          if (segments > 1 && !isMobile) {
            // Draw wavy connection line with enhanced wave pattern
            for (let i = 1; i <= segments; i++) {
              const ratio = i / segments;
              // Combined sine waves for more complex movement
              const wave = Math.sin(time * 2 + ratio * Math.PI * 4) * waveAmplitude + 
                          Math.sin(time * 1.5 + ratio * Math.PI * 2) * (waveAmplitude * 0.5);
              
              const midX = x1 + dx * ratio;
              const midY = y1 + dy * ratio + wave;
              ctx.lineTo(midX, midY);
            }
          } else {
            // Mobile gets slightly wavy lines too
            if (isMobile) {
              const midX = x1 + dx * 0.5;
              const midY = y1 + dy * 0.5 + Math.sin(time * 1.5) * 1.0;
              ctx.quadraticCurveTo(midX, midY, x2, y2);
            } else {
              ctx.lineTo(x2, y2);
            }
          }
          
          ctx.stroke();
          
          // Occasionally add animated "data packet" traveling along connection
          if (Math.random() < 0.002) { // Rare chance of packet appearing
            const packetPos = (Math.sin(time * 3) + 1) / 2; // Oscillates between 0 and 1
            const packetX = x1 + dx * packetPos;
            const packetY = y1 + dy * packetPos;
            
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
            ctx.arc(packetX, packetY, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });
      
      // Draw nodes with enhanced effects
      nodes.forEach(node => {
        const x = (node.x / 100) * canvas.width;
        const y = (node.y / 100) * canvas.height;
        
        // Animate node size with enhanced pulsing effect
        // Combined sinusoids for more organic pulsing
        const pulse = Math.sin(time * node.speed + node.pulse) * 0.5 + 0.5;
        const secondaryPulse = Math.sin(time * node.speed * 0.7 + node.pulse * 1.3) * 0.3 + 0.7;
        const combinedPulse = (pulse * 0.7 + secondaryPulse * 0.3);
        
        const nodeSize = node.size * (0.6 + combinedPulse * 0.8);
        
        // Enhanced glow effect with larger radius and more intense center
        const glowRadius = nodeSize * 6; // Larger glow radius
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        gradient.addColorStop(0, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${0.9 * combinedPulse})`);
        gradient.addColorStop(0.5, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${0.3 * combinedPulse})`);
        gradient.addColorStop(1, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, 0)`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node center with bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(${node.color[0] + 30}, ${node.color[1] + 30}, ${node.color[2] + 20}, ${0.95})`; // Brighter center
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Add highlight to create 3D effect on nodes
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * combinedPulse})`;
        ctx.arc(x - nodeSize * 0.3, y - nodeSize * 0.3, nodeSize * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    // Animation loop with optimized performance
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
      className="world-map-canvas optimize-hardware"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isMobile ? 0.8 : 1, // Increased opacity for better visibility
        filter: 'saturate(1.2) brightness(1.1)', // Enhanced colors
      }}
    />
  );
};

export default WorldMapCanvas;
