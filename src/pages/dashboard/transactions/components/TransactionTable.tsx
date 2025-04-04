
import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableCaption } from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import TypeBadge from "./TypeBadge";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";

// Sample transaction data
const transactions = [
  {
    id: "TRX-123456",
    user: "user@example.com",
    type: "deposit",
    amount: "$500.00",
    status: "completed",
    date: "2023-11-15",
  },
  {
    id: "TRX-123457",
    user: "user2@example.com",
    type: "withdrawal",
    amount: "$200.00",
    status: "pending",
    date: "2023-11-14",
  },
  {
    id: "TRX-123458",
    user: "user3@example.com",
    type: "exchange",
    amount: "$350.00",
    status: "completed",
    date: "2023-11-13",
  },
  {
    id: "TRX-123459",
    user: "user4@example.com",
    type: "transfer",
    amount: "$125.00",
    status: "failed",
    date: "2023-11-12",
  },
];

const TransactionTable: React.FC = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`transaction-table-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    console.log(`TransactionTable language updated to: ${language}`);
    setUniqueKey(`transaction-table-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, refreshCounter]);
  
  // Memoize translations to prevent unnecessary re-renders
  const translations = useMemo(() => ({
    idText: getTransactionTranslation("id", language),
    userText: getTransactionTranslation("user", language),
    typeText: getTransactionTranslation("type", language),
    amountText: getTransactionTranslation("amount", language),
    statusText: getTransactionTranslation("status", language),
    dateText: getTransactionTranslation("date", language),
    actionsText: getTransactionTranslation("actions", language),
    showingText: getTransactionTranslation("showing", language),
    ofText: getTransactionTranslation("of", language),
    recordsText: getTransactionTranslation("records", language),
    viewText: getTransactionTranslation("view", language)
  }), [language]);
  
  // Memoize transactions rows to prevent unnecessary re-renders
  const transactionRows = useMemo(() => transactions.map((transaction) => (
    <TableRow 
      key={`${transaction.id}-${language}`} 
      className="hover:bg-purple-900/20 border-purple-900/30"
    >
      <TableCell className="font-mono text-purple-300">{transaction.id}</TableCell>
      <TableCell className="text-purple-200">{transaction.user}</TableCell>
      <TableCell>
        <TypeBadge type={transaction.type} />
      </TableCell>
      <TableCell className="text-purple-200">{transaction.amount}</TableCell>
      <TableCell>
        <StatusBadge status={transaction.status} />
      </TableCell>
      <TableCell className="text-purple-200/80">{transaction.date}</TableCell>
      <TableCell>
        <button className="text-xs bg-purple-900/40 hover:bg-purple-900/60 text-purple-300 px-2 py-1 rounded">
          {translations.viewText}
        </button>
      </TableCell>
    </TableRow>
  )), [language, translations.viewText]);

  return (
    <div className="rounded-md border border-purple-900/40 overflow-hidden" key={uniqueKey} data-language={language}>
      <Table>
        <TableHeader className="bg-purple-900/30">
          <TableRow className="hover:bg-purple-900/40 border-purple-900/40">
            <TableHead className="text-purple-200 font-medium">{translations.idText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{translations.userText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{translations.typeText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{translations.amountText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{translations.statusText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{translations.dateText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{translations.actionsText}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionRows}
        </TableBody>
        <TableCaption className="text-purple-300/70 py-4">
          {translations.showingText} {transactions.length} {translations.ofText} {transactions.length} {translations.recordsText}
        </TableCaption>
      </Table>
    </div>
  );
};

export default React.memo(TransactionTable);
