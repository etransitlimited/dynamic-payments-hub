
import React, { useState } from "react";
import { Check, Copy, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LanguageCode } from "@/utils/languageUtils";
import { getDepositTranslation } from "../i18n/deposit";

interface PaymentInstructionCardProps {
  paymentMethod: string;
  language: LanguageCode;
  platformId?: string;
  amount?: number;
}

const PaymentInstructionCard: React.FC<PaymentInstructionCardProps> = ({
  paymentMethod,
  language,
  platformId = "USER12345",
  amount = 0
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  const t = (key: string): string => {
    return getDepositTranslation(key, language);
  };

  // Get formatted instructions based on payment method
  const getFormattedInstructions = () => {
    if (!paymentMethod || amount <= 0) return { content: "", copyValues: {} };
    
    const serviceFee = amount * 0.02;
    const totalAmount = amount + serviceFee;
    const formattedTotal = totalAmount.toFixed(2);
    
    switch (paymentMethod) {
      case "overseasBank": {
        const bankName = "Global Banking Corp.";
        const accountNumber = "1234-5678-9012-3456";
        const beneficiary = "Trading Platform Inc.";
        const swiftCode = "GLBKUS12";
        
        // Format for finance department sharing
        const formattedForFinance = `
${t("totalAmount")}: $${formattedTotal}
${t("paymentInstructions")}:
${t("overseasBankInstructions").split("\n").join("\n")}
        `.trim();
        
        return {
          content: t("overseasBankInstructions"),
          copyValues: {
            bankInfo: formattedForFinance,
            accountNumber,
            beneficiary,
            swiftCode
          }
        };
      }
      case "platformTransfer": {
        // Format for finance department sharing
        const formattedForFinance = `
${t("totalAmount")}: $${formattedTotal}
${t("paymentInstructions")}:
${t("platformTransferInstructions").replace("{platformId}", platformId)}
        `.trim();
        
        return {
          content: t("platformTransferInstructions").replace("{platformId}", platformId),
          copyValues: {
            platformInfo: formattedForFinance,
            platformId,
            adminUser: "ADMIN_FINANCE"
          }
        };
      }
      case "cryptoCurrency": {
        const btcAddress = "bc1q9vz7mg89hrunvp97jr892n0jn85tgc8cmz7kve";
        const ethAddress = "0x1234567890abcdef1234567890abcdef12345678";
        const usdtAddress = "TXo4VDGcP8yGfpjy7VL7NK3ued4difKolo";
        
        // Format for finance department sharing
        const formattedForFinance = `
${t("totalAmount")}: $${formattedTotal}
${t("paymentInstructions")}:
${t("cryptoInstructions")}
        `.trim();
        
        return {
          content: t("cryptoInstructions"),
          copyValues: {
            cryptoInfo: formattedForFinance,
            btcAddress,
            ethAddress,
            usdtAddress
          }
        };
      }
      default:
        return { content: "", copyValues: {} };
    }
  };

  const { content, copyValues } = getFormattedInstructions();
  
  if (!content) return null;

  // Handle copy to clipboard with improved feedback
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      toast.success(t("copied"), {
        description: key === 'all' ? t("copyAll") : `${text.slice(0, 20)}...`,
        icon: <Check className="h-4 w-4" />
      });
      setTimeout(() => setCopied(null), 2000);
    });
  };

  // Process payment instructions for display with proper formatting
  const processedContent = content.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < content.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));

  // Get processing time message based on selected method
  const getProcessingTimeInfo = (): string => {
    switch (paymentMethod) {
      case "overseasBank":
        return t("infoOverseasBank");
      case "platformTransfer":
        return t("infoPlatform");
      case "cryptoCurrency":
        return t("infoCrypto");
      default:
        return "";
    }
  };

  return (
    <div className="p-4 border border-indigo-600/30 bg-indigo-900/20 rounded-md space-y-4">
      <div className="flex flex-col space-y-3">
        <h4 className="text-indigo-300 font-medium flex items-center gap-2">
          <Info size={16} className="text-indigo-400" />
          {t("paymentInstructions")}
        </h4>
        
        {/* Payment method specific instructions */}
        <div className="text-indigo-100 text-sm whitespace-pre-line mb-3 pl-3 border-l-2 border-indigo-700/50 py-2">
          {processedContent}
        </div>

        {/* Copy buttons section */}
        <div className="flex flex-wrap gap-2 pt-2">
          {/* Main copy button - copies all info formatted for finance department */}
          <Button
            size="sm"
            variant="outline"
            className="border-indigo-600/40 bg-indigo-950/50 text-indigo-200 hover:bg-indigo-900/40 hover:text-indigo-100 flex items-center gap-2 transition-all duration-200"
            onClick={() => handleCopy(
              Object.values(copyValues)[0] as string, 
              'all'
            )}
          >
            {copied === 'all' ? <Check size={14} /> : <Copy size={14} />}
            {t("copyAll")}
          </Button>

          {/* Payment method specific copy buttons */}
          {paymentMethod === "overseasBank" && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="border-indigo-600/40 bg-indigo-950/50 text-indigo-200 hover:bg-indigo-900/40 hover:text-indigo-100 flex items-center gap-2 transition-all duration-200"
                onClick={() => handleCopy(copyValues.accountNumber as string, 'account')}
              >
                {copied === 'account' ? <Check size={14} /> : <Copy size={14} />}
                {t("copyAccount")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-indigo-600/40 bg-indigo-950/50 text-indigo-200 hover:bg-indigo-900/40 hover:text-indigo-100 flex items-center gap-2 transition-all duration-200"
                onClick={() => handleCopy(copyValues.swiftCode as string, 'swift')}
              >
                {copied === 'swift' ? <Check size={14} /> : <Copy size={14} />}
                {t("copySwift")}
              </Button>
            </>
          )}

          {paymentMethod === "cryptoCurrency" && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="border-indigo-600/40 bg-indigo-950/50 text-indigo-200 hover:bg-indigo-900/40 hover:text-indigo-100 flex items-center gap-2 transition-all duration-200"
                onClick={() => handleCopy(copyValues.btcAddress as string, 'btc')}
              >
                {copied === 'btc' ? <Check size={14} /> : <Copy size={14} />}
                {t("copyBTC")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-indigo-600/40 bg-indigo-950/50 text-indigo-200 hover:bg-indigo-900/40 hover:text-indigo-100 flex items-center gap-2 transition-all duration-200"
                onClick={() => handleCopy(copyValues.ethAddress as string, 'eth')}
              >
                {copied === 'eth' ? <Check size={14} /> : <Copy size={14} />}
                {t("copyETH")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-indigo-600/40 bg-indigo-950/50 text-indigo-200 hover:bg-indigo-900/40 hover:text-indigo-100 flex items-center gap-2 transition-all duration-200"
                onClick={() => handleCopy(copyValues.usdtAddress as string, 'usdt')}
              >
                {copied === 'usdt' ? <Check size={14} /> : <Copy size={14} />}
                {t("copyUSDT")}
              </Button>
            </>
          )}

          {paymentMethod === "platformTransfer" && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="border-indigo-600/40 bg-indigo-950/50 text-indigo-200 hover:bg-indigo-900/40 hover:text-indigo-100 flex items-center gap-2 transition-all duration-200"
                onClick={() => handleCopy(platformId, 'platform')}
              >
                {copied === 'platform' ? <Check size={14} /> : <Copy size={14} />}
                {t("copyPlatformId") || "Copy Platform ID"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-indigo-600/40 bg-indigo-950/50 text-indigo-200 hover:bg-indigo-900/40 hover:text-indigo-100 flex items-center gap-2 transition-all duration-200"
                onClick={() => handleCopy(copyValues.adminUser as string, 'admin')}
              >
                {copied === 'admin' ? <Check size={14} /> : <Copy size={14} />}
                {t("copyAdmin")}
              </Button>
            </>
          )}
        </div>

        {/* Processing time information */}
        <div className="mt-3 p-3 bg-indigo-950/40 border border-indigo-800/30 rounded-md">
          <p className="text-xs text-indigo-300 flex items-start gap-2">
            <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
            {getProcessingTimeInfo()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInstructionCard;
