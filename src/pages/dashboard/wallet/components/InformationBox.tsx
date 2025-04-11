
import React, { memo } from "react";
import { InfoIcon } from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";

interface InformationBoxProps {
  title?: string;
  items?: { text: string }[];
  message?: string;
  currentLanguage: LanguageCode;
}

const InformationBox: React.FC<InformationBoxProps> = memo(({ 
  title,
  items = [],
  message,
  currentLanguage
}) => {
  // If message is provided, convert it to title and items format
  const displayTitle = title || (message ? "Information" : "");
  const displayItems = items.length > 0 ? items : message ? [{ text: message }] : [];

  return (
    <div className="bg-charcoal-dark rounded-lg border border-purple-900/30 overflow-hidden shadow-lg">
      <div className="p-4 border-b border-purple-900/30 bg-charcoal-light/30">
        <h3 className="flex items-center text-base font-medium">
          <InfoIcon className="h-5 w-5 mr-2 text-blue-400" />
          {displayTitle}
        </h3>
      </div>
      <div className="p-4">
        <ul className="space-y-3 text-sm">
          {displayItems.map((item, index) => (
            <li key={`info-item-${index}`} className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
              <span className="text-blue-200/90">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

InformationBox.displayName = "InformationBox";

export default InformationBox;
