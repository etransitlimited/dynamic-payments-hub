
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface RebateRecord {
  id: string;
  invitee: string;
  type: string;
  amount: number;
  rebate: number;
  datetime: string;
}

interface RebateTableProps {
  currentRecords: RebateRecord[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const RebateTable = ({ 
  currentRecords, 
  currentPage, 
  setCurrentPage, 
  totalPages 
}: RebateTableProps) => {
  return (
    <>
      <div className="rounded-md border border-blue-900/50 overflow-hidden">
        <Table>
          <TableCaption className="text-blue-200/50">返点收益记录</TableCaption>
          <TableHeader>
            <TableRow className="border-blue-900/50 hover:bg-transparent">
              <TableHead className="text-white">交易号</TableHead>
              <TableHead className="text-white">被邀请人</TableHead>
              <TableHead className="text-white">交易类型</TableHead>
              <TableHead className="text-white text-right">交易金额</TableHead>
              <TableHead className="text-white text-right">返点金额</TableHead>
              <TableHead className="text-white">返点时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((record) => (
              <TableRow key={record.id} className="border-blue-900/50 hover:bg-blue-900/20 transition-colors">
                <TableCell className="font-medium text-white">{record.id}</TableCell>
                <TableCell className="text-white">{record.invitee}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    record.type === "充值" ? "bg-blue-600/20 text-blue-300" :
                    record.type === "购卡" ? "bg-purple-600/20 text-purple-300" :
                    "bg-green-600/20 text-green-300"
                  }`}>
                    {record.type}
                  </span>
                </TableCell>
                <TableCell className="text-white text-right">¥{record.amount.toFixed(2)}</TableCell>
                <TableCell className="text-green-400 text-right">¥{record.rebate.toFixed(2)}</TableCell>
                <TableCell className="text-white">{record.datetime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  className={`border-blue-600/60 text-white ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600/20'}`}
                  aria-disabled={currentPage <= 1}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className={`border-blue-600/60 text-white ${currentPage === page ? 'bg-blue-600/30' : 'hover:bg-blue-600/20'}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  className={`border-blue-600/60 text-white ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600/20'}`}
                  aria-disabled={currentPage >= totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default RebateTable;
