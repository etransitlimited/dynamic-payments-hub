
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDepositTranslation } from "../i18n/deposit";
import { LanguageCode } from "@/utils/languageUtils";
import TranslatedText from "@/components/translation/TranslatedText";

interface DepositInfoCardProps {
  paymentMethod: string;
  language: LanguageCode;
  forceUpdateKey: number;
}

const DepositInfoCard: React.FC<DepositInfoCardProps> = ({ 
  paymentMethod, 
  language,
  forceUpdateKey
}) => {
  // Helper function to get translations
  const t = (key: string): string => {
    return getDepositTranslation(key, language);
  };
  
  // Get the appropriate info text based on payment method
  const getInfoText = () => {
    switch (paymentMethod) {
      case 'alipay':
      case 'wechat':
        return <TranslatedText keyName="wallet.deposit.infoAlipayWechat" />;
      case 'bank':
        return <TranslatedText keyName="wallet.deposit.infoBank" />;
      case 'overseas_bank':
        return <TranslatedText keyName="wallet.deposit.infoOverseasBank" />;
      case 'platform':
        return <TranslatedText keyName="wallet.deposit.infoPlatform" />;
      case 'crypto':
        return <TranslatedText keyName="wallet.deposit.infoCrypto" />;
      default:
        return <TranslatedText keyName="wallet.deposit.infoCredit" />;
    }
  };

  return (
    <Card 
      className="relative overflow-hidden border-purple-900/30 bg-gradient-to-br from-purple-900/40 to-charcoal-dark shadow-xl hover:shadow-purple-900/10 transition-all duration-300 h-full"
      key={`deposit-info-${language}-${forceUpdateKey}`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600"></div>
      
      <CardHeader className="relative z-10 pb-3 pt-6 bg-purple-950/20 backdrop-blur-sm border-b border-purple-800/20">
        <CardTitle className="text-white text-xl">
          <TranslatedText keyName="wallet.deposit.information" className="text-white" />
        </CardTitle>
        <CardDescription className="text-purple-200/90 mt-1">
          {paymentMethod ? getInfoText() : <TranslatedText keyName="wallet.deposit.infoCredit" />}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6 py-6 text-purple-200">
        <ul className="space-y-3 list-disc pl-5">
          <li>
            <TranslatedText keyName="wallet.deposit.infoAlipayWechat" />
          </li>
          <li>
            <TranslatedText keyName="wallet.deposit.infoBank" />
          </li>
          <li>
            <TranslatedText keyName="wallet.deposit.infoOverseasBank" />
          </li>
          <li>
            <TranslatedText keyName="wallet.deposit.infoPlatform" />
          </li>
          <li>
            <TranslatedText keyName="wallet.deposit.infoCrypto" />
          </li>
        </ul>
        
        <div className="pt-4 mt-4 border-t border-purple-800/30">
          <p className="text-sm text-purple-300/80">
            <TranslatedText keyName="wallet.deposit.infoSupport" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepositInfoCard;
