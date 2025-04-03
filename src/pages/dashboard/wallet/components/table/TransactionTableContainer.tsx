
import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableBodyComponent from "./TableBodyComponent";
import { LanguageCode } from "@/utils/languageUtils";
import { Transaction } from "../../FundDetails";

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
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Force rerender when language changes
  useEffect(() => {
    console.log(`TransactionTableContainer language updated: ${currentLanguage}`);
    setForceUpdateKey(Date.now());
  }, [currentLanguage]);

  return (
    <div 
      className="mt-4 overflow-x-auto"
      key={`transaction-table-${currentLanguage}-${forceUpdateKey}`}
      data-language={currentLanguage}
    >
      <table className="w-full border-separate border-spacing-0">
        <TableHeader 
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
        <TableBodyComponent 
          transactions={transactions}
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
      </table>
    </div>
  );
};

export default TransactionTableContainer;
