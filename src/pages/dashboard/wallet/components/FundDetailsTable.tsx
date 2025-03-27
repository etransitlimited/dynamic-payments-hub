
import React from "react";
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
} from "lucide-react";
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
  // Default transactions data if none provided
  const defaultTransactions: Transaction[] = [
    {
      id: "FD-8973-4610",
      type: "Deposit",
      amount: "+$1,200.00",
      balance: "$3,450.00",
      date: "2023-11-25 14:32",
      note: "Alipay Deposit"
    },
    {
      id: "FD-7645-2198",
      type: "Expense",
      amount: "-$350.00",
      balance: "$2,250.00",
      date: "2023-11-20 09:45",
      note: "Service Purchase"
    },
    {
      id: "FD-6234-9875",
      type: "Transfer",
      amount: "-$500.00",
      balance: "$2,600.00",
      date: "2023-11-18 11:25",
      note: "Transfer to Merchant"
    }
  ];

  const displayedTransactions = transactions.length > 0 ? transactions : defaultTransactions;
  
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
          Fund Transaction Details
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          Display all fund transaction records
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
              <span className="sm:inline hidden">Filter</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
              onClick={onExport}
            >
              <Download className="h-4 w-4" />
              <span className="sm:inline hidden">Export</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sm:inline hidden">Refresh</span>
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border border-blue-900/50 overflow-hidden bg-[#061428]/40">
          <Table>
            <TableCaption className="text-blue-200/50">All Fund Transaction Records</TableCaption>
            <TableHeader>
              <TableRow className="border-blue-900/50 hover:bg-transparent">
                <TableHead className="text-white font-medium">Transaction ID</TableHead>
                <TableHead className="text-white font-medium">Transaction Type</TableHead>
                <TableHead className="text-white font-medium">Amount</TableHead>
                <TableHead className="text-white font-medium">Balance</TableHead>
                <TableHead className="text-white font-medium">Transaction Time</TableHead>
                <TableHead className="text-white font-medium">Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-blue-900/50 hover:bg-blue-900/20">
                  <TableCell className="font-medium text-white">{transaction.id}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(transaction.type)}`}>
                      {transaction.type}
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
        
        <InformationBox />
      </CardContent>
    </Card>
  );
};

export default FundDetailsTable;

