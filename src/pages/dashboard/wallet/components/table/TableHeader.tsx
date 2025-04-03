
import React, { useEffect, useState } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TableHeaderComponentProps {
  currentLanguage: string;
}

const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({ currentLanguage }) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`header-${currentLanguage}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`TableHeaderComponent language updated: ${language}, currentLanguage: ${currentLanguage}`);
    setUniqueKey(`header-${currentLanguage}-${language}-${Date.now()}`);
  }, [currentLanguage, language, refreshCounter]);

  return (
    <TableHeader className="bg-purple-900/30" key={uniqueKey} data-language={currentLanguage}>
      <TableRow className="border-purple-900/30 hover:bg-transparent">
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText 
            keyName="wallet.fundDetails.transactionId" 
            fallback="Transaction ID"
          />
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText 
            keyName="wallet.fundDetails.transactionType" 
            fallback="Type"
          />
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText 
            keyName="wallet.fundDetails.amount" 
            fallback="Amount"
          /> (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText 
            keyName="wallet.fundDetails.balance" 
            fallback="Balance"
          /> (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText 
            keyName="wallet.fundDetails.transactionTime" 
            fallback="Transaction Time"
          />
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText 
            keyName="wallet.fundDetails.note" 
            fallback="Note"
          />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TableHeaderComponent;
