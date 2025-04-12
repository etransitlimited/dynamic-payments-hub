
import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableBody,  
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { formatUSD } from "@/utils/currencyUtils";
import { Button } from "@/components/ui/button";
import { FilterX, FileDown, RefreshCw } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type DepositRecord = {
  id: string;
  amount: number;
  paymentMethod: string;
  datetime: string;
  status: string;
};

interface DepositTableProps {
  depositRecords: DepositRecord[];
  pageSize?: number;
}

const DepositTable: React.FC<DepositTableProps> = ({ 
  depositRecords,
  pageSize = 2 // 设置较小的默认值方便演示分页效果
}) => {
  const { t, language } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`deposit-table-${language}-${Date.now()}`);
  const [currentPage, setCurrentPage] = useState(1);
  
  // 计算总页数
  const totalPages = Math.ceil(depositRecords.length / pageSize);
  
  // 获取当前页数据
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return depositRecords.slice(startIndex, endIndex);
  };
  
  // 当前页的数据
  const currentRecords = getCurrentPageData();
  
  // 页码改变处理
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`DepositTable language updated to: ${language}`);
    setUniqueKey(`deposit-table-${language}-${Date.now()}`);
    // 语言变更时重置页码
    setCurrentPage(1);
  }, [language]);
  
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

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = [];
    // 显示最多5个页码按钮
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // 调整起始页以确保显示5个页码（如果可能）
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="space-y-4" key={uniqueKey}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-medium text-white">
          {t("wallet.depositRecords.allRecords")}
        </h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-purple-900/30 border-purple-800/30 text-white hover:bg-purple-800/50">
            <FilterX className="w-4 h-4 mr-2" />
            {t("wallet.depositRecords.filter")}
          </Button>
          <Button variant="outline" size="sm" className="bg-purple-900/30 border-purple-800/30 text-white hover:bg-purple-800/50">
            <FileDown className="w-4 h-4 mr-2" />
            {t("wallet.depositRecords.export")}
          </Button>
          <Button variant="outline" size="sm" className="bg-purple-900/30 border-purple-800/30 text-white hover:bg-purple-800/50">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("wallet.depositRecords.refresh")}
          </Button>
        </div>
      </div>
      
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
            {currentRecords.length > 0 ? (
              currentRecords.map((record) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-gray-400">
                  {t("wallet.depositRecords.noDataAvailable") || "No data available"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* 添加分页组件 */}
      {depositRecords.length > 0 && (
        <div className="py-4">
          <Pagination>
            <PaginationContent className="flex items-center justify-center">
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} bg-purple-900/30 border-purple-800/30 text-white hover:bg-purple-800/50`}
                />
              </PaginationItem>
              
              {getPageNumbers().map(page => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                    className={`${currentPage === page ? 'bg-purple-600' : 'bg-purple-900/30 border-purple-800/30'} text-white hover:bg-purple-800/50`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} bg-purple-900/30 border-purple-800/30 text-white hover:bg-purple-800/50`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DepositTable;
