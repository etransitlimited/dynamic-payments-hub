
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "@/components/OptimizedImage";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarLogoProps {
  isCollapsed: boolean;
}

const SidebarLogo = ({ isCollapsed }: SidebarLogoProps) => {
  const { t } = useLanguage();

  return (
    <div className={`${isCollapsed ? "w-8" : "w-32"} h-8 relative transition-all duration-200`}>
      <AspectRatio ratio={isCollapsed ? 1 : 3 / 0.8}>
        <OptimizedImage
          src="/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png"
          alt={t("sidebar.logo")}
          className="object-contain"
          priority={true}
        />
      </AspectRatio>
    </div>
  );
};

export default SidebarLogo;
