
import React, { useMemo, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDepositTranslation } from "../i18n/deposit";
import { LanguageCode } from "@/utils/languageUtils";
import { Info, HelpCircle } from "lucide-react";

interface DepositInfoCardProps {
  paymentMethod: string;
  language: LanguageCode;
  forceUpdateKey?: number;
}

const DepositInfoCard: React.FC<DepositInfoCardProps> = ({ paymentMethod, language, forceUpdateKey }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language);
  const [componentKey, setComponentKey] = useState<string>(`deposit-info-${language}-${forceUpdateKey}`);
  
  // Update internal state when language prop changes
  useEffect(() => {
    if (language !== currentLanguage) {
      console.log(`DepositInfoCard language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
      setComponentKey(`deposit-info-${language}-${Date.now()}`);
    } else if (forceUpdateKey) {
      setComponentKey(`deposit-info-${language}-${forceUpdateKey}`);
    }
  }, [language, currentLanguage, forceUpdateKey]);
  
  // Helper function to get translations
  const t = (key: string): string => {
    return getDepositTranslation(key, currentLanguage);
  };
  
  // Get the appropriate info text based on payment method
  const infoText = useMemo(() => {
    if (!paymentMethod) return t("infoCredit");
    
    switch (paymentMethod) {
      case "alipay":
      case "wechat":
        return t("infoAlipayWechat");
      case "bank":
        return t("infoBank");
      case "overseasBank":
        return t("infoOverseasBank");
      case "platformTransfer":
        return t("infoPlatform");
      case "cryptoCurrency":
        return t("infoCrypto");
      default:
        return t("infoCredit");
    }
  }, [paymentMethod, currentLanguage]);
  
  return (
    <Card 
      key={componentKey}
      className="relative overflow-hidden border-purple-900/30 bg-gradient-to-br from-indigo-900/40 to-charcoal-dark shadow-xl hover:shadow-indigo-900/10 transition-all duration-300 h-full"
      data-language={currentLanguage}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-800/10 rounded-full blur-3xl translate-y-1/3 translate-x-1/4"></div>
      
      {/* Card content */}
      <CardHeader className="relative z-10 pb-3 bg-indigo-950/20 backdrop-blur-sm border-b border-indigo-800/20">
        <CardTitle className="text-white text-xl flex items-center">
          <span className="bg-indigo-500/30 p-2 rounded-lg mr-3 shadow-inner shadow-indigo-900/30">
            <Info size={20} className="text-indigo-200" />
          </span>
          {t("information")}
        </CardTitle>
        <CardDescription className="text-indigo-200/90 mt-1">
          {paymentMethod ? t(`${paymentMethod === 'wechat' ? 'wechatPay' : paymentMethod}`) : t("description")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6 py-6">
        <div className="space-y-4">
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-800/30">
            <p className="text-indigo-200 text-sm">{infoText}</p>
          </div>
          
          <div className="p-4 bg-indigo-900/30 rounded-lg border border-indigo-800/30">
            <p className="text-indigo-200 text-sm">{t("infoSupport")}</p>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
            <HelpCircle size={20} className="text-yellow-300 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-yellow-300 text-sm font-medium mb-1">{t("note")}</h4>
              <p className="text-yellow-200/80 text-xs">
                {t("infoCredit")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepositInfoCard;
