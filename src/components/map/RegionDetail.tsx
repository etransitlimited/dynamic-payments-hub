
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { RegionData } from "./types";

interface RegionDetailProps {
  region: RegionData;
}

const RegionDetail: React.FC<RegionDetailProps> = ({ region }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
    >
      <Card className="bg-[#1A2A3F]/90 backdrop-blur-sm text-white border-blue-500/30 p-4 w-80">
        <h3 className="text-lg font-medium mb-2">{region.name}</h3>
        <div className="mb-3">
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
        <div className="text-xs text-blue-200">
          {t("clickMapForMoreRegions")}
        </div>
      </Card>
    </motion.div>
  );
};

export default RegionDetail;
