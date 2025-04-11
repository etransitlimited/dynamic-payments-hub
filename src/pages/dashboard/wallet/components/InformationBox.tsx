
import React from "react";
import { InfoIcon } from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";

interface InfoItem {
  text: string;
  url?: string;
}

interface InformationBoxProps {
  title: string;
  items: InfoItem[];
  currentLanguage: LanguageCode;
}

const InformationBox: React.FC<InformationBoxProps> = ({ title, items, currentLanguage }) => {
  return (
    <div 
      className="mt-4 p-4 bg-gradient-to-r from-blue-950/20 to-purple-950/30 border border-purple-900/30 rounded-lg text-purple-200/90"
      data-language={currentLanguage}
    >
      <div className="flex items-start">
        <InfoIcon className="h-5 w-5 mr-2 text-purple-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-purple-200">{title}</h4>
          <ul className="mt-1 space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-sm">
                {item.url ? (
                  <a href={item.url} className="text-purple-400 hover:text-purple-300 underline">
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformationBox;
