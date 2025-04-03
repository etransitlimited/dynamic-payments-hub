
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import InformationBox from "./InformationBox";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TableToolbar from "./table/TableToolbar";
import TransactionTableContainer from "./table/TransactionTableContainer";

export interface Transaction {
  id: string;
  type: "Deposit" | "Expense" | "Transfer" | "Payment" | "Withdrawal";
  amount: string;
  balance: string;
  date: string;
  note: string;
}

interface FundDetailsTableProps {
  transactions?: Transaction[];
  onFilter?: () => void;
  onExport?: () => void;
  onRefresh?: () => void;
}

const FundDetailsTable = ({ 
  transactions = [], 
  onFilter, 
  onExport, 
  onRefresh 
}: FundDetailsTableProps) => {
  const { t, language, refreshCounter } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Function to force rerender
  const forceUpdate = useCallback(() => {
    console.log("Force updating FundDetailsTable");
    setForceUpdateKey(Date.now());
  }, []);
  
  // Monitor language changes and trigger rerender
  useEffect(() => {
    if (currentLanguage !== language || refreshCounter > 0) {
      console.log(`FundDetailsTable language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
      forceUpdate(); // Force update when language changes
    }
  }, [language, currentLanguage, refreshCounter, forceUpdate]);

  // Determine card description based on transaction count
  const getCardDescription = () => {
    if (transactions.length === 0) {
      return t('wallet.fundDetails.searchResults', 'No data available');
    } else if (transactions.length < 3) {
      return t('wallet.fundDetails.searchResults', 'Search results');
    } else {
      return t('wallet.fundDetails.displayAllRecords', 'Displaying all records');
    }
  };

  return (
    <Card 
      className="relative overflow-hidden bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-lg"
      key={`fund-details-table-${currentLanguage}-${forceUpdateKey}`}
      data-language={currentLanguage}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px] rounded-xl"></div>
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-70"></div>
      
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-900/30 p-2 rounded-lg mr-2 text-purple-400">
            <ArrowUpDown size={18} />
          </span>
          <TranslatedText 
            keyName="wallet.fundDetails.transactionDetails" 
            fallback="Transaction Details" 
            key={`title-${currentLanguage}-${forceUpdateKey}`} 
          />
        </CardTitle>
        <CardDescription className="text-purple-200/70">
          {getCardDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <TableToolbar 
          onFilter={onFilter || (() => console.log("Filter clicked"))}
          onExport={onExport || (() => console.log("Export clicked"))}
          onRefresh={onRefresh || (() => {
            console.log("Refresh clicked");
            forceUpdate();
          })}
          currentLanguage={currentLanguage}
        />
        
        <TransactionTableContainer 
          transactions={transactions} 
          currentLanguage={currentLanguage} 
        />
        
        <InformationBox />
      </CardContent>
    </Card>
  );
};

export default FundDetailsTable;
