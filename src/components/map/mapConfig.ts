
// Map appearance configuration based on usage context
export const getMapConfig = (isBackground: boolean) => {
  if (isBackground) {
    return {
      baseColor: "rgba(15, 36, 64, 0)", // Completely transparent background
      continentFillStart: "rgba(205, 245, 255, 1)", // Extremely bright continents 
      continentFillEnd: "rgba(175, 235, 255, 0.97)", // Very bright continent fill
      gridColor: "rgba(215, 255, 255, 0.97)", // Super bright grid lines
      connectionColor: "rgba(255, 255, 185, 1)", // Extra bright connection lines
      pointColor: "rgba(255, 255, 255, 1)", // Bright white points
      cityGlowStart: 'rgba(255, 255, 185, 1)', // Fully opaque city glow
      cityGlowEnd: 'rgba(255, 255, 185, 0)', 
      overlayOpacity: "0.01", // Minimal overlay for maximum visibility
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
    return isMobile ? 0.00005 : 0.03; // Maximum animation speed for desktop
  }
  return isMobile ? 0.0001 : 0.0002;
};
