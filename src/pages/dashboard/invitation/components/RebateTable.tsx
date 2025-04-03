
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RebateRecord } from "../types";
import { useRebateTranslation } from "../hooks/useRebateTranslation";

interface RebateTableProps {
  records: RebateRecord[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500 hover:bg-green-600";
    case "pending":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "failed":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-blue-500 hover:bg-blue-600";
  }
};

const RebateTable: React.FC<RebateTableProps> = ({
  records,
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  const { t, language } = useRebateTranslation();
  
  // Force re-render when language changes
  const [componentKey, setComponentKey] = useState<string>(`rebate-table-${language}`);
  
  useEffect(() => {
    setComponentKey(`rebate-table-${language}-${Date.now()}`);
    console.log(`RebateTable language changed to: ${language}`);
  }, [language]);
  
  return (
    <div className="space-y-4" key={componentKey} data-language={language}>
      <div className="rounded-md border border-purple-900/30 overflow-hidden">
        <Table>
          <TableHeader className="bg-charcoal-light">
            <TableRow className="border-b border-purple-900/30">
              <TableHead className="text-purple-200 font-medium">{t("invitee")}</TableHead>
              <TableHead className="text-purple-200 font-medium">{t("amount")}</TableHead>
              <TableHead className="text-purple-200 font-medium">{t("date")}</TableHead>
              <TableHead className="text-purple-200 font-medium text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length > 0 ? (
              records.map((record) => (
                <TableRow key={record.id} className="border-b border-purple-900/20 hover:bg-charcoal-light/50">
                  <TableCell className="font-medium text-gray-200">{record.invitee}</TableCell>
                  <TableCell className="text-neon-green font-medium">{record.amount}</TableCell>
                  <TableCell className="text-gray-300">{record.datetime}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={`${getStatusColor(record.status)}`}>
                      {t(`status.${record.status}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-400">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-gray-400">
            {t("showing")} {records.length} {t("records")}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-purple-900/30 bg-purple-950/30 text-white hover:bg-purple-900/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-purple-900/30 bg-purple-950/30 text-white hover:bg-purple-900/50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RebateTable;
