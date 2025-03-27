
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const PaginationControl = ({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationControlProps) => {
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={handlePreviousPage} 
              className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} border-blue-800/50 text-blue-200 hover:bg-blue-900/30 hover:text-white`} 
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink 
                isActive={currentPage === i + 1}
                onClick={() => onPageChange(i + 1)}
                className={currentPage === i + 1 
                  ? "bg-blue-600/50 text-white border-blue-500" 
                  : "text-blue-300 border-blue-800/50 hover:bg-blue-900/30 hover:text-white"}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={handleNextPage} 
              className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} border-blue-800/50 text-blue-200 hover:bg-blue-900/30 hover:text-white`}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <div className="mt-2 text-sm text-center text-blue-200/60">
        显示 {startIndex + 1} 至 {Math.min(startIndex + itemsPerPage, totalItems)} 项，共 {totalItems} 项
      </div>
    </div>
  );
};

export default PaginationControl;
