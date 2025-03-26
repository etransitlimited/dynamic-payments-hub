
import { MapNode, Region, worldRegions } from "./types";

export default class NodeGenerator {
  private isMobile: boolean;
  private canvasWidth: number;
  private canvasHeight: number;
  
  constructor(isMobile: boolean, canvasWidth: number, canvasHeight: number) {
    this.isMobile = isMobile;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }
  
  generateNodes(nodeCount: number): MapNode[] {
    const nodes: MapNode[] = [];
    let nodeIdx = 0;
    
    worldRegions.forEach(region => {
      const regionNodeCount = Math.floor(nodeCount * region.density / worldRegions.reduce((sum, r) => sum + r.density, 0));
      
      for (let i = 0; i < regionNodeCount; i++) {
        // Add slight randomness to node distribution
        const jitterX = Math.random() * 2 - 1; // -1 to 1
        const jitterY = Math.random() * 2 - 1; // -1 to 1
        
        const x = region.x[0] + Math.random() * (region.x[1] - region.x[0]) + jitterX;
        const y = region.y[0] + Math.random() * (region.y[1] - region.y[0]) + jitterY;
        
        // Enhanced color variations with more vibrant blues and cyans
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
    
    this.createNodeConnections(nodes);
    return nodes;
  }
  
  private createNodeConnections(nodes: MapNode[]): void {
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
          const dx = (node.x - otherNode.x) / 100 * this.canvasWidth;
          const dy = (node.y - otherNode.y) / 100 * this.canvasHeight;
          const distance = Math.sqrt(dx * dx + dy * dy);
          distances.push({ index: otherIdx, distance });
        }
      });
      
      // Sort by distance and take the closest ones
      distances.sort((a, b) => a.distance - b.distance);
      
      // Connection range is larger for land nodes
      const connectionRange = isLargeNode ? 
        (this.isMobile ? 250 : 350) : // Increased range for land
        (this.isMobile ? 150 : 250);  // Smaller range for ocean
        
      node.connections = distances
        .slice(0, connectionCount)
        .filter(d => d.distance < connectionRange)
        .map(d => d.index);
    });
  }
}
