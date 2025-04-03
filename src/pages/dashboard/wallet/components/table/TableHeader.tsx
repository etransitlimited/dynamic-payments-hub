
import React, { useEffect, useState } from "react";
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
  
  // Get header texts either from direct translation or fallbacks
  const idText = getTranslation ? getTranslation('transactionId') : 'Transaction ID';
  const typeText = getTranslation ? getTranslation('transactionType') : 'Type';
  const amountText = getTranslation ? getTranslation('amount') : 'Amount';
  const balanceText = getTranslation ? getTranslation('balance') : 'Balance';
  const timeText = getTranslation ? getTranslation('transactionTime') : 'Transaction Time';
  const noteText = getTranslation ? getTranslation('note') : 'Note';
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`TableHeaderComponent language updated: ${language}, currentLanguage: ${currentLanguage}`);
    setUniqueKey(`header-${currentLanguage}-${language}-${Date.now()}`);
  }, [currentLanguage, language, refreshCounter]);

  return (
    <TableHeader className="bg-purple-900/30" key={uniqueKey} data-language={currentLanguage}>
      <TableRow className="border-purple-900/30 hover:bg-transparent">
        <TableHead className="text-purple-200 font-medium">
          {idText}
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {typeText}
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {amountText} (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {balanceText} (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {timeText}
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {noteText}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TableHeaderComponent;
