
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import InformationBox from "./InformationBox";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TableToolbar from "./table/TableToolbar";
import TransactionTableContainer from "./table/TransactionTableContainer";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { Transaction } from "../FundDetails";

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
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState<string>(`table-${language}-${Date.now()}`);
  
  // Function to get direct translations from our dedicated translation files
  const getTranslation = useCallback((key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  }, [currentLanguage]);
  
  // Force rerender when language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`FundDetailsTable language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      // Generate a unique key based on language and timestamp to force re-render
      setForceUpdateKey(`table-${language}-${Date.now()}`);
    }
  }, [language, currentLanguage]);

  // Determine card description based on transaction count
  const getCardDescription = useCallback(() => {
    if (transactions.length === 0) {
      return getTranslation('noDataAvailable');
    } else if (transactions.length < 3) {
      return getTranslation('searchResults');
    } else {
      return getTranslation('displayAllRecords');
    }
  }, [transactions.length, getTranslation]);

  return (
    <Card 
      className="relative overflow-hidden bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-lg"
      key={forceUpdateKey}
      data-language={language}
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
          <span>{getTranslation('transactionDetails')}</span>
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
            setForceUpdateKey(`table-refresh-${language}-${Date.now()}`);
          })}
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
        
        <TransactionTableContainer 
          transactions={transactions} 
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
        
        <InformationBox 
          title={getTranslation('infoTitle')}
          items={[{ text: getTranslation('infoMessage') }]}
          currentLanguage={currentLanguage}
        />
      </CardContent>
    </Card>
  );
};

export default FundDetailsTable;
