
import React from "react";
import { AlertCircle } from "lucide-react";

interface InformationBoxProps {
  message?: string;
  currentLanguage?: string;
}

const InformationBox: React.FC<InformationBoxProps> = ({ 
  message = "The transaction data is updated in real-time. For detailed reports, use the Export feature to download a comprehensive statement.",
  currentLanguage
}) => {
  return (
    <div 
      className="mt-6 p-4 bg-purple-900/20 border border-purple-600/20 rounded-xl text-purple-300 text-sm flex items-start gap-3"
      key={`info-box-${currentLanguage}-${Date.now()}`}
      data-language={currentLanguage}
    >
      <AlertCircle className="text-purple-400 h-5 w-5 flex-shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
};

export default InformationBox;
