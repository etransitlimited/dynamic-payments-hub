
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDepositTranslation } from "../i18n/deposit";
import { LanguageCode } from "@/utils/languageUtils";
import { toast } from "sonner";
import { Copy, Check, CreditCard, Globe2, Bitcoin } from "lucide-react";

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

  const getT = (key: string): string => {
    return getDepositTranslation(key, language);
  };

  // Format instructions by substituting placeholders
  const formatInstructions = (instructionKey: string): string => {
    try {
      let instructions = getT(instructionKey);
      return instructions.replace("{platformId}", platformId);
    } catch (error) {
      console.error("Error formatting instructions:", error);
      return getT(instructionKey) || "";
    }
  };

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
  const extractInformation = (text: string, searchTerm: string): string => {
    try {
      if (!text) return "";
      
      const lines = text.split("\n");
      const line = lines.find(line => line.includes(searchTerm));
      if (line) {
        const parts = line.split(":");
        if (parts.length > 1) {
          return parts.slice(1).join(":").trim();
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
        return <Globe2 size={20} className="text-blue-400" />;
      case "platformTransfer":
        return <CreditCard size={20} className="text-green-400" />;
      case "cryptoCurrency":
        return <Bitcoin size={20} className="text-amber-400" />;
      default:
        return <CreditCard size={20} className="text-purple-400" />;
    }
  };

  const renderInstructions = () => {
    console.log("Rendering instructions for payment method:", paymentMethod);
    
    switch (paymentMethod) {
      case "overseasBank": {
        const instructions = formatInstructions("overseasBankInstructions");
        console.log("Overseas bank instructions:", instructions);
        
        const accountNumber = extractInformation(instructions, "Compte") || 
                             extractInformation(instructions, "Account") || 
                             extractInformation(instructions, "账号") || 
                             extractInformation(instructions, "账户") || 
                             "1234-5678-9012-3456";
        const swiftCode = extractInformation(instructions, "Swift") || "GLBKUS12";
        
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
      }
      
      case "platformTransfer": {
        const instructions = formatInstructions("platformTransferInstructions");
        console.log("Platform transfer instructions:", instructions);
        
        const adminUser = extractInformation(instructions, "utilisateur") || 
                         extractInformation(instructions, "user") || 
                         extractInformation(instructions, "用户") || 
                         "ADMIN_FINANCE";
        
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
      }
      
      case "cryptoCurrency": {
        const instructions = formatInstructions("cryptoInstructions");
        console.log("Crypto instructions:", instructions);
        
        const btcAddress = extractInformation(instructions, "BTC:");
        const ethAddress = extractInformation(instructions, "ETH:");
        const usdtAddress = extractInformation(instructions, "USDT");
        
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
      }

      default:
        console.log("No matching payment method found:", paymentMethod);
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
