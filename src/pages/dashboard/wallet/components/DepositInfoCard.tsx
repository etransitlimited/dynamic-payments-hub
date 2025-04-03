
import React, { memo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Info, CreditCard, Wallet, Banknote } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TranslatedText from "@/components/translation/TranslatedText";

interface DepositInfoCardProps {
  paymentMethod: string;
  language: string;
  forceUpdateKey: number;
}

const DepositInfoCard: React.FC<DepositInfoCardProps> = memo(({ 
  paymentMethod, 
  language, 
  forceUpdateKey 
}) => {
  
  // Select the info messages based on payment method
  const getInfoMessages = (): string[] => {
    const messages = ["wallet.deposit.infoCredit"];
    
    // Add payment-specific information
    if (paymentMethod === 'alipay' || paymentMethod === 'wechat') {
      messages.push("wallet.deposit.infoAlipayWechat");
    } else if (paymentMethod === 'bank') {
      messages.push("wallet.deposit.infoBank");
    } else if (paymentMethod === 'overseas_bank') {
      messages.push("wallet.deposit.infoOverseasBank");
    } else if (paymentMethod === 'platform') {
      messages.push("wallet.deposit.infoPlatform");
    } else if (paymentMethod === 'crypto') {
      messages.push("wallet.deposit.infoCrypto");
    }
    
    // Always add the support info
    messages.push("wallet.deposit.infoSupport");
    return messages;
  };
  
  const infoMessages = getInfoMessages();
  
  // Get the appropriate highlight message for the footer
  const getHighlightMessage = (): string => {
    if (paymentMethod === 'crypto') {
      return "wallet.deposit.infoCrypto";
    } else if (paymentMethod === 'overseas_bank') {
      return "wallet.deposit.infoOverseasBank";
    } else {
      return "wallet.deposit.infoCredit";
    }
  };

  // Icon selection based on payment method
  const getIcon = () => {
    switch(paymentMethod) {
      case 'alipay':
      case 'wechat':
        return <Wallet size={20} className="text-amber-300" />;
      case 'bank':
      case 'overseas_bank':
        return <Banknote size={20} className="text-amber-300" />;
      case 'platform':
      case 'crypto':
        return <CreditCard size={20} className="text-amber-300" />;
      default:
        return <Info size={20} className="text-amber-300" />;
    }
  };
  
  return (
    <Card 
      className="bg-gradient-to-br from-amber-900/30 to-amber-950/40 border-amber-800/40 overflow-hidden h-full shadow-lg relative transition-all duration-300 group"
      key={`info-card-${language}-${paymentMethod}-${forceUpdateKey}`}
      data-language={language}
    >
      {/* Improved background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-700/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
      
      <CardHeader className="relative z-10 pb-3 bg-amber-950/30 backdrop-blur-sm border-b border-amber-800/20">
        <CardTitle className="text-white flex items-center">
          <span className="bg-amber-500/30 p-2 rounded-lg mr-3 shadow-inner shadow-amber-900/30">
            {getIcon()}
          </span>
          <TranslatedText keyName="wallet.deposit.information" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 py-6 flex-grow">
        <ul className="space-y-4 text-amber-200/90 list-disc pl-5">
          {infoMessages.map((messageKey, index) => (
            <li key={`info-${index}-${language}-${forceUpdateKey}`} className="text-sm leading-relaxed">
              <TranslatedText keyName={messageKey} />
            </li>
          ))}
        </ul>
      </CardContent>
      
      {paymentMethod && (
        <CardFooter className="relative z-10 p-4 bg-amber-900/30 backdrop-blur-sm border-t border-amber-800/20">
          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2 mt-1.5"></div>
            <p className="text-xs text-amber-200/90">
              <TranslatedText keyName={getHighlightMessage()} />
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
});

DepositInfoCard.displayName = "DepositInfoCard";

export default DepositInfoCard;
