
// Map appearance configuration based on usage context
export const getMapConfig = (isBackground: boolean) => {
  if (isBackground) {
    return {
      baseColor: "rgba(15, 36, 64, 0)", // Completely transparent background
      continentFillStart: "rgba(175, 225, 255, 1)", // Extremely bright continents
      continentFillEnd: "rgba(145, 210, 255, 0.97)", // Very bright continent fill
      gridColor: "rgba(195, 235, 255, 0.97)", // Extra bright grid lines
      connectionColor: "rgba(255, 245, 170, 1)", // Extra bright connection lines
      pointColor: "rgba(255, 255, 255, 1)", // Bright white points
      cityGlowStart: 'rgba(255, 245, 170, 1)', // Fully opaque city glow
      cityGlowEnd: 'rgba(255, 245, 170, 0)', 
      overlayOpacity: "0", // No overlay to maximize visibility
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
    return isMobile ? 0.00005 : 0.0075; // Adjusted for better desktop background animation
  }
  return isMobile ? 0.0001 : 0.0002;
};
