
import React, { useEffect, useState } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TableHeaderComponentProps {
  currentLanguage: string;
}

const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({ currentLanguage }) => {
  const { language } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`header-${currentLanguage}`);
  
  // 确保组件在语言变化时重新渲染
  useEffect(() => {
    setUniqueKey(`header-${currentLanguage}-${language}-${Date.now()}`);
  }, [currentLanguage, language]);

  return (
    <TableHeader className="bg-purple-900/30" key={uniqueKey} data-language={currentLanguage}>
      <TableRow className="border-purple-900/30 hover:bg-transparent">
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.transactionId" fallback="Transaction ID" key={`th-id-${currentLanguage}-${language}`} />
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.transactionType" fallback="Type" key={`th-type-${currentLanguage}-${language}`} />
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.amount" fallback="Amount" key={`th-amount-${currentLanguage}-${language}`} /> (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.balance" fallback="Balance" key={`th-balance-${currentLanguage}-${language}`} /> (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.transactionTime" fallback="Transaction Time" key={`th-time-${currentLanguage}-${language}`} />
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.note" fallback="Note" key={`th-note-${currentLanguage}-${language}`} />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TableHeaderComponent;
