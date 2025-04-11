
import React, { useEffect, useState, useMemo } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

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
  
  // Memoize translations to avoid re-renders
  const translations = useMemo(() => ({
    idText: getTranslation ? getTranslation('transactionId') : 'Transaction ID',
    typeText: getTranslation ? getTranslation('transactionType') : 'Type',
    amountText: getTranslation ? getTranslation('amount') : 'Amount',
    balanceText: getTranslation ? getTranslation('balance') : 'Balance',
    timeText: getTranslation ? getTranslation('transactionTime') : 'Transaction Time',
    noteText: getTranslation ? getTranslation('note') : 'Note'
  }), [getTranslation]);

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
