
// Map appearance configuration based on usage context
export const getMapConfig = (isBackground: boolean) => {
  if (isBackground) {
    return {
      baseColor: "rgba(15, 36, 64, 0)", // Completely transparent background
      continentFillStart: "rgba(255, 255, 255, 0.7)", // Lower brightness for better performance
      continentFillEnd: "rgba(220, 255, 255, 0.7)", // Lower brightness for better performance
      gridColor: "rgba(255, 255, 255, 0.5)", // Lower brightness for better performance
      connectionColor: "rgba(255, 255, 255, 0.5)", // Lower brightness for better performance
      pointColor: "rgba(255, 255, 255, 0.7)", // Lower brightness for better performance
      cityGlowStart: 'rgba(255, 255, 255, 0.7)', // Lower brightness for better performance
      cityGlowEnd: 'rgba(255, 255, 255, 0)', 
      overlayOpacity: "0", // No overlay at all for maximum visibility
      mobileGridSpacing: 50, // Larger spacing = fewer grid lines
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
    mobileGridSpacing: 50, // Larger spacing = fewer grid lines
    mobilePointSize: 1.5,
    mobileConnectionWidth: 0.5
  };
};

export const getAnimationSpeed = (isBackground: boolean, isMobile: boolean) => {
  if (isBackground) {
    return isMobile ? 0.00005 : 0.15; // Reduced animation speed for better performance
  }
  return isMobile ? 0.0001 : 0.0002;
};
