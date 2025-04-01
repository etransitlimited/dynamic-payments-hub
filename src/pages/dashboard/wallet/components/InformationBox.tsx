
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/translationUtils";

const InformationBox: React.FC = () => {
  // Get language context, with fallback mechanism
  const languageContext = useLanguage();
  
  // Create a safe translation function that works even if the context is missing
  const safeTranslate = (key: string): string => {
    if (languageContext && typeof languageContext.t === 'function') {
      return languageContext.t(key);
    }
    // Fallback to direct translation if context is missing
    return getTranslation(key, 'en');
  };
  
  return (
    <Card className="border border-amber-800/30 bg-gradient-to-br from-amber-950/30 to-amber-900/20 overflow-hidden rounded-xl shadow-lg hover:shadow-amber-900/20 transition-shadow duration-300 relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      
      <CardHeader className="pb-3 relative z-10 bg-amber-950/30 backdrop-blur-sm">
        <CardTitle className="text-white flex items-center">
          <span className="bg-amber-500/30 p-2 rounded-full mr-2">
            <AlertCircle size={18} className="text-amber-300" />
          </span>
          {safeTranslate("wallet.depositRecords.infoTitle")}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 py-6 bg-amber-950/10 backdrop-blur-sm">
        <p className="text-amber-200/90 text-sm leading-relaxed">
          {safeTranslate("wallet.depositRecords.infoDescription")}
        </p>
      </CardContent>
    </Card>
  );
};

export default InformationBox;
