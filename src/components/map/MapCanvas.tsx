
import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { getMapConfig, getAnimationSpeed } from "./mapConfig";
import { drawBaseMap, drawCityMarkers, drawConnections, drawOverlay } from "./mapRenders";

interface MapCanvasProps {
  width: number;
  height: number;
  onClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  isBackground?: boolean;
}

const MapCanvas: React.FC<MapCanvasProps> = ({ 
  width, 
  height, 
  onClick, 
  isBackground = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();

  // 绘制带动画的地图
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 设置画布尺寸以匹配容器
    canvas.width = width;
    canvas.height = height;

    // 根据使用环境获取配置
    const config = getMapConfig(isBackground);
    const animationSpeed = getAnimationSpeed(isBackground, isMobile);

    // 绘制动画帧的函数
    const draw = (timestamp = performance.now()) => {
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制底图（大陆、网格）
      drawBaseMap(ctx, canvas, config, isMobile);
      
      // 绘制城市标记
      drawCityMarkers(ctx, canvas, config, isMobile);
      
      // 绘制动画连接线
      drawConnections(ctx, canvas, config, animationSpeed, timestamp, isMobile);
      
      // 仅对背景添加轻微叠加层的"轨迹"效果
      if (isBackground) {
        drawOverlay(ctx, canvas, config);
      }
      
      // 请求下一帧
      animationRef.current = requestAnimationFrame(draw);
    };
    
    // 启动动画
    draw();
    
    // 清理
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, isBackground, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      onClick={onClick}
      className="w-full h-full"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 50,
        opacity: 1
      }}
    />
  );
};

export default MapCanvas;
