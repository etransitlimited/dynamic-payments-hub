
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, FileText, CreditCard, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ApplicationGuideCard = () => {
  const { t } = useLanguage();
  
  // Get guide items directly from translations
  const guideItems = t("cards.apply.guideItems");
  
  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            <Info size={18} className="text-blue-400" />
          </span>
          {t("cards.apply.applicationGuide")}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 space-y-5">
        <div>
          <h4 className="text-blue-200 font-medium text-sm mb-2 flex items-center">
            <Check className="h-4 w-4 mr-1.5 text-blue-400" />
            {t("cards.apply.applicationRequirements") || "Application Requirements"}
          </h4>
          <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
            {Array.isArray(guideItems) ? (
              guideItems.map((item, index) => (
                <li key={`req-${index}`}>{item}</li>
              ))
            ) : (
              // Fallback items if translations don't return an array
              [
                t("cards.apply.guideItems.0") || "Please ensure all personal information is accurate",
                t("cards.apply.guideItems.1") || "ID information will be used for identity verification",
                t("cards.apply.guideItems.2") || "Application review usually takes 1-3 business days",
                t("cards.apply.guideItems.3") || "Card will be shipped within 5-7 business days after approval",
                t("cards.apply.guideItems.4") || "First-time application is free of processing fees"
              ].map((item, index) => (
                <li key={`req-${index}`}>{item}</li>
              ))
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationGuideCard;
