
import React from "react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, CreditCard, BarChart2, DollarSign } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardDescription className="flex items-center justify-between text-blue-400">
            <TranslatedText keyName="analytics.revenue" fallback="Revenue" />
            <DollarSign size={16} />
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-xl font-bold">$24,532.95</div>
          <div className="flex items-center mt-2 text-sm">
            <span className="flex items-center text-green-400">
              <ArrowUpRight size={14} className="mr-1" />
              +12.5%
            </span>
            <span className="text-xs text-blue-400 ml-2">
              <TranslatedText keyName="analytics.fromLastMonth" fallback="from last month" />
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardDescription className="flex items-center justify-between text-blue-400">
            <TranslatedText keyName="analytics.transactions" fallback="Transactions" />
            <BarChart2 size={16} />
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-xl font-bold">1,824</div>
          <div className="flex items-center mt-2 text-sm">
            <span className="flex items-center text-green-400">
              <ArrowUpRight size={14} className="mr-1" />
              +8.2%
            </span>
            <span className="text-xs text-blue-400 ml-2">
              <TranslatedText keyName="analytics.fromLastWeek" fallback="from last week" />
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardDescription className="flex items-center justify-between text-blue-400">
            <TranslatedText keyName="analytics.activeUsers" fallback="Active Users" />
            <Users size={16} />
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-xl font-bold">573</div>
          <div className="flex items-center mt-2 text-sm">
            <span className="flex items-center text-red-400">
              <ArrowDownRight size={14} className="mr-1" />
              -2.3%
            </span>
            <span className="text-xs text-blue-400 ml-2">
              <TranslatedText keyName="analytics.fromLastMonth" fallback="from last month" />
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardDescription className="flex items-center justify-between text-blue-400">
            <TranslatedText keyName="analytics.activeCards" fallback="Active Cards" />
            <CreditCard size={16} />
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-xl font-bold">238</div>
          <div className="flex items-center mt-2 text-sm">
            <span className="flex items-center text-green-400">
              <ArrowUpRight size={14} className="mr-1" />
              +4.8%
            </span>
            <span className="text-xs text-blue-400 ml-2">
              <TranslatedText keyName="analytics.fromLastQuarter" fallback="from last quarter" />
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
