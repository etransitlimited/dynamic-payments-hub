
import React from "react";
import { InfoIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface InformationBoxProps {
  className?: string;
}

const InformationBox: React.FC<InformationBoxProps> = ({ className = "" }) => {
  const { t } = useLanguage();
  
  return (
    <div className={`mt-6 p-4 rounded-lg border shadow-inner ${className}`}>
      <div className="flex items-start">
        <InfoIcon className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-indigo-100 font-medium mb-1">{t("wallet.depositRecords.infoTitle")}</h4>
          <p className="text-sm text-indigo-300/80">{t("wallet.depositRecords.infoDescription")}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationBox;
