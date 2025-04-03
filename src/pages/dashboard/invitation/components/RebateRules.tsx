
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRebateTranslation } from "../hooks/useRebateTranslation";

const RebateRules = () => {
  const { t, language } = useRebateTranslation();
  
  // Force re-render when language changes
  const [componentKey, setComponentKey] = useState<string>(`rebate-rules-${language}`);
  
  useEffect(() => {
    setComponentKey(`rebate-rules-${language}-${Date.now()}`);
    console.log(`RebateRules language changed to: ${language}`);
  }, [language]);
  
  const rules = [
    { tier: "tier1", percentage: "2%", color: "bg-blue-500", progress: 20 },
    { tier: "tier2", percentage: "5%", color: "bg-green-500", progress: 50 },
    { tier: "tier3", percentage: "8%", color: "bg-amber-500", progress: 80 },
    { tier: "tier4", percentage: "12%", color: "bg-purple-500", progress: 100 }
  ];

  return (
    <Card 
      className="border-purple-900/30 bg-charcoal shadow-lg hover:shadow-purple-900/10 transition-all duration-300"
      key={componentKey}
      data-language={language}
    >
      <CardHeader className="border-b border-purple-900/20 pb-3">
        <CardTitle className="text-white text-lg">
          {t("rulesTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <p className="text-gray-300 text-sm">
          {t("rulesDescription")}
        </p>
        
        <div className="space-y-3 mt-4">
          {rules.map((rule, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium text-sm">{t(rule.tier)}</span>
                <span className="text-neon-purple font-semibold">{rule.percentage}</span>
              </div>
              <Progress value={rule.progress} className="h-1.5" indicatorClassName={rule.color} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RebateRules;
