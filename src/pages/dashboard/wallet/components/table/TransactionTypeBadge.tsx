
import React from "react";
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  ArrowLeftRight, 
  CreditCard,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LanguageCode } from "@/utils/languageUtils";
import { getFundDetailsTranslation } from "../../i18n";
import { getDirectTranslation } from "@/utils/translationHelpers";

interface TransactionTypeBadgeProps {
  type: string;
  language: LanguageCode;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type, language }) => {
  // Define color and icon based on transaction type
  let color = "";
  let icon = null;
  
  // Get translation
  const getTranslation = (key: string): string => {
    // First try from the fund details specific translations
    const specificTranslation = getFundDetailsTranslation(key, language);
    
    // If that returns the key itself (not found), try the global translations
    if (specificTranslation === key) {
      return getDirectTranslation(`wallet.fundDetails.${key}`, language) || key;
    }
    
    return specificTranslation;
  };

  // Map transaction type to color and icon
  // Treat both "payment" and "expense" as "expense"
  const normalizedType = (type.toLowerCase() === "payment") ? "expense" : type.toLowerCase();

  switch (normalizedType) {
    case "deposit":
      color = "bg-green-600/20 text-green-400 border-green-600/40";
      icon = <ArrowDownToLine className="h-3 w-3 mr-1" />;
      break;
    case "expense":
      color = "bg-red-600/20 text-red-400 border-red-600/40";
      icon = <CreditCard className="h-3 w-3 mr-1" />;
      break;
    case "transfer":
      color = "bg-blue-600/20 text-blue-400 border-blue-600/40";
      icon = <ArrowLeftRight className="h-3 w-3 mr-1" />;
      break;
    case "withdrawal":
      color = "bg-orange-600/20 text-orange-400 border-orange-600/40";
      icon = <ArrowUpFromLine className="h-3 w-3 mr-1" />;
      break;
    case "exchange":
      color = "bg-purple-600/20 text-purple-400 border-purple-600/40";
      icon = <RefreshCw className="h-3 w-3 mr-1" />;
      break;
    default:
      color = "bg-gray-600/20 text-gray-400 border-gray-600/40";
      icon = <CreditCard className="h-3 w-3 mr-1" />;
  }

  // Try to get the translation for this transaction type
  let typeTranslation;
  
  // First try direct access to the specific type
  typeTranslation = getDirectTranslation(`wallet.fundDetails.type${normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)}`, language);
  
  // If direct access fails, try through getFundDetailsTranslation
  if (typeTranslation === `wallet.fundDetails.type${normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)}`) {
    typeTranslation = getTranslation(`transactionTypes.${normalizedType}`);
  }

  return (
    <Badge 
      variant="outline" 
      className={`px-2 py-[1px] text-xs flex items-center ${color} whitespace-nowrap`}
      data-type={normalizedType}
      data-language={language}
    >
      {icon}
      <span>{typeTranslation}</span>
    </Badge>
  );
};

export default TransactionTypeBadge;
