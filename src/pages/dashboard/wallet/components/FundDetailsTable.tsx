
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  Download,
  RefreshCw,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import InformationBox from "./InformationBox";

interface Transaction {
  id: string;
  type: "Deposit" | "Expense" | "Transfer";
  amount: string;
  balance: string;
  date: string;
  note: string;
}

interface FundDetailsTableProps {
  transactions?: Transaction[];
  onFilter?: () => void;
  onExport?: () => void;
  onRefresh?: () => void;
}

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
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
              onClick={onFilter}
            >
              <Filter className="h-4 w-4" />
              <span className="sm:inline hidden">筛选</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
              onClick={onExport}
            >
              <Download className="h-4 w-4" />
              <span className="sm:inline hidden">导出</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sm:inline hidden">刷新</span>
            </Button>
          </div>
          <div className="flex items-center text-sm text-blue-300">
            <Calendar className="h-4 w-4 mr-2" />
            <span>数据更新于: 2023-12-01 08:30</span>
          </div>
        </div>
        
        <div className="rounded-md border border-blue-900/50 overflow-hidden bg-[#061428]/40">
          <Table>
            <TableCaption className="text-blue-200/50">所有资金交易记录</TableCaption>
            <TableHeader>
              <TableRow className="border-blue-900/50 hover:bg-transparent">
                <TableHead className="text-white font-medium">交易 ID</TableHead>
                <TableHead className="text-white font-medium">交易类型</TableHead>
                <TableHead className="text-white font-medium">金额</TableHead>
                <TableHead className="text-white font-medium">余额</TableHead>
                <TableHead className="text-white font-medium">交易时间</TableHead>
                <TableHead className="text-white font-medium">备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-blue-900/50 hover:bg-blue-900/20">
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
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={handlePreviousPage} 
                    className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} border-blue-800/50 text-blue-200 hover:bg-blue-900/30 hover:text-white`} 
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 
                        ? "bg-blue-600/50 text-white border-blue-500" 
                        : "text-blue-300 border-blue-800/50 hover:bg-blue-900/30 hover:text-white"}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={handleNextPage} 
                    className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} border-blue-800/50 text-blue-200 hover:bg-blue-900/30 hover:text-white`}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            <div className="mt-2 text-sm text-center text-blue-200/60">
              显示 {startIndex + 1} 至 {Math.min(startIndex + itemsPerPage, displayedTransactions.length)} 项，共 {displayedTransactions.length} 项
            </div>
          </div>
        )}
        
        <InformationBox />
      </CardContent>
    </Card>
  );
};

export default FundDetailsTable;
