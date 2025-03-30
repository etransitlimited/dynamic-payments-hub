
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import SearchBox from "./components/SearchBox";
import FundDetailsTable from "./components/FundDetailsTable";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

interface Transaction {
  id: string;
  type: "Deposit" | "Expense" | "Transfer";
  amount: string;
  balance: string;
  date: string;
  note: string;
}

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const { t } = useLanguage();
  
  // Log the language context to ensure it's working
  useEffect(() => {
    console.log("FundDetails component mounted, language context:", t("wallet.fundDetails.title"));
  }, [t]);
  
  // Simulate fetching transaction data
  useEffect(() => {
    // Default transactions data
    const defaultTransactions: Transaction[] = [
      {
        id: "FD-8973-4610",
        type: "Deposit",
        amount: "+1200.00",
        balance: "3450.00",
        date: "2023-11-25 14:32",
        note: "Alipay Deposit"
      },
      {
        id: "FD-7645-2198",
        type: "Expense",
        amount: "-350.00",
        balance: "2250.00",
        date: "2023-11-20 09:45",
        note: "Service Purchase"
      },
      {
        id: "FD-6234-9875",
        type: "Transfer",
        amount: "-500.00",
        balance: "2600.00",
        date: "2023-11-18 11:25",
        note: "Transfer to Merchant"
      }
    ];
    
    setTransactions(defaultTransactions);
    setFilteredTransactions(defaultTransactions);
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredTransactions(transactions);
      return;
    }
    
    const filtered = transactions.filter(transaction => 
      transaction.id.toLowerCase().includes(query.toLowerCase()) ||
      transaction.note.toLowerCase().includes(query.toLowerCase()) ||
      transaction.date.includes(query) ||
      transaction.type.toLowerCase().includes(query.toLowerCase()) ||
      transaction.amount.includes(query)
    );
    
    setFilteredTransactions(filtered);
    
    // Show toast for search results
    if (filtered.length === 0) {
      toast.info(t("common.noData"));
    } else {
      console.log(`Found ${filtered.length} results for query: ${query}`);
    }
  };
  
  const handleDateFilter = () => {
    // Implement date filter
    console.log("Opening date filter");
  };
  
  const handleFilter = () => {
    // Implement filter
    console.log("Opening filter options");
  };
  
  const handleExport = () => {
    // Implement export
    console.log("Exporting data");
  };
  
  const handleRefresh = () => {
    // Implement refresh
    setFilteredTransactions(transactions);
    setSearchQuery("");
    console.log("Refreshing data");
  };

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader title={t("wallet.fundDetails.title")} />
      
      <SearchBox 
        onSearch={handleSearch} 
        onDateFilter={handleDateFilter}
        initialSearchQuery={searchQuery}
      />
      
      <FundDetailsTable 
        transactions={filteredTransactions}
        onFilter={handleFilter}
        onExport={handleExport}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default FundDetails;
