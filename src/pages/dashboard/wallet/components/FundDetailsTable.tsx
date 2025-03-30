
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
        return "bg-green-600/40 text-green-200 border border-green-500/40 shadow-[0_0_8px_rgba(0,255,0,0.1)]";
      case "Expense":
        return "bg-red-600/40 text-red-200 border border-red-500/40 shadow-[0_0_8px_rgba(255,0,0,0.1)]";
      case "Transfer":
        return "bg-blue-600/40 text-blue-200 border border-blue-500/40 shadow-[0_0_8px_rgba(0,0,255,0.1)]";
      default:
        return "bg-gray-600/40 text-gray-200 border border-gray-500/40";
    }
  };

  const getAmountColor = (amount: string) => {
    return amount.startsWith("+") ? "text-green-300 font-medium" : "text-red-300 font-medium";
  };

  return (
    <Card className="border-gradient" style={{ background: "linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))" }}>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-500/40 p-2 rounded-full mr-2 border border-purple-400/40 shadow-inner shadow-purple-900/20">
            <ArrowUpDown size={18} className="text-purple-100" />
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
              className="gap-2"
              onClick={onFilter}
            >
              <Filter className="h-4 w-4" />
              <span className="inline">{t("common.filter")}</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={onExport}
            >
              <Download className="h-4 w-4" />
              <span className="inline">{t("common.export")}</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="inline">{t("common.refresh")}</span>
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden backdrop-blur-sm">
          <Table>
            <TableCaption>{t("wallet.fundDetails.allTransactionRecords")}</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{t("wallet.fundDetails.transactionId")}</TableHead>
                <TableHead>{t("wallet.fundDetails.transactionType")}</TableHead>
                <TableHead>{t("wallet.fundDetails.amount")} (USD)</TableHead>
                <TableHead>{t("wallet.fundDetails.balance")} (USD)</TableHead>
                <TableHead>{t("wallet.fundDetails.transactionTime")}</TableHead>
                <TableHead>{t("wallet.fundDetails.note")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium text-white">{transaction.id}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(transaction.type)}`}>
                        {transaction.type === "Deposit" ? t("wallet.fundDetails.typeDeposit") :
                         transaction.type === "Expense" ? t("wallet.fundDetails.typeExpense") :
                         t("wallet.fundDetails.typeTransfer")}
                      </span>
                    </TableCell>
                    <TableCell className={getAmountColor(transaction.amount)}>{formatAmount(transaction.amount)}</TableCell>
                    <TableCell className="text-white font-medium">{formatUSD(parseFloat(transaction.balance))}</TableCell>
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
