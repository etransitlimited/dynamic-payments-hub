
import { MapNode } from "./types";
import MapRenderer from "./MapRenderer";
import NodeGenerator from "./NodeGenerator";
import { PerformanceTier } from "@/hooks/use-performance";

export default class AnimationController {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number = 0;
  private time: number = 0;
  private nodes: MapNode[] = [];
  private nodeGenerator: NodeGenerator | null = null;
  private mapRenderer: MapRenderer | null = null;
  private isMobile: boolean;
  private performanceTier: PerformanceTier;
  private lastParticleGenTime: number = 0;
  private lastFrameTime: number = 0;
  private frameThrottle: number = 1; // Default: render every frame
  private isVisible: boolean = true;
  private rafCallback: number | null = null;
  private smoothTime: number = 0; // For smooth time incrementation
  
  constructor(
    canvasRef: React.RefObject<HTMLCanvasElement>, 
    isMobile: boolean,
    performanceTier: PerformanceTier = 'high'
  ) {
    this.canvasRef = canvasRef;
    this.isMobile = isMobile;
    this.performanceTier = performanceTier;
    
    // Set frame throttling based on performance tier
    this.frameThrottle = this.isMobile ? 
      (this.performanceTier === 'low' ? 4 : this.performanceTier === 'medium' ? 2 : 1) : 
      (this.performanceTier === 'low' ? 3 : 1);
  }
  
  init(): void {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    this.ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true // Use desynchronized context for better performance
    });
    
    if (!this.ctx) return;
    
    this.handleResize();
    this.createNodes();
    
    window.addEventListener('resize', this.handleResize);
    
    // Add visibility change listener to pause when tab is not visible
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    this.lastFrameTime = performance.now();
    this.animate();
  }
  
  cleanup(): void {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    
    if (this.rafCallback !== null) {
      cancelAnimationFrame(this.rafCallback);
      this.rafCallback = null;
    }
    
    cancelAnimationFrame(this.animationFrameId);
  }
  
  private handleVisibilityChange = (): void => {
    this.isVisible = document.visibilityState === 'visible';
    
    if (this.isVisible && this.rafCallback === null) {
      // Resume animation if tab becomes visible again
      this.lastFrameTime = performance.now();
      this.rafCallback = requestAnimationFrame(this.animate);
    }
  }
  
  private handleResize = (): void => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    const { innerWidth, innerHeight } = window;
    
    // Use device pixel ratio for sharper rendering on high DPI screens
    // But limit it for performance reasons on mobile
    const maxDpr = this.isMobile ? 
      (this.performanceTier === 'low' ? 1 : 2) : 
      (this.performanceTier === 'low' ? 1.5 : window.devicePixelRatio || 1);
    
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    
    // Set the actual size of the canvas
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    
    // Scale all drawing operations
    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
    
    // Set display size
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    
    this.createNodes();
  }
  
  private createNodes(): void {
    const canvas = this.canvasRef.current;
    if (!canvas || !this.ctx) return;
    
    // Reduce node count for mobile devices or low performance
    let nodeCount = 250; // Default for high performance desktop
    
    if (this.isMobile) {
      nodeCount = this.performanceTier === 'low' ? 40 : 
                  this.performanceTier === 'medium' ? 60 : 80;
    } else {
      nodeCount = this.performanceTier === 'low' ? 120 : 
                  this.performanceTier === 'medium' ? 180 : 250;
    }
    
    // Initialize with canvas display size, not actual pixel size
    const displayWidth = parseInt(canvas.style.width || '0', 10) || canvas.width;
    const displayHeight = parseInt(canvas.style.height || '0', 10) || canvas.height;
    
    this.nodeGenerator = new NodeGenerator(this.isMobile, displayWidth, displayHeight);
    this.nodes = this.nodeGenerator.generateNodes(nodeCount);
    this.mapRenderer = new MapRenderer(this.ctx, displayWidth, displayHeight, this.isMobile);
  }
  
  private shouldRenderFrame(): boolean {
    // Skip frames when throttling
    return this.animationFrameId % this.frameThrottle === 0;
  }
  
  private animate = (): void => {
    this.animationFrameId++;
    
    // Skip animation if tab is not visible
    if (!this.isVisible) {
      this.rafCallback = requestAnimationFrame(this.animate);
      return;
    }
    
    // Calculate delta time for smoother animations across different devices
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convert to seconds
    this.lastFrameTime = currentTime;
    
    // Only increment time if we're going to render
    if (this.shouldRenderFrame()) {
      // Use deltaTime to make animations consistent regardless of frame rate
      // But cap it to prevent large jumps after tab was inactive
      const cappedDelta = Math.min(deltaTime, 0.05);
      
      // Apply exponential smoothing to time incrementation for stable animations
      const smoothFactor = 0.85;
      this.smoothTime = this.smoothTime * smoothFactor + cappedDelta * (1 - smoothFactor);
      
      // Slow down time more for lower performance tiers
      const timeScale = this.performanceTier === 'low' ? 0.3 : 
                        this.performanceTier === 'medium' ? 0.5 : 0.6;
      
      this.time += this.smoothTime * timeScale;
      
      // Generate particles occasionally, but less frequently on mobile/low performance
      const particleInterval = this.isMobile ? 1.2 : 
                               this.performanceTier === 'low' ? 1.0 : 0.5;
                               
      if (this.time - this.lastParticleGenTime > particleInterval) {
        if (this.mapRenderer) {
          // Reduce the number of particles generated on mobile/low performance
          const particleCount = this.isMobile ? 
            (this.performanceTier === 'low' ? 1 : 2) : 
            (this.performanceTier === 'low' ? 2 : 5);
            
          this.mapRenderer.generateRandomParticles(this.nodes, particleCount);
        }
        this.lastParticleGenTime = this.time;
      }
      
      // Render the map if we should render this frame
      if (this.mapRenderer) {
        this.mapRenderer.drawNodeNetwork(this.nodes, this.time);
      }
    }
    
    // Continue animation loop
    this.rafCallback = requestAnimationFrame(this.animate);
  }
  
  // Public method to update performance tier
  updatePerformanceTier(tier: PerformanceTier): void {
    this.performanceTier = tier;
    
    // Update frame throttling
    this.frameThrottle = this.isMobile ? 
      (tier === 'low' ? 4 : tier === 'medium' ? 2 : 1) : 
      (tier === 'low' ? 3 : 1);
      
    // Recreate nodes if needed for major performance changes
    if (this.ctx) {
      this.createNodes();
    }
  }
}
