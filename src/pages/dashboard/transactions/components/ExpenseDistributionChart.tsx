
import React, { useMemo, useRef, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from '@/utils/languageUtils';
import { getTransactionTranslation } from "../i18n";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

// Define data item type
interface DataItem {
  name: string;
  nameKey: string;
  value: number;
}

const ExpenseDistributionChart: React.FC = () => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Update reference when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      setRefreshKey(prev => prev + 1);
    }
  }, [language, refreshCounter]);
  
  // Define base data with translation keys
  const baseData: DataItem[] = useMemo(() => [
    { name: "tech", nameKey: "tech", value: 35 },
    { name: "office", nameKey: "office", value: 25 },
    { name: "marketing", nameKey: "marketing", value: 18 },
    { name: "travel", nameKey: "travel", value: 12 },
    { name: "services", nameKey: "services", value: 8 },
    { name: "others", nameKey: "others", value: 2 }
  ], []);
  
  // Transform data with translations
  const data = useMemo(() => {
    return baseData.map(item => ({
      ...item,
      name: getTransactionTranslation(`transactions.${item.nameKey}`, languageRef.current)
    }));
  }, [baseData, languageRef.current, refreshKey]);
  
  // Custom tooltip that respects language
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const percentageText = getTransactionTranslation("transactions.percentage", languageRef.current);
      
      return (
        <div className="bg-background/90 border border-border/40 rounded-md p-2 text-xs backdrop-blur-md shadow-md">
          <p className="font-medium mb-1">{label}</p>
          <p className="text-emerald-400">{`${percentageText}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[250px] w-full" key={`expense-chart-${language}-${refreshKey}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#333" opacity={0.2} />
          <XAxis type="number" domain={[0, 'dataMax']} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={80} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseDistributionChart;
