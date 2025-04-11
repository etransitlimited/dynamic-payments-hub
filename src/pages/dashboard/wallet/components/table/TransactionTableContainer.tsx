
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import TransactionRow from "./TransactionRow";
import TableHeader from "./TableHeader";
import { Transaction } from "../../FundDetails";
import { LanguageCode } from "@/utils/languageUtils";
import { useLanguage } from "@/context/LanguageContext";

interface TransactionTableContainerProps {
  transactions: Transaction[];
  currentLanguage: LanguageCode;
  getTranslation?: (key: string) => string;
}

const TransactionTableContainer: React.FC<TransactionTableContainerProps> = ({ 
  transactions = [], 
  currentLanguage,
  getTranslation 
}) => {
  const { language } = useLanguage();
  const [effectiveLanguage, setEffectiveLanguage] = useState<LanguageCode>(currentLanguage);
  const [tableKey, setTableKey] = useState(`table-${currentLanguage}-${Date.now()}`);
  
  // 确保显示最新语言
  useEffect(() => {
    if (language !== effectiveLanguage) {
      console.log(`TransactionTableContainer language changed: ${effectiveLanguage} -> ${language}`);
      setEffectiveLanguage(language as LanguageCode);
      setTableKey(`table-${language}-${Date.now()}`);
    }
  }, [language, effectiveLanguage, currentLanguage]);

  // 监听语言变更事件
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== effectiveLanguage) {
        console.log(`TransactionTableContainer language event: ${effectiveLanguage} -> ${newLanguage}`);
        setEffectiveLanguage(newLanguage as LanguageCode);
        setTableKey(`table-${newLanguage}-${Date.now()}`);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, [effectiveLanguage]);

  return (
    <div className="rounded-md border border-purple-900/30 mt-4" key={tableKey}>
      <Table>
        <TableHeader 
          currentLanguage={effectiveLanguage} 
          getTranslation={getTranslation}
        />
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionRow 
                key={`${transaction.id}-${effectiveLanguage}`}
                transaction={transaction}
                currentLanguage={effectiveLanguage}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-purple-300/50">
                {getTranslation ? getTranslation('noDataAvailable') : 'No data available'}
              </td>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(TransactionTableContainer);
