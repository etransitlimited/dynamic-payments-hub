
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { TrendingUp } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { LanguageCode } from "@/utils/languageUtils";

const data = [
  { name: "Jan", users: 1000, revenue: 1400, transactions: 700 },
  { name: "Feb", users: 1200, revenue: 1600, transactions: 800 },
  { name: "Mar", users: 1500, revenue: 1900, transactions: 1000 },
  { name: "Apr", users: 1300, revenue: 1700, transactions: 1100 },
  { name: "May", users: 1700, revenue: 2400, transactions: 1300 },
  { name: "Jun", users: 1600, revenue: 2200, transactions: 1200 },
  { name: "Jul", users: 2000, revenue: 2700, transactions: 1500 },
];

const GrowthMetricsChart = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  
  console.log("GrowthMetricsChart language:", language);
  
  // Direct hardcoded translations for month names to avoid encoding issues
  const getTranslatedMonthName = (monthAbbr: string) => {
    const monthMap: Record<string, Record<LanguageCode, string>> = {
      "Jan": { "zh-CN": "一月", "zh-TW": "一月", "en": "Jan", "fr": "Jan", "es": "Ene" },
      "Feb": { "zh-CN": "二月", "zh-TW": "二月", "en": "Feb", "fr": "Fév", "es": "Feb" },
      "Mar": { "zh-CN": "三月", "zh-TW": "三月", "en": "Mar", "fr": "Mar", "es": "Mar" },
      "Apr": { "zh-CN": "四月", "zh-TW": "四月", "en": "Apr", "fr": "Avr", "es": "Abr" },
      "May": { "zh-CN": "五月", "zh-TW": "五月", "en": "May", "fr": "Mai", "es": "May" },
      "Jun": { "zh-CN": "六月", "zh-TW": "六月", "en": "Jun", "fr": "Juin", "es": "Jun" },
      "Jul": { "zh-CN": "七月", "zh-TW": "七月", "en": "Jul", "fr": "Juil", "es": "Jul" },
      "Aug": { "zh-CN": "八月", "zh-TW": "八月", "en": "Aug", "fr": "Août", "es": "Ago" },
      "Sep": { "zh-CN": "九月", "zh-TW": "九月", "en": "Sep", "fr": "Sep", "es": "Sep" },
      "Oct": { "zh-CN": "十月", "zh-TW": "十月", "en": "Oct", "fr": "Oct", "es": "Oct" },
      "Nov": { "zh-CN": "十一月", "zh-TW": "十一月", "en": "Nov", "fr": "Nov", "es": "Nov" },
      "Dec": { "zh-CN": "十二月", "zh-TW": "十二月", "en": "Dec", "fr": "Déc", "es": "Dic" }
    };
    
    return monthMap[monthAbbr]?.[language as LanguageCode] || monthAbbr;
  };

  // Direct hardcoded translations for metrics labels to avoid encoding issues
  const getTranslatedLabels = () => {
    if (language === 'zh-CN') {
      return {
        users: "用户",
        revenue: "收入",
        transactions: "交易"
      };
    } else if (language === 'zh-TW') {
      return {
        users: "用戶",
        revenue: "收入",
        transactions: "交易"
      };
    } else if (language === 'fr') {
      return {
        users: "Utilisateurs",
        revenue: "Revenu",
        transactions: "Transactions"
      };
    } else if (language === 'es') {
      return {
        users: "Usuarios",
        revenue: "Ingresos",
        transactions: "Transacciones"
      };
    } else {
      return {
        users: "Users",
        revenue: "Revenue",
        transactions: "Transactions"
      };
    }
  };

  const translatedLabels = getTranslatedLabels();
  
  const translatedData = useMemo(() => {
    console.log("Translating data with language:", language);
    return data.map(item => ({
      ...item,
      originalName: item.name,
      name: getTranslatedMonthName(item.name)
    }));
  }, [language]);

  // Fixed translations for series names to avoid encoding issues
  const getSeriesName = (name: string): string => {
    const seriesTranslations: Record<string, Record<LanguageCode, string>> = {
      "users": { 
        "zh-CN": "用户", 
        "zh-TW": "用戶", 
        "en": "Users", 
        "fr": "Utilisateurs", 
        "es": "Usuarios" 
      },
      "revenue": { 
        "zh-CN": "收入", 
        "zh-TW": "收入", 
        "en": "Revenue", 
        "fr": "Revenu", 
        "es": "Ingresos" 
      },
      "transactions": { 
        "zh-CN": "交易", 
        "zh-TW": "交易", 
        "en": "Transactions", 
        "fr": "Transactions", 
        "es": "Transacciones" 
      }
    };
    
    return seriesTranslations[name]?.[language as LanguageCode] || name;
  };

  // Direct hardcoded translations for title and labels
  const titleTranslations: Record<LanguageCode, string> = {
    "zh-CN": "增长指标",
    "zh-TW": "增長指標",
    "en": "Growth Metrics",
    "fr": "Métriques de Croissance",
    "es": "Métricas de Crecimiento"
  };
  
  const yearToDateTranslations: Record<LanguageCode, string> = {
    "zh-CN": "年初至今",
    "zh-TW": "年初至今",
    "en": "Year to Date",
    "fr": "Année à ce Jour",
    "es": "Año hasta la Fecha"
  };
  
  const growthMetricsTitle = titleTranslations[language as LanguageCode] || "Growth Metrics";
  const yearToDateText = yearToDateTranslations[language as LanguageCode] || "Year to Date";

  console.log(`Chart title in ${language}:`, growthMetricsTitle);
  console.log(`Year to date in ${language}:`, yearToDateText);

  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <TrendingUp size={18} className="text-purple-300" />
          </div>
          {growthMetricsTitle}
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          {yearToDateText}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={translatedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#333', opacity: 0.2 }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#333', opacity: 0.2 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 30, 40, 0.8)',
                borderColor: '#6D28D9',
                borderRadius: '0.5rem',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              cursor={{ stroke: '#6D28D9', strokeWidth: 1 }}
              formatter={(value, name) => {
                const seriesName = getSeriesName(name as string);
                return [value, seriesName];
              }}
              labelFormatter={(label) => {
                return label;
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "12px",
                color: "#9CA3AF",
              }}
              formatter={(value, entry) => {
                return translatedLabels[value as keyof typeof translatedLabels] || value;
              }}
            />
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Line 
              type="monotone" 
              dataKey="users" 
              name="users"
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              name="revenue"
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              animationDuration={1500}
              animationBegin={300}
            />
            <Line 
              type="monotone" 
              dataKey="transactions" 
              name="transactions"
              stroke="#F59E0B" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
              animationDuration={1500}
              animationBegin={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GrowthMetricsChart;
