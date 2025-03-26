
import { MapNode } from "./types";

export default class MapRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  private isMobile: boolean;
  
  constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, isMobile: boolean) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.isMobile = isMobile;
  }
  
  drawNodeNetwork(nodes: MapNode[], time: number): void {
    // Clear canvas with transparent background
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // Draw connections first (behind nodes)
    this.drawConnections(nodes, time);
    
    // Draw nodes on top of connections
    this.drawNodes(nodes, time);
  }
  
  private drawConnections(nodes: MapNode[], time: number): void {
    nodes.forEach((node, idx) => {
      const x1 = (node.x / 100) * this.canvasWidth;
      const y1 = (node.y / 100) * this.canvasHeight;
      
      node.connections.forEach(connIdx => {
        const connectedNode = nodes[connIdx];
        const x2 = (connectedNode.x / 100) * this.canvasWidth;
        const y2 = (connectedNode.y / 100) * this.canvasHeight;
        
        // Calculate distance for opacity
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = connectedNode.size > 0.8 ? 
          (this.isMobile ? 250 : 350) : // Land nodes
          (this.isMobile ? 150 : 250);  // Ocean nodes
        
        // Enhanced opacity calculation
        const opacity = Math.max(0.1, Math.min(0.7, 1.2 - distance / maxDistance));
        
        // Animate connection with enhanced wave effect
        const waveAmplitude = 2.0; // Increased amplitude
        const segments = Math.ceil(distance / 40); // More segments for smoother curves
        
        // Create gradient for connection
        const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(${connectedNode.color[0]}, ${connectedNode.color[1]}, ${connectedNode.color[2]}, ${opacity * 0.6})`);
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 0.7; // Slightly thicker lines
        
        this.ctx.moveTo(x1, y1);
        
        if (segments > 1 && !this.isMobile) {
          // Draw wavy connection line with enhanced wave pattern
          for (let i = 1; i <= segments; i++) {
            const ratio = i / segments;
            // Combined sine waves for more complex movement
            const wave = Math.sin(time * 2 + ratio * Math.PI * 4) * waveAmplitude + 
                       Math.sin(time * 1.5 + ratio * Math.PI * 2) * (waveAmplitude * 0.5);
            
            const midX = x1 + dx * ratio;
            const midY = y1 + dy * ratio + wave;
            this.ctx.lineTo(midX, midY);
          }
        } else {
          // Mobile gets slightly wavy lines too
          if (this.isMobile) {
            const midX = x1 + dx * 0.5;
            const midY = y1 + dy * 0.5 + Math.sin(time * 1.5) * 1.0;
            this.ctx.quadraticCurveTo(midX, midY, x2, y2);
          } else {
            this.ctx.lineTo(x2, y2);
          }
        }
        
        this.ctx.stroke();
        
        // Occasionally add animated "data packet" traveling along connection
        if (Math.random() < 0.002) { // Rare chance of packet appearing
          const packetPos = (Math.sin(time * 3) + 1) / 2; // Oscillates between 0 and 1
          const packetX = x1 + dx * packetPos;
          const packetY = y1 + dy * packetPos;
          
          this.ctx.beginPath();
          this.ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
          this.ctx.arc(packetX, packetY, 1.2, 0, Math.PI * 2);
          this.ctx.fill();
        }
      });
    });
  }
  
  private drawNodes(nodes: MapNode[], time: number): void {
    nodes.forEach(node => {
      const x = (node.x / 100) * this.canvasWidth;
      const y = (node.y / 100) * this.canvasHeight;
      
      // Animate node size with enhanced pulsing effect
      // Combined sinusoids for more organic pulsing
      const pulse = Math.sin(time * node.speed + node.pulse) * 0.5 + 0.5;
      const secondaryPulse = Math.sin(time * node.speed * 0.7 + node.pulse * 1.3) * 0.3 + 0.7;
      const combinedPulse = (pulse * 0.7 + secondaryPulse * 0.3);
      
      const nodeSize = node.size * (0.6 + combinedPulse * 0.8);
      
      // Enhanced glow effect with larger radius and more intense center
      const glowRadius = nodeSize * 6; // Larger glow radius
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
      gradient.addColorStop(0, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${0.9 * combinedPulse})`);
      gradient.addColorStop(0.5, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, ${0.3 * combinedPulse})`);
      gradient.addColorStop(1, `rgba(${node.color[0]}, ${node.color[1]}, ${node.color[2]}, 0)`);
      
      this.ctx.beginPath();
      this.ctx.fillStyle = gradient;
      this.ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw node center with bright core
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(${node.color[0] + 30}, ${node.color[1] + 30}, ${node.color[2] + 20}, ${0.95})`; // Brighter center
      this.ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Add highlight to create 3D effect on nodes
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * combinedPulse})`;
      this.ctx.arc(x - nodeSize * 0.3, y - nodeSize * 0.3, nodeSize * 0.4, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}
