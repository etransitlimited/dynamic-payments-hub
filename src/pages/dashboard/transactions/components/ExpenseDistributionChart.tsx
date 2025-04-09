
import React, { useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from '@/utils/languageUtils';
import { getTransactionTranslation } from "../i18n";

// Define data item type
interface DataItem {
  name: string;
  nameKey: string;
  value: number;
  translatedName?: string;
}

const ExpenseDistributionChart: React.FC = () => {
  const { language } = useLanguage();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const [refreshKey, setRefreshKey] = React.useState(0);
  
  // Update reference when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      setRefreshKey(prev => prev + 1);
    }
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && newLanguage !== languageRef.current) {
        languageRef.current = newLanguage as LanguageCode;
        setRefreshKey(prev => prev + 1);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  // Use translation keys for categories
  const data: DataItem[] = useMemo(() => [
    {
      name: "tech",
      nameKey: "transactions.tech",
      value: 42,
    },
    {
      name: "office",
      nameKey: "transactions.office",
      value: 28,
    },
    {
      name: "marketing",
      nameKey: "transactions.marketing",
      value: 15,
    },
    {
      name: "travel",
      nameKey: "transactions.travel",
      value: 10,
    },
    {
      name: "services",
      nameKey: "transactions.services",
      value: 5,
    }
  ], []);

  // Precompute translations for performance with memoization
  const translatedData = useMemo(() => data.map(item => ({
    ...item,
    translatedName: getTransactionTranslation(item.nameKey, languageRef.current)
  })), [data, languageRef.current, refreshKey]);

  const percentageLabel = useMemo(() => 
    getTransactionTranslation("transactions.percentage", languageRef.current) || "Percentage",
    [languageRef.current, refreshKey]
  );

  const chartTitle = useMemo(() => 
    getTransactionTranslation("transactions.expenseDistribution", languageRef.current) || "Expense Distribution",
    [languageRef.current, refreshKey]
  );

  return (
    <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-lg font-semibold">
          {chartTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pb-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={translatedData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                type="number" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                dataKey="translatedName" 
                type="category" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  borderColor: '#334155',
                  color: '#e2e8f0' 
                }}
                formatter={(value) => [`${value}%`, percentageLabel]}
              />
              <Bar 
                dataKey="value" 
                fill="#10b981" 
                radius={[0, 4, 4, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseDistributionChart;
