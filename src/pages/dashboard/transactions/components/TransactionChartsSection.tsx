
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { getTransactionTranslation } from "../i18n";
import { fadeIn, slideInRight } from "../utils/animationUtils";

// Sample chart data
const generateTransactionData = (language: string) => {
  const getMonth = (month: string) => getTransactionTranslation(month, language as any);
  
  return [
    { name: getMonth('jan'), transactions: 1200 },
    { name: getMonth('feb'), transactions: 1900 },
    { name: getMonth('mar'), transactions: 1500 },
    { name: getMonth('apr'), transactions: 2200 },
    { name: getMonth('may'), transactions: 2800 },
    { name: getMonth('jun'), transactions: 2600 },
    { name: getMonth('jul'), transactions: 3100 },
    { name: getMonth('aug'), transactions: 3400 },
    { name: getMonth('sep'), transactions: 3700 },
    { name: getMonth('oct'), transactions: 3300 },
    { name: getMonth('nov'), transactions: 3900 },
    { name: getMonth('dec'), transactions: 4100 }
  ];
};

const generateConversionData = (language: string) => {
  const getMonth = (month: string) => getTransactionTranslation(month, language as any);
  
  return [
    { name: getMonth('jan'), rate: 2.5 },
    { name: getMonth('feb'), rate: 3.2 },
    { name: getMonth('mar'), rate: 3.0 },
    { name: getMonth('apr'), rate: 3.8 },
    { name: getMonth('may'), rate: 4.2 },
    { name: getMonth('jun'), rate: 4.1 },
    { name: getMonth('jul'), rate: 4.5 },
    { name: getMonth('aug'), rate: 4.9 },
    { name: getMonth('sep'), rate: 5.2 },
    { name: getMonth('oct'), rate: 5.0 },
    { name: getMonth('nov'), rate: 5.5 },
    { name: getMonth('dec'), rate: 5.8 }
  ];
};

const TransactionChartsSection: React.FC = () => {
  const { language } = useLanguage();
  const [chartData, setChartData] = useState(() => generateTransactionData(language));
  const [conversionData, setConversionData] = useState(() => generateConversionData(language));
  const [uniqueKey, setUniqueKey] = useState(`chart-${language}-${Date.now()}`);

  // Update chart data when language changes
  useEffect(() => {
    setChartData(generateTransactionData(language));
    setConversionData(generateConversionData(language));
    setUniqueKey(`chart-${language}-${Date.now()}`);
  }, [language]);

  // Title and subtitle translations
  const title = getTransactionTranslation("transactionStatistics", language);
  const subtitle = getTransactionTranslation("transactionAnalytics", language);

  return (
    <motion.div
      key={uniqueKey}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-[#071B39]/90 backdrop-blur-sm rounded-2xl p-5 border border-blue-800/20"
      data-language={language}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-blue-300/80 text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          variants={slideInRight} 
          custom={0.1}
          className="bg-[#0A2547] rounded-xl p-4 h-[300px]"
        >
          <h4 className="text-blue-300 mb-4 text-sm font-medium">{getTransactionTranslation("transactionsByType", language)}</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#60A5FA', fontSize: 10 }} 
                axisLine={{ stroke: '#1E40AF30' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#60A5FA', fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F2D5F', 
                  borderColor: '#3B82F680',
                  borderRadius: '0.375rem',
                  color: '#fff' 
                }} 
              />
              <Bar dataKey="transactions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          variants={slideInRight} 
          custom={0.2}
          className="bg-[#0A2547] rounded-xl p-4 h-[300px]"
        >
          <h4 className="text-blue-300 mb-4 text-sm font-medium">{getTransactionTranslation("monthlyTransactions", language)}</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#60A5FA', fontSize: 10 }} 
                axisLine={{ stroke: '#1E40AF30' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#60A5FA', fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F2D5F', 
                  borderColor: '#3B82F680',
                  borderRadius: '0.375rem',
                  color: '#fff' 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#A855F7" 
                strokeWidth={2}
                dot={{ r: 4, fill: '#A855F7', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#A855F7' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransactionChartsSection;
