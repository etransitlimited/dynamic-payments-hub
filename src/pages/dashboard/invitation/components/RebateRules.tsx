
import React from "react";
import { DollarSign } from "lucide-react";

const RebateRules = () => {
  return (
    <div className="mt-6 p-4 bg-[#061428]/70 rounded-lg border border-blue-900/30 hover:border-blue-600/40 transition-colors">
      <div className="flex items-center mb-2">
        <span className="bg-blue-500/20 p-1 rounded-full mr-2">
          <DollarSign className="h-3 w-3 text-blue-400" />
        </span>
        <h3 className="text-white text-sm font-medium">返点规则</h3>
      </div>
      <ul className="space-y-2 text-blue-200/80 list-disc pl-5 text-sm">
        <li>邀请用户首次充值：返点比例为充值金额的5%</li>
        <li>邀请用户购卡：返点比例为购卡金额的5%</li>
        <li>邀请用户交易：返点比例为交易金额的5%</li>
        <li>返点将在交易完成后实时到账</li>
      </ul>
    </div>
  );
};

export default RebateRules;
