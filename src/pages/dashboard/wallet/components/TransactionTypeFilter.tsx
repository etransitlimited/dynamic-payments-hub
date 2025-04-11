
import React from 'react';
import { Button } from '@/components/ui/button';
import { LanguageCode } from '@/utils/languageUtils';
import { TransactionType } from '../FundDetails';
import { getFundDetailsTranslation } from '../i18n';

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
  // Function to get direct translations
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  };
  
  const types: TransactionType[] = ['all', 'deposit', 'expense', 'transfer', 'withdrawal'];
  
  return (
    <div 
      className="flex flex-wrap gap-2 mt-2 bg-charcoal-dark/70 p-3 rounded-md border border-purple-900/30"
      data-language={currentLanguage}
    >
      {types.map((type) => (
        <Button
          key={type}
          variant={selectedType === type ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectType(type)}
          className={
            selectedType === type
              ? "bg-purple-700 hover:bg-purple-800 text-white"
              : "bg-charcoal-light hover:bg-charcoal-dark text-purple-200 border-purple-900/30"
          }
        >
          {getTranslation(`transactionTypes.${type}`)}
        </Button>
      ))}
    </div>
  );
};

export default TransactionTypeFilter;
