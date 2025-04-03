
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { BarChart3 } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const TransactionTypeChart = () => {
  const { t, language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  // Monitor language changes and force re-render
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`TransactionTypeChart language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
    }
  }, [language, currentLanguage]);

  // Transaction types data with correct translation keys
  const data = [
    { 
      name: <TranslatedText 
              keyName="transactions.payment" 
              fallback="Payment" 
              key={`payment-${language}`} 
            />, 
      value: 45, 
      key: "payment",
      translationKey: "transactions.payment"
    },
    { 
      name: <TranslatedText 
              keyName="transactions.transfer" 
              fallback="Transfer" 
              key={`transfer-${language}`} 
            />, 
      value: 30, 
      key: "transfer",
      translationKey: "transactions.transfer"
    },
    { 
      name: <TranslatedText 
              keyName="transactions.exchange" 
              fallback="Exchange" 
              key={`exchange-${language}`} 
            />, 
      value: 15, 
      key: "exchange",
      translationKey: "transactions.exchange"
    },
    { 
      name: <TranslatedText 
              keyName="transactions.expense" 
              fallback="Expense" 
              key={`expense-${language}`} 
            />, 
      value: 10, 
      key: "expense",
      translationKey: "transactions.expense"
    },
  ];

  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#6366F1'];

  // Custom tooltip component with translation support
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-charcoal-dark/90 border border-purple-700 rounded-lg p-3 shadow-lg">
          <p className="text-white text-sm font-medium mb-1">
            {React.isValidElement(label) ? (
              <TranslatedText 
                keyName={item.translationKey} 
                fallback={item.key} 
                key={`tooltip-${item.key}-${language}`}
              />
            ) : label}
          </p>
          <p className="text-purple-300 text-xs">
            <span className="font-bold">{payload[0].value}%</span>{' '}
            <TranslatedText 
              keyName="analytics.percentage" 
              fallback="Percentage" 
              key={`percentage-${language}`}
            />
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend component with translation support
  const renderLegend = (props: any) => {
    const { payload } = props || {};
    
    // Check if payload exists and is an array before mapping over it
    if (!payload || !Array.isArray(payload)) {
      return null;
    }
    
    return (
      <ul className="flex flex-col items-start space-y-2 mt-2">
        {payload.map((entry: any, index: number) => {
          const dataItem = data[index];
          return (
            <li key={`item-${index}-${language}`} className="flex items-center text-xs text-white/80">
              <div
                className="w-3 h-3 mr-2 rounded"
                style={{ backgroundColor: entry.color }}
              />
              <TranslatedText 
                keyName={dataItem.translationKey} 
                fallback={dataItem.key} 
                key={`legend-${dataItem.key}-${language}`}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Card 
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full"
      key={`transaction-type-chart-${language}`}
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
            keyName="analytics.transactionsByType" 
            fallback="Transaction Types" 
            key={`title-${language}`}
          />
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          <TranslatedText 
            keyName="analytics.percentage" 
            fallback="Percentage" 
            key={`subtitle-${language}`}
          />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-4 pb-2 px-2 sm:px-6">
        <div className="flex flex-row justify-between items-start">
          <ResponsiveContainer width="80%" height={260}>
            <BarChart 
              data={data} 
              barGap={8} 
              barSize={28} 
              layout="vertical"
              key={`barchart-${language}`}
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
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}-${language}`} 
                    fill={COLORS[index % COLORS.length]} 
                    style={{
                      filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))",
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
