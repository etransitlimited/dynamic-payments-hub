
import React, { memo } from "react";
import { InfoIcon } from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";

interface InformationBoxProps {
  message: string;
  currentLanguage: LanguageCode;
}

const InformationBox: React.FC<InformationBoxProps> = memo(({ 
  message,
  currentLanguage
}) => {
  return (
    <div 
      className="flex items-start gap-2 mt-6 p-3 rounded-lg bg-blue-900/20 border border-blue-900/30 text-xs text-blue-200/80"
      data-language={currentLanguage}
    >
      <InfoIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
});

InformationBox.displayName = "InformationBox";

export default InformationBox;
