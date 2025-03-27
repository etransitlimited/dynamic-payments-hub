
import React from "react";
import { AlertCircle } from "lucide-react";

const InformationBox = () => {
  return (
    <div className="mt-6 p-4 bg-gradient-to-br from-blue-900/30 to-blue-950/40 rounded-lg border border-blue-800/50 shadow-inner backdrop-blur-sm hover:border-blue-700/50 transition-colors">
      <div className="flex items-start">
        <div className="bg-blue-500/20 p-2 rounded-full mr-3 flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h4 className="text-blue-300 font-medium mb-2 flex items-center">
            <span>交易说明</span>
            <span className="ml-2 text-xs bg-blue-600/20 text-blue-300 px-2 py-0.5 rounded-full">重要提示</span>
          </h4>
          <ul className="text-sm text-blue-200/80 space-y-2">
            <li className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
              充值交易通常会在10分钟内完成处理
            </li>
            <li className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
              支出交易将立即从您的账户余额中扣除
            </li>
            <li className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
              转账交易需要1-24小时完成确认
            </li>
            <li className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
              如有任何问题，请联系客服：400-123-4567
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformationBox;
