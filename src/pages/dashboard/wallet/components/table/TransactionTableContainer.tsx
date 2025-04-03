
import React, { memo } from "react";
import { Table, TableBody, TableHead, TableHeader as UITableHeader, TableRow } from "@/components/ui/table";
import TableHeaderComponent from "./TableHeader";
import TransactionRow from "./TransactionRow";
import { Transaction } from "../../FundDetails";
import { LanguageCode } from "@/utils/languageUtils";

interface TransactionTableContainerProps {
  transactions: Transaction[];
  currentLanguage: LanguageCode;
  getTranslation: (key: string) => string;
}

const TransactionTableContainer: React.FC<TransactionTableContainerProps> = memo(({
  transactions,
  currentLanguage,
  getTranslation
}) => {
  return (
    <div 
      className="mt-4 border border-purple-900/30 rounded-lg overflow-hidden"
      data-language={currentLanguage}
    >
      <div className="overflow-x-auto">
        <Table>
          <UITableHeader>
            <TableRow className="border-purple-900/30 hover:bg-purple-900/20">
              <TableHead className="text-purple-200/70">{getTranslation('transactionId')}</TableHead>
              <TableHead className="text-purple-200/70">{getTranslation('transactionType')}</TableHead>
              <TableHead className="text-purple-200/70">{getTranslation('amount')}</TableHead>
              <TableHead className="text-purple-200/70">{getTranslation('balance')}</TableHead>
              <TableHead className="text-purple-200/70">{getTranslation('transactionTime')}</TableHead>
              <TableHead className="text-purple-200/70">{getTranslation('note')}</TableHead>
            </TableRow>
          </UITableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionRow 
                  key={`${transaction.id}-${currentLanguage}`} 
                  transaction={transaction}
                  currentLanguage={currentLanguage}
                />
              ))
            ) : (
              <TableRow>
                <TableHead colSpan={6} className="text-center py-4 text-purple-200/50">
                  {getTranslation('noDataAvailable')}
                </TableHead>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

TransactionTableContainer.displayName = "TransactionTableContainer";

export default TransactionTableContainer;
