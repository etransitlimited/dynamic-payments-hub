
// Map appearance configuration based on usage context
export const getMapConfig = (isBackground: boolean) => {
  if (isBackground) {
    return {
      baseColor: "rgba(15, 36, 64, 0.05)", // 更加透明
      continentFillStart: "rgba(55, 125, 255, 0.2)", // 降低大陆颜色强度
      continentFillEnd: "rgba(30, 85, 170, 0.1)", // 降低大陆颜色强度
      gridColor: "rgba(55, 125, 255, 0.05)", // 更淡的网格线
      connectionColor: "rgba(255, 200, 100, 0.1)", // 更淡的连接线
      pointColor: "rgba(255, 200, 100, 0.3)", // 更淡的点
      cityGlowStart: 'rgba(255, 200, 100, 0.1)', // 更淡的城市光晕
      cityGlowEnd: 'rgba(255, 200, 100, 0)', 
      overlayOpacity: "0.01", // 极低的叠加透明度
      mobileGridSpacing: 45,  // 移动端更大的网格间距
      mobilePointSize: 1.2,   // 移动端稍小的点大小
      mobileConnectionWidth: 0.4 // 移动端更细的连接线
    };
  }
  // ... 保持原有的非背景配置不变
  return {
    baseColor: "rgba(15, 36, 64, 0.5)",
    continentFillStart: "rgba(55, 125, 255, 0.6)",
    continentFillEnd: "rgba(30, 85, 170, 0.4)",
    gridColor: "rgba(55, 125, 255, 0.15)",
    connectionColor: "rgba(255, 200, 100, 0.3)",
    pointColor: "rgba(255, 200, 100, 0.9)",
    cityGlowStart: 'rgba(255, 200, 100, 0.5)',
    cityGlowEnd: 'rgba(255, 200, 100, 0)',
    overlayOpacity: "0.05",
    mobileGridSpacing: 40,
    mobilePointSize: 1.5,
    mobileConnectionWidth: 0.5
  };
};

// ... 保持原有的动画速度配置不变
export const getAnimationSpeed = (isBackground: boolean, isMobile: boolean) => {
  if (isBackground) {
    return isMobile ? 0.00005 : 0.0001;
  }
  return isMobile ? 0.0001 : 0.0002;
};
