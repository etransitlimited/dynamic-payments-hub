
import { MapNode } from "./types";
import MapRenderer from "./MapRenderer";
import NodeGenerator from "./NodeGenerator";

export default class AnimationController {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number = 0;
  private time: number = 0;
  private nodes: MapNode[] = [];
  private nodeGenerator: NodeGenerator | null = null;
  private mapRenderer: MapRenderer | null = null;
  private isMobile: boolean;
  private lastParticleGenTime: number = 0;
  private lastFrameTime: number = 0;
  private frameThrottle: number = 1; // Default: render every frame
  
  constructor(canvasRef: React.RefObject<HTMLCanvasElement>, isMobile: boolean) {
    this.canvasRef = canvasRef;
    this.isMobile = isMobile;
    this.frameThrottle = isMobile ? 2 : 1; // Skip every other frame on mobile
  }
  
  init(): void {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    this.ctx = canvas.getContext('2d', { alpha: true });
    if (!this.ctx) return;
    
    this.handleResize();
    this.createNodes();
    
    window.addEventListener('resize', this.handleResize);
    this.lastFrameTime = performance.now();
    this.animate();
  }
  
  cleanup(): void {
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.animationFrameId);
  }
  
  private handleResize = (): void => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    const { innerWidth, innerHeight } = window;
    
    // Use device pixel ratio for sharper rendering on high DPI screens
    const dpr = window.devicePixelRatio || 1;
    
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
    
    // Reduce node count for mobile devices
    const nodeCount = this.isMobile ? 80 : 250;
    
    // Initialize with canvas display size, not actual pixel size
    const displayWidth = parseInt(canvas.style.width || '0', 10) || canvas.width;
    const displayHeight = parseInt(canvas.style.height || '0', 10) || canvas.height;
    
    this.nodeGenerator = new NodeGenerator(this.isMobile, displayWidth, displayHeight);
    this.nodes = this.nodeGenerator.generateNodes(nodeCount);
    this.mapRenderer = new MapRenderer(this.ctx, displayWidth, displayHeight, this.isMobile);
  }
  
  private shouldRenderFrame(): boolean {
    // Always render if frameThrottle is 1
    if (this.frameThrottle === 1) return true;
    
    // Check if we should skip this frame based on the throttle value
    return this.animationFrameId % this.frameThrottle === 0;
  }
  
  private animate = (): void => {
    // Calculate delta time for smoother animations across different devices
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convert to seconds
    this.lastFrameTime = currentTime;
    
    // Only increment time if we're going to render
    if (this.shouldRenderFrame()) {
      // Use deltaTime to make animations consistent regardless of frame rate
      // But cap it to prevent large jumps after tab was inactive
      const cappedDelta = Math.min(deltaTime, 0.05);
      this.time += cappedDelta * 0.6; // Slow down the time increment a bit
      
      // Generate particles occasionally, but less frequently on mobile
      const particleInterval = this.isMobile ? 0.8 : 0.5;
      if (this.time - this.lastParticleGenTime > particleInterval) {
        if (this.mapRenderer) {
          // Reduce the number of particles generated on mobile
          const particleCount = this.isMobile ? 2 : 5;
          this.mapRenderer.generateRandomParticles(this.nodes, particleCount);
        }
        this.lastParticleGenTime = this.time;
      }
      
      // Render the map if we should render this frame
      if (this.mapRenderer) {
        // Measure memory usage before render (optional, for debugging)
        // console.log('Memory usage:', window.performance?.memory?.usedJSHeapSize / (1024 * 1024) + ' MB');
        
        this.mapRenderer.drawNodeNetwork(this.nodes, this.time);
      }
    }
    
    // Continue animation loop
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
}
