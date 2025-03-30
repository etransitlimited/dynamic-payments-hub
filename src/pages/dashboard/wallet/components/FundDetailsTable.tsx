
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
import { useLanguage } from "@/context/LanguageContext";
import { formatUSD } from "@/utils/currencyUtils";

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
  const { t } = useLanguage();
  
  // Format amounts with our utility
  const formatAmount = (amount: string) => {
    // Preserve the + or - sign
    const isPositive = amount.startsWith("+");
    const isNegative = amount.startsWith("-");
    const numericValue = parseFloat(amount.replace(/[^0-9.-]/g, ''));
    
    if (isPositive) {
      return "+" + formatUSD(numericValue).slice(1); // Remove $ and add +
    } else if (isNegative) {
      return "-" + formatUSD(Math.abs(numericValue)).slice(1); // Remove $ and add -
    } else {
      return formatUSD(numericValue);
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Deposit":
        return "bg-green-600/30 text-green-300 border border-green-500/30";
      case "Expense":
        return "bg-red-600/30 text-red-300 border border-red-500/30";
      case "Transfer":
        return "bg-blue-600/30 text-blue-300 border border-blue-500/30";
      default:
        return "bg-gray-600/30 text-gray-300 border border-gray-500/30";
    }
  };

  const getAmountColor = (amount: string) => {
    return amount.startsWith("+") ? "text-green-300" : "text-red-300";
  };

  return (
    <Card className="border-gradient" style={{ background: "linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))" }}>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-500/30 p-2 rounded-full mr-2 border border-purple-400/30 shadow-inner shadow-purple-900/20">
            <ArrowUpDown size={18} className="text-purple-200" />
          </span>
          {t("wallet.fundDetails.transactionDetails")}
        </CardTitle>
        <CardDescription className="text-white/80">
          {transactions.length === 0 
            ? t("common.noData") 
            : transactions.length < 3 
              ? t("wallet.fundDetails.searchResults") 
              : t("wallet.fundDetails.displayAllRecords")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="gap-2 border-purple-400/30 bg-purple-950/40 text-white hover:bg-purple-800/40 hover:border-purple-300/50"
              onClick={onFilter}
            >
              <Filter className="h-4 w-4" />
              <span className="inline">{t("common.filter")}</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-purple-400/30 bg-purple-950/40 text-white hover:bg-purple-800/40 hover:border-purple-300/50"
              onClick={onExport}
            >
              <Download className="h-4 w-4" />
              <span className="inline">{t("common.export")}</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-purple-400/30 bg-purple-950/40 text-white hover:bg-purple-800/40 hover:border-purple-300/50"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="inline">{t("common.refresh")}</span>
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border border-purple-400/30 overflow-hidden bg-purple-950/60 backdrop-blur-sm shadow-inner shadow-purple-950/20">
          <Table>
            <TableCaption className="text-purple-300/70">{t("wallet.fundDetails.allTransactionRecords")}</TableCaption>
            <TableHeader>
              <TableRow className="border-purple-500/30 hover:bg-transparent">
                <TableHead className="text-purple-200 font-medium">{t("wallet.fundDetails.transactionId")}</TableHead>
                <TableHead className="text-purple-200 font-medium">{t("wallet.fundDetails.transactionType")}</TableHead>
                <TableHead className="text-purple-200 font-medium">{t("wallet.fundDetails.amount")} (USD)</TableHead>
                <TableHead className="text-purple-200 font-medium">{t("wallet.fundDetails.balance")} (USD)</TableHead>
                <TableHead className="text-purple-200 font-medium">{t("wallet.fundDetails.transactionTime")}</TableHead>
                <TableHead className="text-purple-200 font-medium">{t("wallet.fundDetails.note")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-purple-500/30 hover:bg-purple-800/40">
                    <TableCell className="font-medium text-white">{transaction.id}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full shadow-sm ${getTypeColor(transaction.type)}`}>
                        {transaction.type === "Deposit" ? t("wallet.fundDetails.typeDeposit") :
                         transaction.type === "Expense" ? t("wallet.fundDetails.typeExpense") :
                         t("wallet.fundDetails.typeTransfer")}
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
                  <TableCell colSpan={6} className="h-24 text-center text-purple-200">
                    {t("common.noData")}
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
