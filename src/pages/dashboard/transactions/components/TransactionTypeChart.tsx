
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { BarChart3 } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const TransactionTypeChart = () => {
  const { t, language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Monitor language changes and force re-render
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`TransactionTypeChart language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
      setRefreshKey(prev => prev + 1);
    }
  }, [language, currentLanguage]);

  // Create a function to generate data with translations
  const getTransactionData = () => {
    return [
      { 
        name: t("transactions.payment", "Payment"),
        value: 45, 
        key: "payment",
        translationKey: "transactions.payment"
      },
      { 
        name: t("transactions.transfer", "Transfer"),
        value: 30, 
        key: "transfer",
        translationKey: "transactions.transfer"
      },
      { 
        name: t("transactions.exchange", "Exchange"), 
        value: 15, 
        key: "exchange",
        translationKey: "transactions.exchange"
      },
      { 
        name: t("transactions.expense", "Expense"), 
        value: 10, 
        key: "expense",
        translationKey: "transactions.expense"
      },
    ];
  };

  // Re-create data when language changes
  const [data, setData] = useState(getTransactionData());
  
  useEffect(() => {
    setData(getTransactionData());
  }, [language, refreshKey]);

  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#6366F1'];

  // Custom tooltip component with translation support
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-charcoal-dark/95 border border-purple-700 rounded-lg p-3 shadow-lg backdrop-blur-sm">
          <p className="text-white text-sm font-medium mb-1">
            {payload[0].name}
          </p>
          <p className="text-purple-300 text-xs">
            <span className="font-bold">{payload[0].value}%</span>{' '}
            <TranslatedText 
              keyName="transactions.rate" 
              fallback="Percentage" 
              key={`percentage-${language}-${refreshKey}`}
            />
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend renderer
  const renderLegend = (props: any) => {
    const { payload } = props || {};
    
    if (!payload || !Array.isArray(payload)) {
      return null;
    }
    
    return (
      <ul className="flex flex-col items-start space-y-2 mt-2">
        {data.map((entry, index) => (
          <li key={`item-${index}-${language}-${refreshKey}`} className="flex items-center text-xs text-white/80">
            <div
              className="w-3 h-3 mr-2 rounded"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card 
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full"
      key={`transaction-type-chart-${language}-${refreshKey}`}
      data-language={language}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <BarChart3 size={18} className="text-purple-300" />
          </div>
          <TranslatedText 
            keyName="transactions.transactionsByType" 
            fallback="Transactions by Type" 
            key={`title-${language}-${refreshKey}`}
          />
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          <TranslatedText 
            keyName="transactions.rate" 
            fallback="Percentage" 
            key={`subtitle-${language}-${refreshKey}`}
          />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-4 pb-2 px-2 sm:px-6">
        <div className="flex flex-row justify-between items-start">
          <ResponsiveContainer width="80%" height={260}>
            <BarChart 
              data={data} 
              barGap={8} 
              barSize={32} 
              layout="vertical"
              key={`barchart-${language}-${refreshKey}`}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category"
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                width={90}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
                label={{
                  position: 'right',
                  fill: '#d1d5db',
                  fontSize: 11,
                  formatter: (value: number) => `${value}%`,
                  dx: 5
                }}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}-${language}-${refreshKey}`} 
                    fill={COLORS[index % COLORS.length]} 
                    style={{
                      filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3))",
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Legend on the right */}
          <div className="w-[20%] px-2">
            <Legend 
              content={renderLegend} 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTypeChart;
