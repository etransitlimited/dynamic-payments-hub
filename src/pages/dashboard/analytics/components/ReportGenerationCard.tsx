
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileBarChart, Download } from 'lucide-react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import { getDirectTranslation } from '@/utils/translationHelpers';
import { LanguageCode } from '@/utils/languageUtils';

const ReportGenerationCard = () => {
  const { language, refreshCounter } = useSafeTranslation();

  // 直接获取翻译以确保最新
  const translations = useMemo(() => ({
    generateReports: getDirectTranslation("analytics.generateReports", language as LanguageCode, "Generate Reports"),
    downloadPDF: getDirectTranslation("wallet.financialTracking.downloadPDF", language as LanguageCode, "Download PDF"),
  }), [language]);

  // 使用稳定的key减少重渲染
  const cardKey = `report-card-${language}-${refreshCounter}`;
  
  return (
    <Card key={cardKey} data-language={language} className="overflow-hidden">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileBarChart className="h-5 w-5" />
            {translations.generateReports}
          </CardTitle>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 py-6"
          >
            <Download className="h-4 w-4 mr-2" />
            {translations.downloadPDF}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(ReportGenerationCard);
