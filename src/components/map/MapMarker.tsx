
import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { RegionData } from "./types";

interface MapMarkerProps {
  region: RegionData;
  isSelected: boolean;
  onClick: () => void;
  screenPosition: {
    left: string;
    top: string;
  };
}

const MapMarker: React.FC<MapMarkerProps> = ({ 
  region, 
  isSelected, 
  onClick, 
  screenPosition 
}) => {
  const { t } = useLanguage();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
            isSelected 
              ? "bg-primary scale-150 z-20" 
              : "bg-blue-400 hover:bg-blue-300 z-10"
          }`}
          style={{
            left: screenPosition.left,
            top: screenPosition.top,
            transform: "translate(-50%, -50%)",
          }}
          onClick={onClick}
        />
      </HoverCardTrigger>
      <HoverCardContent className="w-64 p-0">
        <Card className="bg-[#1A2A3F] text-white border-blue-500/30 overflow-hidden">
          <h3 className="p-3 font-medium text-lg border-b border-blue-500/30">{region.name}</h3>
          <div className="p-3">
            <h4 className="text-sm text-blue-300 mb-2">{t("supportedMerchants")}</h4>
            <div className="flex flex-wrap gap-2">
              {region.merchants.map((merchant, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-1 bg-blue-900/50 rounded-md text-xs"
                >
                  {merchant}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MapMarker;
