
import React from "react";
import { 
  Table, 
  TableBody,  
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FilterX, FileDown, RefreshCw } from "lucide-react";
import { Transaction } from "../FundDetails";
import { formatUSD } from "@/utils/currencyUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Badge } from "@/components/ui/badge";

interface FundDetailsTableProps {
  transactions: Transaction[];
  onFilter: () => void;
  onExport: () => void;
  onRefresh: () => void;
}

const FundDetailsTable: React.FC<FundDetailsTableProps> = ({
  transactions,
  onFilter,
  onExport,
  onRefresh
}) => {
  const { t, language } = useSafeTranslation();
  
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Deposit":
        return "bg-green-500/20 text-green-300 hover:bg-green-500/30";
      case "Expense":
        return "bg-red-500/20 text-red-300 hover:bg-red-500/30";
      case "Transfer":
        return "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30";
      default:
        return "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30";
    }
  };
  
  const getTranslatedType = (type: string) => {
    switch (type) {
      case "Deposit":
        return t("wallet.fundDetails.typeDeposit");
      case "Expense":
        return t("wallet.fundDetails.typeExpense");
      case "Transfer":
        return t("wallet.fundDetails.typeTransfer");
      default:
        return type;
    }
  };

  return (
    <div 
      className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-800/30 p-6 rounded-xl"
      key={`fund-details-table-${language}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-medium text-white">
          {t("wallet.fundDetails.allTransactionRecords")}
        </h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-purple-900/30 border-purple-800/30 text-white hover:bg-purple-800/50"
            onClick={onFilter}
          >
            <FilterX className="w-4 h-4 mr-2" />
            {t("common.filter")}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-purple-900/30 border-purple-800/30 text-white hover:bg-purple-800/50"
            onClick={onExport}
          >
            <FileDown className="w-4 h-4 mr-2" />
            {t("common.export")}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-purple-900/30 border-purple-800/30 text-white hover:bg-purple-800/50"
            onClick={onRefresh}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("common.refresh")}
          </Button>
        </div>
      </div>
      
      <div className="bg-indigo-950/60 rounded-md border border-indigo-700/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-indigo-900/20 border-indigo-700/50">
              <TableHead className="text-indigo-200 font-medium">{t("wallet.fundDetails.transactionId")}</TableHead>
              <TableHead className="text-indigo-200 font-medium">{t("wallet.fundDetails.transactionType")}</TableHead>
              <TableHead className="text-indigo-200 font-medium">{t("wallet.fundDetails.amount")}</TableHead>
              <TableHead className="text-indigo-200 font-medium">{t("wallet.fundDetails.balance")}</TableHead>
              <TableHead className="text-indigo-200 font-medium">{t("wallet.fundDetails.transactionTime")}</TableHead>
              <TableHead className="text-indigo-200 font-medium">{t("wallet.fundDetails.note")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-indigo-900/20 border-indigo-700/50">
                  <TableCell className="font-medium text-indigo-200">{transaction.id}</TableCell>
                  <TableCell>
                    <Badge className={`border-0 ${getTypeBadgeColor(transaction.type)}`}>
                      {getTranslatedType(transaction.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className={transaction.amount < 0 ? "text-red-300" : "text-green-300"}>
                    {formatUSD(transaction.amount)}
                  </TableCell>
                  <TableCell className="text-indigo-200">{formatUSD(transaction.balance)}</TableCell>
                  <TableCell className="text-indigo-200">{transaction.timestamp}</TableCell>
                  <TableCell className="text-indigo-200">{transaction.note || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-gray-400">
                  {t("common.notFound")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FundDetailsTable;
