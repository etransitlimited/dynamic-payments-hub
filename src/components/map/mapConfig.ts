
// Map appearance configuration based on usage context
export const getMapConfig = (isBackground: boolean) => {
  if (isBackground) {
    return {
      baseColor: "rgba(15, 36, 64, 0)", // Fully transparent background
      continentFillStart: "rgba(55, 125, 255, 0.6)", // More visible continent fill
      continentFillEnd: "rgba(30, 85, 170, 0.5)", // More visible continent fill
      gridColor: "rgba(55, 125, 255, 0.4)", // Brighter grid lines
      connectionColor: "rgba(255, 200, 100, 0.6)", // Brighter connections
      pointColor: "rgba(255, 200, 100, 0.9)", // Brighter points
      cityGlowStart: 'rgba(255, 200, 100, 0.7)', // Brighter city glow
      cityGlowEnd: 'rgba(255, 200, 100, 0)', 
      overlayOpacity: "0.01", // Very subtle overlay
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
    return isMobile ? 0.00005 : 0.00025; // Faster for desktop background
  }
  return isMobile ? 0.0001 : 0.0002;
};
