
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, TrendingUp, Users } from "lucide-react";

const RebateStats = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden md:col-span-3">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center text-xl">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            <TrendingUp size={18} className="text-blue-400" />
          </span>
          返点统计
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 hover:border-blue-600/40 transition-colors">
            <div className="flex items-center mb-2">
              <div className="bg-blue-500/20 p-2 rounded-full mr-2">
                <Calendar className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-white">本月返点金额</h3>
            </div>
            <div className="text-2xl font-bold text-white">¥1,234.56</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                比上月增长 12.3%
              </p>
            </div>
          </div>
          
          <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 hover:border-blue-600/40 transition-colors">
            <div className="flex items-center mb-2">
              <div className="bg-green-500/20 p-2 rounded-full mr-2">
                <DollarSign className="h-4 w-4 text-green-400" />
              </div>
              <h3 className="text-sm font-medium text-white">累计返点金额</h3>
            </div>
            <div className="text-2xl font-bold text-white">¥15,678.90</div>
            <p className="text-xs text-blue-200/80 mt-2">
              自 2023-08-15 起
            </p>
          </div>
          
          <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 hover:border-blue-600/40 transition-colors">
            <div className="flex items-center mb-2">
              <div className="bg-purple-500/20 p-2 rounded-full mr-2">
                <Users className="h-4 w-4 text-purple-400" />
              </div>
              <h3 className="text-sm font-medium text-white">邀请用户数</h3>
            </div>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-blue-200/80 mt-2">
              其中活跃用户 18 人
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RebateStats;
