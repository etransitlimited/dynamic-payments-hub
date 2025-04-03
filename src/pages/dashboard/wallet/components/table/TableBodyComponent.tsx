
import React, { useState, useEffect } from "react";
import TransactionRow from "./TransactionRow";
import { LanguageCode } from "@/utils/languageUtils";
import { Transaction } from "../../FundDetails";

interface TableBodyComponentProps {
  transactions: Transaction[];
  currentLanguage: LanguageCode;
  getTranslation: (key: string) => string;
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = ({ 
  transactions, 
  currentLanguage,
  getTranslation
}) => {
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Force rerender when language changes
  useEffect(() => {
    console.log(`TableBodyComponent language updated: ${currentLanguage}`);
    setForceUpdateKey(Date.now());
  }, [currentLanguage]);

  if (transactions.length === 0) {
    return (
      <tr>
        <td colSpan={6} className="text-center py-8 text-gray-400">
          {getTranslation('noDataAvailable')}
        </td>
      </tr>
    );
  }

  return (
    <tbody className="divide-y divide-purple-900/20">
      {transactions.map(transaction => (
        <TransactionRow 
          key={`row-${transaction.id}-${currentLanguage}-${forceUpdateKey}`}
          transaction={transaction}
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
      ))}
    </tbody>
  );
};

export default TableBodyComponent;
