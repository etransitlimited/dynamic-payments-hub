
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import InformationBox from "./InformationBox";
import TableHeader from "./table/TableHeader";
import TransactionItem from "./table/TransactionItem";
import TableToolbar from "./table/TableToolbar";
import PaginationControl from "./table/PaginationControl";
import { Transaction, FundDetailsTableProps } from "./types/wallet";

const FundDetailsTable = ({ 
  transactions = [], 
  onFilter, 
  onExport, 
  onRefresh 
}: FundDetailsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  // Default transactions data if none provided
  const defaultTransactions: Transaction[] = [
    {
      id: "FD-8973-4610",
      type: "Deposit",
      amount: "+$1,200.00",
      balance: "$3,450.00",
      date: "2023-11-25 14:32",
      note: "支付宝充值"
    },
    {
      id: "FD-7645-2198",
      type: "Expense",
      amount: "-$350.00",
      balance: "$2,250.00",
      date: "2023-11-20 09:45",
      note: "服务购买"
    },
    {
      id: "FD-6234-9875",
      type: "Transfer",
      amount: "-$500.00",
      balance: "$2,600.00",
      date: "2023-11-18 11:25",
      note: "商户转账"
    },
    {
      id: "FD-5123-3567",
      type: "Deposit",
      amount: "+$800.00",
      balance: "$3,100.00",
      date: "2023-11-15 16:45",
      note: "微信支付充值"
    },
    {
      id: "FD-4098-2389",
      type: "Expense",
      amount: "-$250.00",
      balance: "$2,300.00",
      date: "2023-11-10 13:20",
      note: "系统服务费"
    }
  ];

  const displayedTransactions = transactions.length > 0 ? transactions : defaultTransactions;
  
  // Calculate pagination
  const totalPages = Math.ceil(displayedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = displayedTransactions.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-500/20 p-2 rounded-full mr-2">
            <ArrowUpDown size={18} className="text-purple-400" />
          </span>
          资金交易明细
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          显示所有资金交易记录
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableToolbar 
          onFilter={onFilter || (() => {})}
          onExport={onExport || (() => {})}
          onRefresh={onRefresh || (() => {})}
        />
        
        <div className="rounded-md border border-blue-900/50 overflow-hidden bg-[#061428]/40">
          <Table>
            <TableCaption className="text-blue-200/50">所有资金交易记录</TableCaption>
            <TableHeader />
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            totalItems={displayedTransactions.length}
            onPageChange={setCurrentPage}
          />
        )}
        
        <InformationBox />
      </CardContent>
    </Card>
  );
};

export default FundDetailsTable;
