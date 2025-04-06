
import { MapNode, Particle } from "./types";

export default class MapRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  private isMobile: boolean;
  private particleCache: Map<string, ImageData> = new Map();
  
  constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, isMobile: boolean) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.isMobile = isMobile;
    
    // Initialize particle drawing cache for better performance
    this.initParticleCache();
  }
  
  // Create prerendered particles for better performance
  private initParticleCache(): void {
    // Only create cache if we're not on a mobile device with low performance
    if (this.isMobile) return;
    
    // Create cached versions of common particle sizes and opacities
    const sizes = [0.3, 0.5, 0.8, 1.2, 1.5];
    const opacities = [0.3, 0.5, 0.8, 1.0];
    
    sizes.forEach(size => {
      opacities.forEach(opacity => {
        // Create offscreen canvas for each particle type
        const cacheCanvas = document.createElement('canvas');
        const cacheSize = size * 6; // Make canvas big enough for glow
        cacheCanvas.width = cacheSize * 2;
        cacheCanvas.height = cacheSize * 2;
        
        const cacheCtx = cacheCanvas.getContext('2d');
        if (!cacheCtx) return;
        
        // Draw particle with glow
        const gradient = cacheCtx.createRadialGradient(
          cacheSize, cacheSize, 0,
          cacheSize, cacheSize, cacheSize
        );
        
        gradient.addColorStop(0, `rgba(65, 150, 255, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(65, 150, 255, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(65, 150, 255, 0)`);
        
        cacheCtx.fillStyle = gradient;
        cacheCtx.beginPath();
        cacheCtx.arc(cacheSize, cacheSize, cacheSize, 0, Math.PI * 2);
        cacheCtx.fill();
        
        // Store the rendered particle
        const key = `${size.toFixed(1)}-${opacity.toFixed(1)}`;
        this.particleCache.set(key, cacheCtx.getImageData(0, 0, cacheCanvas.width, cacheCanvas.height));
      });
    });
  }
  
  drawNodeNetwork(nodes: MapNode[], time: number): void {
    // Clear canvas with transparent background
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // Draw connections first (behind nodes)
    this.drawConnections(nodes, time);
    
    // Update and draw particles (middle layer)
    this.updateAndDrawParticles(nodes, time);
    
    // Draw nodes on top of connections and particles
    this.drawNodes(nodes, time);
  }
  
  // Randomly generate particles for some nodes
  generateRandomParticles(nodes: MapNode[], maxParticles: number = 5): void {
    // Limit total new particles
    let particlesAdded = 0;
    
    // Select random nodes to add particles to
    const shuffledNodes = [...nodes].sort(() => Math.random() - 0.5);
    
    for (const node of shuffledNodes) {
      // Stop once we've added enough particles
      if (particlesAdded >= maxParticles) break;
      
      // Initialize particles array if it doesn't exist
      if (!node.particles) {
        node.particles = [];
      }
      
      // Cap the number of particles per node
      const maxParticlesPerNode = this.isMobile ? 3 : 10;
      
      // Randomly create new particles (more likely for larger nodes)
      if (Math.random() < (node.size * 0.04) && node.particles.length < maxParticlesPerNode) {
        const angle = Math.random() * Math.PI * 2; // Random direction
        node.particles.push({
          x: node.x,
          y: node.y,
          size: 0.2 + Math.random() * (this.isMobile ? 0.4 : 0.6), // Smaller particles on mobile
          speed: 0.1 + Math.random() * (this.isMobile ? 0.2 : 0.3), // Slower particles on mobile
          life: 0,
          maxLife: 50 + Math.random() * (this.isMobile ? 50 : 100), // Shorter lifespan on mobile
          angle: angle,
          color: [...node.color], // Copy color from node
        });
        
        particlesAdded++;
      }
    }
  }
  
  private updateAndDrawParticles(nodes: MapNode[], time: number): void {
    // Update and draw all particles
    nodes.forEach(node => {
      if (!node.particles) return;
      
      // Filter out dead particles and update remaining ones
      node.particles = node.particles.filter(particle => {
        // Update particle life
        particle.life++;
        if (particle.life > particle.maxLife) {
          return false; // Remove dead particles
        }
        
        // Calculate particle position - move along its angle
        particle.x += Math.cos(particle.angle) * particle.speed * 0.2;
        particle.y += Math.sin(particle.angle) * particle.speed * 0.2;
        
        // Add slight wobble to movement (reduced on mobile)
        particle.angle += (Math.random() - 0.5) * (this.isMobile ? 0.05 : 0.1);
        
        // Draw the particle
        const x = (particle.x / 100) * this.canvasWidth;
        const y = (particle.y / 100) * this.canvasHeight;
        
        // Calculate opacity based on life (fade in and out)
        const lifeRatio = particle.life / particle.maxLife;
        let opacity = 0;
        
        if (lifeRatio < 0.2) {
          // Fade in
          opacity = lifeRatio * 5; // 0 to 1 during first 20% of life
        } else if (lifeRatio > 0.8) {
          // Fade out
          opacity = (1 - lifeRatio) * 5; // 1 to 0 during last 20% of life
        } else {
          // Full opacity during middle part of life
          opacity = 1;
        }
        
        // Use cached particle if available for better performance
        const particleSize = particle.size;
        const cacheSizeKey = this.getCacheSizeKey(particleSize);
        const cacheOpacityKey = this.getCacheOpacityKey(opacity);
        
        const cacheKey = `${cacheSizeKey}-${cacheOpacityKey}`;
        const cachedParticle = this.particleCache.get(cacheKey);
        
        if (cachedParticle && !this.isMobile) {
          // Use cached particle (faster)
          const renderSize = particleSize * 6 * 2; // Match the cache canvas size
          this.ctx.globalAlpha = opacity;
          this.ctx.putImageData(
            cachedParticle, 
            x - renderSize/2, 
            y - renderSize/2
          );
          this.ctx.globalAlpha = 1;
        } else {
          // Fallback to direct drawing (for mobile or when cache miss)
          const color = particle.color || node.color;
          
          // Draw particle core
          this.ctx.beginPath();
          this.ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
          this.ctx.arc(x, y, particleSize, 0, Math.PI * 2);
          this.ctx.fill();
          
          // Add subtle glow (simplified on mobile)
          if (!this.isMobile) {
            const glowRadius = particleSize * 3;
            const glow = this.ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
            glow.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity * 0.3})`);
            glow.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
            
            this.ctx.beginPath();
            this.ctx.fillStyle = glow;
            this.ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
            this.ctx.fill();
          }
        }
        
        return true; // Keep this particle
      });
    });
  }
  
  // Helper methods for particle cache
  private getCacheSizeKey(size: number): string {
    const sizes = [0.3, 0.5, 0.8, 1.2, 1.5];
    // Find closest size
    const closestSize = sizes.reduce((prev, curr) => 
      Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
    );
    return closestSize.toFixed(1);
  }
  
  private getCacheOpacityKey(opacity: number): string {
    const opacities = [0.3, 0.5, 0.8, 1.0];
    // Find closest opacity
    const closestOpacity = opacities.reduce((prev, curr) => 
      Math.abs(curr - opacity) < Math.abs(prev - opacity) ? curr : prev
    );
    return closestOpacity.toFixed(1);
  }
  
  private drawConnections(nodes: MapNode[], time: number): void {
    // Skip some connections on mobile for performance
    const connectionModulo = this.isMobile ? 2 : 1; // Only draw every other connection on mobile
    
    nodes.forEach((node, idx) => {
      // Skip some nodes on mobile
      if (this.isMobile && idx % connectionModulo !== 0) return;
      
      const x1 = (node.x / 100) * this.canvasWidth;
      const y1 = (node.y / 100) * this.canvasHeight;
      
      node.connections.forEach((connIdx, connIdxPos) => {
        // Skip some connections on mobile
        if (this.isMobile && connIdxPos % connectionModulo !== 0) return;
        
        const connectedNode = nodes[connIdx];
        if (!connectedNode) return; // Skip if connected node doesn't exist
        
        const x2 = (connectedNode.x / 100) * this.canvasWidth;
        const y2 = (connectedNode.y / 100) * this.canvasHeight;
        
        // Calculate distance for opacity
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = connectedNode.size > 0.8 ? 
          (this.isMobile ? 200 : 350) : // Land nodes (reduced on mobile)
          (this.isMobile ? 100 : 250);  // Ocean nodes (reduced on mobile)
        
        // Only draw connections within a reasonable distance
        if (distance > maxDistance) return;
        
        // Enhanced opacity calculation
        const opacity = Math.max(0.1, Math.min(0.7, 1.2 - distance / maxDistance));
        
        // Animate connection with enhanced wave effect (simplified on mobile)
        const waveAmplitude = this.isMobile ? 1.0 : 2.0; // Reduced amplitude on mobile
        const segments = this.isMobile ? 
          Math.ceil(distance / 80) : // Fewer segments on mobile
          Math.ceil(distance / 40);  // More segments on desktop
        
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
        // Reduced frequency on mobile
        if (Math.random() < (this.isMobile ? 0.0005 : 0.002)) { // Rare chance of packet appearing
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
    // Skip some nodes on mobile for performance
    const nodeModulo = this.isMobile ? 2 : 1; // Draw every other node on mobile
    
    nodes.forEach((node, idx) => {
      // Skip some nodes on mobile based on modulo
      if (this.isMobile && idx % nodeModulo !== 0 && node.size < 0.9) return;
      
      const x = (node.x / 100) * this.canvasWidth;
      const y = (node.y / 100) * this.canvasHeight;
      
      // Animate node size with enhanced pulsing effect
      // Improved pulsing algorithm for smoother animation
      const pulseSpeed = 0.8 + (node.speed * 0.5); // Normalize pulse speed
      const pulse = Math.sin(time * pulseSpeed + node.pulse) * 0.5 + 0.5;
      const secondaryPulse = this.isMobile ? 
        0.7 : // Fixed value on mobile
        Math.sin(time * pulseSpeed * 0.7 + node.pulse * 1.3) * 0.3 + 0.7; // More complex on desktop
        
      const combinedPulse = this.isMobile ?
        (pulse * 0.9 + 0.1) : // More subtle on mobile
        (pulse * 0.7 + secondaryPulse * 0.3); // More dynamic on desktop
      
      const nodeSize = node.size * (0.6 + combinedPulse * 0.8);
      
      // Enhanced glow effect (simplified on mobile)
      const glowRadius = this.isMobile ? nodeSize * 4 : nodeSize * 6; // Smaller glow on mobile
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
      // Skip this effect on mobile for performance
      if (!this.isMobile) {
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * combinedPulse})`;
        this.ctx.arc(x - nodeSize * 0.3, y - nodeSize * 0.3, nodeSize * 0.4, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }
}
