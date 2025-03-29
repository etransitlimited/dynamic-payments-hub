
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RebateRecord } from "../types";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
             language === "es" ? "Juan Pérez" :
             language === "fr" ? "Jean Dupont" :
             "王五",
      "赵六": language === "en" ? "Zhao Liu" :
             language === "es" ? "Maria García" :
             language === "fr" ? "Marie Martin" :
             "赵六",
      "张三": language === "en" ? "Zhang San" :
             language === "es" ? "Carlos Rodríguez" :
             language === "fr" ? "Pierre Durand" :
             "张三",
      "李四": language === "en" ? "Li Si" :
             language === "es" ? "Ana López" :
             language === "fr" ? "Sophie Bernard" :
             "李四",
      "钱七": language === "en" ? "Qian Qi" :
             language === "es" ? "Miguel Fernández" :
             language === "fr" ? "Antoine Dubois" :
             "钱七",
      "孙八": language === "en" ? "Sun Ba" :
             language === "es" ? "Elena Martínez" :
             language === "fr" ? "Claire Petit" :
             "孙八",
      "周九": language === "en" ? "Zhou Jiu" :
             language === "es" ? "Pablo Sánchez" :
             language === "fr" ? "Nicolas Martin" :
             "周九"
    };
    
    return nameMapping[originalName] || originalName;
  };

  // Render loading skeletons if no records yet
  if (!records || records.length === 0) {
    return (
      <div className="rounded-md border border-blue-900/30 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-blue-950/50">
              <TableRow>
                <TableHead className="text-blue-200 font-medium">{t("invitation.table.invitee")}</TableHead>
                <TableHead className="text-blue-200 font-medium">{t("invitation.table.registerDate")}</TableHead>
                <TableHead className="text-blue-200 font-medium">{t("invitation.codeStatus")}</TableHead>
                <TableHead className="text-blue-200 font-medium text-right">{t("invitation.table.rebateAmount")}</TableHead>
                <TableHead className="text-blue-200 font-medium text-right">{t("invitation.table.totalTransaction")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5).fill(0).map((_, index) => (
                <TableRow key={`skeleton-${index}`} className="border-b border-blue-900/30">
                  <TableCell><Skeleton className="h-4 w-24 bg-blue-900/20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32 bg-blue-900/20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 bg-blue-900/20 rounded-sm" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-12 bg-blue-900/20 ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-16 bg-blue-900/20 ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-blue-900/30 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-blue-950/50">
            <TableRow>
              <TableHead className="text-blue-200 font-medium">{t("invitation.table.invitee")}</TableHead>
              <TableHead className="text-blue-200 font-medium">{t("invitation.table.registerDate")}</TableHead>
              <TableHead className="text-blue-200 font-medium">{t("invitation.codeStatus")}</TableHead>
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
                      variant="default" 
                      className={`rounded-sm px-2 py-0.5 ${record.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                    >
                      {record.status === "active" ? t("invitation.statusActive") : t("invitation.statusPending")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-blue-100">{record.rebate}</TableCell>
                  <TableCell className="text-right text-blue-100">{record.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-blue-300 py-8">
                  {t("common.noData")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Fixed Pagination */}
      {totalPages > 1 && (
        <div className="py-4 px-6 border-t border-blue-900/30 bg-[#061428]/50">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={handlePrevPage} 
                  className={currentPage === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer text-blue-200 hover:text-white hover:bg-blue-900/30'} 
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                    className={`${currentPage === page ? 'bg-blue-600 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-900/30'}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={handleNextPage} 
                  className={currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'cursor-pointer text-blue-200 hover:text-white hover:bg-blue-900/30'} 
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default React.memo(RebateTable);
