
import React, { useState, useEffect } from "react";
import { Table, TableBody } from "@/components/ui/table";
import TableHeaderComponent from "./TableHeader";
import TransactionRow, { Transaction } from "./TransactionRow";
import { LanguageCode } from "@/utils/languageUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TransactionTableContainerProps {
  transactions: Transaction[];
  currentLanguage: LanguageCode;
  getTranslation: (key: string) => string;
}

const TransactionTableContainer: React.FC<TransactionTableContainerProps> = ({
  transactions,
  currentLanguage,
  getTranslation
}) => {
  const { language } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`table-container-${currentLanguage}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`TransactionTableContainer language updated: ${language}, currentLanguage: ${currentLanguage}`);
      setUniqueKey(`table-container-${language}-${Date.now()}`);
    }
  }, [currentLanguage, language]);

  return (
    <div className="rounded-md overflow-hidden mt-4 mb-6">
      <Table key={uniqueKey}>
        <TableHeaderComponent 
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
        <TableBody className="bg-charcoal-dark/50">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionRow 
                key={transaction.id} 
                transaction={transaction}
                currentLanguage={currentLanguage}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 px-4 text-center text-gray-400">
                {getTranslation('noDataAvailable')}
              </td>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTableContainer;
