
import React from "react";
import { DollarSign } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const RebateRules = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-6 p-4 bg-[#061428]/70 rounded-lg border border-blue-900/30 hover:border-blue-600/40 transition-colors">
      <div className="flex items-center mb-2">
        <span className="bg-blue-500/20 p-1 rounded-full mr-2">
          <DollarSign className="h-3 w-3 text-blue-400" />
        </span>
        <h3 className="text-white text-sm font-medium">{t("invitation.rewardRules")}</h3>
      </div>
      <ul className="space-y-2 text-blue-200/80 list-disc pl-5 text-sm">
        <li>{t("invitation.rules.firstDeposit")}: {t("invitation.rules.transactionRebate1")}5%{t("invitation.rules.transactionRebate2")}</li>
        <li>{t("invitation.rules.userRegisters")}: 50{t("invitation.rules.points")}</li>
        <li>{t("invitation.rules.dailyLimit1")}: 100{t("invitation.rules.dailyLimit2")}</li>
        <li>{t("invitation.shareCodeToFriends")}</li>
      </ul>
    </div>
  );
};

export default RebateRules;
