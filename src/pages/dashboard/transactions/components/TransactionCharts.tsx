
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity, PieChart as PieChartIcon, BarChart as BarChartIcon } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";

const TransactionCharts = () => {
  const { language } = useSafeTranslation();
  
  // Transform month names into plain strings that recharts can handle
  const monthlyData = [
    { name: "Jan", translationKey: "jan", amount: 1200, count: 156 },
    { name: "Feb", translationKey: "feb", amount: 1900, count: 189 },
    { name: "Mar", translationKey: "mar", amount: 1500, count: 143 },
    { name: "Apr", translationKey: "apr", amount: 2200, count: 217 },
    { name: "May", translationKey: "may", amount: 2800, count: 275 },
    { name: "Jun", translationKey: "jun", amount: 2300, count: 220 },
    { name: "Jul", translationKey: "jul", amount: 3100, count: 305 },
  ];
  
  // Transaction type data with translation keys
  const typeData = [
    { name: "Deposit", translationKey: "typeDeposit", value: 45 },
    { name: "Withdrawal", translationKey: "typeWithdrawal", value: 25 },
    { name: "Transfer", translationKey: "typeTransfer", value: 20 },
    { name: "Payment", translationKey: "typePayment", value: 10 },
  ];
  
  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#6366F1'];
  
  // Custom tooltip formatter for amount
  const amountTooltipFormatter = (value: number) => {
    return [`$${value}`, getTransactionTranslation("amount", language) || "Amount"];
  };
  
  // Custom tooltip formatter for pie chart
  const typeTooltipFormatter = (value: number) => {
    return [`${value}%`, getTransactionTranslation("type", language) || "Type"];
  };
  
  // Custom formatter for XAxis tick text to display translated month names
  const xAxisTickFormatter = (value: string) => {
    const monthItem = monthlyData.find(item => item.name === value);
    if (monthItem && monthItem.translationKey) {
      return getTransactionTranslation(monthItem.translationKey, language);
    }
    return value;
  };
  
  // Translate transaction type names for pie chart labels
  const getTranslatedTypeName = (name: string) => {
    const typeItem = typeData.find(item => item.name === name);
    return typeItem ? getTransactionTranslation(typeItem.translationKey, language) : name;
  };
  
  // Custom formatter for pie chart labels
  const pieChartLabelFormatter = ({ name, percent }: { name: string; percent: number }) => {
    const translatedName = getTranslatedTypeName(name);
    return `${translatedName}: ${(percent * 100).toFixed(0)}%`;
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Transaction Amount Chart */}
      <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center mb-6">
            <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
              <BarChartIcon size={18} className="text-purple-300" />
            </div>
            <h3 className="text-lg font-medium text-white">
              {getTransactionTranslation("monthlyTransactions", language)}
            </h3>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#333', opacity: 0.2 }}
                  tickFormatter={xAxisTickFormatter}
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#333', opacity: 0.2 }}
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fill: '#9CA3AF' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 40, 0.8)',
                    borderColor: '#6D28D9',
                    borderRadius: '0.5rem',
                    color: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={amountTooltipFormatter}
                  cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                  labelFormatter={xAxisTickFormatter}
                />
                <defs>
                  <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <Bar 
                  dataKey="amount" 
                  fill="url(#amountGradient)" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                  animationDuration={1500}
                  name={getTransactionTranslation("amount", language) || "Amount"}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Transaction Type Pie Chart */}
      <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center mb-6">
            <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
              <PieChartIcon size={18} className="text-purple-300" />
            </div>
            <h3 className="text-lg font-medium text-white">
              {getTransactionTranslation("transactionsByType", language) || "Transactions by Type"}
            </h3>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {COLORS.map((color, index) => (
                    <linearGradient 
                      key={`gradient-${index}`} 
                      id={`gradient-${index}`} 
                      x1="0" y1="0" x2="0" y2="1"
                    >
                      <stop 
                        offset="0%" 
                        stopColor={color} 
                        stopOpacity={0.9}
                      />
                      <stop 
                        offset="100%" 
                        stopColor={color} 
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                  strokeWidth={3}
                  stroke="rgba(20, 20, 30, 0.2)"
                  label={pieChartLabelFormatter}
                  labelLine={false}
                >
                  {typeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#gradient-${index})`}
                      className="filter drop-shadow-md"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(30, 30, 40, 0.8)',
                    borderColor: '#6D28D9',
                    borderRadius: '0.5rem',
                    color: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={typeTooltipFormatter}
                  labelFormatter={(name) => getTranslatedTypeName(name as string)}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: "12px",
                    color: "#9CA3AF",
                  }}
                  formatter={(value) => getTranslatedTypeName(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionCharts;
