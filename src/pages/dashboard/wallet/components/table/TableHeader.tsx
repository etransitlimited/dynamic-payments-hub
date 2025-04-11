
import React, { useEffect, useState, useMemo } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../../i18n";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";

interface TableHeaderComponentProps {
  currentLanguage: LanguageCode;
  getTranslation?: (key: string) => string;
}

const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({ 
  currentLanguage,
  getTranslation
}) => {
  const { language, refreshCounter } = useSafeTranslation();
  const { language: contextLanguage } = useLanguage();
  const [uniqueKey, setUniqueKey] = useState(`header-${currentLanguage}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`TableHeaderComponent language updated: ${language}, currentLanguage: ${currentLanguage}, contextLanguage: ${contextLanguage}`);
    setUniqueKey(`header-${currentLanguage}-${language}-${contextLanguage}-${Date.now()}-${refreshCounter}`);
  }, [currentLanguage, language, contextLanguage, refreshCounter]);
  
  // 直接获取翻译，而不依赖传入的getTranslation
  const getTranslationSafe = (key: string): string => {
    // 优先使用传入的getTranslation函数
    if (getTranslation) {
      return getTranslation(key);
    }
    // 如果没有传入getTranslation，则直接从模块i18n中获取
    return getFundDetailsTranslation(key, contextLanguage as LanguageCode || language as LanguageCode || currentLanguage);
  };
  
  // Memoize translations to avoid re-renders
  const translations = useMemo(() => ({
    idText: getTranslationSafe('transactionId'),
    typeText: getTranslationSafe('transactionType'),
    amountText: getTranslationSafe('amount'),
    balanceText: getTranslationSafe('balance'),
    timeText: getTranslationSafe('transactionTime'),
    noteText: getTranslationSafe('note')
  }), [getTranslationSafe, contextLanguage, language, currentLanguage, refreshCounter]);

  return (
    <TableHeader className="bg-purple-900/30" key={uniqueKey} data-language={currentLanguage}>
      <TableRow className="border-purple-900/30 hover:bg-transparent">
        <TableHead className="text-purple-200 font-medium">
          {translations.idText}
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.typeText}
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.amountText} (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.balanceText} (USD)
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.timeText}
        </TableHead>
        <TableHead className="text-purple-200 font-medium">
          {translations.noteText}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default React.memo(TableHeaderComponent);
