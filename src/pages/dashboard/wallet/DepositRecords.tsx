
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Filter, FileDown, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "../components/PageHeader";

const DepositRecords = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  
  const depositData = [
    {
      id: "TD-38291",
      amount: "¥1,500.00",
      datetime: "2023-11-15 13:45:30",
      status: "completed"
    },
    {
      id: "TD-38292",
      amount: "¥2,000.00",
      datetime: "2023-11-14 10:23:15",
      status: "completed"
    },
    {
      id: "TD-38293",
      amount: "¥3,500.00",
      datetime: "2023-11-13 16:30:45",
      status: "completed"
    },
    {
      id: "TD-38294",
      amount: "¥800.00",
      datetime: "2023-11-12 09:12:30",
      status: "completed"
    },
    {
      id: "TD-38295",
      amount: "¥5,000.00",
      datetime: "2023-11-12 14:50:00",
      status: "pending"
    },
    {
      id: "TD-38296",
      amount: "¥1,200.00",
      datetime: "2023-11-11 11:35:20",
      status: "failed"
    },
    {
      id: "TD-38297",
      amount: "¥2,500.00",
      datetime: "2023-11-10 17:25:10",
      status: "completed"
    },
    {
      id: "TD-38298",
      amount: "¥1,800.00",
      datetime: "2023-11-09 13:10:45",
      status: "completed"
    },
    {
      id: "TD-38299",
      amount: "¥3,200.00",
      datetime: "2023-11-08 15:40:30",
      status: "completed"
    },
    {
      id: "TD-38300",
      amount: "¥900.00",
      datetime: "2023-11-07 10:05:15",
      status: "pending"
    }
  ];
  
  const totalPages = Math.ceil(depositData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = depositData.slice(indexOfFirstRecord, indexOfLastRecord);
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30">
            {t("wallet.depositRecords.statusCompleted")}
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30">
            {t("wallet.depositRecords.statusPending")}
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30">
            {t("wallet.depositRecords.statusFailed")}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader title={t("wallet.depositRecords.statistics")} />
      
      <Card className="border-blue-900/50 bg-blue-950/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-50">{t("wallet.depositRecords.statistics")}</CardTitle>
          <CardDescription className="text-blue-200/70">
            {t("wallet.depositRecords.viewHistory")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-blue-100 border-blue-800 hover:bg-blue-900/30">
                <Filter className="h-4 w-4 mr-2" />
                {t("wallet.depositRecords.filter")}
              </Button>
              <Button variant="outline" size="sm" className="text-blue-100 border-blue-800 hover:bg-blue-900/30">
                <FileDown className="h-4 w-4 mr-2" />
                {t("wallet.depositRecords.export")}
              </Button>
            </div>
            <Button variant="outline" size="sm" className="text-blue-100 border-blue-800 hover:bg-blue-900/30">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t("wallet.depositRecords.refresh")}
            </Button>
          </div>
          
          <Card className="border-blue-900/30 bg-blue-950/30 overflow-hidden">
            <CardHeader className="p-3 bg-blue-950/50">
              <CardTitle className="text-sm text-blue-100">{t("wallet.depositRecords.allRecords")}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-blue-950/50">
                    <TableRow>
                      <TableHead className="text-blue-200 font-medium">{t("wallet.depositRecords.id")}</TableHead>
                      <TableHead className="text-blue-200 font-medium">{t("wallet.depositRecords.amount")}</TableHead>
                      <TableHead className="text-blue-200 font-medium">{t("wallet.depositRecords.datetime")}</TableHead>
                      <TableHead className="text-blue-200 font-medium">{t("wallet.depositRecords.status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentRecords.map((record) => (
                      <TableRow key={record.id} className="border-b border-blue-900/30">
                        <TableCell className="font-medium text-blue-100">{record.id}</TableCell>
                        <TableCell className="text-blue-100">{record.amount}</TableCell>
                        <TableCell className="text-blue-200">{record.datetime}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              <div className="flex justify-between items-center p-4 border-t border-blue-900/30">
                <div className="text-sm text-blue-300">
                  {t("common.page")} {currentPage} {t("common.of")} {totalPages}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="text-blue-100 border-blue-800 hover:bg-blue-800/30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="text-blue-100 border-blue-800 hover:bg-blue-800/30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-900/30">
            <div className="flex items-start">
              <div>
                <h3 className="text-white text-sm font-medium mb-2">{t("wallet.depositRecords.infoTitle")}</h3>
                <p className="text-blue-200/80 text-sm">
                  {t("wallet.depositRecords.infoDescription")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositRecords;
