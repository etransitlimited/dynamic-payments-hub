
import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import TransactionRow from "./TransactionRow";
import TranslatedText from "@/components/translation/TranslatedText";
import { Transaction } from "../FundDetailsTable";

interface TableBodyComponentProps {
  transactions: Transaction[];
  currentLanguage: string;
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = ({ transactions, currentLanguage }) => {
  const [uniqueKey, setUniqueKey] = useState(`table-body-${currentLanguage}`);
  
  // 确保组件在语言变化时重新渲染
  useEffect(() => {
    setUniqueKey(`table-body-${currentLanguage}-${Date.now()}`);
  }, [currentLanguage]);

  return (
    <TableBody key={uniqueKey}>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionRow 
            key={`transaction-${transaction.id}-${currentLanguage}`} 
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
              key={`no-data-${currentLanguage}`} 
            />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyComponent;
