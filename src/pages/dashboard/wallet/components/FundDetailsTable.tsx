
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
import { formatUSD } from "@/utils/currencyUtils";
import TranslatedText from "@/components/translation/TranslatedText";

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
  
  const formatAmount = (amount: string) => {
    const isPositive = amount.startsWith("+");
    const isNegative = amount.startsWith("-");
    const numericValue = parseFloat(amount.replace(/[^0-9.-]/g, ''));
    
    if (isPositive) {
      return "+" + formatUSD(numericValue).slice(1);
    } else if (isNegative) {
      return "-" + formatUSD(Math.abs(numericValue)).slice(1);
    } else {
      return formatUSD(numericValue);
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
    <Card className="border-gradient overflow-hidden" style={{ background: "linear-gradient(to right, rgb(57, 106, 252), rgb(41, 72, 255))" }}>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-500/20 p-2 rounded-full mr-2">
            <ArrowUpDown size={18} className="text-purple-400" />
          </span>
          <TranslatedText keyName="wallet.fundDetails.transactionDetails" fallback="Transaction Details" />
        </CardTitle>
        <CardDescription className="text-white/80">
          {transactions.length === 0 
            ? <TranslatedText keyName="common.noData" fallback="No data available" />
            : transactions.length < 3 
              ? <TranslatedText keyName="wallet.fundDetails.searchResults" fallback="Search results" />
              : <TranslatedText keyName="wallet.fundDetails.displayAllRecords" fallback="Displaying all records" />}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="gap-2 border-white/50 text-white hover:bg-white/10"
              onClick={onFilter}
            >
              <Filter className="h-4 w-4" />
              <span className="inline"><TranslatedText keyName="common.filter" fallback="Filter" /></span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-white/50 text-white hover:bg-white/10"
              onClick={onExport}
            >
              <Download className="h-4 w-4" />
              <span className="inline"><TranslatedText keyName="common.export" fallback="Export" /></span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-white/50 text-white hover:bg-white/10"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="inline"><TranslatedText keyName="common.refresh" fallback="Refresh" /></span>
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border border-white/20 overflow-hidden bg-white/10 backdrop-blur-sm">
          <Table>
            <TableCaption className="text-white/70">
              <TranslatedText keyName="wallet.fundDetails.allTransactionRecords" fallback="All transaction records" />
            </TableCaption>
            <TableHeader>
              <TableRow className="border-white/20 hover:bg-transparent">
                <TableHead className="text-white font-medium">
                  <TranslatedText keyName="wallet.fundDetails.transactionId" fallback="Transaction ID" />
                </TableHead>
                <TableHead className="text-white font-medium">
                  <TranslatedText keyName="wallet.fundDetails.transactionType" fallback="Type" />
                </TableHead>
                <TableHead className="text-white font-medium">
                  <TranslatedText keyName="wallet.fundDetails.amount" fallback="Amount" /> (USD)
                </TableHead>
                <TableHead className="text-white font-medium">
                  <TranslatedText keyName="wallet.fundDetails.balance" fallback="Balance" /> (USD)
                </TableHead>
                <TableHead className="text-white font-medium">
                  <TranslatedText keyName="wallet.fundDetails.transactionTime" fallback="Transaction Time" />
                </TableHead>
                <TableHead className="text-white font-medium">
                  <TranslatedText keyName="wallet.fundDetails.note" fallback="Note" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="font-medium text-white">{transaction.id}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(transaction.type)}`}>
                        {transaction.type === "Deposit" ? 
                          <TranslatedText keyName="wallet.fundDetails.typeDeposit" fallback="Deposit" /> :
                         transaction.type === "Expense" ? 
                          <TranslatedText keyName="wallet.fundDetails.typeExpense" fallback="Expense" /> :
                          <TranslatedText keyName="wallet.fundDetails.typeTransfer" fallback="Transfer" />
                        }
                      </span>
                    </TableCell>
                    <TableCell className={getAmountColor(transaction.amount)}>{formatAmount(transaction.amount)}</TableCell>
                    <TableCell className="text-white">{formatUSD(parseFloat(transaction.balance))}</TableCell>
                    <TableCell className="text-white">{transaction.date}</TableCell>
                    <TableCell className="text-white">{transaction.note}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-blue-300">
                    <TranslatedText keyName="common.noData" fallback="No data available" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <InformationBox />
      </CardContent>
    </Card>
  );
};

export default FundDetailsTable;
