
import React, { useEffect, useState, useMemo } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../../i18n";
import { LanguageCode } from "@/utils/languageUtils";

interface TableHeaderComponentProps {
  currentLanguage: string;
  getTranslation?: (key: string) => string;
}

const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({ 
  currentLanguage,
  getTranslation
}) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`header-${currentLanguage}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`TableHeaderComponent language updated: ${language}, currentLanguage: ${currentLanguage}`);
    setUniqueKey(`header-${currentLanguage}-${language}-${Date.now()}-${refreshCounter}`);
  }, [currentLanguage, language, refreshCounter]);
  
  // Safely get translation function
  const safeGetTranslation = (key: string): string => {
    if (getTranslation) {
      return getTranslation(key);
    }
    
    // Use direct function with proper type casting for language
    return getFundDetailsTranslation(key, currentLanguage as LanguageCode);
  };
  
  // Memoize translations to avoid re-renders
  const translations = useMemo(() => ({
    idText: safeGetTranslation('transactionId'),
    typeText: safeGetTranslation('transactionType'),
    amountText: safeGetTranslation('amount'),
    balanceText: safeGetTranslation('balance'),
    timeText: safeGetTranslation('transactionTime'),
    noteText: safeGetTranslation('note')
  }), [currentLanguage, getTranslation]);

  return (
    <TableHeader className="bg-purple-900/30" key={uniqueKey} data-language={currentLanguage}>
      <TableRow className="border-purple-900/30 hover:bg-transparent">
        <TableHead className="text-purple-200 font-medium">
          {translations.idText}
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.typeText}
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.amountText} (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.balanceText} (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.timeText}
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.noteText}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default React.memo(TableHeaderComponent);
