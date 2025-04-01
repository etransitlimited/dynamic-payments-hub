
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const RewardRulesCard = () => {
  const { t } = useLanguage();

  return (
    <Card className="bg-gradient-to-r from-[rgb(57,106,252)] to-[rgb(41,72,255)] border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(57,106,252,0.15)] transition-all duration-300 overflow-hidden h-full w-full flex flex-col">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 px-6 py-5 border-b border-purple-800/30">
        <CardTitle className="text-white">{t("invitation.rewardRules")}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 p-6 flex-1">
        <ul className="space-y-3 text-purple-200/90 list-disc pl-5">
          <li>{t("invitation.rules.userRegisters")}: <span className="text-green-400 font-medium">+10{t("invitation.rules.points")}</span></li>
          <li>{t("invitation.rules.firstDeposit")}: <span className="text-green-400 font-medium">+50{t("invitation.rules.points")}</span></li>
          <li>{t("invitation.rules.transactionRebate1")}<span className="text-green-400 font-medium">5%</span>{t("invitation.rules.transactionRebate2")}</li>
          <li>{t("invitation.rules.dailyLimit1")}: <span className="text-yellow-400 font-medium">20{t("invitation.rules.dailyLimit2")}</span></li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RewardRulesCard;
