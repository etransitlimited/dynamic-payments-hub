
import React from "react";

const GradientOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-20">
      {/* Further increased opacity and added a solid background color to ensure no background artifacts show through */}
      <div className="absolute inset-0 bg-[#061428] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] z-10"></div>
    </div>
  );
};

export default GradientOverlay;
