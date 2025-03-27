
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Transaction } from "../types/wallet";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Deposit":
        return "bg-green-600/20 text-green-300";
      case "Expense":
        return "bg-red-600/20 text-red-300";
      case "Transfer":
        return "bg-blue-600/20 text-blue-300";
      default:
        return "bg-gray-600/20 text-gray-300";
    }
  };

  const getAmountColor = (amount: string) => {
    return amount.startsWith("+") ? "text-green-300" : "text-red-300";
  };

  return (
    <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
      <TableCell className="font-medium text-white">{transaction.id}</TableCell>
      <TableCell>
        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(transaction.type)}`}>
          {transaction.type === "Deposit" ? "充值" : 
          transaction.type === "Expense" ? "支出" : "转账"}
        </span>
      </TableCell>
      <TableCell className={getAmountColor(transaction.amount)}>{transaction.amount}</TableCell>
      <TableCell className="text-white">{transaction.balance}</TableCell>
      <TableCell className="text-white">{transaction.date}</TableCell>
      <TableCell className="text-white">{transaction.note}</TableCell>
    </TableRow>
  );
};

export default TransactionItem;
