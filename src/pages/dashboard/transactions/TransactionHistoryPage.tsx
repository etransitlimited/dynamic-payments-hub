
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, ArrowLeft, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "./i18n";
import TransactionTable from "./components/TransactionTable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const TransactionHistoryPage = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [uniqueKey, setUniqueKey] = useState(`history-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    console.log(`TransactionHistory language updated to: ${language}`);
    setUniqueKey(`history-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, refreshCounter]);
  
  // Update document title when language changes
  useEffect(() => {
    document.title = `${getTransactionTranslation("history", language)} | Dashboard`;
  }, [language]);

  return (
    <motion.div
      key={uniqueKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container px-4 py-6 space-y-6 mx-auto max-w-7xl relative z-10"
      data-language={language}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link 
            to="/dashboard/transactions" 
            className="inline-flex items-center justify-center text-sm rounded-md h-9 px-3 bg-charcoal-dark/40 border border-purple-900/20 hover:bg-purple-900/20 text-purple-100 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>{getTransactionTranslation("allTransactions", language)}</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {getTransactionTranslation("history", language) || "Transaction History"}
          </h1>
        </div>
        
        <Button 
          variant="outline" 
          className="mt-3 sm:mt-0 bg-charcoal-dark/40 border-purple-900/20 text-purple-100 hover:bg-purple-900/20 hover:text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          {getTransactionTranslation("exportData", language) || "Export Data"}
        </Button>
      </div>
      
      {/* Filters and search */}
      <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-md relative">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardContent className="p-3 sm:p-4 relative z-10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder={getTransactionTranslation("searchTransactions", language)}
                className="pl-10 bg-charcoal-dark/40 border-purple-900/20 text-white w-full focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-charcoal-dark/40 border-purple-900/30 text-purple-200 hover:bg-purple-900/20 hover:text-neon-green hover:border-purple-500/50 transition-all flex-1 sm:flex-auto flex items-center justify-center"
              >
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                {getTransactionTranslation("dateRange", language)}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Transaction table */}
      <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-md relative">
        <CardContent className="p-0 sm:p-0">
          <TransactionTable />
          
          {/* Pagination */}
          <div className="p-4 border-t border-purple-900/30">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                {[1, 2, 3].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      isActive={currentPage === page}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < 3) setCurrentPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransactionHistoryPage;
