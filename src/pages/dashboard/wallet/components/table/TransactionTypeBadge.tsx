
import React, { useEffect, useRef } from "react";
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
import { getTransactionTranslation } from "@/pages/dashboard/transactions/i18n";

interface TransactionTypeBadgeProps {
  type: string;
  language: LanguageCode;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type, language }) => {
  // For tracking initial mount and updates
  const didMountRef = useRef(false);
  const previousTypeRef = useRef(type);
  const previousLanguageRef = useRef(language);
  
  // Define color and icon based on transaction type
  let color = "";
  let icon = null;
  
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

  // Multi-layered translation lookup to ensure type is translated properly
  let typeTranslation;
  
  // Strategy for translation lookup
  // 1. First look in wallet.fundDetails.transactionTypes
  typeTranslation = getDirectTranslation(`wallet.fundDetails.transactionTypes.${normalizedType}`, language);
  
  // 2. If not found, look in wallet.transactions
  if (typeTranslation === `wallet.fundDetails.transactionTypes.${normalizedType}`) {
    typeTranslation = getDirectTranslation(`wallet.transactions.${normalizedType}`, language);
  }
  
  // 3. If still not found, look in transactions direct mappings
  if (typeTranslation === `wallet.transactions.${normalizedType}`) {
    typeTranslation = getDirectTranslation(`transactions.type${normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)}`, language);
  }
  
  // 4. If still not found, try getFundDetailsTranslation helper
  if (typeTranslation === `transactions.type${normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)}`) {
    typeTranslation = getFundDetailsTranslation(`transactionTypes.${normalizedType}`, language);
  }
  
  // 5. If still not found, try getTransactionTranslation helper
  if (typeTranslation === `transactionTypes.${normalizedType}`) {
    typeTranslation = getTransactionTranslation(`type${normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)}`, language);
  }
  
  // 6. Fallback to normalized type if everything fails
  if (!typeTranslation || typeTranslation.includes(normalizedType)) {
    typeTranslation = normalizedType;
  }

  // Log on initial render or changes
  useEffect(() => {
    if (!didMountRef.current) {
      console.log(`TransactionTypeBadge: Initial render - type=${type}, normalized=${normalizedType}, translation=${typeTranslation}, lang=${language}`);
      didMountRef.current = true;
    } else if (type !== previousTypeRef.current || language !== previousLanguageRef.current) {
      console.log(`TransactionTypeBadge: Updated - type=${type}, normalized=${normalizedType}, translation=${typeTranslation}, lang=${language}`);
      previousTypeRef.current = type;
      previousLanguageRef.current = language;
    }
  }, [type, normalizedType, typeTranslation, language]);

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
