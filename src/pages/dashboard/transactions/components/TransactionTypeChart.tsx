
import React, { useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LegendType } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from '@/utils/languageUtils';
import { getTransactionTranslation } from "../i18n";

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

// Define a type for our data items
interface DataItem {
  name: string;
  nameKey: string;
  value: number;
  translatedName?: string;
}

// Define a type for custom legend payload item that matches recharts expectations
interface CustomizedPayloadItem {
  value: string;
  type?: LegendType;
  id?: string;
  color?: string;
  payload?: {
    translatedName?: string;
    name?: string;
    nameKey?: string;
    value?: number;
    [key: string]: any;
  };
}

const TransactionTypeChart: React.FC = () => {
  const { language } = useLanguage();
  const chartRef = useRef<HTMLDivElement>(null);
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
  
  // Define data with proper translation keys
  const data: DataItem[] = useMemo(() => [
    { name: 'deposits', nameKey: 'transactions.deposits', value: 35 },
    { name: 'withdrawals', nameKey: 'transactions.withdrawals', value: 25 },
    { name: 'transfers', nameKey: 'transactions.transfers', value: 20 },
    { name: 'payments', nameKey: 'transactions.payments', value: 15 },
    { name: 'others', nameKey: 'transactions.others', value: 5 }
  ], []);

  // Precompute translations for performance
  const translatedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      translatedName: getTransactionTranslation(item.nameKey, languageRef.current)
    }));
  }, [data, languageRef.current, refreshKey]);

  const percentageLabel = useMemo(() => 
    getTransactionTranslation("transactions.percentage", languageRef.current) || "Percentage", 
    [languageRef.current, refreshKey]
  );

  const chartTitle = useMemo(() => 
    getTransactionTranslation("transactions.transactionsByType", languageRef.current) || "Transaction Types",
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
        <div className="h-[300px] w-full" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={translatedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                paddingAngle={5}
                dataKey="value"
                nameKey="translatedName"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {translatedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, percentageLabel]}
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  borderColor: '#334155',
                  color: '#e2e8f0' 
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend 
                formatter={(value, entry) => {
                  const typedEntry = entry as CustomizedPayloadItem;
                  if (typedEntry && typedEntry.payload && typedEntry.payload.translatedName) {
                    return typedEntry.payload.translatedName;
                  }
                  return value;
                }}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ paddingLeft: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTypeChart;
