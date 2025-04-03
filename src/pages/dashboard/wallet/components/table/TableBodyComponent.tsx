
import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import TransactionRow from "./TransactionRow";
import TranslatedText from "@/components/translation/TranslatedText";
import { Transaction } from "../FundDetailsTable";

interface TableBodyComponentProps {
  transactions: Transaction[];
  currentLanguage: string;
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = ({ transactions, currentLanguage }) => {
  return (
    <TableBody>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionRow 
            key={`transaction-${transaction.id}`} 
            transaction={transaction} 
            currentLanguage={currentLanguage} 
          />
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center text-purple-300">
            <TranslatedText keyName="common.noData" fallback="No data available" key={`no-data-row-${currentLanguage}`} />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyComponent;
