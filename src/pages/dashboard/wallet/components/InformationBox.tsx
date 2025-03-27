
import React from "react";
import { Info } from "lucide-react";

const InformationBox = () => {
  return (
    <div className="mt-6 p-4 bg-[#061428]/70 rounded-lg border border-blue-900/30 hover:border-blue-700/50 transition-colors">
      <div className="flex items-start">
        <span className="bg-blue-500/20 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
          <Info className="h-3 w-3 text-blue-400" />
        </span>
        <div>
          <h3 className="text-white text-sm font-medium mb-1">充值说明</h3>
          <ul className="space-y-2 text-blue-200/80 list-disc pl-5 text-sm">
            <li>充值金额将在交易完成后立即到账</li>
            <li>若充值未到账，请联系客服并提供交易号</li>
            <li>充值记录将保留12个月</li>
            <li>支持多种支付方式：支付宝、微信支付、银行转账等</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformationBox;
