
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDepositTranslation } from "../i18n/deposit";
import { LanguageCode } from "@/utils/languageUtils";
import { toast } from "sonner";
import { Copy, Check, CreditCard, Globe, Bitcoin } from "lucide-react";
import PaymentMethodIcon from "./PaymentMethodIcon";

interface PaymentInstructionCardProps {
  paymentMethod: string;
  language: LanguageCode;
  platformId: string;
  amount: number;
}

const PaymentInstructionCard: React.FC<PaymentInstructionCardProps> = ({
  paymentMethod,
  language,
  platformId,
  amount
}) => {
  const [copying, setCopying] = useState<Record<string, boolean>>({});
  const [instructions, setInstructions] = useState<string>("");

  // Get translation helper
  const getT = (key: string): string => {
    return getDepositTranslation(key, language);
  };

  // Format instructions by substituting placeholders when component mounts or props change
  useEffect(() => {
    if (paymentMethod) {
      let key = "";
      switch (paymentMethod) {
        case "overseasBank":
          key = "overseasBankInstructions";
          break;
        case "platformTransfer":
          key = "platformTransferInstructions";
          break;
        case "cryptoCurrency":
          key = "cryptoInstructions";
          break;
        default:
          key = "";
      }
      
      if (key) {
        try {
          let instructionText = getT(key);
          // Replace any placeholders in the instructions
          instructionText = instructionText.replace("{platformId}", platformId);
          setInstructions(instructionText);
        } catch (error) {
          console.error("Error formatting instructions:", error);
          setInstructions("");
        }
      }
    }
  }, [paymentMethod, language, platformId]);

  // Copy text to clipboard with feedback
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopying((prev) => ({ ...prev, [label]: true }));
        toast.success(getT("copied"), {
          description: label,
          duration: 2000,
        });
        
        setTimeout(() => {
          setCopying((prev) => ({ ...prev, [label]: false }));
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Copy failed");
      }
    );
  };

  // Extract specific information from instructions text
  const extractInformation = (text: string, searchTerms: string[]): string => {
    try {
      if (!text) return "";
      
      const lines = text.split("\n");
      for (const searchTerm of searchTerms) {
        const line = lines.find(line => line.toLowerCase().includes(searchTerm.toLowerCase()));
        if (line) {
          const parts = line.split(":");
          if (parts.length > 1) {
            return parts.slice(1).join(":").trim();
          }
        }
      }
      return "";
    } catch (error) {
      console.error("Error extracting information:", error);
      return "";
    }
  };

  const getPaymentIcon = () => {
    switch(paymentMethod) {
      case "overseasBank":
        return <Globe size={20} className="text-purple-400" />;
      case "platformTransfer":
        return <CreditCard size={20} className="text-green-400" />;
      case "cryptoCurrency":
        return <Bitcoin size={20} className="text-orange-400" />;
      default:
        return <PaymentMethodIcon method={paymentMethod} size={20} />;
    }
  };

  const renderOverseasBankInstructions = () => {
    const accountNumber = extractInformation(instructions, ["compte", "account", "账号", "账户", "賬號"]);
    const swiftCode = extractInformation(instructions, ["swift", "code swift", "代码", "代碼"]);
    
    return (
      <div className="space-y-4">
        <div className="rounded-md bg-blue-950/40 border border-blue-900/40 p-4 text-sm whitespace-pre-wrap">
          {instructions}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="bg-blue-900/30 border-blue-800/50 hover:bg-blue-800/50 text-white"
            onClick={() => copyToClipboard(instructions, getT("copyAll"))}
          >
            {copying["copyAll"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copyAll")}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-blue-900/30 border-blue-800/50 hover:bg-blue-800/50 text-white"
            onClick={() => copyToClipboard(accountNumber, getT("copyAccount"))}
          >
            {copying["copyAccount"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copyAccount")}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-blue-900/30 border-blue-800/50 hover:bg-blue-800/50 text-white"
            onClick={() => copyToClipboard(swiftCode, getT("copySwift"))}
          >
            {copying["copySwift"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copySwift")}
          </Button>
        </div>
      </div>
    );
  };
  
  const renderPlatformTransferInstructions = () => {
    const adminUser = extractInformation(instructions, ["utilisateur", "user", "用户", "用戶", "admin"]);
    
    return (
      <div className="space-y-4">
        <div className="rounded-md bg-green-950/40 border border-green-900/40 p-4 text-sm whitespace-pre-wrap">
          {instructions}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="bg-green-900/30 border-green-800/50 hover:bg-green-800/50 text-white"
            onClick={() => copyToClipboard(instructions, getT("copyAll"))}
          >
            {copying["copyAll"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copyAll")}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-green-900/30 border-green-800/50 hover:bg-green-800/50 text-white"
            onClick={() => copyToClipboard(platformId, getT("copyPlatformId"))}
          >
            {copying["copyPlatformId"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copyPlatformId")}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-green-900/30 border-green-800/50 hover:bg-green-800/50 text-white"
            onClick={() => copyToClipboard(adminUser, getT("copyAdmin"))}
          >
            {copying["copyAdmin"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copyAdmin")}
          </Button>
        </div>
      </div>
    );
  };
  
  const renderCryptoInstructions = () => {
    const btcAddress = extractInformation(instructions, ["btc:"]);
    const ethAddress = extractInformation(instructions, ["eth:"]);
    const usdtAddress = extractInformation(instructions, ["usdt"]);
    
    return (
      <div className="space-y-4">
        <div className="rounded-md bg-amber-950/40 border border-amber-900/40 p-4 text-sm whitespace-pre-wrap">
          {instructions}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="bg-amber-900/30 border-amber-800/50 hover:bg-amber-800/50 text-white"
            onClick={() => copyToClipboard(instructions, getT("copyAll"))}
          >
            {copying["copyAll"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copyAll")}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-amber-900/30 border-amber-800/50 hover:bg-amber-800/50 text-white"
            onClick={() => copyToClipboard(btcAddress, getT("copyBTC"))}
          >
            {copying["copyBTC"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copyBTC")}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-amber-900/30 border-amber-800/50 hover:bg-amber-800/50 text-white"
            onClick={() => copyToClipboard(ethAddress, getT("copyETH"))}
          >
            {copying["copyETH"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copyETH")}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-amber-900/30 border-amber-800/50 hover:bg-amber-800/50 text-white"
            onClick={() => copyToClipboard(usdtAddress, getT("copyUSDT"))}
          >
            {copying["copyUSDT"] ? (
              <Check size={16} className="mr-2 text-green-400" />
            ) : (
              <Copy size={16} className="mr-2" />
            )}
            {getT("copyUSDT")}
          </Button>
        </div>
      </div>
    );
  };

  const renderInstructions = () => {
    if (!paymentMethod || !instructions) {
      return <p className="text-gray-400">{getT("selectPaymentMethod")}</p>;
    }
    
    switch (paymentMethod) {
      case "overseasBank":
        return renderOverseasBankInstructions();
      case "platformTransfer":
        return renderPlatformTransferInstructions();
      case "cryptoCurrency":
        return renderCryptoInstructions();
      default:
        return <p className="text-gray-400">{getT("selectPaymentMethod")}</p>;
    }
  };

  // Return null if no payment method is selected
  if (!paymentMethod) {
    return null;
  }

  return (
    <Card className="border-purple-900/30 bg-charcoal-light/50 backdrop-blur-md shadow-lg">
      <CardHeader className="pb-3 bg-indigo-950/40 backdrop-blur-sm border-b border-indigo-800/20">
        <CardTitle className="text-white text-lg flex items-center">
          <span className="bg-indigo-500/30 p-2 rounded-lg mr-3 shadow-inner shadow-indigo-900/30 flex items-center justify-center">
            {getPaymentIcon()}
          </span>
          {getT("paymentInstructions")}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {renderInstructions()}
      </CardContent>
    </Card>
  );
};

export default PaymentInstructionCard;
