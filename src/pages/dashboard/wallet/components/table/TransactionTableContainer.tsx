
import React from "react";
import { Table, TableCaption } from "@/components/ui/table";
import TableHeaderComponent from "./TableHeader";
import TableBodyComponent from "./TableBodyComponent";
import TranslatedText from "@/components/translation/TranslatedText";
import { Transaction } from "../FundDetailsTable";

interface TransactionTableContainerProps {
  transactions: Transaction[];
  currentLanguage: string;
}

const TransactionTableContainer: React.FC<TransactionTableContainerProps> = ({ 
  transactions, 
  currentLanguage 
}) => {
  return (
    <div className="rounded-xl border border-purple-900/30 overflow-hidden bg-charcoal-dark/70 backdrop-blur-sm">
      <Table>
        <TableCaption className="text-purple-200/60">
          <TranslatedText keyName="wallet.fundDetails.allTransactionRecords" fallback="All transaction records" key={`caption-${currentLanguage}`} />
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
