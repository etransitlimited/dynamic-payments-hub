
import React, { useEffect, useState } from "react";
import MapCanvas from "./map/MapCanvas";

const WorldMap: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize(); // 初始化尺寸
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="WorldMap relative w-full h-full overflow-hidden" style={{ zIndex: 50 }}>
      <MapCanvas 
        width={dimensions.width}
        height={dimensions.height}
        onClick={() => {}} // 空点击处理器
        isBackground={true} // 指示这是作为背景使用
      />
    </div>
  );
};

export default WorldMap;
