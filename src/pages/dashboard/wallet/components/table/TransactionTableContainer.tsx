
import React, { useEffect, useState, memo } from "react";
import { Table, TableCaption } from "@/components/ui/table";
import TableHeaderComponent from "./TableHeader";
import TableBodyComponent from "./TableBodyComponent";
import { Transaction } from "../FundDetailsTable";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TransactionTableContainerProps {
  transactions: Transaction[];
  currentLanguage: string;
  getTranslation?: (key: string) => string;
}

const TransactionTableContainer: React.FC<TransactionTableContainerProps> = ({ 
  transactions, 
  currentLanguage,
  getTranslation
}) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`table-container-${currentLanguage}-${language}-${Date.now()}`);
  
  // Fallback or direct caption text
  const captionText = getTranslation ? getTranslation('allTransactionRecords') : 'All Transaction Records';
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`TransactionTableContainer language updated: ${language}, currentLanguage: ${currentLanguage}`);
    setUniqueKey(`table-container-${currentLanguage}-${language}-${Date.now()}-${refreshCounter}`);
  }, [currentLanguage, language, refreshCounter]);
  
  return (
    <div 
      className="rounded-xl border border-purple-900/30 overflow-hidden bg-charcoal-dark/70 backdrop-blur-sm"
      data-language={currentLanguage}
      data-context-language={language}
    >
      <Table key={uniqueKey}>
        <TableCaption className="text-purple-200/60">
          {captionText}
        </TableCaption>
        <TableHeaderComponent 
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
        <TableBodyComponent 
          transactions={transactions} 
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
      </Table>
    </div>
  );
};

export default memo(TransactionTableContainer);
