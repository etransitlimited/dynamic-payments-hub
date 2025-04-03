
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TranslatedText from "@/components/translation/TranslatedText";

interface TableHeaderComponentProps {
  currentLanguage: string;
}

const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({ currentLanguage }) => {
  return (
    <TableHeader className="bg-purple-900/30">
      <TableRow className="border-purple-900/30 hover:bg-transparent">
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.transactionId" fallback="Transaction ID" key={`th-id-${currentLanguage}`} />
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.transactionType" fallback="Type" key={`th-type-${currentLanguage}`} />
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.amount" fallback="Amount" key={`th-amount-${currentLanguage}`} /> (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.balance" fallback="Balance" key={`th-balance-${currentLanguage}`} /> (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.transactionTime" fallback="Transaction Time" key={`th-time-${currentLanguage}`} />
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          <TranslatedText keyName="wallet.fundDetails.note" fallback="Note" key={`th-note-${currentLanguage}`} />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TableHeaderComponent;
