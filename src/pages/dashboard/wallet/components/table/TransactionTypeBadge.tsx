
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

  // 多层次翻译查找，确保不同语言下都能正确显示
  // 1. 首先尝试从 wallet.fundDetails.transactionTypes 获取
  let typeTranslation = getDirectTranslation(`wallet.fundDetails.transactionTypes.${normalizedType}`, language);
  
  // 2. 如果没找到，尝试从 transactions 文件中获取
  if (typeTranslation === `wallet.fundDetails.transactionTypes.${normalizedType}`) {
    typeTranslation = getDirectTranslation(`transactions.${normalizedType}`, language);
  }
  
  // 3. 如果仍然没找到，通过 getFundDetailsTranslation 再试一次
  if (typeTranslation === `transactions.${normalizedType}`) {
    typeTranslation = getFundDetailsTranslation(`transactionTypes.${normalizedType}`, language);
  }
  
  // 如果仍然没有找到合适的翻译，使用类型名作为后备
  if (typeTranslation === `transactionTypes.${normalizedType}`) {
    typeTranslation = normalizedType;
  }

  console.log(`TransactionTypeBadge: type=${type}, normalized=${normalizedType}, translation=${typeTranslation}, lang=${language}`);

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
