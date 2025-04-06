
import React, { useState, useEffect, useMemo, memo } from "react";
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
import { formatLocalizedDate, LanguageCode } from "@/utils/languageUtils";

// Extended sample transaction data with timestamps
const transactions = [
  {
    id: "TRX-123456",
    user: "user@example.com",
    type: "deposit",
    amount: "$500.00",
    status: "completed",
    date: "2023-11-15",
    timestamp: new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
  {
    id: "TRX-123457",
    user: "user2@example.com",
    type: "withdrawal",
    amount: "$200.00",
    status: "pending",
    date: "2023-11-14",
    timestamp: new Date(new Date().getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
  },
  {
    id: "TRX-123458",
    user: "user3@example.com",
    type: "exchange",
    amount: "$350.00",
    status: "completed",
    date: "2023-11-13",
    timestamp: new Date(new Date().getTime() - 22 * 60 * 60 * 1000).toISOString(), // 22 hours ago
  },
  {
    id: "TRX-123459",
    user: "user4@example.com",
    type: "transfer",
    amount: "$125.00",
    status: "failed",
    date: "2023-11-12",
    timestamp: new Date(new Date().getTime() - 26 * 60 * 60 * 1000).toISOString(), // 26 hours ago
  },
  {
    id: "TRX-123460",
    user: "user5@example.com",
    type: "payment",
    amount: "$750.00",
    status: "completed",
    date: "2023-11-11",
    timestamp: new Date(new Date().getTime() - 48 * 60 * 60 * 1000).toISOString(), // 48 hours ago
  }
];

interface TransactionTableProps {
  filterMode?: "last24Hours" | "allTransactions";
}

const TransactionTable = ({ filterMode = "allTransactions" }: TransactionTableProps) => {
  const { language } = useSafeTranslation();
  const currentLanguage = language as LanguageCode;
  
  // Filter transactions based on mode
  const filteredTransactions = useMemo(() => {
    if (filterMode === "last24Hours") {
      const twentyFourHoursAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      return transactions.filter(t => new Date(t.timestamp) > twentyFourHoursAgo);
    }
    return transactions;
  }, [filterMode]);
  
  // Memoize translations to prevent unnecessary re-renders
  const translations = useMemo(() => ({
    idText: getTransactionTranslation("id", currentLanguage),
    userText: getTransactionTranslation("user", currentLanguage),
    typeText: getTransactionTranslation("type", currentLanguage),
    amountText: getTransactionTranslation("amount", currentLanguage),
    statusText: getTransactionTranslation("status", currentLanguage),
    dateText: getTransactionTranslation("date", currentLanguage),
    actionsText: getTransactionTranslation("actions", currentLanguage),
    showingText: getTransactionTranslation("showing", currentLanguage),
    ofText: getTransactionTranslation("of", currentLanguage),
    recordsText: getTransactionTranslation("records", currentLanguage),
    viewText: getTransactionTranslation("view", currentLanguage),
    noTransactionsText: getTransactionTranslation("noTransactions", currentLanguage)
  }), [currentLanguage]);
  
  // Memoize transactions rows to prevent unnecessary re-renders
  const transactionRows = useMemo(() => {
    if (filteredTransactions.length === 0) {
      return (
        <TableRow className="hover:bg-purple-900/20 border-purple-900/30">
          <TableCell colSpan={7} className="text-center py-8 text-purple-300">
            {translations.noTransactionsText}
          </TableCell>
        </TableRow>
      );
    }
    
    return filteredTransactions.map((transaction) => (
      <TableRow 
        key={`${transaction.id}-${currentLanguage}`} 
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
        <TableCell className="text-purple-200/80">
          {formatLocalizedDate(transaction.date, currentLanguage)}
        </TableCell>
        <TableCell>
          <button className="text-xs bg-purple-900/40 hover:bg-purple-900/60 text-purple-300 px-2 py-1 rounded">
            {translations.viewText}
          </button>
        </TableCell>
      </TableRow>
    ));
  }, [currentLanguage, filteredTransactions, translations]);

  // Create a stable rendering key that doesn't change on every render
  const tableKey = useMemo(() => 
    `transaction-table-${currentLanguage}-${filterMode}`,
    [currentLanguage, filterMode]
  );

  return (
    <div className="rounded-md border border-purple-900/40 overflow-hidden" key={tableKey} data-language={currentLanguage}>
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
          {translations.showingText} {filteredTransactions.length} {translations.ofText} {transactions.length} {translations.recordsText}
        </TableCaption>
      </Table>
    </div>
  );
};

export default memo(TransactionTable);
