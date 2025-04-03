
import React, { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, MinusCircle, CreditCard } from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";

interface TransactionTypeBadgeProps {
  type: string;
  language: LanguageCode;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = memo(({ 
  type,
  language
}) => {
  // Configure badge properties based on transaction type
  const badgeConfig = useMemo(() => {
    const configs: Record<string, { icon: JSX.Element, color: string, bgColor: string }> = {
      "Deposit": {
        icon: <ArrowDownLeft className="h-3 w-3 mr-1" />,
        color: "text-green-500",
        bgColor: "bg-green-900/30"
      },
      "Expense": {
        icon: <MinusCircle className="h-3 w-3 mr-1" />,
        color: "text-red-500",
        bgColor: "bg-red-900/30"
      },
      "Transfer": {
        icon: <ArrowLeftRight className="h-3 w-3 mr-1" />,
        color: "text-blue-500",
        bgColor: "bg-blue-900/30"
      },
      "Payment": {
        icon: <CreditCard className="h-3 w-3 mr-1" />,
        color: "text-purple-500",
        bgColor: "bg-purple-900/30"
      },
      "Withdrawal": {
        icon: <ArrowUpRight className="h-3 w-3 mr-1" />,
        color: "text-amber-500",
        bgColor: "bg-amber-900/30"
      }
    };
    
    return configs[type] || {
      icon: <CreditCard className="h-3 w-3 mr-1" />,
      color: "text-gray-500",
      bgColor: "bg-gray-900/30"
    };
  }, [type]);
  
  // Get localized transaction type
  const localizedType = useMemo(() => {
    const translationKey = `transactions.${type.toLowerCase()}`;
    return getDirectTranslation(translationKey, language, type);
  }, [type, language]);

  return (
    <Badge 
      variant="outline" 
      className={`${badgeConfig.color} ${badgeConfig.bgColor} border-0 flex items-center px-2 py-0.5`}
      data-language={language}
    >
      {badgeConfig.icon}
      <span>{localizedType}</span>
    </Badge>
  );
});

TransactionTypeBadge.displayName = "TransactionTypeBadge";

export default TransactionTypeBadge;
