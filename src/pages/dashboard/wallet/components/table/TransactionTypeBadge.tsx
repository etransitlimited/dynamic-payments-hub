
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight, RepeatIcon, CreditCard, DollarSign } from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";

interface TransactionTypeBadgeProps {
  type: string;
  language: LanguageCode;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type, language }) => {
  // Determine badge color and icon based on transaction type
  const getTypeConfig = (type: string) => {
    const lowerType = type.toLowerCase();
    
    if (lowerType.includes("deposit")) {
      return { 
        bgColor: "bg-emerald-500/20 hover:bg-emerald-500/30", 
        textColor: "text-emerald-400",
        borderColor: "border-emerald-500/30",
        icon: <ArrowDownRight className="h-3 w-3 mr-1" />,
        translationKey: "transactions.deposit"
      };
    } 
    
    if (lowerType.includes("withdrawal")) {
      return { 
        bgColor: "bg-red-500/20 hover:bg-red-500/30", 
        textColor: "text-red-400",
        borderColor: "border-red-500/30", 
        icon: <ArrowUpRight className="h-3 w-3 mr-1" />,
        translationKey: "transactions.withdrawal"
      };
    }
    
    if (lowerType.includes("transfer")) {
      return { 
        bgColor: "bg-blue-500/20 hover:bg-blue-500/30", 
        textColor: "text-blue-400",
        borderColor: "border-blue-500/30", 
        icon: <RepeatIcon className="h-3 w-3 mr-1" />,
        translationKey: "transactions.transfer"
      };
    }
    
    if (lowerType.includes("payment")) {
      return { 
        bgColor: "bg-amber-500/20 hover:bg-amber-500/30", 
        textColor: "text-amber-400",
        borderColor: "border-amber-500/30", 
        icon: <CreditCard className="h-3 w-3 mr-1" />,
        translationKey: "transactions.payment"
      };
    }
    
    if (lowerType.includes("expense")) {
      return { 
        bgColor: "bg-purple-500/20 hover:bg-purple-500/30", 
        textColor: "text-purple-400",
        borderColor: "border-purple-500/30", 
        icon: <DollarSign className="h-3 w-3 mr-1" />,
        translationKey: "transactions.expense"
      };
    }
    
    // Default case
    return { 
      bgColor: "bg-gray-500/20 hover:bg-gray-500/30", 
      textColor: "text-gray-400",
      borderColor: "border-gray-500/30", 
      icon: <DollarSign className="h-3 w-3 mr-1" />,
      translationKey: "transactions." + lowerType
    };
  };
  
  const config = getTypeConfig(type);
  
  // Get the type translation
  const typeTranslation = getDirectTranslation(config.translationKey, language) || type;
  
  return (
    <Badge 
      variant="outline" 
      className={`${config.bgColor} ${config.textColor} ${config.borderColor} flex items-center text-xs font-normal px-2 py-1`}
    >
      {config.icon} {typeTranslation}
    </Badge>
  );
};

export default TransactionTypeBadge;
