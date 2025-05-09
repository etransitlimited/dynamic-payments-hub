
import React, { memo } from "react";
import { TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import TransactionRow, { Transaction } from "./TransactionRow";
import { LanguageCode } from "@/utils/languageUtils";

interface TableBodyComponentProps {
  transactions: Transaction[];
  currentLanguage: LanguageCode;
  isLoading?: boolean;
  getTranslation: (key: string) => string;
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = memo(({
  transactions,
  currentLanguage,
  isLoading = false,
  getTranslation
}) => {
  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center">
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full"></div>
              <span className="ml-2 text-purple-300">{getTranslation('loading')}</span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  
  if (!transactions || transactions.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableHead colSpan={6} className="h-24 text-center text-purple-200/50">
            {getTranslation('noDataAvailable')}
          </TableHead>
        </TableRow>
      </TableBody>
    );
  }
  
  return (
    <TableBody>
      {transactions.map((transaction) => (
        <TransactionRow
          key={`${transaction.id}-${currentLanguage}`}
          transaction={transaction}
          currentLanguage={currentLanguage}
        />
      ))}
    </TableBody>
  );
});

TableBodyComponent.displayName = "TableBodyComponent";

export default TableBodyComponent;
