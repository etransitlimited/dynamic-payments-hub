
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const RewardRulesCard = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-purple-900/20 shadow-lg hover:shadow-purple-900/10 transition-all duration-300 overflow-hidden h-full">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 bg-purple-900/10 border-b border-purple-900/20 px-6 py-4">
        <CardTitle className="text-white text-lg flex items-center">
          <span className="bg-purple-500 h-5 w-1 rounded-full mr-2"></span>
          {t("invitation.rewardRules")}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 p-6">
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">{t("invitation.rules.userRegisters")}</p>
              <p className="text-sm text-gray-400">+100{t("invitation.rules.points")}</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">{t("invitation.rules.firstDeposit")}</p>
              <p className="text-sm text-gray-400">+200{t("invitation.rules.points")}</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">{t("invitation.rules.transactionRebate1")}5%{t("invitation.rules.transactionRebate2")}</p>
              <p className="text-sm text-gray-400">{t("invitation.rules.dailyLimit1")}: 1000{t("invitation.rules.dailyLimit2")}</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RewardRulesCard;
