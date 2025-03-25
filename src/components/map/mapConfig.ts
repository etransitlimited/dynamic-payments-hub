
// Map appearance configuration based on usage context
export const getMapConfig = (isBackground: boolean) => {
  if (isBackground) {
    return {
      baseColor: "rgba(15, 36, 64, 0)", // Fully transparent background
      continentFillStart: "rgba(85, 145, 255, 0.95)", // Much more visible continent fill
      continentFillEnd: "rgba(50, 105, 190, 0.9)", // Much more visible continent fill
      gridColor: "rgba(85, 145, 255, 0.8)", // Much brighter grid lines
      connectionColor: "rgba(255, 220, 130, 0.95)", // Brighter connections
      pointColor: "rgba(255, 255, 255, 1)", // Bright white points for maximum visibility
      cityGlowStart: 'rgba(255, 220, 130, 1)', // Brighter city glow
      cityGlowEnd: 'rgba(255, 220, 130, 0)', 
      overlayOpacity: "0", // No overlay for better visibility
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
    return isMobile ? 0.00005 : 0.0005; // Faster animation for desktop background
  }
  return isMobile ? 0.0001 : 0.0002;
};
