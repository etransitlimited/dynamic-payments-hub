
import React, { lazy, Suspense } from "react";
import GradientOverlay from "./particles/GradientOverlay";
import { useIsMobile } from "@/hooks/use-mobile";

// 正确地懒加载非关键组件
const ParticlesLayer = lazy(() => import("./particles/ParticlesLayer").then(module => ({ default: module.default })));
const WorldMap = lazy(() => import("./WorldMap").then(module => ({ default: module.default })));

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 粒子背景层 - 懒加载 */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Suspense fallback={<div className={`${isMobile ? 'bg-[#051324]' : 'bg-[#061428]'} w-full h-full`} />}>
          <ParticlesLayer />
        </Suspense>
      </div>
      
      {/* 渐变叠加层 - 在移动设备上更深色以提高对比度 */}
      <GradientOverlay isMobile={isMobile} />
      
      {/* 世界地图仅在桌面显示 - 懒加载 */}
      {!isMobile && (
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Suspense fallback={<div />}>
            <WorldMap />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ParticlesBackground;
