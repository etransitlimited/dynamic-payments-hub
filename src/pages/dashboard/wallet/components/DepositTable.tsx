
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { formatUSD } from "@/utils/currencyUtils";

type DepositRecord = {
  id: string;
  amount: number;
  paymentMethod: string;
  datetime: string;
  status: string;
};

interface DepositTableProps {
  depositRecords: DepositRecord[];
}

const DepositTable: React.FC<DepositTableProps> = ({ depositRecords }) => {
  const { t } = useLanguage();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-300 hover:bg-green-500/30";
      case "Pending":
        return "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30";
      case "Failed":
        return "bg-red-500/20 text-red-300 hover:bg-red-500/30";
      default:
        return "bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30";
    }
  };
  
  const getTranslatedStatus = (status: string) => {
    switch (status) {
      case "Completed":
        return t("wallet.depositRecords.statusCompleted");
      case "Pending":
        return t("wallet.depositRecords.statusPending");
      case "Failed":
        return t("wallet.depositRecords.statusFailed");
      default:
        return status;
    }
  };
  
  const getTranslatedPaymentMethod = (method: string) => {
    switch (method) {
      case "Alipay":
        return t("wallet.deposit.alipay");
      case "WeChat Pay":
        return t("wallet.deposit.wechatPay");
      case "Bank Transfer":
        return t("wallet.deposit.bankTransfer");
      default:
        return method;
    }
  };

  return (
    <div className="bg-indigo-950/60 rounded-md border border-indigo-700/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-indigo-900/20 border-indigo-700/50">
            <TableHead className="text-indigo-200 font-medium">{t("wallet.depositRecords.id")}</TableHead>
            <TableHead className="text-indigo-200 font-medium">{t("wallet.depositRecords.amount")} (USD)</TableHead>
            <TableHead className="text-indigo-200 font-medium">{t("wallet.deposit.paymentMethod")}</TableHead>
            <TableHead className="text-indigo-200 font-medium">{t("wallet.depositRecords.datetime")}</TableHead>
            <TableHead className="text-indigo-200 font-medium">{t("wallet.depositRecords.status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {depositRecords.map((record) => (
            <TableRow key={record.id} className="hover:bg-indigo-900/20 border-indigo-700/50">
              <TableCell className="font-medium text-indigo-200">{record.id}</TableCell>
              <TableCell className="text-indigo-200">{formatUSD(record.amount)}</TableCell>
              <TableCell className="text-indigo-200">{getTranslatedPaymentMethod(record.paymentMethod)}</TableCell>
              <TableCell className="text-indigo-200">{record.datetime}</TableCell>
              <TableCell>
                <Badge className={`border-0 ${getStatusColor(record.status)}`}>
                  {getTranslatedStatus(record.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DepositTable;
