
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RebateRecord } from "../types";
import { useLanguage } from "@/context/LanguageContext";

interface RebateTableProps {
  records: RebateRecord[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const RebateTable: React.FC<RebateTableProps> = ({
  records,
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  const { t, language } = useLanguage();
  
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

  // Get localized user names based on language
  const getLocalizedUserName = (originalName: string) => {
    const nameMapping: Record<string, string> = {
      "王五": language === "en" ? "Wang Wu" :
             language === "es" ? "Wang Wu" :
             language === "fr" ? "Wang Wu" :
             "王五",
      "赵六": language === "en" ? "Zhao Liu" :
             language === "es" ? "Zhao Liu" :
             language === "fr" ? "Zhao Liu" :
             "赵六",
      "张三": language === "en" ? "Zhang San" :
             language === "es" ? "Zhang San" :
             language === "fr" ? "Zhang San" :
             "张三",
      "李四": language === "en" ? "Li Si" :
             language === "es" ? "Li Si" :
             language === "fr" ? "Li Si" :
             "李四",
      "钱七": language === "en" ? "Qian Qi" :
             language === "es" ? "Qian Qi" :
             language === "fr" ? "Qian Qi" :
             "钱七",
      "孙八": language === "en" ? "Sun Ba" :
             language === "es" ? "Sun Ba" :
             language === "fr" ? "Sun Ba" :
             "孙八",
      "周九": language === "en" ? "Zhou Jiu" :
             language === "es" ? "Zhou Jiu" :
             language === "fr" ? "Zhou Jiu" :
             "周九"
    };
    
    return nameMapping[originalName] || originalName;
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-blue-950/50">
            <TableRow>
              <TableHead className="text-blue-200 font-medium">{t("invitation.table.invitee")}</TableHead>
              <TableHead className="text-blue-200 font-medium">{t("invitation.table.registerDate")}</TableHead>
              <TableHead className="text-blue-200 font-medium">{t("invitation.table.status")}</TableHead>
              <TableHead className="text-blue-200 font-medium text-right">{t("invitation.table.rebateAmount")}</TableHead>
              <TableHead className="text-blue-200 font-medium text-right">{t("invitation.table.totalTransaction")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length > 0 ? (
              records.map((record) => (
                <TableRow key={record.id} className="border-b border-blue-900/30">
                  <TableCell className="font-medium text-blue-100">{getLocalizedUserName(record.invitee)}</TableCell>
                  <TableCell className="text-blue-200">{record.datetime}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={record.status === "active" ? "default" : "secondary"} 
                      className={`rounded-sm px-2 py-0.5 ${record.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                    >
                      {record.status === "active" ? t("invitation.status.active") : t("invitation.status.pending")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-blue-100">{record.rebate}</TableCell>
                  <TableCell className="text-right text-blue-100">{record.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-blue-300 py-8">
                  {t("invitation.noRecordsFound")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
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
      )}
    </div>
  );
};

export default RebateTable;
