import React, { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";

// Mock data for the chart
const generateChartData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month, idx) => ({
    name: month,
    customers: Math.floor(Math.random() * 1000) + 500,
    revenue: Math.floor(Math.random() * 50000) + 10000,
    transactions: Math.floor(Math.random() * 2000) + 800,
    index: idx
  }));
};

// Metric options with translations
const metricOptions = {
  customers: {
    label: {
      "en": "Customer Growth",
      "zh-CN": "客户增长",
      "zh-TW": "客戶增長",
      "fr": "Croissance Client",
      "es": "Crecimiento de Clientes"
    },
    color: "hsl(var(--primary))",
    gradient: ["rgba(0, 120, 255, 0.35)", "rgba(0, 120, 255, 0)"]
  },
  revenue: {
    label: {
      "en": "Revenue Growth",
      "zh-CN": "收入增长",
      "zh-TW": "收入增長",
      "fr": "Croissance du Revenu",
      "es": "Crecimiento de Ingresos"
    },
    color: "hsl(var(--success))",
    gradient: ["rgba(13, 180, 138, 0.35)", "rgba(13, 180, 138, 0)"]
  },
  transactions: {
    label: {
      "en": "Transaction Volume",
      "zh-CN": "交易量",
      "zh-TW": "交易量",
      "fr": "Volume de Transactions",
      "es": "Volumen de Transacciones"
    },
    color: "hsl(var(--warning))",
    gradient: ["rgba(255, 170, 0, 0.35)", "rgba(255, 170, 0, 0)"]
  }
};

// Time period options with translations
const timePeriodOptions = {
  "7d": {
    "en": "7 Days",
    "zh-CN": "7天",
    "zh-TW": "7天",
    "fr": "7 Jours",
    "es": "7 Días"
  },
  "30d": {
    "en": "30 Days",
    "zh-CN": "30天",
    "zh-TW": "30天",
    "fr": "30 Jours",
    "es": "30 Días"
  },
  "90d": {
    "en": "90 Days",
    "zh-CN": "90天",
    "zh-TW": "90天",
    "fr": "90 Jours",
    "es": "90 Días"
  },
  "1y": {
    "en": "1 Year",
    "zh-CN": "1年",
    "zh-TW": "1年",
    "fr": "1 An",
    "es": "1 Año"
  }
};

const monthTranslations = {
  Jan: {
    "en": "Jan",
    "zh-CN": "一月",
    "zh-TW": "一月",
    "fr": "Jan",
    "es": "Ene"
  },
  Feb: {
    "en": "Feb",
    "zh-CN": "二月",
    "zh-TW": "二月",
    "fr": "Fév",
    "es": "Feb"
  },
  Mar: {
    "en": "Mar",
    "zh-CN": "三月",
    "zh-TW": "三月",
    "fr": "Mar",
    "es": "Mar"
  },
  Apr: {
    "en": "Apr",
    "zh-CN": "四月",
    "zh-TW": "四月",
    "fr": "Avr",
    "es": "Abr"
  },
  May: {
    "en": "May",
    "zh-CN": "五月",
    "zh-TW": "五月",
    "fr": "Mai",
    "es": "May"
  },
  Jun: {
    "en": "Jun",
    "zh-CN": "六月",
    "zh-TW": "六月",
    "fr": "Juin",
    "es": "Jun"
  },
  Jul: {
    "en": "Jul",
    "zh-CN": "七月",
    "zh-TW": "七月",
    "fr": "Juil",
    "es": "Jul"
  },
  Aug: {
    "en": "Aug",
    "zh-CN": "八月",
    "zh-TW": "八月",
    "fr": "Août",
    "es": "Ago"
  },
  Sep: {
    "en": "Sep",
    "zh-CN": "九月",
    "zh-TW": "九月",
    "fr": "Sep",
    "es": "Sep"
  },
  Oct: {
    "en": "Oct",
    "zh-CN": "十月",
    "zh-TW": "十月",
    "fr": "Oct",
    "es": "Oct"
  },
  Nov: {
    "en": "Nov",
    "zh-CN": "十一月",
    "zh-TW": "十一月",
    "fr": "Nov",
    "es": "Nov"
  },
  Dec: {
    "en": "Dec",
    "zh-CN": "十二月",
    "zh-TW": "十二月",
    "fr": "Déc",
    "es": "Dic"
  }
};

const GrowthMetricsChart = () => {
  const [selectedMetric, setSelectedMetric] = useState<keyof typeof metricOptions>("customers");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<keyof typeof timePeriodOptions>("30d");
  const { theme } = useTheme();
  const { language } = useLanguage();

  const chartData = useMemo(() => {
    const generatedData = generateChartData();
    return generatedData.map(item => ({
      ...item,
      name: monthTranslations[item.name][language] || item.name
    }));
  }, [language]);

  const renderTooltipContent = (o: any) => {
    if (o && o.payload && o.payload.length) {
      const data = o.payload[0].payload;
      const metricLabel = metricOptions[selectedMetric].label[language] || metricOptions[selectedMetric].label["en"];
      const value = data[selectedMetric];

      return (
        <div className="p-2 bg-gray-800 text-white rounded shadow-md">
          <p className="font-bold">{data.name}</p>
          <p>{`${metricLabel}: ${value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Growth Metrics</CardTitle>
        <CardDescription>Track key performance indicators over time.</CardDescription>
      </CardHeader>
      <CardContent className="pl-4">
        <div className="flex items-center justify-between mb-4">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={metricOptions[selectedMetric].label[language] || metricOptions[selectedMetric].label["en"]} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(metricOptions).map(([key, metric]) => (
                <SelectItem key={key} value={key as string}>
                  {metric.label[language] || metric.label["en"]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={timePeriodOptions[selectedTimePeriod][language] || timePeriodOptions[selectedTimePeriod]["en"]} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(timePeriodOptions).map(([key, period]) => (
                <SelectItem key={key} value={key as string}>
                  {period[language] || period["en"]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip content={renderTooltipContent} />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={metricOptions[selectedMetric].color}
              fillOpacity={1}
              fill={`url(#${selectedMetric}-gradient)`}
            />
            <defs>
              <linearGradient id={`${selectedMetric}-gradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metricOptions[selectedMetric].gradient[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={metricOptions[selectedMetric].gradient[1]} stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GrowthMetricsChart;
