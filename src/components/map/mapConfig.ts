// Map appearance configuration based on usage context
export const getMapConfig = (isBackground: boolean) => {
  if (isBackground) {
    return {
      baseColor: "rgba(15, 36, 64, 0.1)",
      continentFillStart: "rgba(55, 125, 255, 0.5)",
      continentFillEnd: "rgba(30, 85, 170, 0.4)",
      gridColor: "rgba(55, 125, 255, 0.15)",
      connectionColor: "rgba(255, 200, 100, 0.3)",
      pointColor: "rgba(255, 200, 100, 0.8)",
      cityGlowStart: 'rgba(255, 200, 100, 0.5)',
      cityGlowEnd: 'rgba(255, 200, 100, 0)',
      overlayOpacity: "0.02"
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
    overlayOpacity: "0.05"
  };
};

// Animation speed configuration based on device and usage
export const getAnimationSpeed = (isBackground: boolean, isMobile: boolean) => {
  if (isBackground) {
    return isMobile ? 0.00005 : 0.0001;
  }
  return isMobile ? 0.0001 : 0.0002;
};
