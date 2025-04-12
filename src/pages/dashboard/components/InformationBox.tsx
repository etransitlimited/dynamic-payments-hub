
import React from "react";
import { LanguageCode } from "@/utils/languageUtils";
import { AlertTriangle } from "lucide-react";

interface InformationItem {
  text: string;
  icon?: React.ReactNode;
}

interface InformationBoxProps {
  title: string;
  items: InformationItem[];
  currentLanguage: string;
}

const InformationBox: React.FC<InformationBoxProps> = ({ 
  title, 
  items,
  currentLanguage 
}) => {
  return (
    <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
      <ul className="space-y-2 text-blue-100">
        {items.map((item, index) => (
          <li key={`info-item-${index}-${currentLanguage}`} className="flex items-start gap-2">
            <span>•</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InformationBox;
