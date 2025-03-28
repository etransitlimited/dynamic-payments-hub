
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DepositRecord {
  id: string;
  amount: number;
  paymentMethod: string;
  datetime: string;
  status: string;
}

interface DepositTableProps {
  depositRecords: DepositRecord[];
}

const DepositTable = ({ depositRecords }: DepositTableProps) => {
  return (
    <div className="rounded-md border border-blue-900/50 overflow-hidden bg-[#061428]/40 mt-4">
      <Table>
        <TableCaption className="text-blue-200/50">All Deposit Transactions</TableCaption>
        <TableHeader>
          <TableRow className="border-blue-900/50 hover:bg-transparent">
            <TableHead className="text-white font-medium">Transaction ID</TableHead>
            <TableHead className="text-white font-medium">Amount</TableHead>
            <TableHead className="text-white font-medium">Payment Method</TableHead>
            <TableHead className="text-white font-medium">Deposit Time</TableHead>
            <TableHead className="text-white font-medium">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {depositRecords.length > 0 ? (
            depositRecords.map((record) => (
              <TableRow key={record.id} className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">{record.id}</TableCell>
                <TableCell className="text-white">${record.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    record.paymentMethod === "支付宝" ? "bg-blue-600/20 text-blue-300" :
                    record.paymentMethod === "微信支付" ? "bg-green-600/20 text-green-300" :
                    "bg-purple-600/20 text-purple-300"
                  }`}>
                    {record.paymentMethod}
                  </span>
                </TableCell>
                <TableCell className="text-white">{record.datetime}</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                    {record.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-white/60">
                No deposit records
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DepositTable;
