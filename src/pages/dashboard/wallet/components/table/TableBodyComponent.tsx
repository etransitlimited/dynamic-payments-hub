
import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import TransactionRow from "./TransactionRow";
import { Transaction } from "../../FundDetails";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TableBodyComponentProps {
  transactions: Transaction[];
  currentLanguage: string;
  getTranslation?: (key: string) => string;
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = ({ 
  transactions, 
  currentLanguage,
  getTranslation
}) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`table-body-${currentLanguage}-${Date.now()}`);
  
  // Get the "no data" text
  const noDataText = getTranslation ? getTranslation('noDataAvailable') : 'No data available';
  
  // Force re-render when language changes with a more reliable approach
  useEffect(() => {
    console.log(`TableBodyComponent language updated: ${language}, currentLanguage: ${currentLanguage}`);
    setUniqueKey(`table-body-${currentLanguage}-${language}-${Date.now()}`);
  }, [currentLanguage, language, refreshCounter]);

  return (
    <TableBody key={uniqueKey} data-language={currentLanguage}>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionRow 
            key={`transaction-${transaction.id}-${currentLanguage}-${language}`} 
            transaction={transaction} 
            currentLanguage={currentLanguage}
            getTranslation={getTranslation}
          />
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center text-purple-300">
            {noDataText}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyComponent;
