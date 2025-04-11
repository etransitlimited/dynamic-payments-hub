
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
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
  const { language, refreshCounter } = useSafeTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const componentRef = useRef<HTMLDivElement>(null);
  const isInitialMountRef = useRef(true);
  const tableKey = useRef(`fund-details-table-${Math.random().toString(36).substring(2, 9)}`);
  
  // Function to get direct translations from our dedicated translation files
  const getTranslation = useCallback((key: string): string => {
    return getFundDetailsTranslation(key, languageRef.current);
  }, [languageRef.current]);
  
  // Force rerender when language changes, not on first mount
  useEffect(() => {
    if (!isInitialMountRef.current && languageRef.current !== language) {
      console.log(`FundDetailsTable language changed from ${languageRef.current} to ${language}`);
      languageRef.current = language as LanguageCode;
      tableKey.current = `fund-details-table-${language}-${Date.now()}`;
      
      if (componentRef.current) {
        componentRef.current.setAttribute('data-language', language);
        componentRef.current.setAttribute('data-refresh', Date.now().toString());
      }
    }
    isInitialMountRef.current = false;
  }, [language, refreshCounter]);

  // Direct listener for language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== languageRef.current) {
        console.log(`FundDetailsTable language event: ${languageRef.current} to ${newLanguage}`);
        languageRef.current = newLanguage as LanguageCode;
        tableKey.current = `fund-details-table-${newLanguage}-${Date.now()}`;
        
        if (componentRef.current) {
          componentRef.current.setAttribute('data-language', newLanguage as LanguageCode);
          componentRef.current.setAttribute('data-event-update', Date.now().toString());
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

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
      key={tableKey.current}
      data-language={languageRef.current}
      ref={componentRef}
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
          })}
          currentLanguage={languageRef.current}
          getTranslation={getTranslation}
        />
        
        <TransactionTableContainer 
          transactions={transactions} 
          currentLanguage={languageRef.current}
          getTranslation={getTranslation}
        />
        
        <InformationBox 
          title={getTranslation('infoTitle')}
          items={[{ text: getTranslation('infoMessage') }]}
          currentLanguage={languageRef.current}
        />
      </CardContent>
    </Card>
  );
};

export default React.memo(FundDetailsTable);
