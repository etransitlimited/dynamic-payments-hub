
import React, { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

// 生成图表数据
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

type MetricKey = "customers" | "revenue" | "transactions";
type TimePeriodKey = "7d" | "30d" | "90d" | "1y";

// 月份名称翻译
const monthTranslations: Record<string, Record<LanguageCode, string>> = {
  "Jan": {
    "en": "Jan",
    "zh-CN": "一月",
    "zh-TW": "一月",
    "fr": "Jan",
    "es": "Ene"
  },
  "Feb": {
    "en": "Feb",
    "zh-CN": "二月",
    "zh-TW": "二月",
    "fr": "Fév",
    "es": "Feb"
  },
  "Mar": {
    "en": "Mar",
    "zh-CN": "三月",
    "zh-TW": "三月",
    "fr": "Mar",
    "es": "Mar"
  },
  "Apr": {
    "en": "Apr",
    "zh-CN": "四月",
    "zh-TW": "四月",
    "fr": "Avr",
    "es": "Abr"
  },
  "May": {
    "en": "May",
    "zh-CN": "五月",
    "zh-TW": "五月",
    "fr": "Mai",
    "es": "May"
  },
  "Jun": {
    "en": "Jun",
    "zh-CN": "六月",
    "zh-TW": "六月",
    "fr": "Juin",
    "es": "Jun"
  },
  "Jul": {
    "en": "Jul",
    "zh-CN": "七月",
    "zh-TW": "七月",
    "fr": "Juil",
    "es": "Jul"
  },
  "Aug": {
    "en": "Aug",
    "zh-CN": "八月",
    "zh-TW": "八月",
    "fr": "Août",
    "es": "Ago"
  },
  "Sep": {
    "en": "Sep",
    "zh-CN": "九月",
    "zh-TW": "九月",
    "fr": "Sep",
    "es": "Sep"
  },
  "Oct": {
    "en": "Oct",
    "zh-CN": "十月",
    "zh-TW": "十月",
    "fr": "Oct",
    "es": "Oct"
  },
  "Nov": {
    "en": "Nov",
    "zh-CN": "十一月",
    "zh-TW": "十一月",
    "fr": "Nov",
    "es": "Nov"
  },
  "Dec": {
    "en": "Dec",
    "zh-CN": "十二月",
    "zh-TW": "十二月",
    "fr": "Déc",
    "es": "Dic"
  }
};

const GrowthMetricsChart = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("customers");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriodKey>("30d");
  const { theme } = useTheme();
  const { language, refreshCounter } = useSafeTranslation();
  const currentLanguage = language as LanguageCode;
  
  // 获取所有需要的翻译
  const translations = useMemo(() => ({
    title: getDirectTranslation("analytics.growthMetrics", currentLanguage, "Growth Metrics"),
    description: getDirectTranslation("analytics.trackMetrics", currentLanguage, "Track key performance indicators over time"),
    customerGrowth: getDirectTranslation("analytics.customerGrowth", currentLanguage, "Customer Growth"),
    revenueGrowth: getDirectTranslation("analytics.revenueGrowth", currentLanguage, "Revenue Growth"),
    transactionVolume: getDirectTranslation("analytics.transactionVolume", currentLanguage, "Transaction Volume"),
    days7: getDirectTranslation("analytics.days7", currentLanguage, "7 Days"),
    days30: getDirectTranslation("analytics.days30", currentLanguage, "30 Days"),
    days90: getDirectTranslation("analytics.days90", currentLanguage, "90 Days"),
    year1: getDirectTranslation("analytics.year1", currentLanguage, "1 Year")
  }), [currentLanguage]);
  
  // 指标选项配置
  const metricOptions: Record<MetricKey, { label: string, color: string, gradient: string[] }> = useMemo(() => ({
    customers: {
      label: translations.customerGrowth,
      color: "hsl(var(--primary))",
      gradient: ["rgba(0, 120, 255, 0.35)", "rgba(0, 120, 255, 0)"]
    },
    revenue: {
      label: translations.revenueGrowth,
      color: "hsl(var(--success))",
      gradient: ["rgba(13, 180, 138, 0.35)", "rgba(13, 180, 138, 0)"]
    },
    transactions: {
      label: translations.transactionVolume,
      color: "hsl(var(--warning))",
      gradient: ["rgba(255, 170, 0, 0.35)", "rgba(255, 170, 0, 0)"]
    }
  }), [translations]);
  
  // 时间段选项配置
  const timePeriodOptions: Record<TimePeriodKey, string> = useMemo(() => ({
    "7d": translations.days7,
    "30d": translations.days30,
    "90d": translations.days90,
    "1y": translations.year1
  }), [translations]);

  // 处理原始数据，翻译月份名称
  const chartData = useMemo(() => {
    const generatedData = generateChartData();
    return generatedData.map(item => ({
      ...item,
      name: monthTranslations[item.name][currentLanguage] || item.name
    }));
  }, [currentLanguage]);

  // 自定义tooltip
  const renderTooltipContent = (o: any) => {
    if (o && o.payload && o.payload.length) {
      const data = o.payload[0].payload;
      const metricLabel = metricOptions[selectedMetric].label;
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

  // 处理指标变化
  const handleMetricChange = (value: string) => {
    setSelectedMetric(value as MetricKey);
  };

  // 处理时间段变化
  const handleTimePeriodChange = (value: string) => {
    setSelectedTimePeriod(value as TimePeriodKey);
  };

  // 使用稳定的key避免频繁重渲染
  const chartKey = `growth-metrics-${currentLanguage}-${refreshCounter}`;

  return (
    <Card key={chartKey} data-language={currentLanguage}>
      <CardHeader>
        <CardTitle>{translations.title}</CardTitle>
        <CardDescription>{translations.description}</CardDescription>
      </CardHeader>
      <CardContent className="pl-4">
        <div className="flex items-center justify-between mb-4">
          <Select value={selectedMetric} onValueChange={handleMetricChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={metricOptions[selectedMetric].label} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(metricOptions).map(([key, metric]) => (
                <SelectItem key={`${key}-${currentLanguage}`} value={key}>
                  {metric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTimePeriod} onValueChange={handleTimePeriodChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={timePeriodOptions[selectedTimePeriod]} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(timePeriodOptions).map(([key, label]) => (
                <SelectItem key={`${key}-${currentLanguage}`} value={key}>
                  {label}
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

export default React.memo(GrowthMetricsChart);
