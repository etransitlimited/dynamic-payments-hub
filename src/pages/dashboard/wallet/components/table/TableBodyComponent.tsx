
import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import TransactionRow from "./TransactionRow";
import TranslatedText from "@/components/translation/TranslatedText";
import { Transaction } from "../FundDetailsTable";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TableBodyComponentProps {
  transactions: Transaction[];
  currentLanguage: string;
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = ({ transactions, currentLanguage }) => {
  const { language } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`table-body-${currentLanguage}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`TableBodyComponent language updated: ${language}, currentLanguage: ${currentLanguage}`);
    setUniqueKey(`table-body-${currentLanguage}-${language}-${Date.now()}`);
  }, [currentLanguage, language]);

  return (
    <TableBody key={uniqueKey} data-language={currentLanguage}>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionRow 
            key={`transaction-${transaction.id}-${currentLanguage}-${language}-${Date.now()}`} 
            transaction={transaction} 
            currentLanguage={currentLanguage} 
          />
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center text-purple-300">
            <TranslatedText 
              keyName="common.noData" 
              fallback="No data available" 
              key={`no-data-${currentLanguage}-${language}-${Date.now()}`} 
            />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyComponent;
