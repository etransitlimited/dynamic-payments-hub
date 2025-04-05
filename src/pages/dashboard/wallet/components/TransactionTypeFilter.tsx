
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { LanguageCode } from "@/utils/languageUtils";
import { getFundDetailsTranslation } from "../i18n";
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  ArrowLeftRight, 
  CreditCard,
  LayoutList
} from "lucide-react";
import { TransactionType } from "../FundDetails";

interface TransactionTypeFilterProps {
  selectedType: TransactionType;
  onSelectType: (type: TransactionType) => void;
  currentLanguage: LanguageCode;
}

const TransactionTypeFilter: React.FC<TransactionTypeFilterProps> = ({
  selectedType,
  onSelectType,
  currentLanguage
}) => {
  // Get translations
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  };

  // Define transaction types with their respective icons
  const transactionTypes: { value: TransactionType; icon: React.ReactNode; label: string }[] = [
    {
      value: 'all',
      icon: <LayoutList className="h-4 w-4 mr-2" />,
      label: getTranslation('transactionTypes.all')
    },
    {
      value: 'deposit',
      icon: <ArrowDownToLine className="h-4 w-4 mr-2 text-green-400" />,
      label: getTranslation('transactionTypes.deposit')
    },
    {
      value: 'expense',
      icon: <CreditCard className="h-4 w-4 mr-2 text-red-400" />,
      label: getTranslation('transactionTypes.expense')
    },
    {
      value: 'transfer',
      icon: <ArrowLeftRight className="h-4 w-4 mr-2 text-blue-400" />,
      label: getTranslation('transactionTypes.transfer')
    },
    {
      value: 'withdrawal',
      icon: <ArrowUpFromLine className="h-4 w-4 mr-2 text-orange-400" />,
      label: getTranslation('transactionTypes.withdrawal')
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Tabs
        value={selectedType} 
        onValueChange={(value) => onSelectType(value as TransactionType)}
        className="w-full"
      >
        <TabsList className="w-full flex overflow-x-auto bg-charcoal-dark/50 border border-purple-900/20 rounded-xl p-1 mb-2">
          {transactionTypes.map(type => (
            <TabsTrigger
              key={type.value}
              value={type.value}
              className={`flex-1 flex items-center justify-center py-2 px-3 text-sm ${
                selectedType === type.value 
                  ? 'bg-purple-900/40 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-purple-900/20'
              } rounded-lg transition-all`}
            >
              {type.icon}
              <span className="whitespace-nowrap">{type.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default TransactionTypeFilter;
