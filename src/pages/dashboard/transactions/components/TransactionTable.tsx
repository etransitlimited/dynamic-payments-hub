
import React, { useState, useEffect } from "react";
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
  
  // Get translations directly to ensure they update correctly
  const idText = getTransactionTranslation("id", language);
  const userText = getTransactionTranslation("user", language);
  const typeText = getTransactionTranslation("type", language);
  const amountText = getTransactionTranslation("amount", language);
  const statusText = getTransactionTranslation("status", language);
  const dateText = getTransactionTranslation("date", language);
  const actionsText = getTransactionTranslation("actions", language);
  const showingText = getTransactionTranslation("showing", language);
  const ofText = getTransactionTranslation("of", language);
  const recordsText = getTransactionTranslation("records", language);
  
  return (
    <div className="rounded-md border border-purple-900/40 overflow-hidden" key={uniqueKey} data-language={language}>
      <Table>
        <TableHeader className="bg-purple-900/30">
          <TableRow className="hover:bg-purple-900/40 border-purple-900/40">
            <TableHead className="text-purple-200 font-medium">{idText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{userText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{typeText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{amountText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{statusText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{dateText}</TableHead>
            <TableHead className="text-purple-200 font-medium">{actionsText}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
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
                  {getTransactionTranslation("view", language)}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className="text-purple-300/70 py-4">
          {showingText} {transactions.length} {ofText} {transactions.length} {recordsText}
        </TableCaption>
      </Table>
    </div>
  );
};

export default TransactionTable;
