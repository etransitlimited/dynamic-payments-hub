
import React, { useEffect, useState } from "react";
import { Table, TableCaption } from "@/components/ui/table";
import TableHeaderComponent from "./TableHeader";
import TableBodyComponent from "./TableBodyComponent";
import TranslatedText from "@/components/translation/TranslatedText";
import { Transaction } from "../FundDetailsTable";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TransactionTableContainerProps {
  transactions: Transaction[];
  currentLanguage: string;
}

const TransactionTableContainer: React.FC<TransactionTableContainerProps> = ({ 
  transactions, 
  currentLanguage 
}) => {
  const { language } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`table-container-${currentLanguage}`);
  
  // 确保组件在语言变化时重新渲染
  useEffect(() => {
    setUniqueKey(`table-container-${currentLanguage}-${language}-${Date.now()}`);
  }, [currentLanguage, language]);
  
  return (
    <div 
      className="rounded-xl border border-purple-900/30 overflow-hidden bg-charcoal-dark/70 backdrop-blur-sm"
      data-language={currentLanguage}
    >
      <Table key={uniqueKey}>
        <TableCaption className="text-purple-200/60">
          <TranslatedText 
            keyName="wallet.fundDetails.allTransactionRecords" 
            fallback="All transaction records" 
            key={`caption-${currentLanguage}-${language}`} 
          />
        </TableCaption>
        <TableHeaderComponent currentLanguage={currentLanguage} />
        <TableBodyComponent 
          transactions={transactions} 
          currentLanguage={currentLanguage} 
        />
      </Table>
    </div>
  );
};

export default TransactionTableContainer;
