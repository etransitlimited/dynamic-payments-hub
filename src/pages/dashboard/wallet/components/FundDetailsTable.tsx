
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
import { useSafeTranslation } from "@/hooks/use-safe-translation";

export interface Transaction {
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
  const { t } = useSafeTranslation();
  
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
    <Card className="relative overflow-hidden bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-lg">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px] rounded-xl"></div>
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-70"></div>
      
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-900/30 p-2 rounded-lg mr-2 text-purple-400">
            <ArrowUpDown size={18} />
          </span>
          <TranslatedText keyName="wallet.fundDetails.transactionDetails" fallback="Transaction Details" />
        </CardTitle>
        <CardDescription className="text-purple-200/70">
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
              className="gap-2 bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
              onClick={onFilter}
            >
              <Filter className="h-4 w-4" />
              <span className="inline"><TranslatedText keyName="common.filter" fallback="Filter" /></span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
              onClick={onExport}
            >
              <Download className="h-4 w-4" />
              <span className="inline"><TranslatedText keyName="common.export" fallback="Export" /></span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="inline"><TranslatedText keyName="common.refresh" fallback="Refresh" /></span>
            </Button>
          </div>
        </div>
        
        <div className="rounded-xl border border-purple-900/30 overflow-hidden bg-charcoal-dark/70 backdrop-blur-sm">
          <Table>
            <TableCaption className="text-purple-200/60">
              <TranslatedText keyName="wallet.fundDetails.allTransactionRecords" fallback="All transaction records" />
            </TableCaption>
            <TableHeader className="bg-purple-900/30">
              <TableRow className="border-purple-900/30 hover:bg-transparent">
                <TableHead className="text-purple-200 font-medium">
                  <TranslatedText keyName="wallet.fundDetails.transactionId" fallback="Transaction ID" />
                </TableHead>
                <TableHead className="text-purple-200 font-medium">
                  <TranslatedText keyName="wallet.fundDetails.transactionType" fallback="Type" />
                </TableHead>
                <TableHead className="text-purple-200 font-medium">
                  <TranslatedText keyName="wallet.fundDetails.amount" fallback="Amount" /> (USD)
                </TableHead>
                <TableHead className="text-purple-200 font-medium">
                  <TranslatedText keyName="wallet.fundDetails.balance" fallback="Balance" /> (USD)
                </TableHead>
                <TableHead className="text-purple-200 font-medium">
                  <TranslatedText keyName="wallet.fundDetails.transactionTime" fallback="Transaction Time" />
                </TableHead>
                <TableHead className="text-purple-200 font-medium">
                  <TranslatedText keyName="wallet.fundDetails.note" fallback="Note" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-purple-900/30 hover:bg-purple-900/20 transition-colors">
                    <TableCell className="font-mono text-xs text-purple-300">{transaction.id}</TableCell>
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
                    <TableCell className="text-purple-200/80 text-sm">{transaction.date}</TableCell>
                    <TableCell className="text-purple-200/80">{transaction.note}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-purple-300">
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
