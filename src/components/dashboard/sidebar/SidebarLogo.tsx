
import React from "react";

interface SidebarLogoProps {
  logoSrc: string;
  logoAlt: string;
  title: string;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ logoSrc, logoAlt, title }) => {
  return (
    <div className="flex items-center">
      <img src={logoSrc} alt={logoAlt} className="h-8 w-auto" />
      <div className="ml-2 text-lg font-bold text-white">{title}</div>
    </div>
  );
};

export default SidebarLogo;
