
import React from "react";
import { Calendar, TrendingUp, Wallet } from "lucide-react";

const DepositStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 hover:border-blue-700/50 transition-colors">
        <div className="flex items-center mb-2">
          <div className="bg-blue-500/20 p-2 rounded-full mr-2">
            <Calendar className="h-4 w-4 text-blue-400" />
          </div>
          <h3 className="text-sm font-medium text-white">Monthly Deposit</h3>
        </div>
        <div className="text-2xl font-bold text-white">$3,700.00</div>
        <div className="flex items-center mt-1">
          <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
          <p className="text-xs text-green-400">
            15.2% increase from last month
          </p>
        </div>
      </div>
      
      <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 hover:border-blue-700/50 transition-colors">
        <div className="flex items-center mb-2">
          <div className="bg-green-500/20 p-2 rounded-full mr-2">
            <Wallet className="h-4 w-4 text-green-400" />
          </div>
          <h3 className="text-sm font-medium text-white">Total Deposits</h3>
        </div>
        <div className="text-2xl font-bold text-white">$28,450.00</div>
        <p className="text-xs text-blue-200/80 mt-1">
          Since 2023-08-15
        </p>
      </div>
      
      <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 hover:border-blue-700/50 transition-colors">
        <div className="flex items-center mb-2">
          <div className="bg-purple-500/20 p-2 rounded-full mr-2">
            <Calendar className="h-4 w-4 text-purple-400" />
          </div>
          <h3 className="text-sm font-medium text-white">Last Deposit</h3>
        </div>
        <div className="text-2xl font-bold text-white">2 days ago</div>
        <p className="text-xs text-blue-200/80 mt-1">
          2023-11-25 14:32
        </p>
      </div>
    </div>
  );
};

export default DepositStats;
