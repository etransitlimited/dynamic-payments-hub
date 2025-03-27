
import React from "react";
import { AlertCircle } from "lucide-react";

const InformationBox = () => {
  return (
    <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800/50 shadow-inner">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-blue-300 font-medium mb-1">交易说明</h4>
          <ul className="text-sm text-blue-200/80 space-y-1">
            <li>• 充值交易通常会在10分钟内完成处理</li>
            <li>• 支出交易将立即从您的账户余额中扣除</li>
            <li>• 转账交易需要1-24小时完成确认</li>
            <li>• 如有任何问题，请联系客服：400-123-4567</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformationBox;
