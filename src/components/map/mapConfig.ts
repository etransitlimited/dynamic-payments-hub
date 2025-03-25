
// Map appearance configuration based on usage context
export const getMapConfig = (isBackground: boolean) => {
  if (isBackground) {
    return {
      baseColor: "rgba(15, 36, 64, 0)", // 完全透明背景
      continentFillStart: "rgba(85, 145, 255, 1)", // 提高到完全不透明
      continentFillEnd: "rgba(50, 105, 190, 0.95)", // 提高大陆填充可见度
      gridColor: "rgba(85, 145, 255, 0.9)", // 更亮的网格线
      connectionColor: "rgba(255, 220, 130, 1)", // 更亮的连接线
      pointColor: "rgba(255, 255, 255, 1)", // 明亮的白色点
      cityGlowStart: 'rgba(255, 220, 130, 1)', // 更亮的城市光晕
      cityGlowEnd: 'rgba(255, 220, 130, 0)', 
      overlayOpacity: "0", // 无叠加层以提高可见度
      mobileGridSpacing: 45,
      mobilePointSize: 1.2,
      mobileConnectionWidth: 0.4
    };
  }
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

export const getAnimationSpeed = (isBackground: boolean, isMobile: boolean) => {
  if (isBackground) {
    return isMobile ? 0.00005 : 0.001; // 加快桌面背景的动画
  }
  return isMobile ? 0.0001 : 0.0002;
};
