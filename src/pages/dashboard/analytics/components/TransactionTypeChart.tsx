
import React, { useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LegendType } from "recharts";
import TranslatedText from "@/components/translation/TranslatedText";
import { useTranslation } from "@/context/TranslationProvider";

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
  const { translate, currentLanguage } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef(currentLanguage);
  
  // Update reference when language changes
  useEffect(() => {
    if (currentLanguage !== languageRef.current) {
      languageRef.current = currentLanguage;
    }
  }, [currentLanguage]);

  // Define data with proper translation keys
  const data: DataItem[] = useMemo(() => [
    { name: 'deposits', nameKey: 'analytics.deposits', value: 35 },
    { name: 'withdrawals', nameKey: 'analytics.withdrawals', value: 25 },
    { name: 'transfers', nameKey: 'analytics.transfers', value: 20 },
    { name: 'payments', nameKey: 'analytics.payments', value: 15 },
    { name: 'others', nameKey: 'analytics.others', value: 5 }
  ], []);

  // Precompute translations for performance
  const translatedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      translatedName: translate(`analytics.${item.name}`, item.name)
    }));
  }, [data, translate, currentLanguage]);

  const percentageLabel = useMemo(() => 
    translate("analytics.percentage", "Percentage"), 
    [translate, currentLanguage]
  );

  return (
    <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-lg font-semibold">
          <TranslatedText keyName="analytics.transactionsByType" fallback="Transaction Types" />
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
