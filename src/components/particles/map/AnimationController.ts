
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
  
  constructor(canvasRef: React.RefObject<HTMLCanvasElement>, isMobile: boolean) {
    this.canvasRef = canvasRef;
    this.isMobile = isMobile;
  }
  
  init(): void {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;
    
    this.handleResize();
    this.createNodes();
    
    window.addEventListener('resize', this.handleResize);
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
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    
    this.createNodes();
  }
  
  private createNodes(): void {
    const canvas = this.canvasRef.current;
    if (!canvas || !this.ctx) return;
    
    const nodeCount = this.isMobile ? 120 : 250;
    this.nodeGenerator = new NodeGenerator(this.isMobile, canvas.width, canvas.height);
    this.nodes = this.nodeGenerator.generateNodes(nodeCount);
    this.mapRenderer = new MapRenderer(this.ctx, canvas.width, canvas.height, this.isMobile);
  }
  
  private animate = (): void => {
    // Increment time for animations
    this.time += 0.015;
    
    // Render the map
    if (this.mapRenderer) {
      this.mapRenderer.drawNodeNetwork(this.nodes, this.time);
    }
    
    // Continue animation loop
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
}
