
// Map appearance configuration based on usage context
export const getMapConfig = (isBackground: boolean) => {
  if (isBackground) {
    return {
      baseColor: "rgba(15, 36, 64, 0.1)", // Less transparent
      continentFillStart: "rgba(55, 125, 255, 0.3)", // Increased continent color intensity
      continentFillEnd: "rgba(30, 85, 170, 0.15)", // Increased continent color intensity
      gridColor: "rgba(55, 125, 255, 0.1)", // Brighter grid lines
      connectionColor: "rgba(255, 200, 100, 0.2)", // Brighter connection lines
      pointColor: "rgba(255, 200, 100, 0.4)", // Brighter points
      cityGlowStart: 'rgba(255, 200, 100, 0.2)', // Brighter city glow
      cityGlowEnd: 'rgba(255, 200, 100, 0)', 
      overlayOpacity: "0.02", // Slightly higher overlay opacity
      mobileGridSpacing: 45,  // Keep mobile grid spacing
      mobilePointSize: 1.2,   // Keep mobile point size
      mobileConnectionWidth: 0.4 // Keep mobile connection width
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
